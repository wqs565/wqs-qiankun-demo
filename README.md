# qiankun 微前端解决方案 demo
一个简单的 微前端 项目搭建的demo、包含通信、路由等，使用方便，开箱即用，方便大家快速了解微前端

#### 项目介绍
🎉创建 1 个微前端项目正确打开方式，方便管理

[qiankun 快速上手](https://qiankun.umijs.org/zh/guide/getting-started)

#### 使用步骤

#### 直接上手运行
1. git clone
2. cd /wqs-qiankun-demo

``` sh
$ yarn // 安装 入口依赖
$ yarn install:all // 安装 主应用和各子应用 依赖
$ yarn serve:all // 运行当前 主应用和子应用 
```


#### 使用说明
1. 项目目录说明
```-
.
|-- a-project                           // 子项目 a 文件目录，本地默认端口8091
|-- b-project                           // 子项目 b 文件目录，本地默认端口8092
|-- master-project                      // 主项目文件目录，默认端口8080
|-- qiankun                             // 打包后的文件 
|-- README.md                           // 项目说明
|-- package.json                        // 全局配置项目相关信息
.
```

2. 配置主应用入口文件(/master-project/src/App.vue)
```javascript
  const { NODE_ENV } = process.env

  // 用到的子应用
  const basePaths = [{name: 'a-project', port: '8091'},{name: 'b-project', port: '8092'}]

  const microApps = []
  basePaths.forEach(item => {
    microApps.push(getMicroConfig(item))
  })

  function getMicroConfig (item) {
    return NODE_ENV === 'production'
    ? { 
        name: item.name,
        entry: `/${item.name}/source.html`,// 打包后入口地址，建议自己单独部署到某个地址，这里为了方便在本地演示，先这样做了
        container: '#appContainer',
        activeRule: `/${item.name}/`
      }
    :
      { 
        name: item.name,
        entry: `//localhost:${item.port}`,
        container: '#appContainer',
        activeRule: '/' + item.name
      }
  }
  export default microApps
```

3. 各项目分开运行和打包
```-
$ yarn install:master // 主项目依赖安装
$ yarn install:a // 子应用a依赖安装
$ yarn install:b // 子应用b依赖安装
$ yarn build:master 打包主应用
$ yarn build:a // 打包子应用a
$ yarn build:b // 打包子应用b
$ yarn serve:master // 运行主项目
$ yarn serve:a // 子项目a运行
$ yarn serve:b // 子项目b运行
```

4. 打包目录设置 （在每个项目内的 vue.config.js 内配置）
```javascript
module.exports = {
  outputDir: '../qiankun/', // 打包输出文件
  productionSourceMap: false,
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/'
}
// 备注 部署子应用时注意资源跨域的问题，需要修改一些Nginx配置
```

#### 通信相关

1. 主应用(/src/plugins/shared/actions.js)
```javascript
// 初始化数据
import { initGlobalState, MicroAppStateActions } from 'qiankun'
const initialState = {
  msg: '', // 通用消息名称
  data: null // 通用消息数据
}
const actions = initGlobalState(initialState)
export default actions
```
```javascript
// /src/App.vue 注册观察者函数监听数据变化
actions.onGlobalStateChange((state, prevState) => {
  // state: 变更后的状态; prevState: 变更前的状态
  // 主应用观察者，建议通过 store 分发事件
  this.appActions({ state, prevState })
})
```

2. 子应用全局注册(/src/main.js)
```javascript
// 入口文件全局注册
import actions from '@/plugins/shared/actions'
Vue.prototype.$qiankunActions = actions
```
```javascript
// 调用事件传递示例
this.$qiankunActions.setGlobalState({msg: 'b/master/showDetail', data: {id: 'testBId', time: new Date()}})
```

#### 说明

> 持续优化中如果对您对此项目有兴趣，可以点 "Star" 支持一下 谢谢！ ^_^

#### 参与贡献（项目持续优化中）

1. Fork 本项目
2. 新建 Feat_xxx 分支
3. 提交代码
4. 新建 Pull Request
