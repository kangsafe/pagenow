<template>
  <div class="image-comp">
    <img :src="component.compConfigData.imageSrc"
         :style="styleObj"/>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'ImageComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        imageSrc: '',
        width: '100%',
        height: '100%',
        useCustomStyle: false,
        customStyleCode: '{}'
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
        if(this.component.compConfigData.useCustomStyle) {
          this.styleObj = JSON.parse(this.component.compConfigData.customStyleCode)
        }else {
          this.styleObj = {
            width: this.component.compConfigData.width,
            height: this.component.compConfigData.height
          }
        }
      }
    },
    computed: {

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
