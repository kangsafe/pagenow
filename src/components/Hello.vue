<template>
    <div class="hello" :style="{width: '100%', height: '100%', backgroundColor: 'blue'}">
      <h2>{{msg}}</h2>
      <h2>Hello {{component.compConfigData.text}}</h2>
    </div>
</template>

<script>

  import FuncCompMixin from '../mixin/FuncCompMixin'

  export default {
    name: 'Hello',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        text: '你好呀',
        msg: '测试',
        fontSize: '15px',
        api: 'http://www.baidu.com',
        obj: {
          name: 'eeee'
        }
      }
    },
    data() {
      return {
        msg: '我是自己的Data'
      }
    },
    mounted() {
      this.$PnApi.TestApi.getMsg(this.component.compConfigData.msg).then((result)=> {
        this.msg = result.data.data;
      })
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
