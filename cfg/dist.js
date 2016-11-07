'use strict';

let path = require('path');
let webpack = require('webpack');

let baseConfig = require('./base');
let defaultSettings = require('./defaults');

// Add needed plugins here
let BowerWebpackPlugin = require('bower-webpack-plugin');

let ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('../utilies/html-webpack-plugin/index');


let config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new BowerWebpackPlugin({
      searchResolveModulesDirectories: false
    }),
    new ExtractTextPlugin("styles.css", {allChunks: false}),
    /*new webpack.optimize.UglifyJsPlugin(),*/
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: '../index.html',
      template: './src/index.html',
      cssOnly: true
    })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.(js|jsx)$/,
  loader: 'babel',
  include: [].concat(
    config.additionalPaths,
    [ path.join(__dirname, '/../src') ]
  )
});

config.module.loaders.push({
    test: /\.(less|css)$/,
    loader: ExtractTextPlugin.extract("style-loader", "css-loader!autoprefixer-loader!less-loader")
});

module.exports = config;
