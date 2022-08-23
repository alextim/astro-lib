# astro-robots-txt

## 0.3.8

### Patch Changes

- 31a8143: Astro v1.0, no changes

## 0.3.7

### Patch Changes

- 004bb4e: refactor: schema, vars naming

## 0.3.6

### Patch Changes

- 2bb660f: refactor logger

## 0.3.5

### Patch Changes

- 4871ac4: fix: `sitemap.xml` -> `sitemap-index.xml`,

  because the output file name of **@astrojs/sitemap** >=0.2.0 is `sitemap-index.xml`.

## 0.3.4

### Patch Changes

- 260187a: Additional config options:

  - `sitemapBaseFileName`;
  - `transform`.

  Refactoring.

## 0.3.3

### Patch Changes

- 0ffe03f: fix: astro.config `base` path handling.

  refactor: default options and validation are handled by 'zod' only.

## 0.3.2

### Patch Changes

- 7b2e263: code refactor, better validation

## 0.3.1

### Patch Changes

- d76a4f0: no empty string for `sitemap` option

## 0.3.0

### Minor Changes

- 587bc97: external configuration support, improved schema validation
- fb946a2: external config support, 'zod' schema validation, fix typo mistake

## 0.2.0

### Minor Changes

- 67fa351: refactor: some code cleaning, migrating to Vitest

## 0.1.17

### Patch Changes

- 5b45607: fix: pluginOptions can be set to `undefined`
