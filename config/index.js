var path = require('path');
var base = {
    //需编译文件的入口目录
    compilePath: path.resolve(__dirname, '../app/container/'),

    //需编译文件的入口文件名
    compileFilename: 'index',

    //全局目录
    alias: {
        component: path.resolve(__dirname, '../app/component'),
        img: path.resolve(__dirname, '../app/assets/images')
    },

    //公共文件目录
    commonPath: path.resolve(__dirname, '../app/container/base'),

    //编译后的静态资源目录
    dist:{
        root:path.resolve(__dirname,'../dist'),
        static:path.resolve(__dirname,'../dist/static'),
        views:path.resolve(__dirname,'../dist/views'),
    }
}

//公共模块
var commonChunk = {
    base: [base.commonPath + '/base.js', base.commonPath + '/base.less'],
    common: ['vue']
};

module.exports = Object.assign(base, { commonChunk: commonChunk });
