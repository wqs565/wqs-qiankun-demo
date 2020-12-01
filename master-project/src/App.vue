<template>
  <div id="container-app">
    <header>
      <nav>
        <ol>
          <li v-for="app of apps" :key="app.name">
            <a @click="goto(app.name, app.activeRule)">{{app.name}}</a>
          </li>
        </ol>
      </nav>
    </header>
    <div>
      主应用收到的消息：
      <div v-if="actionsData">
        <br>
        变更后：{{ actionsData.state }}
        <br>
        变更前：{{ actionsData.prevState }}
      </div>
    </div>
    <div id="appContainer" />
  </div>
</template>

<script>

import { registerMicroApps, runAfterFirstMounted, setDefaultMountApp, start } from 'qiankun'
// 初始化当前需要的子应用
import microApps from '@/plugins/qiankun'
// 各应用通信使用
import actions from '@/plugins/shared/actions.js'
const apps = microApps

export default {
  name: 'App',
  data () {
    return {
      apps,
      actionsData: null
    }
  },
  components: {
  },
  created () {
    if (!window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__) {
      this.initQiankun()
    } else {
      location.reload()
    }
  },
  methods: {
    goto (title, href) {
      window.history.pushState({}, title, href)
    },
    initQiankun () {
      registerMicroApps(
        apps,
        {
          beforeLoad: [
            app => {
              // eslint-disable-next-line no-console
              console.log('before load', app)
            }
          ],
          beforeMount: [
            app => {
              // eslint-disable-next-line no-console
              console.log('before mount', app)
            }
          ],
          afterUnmount: [
            app => {
              // eslint-disable-next-line no-console
              console.log('after unload', app)
            }
          ]
        }
      )

      const defaultApp = apps[0] || {}
      setDefaultMountApp(defaultApp.activeRule)

      runAfterFirstMounted(() => {
        // eslint-disable-next-line no-console
        console.info('first app mounted')
      })

      start({ prefetch: true })
    },
    // 通信消息接收
    appActions (data) {
      this.actionsData = data
    }
  },
  mounted () {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      // 主应用观察者，建议通过 store 分发事件
      this.appActions({ state, prevState })
    })
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
