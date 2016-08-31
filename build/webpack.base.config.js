var path = require('path')
var glob = require('glob');
var config = require('../config');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry:  getEntery(),
    output: {
        path:'/',
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
        newObj[RegExp.$1] = (newObj[RegExp.$1] || []).concat(el);
    });
    return Object.assign(newObj, config.commonChunk);
}