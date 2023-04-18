[![Help Ukraine now!](https://raw.githubusercontent.com/alextim/help-ukraine-win-flag/master/stop-russian-agressian-help-ukraine-now-link.svg 'Help Ukraine now!')](https://war.ukraine.ua/support-ukraine/)

# astro-webmanifest

This **[Astro integration](https://docs.astro.build/en/guides/integrations-guide/)** generates a _web application manifest_, favicon, icons and inserts appropriate html into `<head>` section for your Astro project during build.

![Release](https://github.com/alextim/astro-lib/actions/workflows/release.yaml/badge.svg) [![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)

- <strong>[Why astro-webmanifest](#why-astro-webmanifest)</strong>
- <strong>[Installation](#installation)</strong>
- <strong>[Usage](#usage)</strong>
- <strong>[Generation modes](#generation-modes)</strong>
- <strong>[Configuration](#configuration)</strong>
- <strong>[Localization](#localization)</strong>
- <strong>[Examples](#examples)</strong>
- <strong>[Contributing](#contributing)</strong>
- <strong>[Changelog](#changelog)</strong>
---

## Why astro-webmanifest?

The _web app manifest_ provides information about a [Progressive Web App (PWA)](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps) in a JSON text file. [See Google's advice on web app manifest](https://web.dev/add-manifest/) to learn more. Current standard for the manifest is on [W3C](https://w3c.github.io/manifest/). See also on [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).  


This integration provides numerous features beyond manifest configuration to make your life easier, they are:

- automatic icon generation - generates multiple icon sizes from a single source;
- favicon support;
- inserts all required `link`s and `meta` into `<head>` section of generated pages;
- legacy icon support (iOS);
- localization - provides unique manifests for path-based localization.

Each of these features has extensive configuration available so you are always in control.

---

## Installation

<details>
  <summary>Quick Install</summary>

The experimental `astro add` command-line tool automates the installation for you. Run one of the following commands in a new terminal window. (If you aren't sure which package manager you're using, run the first command.) Then, follow the prompts, and type "y" in the terminal (meaning "yes") for each one.  

```sh
# Using NPM
npx astro add astro-webmanifest

# Using Yarn
yarn astro add astro-webmanifest

# Using PNPM
pnpx astro add astro-webmanifest
```

Then, restart the dev server by typing `CTRL-C` and then `npm run astro dev` in the terminal window that was running Astro.
  
Because this command is new, it might not properly set things up. If that happens, [log an issue on Astro GitHub](https://github.com/withastro/astro/issues) and try the manual installation steps below.

</details>  

<details>
  <summary>Manual Install</summary>

First, install the `astro-webmanifest` package using your package manager. If you're using npm or aren't sure, run this in the terminal:

```sh
npm install --save-dev astro-webmanifest
```

Then, apply this integration to your `astro.config.*` file using the `integrations` property:

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  // ...
  integrations: [
    webmanifest({
      ...
    }),
  ],
};
```
  
Then, restart the dev server.
</details>

## Usage

The `astro-webmanifest` integration requires the [config](#config) object to have at least a `name` option.

__`astro.config.mjs`__

```js
import { defineConfig } from 'astro/config';
import webmanifest from 'astro-webmanifest';

export default defineConfig({
  // ...
  integrations: [
    webmanifest({
      /**
       * required
       **/
      name: 'Your App name',

      /**
       * optional
       **/
      icon: 'src/images/your-icon.svg', // source for favicon & icons

      short_name: 'App',
      description: 'Here is your app description',
      start_url: '/',
      theme_color: '#3367D6',
      background_color: '#3367D6',
      display: 'standalone',
    }),
  ],
});
```

Next put a source file `your-icon.svg` for icons generation to the `src/images` folder. This is optional.  

Now, [build your site for production](https://docs.astro.build/en/reference/cli-reference/#astro-build) via the `astro build` command. You should find your _web manifest_, all icons, favicons under `dist/` folder!

<details>
  <summary>Example of generated `manifest.webmanifest` file</summary>

**`manifest.webmanifest`**

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
  ],
  "short_name": "App",
  "description": "Here is your app description",
  "start_url": "/",
  "theme_color": "#3367D6",
  "background_color": "#3367D6",
  "display": "standalone"
}
```

</details>

<details>
  <summary>Example of inserted HTML</summary>

  All pages generated at build time will contain the following in the `<head>` section:


```html
<link rel="icon" href="/favicon-32x32.png" type="image/png" />
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<meta name="theme-color" content="#3367D6" />
<link rel="manifest" href="/manifest.webmanifest" crossorigin="anonymous" />
```

</details>

## Generations modes

There are 3 usage modes of `astro-webmanifest` integration: auto, hybrid and manual.

<details>
  <summary>Automatic mode</summary>

For the most users - you need only the `icon` option to generate all required icons and favicons.

The integration has default icon preset to generate all icons.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      icon: 'src/images/your-icon.svg',
    }),
  ],
};
...
```

</details>

<details>
  <summary>Hybrid mode</summary>

Additionally to the `icon` option you need to provide the `icons` array as a template to generate required icons.

No default icons. Only icons from the array will be created.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      icon: 'src/images/your-icon.svg',
      icons: [
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        // add any other icon sizes
      ],
    }),
  ],
};  
```

</details>

<details>
  <summary>Manual mode</summary>

If you don't provide `icon` option, you will be fully responsible for manifest configuration.

You should create all icons and favicons manually and put them in a `public` folder.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      icons: [
        {
          src: 'icons/icon-96x96.png',
          sizes: '96x96',
          type: 'image/png',
        },
        {
          src: 'icons/icon-256x256.png',
          sizes: '256x256',
          type: 'image/png',
        },
        // add any other icons
      ],
    }),
  ],
};
```

</details>

## Configuration

To configure this integration, pass an object to the `webmanifest()` function call in `astro.config.mjs`.

:bulb: For this integration to work correctly, it is recommended to use the `mjs` or `js` configuration file extensions.

__`astro.config.mjs`__

```js
...
export default defineConfig({
  integrations: [webmanifest({
    name: ...
  })]
});
```


The integration option object extends the `Webmanifest` type and optionally has `config` and `locales` properties as an object.

### `config` property
<details>
    <summary>outfile</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| `String`|   No     | `manifest.webmanifest` |

Template name for generated manifest file.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        outfile: 'site.webmanifest',
      },
    }),
  ],
};  
```

See also [Localization](#localization) section.

  </details>
  
  <details>
    <summary>indent</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| `String`|   No     |  4 spaces |

Leading characters for each line inserted into `<head>` to make the output more readable.

This only works when any of the `insertFaviconLinks`, `insertThemeColorMeta`, `insertManifestLink`, `insertAppleTouchLinks` properties are set to `true`.  

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        // Empty string to cut off some bytes from html
        indent: '',
        // ...
      },
    }),
  ],
};  
```

  </details>  

  <details>
    <summary>eol</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| `String`|   No     | `\n` |

Trailing characters for each line inserted into `<head>` to make the output more readable.  

This only works when any of the `insertFaviconLinks`, `insertThemeColorMeta`, `insertManifestLink`, `insertAppleTouchLinks` properties are set to `true`.  

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        // Empty string to cut off some bytes from html
        eol: '',
        // ...
      },
    }),
  ],
};  
```

  </details>

  <details>
    <summary>createFavicon</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| Boolean |   No     | `true` |

Enable or disable a favicon generation.

This only works when the `icon` property is not empty.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        icon: 'src/images/your-icon.png',
        createFavicon: false, // default - true
        // ...
      },
    }),
  ],
};  
```

  </details>

  <details>
    <summary>insertFaviconLinks</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| Boolean |   No     | `true` |

Enable or disable the favicon links insertion into `<head>`.  

This only works when the `icon` property is not empty and `createFavicon` is `true`.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        icon: 'src/images/your-icon.png',
        insertFaviconLinks: false, // default - true
        // ...
      },
    }),
  ],
};  
```

