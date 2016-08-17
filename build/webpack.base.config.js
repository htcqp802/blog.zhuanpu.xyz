var path = require('path')
var glob = require('glob');
var webpack = require('webpack');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('../config');
module.exports = {
    entry: getEntery(),
    // devtool: 'source-map',
    output: {
        path: config.static,
        filename: 'js/[name].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('css!less')
            }
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        alias: config.alias
    }
    , plugins: [
        new AssetsPlugin(),
        new ExtractTextPlugin('css/[name].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: Object.keys(config.commonChunk).filter(function(key){return !!key}),
            // filename:'js/base.js',
            minChunks:Infinity
        })
    ]
}

function getEntery(hotMiddlewareScript) {
    var pattern = config.compilePath+'/**/'+config.compileFilename+'.js';
    var array = glob.sync(pattern);
    var newObj = {};
    array.map(function (el) {
        var reg = new RegExp(config.compilePath+'/(.*)/'+ config.compileFilename +'.js', 'g');
        reg.test(el);
        if (hotMiddlewareScript) {
            newObj[RegExp.$1] = [el, hotMiddlewareScript];
        } else {
            newObj[RegExp.$1] = el;
        }
    });
    return Object.assign(newObj,config.commonChunk);
}