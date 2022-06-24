# astro-sitemap

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
