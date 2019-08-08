<template>
  <div class="func-comp-container" @click="funcCompContainerClick">
    <slot></slot>
  </div>
</template>

<script>

  export default {
    name: 'FuncCompContainer',
    props: {
      location: {
        type: String,
        default: ''
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      funcCompContainerClick () {
        if(this.$slots.default) {
          this.$store.commit('designer/setCurrentSelectLayoutItemId', this.location);
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', this.$slots.default[0].componentOptions.tag + 'Form');
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
