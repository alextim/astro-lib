[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://bank.gov.ua/en/about/support-the-armed-forces)

# astro-sitemap

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _sitemap.xml_ for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

The _sitemap.xml_ file provides information about structure of your website, about its content: pages, images, videos and relations between them. [See Google's advice on sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) to learn more.

## Why astro-sitemap?

**astro-sitemap** advantages over the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap):

- Exclude pages from a sitemap by glob patterns.
- More control on the sitemap output:
  - manage xml namespaces;
  - `lastmod` format option;
  - possibility to add a link to custom xsl.
- Automatically creates a link to sitemap into `<head>` section of generated pages.
- Flexible configuration: configure the integration with external config, astro.config or combine both.

Part of the functionality from **astro-sitemap** became an update for the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) from v0.1.2 to v0.2.0.

Shared functionality with the official **@astrojs/sitemap**:

- Split up your large sitemap into multiple sitemaps by a custom limit.
- Ability to add sitemap specific attributes such as `changefreq`, `lastmod`, `priority`.
- Final output customization via JS function (sync or async).
- localization support. In a build time the integration analyses the pages urls for presence of locale signatures in paths to establish relations between pages.
- Reliability: all config options are validated.

:exclamation: Both the official and **astro-sitemap** integrations don't support SSR.

---

## Installation

There are two ways to add **astro-sitemap** integration to your Astro project.

### Astro CLI tool

You should run `astro add` command in your project directory. This command after prompt will install required dependencies and apply changes to _astro.config.\*_.

```sh
# Using NPM
npx astro add astro-sitemap

# Using Yarn
yarn astro add astro-sitemap

# Using PNPM
pnpx astro add astro-sitemap
```

