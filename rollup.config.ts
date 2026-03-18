import { defineConfig } from 'rollup'

import json from '@rollup/plugin-json'
import commonjs from '@rollup/plugin-commonjs'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'

export default defineConfig({
    input: 'src/index.ts',
    output: {
        file: 'bin/index.js',
        format: 'commonjs',
    },
    plugins: [json(), nodeResolve(), commonjs(), typescript()],
})
