var path = require('path')
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var webpackBase = require('./webpack.base.config');
var config = require('../config');

Object.keys(webpackBase.entry).forEach(function (name) {
    webpackBase.entry[name] = ['webpack-hot-middleware/client?noInfo=true&reload=true'].concat(webpackBase.entry[name]);
})

module.exports = merge(webpackBase, {
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('css/[name].[hash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: Object.keys(config.commonChunk).reverse(),
            minChunks: Infinity
        }),
        new AssetsPlugin()
    ]
})