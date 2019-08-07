<template>
  <div class="func-comp-container" @click="funcCompContainerClick">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'FuncCompContainer',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      funcCompContainerClick () {
        if(this.$slots.default) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', this.$slots.default[0].componentOptions.tag + 'Form');
          //this.$store.commit('setCurrentEditFuncCompConfigData',  this.$slots.default[0].componentInstance.$data.configData)
        }
      }
    },
    computed: {

    }
  }
</script>

<style scoped>
  .func-comp-container {
    width: 100%;
    height: 100%;
  }
</style>
