<!--目标组件容器，在设计器中，用于包裹目标编辑组件-->

<template>
  <div class="target-component-container">
    <slot></slot>
  </div>
</template>

<script>
  export default {
    name: 'TargetComponentContainer',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .target-component-container {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: #FFF;
  }
</style>
