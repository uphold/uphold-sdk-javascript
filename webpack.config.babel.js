
/**
 * Module dependencies.
 */

import packageConfig from './package.json';
import webpack from 'webpack';

/**
 * Webpack configuration.
 */

export default {
  entry: './src/browser/index.js',
  module: {
    loaders: [
      {
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          plugins: [
            ['transform-es2015-for-of', {
              loose: true
            }]
          ],
          presets: ['es2015']
        },
        test: /\.js$/
      },
      {
        exclude: /node_modules\/(?!html-tags).+/,
        loader: 'json-loader',
        test: /\.json$/
      }
    ]
  },
  output: {
    filename: `${packageConfig.name}.js`,
    library: packageConfig.name,
    libraryTarget: 'commonjs2',
    path: `${__dirname}/dist/browser`
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
