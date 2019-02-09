/**
 * =======================================
 * ======== PROD WEBPACK CONFIG ==========
 * =======================================
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const appConfig = require('./app.json');
const CompressionPlugin = require('compression-webpack-plugin');

module.exports = merge(common, {
  devtool: 'source-map',

  plugins: [
    new UglifyJSPlugin({
      sourceMap: true
    }),

    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8
    }),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        BASE_SERVICE_URL: JSON.stringify(process.env.BASE_SERVICE_URL),
        MAPBOX_API_KEY: JSON.stringify(process.env.MAPBOX_API_KEY),
        AUTOSAVE_TIMEOUT: JSON.stringify(process.env.AUTOSAVE_TIMEOUT),
        ADMIN_ORG_ID: JSON.stringify(process.env.ADMIN_ORG_ID)
      }
    })
  ]
});
