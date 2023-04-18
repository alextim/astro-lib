import esbuild from 'esbuild';

import pkg from '../utils/pkg.mjs';

export async function build() {
  const { dependencies = {}, peerDependencies = {} } = pkg;

  const config = {
    entryPoints: ['./src/index.ts'],
    outdir: 'dist',
    bundle: true,
    minify: false,
    platform: 'node',
    format: 'esm',
    sourcemap: false,
    sourcesContent: false,
    target: 'node16',
    // logLevel: 'verbose',
    external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
    tsconfig: 'tsconfig.json', // 'tsconfig.build.json',
  };

  try {
    await esbuild.build(config);
    // eslint-disable-next-line no-console
    console.info('⚡ Done');
  } catch (err) {
    console.error(err);
  }
}
