<!--栅格布局，默认使用vue-grid-layout组件式布局-->

<template>
  <div class="pn-grid-layout">
    <grid-layout
        :layout="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
        :responsive="true"
        @layout-created="layoutCreatedEvent"
        @layout-before-mount="layoutBeforeMountEvent"
        @layout-mounted="layoutMountedEvent"
        @layout-ready="layoutReadyEvent"
        @layout-updated="layoutUpdatedEvent">

      <grid-item v-for="item in layout"
                 :key="item.i"
                 :x="item.x"
                 :y="item.y"
                 :w="item.w"
                 :h="item.h"
                 :i="item.i"
                 @resize="resizeEvent"
                 @move="moveEvent"
                 @resized="resizedEvent"
                 @moved="movedEvent">
        <ComponentContainer :location="item.location" :layout-item="item">
          <component :is="item.component"></component>
        </ComponentContainer>
      </grid-item>
    </grid-layout>
  </div>
</template>

<script>
  import VueGridLayout from 'vue-grid-layout';

  export default {
    name: 'PnGridLayout',
    components: {
      GridLayout: VueGridLayout.GridLayout,
      GridItem: VueGridLayout.GridItem
    },
    data() {
      return {
        layout: [
          {"x": 0, "y": 0, "w": 4, "h": 4, "i": "1", "location": "123", "component": "HelloWorld"}
        ]
      }
    },
    mounted() {

    },
    methods: {

      sayHello() {
        alert('hello');
      },

      layoutCreatedEvent(newLayout) {
        console.log("Created layout: ", newLayout)
      },
      layoutBeforeMountEvent(newLayout) {
        console.log("Before Mounted layout: ", newLayout)
      },
      layoutMountedEvent: function (newLayout) {
        console.log("Mounted layout: ", newLayout)
      },
      layoutReadyEvent: function (newLayout) {
        console.log("Ready layout: ", newLayout)
      },
      layoutUpdatedEvent: function (newLayout) {
        console.log("Updated layout: ", newLayout)
      },

      resizeEvent: function (i, newH, newW, newHPx, newWPx) {
        console.log("RESIZE i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      moveEvent: function (i, newX, newY) {
        console.log("MOVE i=" + i + ", X=" + newX + ", Y=" + newY);
      },
      resizedEvent: function (i, newH, newW, newHPx, newWPx) {
        console.log("RESIZED i=" + i + ", H=" + newH + ", W=" + newW + ", H(px)=" + newHPx + ", W(px)=" + newWPx);
      },
      movedEvent: function (i, newX, newY) {
        console.log("MOVED i=" + i + ", X=" + newX + ", Y=" + newY);
      }
    },
    computed: {}
  }
</script>

<style scoped>

  .pn-grid-layout {

  }

  .vue-grid-item {
    background-color: aliceblue;
    border: 1px solid #ccc;
    box-sizing: border-box;
  }
</style>
