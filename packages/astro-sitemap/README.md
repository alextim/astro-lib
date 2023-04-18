[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://war.ukraine.ua/support-ukraine/)

# astro-sitemap

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _sitemap.xml_ for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

- <strong>[Why astro-sitemap](#why-astro-sitemap)</strong>
- <strong>[Installation](#installation)</strong>
- <strong>[Usage](#usage)</strong>
- <strong>[Configuration](#configuration)</strong>
- <strong>[Localization](#localization)</strong>
- <strong>[Examples](#examples)</strong>
- <strong>[Contributing](#contributing)</strong>
- <strong>[Changelog](#changelog)</strong>
- <strong>[Inspirations](#inspirations)</strong>
---

## Why astro-sitemap?

The _sitemap.xml_ file provides information about structure of your website, about its content: pages, images, videos and relations between them. [See Google's advice on sitemap](https://developers.google.com/search/docs/advanced/sitemaps/overview) to learn more.

The **astro-sitemap** integration does everything the official [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) integration does but much more.

Advantages of **astro-sitemap** over [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap):

- Exclude pages from a sitemap by glob patterns.
- More control on the sitemap output:
  - manage XML namespaces;
  - `lastmod` format option;
  - possibility to add a link to custom XSL.
- Automatically creates a link to the sitemap in the `<head>` section of generated pages.
- Better logging.

Part of the functionality of **astro-sitemap** has become a minor update of the official integration [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) from v0.1.2 to version 0.2.0.

Shared functionality with the official [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap):

- Split up your large sitemap into multiple sitemaps by a custom limit.
- Ability to add sitemap specific attributes such as `changefreq`, `lastmod`, `priority`.
- Final output customization via JS function (sync or async).
- Localization support. In a build time the integration analyses the pages urls for presence of locale signatures in paths to establish relations between pages.
- Reliability: all config options are validated.

:exclamation: Both official and **astro-sitemap** integrations don't support SSR.

:exclamation: This integration uses `astro:build:done` hook (the official [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) does the same). This hook exposes only generated page paths. Thus, in the current version of Astro, both integrations don't have the ability to analyze the page source, frontmatter, etc. They can add `changefreq`, `lastmod` and `priority` attributes only in a batch or nothing.

---

## Installation

<details>
  <summary>Quick Install</summary>

The experimental `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add astro-sitemap

# Using Yarn
yarn astro add astro-sitemap

# Using PNPM
pnpx astro add astro-sitemap
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.
  
Because this command is new, it might not properly set things up. If that happens, [log an issue on Astro GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>

<details>
  <summary>Manual Install</summary>

First, install the `astro-sitemap` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install --save-dev astro-sitemap
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  // ...
  integrations: [sitemap()],
}
```
  
Then, restart the dev server.
</details>

## Usage

The `astro-sitemap` integration requires a deployment / site URL for generation. Add your site's URL under your _astro.config.\*_ using the `site` property.


__`astro.config.mjs`__

```js
import { defineConfig } from 'astro/config';
import sitemap from 'astro-sitemap';

export default defineConfig({
  // ...
  site: 'https://example.com',

integrations: [sitemap()],
});
```

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _sitemap_ under `dist/sitemap-index.xml` and `dist/sitemap-0.xml`!

<details>
  <summary>Example of generated sitemap content</summary>

**`sitemap-index.xml`**

```xml
<?xml version="1.0" encoding="UTF-8"?>
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>https://example.com/sitemap-0.xml</loc>
  </sitemap>
</sitemapindex>
```

**`sitemap-0.xml`**

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

</details>

<details>
  <summary>Example of inserted HTML</summary>

All pages generated at build time will contain a link to the sitemap in the `<head>` section:

```html
<link rel="sitemap" type="application/xml" href="/sitemap-index.xml">
```

</details>

## Configuration

To configure this integration, pass an object to the `sitemap()` function call in `astro.config.mjs`.

:bulb: For this integration to work correctly, it is recommended to use the `mjs` or `js` configuration file extensions.

__`astro.config.mjs`__

```js
...
export default defineConfig({
  integrations: [sitemap({
    filter: ...
  })]
});
```


<details>
  <summary><strong>canonicalURL</strong></summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| `String`|   No     |   `undefined`   |

 Absolute URL. The integration needs `canonicalURL` or `site` from astro.config. If both values are provided, only `canonicalURL` will be used by the integration.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    canonicalURL: 'https://another-domain.com',
  })],
};
```

</details>

<details>
  <summary><strong>filter</strong></summary>

|  Type                       | Required |  Default value  |
| :-------------------------: | :------: | :-------------: |
| (page: `String`): `Boolean` |   No     |   `undefined`   |

Function to filter generated pages to exclude some paths from the sitemap. 

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    filter(page) {
      return !/exclude-this/.test(page);
    },
  })],
};
```

</details>

<details>
  <summary><strong>exclude</strong></summary>

|  Type      | Required |  Default value  |
| :--------: | :------: | :-------------: |
| `String[]` |   No     |   `undefined`   |

The `exclude` option is an array of [glob patterns](https://github.com/isaacs/minimatch#features) to exclude static routes from the generated sitemap.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    exclude: ['404', 'blog-*/'],
  })],
};
```

</details>

<details>
  <summary><strong>customPages</strong></summary>

|  Type      | Required |  Default value  |
| :--------: | :------: | :-------------: |
| `String[]` |   No     |   `undefined`   |

Absolute URL list. It will be merged with generated pages urls.  

You should also use `customPages` to manually list sitemap pages when using an SSR adapter. Currently, integration cannot detect your site's pages unless you are building statically. To avoid an empty sitemap, list all pages (including the base origin) with this configuration option.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    customPages: [
      'https://example.com/virtual-one.html',
      'https://example.com/virtual-two.html',
    ],
  })],
};
```

</details>

<details>
  <summary><strong>entryLimit</strong></summary>

|  Type    | Required |  Default value  |
| :------: | :------: | :-------------: |
| `Number` |   No     |   45000         |

Number of entries per one sitemap file.  

The integration creates a separate `sitemap-${i}.xml` file for each batch of 45000 and adds this file to index - `sitemap-index.xml`.  

See more on [Google](https://developers.google.com/search/docs/advanced/sitemaps/large-sitemaps/).

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    entryLimit: 10000,
  })],
};
```

</details>

<details>
  <summary><strong>changefreq</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
| `EnumChangeFreq` |   No     |   `undefined`   |

This option corresponds to the `<changefreq>` tag in the [Sitemap XML specification.](https://www.sitemaps.org/protocol.html).  

How frequently the page is likely to change.  

Ignored by Google.  

Available values: 

```js
export enum EnumChangefreq {
  DAILY = 'daily',
  MONTHLY = 'monthly',
  ALWAYS = 'always',
  HOURLY = 'hourly',
  WEEKLY = 'weekly',
  YEARLY = 'yearly',
  NEVER = 'never',
}
```

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    changefreq: EnumChangeFreq.WEEKLY,
  })],
};
```

</details>


<details>
  <summary><strong>lastmod</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
| `Date`       |   No     |   `undefined`   |

This option corresponds to the `<lastmod>` tag in the [Sitemap XML specification.](https://www.sitemaps.org/protocol.html).  

The date of page last modification.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    lastmod: Date(),
  })],
};
```

</details>

<details>
  <summary><strong>priority</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
| `Number`     |   No     |   `undefined`   |

This option corresponds to the `<priority>` tag in the [Sitemap XML specification.](https://www.sitemaps.org/protocol.html).  

The priority of this URL relative to other URLs on your site. Valid values range from 0.0 to 1.0.  

Ignored by Google.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    priority: 0.9,
  })],
};
```

