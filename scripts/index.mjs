#!/usr/bin/env node
export default async function run() {
  const [cmd, ...args] = process.argv.slice(2);
  switch (cmd) {
    case 'build':
      const { build } = await import('./cmd/build.mjs');
      await build(...args);
      break;
    case 'create-pkg-name':
      const { createPkgName } = await import('./cmd/create-pkg-name.mjs');
      createPkgName();
      break;
    case 'copy-index.d.ts':
      const { copyIndexD } = await import('./cmd/copy-index-d-ts.mjs');
      copyIndexD();
      break;
  }
}

run();
