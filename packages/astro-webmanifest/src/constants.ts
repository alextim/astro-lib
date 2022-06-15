export const crossOriginValues = ['anonymous', 'use-credentials'] as const;

export const iconPurposeValues = ['badge', 'maskable', 'any', 'monochrome'] as const;

export const applicationPlatformValues = [
  'wide',
  'narrow',
  'amazon',
  'play',
  'itunes',
  'microsoft',
  'webapp',
  'f-droid',
  'chromeos',
  'ios',
  'kaios',
  'macos',
  'windows',
  'windows10x',
  'xbox',
  'chrome_web_store',
] as const;

export const displayValues = ['fullscreen', 'standalone', 'minimal-ui', 'browser'] as const;

export const orientationValues = [
  'any',
  'natural',
  'landscape',
  'landscape-primary',
  'landscape-secondary',
  'portrait',
  'portrait-primary',
  'portrait-secondary',
] as const;

export const dirValues = ['auto', 'ltr', 'rtl'] as const;
