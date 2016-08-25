var gulp = require('gulp');
var del = require('del');
var through = require('through2');
var webpack = require('webpack');
var gulpWebpack = require('webpack-stream');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');
var glob = require('glob');

var config = require('./config');
var webpackConfig = require('./build/webpack.prod.config');

gulp.task('webpack', ['clean'], function () {
    return gulpWebpack(webpackConfig, webpack, logWebpck)
        .pipe(
        through.obj(function (file, enc, cb) {
            console.log(file.path);
            this.push(file);
            cb();
        })
        )
        .pipe(gulp.dest(config.dist.static))
})

gulp.task('common', function () {
    return gulp.src(config.commonPath + '/**/*.html')
        .pipe(
        through.obj(function (file, enc, cb) {
            var contents = file.contents.toString('utf-8');
            
        })
        )
})


gulp.task('html', ['webpack'], function () {
    var assets = require('./webpack-assets.json');
    var base = config.compilePath;
    var regHead = /<begin([^>]*)>/g;
    var regFoot = /<\/begin>/g;
    return gulp.src(config.compilePath + '/**/*.html')
        .pipe(
        through.obj(function (file, enc, cb) {
            var contents = file.contents.toString('utf-8');
            if (regHead.test(contents)) {
                var dirname = path.dirname(file.path).split(base)[1];
                var footHead = contents.match(regHead)[0];
                var headname = footHead.match(/head\=([\"\'])(.*?)\1/)[2];
                var footname = footHead.match(/foot\=([\"\'])(.*?)\1/)[2];
                var headPath = path.relative(path.join(base, dirname), path.join(config.commonPath, headname));
                var footPath = path.relative(path.join(base, dirname), path.join(config.commonPath, footname));
                Object.keys(assets).forEach(function (e) {
                    if (path.join('/', e) === dirname) {
                        contents = contents.replace(regHead, '<%-include("' + headPath + '.html",{css:["' + (assets[e].css ? assets[e].css : '') + '"]})%>')
                            .replace(regFoot, '<%-include("' + footPath + '.html",{js:["' + (assets[e].js ? assets[e].js : '') + '"]})%>')
                    }
                })
            }
            file.contents = new Buffer(contents);
            this.push(file);
            cb();
        })
        )
        .pipe(gulp.dest(config.dist.views))
})

gulp.task('clean', function (cb) {
    return del(config.dist.root + '/**/*');
})

gulp.task('default', ['clean', 'webpack', 'html']);

function logWebpck(err, stats) {
    if (err) console.log(err);
    process.stdout.write(stats.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
}