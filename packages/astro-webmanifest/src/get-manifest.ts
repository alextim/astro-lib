import type { WebmanifestOptions, Webmanifest, Icon, Shortcut } from './index';
import { defaultIcons } from './default-icons';

export const getManifest = ({ icon, config, locales, name, icons, shortcuts, ...opts }: WebmanifestOptions = { name: '' }): Webmanifest => {
  const add: string[] = config?.iconPurpose || [];
  const getIcon = ({ purpose, ...rest }: Icon) => {
    const result: Icon = { ...rest };
    const src: string[] = purpose?.split(' ') || [];
    const arr = [...new Set([...add, ...src])];
    if (arr.length > 0) {
      result.purpose = arr.join(' ');
    }
    return result;
  };

  const getShortcut = ({ icons: shortcutIcons, ...rest }: Shortcut) => {
    const result: Shortcut = { ...rest };
    if (shortcutIcons) {
      result.icons = shortcutIcons.map(getIcon);
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
