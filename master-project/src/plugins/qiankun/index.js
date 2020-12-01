/*
 * @Author: wangqs 
 * @Date: 2020-11-19 14:10:14 
 * @Last Modified by: wangqs
 * @Last Modified time: 2020-12-01 10:24:46
 */

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
      entry: `//${window.location.hostname}:${item.port}`,
      container: '#appContainer',
      activeRule: '/' + item.name
    }
}
export default microApps