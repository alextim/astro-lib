import type { WebmanifestOptions, Webmanifest, Icon, Shortcut, WebmanifestIcon, WebmanifestShortcut, IconPurpose } from './index';
import { defaultIcons } from './default-icons';

export const getManifest = ({ icon, iconOptions, outfile, name, icons, shortcuts, ...opts }: WebmanifestOptions): Webmanifest => {
  const getIcon = ({ purpose, ...rest }: Icon): WebmanifestIcon => {
    const result: WebmanifestIcon = { ...rest };
    const a = [...new Set([...(iconOptions?.purpose || []), ...(purpose || [])])];
    if (a.length > 0) {
      result.purpose = a.join(' ');
    }
    return result;
  };

  const getShortcut = ({ icons, ...rest }: Shortcut): WebmanifestShortcut => {
    const result: WebmanifestShortcut = { ...rest };
    if (icons) {
      result.icons = icons.map(getIcon);
    }
    return result;
  };

  const manifest: Webmanifest = {
    name,
    icons: (icons || defaultIcons).map(getIcon),
    ...opts,
  };

  if (shortcuts) {
    manifest.shortcuts = shortcuts.map(getShortcut);
  }
  return manifest;
};

const makeManifest = async ({ cache, reporter, pluginOptions, shouldLocalize = false, basePath = '' }) => {
  const { icon, ...manifest } = pluginOptions;
  const suffix = shouldLocalize && pluginOptions.lang ? `_${pluginOptions.lang}` : '';

  const faviconIsEnabled = pluginOptions.include_favicon ?? true;

  // Delete options we won't pass to the manifest.webmanifest.
  delete manifest.plugins;
  delete manifest.legacy;
  delete manifest.theme_color_in_head;
  delete manifest.cache_busting_mode;
  delete manifest.crossOrigin;
  delete manifest.icon_options;
  delete manifest.include_favicon;
  delete manifest.cacheDigest;

  // If icons are not manually defined, use the default icon set.
  if (!manifest.icons) {
    manifest.icons = [...defaultIcons];
  }

  // Specify extra options for each icon (if requested).
  if (pluginOptions.icon_options) {
    manifest.icons = manifest.icons.map((icon) => {
      return {
        ...pluginOptions.icon_options,
        ...icon,
      };
    });
  }

  // Determine destination path for icons.
  const paths = {};
  manifest.icons.forEach((icon) => {
    const iconPath = path.join('public', path.dirname(icon.src));
    if (!paths[iconPath]) {
      const exists = fs.existsSync(iconPath);
      // create destination directory if it doesn't exist
      if (!exists) {
        fs.mkdirSync(iconPath, { recursive: true });
      }
      paths[iconPath] = true;
    }
  });

  // Only auto-generate icons if a src icon is defined.
  if (typeof icon !== 'undefined') {
    // Check if the icon exists
    if (!doesIconExist(icon)) {
      throw new Error(
        `icon (${icon}) does not exist as defined in gatsby-config.js. Make sure the file exists relative to the root of the site.`,
      );
    }

    const sharp = await getSharpInstance();
    const sharpIcon = sharp(icon);

    const metadata = await sharpIcon.metadata();

    if (metadata.width !== metadata.height) {
      reporter.warn(
        `The icon(${icon}) you provided to 'gatsby-plugin-manifest' is not square.\n` +
          'The icons we generate will be square and for the best results we recommend you provide a square icon.\n',
      );
    }

    // add cache busting
    const cacheMode = typeof pluginOptions.cache_busting_mode !== 'undefined' ? pluginOptions.cache_busting_mode : 'query';

    const iconDigest = createContentDigest(fs.readFileSync(icon));

    /**
     * Given an array of icon configs, generate the various output sizes from
     * the source icon image.
     */
    async function processIconSet(iconSet) {
      // if cacheBusting is being done via url query icons must be generated before cache busting runs
      if (cacheMode === 'query') {
        for (const dstIcon of iconSet) {
          await checkCache(cache, dstIcon, icon, iconDigest, generateIcon);
        }
      }

      if (cacheMode !== 'none') {
        iconSet = iconSet.map((icon) => {
          const newIcon = { ...icon };
          newIcon.src = addDigestToPath(icon.src, iconDigest, cacheMode);
          return newIcon;
        });
      }

      // if file names are being modified by cacheBusting icons must be generated after cache busting runs
      if (cacheMode !== 'query') {
        for (const dstIcon of iconSet) {
          await checkCache(cache, dstIcon, icon, iconDigest, generateIcon);
        }
      }

      return iconSet;
    }

    manifest.icons = await processIconSet(manifest.icons);

    // If favicon is enabled, apply the same caching policy and generate
    // the resized image(s)
    if (faviconIsEnabled) {
      await processIconSet(favicons);

      if (metadata.format === 'svg') {
        fs.copyFileSync(icon, path.join('public', 'favicon.svg'));
      }
    }
  }

  // Fix #18497 by prefixing paths
  manifest.icons = manifest.icons.map((icon) => {
    return {
      ...icon,
      src: slash(path.join(basePath, icon.src)),
    };
  });

  if (manifest.start_url) {
    manifest.start_url = path.posix.join(basePath, manifest.start_url);
  }

  // Write manifest
  fs.writeFileSync(path.join('public', `manifest${suffix}.webmanifest`), JSON.stringify(manifest));
};
