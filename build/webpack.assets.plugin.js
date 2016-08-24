
function AssetsWebpackPlugin(options) {
    this.options = Object.assign({}, {
        path: '.',
        filename: 'webpack-assets.json',
        prettyPrint: false,
        update: false,
        fullPath: true
    }, options)
}

AssetsWebpackPlugin.prototype = {
    apply: function (compiler) {
        compiler.plugin('after-emit', function (compilation, callback) {
            var stats = compilation.getStats().toJson({
                hash: true,
                publicPath: true,
                assets: true,
                chunks: false,
                modules: false,
                source: false,
                errorDetails: false,
                timings: false
            })
        })
    }
}

module.exports = AssetsWebpackPlugin