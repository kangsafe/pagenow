<template>
  <div class="hello">
    hello {{component.compConfigData.text}}
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
        text: '你好呀',
        customJsCode: '_this.$EventBus.$off("hello-click"); _this.$EventBus.$on("hello-click", function(msg){_this.component.compConfigData.text = msg})'
      }
    },
    data() {
      return {}
    },
    mounted() {
      this.registerCustomJsCode()
    },
    methods: {
      sayHello() {
        alert('hello');
      },

      registerCustomJsCode () {
        let _this = this;
        eval(this.component.compConfigData.customJsCode)
      }
    },
    watch: {
      'component.compConfigData.customJsCode': {
        handler: 'registerCustomJsCode'
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
