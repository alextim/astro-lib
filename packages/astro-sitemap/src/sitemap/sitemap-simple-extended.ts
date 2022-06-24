import { SitemapAndIndexStream, SitemapStream, SitemapItemLoose } from 'sitemap';

import { createWriteStream, WriteStream, promises } from 'node:fs';
import { normalize, resolve } from 'node:path';
import { Readable, pipeline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { promisify } from 'node:util';
import { URL } from 'node:url';

import { NSArgs } from '../index';
import { SITEMAP_INDEX_FILE_NAME, SITEMAP_CHUNK_TEMPLATE } from '../output-files';

const pipelineAsync = promisify(pipeline);
/**
 *
 * @param {object} options -
 * @param {string} options.hostname - The hostname for all URLs
 * @param {string} [options.sitemapHostname] - The hostname for the sitemaps if different than hostname
 * @param {SitemapItemLoose[]} options.sourceData - The urls you want to make a sitemap out of.
 * @param {string} options.destinationDir - where to write the sitemaps and index
 * @param {string} [options.publicBasePath] - where the sitemaps are relative to the hostname. Defaults to root.
 * @param {number} [options.limit] - how many URLs to write before switching to a new file. Defaults to 50k
 * @param {boolean} [options.gzip] - whether to compress the written files. Defaults to true
 *
 * @param {boolean} [options.lastmodDateOnly] - print date not time
 * @param {string} [options.xslUrl] - custom xsl style
 * @param {boolean} [options.xmlns] - trim the xml namespace
 *
 * @returns {Promise<void>} an empty promise that resolves when everything is done
 */
export const simpleSitemapAndIndexExtended = async ({
  hostname,
  sitemapHostname = hostname, // if different
  /**
   * Pass a line separated list of sitemap items or a stream or an array
   */
  sourceData,
  destinationDir,
  limit = 45000,
  publicBasePath = './',

  lastmodDateOnly = false,
  xslUrl = undefined,
  xmlns,

  gzip = false,
}: {
  hostname: string;
  sitemapHostname?: string;
  sourceData: SitemapItemLoose[];
  destinationDir: string;
  publicBasePath?: string;
  limit?: number;

  lastmodDateOnly?: boolean;
  xslUrl?: string;
  xmlns: NSArgs;

  gzip?: boolean;
}): Promise<string[]> => {
  const result: string[] = [];
  const suffix = gzip ? '.gz' : '';

  await promises.mkdir(destinationDir, { recursive: true });

  const sitemapAndIndexStream = new SitemapAndIndexStream({
    limit,
    lastmodDateOnly,
    xslUrl,

    getSitemapStream(i) {
      const sitemapStream = new SitemapStream({
        hostname,
        lastmodDateOnly,
        xslUrl,
        xmlns,
      });

      const chunkName = SITEMAP_CHUNK_TEMPLATE.replace('%d', i.toString(10)) + suffix;
      result.push(chunkName);

      const writePath = resolve(destinationDir, chunkName);
      if (!publicBasePath.endsWith('/')) {
        publicBasePath += '/';
      }
      const publicPath = normalize(publicBasePath + chunkName);

      let pipeline: WriteStream;
      if (gzip) {
        pipeline = sitemapStream
          .pipe(createGzip()) // compress the output of the sitemap
          .pipe(createWriteStream(writePath)); // write it to sitemap-NUMBER.xml
      } else {
        pipeline = sitemapStream.pipe(createWriteStream(writePath)); // write it to sitemap-NUMBER.xml
      }

      return [new URL(publicPath, sitemapHostname).toString(), sitemapStream, pipeline];
    },
  });

  const src = Readable.from(sourceData);
  const indexName = SITEMAP_INDEX_FILE_NAME + suffix;
  const writePath = resolve(destinationDir, `./${indexName}`);

  if (gzip) {
    await pipelineAsync(src, sitemapAndIndexStream, createGzip(), createWriteStream(writePath));
  } else {
    await pipelineAsync(src, sitemapAndIndexStream, createWriteStream(writePath));
  }
  result.unshift(indexName);
  return result;
};
