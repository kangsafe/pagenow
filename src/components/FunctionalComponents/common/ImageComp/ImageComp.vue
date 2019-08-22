<template>
  <div class="image-comp">
    <img :src="imageSrc" :style="styleObj"/>
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
        useCustomStyle: false,
        customStyleCode: {}
      }
    },
    data() {
      return {
        styleObj: {}
      }
    },
    mounted() {
      this.buildStyleObj()
    },
    methods: {
      buildStyleObj () {
        this.styleObj = {
          width: this.component.compConfigData.width,
          height: this.component.compConfigData.height
        };
        if(this.component.compConfigData.useCustomStyle) {
          this.styleObj = Object.assign(this.styleObj, this.component.compConfigData.customStyleCode)
        }
      }
    },
    computed: {
      imageSrc () {
        return process.env.VUE_APP_BASEPATH + '/' + this.component.compConfigData.relativePath
      }
    },
    watch: {
      'component.compConfigData': {
        handler: 'buildStyleObj',
        deep: true
      }
    }
  }
</script>

<style scoped>
  .image-comp {
    width: 100%;
    height: 100%;
  }
</style>
