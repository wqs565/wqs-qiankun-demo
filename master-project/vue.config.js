/*
 * @Author: wangqs 
 * @Date: 2020-11-11 15:44:39 
 * @Last Modified by: wangqs
 * @Last Modified time: 2020-12-01 10:24:07
 */
const host = require('ip').address()
const port = 8080
module.exports = {
  outputDir: '../qiankun/', // 打包输出文件
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  devServer: {
    host,
    port,
    open: true,
    hot: true,
    https: false // 临时开启 https 环境，显示不安全，但可以测试一些问题，暂时这样解决
  }
}
