import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import scss from 'rollup-plugin-scss'
import dts from 'rollup-plugin-dts';
import * as react from 'react';
import * as reactDom from 'react-dom';
import * as reactRouter from 'react-router-dom';
import * as reactIs from 'react-is';
import * as propTypes from 'prop-types';

const packageJSON = require('./package.json');

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: packageJSON.main,
        format: 'cjs',
        sourceMap: true
      },
      {
        file: packageJSON.module,
        format: 'esm',
        sourceMap: true
      }
    ],
    plugins: [
      external(),
      resolve(),
      commonjs({
        namedExports: {
          react: Object.keys(react),
          'react-router-dom': Object.keys(reactRouter),
          'react-dom': Object.keys(reactDom),
          'react-is': Object.keys(reactIs),
          'prop-types': Object.keys(propTypes)
        },
       }),
      scss({
        outputStyle: 'compressed'
      }),
      typescript({ tsconfig: './tsconfig.json'}),
      terser()
    ]
  },
  {
    input: 'dist/esm/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'esm'
      }
    ],
    plugins: [
      dts()
    ],
    external: [/\.scss$/]
  }
];
