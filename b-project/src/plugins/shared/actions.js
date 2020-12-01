/*
 * @Author: wangqs
 * @Date: 2020-11-10 13:54:01
 * @Last Modified by: wangqs
 * @Last Modified time: 2020-12-01 14:57:37
 */

function emptyAction () {
  // 警告：提示当前使用的是空 Action
  // eslint-disable-next-line
  console.warn('当前子应用 Actions 为空！')
}

class Actions {
  // 默认值为空 Action
  actions = {
    onGlobalStateChange: emptyAction,
    setGlobalState: emptyAction
  };

  /*
   * 设置当前 actions
   */
  setActions (actions) {
    this.actions = actions
  }

  /*
   * 映射方法
   */
  onGlobalStateChange (...args) {
    return this.actions.onGlobalStateChange(...args)
  }

  /*
   * 映射方法
   */
  setGlobalState (...args) {
    return this.actions.setGlobalState(...args)
  }
}

const actions = new Actions()
export default actions