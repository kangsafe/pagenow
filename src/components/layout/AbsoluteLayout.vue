<!--发布版绝对布局-->

<template>
  <div id="AbsoluteLayout" class="absolute-layout"
       :style="{
        backgroundColor: compData.containerBackgroundColor,
        width: compData.containerWidth,
        height: compData.containerHeight
       }">
    <!--<a-button @click="getParentData">getParentData</a-button>-->

    <div class="layout-item" :data-id="layoutItem.id" v-for="layoutItem in layoutItems" :key="layoutItem.id"
         :style="{
          width: layoutItem.width,
          height: layoutItem.height,
          position: 'absolute',
          left: layoutItem.left,
          top: layoutItem.top,
          borderWidth: layoutItem.borderWidth,
          borderStyle: layoutItem.borderStyle,
          borderColor: layoutItem.borderColor,
          backgroundColor: layoutItem.backgroundColor,
          zIndex: layoutItem.zIndex
         }" @dblclick="selectComp(layoutItem)">
      <component :is="layoutItem.component"></component>
    </div>

    <div style="position: absolute; right: 0px; top: 0px;">

      {{layoutItems}}
    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  require('webpack-jquery-ui');
  require('webpack-jquery-ui/css');

  export default {
    name: 'AbsoluteLayout',
    data() {
      return {

        layoutItems: [
          {
            id: this.$PnUtil.uuid(),
            width: '200px',
            height: '300px',
            left: '100px',
            top: '30px',
            borderWidth: '2px',
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: 'red',
            zIndex: '1',
            component: ''
          },
          {
            id: this.$PnUtil.uuid(),
            width: '100px',
            height: '100px',
            left: '400px',
            top: '90px',
            borderWidth: '1px',
            borderStyle: 'solid',
            borderColor: '#000',
            backgroundColor: 'blue',
            zIndex: '1',
            component: ''
          }
        ],
        compData: {
          containerBackgroundColor: 'antiquewhite',
          containerWidth: '1000px',
          containerHeight: '600px',
          layout: [

          ]
        }
      }
    },
    mounted() {
      let _this = this;


      $(".layout-item").draggable({
        containment: "#AbsoluteLayout",
        start: function(e) {
          let currentLayoutItemId = $(this).attr('data-id');
          for (let i=0; i<_this.layoutItems.length; i++) {
            if(_this.layoutItems[i].id == currentLayoutItemId) {
              _this.layoutItems[i].zIndex = '2';
            }else {
              _this.layoutItems[i].zIndex = '1';
            }
          }
        },
        drag: function(e) {
          let currentLayoutItemId = $(this).attr('data-id');
          for (let i=0; i<_this.layoutItems.length; i++) {
            if(_this.layoutItems[i].id == currentLayoutItemId) {
              _this.layoutItems[i].left = $(this).position().left + 'px';
              _this.layoutItems[i].top = $(this).position().top + 'px';
            }
          }
          // _this.x = $(this).position().left;
          // _this.y = $(this).position().top;
        },
        stop: function() {

        }
      });

      // 注册可变尺寸
      $(".layout-item").resizable({
        resize: function (e) {
          let currentLayoutItemId = $(this).attr('data-id');
          for (let i=0; i<_this.layoutItems.length; i++) {
            if(_this.layoutItems[i].id == currentLayoutItemId) {
              _this.layoutItems[i].width = $(this).width() + 'px';
              _this.layoutItems[i].height = $(this).height() + 'px';
            }
          }
        }
      });
    },
    methods: {

      selectComp (_layoutItem) {
        _layoutItem.component = 'HelloWorld';
        console.log(_layoutItem);
      },

      getParentData() {
        console.log(this.$parent.$el);
      }
    },
    computed: {}
  }
</script>

<style scoped>
  .absolute-layout {
    position: relative;
  }
</style>
