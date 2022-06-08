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

- Ability to add sitemap specific attributes such as `changefreq`, `lastmod`, `priority`.
- the most important: localization support. In a build time the integration analyses the pages urls for presence of locale signatures in paths to establish relations between pages.
- Output file name customization.
- Flexible configuration: configure the integration in external config, in astro.config or combine both.
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

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _sitemap.xml_ under `dist/sitemap.xml`!

Generated sitemap content for two pages website:

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

You can also check [Astro Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/) for more on integrations.

## Configuration

## Options

|                                                                        Name                                                                        |             Type              | Required | Default       | Description                                                                                                                                                              |
| :------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------: | :------: | :------------ | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|                                                                      `filter`                                                                      | `(page: String):<br/>Boolean` |    No    | undefined     | The same as official. Function to filter generated pages to exclude some paths from a sitemap                                                                            |
|                                                                   `customPages`                                                                    |          `String[]`           |    No    | undefined     | The same as official. Absolute url list. It will be merged with generated pages urls.                                                                                    |
|                                                                   `canonicalURL`                                                                   |           `String`            |    No    | undefined     | The same as official. Absolute url. The integration needs `site` from astro.config or `canonicalURL`. If both provided only `canonicalURL` will be used.                 |
|                                                                     `outfile`                                                                      |           `String`            |    No    | `sitemap.xml` | Output file name.                                                                                                                                                        |
|                                                                    `changefreq`                                                                    |         `ChangeFreq`          |    No    | undefined     | Sitemap specific.                                                                                                                                                        |
| How frequently the page is likely to change.<br/>Available values: `always` \| `hourly` \| `daily` \| `weekly` \| `monthly` \| `yearly` \| `never` |
|                                                                     `lastmod`                                                                      |            `Date`             |    No    | undefined     | Sitemap specific. The date of last modification of the page                                                                                                              |
|                                                                     `priority`                                                                     |           `Number`            |    No    | undefined     | Sitemap specific. The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0                                                       |
|                                                                      **i18n**                                                                      |           `object`            |    No    | undefined     | Provide this object to start                                                                                                                                             |
|                                                                  `defaultLocale`                                                                   |           `String`            |   Yes    |               | Its value has to be exists as one of `locales` keys.                                                                                                                     |
|                                                                     `locales`                                                                      |   `Record<String, String>`    |   Yes    |               | Key/value - pairs.                                                                                                                                                       |
|                                                                                                                                                    |                               |          |               | The key is used to look for a locale part in a page path                                                                                                                 |
|                                                                                                                                                    |                               |          |               | The value is a language attribute, only English alphabet and hyphen allowed. See more on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang) |

:bulb: See detailed explanation of sitemap specific options on [sitemap.org](https://www.sitemaps.org/protocol.html).

**Sample of _astro.config.mjs_**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

export default defineConfig({
  site: 'https://example.com',
  experimental: {
    integrations: true,
  },
  integrations: [
    sitemap({
      // the same with official integration
      filter: (page) => !/exclude-this/.test(page), // exclude pages from sitemap
      customPages: [
        // extra pages for sitemap
        'https://sample.com/virtual-one.html',
        'https://sample.com/virtual-two.html',
      ],
      canonicalURL: 'https://sample.com', // `canonicalURL` option value will be used instead of `site` value

      // astro-sitemap integration options from here
      outfile: 'custom-sitemap.xml', // default - `sitemap.xml`

      // sitemap specific
      changefreq: 'monthly',
      lastmod: new Date(),
      priority: 0.8,
    }),
  ],
});
```

Generated sitemap content for this configuration:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://example.com/</loc>
    <lastmod>2022-06-07T13:34:35.096Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ...
  <url>
    <loc>https://example.com/virtual-one.html</loc>
    <lastmod>2022-06-07T13:34:35.096Z</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  ...
</urlset>
```

## Localization

Supply integration config with the `i18n` options. The integration will check generated page paths on presence of locale keys in paths.

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
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
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
</urlset>
```

## Using Configuration Files

You could configure the integration with external file `sitemap.config.*` (`js`, `cjs`, `mjs`). Put it to the application `root` folder (see about `root` in official [docs](https://docs.astro.build/en/reference/configuration-reference/)).

The external config must have a default export statement:

```js
// ESM
export default {
  ...
};
```

or

```js
// CommonJS
exports = {
  ...
};
```

:exclamation: Current version of integration doesn't support typescript configs.

### How does the integration internally resolve a config?

| Options parameter provided? | External config exists? | Result                                           |
| :-------------------------- | :---------------------: | :----------------------------------------------- |
| No                          |           No            | Default config used                              |
| Yes                         |           No            | Options parameter used                           |
| No                          |           Yes           | External config used                             |
| Yes                         |           Yes           | External config is merged with options parameter |

The external configuration usage example is in the demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/sitemap/advanced).

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

The `astro-sitemap` is based on the source code of the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap). Thanks for your well done job!
