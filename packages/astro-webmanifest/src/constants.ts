export const iconPurposeValues = ['badge', 'maskable', 'any', 'monochrome'] as const;

export const applicationPlatformValues = [
  'chrome_web_store',
  'play',
  'itunes',
  'webapp',
  'windows',
  'f-droid',
  'amazon',
  'narrow',
  'wide',
  'chromeos',
  'ios',
  'kaios',
  'macos',
  'windows10x',
  'xbox',
  'microsoft',
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