</details>

<details>
  <summary><strong>serialize</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
| (item: `SitemapItem`): `SitemapItemLoose` | `undefined` |<br/>Promise<`SitemapItemLoose` | `undefined`> |   No     |   `undefined`   |

Function to process an array of sitemap entries just before writing them to disk. Async or sync.  

The `undefined` return value excludes the passed entry from the sitemap.

<details>
  <summary><strong>Type `SitemapItem`*</strong></summary>


|   Name         |     Type     | Required | Description        |
| :------------: | :----------: | :------: | :----------------- |
| `url`          |   `String`   |    Yes   | Absolute url       |
| `changefreq`   | `ChangeFreq` |    No    |                    |
| `lastmod`      |   `String`   |    No    | ISO formatted date |
| `priority`     |   `Number`   |    No    |                    |
| `links`        | `LinkItem[]` |    No    | for localization   |
</details>

<details>
  <summary><strong>Type `LinkItem`</strong></summary>

|   Name         |      Type       | Required | Description               |
| :------------: | :-------------: | :------: | :------------------------ |
| `url`          |    `String`     |   Yes    | Absolute URL              |
| `lang`         |    `String`     |   Yes    | hreflag, example: 'en-US' |
</details>

<details>
  <summary><strong>Interface `SitemapItemLoose`</strong></summary>

