<template>
  <div class="image-comp">
    <img :src="imageSrc" :style="Object.assign({
      width: component.compConfigData.width,
      height: component.compConfigData.height
    }, component.compConfigData.customStyleCode)"/>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'ImageComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        relativePath: '',
        width: '100%',
        height: '100%',
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
      imageSrc () {
        return process.env.VUE_APP_BASEPATH + '/' + this.component.compConfigData.relativePath
      }
    },
    watch: {
      
    }
  }
</script>

<style scoped>
  .image-comp {
    width: 100%;
    height: 100%;
  }
</style>
