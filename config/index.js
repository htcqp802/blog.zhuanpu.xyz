var path = require('path');
var base = {
    //需编译文件的入口目录
    compilePath: path.resolve(__dirname, '../app/container'),

    //需编译文件的入口文件名
    compileFilename: 'index',

    //全局目录
    alias: {
        component: path.resolve(__dirname, '../app/component')
    },

    //公共文件目录
    commonPath: path.resolve(__dirname, '../app/container/base'),

    //编译后的静态资源目录
    static: path.resolve(__dirname, '../static'),

    //编译后的模板目录
    views: path.resolve(__dirname, '../views')
}

//公共模块
var commonChunk = {
    common: ['vue'],
    base: [base.commonPath + '/base.js', base.commonPath + '/base.less']
};

module.exports = Object.assign(base, { commonChunk: commonChunk });
