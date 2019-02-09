/**
 * =======================================
 * ======== COMMON WEBPACK CONFIG ========
 * =======================================
 */

const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const services = require('./services.json');

module.exports = {
  entry: {
    index: './src/index.tsx',
    vendor: ['react', 'react-dom']
  },

  node: { fs: 'empty' },

  module: {
    rules: [
      {
        test: /\.css$/,
        include: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            }
          ]
        })
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'typings-for-css-modules-loader',
              options: {
                importLoaders: 1,
                modules: true,
                localIdentName: '[name]__[local]--[hash:base64:5]',
                namedExport: true
              }
            },
            {
              loader: 'postcss-loader'
            }
          ]
        })
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          // { loader: 'cache-loader' },
          // {
          //   loader: 'thread-loader',
          //   options: {
          //     workers: require('os').cpus() - 1,
          //   },
          // },
          {
            loader: 'ts-loader'
            // options: {
            //   happyPackMode: true,
            // },
          }
        ]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'
          // options: {
          //   presets: ['@babel/preset-env'],
          // },
        }
      },
      { test: /\.(png|jpg|jpeg|gif)$/, loader: 'url-loader?limit=8192' },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
      SERVICES: Object.keys(services).reduce(
        (serializedMap, serviceKey) =>
          Object.assign({}, serializedMap, {
            [serviceKey]: JSON.stringify(services[serviceKey])
          }),
        {}
      )
    }),

    // new ForkTsCheckerWebpackPlugin({
    //   checkSyntacticErrors: true,
    // }),

    new CleanWebpackPlugin(['dist']),

    new HTMLWebpackPlugin({
      title: 'TerraceAg',
      template: './src/index.html'
    }),

    new webpack.HashedModuleIdsPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'common'
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: 'runtime'
    }),

    new ExtractTextPlugin('styles.css'),

    new CopyWebpackPlugin([
      { from: 'public' }
    ])
  ],

  output: {
    filename: '[name].[chunkhash].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};
