/**
 * @type {import('rollup').RollupOptions}
 */

import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'

export default {
    input: 'src/index.js',
    output: {
        file: 'dist/bundle.js',
        format: 'module',
    },
    context: 'globalThis',
    plugins: [json(), nodeResolve(), commonjs()],
}
