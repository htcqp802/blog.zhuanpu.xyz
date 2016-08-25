var path = require('path')
var glob = require('glob');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var config = require('../config');
module.exports = {
    entry: getEntery(),
    // devtool: 'source-map',
    output: {
        // path: config.dist.static,
        filename: 'js/[name].[hash].js'
    },
    module: {
        loaders: [
            { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            { test: /\.less$/, loader: ExtractTextPlugin.extract('css!less') },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: 'img/[name].[hash].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url',
                query: {
                    limit: 10000,
                    name: path.posix.join('static', 'font/[name].[hash].[ext]')
                }
            }
        ],
    },
    resolve: {
        extensions: ['', '.js'],
        alias: config.alias
    }
    , plugins: [
        // new CleanPlugin([config.static],{root:path.resolve(__dirname, '..')}),
        // new webpack.DefinePlugin({
        //     'process.env': 'production'
        // }),
        // new webpack.optimize.UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),
        new ExtractTextPlugin('css/[name].[hash].css'),
        new webpack.optimize.CommonsChunkPlugin({
            names: Object.keys(config.commonChunk).filter(function (key) { return !!key }),
            minChunks: Infinity
        }),
        new AssetsPlugin()
    ]
}

function getEntery(hotMiddlewareScript) {
    var jspattern = config.compilePath + '/**/' + config.compileFilename + '.js';
    var stylepattern = config.compilePath + '/**/' + config.compileFilename + '.less';
    var array = glob.sync(jspattern);
    array = array.concat(glob.sync(stylepattern));
    var newObj = {};
    array.map(function (el) {
        var reg = new RegExp(config.compilePath + '/(.*)/' + config.compileFilename + '.*', 'g');
        reg.test(el);
        // if (hotMiddlewareScript) {
        //     newObj[RegExp.$1] = [el, hotMiddlewareScript];
        // } else {
        newObj[RegExp.$1] = (newObj[RegExp.$1] || []).concat(el);
        // }
    });
    return Object.assign(newObj, config.commonChunk);
}