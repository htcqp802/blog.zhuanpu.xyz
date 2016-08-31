var Express = require('express');
var webpack = require('webpack');
var config = require('../config');
var webpackConfig = require('./webpack.dev.config');
var compiler = webpack(webpackConfig);

var serverOptions = {
    contentBase: 'http://localhost:8080',
    quiet: true,
    noInfo: true,
    hot: true,
    inline: true,
    lazy: false,
    publicPath: '/',
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
};

var app = new Express();
app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen(8080, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> 🚧  静态文件地址为 http://localhost:8080');
    }
});






