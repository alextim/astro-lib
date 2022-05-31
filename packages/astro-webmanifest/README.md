<a href="https://bank.gov.ua/en/about/support-the-armed-forces">
  <img src="https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg" alt="Help Ukraine now!">
</a>

# astro-webmanifest

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _web application manifest_, favicon, icons and inserts appropriate data to a page `<head>` section for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

The _web app manifest_ provides information about a [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) in a JSON text file. [See Google's advice on web app manifest](https://web.dev/add-manifest/) to learn more. Current standard for the manifest is [here](https://w3c.github.io/manifest/). Additional info is on [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).

## Why astro-webmanifest?

This integration provides numerous features beyond manifest configuration to make your life easier, they are:

- automatic icon generation - generates multiple icon sizes from a single source;
- favicon support;
- inserts all required `link`s and `meta` to the `<head>` section of generated pages;
- legacy icon support (iOS);
- localization - provides unique manifests for path-based localization.

Each of these features has extensive configuration available so you are always in control.

See usage in the demo repos: [basic](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/basic) and [advanced](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/i18n).

---

## Installation

There are two ways to add **astro-webmanifest** integration to your Astro project.

### Astro CLI tool

You should run `astro add` command in your project directory. This command after prompt will install required dependencies and apply changes to _astro.config.\*_.

```sh
# Using NPM
npx astro add astro-webmanifest

# Using Yarn
yarn astro add astro-webmanifest

# Using PNPM
pnpx astro add astro-webmanifest
```

If you run into any hiccups, [feel free to log an issue on my GitHub](https://github.com/alextim/astro-lib/issues).

### Install dependencies manually

First, install the **astro-webmanifest** integration like so:

```sh
# Using NPM
npm install --save-dev astro-webmanifest

# Using Yarn
yarn add -D astro-webmanifest

# Using PNPM
pnpm add -D astro-webmanifest
```

Then apply this integration to your _astro.config.\*_. All details below in **Getting started**.

## Getting started

The `astro-webmanifest` integration requires configuration object for generation. More details about the configuration is in the next section.

:exclamation: Provide the `experimental` property to your _astro.config.\*_, because only official **@astrojs/\*** integrations are currently supported by Astro. Set the `experimental.integrations` value to `true`.

Then, apply this integration to your _astro.config.\*_ file using the `integrations` property.

To configure integration you should provide at least two properties:

- `name`: your application name;
- `icon`: source for icon and favicon generation.

**astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

export default defineConfig({
  // ...
  site: 'https://example.com',
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-webmanifest' working
  // with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [
    webmanifest({
      name: 'Your App name',
      icon: 'src/images/your-icon.svg',
    }),
  ],
});
```

Put a source file for icon generation to the `src/images` folder.

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _web manifest_, icons, favicon under `dist/` folder!

The _manifest.webmanifest_'s content will be

```json
{
  "name": "Your App name",
  "icons": [
    {
      "src": "icons/icon-48x48.png",
      "sizes": "48x48",
      "type": "image/png"
    },
    {
      "src": "icons/icon-72x72.png",
      "sizes": "72x72",
      "type": "image/png"
    },
    {
      "src": "icons/icon-96x96.png",
      "sizes": "96x96",
      "type": "image/png"
    },
    {
      "src": "icons/icon-144x144.png",
      "sizes": "144x144",
      "type": "image/png"
    },
    {
      "src": "icons/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "icons/icon-256x256.png",
      "sizes": "256x256",
      "type": "image/png"
    },
    {
      "src": "icons/icon-384x384.png",
      "sizes": "384x384",
      "type": "image/png"
    },
    {
      "src": "icons/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

In the `<head>` section of generated pages it will be the links:

```html
<link rel="icon" href="/favicon-32x32.png" type="image/png" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="manifest" href="/manifest.webmanifest" crossorigin="anonymous" />
```

You can also check [Astro Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/) for more on integrations.

## Configuration

## Options

|   Name    |              Type               |             Default              |                                          Description                                          |
| :-------: | :-----------------------------: | :------------------------------: | :-------------------------------------------------------------------------------------------: |
|  `host`   |            `String`             |                ``                |                                       Host of your site                                       |
| `sitemap` | `Boolean / String` / `String[]` |              `true`              |        Resulting output in a _robots.txt_ will be `Sitemap: your-site-url/sitemap.xml`        |
|           |                                 |                                  |                    If `sitemap: false` - no `Sitemap` line in the output.                     |
|           |                                 |                                  | You could use for the `sitemap` a valid **http** url string or array of **http** url strings. |
| `policy`  |           `Policy[]`            | [{ allow: '/', userAgent: '*' }] |                                    List of `Policy` rules                                     |

### Policy

|     Name     |         Type          | Required |                   Description                   |
| :----------: | :-------------------: | :------: | :---------------------------------------------: |
| `userAgent`  |       `String`        |   Yes    | You must provide name of user agent or wildcard |
|  `disallow`  | `String` / `String[]` |    No    |                Disallowed paths                 |
|   `allow`    | `String` / `String[]` |    No    |                  Allowed paths                  |
| `crawlDelay` |       `Number`        |    No    |                                                 |
| `cleanParam` | `String` / `String[]` |    No    |                                                 |

**Sample of _astro.config.mjs_**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-webmanifest';

export default defineConfig({
  site: 'https://example.com',
  experimental: {
    integrations: true,
  },
  integrations: [
    robotsTxt({
      host: 'example.com',
      sitemap: ['https://example.com/main-sitemap.xml', 'https://example.com/images-sitemap.xml'],
      policy: [
        {
          userAgent: 'Googlebot',
          allow: '/',
          disallow: ['/search'],
          crawlDelay: 2,
        },
        {
          userAgent: 'OtherBot',
          allow: ['/allow-for-all-bots', '/allow-only-for-other-bot'],
          disallow: ['/admin', '/login'],
          crawlDelay: 2,
        },
        {
          userAgent: '*',
          allow: '/',
          disallow: '/search',
          crawlDelay: 10,
          cleanParam: 'ref /articles/',
        },
      ],
    }),
  ],
});
```

if you want to get a _robots.txt_ without `Sitemap: ...` record please set the `sitemap` option to `false`.

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-webmanifest';

export default defineConfig({
  // ...
  site: 'https://example.com',
  experimental: {
    integrations: true,
  },
  integrations: [
    robotsTxt({
      sitemap: false,
      // ...
    }),
  ],
});
```

:exclamation: Important Notes

Only official **@astrojs/\*** integrations are currently supported by Astro.

There are two possibilities to make **astro-webmanifest** integration working with current version of Astro.

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

**Inspirations:**

- [gatsby-plugin-robots-txt](https://github.com/mdreizin/gatsby-plugin-robots-txt)
- [generate-robotstxt](https://github.com/itgalaxy/generate-robotstxt)
- [is-valid-hostname](https://github.com/miguelmota/is-valid-hostname)
