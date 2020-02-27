import babel from 'rollup-plugin-babel';
import nodeResolve from 'rollup-plugin-node-resolve';
import { uglify } from 'rollup-plugin-uglify';
import bundleSize from 'rollup-plugin-bundle-size';
import commonjs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import pkg from './package.json';

const IS_PROD = process.env.NODE_ENV === 'production';

const INPUT_FILE = 'src/index.ts';

const getPlugins = (tsDeclaration = false, needToResolve = true) => [
  typescript(
    tsDeclaration
      ? {
          useTsconfigDeclarationDir: true,
          tsconfigOverride: {
            compilerOptions: {
              declaration: true,
              declarationDir: 'dist/types'
            }
          }
        }
      : {}
  ),
  babel(),
  ...(needToResolve ? [nodeResolve({ mainFields: ['module', 'jsnext'] })] : []),
  commonjs({ include: 'node_modules/**' }),
  bundleSize()
];

const cjs = {
  plugins: getPlugins(true, false),
  input: INPUT_FILE,
  output: {
    file: pkg.main,
    format: 'cjs'
  }
};

const es = {
  plugins: getPlugins(false, false),
  input: INPUT_FILE,
  output: [
    {
      file: pkg.module,
      format: 'es'
    }
  ]
};

const umd = {
  plugins: getPlugins(),
  input: INPUT_FILE,
  output: [
    {
      name: pkg.umdName,
      file: pkg.browser,
      format: 'umd'
    }
  ]
};

const umdMin = {
  plugins: [...getPlugins(), uglify()],
  input: INPUT_FILE,
  output: {
    name: pkg.umdName,
    file: pkg.browser.split('.').reduce((acc, item, i, arr) => {
      return i === arr.length - 1 ? acc + 'min.' + item : acc + item + '.';
    }, ''),
    format: 'umd'
  }
};

export default IS_PROD ? [cjs, es, umd, umdMin] : cjs;
