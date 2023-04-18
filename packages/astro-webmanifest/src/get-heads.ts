import type { WebmanifestOptions, Webmanifest } from './index.js';
import { favicons } from './default-icons.js';

export const getHeads = (opts: WebmanifestOptions, base: string, results: { locale: string; outfile: string; manifest: Webmanifest }[]) => {
  const { icon: srcIcon, config: cfg } = opts!;
  const heads: Record<string, string> = {};

  const addBasePath = (path: string) => {
    const s = path.startsWith('/') ? path : `/${path}`;
    return base === '/' ? s : `${base}${s}`;
  };

  for (const {
    locale,
    outfile: manifestFileName,
    manifest: { icons, theme_color },
  } of results) {
    const headComponents = [];

    if (srcIcon && cfg?.createFavicon && cfg.insertFaviconLinks) {
      favicons.forEach((favicon) => {
        headComponents.push(`<link rel="icon" href="${addBasePath(favicon.src)}" type="image/png">`);
      });
      if (srcIcon?.endsWith('.svg')) {
        headComponents.push(`<link rel="icon" href="${addBasePath('favicon.svg')}" type="image/svg+xml">`);
      }
    }

    if (theme_color && cfg?.insertThemeColorMeta) {
      headComponents.push(`<meta name="theme-color" content="${theme_color}">`);
    }

    if (cfg?.insertManifestLink) {
      headComponents.push(`<link rel="manifest" href="${addBasePath(manifestFileName)}" crossorigin="${cfg.crossOrigin}">`);
    }

    if (cfg?.insertAppleTouchLinks) {
      icons?.forEach(({ sizes, src }) => {
        headComponents.push(`<link rel="apple-touch-icon" sizes="${sizes}" href="${addBasePath(src)}">`);
      });
    }

    if (headComponents.length > 0) {
      heads[locale] = headComponents.map((item) => cfg?.indent + item + cfg?.eol).join('');
    }
  }

  return heads;
};
