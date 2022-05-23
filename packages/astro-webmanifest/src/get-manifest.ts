import type { WebmanifestOptions, Webmanifest, Icon, Shortcut, WebmanifestIcon, WebmanifestShortcut, IconPurpose } from './index';
import { defaultIcons } from './default-icons';

export const getManifest = (
  { icon, iconOptions, outfile, name, icons, shortcuts, ...opts }: WebmanifestOptions = { name: '' },
): Webmanifest => {
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
