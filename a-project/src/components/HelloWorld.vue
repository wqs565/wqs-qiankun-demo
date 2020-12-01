<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div @click="actionBtn">
      点击传递a应用事件
    </div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorldA',
  props: {
    msg: String
  },
  methods: {
    actionBtn () {
      this.$qiankunActions.setGlobalState({msg: 'a/master/showDetail', data: {id: 'testAId', time: new Date()}})
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
