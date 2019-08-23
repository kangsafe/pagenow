<template>
  <div class="" :style="Object.assign({
      fontSize: component.compConfigData.fontSize,
      color: component.compConfigData.color,
      lineHeight: component.compConfigData.lineHeight,
    }, component.compConfigData.customStyleCode)" v-html="component.compConfigData.text">

  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'TextComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        text: '我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本我是一段文本',

        fontSize: '14px',
        color: '#000000',

        lineHeight: '',

        customStyleCode: {}
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
