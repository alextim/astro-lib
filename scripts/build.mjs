import esbuild from 'esbuild';
import fs from 'node:fs';
import path from 'node:path';

const pkgPath = path.join(process.cwd(), 'package.json');
const pkgContent = fs.readFileSync(pkgPath, 'utf8');
const { name: packageName, dependencies = {}, peerDependencies = {} } = JSON.parse(pkgContent);

const fileName = 'package-name.ts';
const pkgNamePath = path.join(process.cwd(), 'src', 'data', fileName);
const prevData = fs.readFileSync(pkgNamePath, 'utf8');

const constName = 'packageName';
const currData = `export const ${constName} = '${packageName}';\n`;
if (currData != prevData) {
  fs.writeFileSync(pkgNamePath, currData);
  console.log(`new '${fileName}' with '${constName} = ${packageName}' created\n`);
}

const config = {
  entryPoints: ['./src/index.ts'],
  outdir: 'dist',
  bundle: true,
  minify: false,
  platform: 'node',
  format: 'esm',
  // sourcemap: true,
  // sourcesContent: false,
  target: 'node14',
  // logLevel: 'verbose',
  external: Object.keys(dependencies).concat(Object.keys(peerDependencies)),
  tsconfig: 'tsconfig.build.json',
};

esbuild
  .build(config)
  .then(() => console.log('⚡ Done'))
  .catch(() => process.exit(1));