If you run into any troubles, [feel free to log an issue on my GitHub](https://github.com/alextim/astro-lib/issues).

### Install dependencies manually

First, install the **astro-sitemap** integration like so:

```sh
# Using NPM
npm install --save-dev astro-sitemap

# Using Yarn
yarn add -D astro-sitemap

# Using PNPM
pnpm add -D astro-sitemap
```

Then apply this integration to your _astro.config.\*_. All details below in **Getting started**.

## Getting started

The `astro-sitemap` integration requires a deployment / site URL for generation. Add your site's URL under your _astro.config.\*_ using the `site` property.

:exclamation: Provide the `experimental` property to your _astro.config.\*_, because only official **@astrojs/\*** integrations are currently supported by Astro. Set the `experimental.integrations` value to `true`.

Then, apply this integration to your _astro.config.\*_ file using the `integrations` property.

**astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

export default defineConfig({
  // ...
  site: 'https://example.com',
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-sitemap' working
  // with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [sitemap()],
});
```

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _sitemap_ under `dist/sitemap-index.xml` and `dist/sitemap-0.xml`!

Generated sitemap content for a two-page website:

**sitemap-index.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

**sitemap-0.xml**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/second-page/</loc>
  </url>
</urlset>
```

All pages generated at build time will contain a link to the sitemap into the `<head>` section :

```html
<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">
```

You can also check [Astro Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/) for more on integrations.

## Configuration

|   Name         |             Type           | Required | Default | Description                                                                                     |
| :------------: | :------------------------: | :------: | :-----: | :---------------------------------------------------------------------------------------------- |
| `canonicalURL` | `String`     |    No    |         | Absolute URL. The integration needs `site` from astro.config or `canonicalURL`. If both values are provided then only `canonicalURL` will be used by the integration. |
| `filter`    | `(page: String):`<br/>`Boolean`|   No    |         | Function to filter generated pages to exclude some paths from the sitemap.                       |
| `exclude`      |   `String[]` |    No    |         | The `exclude` option is an array of [glob patterns](https://github.com/isaacs/minimatch#features) to exclude static routes from the generated sitemap. |
| `customPages`  |          `String[]`        |    No    |         | Absolute URL list. It will be merged with generated pages urls.<br/>You should also use `customPages` to manually list sitemap pages when using an SSR adapter. Currently, integration cannot detect your site's pages unless you are building statically. To avoid an empty sitemap, list all pages (including the base origin) with this configuration option.  |
| `entryLimit`   |           `Number`         |    No    | 45000   | Number of entries per one sitemap file. Single sitemap index and multiple sitemaps will be created if you have more entries. See more on [Google](https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps/) |
| `changefreq`   |         `ChangeFreq`       |    No    |         | Sitemap specific. Ignored by Google.<br/>How frequently the page is likely to change.<br/>Available values: `always`\|`hourly`\|`daily`\|`weekly`\|`monthly`\| `yearly`\|`never` |
| `lastmod`      |            `Date`          |    No    |         | Sitemap specific. The date of page last modification.                                           |
| `priority`     |           `Number`         |    No    |         | Sitemap specific. Ignored by Google.<br/>The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0 |
| `serialize` | `(item: SitemapItem):`<br>`SitemapItemLoose`\|`undefined`\|<br/>Promise<`SitemapItemLoose`\|`undefined`>| No |    | Function to process an array of sitemap entries just before writing them to disk. Async or sync.<br/>The `undefined` return value excludes the passed entry from the sitemap. |
| `xslUrl`       |   `String`   |    No    |         | Absolute URL of XSL file to style XML or transform it to other format. Ignored by search engines. |
| `xmlns`        |   `NSArgs`   |    No    |         | Set the XML namespaces by xmlns attributes in `<urlset>` element.  |
| `lastmodDateOnly` | `Boolean` |    No    |         | If it's `true` the XML output will contain a date part only.                                    |
| `createLinkInHead`| `Boolean` |    No    | true    | Create a link on the sitemap into `<head>` of generated pages.<br/>The final output reprocessing is used for this. It can impact build time for large sites. |
| **i18n**       |           `object`         |    No    |         |                                                                                                 |
| `defaultLocale`|           `String`         |   Yes    |         | Its value must exist as one of the `locales` keys.                                             |
| `locales`      | `Record<String, String>`   |   Yes    |         | Key/value - pairs.<br/>The key is used to look up the locale part of the page path.<br/> The value is a language attribute, only English alphabet and hyphen allowed. See more on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) |

:bulb: See detailed explanation of sitemap specific options on [sitemap.org](https://www.sitemaps.org/protocol.html).

:exclamation: This integration uses `astro:build:done` hook (the official [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) does the same). This hook exposes only generated page paths. Thus, in the current version of Astro, both integrations don't have the ability to analyze the page source, frontmatter, etc. They can add `changefreq`, `lastmod` and `priority` attributes only in a batch or nothing.

### SitemapItem

|   Name         |     Type     | Required | Description        |
| :------------: | :----------: | :------: | :----------------- |
| `url`          |   `String`   |    Yes   | Absolute url       |
| `changefreq`   | `ChangeFreq` |    No    |                    |
| `lastmod`      |   `String`   |    No    | ISO formatted date |
| `priority`     |   `Number`   |    No    |                    |
| `links`        | `LinkItem[]` |    No    | for localization   |

### LinkItem

|   Name         |      Type       | Required | Description               |
| :------------: | :-------------: | :------: | :------------------------ |
| `url`          |    `String`     |   Yes    | Absolute url              |
| `lang`         |    `String`     |   Yes    | hreflag, example: 'en-US' |

### NSArgs

|   Name   |  Type     | Required | Default | Description                                                              |
| :------: | :-------: | :------: | :-----: | :----------------------------------------------------------------------- |
| `xhtml`  | `Boolean` |    No    | true    | `xmlns:xhtml="http://www.w3.org/1999/xhtml"`                             |
| `news`   | `Boolean` |    No    |         | `xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"`            |
| `video`  | `Boolean` |    No    |         | `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`          |
| `image`  | `Boolean` |    No    |         | `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`          |
| `custom` | `String[]`|    No    |         | Any custom namespace. Elements of array'll be used `as is` without any validation. |

### SitemapItemLoose

The `SitemapItemLoose` interface is a base for the `SitemapItem`.  

It has the properties `video`, `img` and many more.  

More details about `SitemapItemLoose` interface see in the **sitemap.js** repo [readme](https://github.com/ekalinin/sitemap.js/blob/master/README.md) and types source [code](https://github.com/ekalinin/sitemap.js/blob/master/lib/types.ts).  

**Sample of _astro.config.mjs_**

```js
// astro.config.ts
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

export default defineConfig({
  site: 'https://your-awesome-site.com',
  experimental: {
    integrations: true,
  },
  integrations: [
    sitemap({
      /**
       *  These options are the same with the official integration `@astrojs/sitemap`
       */ 
      // exclude pages from sitemap
      filter: (page: string) => !/exclude-this/.test(page), 
      // Absolute urls of extra pages
      customPages: [
        // extra pages for sitemap
        'https://example.com/virtual-one.html',
        'https://example.com/virtual-two.html',
      ],

      // Here the `canonicalURL` is provided. 
      // It will be used during sitemap generation instead of `site` value. 
      canonicalURL: 'https://example.com',

      // This function is called just before a sitemap writing to disk.
      // You have more control on resulting output.
      // sync or async
      serialize(item: SitemapItem): SitemapItem { 
        if (/special-page/.test(item.url)) {
          item.changefreq = 'daily';
          item.lastmod = new Date();
          item.priority = 0.9;
        }
        return item;
      },

      // The integration creates a separate `sitemap-${i}.xml` file for each batch of 45000 and adds this file to index - `sitemap-index.xml`.
      entryLimit: 1000,                           // default - 45000

      // sitemap specific
      changefreq: 'yearly',
      lastmod: new Date('May 01, 2019 03:24:00'),
      priority: 0.2,

      /**
       *  `astro-sitemap` integration extra options
       */ 
      exclude: ['404', 'blog-*/']
      // print date not time
      lastmodDateOnly: false, 
      
      // style to transform to another format, ignored by search engines
      xslUrl: 'https://example.com/style.xsl',

      // set the xml namespace
      xmlns: { 
        xhtml: true,
        news: true, 
        image: true,
        video: true,
        custom: [
          'xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd"',
          'xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        ],
      },

      // Create or not a link to sitemap into '<head>' section of generated pages
      createLinkInHead: true,                     // default - true 
    }),
  ],
});
```

Generated sitemap content for this configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://example/style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
...
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2019-05-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  ...
  <url>
    <loc>https://example.com/virtual-one.html</loc>
    <lastmod>2019-05-01</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  ...
    <url>
    <loc>https://example.com/some-special-path.html</loc>
    <lastmod>2022-06-07</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ...
```

## Localization

Supply the integration config with the `i18n` option. The integration will check the generated page paths for locale keys in the paths.

Read more about localization on Google in [Advanced SEO](https://developers.google.com/search/docs/advanced/crawling/localized-versions#all-method-guidelines).

Let's have the following integration config:

```js
...
  canonicalURL: 'https://example.com', // You should provide the `site` option in astro.config instead of `canonicalURL`.
  i18n: {
    defaultLocale: 'en',   // All urls that don't contain `es` or `fr` after `https://example.com/` will be treated as default locale, i.e. `en`
    locales: {
      en: 'en-US',         // The `defaultLocale` value must present in `locales` keys
      es: 'es-ES',
      fr: 'fr-CA',
    }
  }
...

```

The sitemap content will be:

```xml
...
  <url>
    <loc>https://example.com/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/es/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/fr/</loc>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/"/>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/"/>
  </url>
  <url>
    <loc>https://example.com/es/second-page/</loc>
    <xhtml:link rel="alternate" hreflang="es-ES" href="https://example.com/es/second-page/"/>
    <xhtml:link rel="alternate" hreflang="fr-CA" href="https://example.com/fr/second-page/"/>
    <xhtml:link rel="alternate" hreflang="en-US" href="https://example.com/second-page/"/>
  </url>
...
```

## Using Configuration Files

You can configure the integration using the external file `sitemap.config.*` (`js`, `cjs`, `mjs`). Put it in the application `root` folder (see about `root` in official [docs](https://docs.astro.build/en/reference/configuration-reference/)).

The external config must contain the default export statement:

```js
// ESM
export default {
  ...
};
```

or

```js
// CommonJS
module.exports = {
  ...
};
```

:exclamation: The current version of the integration doesn't support typescript configs.

### How does the integration internally resolve a config?

| Options parameter provided? | External config exists? | Result                                           |
| :-------------------------- | :---------------------: | :----------------------------------------------- |
| No                          |           No            | Default config used                              |
| Yes                         |           No            | Options parameter used                           |
| No                          |           Yes           | External config used                             |
| Yes                         |           Yes           | External config is merged with options parameter |

The external configuration usage example is in this demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/sitemap/advanced).

:exclamation: Important Notes

Only official **@astrojs/\*** integrations are currently supported by Astro.

There are two possibilities to make **astro-sitemap** integration working with current version of Astro.

Set the `experimental.integrations` option to `true` in your _astro.config.\*_.

```js
// astro.config.mjs
export default defineConfig({
  // ...
  experimental: {
    integrations: true,
  },
});
```

Or use the `--experimental-integrations` flag for build command.

```sh
astro build --experimental-integrations
```

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

## Inspiration

Module based on the awesome [sitemap.js](https://github.com/ekalinin/sitemap.js) package ❤️.
