import { SitemapAndIndexStream, SitemapStream, SitemapItemLoose } from 'sitemap';

import { createWriteStream, WriteStream, promises } from 'node:fs';
import { normalize, resolve } from 'node:path';
import { Readable, pipeline as pline } from 'node:stream';
import { createGzip } from 'node:zlib';
import { promisify } from 'node:util';
import { URL } from 'node:url';

import { NSArgs } from '../index';
import { SITEMAP_INDEX_FILE_NAME, SITEMAP_CHUNK_TEMPLATE } from '../output-files';

const pipeline = promisify(pline);
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
  gzip = false,

  lastmodDateOnly = false,
  xslUrl = undefined,
  xmlns,
}: {
  hostname: string;
  sitemapHostname?: string;
  sourceData: SitemapItemLoose[];
  destinationDir: string;
  publicBasePath?: string;
  limit?: number;
  gzip?: boolean;

  lastmodDateOnly?: boolean;
  xslUrl?: string;
  xmlns: NSArgs;
}): Promise<void> => {
  await promises.mkdir(destinationDir, { recursive: true });
  const sitemapAndIndexStream = new SitemapAndIndexStream({
    limit,
    lastmodDateOnly,
    xslUrl,
    getSitemapStream: (i) => {
      const sitemapStream = new SitemapStream({
        hostname,
        lastmodDateOnly,
        xslUrl,
        xmlns,
      });
      const path = SITEMAP_CHUNK_TEMPLATE.replace('%d', i.toString(10));
      const writePath = resolve(destinationDir, path + (gzip ? '.gz' : ''));
      if (!publicBasePath.endsWith('/')) {
        publicBasePath += '/';
      }
      const publicPath = normalize(publicBasePath + path);

      let pipeline: WriteStream;
      if (gzip) {
        pipeline = sitemapStream
          .pipe(createGzip()) // compress the output of the sitemap
          .pipe(createWriteStream(writePath)); // write it to sitemap-NUMBER.xml
      } else {
        pipeline = sitemapStream.pipe(createWriteStream(writePath)); // write it to sitemap-NUMBER.xml
      }

      return [new URL(`${publicPath}${gzip ? '.gz' : ''}`, sitemapHostname).toString(), sitemapStream, pipeline];
    },
  });
  const src = Readable.from(sourceData);

  const writePath = resolve(destinationDir, `./${SITEMAP_INDEX_FILE_NAME}${gzip ? '.gz' : ''}`);
  if (gzip) {
    return pipeline(src, sitemapAndIndexStream, createGzip(), createWriteStream(writePath));
  } else {
    return pipeline(src, sitemapAndIndexStream, createWriteStream(writePath));
  }
};
