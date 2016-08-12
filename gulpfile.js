var gulp = require('gulp');
var del = require('del');
var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

var config = require('./config');
var webpackConfig = require('./build/webpack.base.config');

var option = {
    src:'app/',
    dist:'dist/'
}

gulp.task('webpack', function () {
    webpack(webpackConfig, function (err, stats) {
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n')
    })
})

gulp.task('replace', function () {
    var assets = JSON.parse(fs.readFileSync('./webpack-assets.json'));
    gulp.src(option.src+'/**/*.ejs').pipe(
        through.obj(function (file, enc, cb) {
        Object.keys(assets).forEach(function (key) {
            if (path.resolve(__dirname,option.src,key) === path.dirname(file.path)) {
                var contents = file.contents.toString('utf-8');
                var array = contents.split('\n');
                if(array[array.length-1] === '') array.pop();
                array.splice(-1,0,'<script src="'+option.dist + assets[key]['js'] +'"></script>');
                contents = array.join('\n');
                file.contents = new Buffer(contents);
            }
        })
        this.push(file);
        cb();
    })
    ).pipe(gulp.dest('./app/'))
})

gulp.task('clean', function (cb) {
    del(['static/**/*'], cb);
})

gulp.task('default', ['clean', 'webpack','replace']);
