[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://war.ukraine.ua/support-ukraine/)

# astro-robots-txt

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _robots.txt_ for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

- <strong>[Why astro-robots-txt](#why-astro-robots-txt)</strong>
- <strong>[Installation](#installation)</strong>
- <strong>[Usage](#usage)</strong>
- <strong>[Configuration](#configuration)</strong>
- <strong>[External config file](#external-config-file)</strong>
- <strong>[Examples](#examples)</strong>
- <strong>[Contributing](#contributing)</strong>
- <strong>[Changelog](#changelog)</strong>
- <strong>[Inspirations](#inspirations)</strong>

---

## Why astro-robots-txt?

The _robots.txt_ file informs search engines which pages on your website should be crawled. [See Google's own advice on robots.txt](https://developers.google.com/search/docs/advanced/robots/intro) to learn more.

For Astro project you usually create the _robots.txt_ in a text editor and place it to the `public/` directory.
In that case you must manually synchronize `site` option in _astro.config.\*_ with `Sitemap:` record in _robots.txt_.  
It brakes DRY principle.

Sometimes, especially during development, it's necessary to prevent your site from being indexed. To achieve this you need to place the meta tag `<meta name="robots" content="noindex">` into the `<head>` section of your pages or add `X-Robots-Tag: noindex` to the HTTP response header, then add the lines `User-agent: *` and `Disallow: \` to _robots.txt_.  
Again you have to do it manually in two different places.

**astro-robots-txt** can help in both cases on the _robots.txt_ side. See details in this demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/advanced).

---

## Installation

<details>
  <summary>Quick Install</summary>

The experimental `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.

```sh
# Using NPM
npx astro add astro-robots-txt

# Using Yarn
yarn astro add astro-robots-txt

# Using PNPM
pnpx astro add astro-robots-txt
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.
  
Because this command is new, it might not properly set things up. If that happens, [log an issue on Astro GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>

<details>
  <summary>Manual Install</summary>

First, install the `astro-robots-txt` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install --save-dev astro-robots-txt
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  // ...
  integrations: [robotsTxt()],
}
```
  
Then, restart the dev server.
</details>

## Usage

The `astro-robots-txt` integration requires a deployment / site URL for generation. Add your site's URL under your _astro.config.\*_ using the `site` property.

Then, apply this integration to your _astro.config.\*_ file using the `integrations` property.

__`astro.config.mjs`__

```js
import { defineConfig } from 'astro/config';
import robotsTxt from 'astro-robots-txt';

export default defineConfig({
  site: 'https://example.com',

  integrations: [robotsTxt()],
});
```

Note that unlike other configuration options, `site` is set in the root `defineConfig` object, rather than inside the `robotsTxt()` call.  

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _robots.txt_ under `dist/robots.txt`!

> **Warning**
> If you forget to add a `site`, you'll get a friendly warning when you build, and the `robots.txt` file won't be generated.

<details>
  <summary>Example of generated `robots.txt` file</summary>

**`robots.txt`**

```text
User-agent: *
Allow: /
Sitemap: https://example.com/sitemap-index.xml
```

</details>

## Configuration

To configure this integration, pass an object to the `robotsTxt()` function call in `astro.config.mjs`.

__`astro.config.mjs`__

```js
...
export default defineConfig({
  integrations: [robotsTxt({
    transform: ...
  })]
});
```

<details>
  <summary><strong>sitemap</strong></summary>

|              Type               | Required |  Default value  |
| :-----------------------------: | :------: | :-------------: |
|`Boolean` / `String` / `String[]`|   No     |     `true`      |

If you omit the `sitemap` parameter or set it to `true`, the resulting output in a _robots.txt_ will be `Sitemap: your-site-url/sitemap-index.xml`.  

If you want to get the _robots.txt_ file without the `Sitemap: ...` entry, set the `sitemap` parameter to `false`.

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      sitemap: false,
    }),
  ],
};
```

When the `sitemap` is `String` or `String[]` its values must be a valid URL. Only **http** or **https** protocols are allowed. 

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',
  integrations: [
    robotsTxt({
      sitemap: [
        'https://example.com/first-sitemap.xml',
        'http://another.com/second-sitemap.xml',
      ],
    }),
  ],
};
```

</details>

<details>
  <summary><strong>sitemapBaseFileName</strong></summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| `String`|   No     | `sitemap-index` |

Sitemap file name before file extension (`.xml`). It will be used if the `sitemap` parameter is `true` or omitted.

:grey_exclamation: [@astrojs/sitemap](https://github.com/withastro/astro/tree/main/packages/integrations/sitemap) and [astro-sitemap](https://github.com/alextim/astro-lib/tree/main/packages/astro-sitemap) integrations have the `sitemap-index.xml` as their primary output. That is why the default value of `sitemapBaseFileName` is set to `sitemap-index`.

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',

  integrations: [
    robotsTxt({
      sitemapBaseFileName: 'custom-sitemap',
    }),
  ],
};
```

</details>

<details>
  <summary><strong>host</strong></summary>

| Type                | Required |  Default value  |
| :-----------------: | :------: | :-------------: |
|`Boolean` / `String` |   No     |  `undefined`    |

Some crawlers (Yandex) support a `Host` directive, allowing websites with multiple mirrors to specify their preferred domain.

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',

  integrations: [
    robotsTxt({
      host: 'your-domain-name.com',
    }),
  ],
};
```

If the `host` option is set to `true`, the `Host` output will be automatically resolved using the [site](https://docs.astro.build/en/reference/configuration-reference/#site) option from Astro config.

</details>

<details>
  <summary><strong>transform</strong></summary>

| Type                       | Required |  Default value  |
| :------------------------: | :------: | :-------------: |
| `(content: String): String`<br/>or<br/>`(content: String): Promise<String>` |   No     |  `undefined`    |

Sync or async function called just before writing the text output to disk.

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',

  integrations: [
    robotsTxt({
      transform(content) {
        return `# Some comments before the main content.\n# Second line.\n\n${content}`;        
      },
    }),
  ],
};
```

</details>

<details>
  <summary><strong>policy</strong></summary>

| Type       | Required |  Default value                      |
| :--------: | :------: | :---------------------------------: |
| `Policy[]` |   No     |  `[{ allow: '/', userAgent: '*' }]` |

List of `Policy` rules

**Type `Policy`**

|     Name     |         Type          | Required |                                              Description                                              |
| :----------: | :-------------------: | :------: | :---------------------------------------------------------------------------------------------------- |
| `userAgent`  |       `String`        |   Yes    | You must provide a name of the automatic client (search engine crawler).<br/>Wildcards are allowed.|
|  `disallow`  | `String` / `String[]` |    No    | Disallowed paths for crawling                                                                         |
|   `allow`    | `String` / `String[]` |    No    | Allowed paths for crawling                                                                            |
| `crawlDelay` |       `Number`        |    No    | Minimum interval (in secs) for the crawler to wait after loading one page, before starting other |
| `cleanParam` | `String` / `String[]` |    No    | Indicates that the page's URL contains parameters that should be ignored during crawling.<br/>Maximum string length is limited to 500.|

__`astro.config.mjs`__

```js
import robotsTxt from 'astro-robots-txt';

export default {
  site: 'https://example.com',

  integrations: [
    robotsTxt({
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
};
```

</details>

## External config file

You can configure the integration using the external file `robots-txt.config.*` (`js`, `cjs`, `mjs`). Put it in the application `root` folder (see about `root` in official [docs](https://docs.astro.build/en/reference/configuration-reference/)).

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

**How does the integration internally resolve a config?**

| Options parameter provided? | External config exists? | Result                                           |
| :-------------------------- | :---------------------: | :----------------------------------------------- |
| No                          |           No            | Default config used                              |
| Yes                         |           No            | Options parameter used                           |
| No                          |           Yes           | External config used                             |
| Yes                         |           Yes           | External config is merged with options parameter |

The external configuration usage example is in the demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/advanced).

:exclamation: The current version of the integration doesn't support typescript configs.

## Examples

| Example       | Source                                                                                 | Playground                                                                                                  |
| ------------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| basic         | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/basic)     | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/robots-txt/basic)     |
| advanced      | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/robots-txt/advanced)  | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/robots-txt/advanced)  |

## Contributing

You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/


## Inspirations

- [gatsby-plugin-robots-txt](https://github.com/mdreizin/gatsby-plugin-robots-txt)
- [generate-robotstxt](https://github.com/itgalaxy/generate-robotstxt)
- [is-valid-hostname](https://github.com/miguelmota/is-valid-hostname)
