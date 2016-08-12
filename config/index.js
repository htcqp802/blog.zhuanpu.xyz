
var path = require('path')
module.exports = {
  app:path.resolve(__dirname,'../app'),
  static:path.resolve(__dirname,'../static'),
  port:8080,
  host:'localhost',
  proxyTarget:'',
  build:{
    assetsRoot: path.resolve(__dirname, '../static/dist'),
    assetsSubDirectory: '',
  }
}
