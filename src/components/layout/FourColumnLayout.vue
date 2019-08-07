<template>
  <div class="">
    <grid-layout
        :layout.sync="layout2"
        :col-num="12"
        :row-height="25"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        :responsive="true"
    >

      <grid-item v-for="item in layout2"
                 :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i">

        <ComponentContainer :location="item.location">
          <component :is="item.component"></component>
        </ComponentContainer>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';
  import HelloWorld from '../HelloWorld'
  import ComponentContainer from './ComponentContainer'
  export default {
    name: 'FourColumnLayout',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem,
      HelloWorld,
      ComponentContainer
    },
    data() {
      return {
        layout2: [
          {"x": 0, "y": 0, "w": 2, "h": 4, "i": "0", "component": "HelloWorld", "location": "0"},
          {"x": 2, "y": 0, "w": 2, "h": 4, "i": "1", "component": "HelloWorld", "location": "1"},
        ]
      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>
  .vue-grid-item {
    background-color: aliceblue;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
</style>
