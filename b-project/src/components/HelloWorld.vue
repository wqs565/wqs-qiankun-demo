<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div @click="actionBtn">点击传递子应用b事件</div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldB',
  props: {
    msg: String
  },
  methods: {
    actionBtn () {
      this.$qiankunActions.setGlobalState({msg: 'b/master/showDetail', data: {id: 'testBId', time: new Date()}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
