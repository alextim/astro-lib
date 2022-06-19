[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://bank.gov.ua/en/about/support-the-armed-forces)

# astro-sitemap

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _sitemap.xml_ for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

The _sitemap.xml_ file provides information about structure of your website, about its content: pages, images, videos and relations between them. [See Google's advice on sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) to learn more.

## Why astro-sitemap?

There is already the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) which works excellent.

For what another one?

The official integration has a functionality which is not enough in some cases.

Key benefits of `astro-sitemap` integration:

- Split up your large sitemap into multiple sitemaps by custom limit.
- Ability to add sitemap specific attributes such as `changefreq`, `lastmod`, `priority`.
- Final output customization via JS function (sync or async).
- The most important: localization support. In a build time the integration analyses the pages urls for presence of locale signatures in paths to establish relations between pages.
- Automatically creates a link to sitemap in `<head>` section of generated pages.
- Flexible configuration: configure the integration with external config, astro.config or combine both.
- Reliability: all config options are validated.

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

Generated sitemap content for two pages website:

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
<?xml version="1.0" encoding="UTF-8"?>

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  <url>
    <loc>https://example.com/</loc>
  </url>
  <url>
    <loc>https://example.com/second-page/</loc>
  </url>
</urlset>
```

All pages generated during build will contain in `<head>` section a link to sitemap:

```html
<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">
```

You can also check [Astro Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/) for more on integrations.

## Configuration

## Options

|   Name         |             Type           | Required | Default | Description                                                                                                                      |
| :------------: | :------------------------: | :------: | :------ | :------------------------------------------------------------------------------------------------------------------------------- |
| `filter`    | `(page: String):`<br/>`Boolean`|    No   |         | The same as official. Function to filter generated pages to exclude some paths from a  sitemap                                   |
| `customPages`  |          `String[]`        |    No    |         | The same as official. Absolute url list. It will be merged with generated pages urls.                                            |
| `canonicalURL` |           `String`         |    No    |         | The same as official. Absolute url. The integration needs `site` from astro.config or `canonicalURL`. If both values are provided then only `canonicalURL` will be used by the integration. |
| `entryLimit`   |           `Number`         |    No    | 45000   | Number of entries per sitemap file, a sitemap index and multiple sitemaps are created if you have more entries. See more on [Google](https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps)|
| `createLinkInHead`|       `Boolean`         |    No    | true    | Create a link on the sitemap in `<head>` of generated pages.<br/>The final output reprocessing is used for this. It could impact on a build time for large sites.|
| `serialize` | `(item: SitemapItem):`<br>`SitemapItem`\|`Promise<SitemapItem>`| No |    | Function to process an array of SiteMap items just before writing to disk. Async or sync.                                        |
| `changefreq`   |         `ChangeFreq`       |    No    |         | Sitemap specific. Ignored by Google.<br/>How frequently the page is likely to change.<br/>Available values: `always`\|`hourly`\|`daily`\|`weekly`\|`monthly`\| `yearly`\|`never` |
| `lastmod`      |            `Date`          |    No    |         | Sitemap specific. The date of page last modification.                                                                           |
| `priority`     |           `Number`         |    No    |         | Sitemap specific. Ignored by Google.<br/>The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0                |
| **i18n**       |           `object`         |    No    |         | Provide this object to start                                                                                                      |
| `defaultLocale`|           `String`         |   Yes    |         | Its value has to be exists as one of `locales` keys.                                                                              |
| `locales`      | `Record<String, String>`   |   Yes    |         | Key/value - pairs.<br/>The key is used to look for a locale part in a page path.<br/> The value is a language attribute, only English alphabet and hyphen allowed. See more on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) |

:bulb: See detailed explanation of sitemap specific options on [sitemap.org](https://www.sitemaps.org/protocol.html).

:exclamation: This integration uses 'astro:build:done' hook (official @astrojs/sitemap does the same). The hook exposes only generated page paths. So with present version of Astro the integration has no abilities to analyze a page source, frontmatter etc. The integration can add `changefreq`, `lastmod` and `priority` attributes only in a batch or nothing.

### SitemapItem

|   Name         |     Type        | Required | Description        |
| :------------: | :-------------: | :------: | :----------------- |
| `url`          |    `String`     |    Yes   | Absolute url       |
| `changefreq`   |  `ChangeFreq`   |    No    |                    |
| `lastmod`      |     `String`    |    No    | ISO formatted date |
| `priority`     |    `Number`     |    No    |                    |
| `links`        |  `LinkItem[]`   |    No    | for localization   |

### LinkItem

|   Name         |      Type       | Required | Description               |
| :------------: | :-------------: | :------: | :------------------------ |
| `url`          |    `String`     |   Yes    | Absolute url              |
| `lang`         |    `String`     |   Yes    | hreflag, example: 'en-US' |

**Sample of _astro.config.mjs_**

```js
// astro.config.ts
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

export default defineConfig({
  site: 'https://example.com',
  experimental: {
    integrations: true,
  },
  integrations: [
    sitemap({
      /**
       *  These options are the same with the official integration `@astrojs/sitemap`
       */ 
      // exclude pages from sitemap
      filter: (page: string) => !/exclude-this/.test(page), // default - undefined
      // Absolute urls of extra pages
      customPages: [                                        // default - undefined
        // extra pages for sitemap
        'https://sample.com/virtual-one.html',
        'https://sample.com/virtual-two.html',
      ],

      // if `canonicalURL` is provided it will be used instead of `site` value
      canonicalURL: 'https://sample.com',                   // default - undefined
      /**
       *  `astro-sitemap` integration extra options
       */ 
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
      entryLimit: 10000,                          // default - 45000

      // sitemap specific
      changefreq: 'yearly',                       // default - undefined
      lastmod: new Date('May 01, 2019 03:24:00'), // default - undefined
      priority: 0.2,                              // default - undefined
     
      // Create or not a link to sitemap in '<head>' section of generated pages
      createLinkInHead: true,                     // default - true 
    }),
  ],
});
```

Generated sitemap content for this configuration:

```xml
...
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2019-05-01T03:24:00.000Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  ...
  <url>
    <loc>https://example.com/virtual-one.html</loc>
    <lastmod>2019-05-01T03:24:00.000Z</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.2</priority>
  </url>
  ...
    <url>
    <loc>https://example.com/some-special-path.html</loc>
    <lastmod>2022-06-07T13:34:35.096Z</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ...
```

## Localization

Supply the integration config with the `i18n` options. The integration will check generated page paths on presence of locale keys in paths.

Read more about localization on Google in [Advanced SEO](https://developers.google.com/search/docs/advanced/crawling/localized-versions#all-method-guidelines).

Let's have the following integration config:

```js
...
  canonicalURL: 'https://example.com', // You could provide the `site` option in astro.config instead of `canonicalURL`.
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

You could configure the integration with external file `sitemap.config.*` (`js`, `cjs`, `mjs`). Put it to the application `root` folder (see about `root` in official [docs](https://docs.astro.build/en/reference/configuration-reference/)).

The external config must contain a default export statement:

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

:exclamation: The current version of integration doesn't support typescript configs.

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

The `astro-sitemap` is based on the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap). Many thanks to the [Astro](https://astro.build/) team for their work!
