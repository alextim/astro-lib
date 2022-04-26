# astro-robots-txt 🗺

This **[Astro integration][astro-integration]** generates a robots.txt for your Astro project during build.

The **robots.txt** file informs search engines which pages on your website should be crawled. [See Google's own advice on robots.txt](https://developers.google.com/search/docs/advanced/robots/intro) to learn more.

## Installation


If you run into any hiccups, [feel free to log an issue on my GitHub](https://github.com/alextim/astro-robots-txt/issues).

### Install dependencies manually

First, install the `astro-robots-txt` integration like so:

```sh
#npm
npm install --save-dev astro-robots-txt

#yarn
yarn add -D astro-robots-txt

#pnpm
pnpm add -D astro-robots-txt
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

**astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // ...
  integrations: [robotsTxt()],
});
```

## Getting started

`astro-robots-txt` requires a deployment / site URL for generation. Add your site's URL under your `astro.config.*` using the `site` property:

**astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  // ...
  site: 'https://example.com',
  integrations: [robotsTxt()],
});
```

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your **robots.txt** under `dist/robots.txt`!

The **robots.txt**'s content will be

```text
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap.xml
```

You can also check our [Astro Integration Documentation][astro-integration] for more on integrations.

## Configuration

## Options

|   Name    |              Type               |             Default              |                             Description                              |
| :-------: | :-----------------------------: | :------------------------------: | :------------------------------------------------------------------: |
|  `host`   |            `String`             |                ``                |                          Host of your site                           |
| `sitemap` | `Boolean / String` / `String[]` |              `true`              |    Resulting output will be `Sitemap: your-site-url/sitemap.xml`     |
|           |                                 |                                  |        If `sitemap: false` - no `Sitemap` line in the output         |
|           |                                 |                                  | You could use for `sitemap` valid url string or array of url strings |
| `policy`  |           `Policy[]`            | [{ allow: '/', userAgent: '*' }] |                        List of `Policy` rules                        |

### Policy

|     Name     |         Type          | Required |                    Description                     |
| :----------: | :-------------------: | :------: | :------------------------------------------------: |
| `userAgent`  |       `String`        |   Yes    | You must provide name of user agent or wildcard |
|  `disallow`  | `String` / `String[]` |    No    |                 disallowed pathes                  |
|   `allow`    | `String` / `String[]` |    No    |                   allowed pathes                   |
| `crawlDelay` |       `Number`        |    No    |                                                    |
| `cleanParam` | `String` / `String[]` |    No    |                                                    |

Sample of **astro.config.mjs**

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://example.com',
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


:bulb: Important Notes

Only official "@astrojs/*" integrations are currently supported.  


To enable 3rd-party integrations, use the "--experimental-integrations" flag.  


Breaking changes may occur in this API before Astro v1.0 is released.  


Use the following to build your Astro site:

```sh
astro build --experimental-integrations
```

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/

Inspirations: 
- [gatsby-plugin-robots-txt](https://github.com/mdreizin/gatsby-plugin-robots-txt)
- [is-valid-hostname](https://github.com/miguelmota/is-valid-hostname)
