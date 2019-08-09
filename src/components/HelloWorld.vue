<template>
  <div class="hello">
    hello
    <Button type="primary" @click="sayHello">按钮</Button>
  </div>
</template>

<script>
  import FuncCompMixin from '../mixin/FuncCompMixin'
  export default {
    name: 'HelloWorld',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        text: '你好呀'
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      sayHello() {
        alert('hello');
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .hello {
    width: 100%;
    height: 100%;
    background-color: red;
    padding: 10px;
    box-sizing: border-box;
  }
</style>
