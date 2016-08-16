var path = require('path')
var glob = require('glob');
var AssetsPlugin = require('assets-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    entry: getEntery(),
    // devtool: 'source-map',
    output: {
        path: 'static',
        filename: '[name].js'
    },
    module: {
        loaders: [
            // { test: /\.js$/, exclude: /node_modules/, loader: 'babel' },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style','css!less')
            }
        ],
    }
    ,plugins: [
        new AssetsPlugin(),
        new ExtractTextPlugin('[name].css')
        ]
}


function getEntery(hotMiddlewareScript) {
    var pattern = path.resolve(__dirname, '../app/containers/**/main.js');
    var array = glob.sync(pattern);
    var newObj = {};
    array.map(function (el) {
        var reg = new RegExp('app/containers/(.*)/main.js', 'g');
        reg.test(el);
        if (hotMiddlewareScript) {
            newObj[RegExp.$1] = [el, hotMiddlewareScript];
        } else {
            newObj[RegExp.$1] = el;
        }
    });
    return newObj;
}