The `SitemapItemLoose` interface is a base for the `SitemapItem`.  

It has the properties `video`, `img` and many more.  

More details about `SitemapItemLoose` interface see in the **sitemap.js** repo [readme](https://github.com/ekalinin/sitemap.js/blob/master/README.md) and types source [code](https://github.com/ekalinin/sitemap.js/blob/master/lib/types.ts).  

</details>

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    serialize(item) { 
      if (/exclude-this/.test(item.url)) {
        return undefined;
      }        
      if (/special-page/.test(item.url)) {
        item.changefreq = 'daily';
        item.lastmod = new Date();
        item.priority = 0.9;
      }
      return item;
    },
  })],
};
```

</details>

<details>
  <summary><strong>xslUrl</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
|  `String`    |   No     |   `undefined`   |

Absolute URL of XSL file to style XML or transform it to other format. Ignored by search engines.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    xslUrl: 'https://example.com/style.xsl',
  })],
};
```

**Example of XML output**

```xml
<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="https://example/style.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
...
```

</details>

<details>
  <summary><strong>xmlns</strong></summary>

|  Type        | Required |  Default value  |
| :----------: | :------: | :-------------: |
|  `NSArgs`    |   No     |   `undefined`   |

Set the XML namespaces by xmlns attributes in `<urlset>` element.

<details>
  <summary><strong>Interface `NSArgs`</strong></summary>

|   Name   |  Type     | Required | Default | Description                                                              |
| :------: | :-------: | :------: | :-----: | :----------------------------------------------------------------------- |
| `xhtml`  | `Boolean` |    No    | true    | `xmlns:xhtml="http://www.w3.org/1999/xhtml"`                             |
| `news`   | `Boolean` |    No    |         | `xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"`            |
| `video`  | `Boolean` |    No    |         | `xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"`          |
| `image`  | `Boolean` |    No    |         | `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"`          |
| `custom` | `String[]`|    No    |         | Any custom namespace. Elements of array'll be used `as is` without any validation. |
</details>

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
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
  })],
};
```

__Example of XML output__

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
...
```

</details>

<details>
  <summary><strong>lastmodDateOnly</strong></summary>

|  Type         | Required |  Default value  |
| :-----------: | :------: | :-------------: |
|  `Boolean`    |   No     |   `undefined`   |

If its value is `true`, the `lastmod` field in the XML output will contain a date part only. 

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    lastmodDateOnly: true,
    lastmod: Date(),
  })],
};
```

</details>

<details>
  <summary><strong>createLinkInHead</strong></summary>

|  Type         | Required |  Default value  |
| :-----------: | :------: | :-------------: |
|  `Boolean`    |   No     |   `true`        |

Create a link on the sitemap in `<head>` section of generated pages.  

The final output reprocessing is used for this. It can impact build time for large sites.

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    createLinkInHead: false,
  })],
};
```

</details>

:bulb: See detailed explanation of sitemap specific options on [sitemap.org](https://www.sitemaps.org/protocol.html).

## Localization

Supply the integration config with the `i18n` option as an object with two required properties:

<details>
  <summary><strong>locales</strong></summary>

|  Type        | Required |
| :----------: | :------: |
|  `Record<String, String>`    |   Yes    |

Key/value - pairs. The key is used to look up the locale part of the page path. The value is a language attribute, only English alphabet and hyphen allowed.  
 
See more on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/lang).

</details>

<details>
  <summary><strong>defaultLocale</strong></summary>

|  Type        | Required |
| :----------: | :------: |
|  `String`    |   Yes    |

`defaultLocale` value must exist as one of the `locales` keys.

</details>

__`astro.config.mjs`__

```js
import sitemap from 'astro-sitemap';

export default {
  site: 'https://example.com',

  integrations: [sitemap({
    i18n: {
      // All URLs that don't contain `es` or `fr` after `https://example.com/` will be treated as default locale, i.e. `en`
      defaultLocale: 'en',  
      locales: {
        en: 'en-US',     // The `defaultLocale` value must present in `locales` keys
        es: 'es-ES',
        fr: 'fr-CA',
      },
    },
  })],
};
```

__Example of XML output__

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


## Examples

| Example       | Source                                                                                 | Playground                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| basic         | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/sitemap/basic)        | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/sitemap/basic)        |
| advanced      | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/sitemap/advanced)     | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/sitemap/advanced)     |
| i18n          | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/sitemap/i18n)         | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/sitemap/i18n)         |

## Contributing

You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

## Inspiration

Module based on the awesome [sitemap.js](https://github.com/ekalinin/sitemap.js) package ❤️.
