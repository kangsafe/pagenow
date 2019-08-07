<template>
  <div id="AbsoluteLayout" class="absolute-layout-canvas"
       :style="{
        backgroundColor: layout.layoutConfigData.backgroundColor,
        width: layout.layoutConfigData.width,
        height: layout.layoutConfigData.height
       }" @click.stop="absoluteLayoutClidk">

    <div class="absolute-layout-item"
         :data-id="layoutItem.id"
         v-for="layoutItem in layout.layoutItems"
         :key="layoutItem.id"
         :style="{
          width: layoutItem.layoutItemConfigData.width,
          height: layoutItem.layoutItemConfigData.height,
          left: layoutItem.layoutItemConfigData.left,
          top: layoutItem.layoutItemConfigData.top,
          borderWidth: layoutItem.layoutItemConfigData.borderWidth,
          borderStyle: layoutItem.layoutItemConfigData.borderStyle,
          borderColor: layoutItem.layoutItemConfigData.borderColor,
          backgroundColor: layoutItem.layoutItemConfigData.backgroundColor,
          zIndex: layoutItem.layoutItemConfigData.zIndex,
          display: layoutItem.layoutItemConfigData.display
         }"
         @click.stop="layoutItemClick(layoutItem)">
      <FuncCompContainer>
        <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
      </FuncCompContainer>
    </div>

    <div style="position: absolute; right: 0px; top: 0px;">
      {{layout.layoutItems}}
    </div>
  </div>
</template>

<script>

  import $ from 'jquery'

  require('webpack-jquery-ui');
  require('webpack-jquery-ui/css');

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutCanvas',
    data() {
      return {

      }
    },
    mounted() {

      this.registerDragAndResizable();
    },
    methods: {

      registerDragAndResizable() {
        let _this = this;

        // 必须设置延迟，否则将无法正常给动态新增的布局块添加拖拽等事件
        setTimeout(function () {
          // 注册布局块拖拽
          $(".absolute-layout-item").draggable({
            containment: "#AbsoluteLayout",
            snap: _this.snapEnabled,
            start: function (e) {
              //_this.$store.commit('designer/setLayoutItemZIndex', {id: $(this).attr('data-id')})
            },
            drag: function (e) {
              _this.$store.commit('designer/setLayoutItemLeftAndTop', {id: $(this).attr('data-id'), left: $(this).position().left + 'px', top: $(this).position().top + 'px'})
            },
            stop: function () {

            }
          });

          $(".absolute-layout-item").droppable({
            drop: function(e, ui) {
              console.log(e);
              console.log(ui);
            }
          });

          // 注册布局块可变尺寸
          $(".absolute-layout-item").resizable({
            resize: function (e) {
              _this.$store.commit('designer/setLayoutItemWidthAndHeight', {id: $(this).attr('data-id'), width: $(this).width() + 'px', height: $(this).height() + 'px'})
            }
          });
        }, 100);

      },

      absoluteLayoutClidk() {

      },

      layoutItemClick(layoutItem) {
        this.$store.commit('designer/setRightSidebarComponentName', 'AbsoluteLayoutItemForm');
        this.$store.commit('designer/setCurrentSelectLayoutItemId', layoutItem.id)
      }
    },
    computed: {
      ...mapFields({
        snapEnabled: 'globalConfigData.snapEnabled',
        layout: 'pageMetadata.layout'
      })
    },
    watch: {
      'layout': {
        handler: 'registerDragAndResizable',
        deep: true
      }
    }
  }
</script>

<style scoped>
  .absolute-layout-canvas {
    position: relative;
  }

  .absolute-layout-item {
    position: absolute;
  }
</style>