:exclamation: The final output reprocessing is used to insert the links into `<head>` sections. It can impact build times for large sites.

  </details>

  <details>
    <summary>insertThemeColorMeta</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| Boolean |   No     | `true` |

Enable or disable the `meta` insertion into `<head>`.  

This only works when the `theme_color` property is not empty.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        theme_color: '0xFFFF',
        insertThemeColorMeta: false, // default - true
        // ...
      },
    }),
  ],
};  
```

:exclamation: The final output reprocessing is used to insert the links into `<head>` sections. It can impact build times for large sites.

  </details>

  <details>
    <summary>insertManifestLink</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| Boolean |   No     | `true` |

Enable or disable the manifest link insertion into `<head>`.  

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        insertManifestLink: false, // default - true
        // ...
      },
    }),
  ],
};  
```

:exclamation: The final output reprocessing is used to insert the links into `<head>` sections. It can impact build times for large sites.
  </details>

  <details>
    <summary>crossOrigin</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| CrossOrigin |   No     | `anonymus` |

`crossorigin` attribute for the manifest link into `<head>`.

Available values for the **CrossOrigin** type are `anonymous` | `use-credentials`.  

More details on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/crossorigin).  

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        crossOrigin: 'use-credentials', // default - anonymus
        // ...
      },
    }),
  ],
};  
```

  </details>

  <details>
    <summary>insertAppleTouchLinks</summary>

|  Type   | Required |  Default value  |
| :-----: | :------: | :-------------: |
| Boolean |   No     | `false` |

Enable or disable `apple-touch-icon` links into `<head>`.  

iOS versions before 11.3 don't have support for web app manifest spec and don't recognize the icons defined in the webmanifest, so the creation of `apple-touch-icon` links into `<head>` is needed.  

This only works when the `icon` property is not empty.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        icon: 'src/images/your-icon.png',
        insertAppleTouchLinks: true, // default - false
        // ...
      },
    }),
  ],
};  
```

