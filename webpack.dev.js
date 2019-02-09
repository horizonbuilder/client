/**
 * =======================================
 * ========= DEV WEBPACK CONFIG ==========
 * =======================================
 */

require('dotenv').config();
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path');
const appConfig = require('./app.json');

module.exports = merge(common, {
  devtool: 'inline-source-map',

  devServer: {
    contentBase: './dist',
    stats: 'minimal',
    historyApiFallback: true
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BASE_SERVICE_URL: JSON.stringify(process.env.BASE_SERVICE_URL),
        MAPBOX_API_KEY: JSON.stringify(process.env.MAPBOX_API_KEY),
        AUTOSAVE_TIMEOUT: JSON.stringify(process.env.AUTOSAVE_TIMEOUT),
        ADMIN_ORG_ID: JSON.stringify(process.env.ADMIN_ORG_ID)
      }
    })
  ]
});
