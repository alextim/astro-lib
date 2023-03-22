# astro-sitemap

## 0.5.1

### Patch Changes

- 1ff6997: chore: deps update

## 0.5.0

### Minor Changes

- a994b61: The external config logic is implemented using [@proload/core](https://github.com/natemoo-re/proload) as well as [Astro](https://github.com/withastro/astro). Typescript configs are supported now.

- The _changefreq_ option property type changed from the `ChangeFreq` type to the `EnumChangeFreq` enum to make it compatible with [sitemap](https://github.com/ekalinin/sitemap.js).

### Patch changes

- chore: deps update

## 0.4.3

### Patch Changes

- 062f9e4: chore: deps update

## 0.4.2

### Patch Changes

- 7cb29c0: - chore: deps update;
  - fix: `astro-integration` key added to **keywords** in `package.json` for `npx astro add...` command to work correctly;
  - refactor: external config loader.

## 0.4.1

### Patch Changes

- d145f65: chore: deps update

## 0.4.0

### Minor Changes

- Breaking: `node-html-parser` package is dropped to speed up the generated pages post processing. The link tags will not be inserted if generated page doesn't contain `<head>` section, no automatic `<head>` creation.
- a742989: - deps update: Astro v1.0.

## 0.3.0

### Minor Changes

- 6057e90: **Astro** has the new config option [output](https://docs.astro.build/en/reference/configuration-reference/#output).

## 0.2.8

### Patch Changes

- 30f8166: code refactoring and deps update

## 0.2.7

### Patch Changes

- 739af08: fix named export for minimatch

## 0.2.6

### Patch Changes

- e6642a1: fix: typings error

## 0.2.5

### Patch Changes

- 4eded9e: new config option: `exclude`.

  refactor: logger.

## 0.2.4

### Patch Changes

- 5102dba: More control on sitemap output:

  - manage xml namespaces;
  - `lastmod` format option;
  - possibility to add a link to custom xsl.

  `serialize` func update.

## 0.2.3

### Patch Changes

- ead9160: better typings

## 0.2.2

### Patch Changes

- 0ffe03f: fix: astro.config `base` path handling.

  refactor: default options and validation are handled by 'zod' only.

## 0.2.1

### Patch Changes

- 3e11031: fix: handle base/pathname correctly

## 0.2.0

### Minor Changes

- 99c7269: # Key differences

  ## New Features

  - `serialize`: function to control sitemap output;
  - `entryLimit`: to split up large sitemap;
  - `createLinkInHead`: add link to sitemap into `<head>` section of generated pages.

  ## Drops

  The `outfile` option is dropped to make split up.

  Now the integration generates one `sitemap-index.xml` and several `sitemap-{i}.xml` if needed.

## 0.1.0

### Minor Changes

- a531a0c: first release