:exclamation: The final output reprocessing is used to insert the links into `<head>` sections. It can impact build times for large sites.
  </details>

  <details>
    <summary>iconPurpose</summary>

|  Type         | Required |  Default value  |
| :-----------: | :------: | :-------------: |
| IconPurpose[] |   No     | `undefined`     |

Available values for the **IconPurpose** type are `badge` | `maskable` | `any` |`monochrome`.  

If provided it will be appended to the `purpose` property of generated icons.

This only works when the `icon` property is not empty.  


__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',
      config: {
        icon: 'src/images/your-icon.png',
        iconPurpose: ['badge', 'maskable'], 
        // ...
      },
    }),
  ],
};  
```

:exclamation: The final output reprocessing is used to insert the links into `<head>` sections. It can impact build times for large sites.
  </details>

### `locales` property

`Record<string, Webmanifest>` - key/object pairs. See usage in [Localization](#localization) section.

### Type `Webmanifest`

| Name                          |          Type          | Required | Description                                                                                                                     |
| :---------------------------- | :--------------------: | :------: | :------------------------------------------------------------------------------------------------------------------------------ |
| `icon`                        |        `String`        |    No    | This is a source for automatically generated favicon and icons. It's a part of `Webmanifest` type.<br/><br/>Icon format: JPEG, PNG, WebP, TIFF, GIF or SVG<br/>Icon size: at least as big as the largest icon being generated (512x512 by default).<br/>Icon geometry: preferably square, otherwise the results will be padded with transparent bars to be square.<br/><br/>If the `icon` is empty - no automatic icon generation.<br/>See more about usage in [Generation modes](#generation-modes) section.                                                                     |
| `icons`                       |        `Icon[]`        |    No    | See usage in [Generation modes](#generation-modes) section.                                                                     |
| `name`                        |        `String`        |   Yes    | You must provide the name of your app.                                                                                          |
| `short_name`                  |        `String`        |    No    |                                                                                                                                 |
| `description`                 |        `String`        |    No    |                                                                                                                                 |
| `categories`                  |       `String[]`       |    No    |                                                                                                                                 |
| `lang`                        |        `String`        |    No    |                                                                                                                                 |
| `dir`                         |         `Dir`          |    No    | `auto` \| `ltr` \| `rtl`                                                                                                        |
| `iarc_rating_id`              |        `String`        |    No    |                                                                                                                                 |
| `id`                          |        `String`        |    No    |                                                                                                                                 |
| `start_url`                   |        `String`        |    No    |                                                                                                                                 |
| `scope`                       |        `String`        |    No    |                                                                                                                                 |
| `theme_color`                 |        `String`        |    No    | Source for `meta` in `<head>`                                                                                                   |
| `background_color`            |        `String`        |    No    |                                                                                                                                 |
| `display`                     |       `Display`        |    No    | `fullscreen` \| `standalone` \| `minimal-ui` \| `browser`                                                                       |
| `display_override`            |      `Display[]`       |    No    |                                                                                                                                 |
| `orientation`                 |     `Orientation`      |    No    | `any` \| `natural` \| `landscape` \| `landscape-primary` \| `landscape-secondary` \| `portrait` \| `portrait-primary` \| `portrait-secondary` |
| `protocol_handlers`           |  `ProtocolHandler[]`   |    No    |                                                                                                                                 |
| `prefer_related_applications` |       `Boolean`        |    No    |                                                                                                                                 |
| `related_applications`        | `RelatedApplication[]` |    No    |                                                                                                                                 |
| `screenshots`                 |       `Image[]`        |    No    |                                                                                                                                 |
| `shortcuts`                   |      `Shortcut[]`      |    No    |                                                                                                                                 |

### Type `Icon`

| Name      |   Type   | Required | Description                                                                                                                  |
| :-------- | :------: | :------: | :--------------------------------------------------------------------------------------------------------------------------- |
| `src`     | `String` |   Yes    | The path to the image file in URL form.                                                                                      |
| `sizes`   | `String` |    No    | Space-separated image dimensions. Syntax on [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/link#attr-sizes) |
| `type`    | `String` |    No    | Media type of the image                                                                                                      |
| `purpose` | `String` |    No    | Space separated list of image purposes (`IconPurpose` type). See on [W3C](https://w3c.github.io/manifest/#purpose-member)    |

:bulb: If icon entry `sizes` property has value `any` or contains more then one size (`96x96 128x128`) in that case such entry will be excluded from automatic generation.  

For `Image`, `Shortcut`, `RelatedApplication`, `ProtocolHandler` look on content of [index.ts](https://github.com/alextim/astro-lib/blob/main/packages/astro-webmanifest/src/index.ts).
Also you can find the detailed descriptions on [W3C](https://w3c.github.io/manifest/) and [MDN](https://developer.mozilla.org/en-US/docs/Web/Manifest).

Demo with advanced configuration is in this [repo](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/advanced).

## Localization

Localization allows you to create a unique manifest, icon set and `<head>` html for each individual language.

You need to provide `locales` property as a `Record<string, Webmanifest>`.

The integration uses the keys of the `locales` property to make the manifest name unique and to determine the page language by page's path.

The integration expects page paths in the following format: /{locale}{path}, where the locale is a key from the `locales` property.

Sample configuration below:

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      icon: 'src/images/logomark-light.svg',

      name: 'Webmanifest i18n test',
      short_name: 'Test',
      description: 'This is the application description',
      lang: 'en-US',
      start_url: '/',

      theme_color: '#3367D6',
      background_color: '#3367D6',
      display: 'standalone',

      locales: {
        es: {
          name: 'Prueba Webmanifest i18n',
          short_name: 'Prueba',
          description: 'Esta es la descripción de la aplicación.',
          lang: 'es-ES',
          start_url: '/es',
        },
        fr: {
          name: 'Test i18n du manifeste Web',
          short_name: 'Test',
          description: "Ceci est la description de l'application",
          lang: 'fr-CA',
          start_url: '/fr',
        },
      },
    }),
  ],
};  
```

