<template>
  <div class="text-comp" ref="textContainer"
       :style="Object.assign({
          width: component.compConfigData.width,
          height: component.compConfigData.height,
          backgroundColor: component.compConfigData.backgroundColor,

          fontSize: component.compConfigData.fontSize,
          color: component.compConfigData.color,
          lineHeight: component.compConfigData.lineHeight
       }, $PnUtil.cssToVueStyleObj(component.compConfigData.customStyleCode))"
       :title="component.compConfigData.title"
       v-html="component.compConfigData.text"
       @click="textContainerClickHandle"
       @mouseenter="textContainerMouseenterHandle"
       @mouseleave="textContainerMouseleaveHandle">

  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'TextComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {

        text: '我是一段文本内容',
        title: '',

        width: '',
        height: '',
        backgroundColor: '',

        fontSize: '14px',
        color: '#000000',
        lineHeight: '',

        customStyleCode: '{\n}',
        customClickJsCode: ''
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      textContainerClickHandle() {
        let _this = this;
        if (this.component.compConfigData.customClickJsCode) {
          eval(this.component.compConfigData.customClickJsCode)
        }
      },
      textContainerMouseenterHandle () {
        // this.$refs.textContainer.style.color = 'red'
      },
      textContainerMouseleaveHandle () {
        // this.$refs.textContainer.style.color = this.component.compConfigData.color
      }
    },
    computed: {}
  }
</script>

<style lang="less" scoped>

</style>
