[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://bank.gov.ua/en/about/support-the-armed-forces)

# astro-robots-txt

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _robots.txt_ for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

---

The _robots.txt_ file informs search engines which pages on your website should be crawled. [See Google's own advice on robots.txt](https://developers.google.com/search/docs/advanced/robots/intro) to learn more.

## Why astro-robots-txt?

For Astro project you usually create the _robots.txt_ in a text editor and place it to the `public/` directory.
In that case you must manually synchronize `site` option in _astro.config.\*_ with `Sitemap:` record in _robots.txt_.  
It brakes DRY principle.

Sometimes, especially during development, it's needed to prevent your site from being indexed. To achieve this you need place meta tag `<meta name="robots" content="noindex">` in the `<head>` section of pages or add `X-Robots-Tag: noindex` in HTTP header response, then add lines `User-agent: *` and `Disallow: \` to _robots.txt_.  
Again you do it manually in two separate places.

**astro-robots-txt** could help in both two cases on the _robots.txt_ side. See details in this demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/advanced).

---

## Installation

There are two ways to add **astro-robots-txt** integration to your Astro project.

### Astro CLI tool

You should run `astro add` command in your project directory. This command after prompt will install required dependencies and apply changes to _astro.config.\*_.

```sh
# Using NPM
npx astro add astro-robots-txt

# Using Yarn
yarn astro add astro-robots-txt

# Using PNPM
pnpx astro add astro-robots-txt
```

If you run into any hiccups, [feel free to log an issue on my GitHub](https://github.com/alextim/astro-lib/issues).

### Install dependencies manually

First, install the **astro-robots-txt** integration like so:

```sh
# Using NPM
npm install --save-dev astro-robots-txt

# Using Yarn
yarn add -D astro-robots-txt

# Using PNPM
pnpm add -D astro-robots-txt
```

Then apply this integration to your _astro.config.\*_. All details below in **Getting started**.

## Getting started

The `astro-robots-txt` integration requires a deployment / site URL for generation. Add your site's URL under your _astro.config.\*_ using the `site` property.

:exclamation: Provide the `experimental` property to your _astro.config.\*_, because only official **@astrojs/\*** integrations are currently supported by Astro. Set the `experimental.integrations` value to `true`.

Then, apply this integration to your _astro.config.\*_ file using the `integrations` property.

**astro.config.mjs**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // ...
  site: 'https://example.com',
  // Important!
  // Only official '@astrojs/*' integrations are currently supported by Astro.
  // Add 'experimental.integrations: true' to make 'astro-robots-txt' working
  // with 'astro build' command.
  experimental: {
    integrations: true,
  },
  integrations: [robotsTxt()],
});
```

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _robots.txt_ under `dist/robots.txt`!

The _robots.txt_'s content will be

```text
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

You can also check [Astro Integration Documentation](https://docs.astro.build/en/guides/integrations-guide/) for more on integrations.

## Configuration

## Options

|   Name    |              Type               |             Default              |                                                                                                                                        Description                                                                                                                                         |
| :-------: | :-----------------------------: | :------------------------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
|  `host`   |            `String`             |                ``                |                                                                                                                                     Host of your site                                                                                                                                      |
| `sitemap` | `Boolean / String` / `String[]` |              `true`              | Resulting output in a _robots.txt_ will be `Sitemap: your-site-url/sitemap.xml`.<br/>If `sitemap: false` - no `Sitemap` line in the output.<br/>When the `sitemap` is `String` or `String[]` its values have to be a valid **http** url. Empty strings or other protocols are not allowed. |
| `policy`  |           `Policy[]`            | [{ allow: '/', userAgent: '*' }] |                                                                                                                                   List of `Policy` rules                                                                                                                                   |

### Policy

|     Name     |         Type          | Required |                                              Description                                              |
| :----------: | :-------------------: | :------: | :---------------------------------------------------------------------------------------------------: |
| `userAgent`  |       `String`        |   Yes    |                            You must provide name of user agent or wildcard                            |
|  `disallow`  | `String` / `String[]` |    No    |                                       Disallowed paths to index                                       |
|   `allow`    | `String` / `String[]` |    No    |                                        Allowed paths to index                                         |
| `crawlDelay` |       `Number`        |    No    | Minimum interval (in secs) for the search robot to wait after loading one page, before starting other |
| `cleanParam` | `String` / `String[]` |    No    |         Indicates that the page URL contains parameters that should be ignored when indexing          |

**Sample of _astro.config.mjs_**

```js
// astro.config.mjs
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

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
import robotsTxt from 'astro-robots-txt';

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

## Using Configuration Files

You could configure the integration with external file `robots-txt.config.*` (`js`, `cjs`, `mjs`). Put it to the application `root` folder (see about `root` in official [docs](https://docs.astro.build/en/reference/configuration-reference/)).

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

The external configuration usage example is in the demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/advanced).

:exclamation: Important Notes

Only official **@astrojs/\*** integrations are currently supported by Astro.

There are two possibilities to make **astro-robots-txt** integration working with current version of Astro.

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
