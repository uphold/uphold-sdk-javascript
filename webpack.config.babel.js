import { join } from 'path';
import LodashWebpackPlugin from 'lodash-webpack-plugin';
import TerserPlugin from 'terser-webpack-plugin';

export default {
  entry: join(__dirname, 'src', 'browser', 'index.js'),
  mode: 'production',
  module: {
    rules: [{
      exclude: /node_modules/,
      loader: 'babel-loader',
      test: /\.js$/
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({
      extractComments: false,
      terserOptions: { output: { comments: false } }
    })]
  },
  output: {
    filename: 'uphold-sdk-javascript.js',
    library: 'uphold-sdk-javascript',
    libraryTarget: 'commonjs2',
    path: join(__dirname, 'dist', 'browser')
  },
  plugins: [new LodashWebpackPlugin()]
};
