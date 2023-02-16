# astro-webmanifest

## 0.5.0

### Minor Changes

- b95d515: ### Minor changes

  - The external config logic is implemented using [@proload/core](https://github.com/natemoo-re/proload) as well as [Astro](https://github.com/withastro/astro). Typescript configs are supported now.

  ### Patch changes

  - chore: deps update

## 0.4.4

### Patch Changes

- 062f9e4: chore: deps update

## 0.4.3

### Patch Changes

- 7cb29c0: - chore: deps update;
  - fix: `astro-integration` key added to **keywords** in `package.json` for `npx astro add...` command to work correctly;
  - refactor: external config loader.

## 0.4.2

### Patch Changes

- a74260d: chore: deps update

## 0.4.1

### Patch Changes

- d145f65: chore: deps update

## 0.4.0

### Minor Changes

- Breaking: `node-html-parser` package is dropped to speed up the generated pages post processing. The link tags will not be inserted if generated page doesn't contain `<head>` section, no automatic `<head>` creation.
- a742989: - deps update: Astro v1.0.

## 0.3.6

### Patch Changes

- 0bcd2ce: refactor: schema

## 0.3.5

### Patch Changes

- f33cf34: fix: vitetest stack size error in validation

## 0.3.4

### Patch Changes

- 39a0548: refactor logger

## 0.3.3

### Patch Changes

- c854c46: refactor schema

## 0.3.2

### Patch Changes

- 0ffe03f: fixes:

  - astro.config `base` path handling;
  - typo in `crossorigin` option.

  refactor: default options and validation are handled by 'zod' only.

## 0.3.1

### Patch Changes

- c631e26: fix: constants.ts is added to package export

## 0.3.0

### Minor Changes

- 587bc97: external configuration support, improved schema validation
- fb946a2: external config support, 'zod' schema validation

## 0.2.0

### Minor Changes

- 67fa351: build: first release!
- f543028: build: first release
