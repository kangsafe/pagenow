<template>
  <div class="func-comp-container" @click="funcCompContainerClick">
    <slot><span class="default-text">{{defaultText}}</span></slot>
  </div>
</template>

<script>

  export default {
    name: 'FuncCompContainer',
    props: {
      location: {
        type: String,
        default: ''
      },
      defaultText: {
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
          // this.$store.commit('designer/setCurrentSelectLayoutItemId', this.location);
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

  .default-text {
    font-size: 2em;
    font-weight: bold;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    opacity:0.5;
  }
</style>
