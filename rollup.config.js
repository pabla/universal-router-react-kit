import path from 'path';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
  entry: path.join(__dirname, 'src/index.js'),
  dest: path.join(__dirname, 'bundle.js'),
  format: 'cjs',
  external: ['history', 'query-string', 'react', 'prop-types'],
  plugins: [
    babel({
      exclude: path.join(__dirname, 'node_modules/**'),
    }),
    commonjs({
      // non-CommonJS modules will be ignored, but you can also
      // specifically include/exclude files
      include: 'node_modules/**', // Default: undefined
    }),
  ],
};
