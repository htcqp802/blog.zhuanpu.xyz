var gulp = require('gulp');
var del = require('del');
var through = require('through2');
var webpack = require('webpack');
var gutil = require('gulp-util');
var fs = require('fs');
var path = require('path');

var config = require('./config');
var webpackConfig = require('./build/webpack.base.config');

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


gulp.task('html', function () {
    gulp.src('app/containers/**/*.html').pipe(
        through.obj(function (file, enc, cb) {
            var base = path.join(__dirname, 'app/containers');
            var contents = file.contents.toString('utf-8');
            var regHead = /<begin([^>]*)>/g;
            var regFoot = /<\/begin>/g;
            if (regHead.test(contents)) {
                var dirname = path.dirname(file.path.split('containers/')[1]);
                var footHead = contents.match(regHead)[0];
                var headname = footHead.match(/head\=([\"\'])(.*?)\1/)[2];
                var footname = footHead.match(/foot\=([\"\'])(.*?)\1/)[2];
                var headPath = path.relative(path.join(base, dirname), path.join(base, 'layout', headname));
                var footPath = path.relative(path.join(base, dirname), path.join(base, 'layout', footname));
                contents = contents.replace(regHead, '<%-include("' + headPath + '.html",{css:["css/' + dirname + '.css"]})%>')
                    .replace(regFoot, '<%-include("' + footPath + '.html",{js:["js/' + dirname + '.js"]})%>')
            }
            file.contents = new Buffer(contents);
            this.push(file);
            cb();
        })
    )
        .pipe(gulp.dest('./views'))
})

gulp.task('clean', function (cb) {
    del(['static/**/*', 'views/**/*'], cb);
})

gulp.task('default', ['clean','webpack','html']);
