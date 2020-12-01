import Vue from 'vue'
import App from './App.vue'
import actions from '@/plugins/shared/actions'

Vue.config.productionTip = false

let instance = null
let outProps = null
Vue.prototype.$qiankunActions = actions
// 处理资源
// eslint-disable-next-line
__webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__ || ''
function render (props) {
  outProps = props
  if (props) {
    // 子应用注入 qiankun actions 实例
    // 初始状态在主应用注册，具体参考主应用 shared/actions 文件
    actions.setActions(props)
  }
  instance = new Vue({
    render: h => h(App)
  }).$mount('#root')
}

if (!window.__POWERED_BY_QIANKUN__) {
  render(outProps)
}

export async function bootstrap () {
  // eslint-disable-next-line no-console
  console.log('vue app bootstraped')
}

export async function mount (props) {
  // eslint-disable-next-line no-console
  console.log('props from main framework', props)
  render(props)
}

export async function unmount () {
  instance.$destroy()
  instance = null
}
