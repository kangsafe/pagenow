<template>
    <div class="hello" :style="{width: '100%', height: '100%', backgroundColor: 'blue'}">
      <h2>{{msg}}</h2>
      <h2>Hello {{component.compConfigData.text}}</h2>
      <Button @click="sendEvent">发出事件</Button>
    </div>
</template>

<script>

  import FuncCompMixin from '../mixin/FuncCompMixin'

  export default {
    name: 'Hello',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        text: "huangjian",
        msg: '测试',
        fontSize: '15px',
        api: 'http://www.baidu.com',
        obj: {
          name: 'eeee'
        },
        customJsCode: ''
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
      sendEvent () {
        let _this = this;

        eval(this.component.compConfigData.customJsCode)

        // let fn = Function(this.component.compConfigData.text);
        // fn();

        //console.log($('#3b996173-8270-2851-e7b2-60ded587672d').html);
        //eval("(function(){"+this.component.compConfigData.text+"})()")
        //this.$EventBus.$emit('hello-click', 'hello');
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
