const { name } = require('./package')
const host = require('ip').address()
const port = 8092
module.exports = {
  outputDir: '../qiankun/b-project',
  productionSourceMap: false,
  devServer: {
    host,
    port,
    open: true,
    hot: true,
    https: false // 临时开启 https 环境，显示不安全，但可以测试一些问题，暂时这样解决
  },
  indexPath: process.env.NODE_ENV === 'production'
    ? 'source.html'
    : 'index.html',
  publicPath: './' || process.env.VUE_APP_BASE_PATH,
  chainWebpack: config => {
    config.devServer
      .headers({
        'Access-Control-Allow-Origin': '*'
      })

    // config.merge({
    //   entry: {
    //     main: [
    //       path.resolve(__dirname, './public-path.js'),
    //       path.resolve(api.service.context, 'src/main.js')
    //     ]
    //   }
    // })

    // 把子应用打包成 umd 库格式
    config.output
      .library(`${name}-[name]`)
      .libraryTarget('umd')
      .jsonpFunction(`webpackJsonp_${name}`)
  }
}