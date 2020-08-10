import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const commonPlugins = () => [
  resolve({
    resolveOnly: [/^@porsche-design-system\/.*$/]
  })
];

export default [
  {
    input: 'src/js/index.ts',
    output: {
      esModule: false,
      dir: 'dist/js',
      format: 'umd',
      name: pkg.name,
      exports: 'named'
    },
    plugins: [
      ...commonPlugins(),
      typescript({ declaration: true, declarationDir: 'dist/js/types', rootDir: 'src/js' }),
      process.env.NODE_ENV === 'production' && terser()
    ]
  },
  {
    input: 'src/js/index.ts',
    output: { dir: 'dist/js/esm', format: 'esm' },
    plugins: [...commonPlugins(), typescript(), process.env.NODE_ENV === 'production' && terser()]
  }
];
