var path = require('path')
var webpack = require('webpack');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var webpackBase = require('./webpack.base.config');
var config = require('../config');
module.exports = merge(webpackBase, {
    plugins: [
        // new webpack.DefinePlugin({
        //     'process.env': 'production'
        // }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
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
