var path = require('path')
var config = require('../config');
var glob = require('glob');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
    entry: getEntery(),
    devtool: '#eval-source-map',
    output: {
        path: config.build.assetsRoot,
        // publicPath:config.build.assetsPublicPath,
        filename: '[name].[hash].js'
    },
    plugins: [new AssetsPlugin()]
}


function getEntery(hotMiddlewareScript) {
    var pattern = config.app + '/**/main.js';
    var array = glob.sync(pattern);
    var newObj = {};
    array.map(function (el) {
        var reg = new RegExp('app/(.*)/main.js', 'g');
        reg.test(el);
        if (hotMiddlewareScript) {
            newObj[RegExp.$1] = [el, hotMiddlewareScript];
        } else {
            newObj[RegExp.$1] = el;
        }
    });

    return newObj;
}