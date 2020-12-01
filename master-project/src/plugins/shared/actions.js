/*
 * @Author: wangqs
 * @Date: 2020-11-02 20:22:12
 * @Last Modified by: wangqs
 * @Last Modified time: 2020-12-01 17:01:08
 */
/*
 * 备注：
 * actions.onGlobalStateChange 用于注册监听 gloabalState 的监听器
 * actions.setGlobalState 方法用于改变 gloabalState 的值
 * actions.offGlobalStateChange 用于注销监听器
 */

import { initGlobalState, MicroAppStateActions } from 'qiankun'
// 对输入 state 的第一层属性做校验，只有初始化时声明过的第一层（bucket）属性才会被更改
// 暂时根据名称管理各子应用状态，没有特别需求各应用间尽量不用通信
const initialState = {
  /*
   * 通用消息体说明：
   * 示例主应用 向 子应用b传递消息：{msg: 'master/b/showDetail', data: {id: 'xxx'}}，常用消息一般都够用
   * msg 命名规则 当前应用名称/传递至应用名称/操作名称 appName/toAppName/action
   * data 为此次操作参数、数据
   * 当前各应用名称说明，主应用名称：master
   */
  msg: '', // 通用消息名称
  data: null // 通用消息数据
}
const actions = initGlobalState(initialState)

export default actions
