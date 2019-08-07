<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import InitPageInfo from './mixin/InitPageInfo'

  export default {
    mixins: [InitPageInfo],
    data() {
      return {

      }
    },
    created() {

    },
    beforeMount() {

    },
    mounted() {

    },
    methods: {},
  }

</script>

<style lang="less">
  html, body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  #app {
    width: 100%;
    height: 100%;
  }
</style>
