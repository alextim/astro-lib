# astro-robots-txt

## 0.4.1

### Patch Changes

- 1ff6997: chore: deps update

## 0.4.0

### Minor Changes

- b95d515: ### Minor changes

  - The external config logic is implemented using [@proload/core](https://github.com/natemoo-re/proload) as well as [Astro](https://github.com/withastro/astro). Typescript configs are supported now.

  ### Patch changes

  - chore: deps update

## 0.3.12

### Patch Changes

- 062f9e4: chore: deps update

## 0.3.11

### Patch Changes

- 7cb29c0: - chore: deps update;
  - fix: `astro-integration` key added to **keywords** in `package.json` for `npx astro add...` command to work correctly;
  - refactor: external config loader.

## 0.3.10

### Patch Changes

- 54f0c95: The `host` option supports a boolean value as well.
  `host: true` -> resolves the host automatically via the Astro `site` prop.

## 0.3.9

### Patch Changes

- 7ad0be0: chore: deps update

  fix: missing types

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
