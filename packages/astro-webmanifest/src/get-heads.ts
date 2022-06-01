import type { WebmanifestOptions, Webmanifest } from './index';
import { favicons } from './default-icons';

const addBasePath = (s: string) => {
  if (s.startsWith('/')) {
    return s;
  }
  return `/${s}`;
};

export const getHeads = (opts: WebmanifestOptions, results: { locale: string; outfile: string; manifest: Webmanifest }[]) => {
  const { icon: srcIcon, config: cfg = {} } = opts || {};

  const heads: Record<string, string> = {};

  for (const {
    locale,
    outfile: manifestFileName,
    manifest: { icons, theme_color },
  } of results) {
    const headComponents = [];

    if (srcIcon && cfg.createFavicon && cfg.insertFaviconLinks) {
      favicons.forEach((favicon) => {
        headComponents.push(`<link rel="icon" href="${addBasePath(favicon.src)}" type="image/png">`);
      });
      if (srcIcon?.endsWith('.svg')) {
        headComponents.push(`<link rel="icon" href="${addBasePath('favicon.svg')}" type="image/svg+xml">`);
      }
    }

    if (theme_color && cfg.insertThemeColorMeta) {
      headComponents.push(`<meta name="theme-color" content="${theme_color}">`);
    }

    if (cfg.insertManifestLink) {
      headComponents.push(`<link rel="manifest" href="${addBasePath(manifestFileName)}" crossorigin="${cfg.crossOrigin}">`);
    }

    if (cfg.insertAppleTouchLinks) {
      icons?.forEach((icon) => {
        headComponents.push(`<link rel="apple-touch-icon" sizes="${icon.sizes}" href="${addBasePath(icon.src)}">`);
      });
    }

    if (headComponents.length > 0) {
      const data = headComponents.map((item) => cfg.indent + item + cfg.eol).join('');
      heads[locale] = data;
    }
  }

  return heads;
};
