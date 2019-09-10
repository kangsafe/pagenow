<template>
  <div class="pn-icon-comp"
       :style="Object.assign({

       }, $PnUtil.cssToVueStyleObj(component.compConfigData.customStyleCode))">
    <Icon :type="component.compConfigData.iconType"
          :size="component.compConfigData.size" :color="component.compConfigData.color"/>
  </div>
</template>

<script>
  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'PnIconComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        iconType: 'md-add',
        size: '20',
        color: '#FFFFFF',
        customStyleCode: '{\n}'
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .pn-icon-comp {

  }
</style>
