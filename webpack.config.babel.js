
/**
 * Module dependencies.
 */

import webpack from 'webpack';

/**
 * Webpack configuration.
 */

export default {
  entry: './src/browser/index.js',
  module: {
    loaders: [{
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
    }, {
      exclude: /node_modules\/(?!html-tags).+/,
      loader: 'json-loader',
      test: /\.json$/
    }]
  },
  output: {
    filename: 'uphold-sdk-javascript.js',
    library: 'uphold-sdk-javascript',
    libraryTarget: 'commonjs2',
    path: `${__dirname}/dist/browser`
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin()
  ]
};