By this configuration three separate manifests will be generated:

- `manifest.webmanifest` - for default language;
- `manifest-fr.webmanifest` - for `fr` language;
- `manifest-es.webmanifest` - for `es` language.

And language specific html will be inserted into `<head>` section of generated pages.

If you need a separate set of icons for each language, add the `icon` property.

__`astro.config.mjs`__

```js
import webmanifest from 'astro-webmanifest';

export default {
  integrations: [
    webmanifest({
      name: 'Your app name',  
      icon: 'src/images/logo.svg',
      lang: 'en-US',
      // ...
      locales: {
        es: {
          icon: 'src/images/logo-es.svg',
          lang: 'es-ES',
          // ...
        },
        fr: {
          lang: 'fr-CA',
          // ...
        },
      },
    }),
  ],
};
```

In this configuration, the default `en` language and `fr` language will have a common icon set, `es` will have its own icon set.

:bulb: The favicon will be the same for all languages. The source for generation will be taken from the default language.

You can explore a localization usage in this demo [repo](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/i18n).

## Examples

| Example  | Source                                                                                 | Playground                                                                                                  |
| -------- | -------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| basic    | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/basic)    | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/webmanifest/basic)    |
| advanced | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/advanced) | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/webmanifest/advanced) |
| i18n     | [GitHub](https://github.com/alextim/astro-lib/tree/main/examples/webmanifest/i18n)     | [Play Online](https://stackblitz.com/fork/github/alextim/astro-lib/tree/main/examples/webmanifest/i18n)     |

## Contributing

You're welcome to submit an issue or PR!

## Changelog

See [CHANGELOG.md](CHANGELOG.md) for a history of changes to this integration.

[astro-integration]: https://docs.astro.build/en/guides/integrations-guide/
