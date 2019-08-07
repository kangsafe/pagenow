<template>
  <div id="AbsoluteLayout" class="absolute-layout"
       :style="{
        backgroundColor: layoutData.backgroundColor,
        width: layoutData.width,
        height: layoutData.height
       }" @click.stop="absoluteLayoutClidk">

    <div class="absolute-layout-item"
         :data-id="layoutItem.id"
         v-for="layoutItem in layoutData.layoutItems"
         :key="layoutItem.id"
         :style="{
          width: layoutItem.width,
          height: layoutItem.height,
          left: layoutItem.left,
          top: layoutItem.top,
          borderWidth: layoutItem.borderWidth,
          borderStyle: layoutItem.borderStyle,
          borderColor: layoutItem.borderColor,
          backgroundColor: layoutItem.backgroundColor,
          zIndex: layoutItem.zIndex
         }"
         @click.stop="layoutItemClick(layoutItem)">
      <FuncCompContainer>
        <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
      </FuncCompContainer>
    </div>

    <div style="position: absolute; right: 0px; top: 0px;">
      {{layoutData.layoutItems}}
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
              _this.$store.commit('designer/setLayoutItemZIndex', {id: $(this).attr('data-id')})
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

      },

      test() {
        // this.layoutData.name = '123123132'
        // console.log(this.$parent.$el);
        console.log('test');
      }
    },
    computed: {
      ...mapFields({
        snapEnabled: 'globalConfigData.snapEnabled',
        layoutData: 'currentEditPageInfo.layoutData',
      })
    },
    watch: {
      'layoutData': {
        handler: 'registerDragAndResizable',
        deep: true
      }
    }
  }
</script>

<style scoped>
  .absolute-layout {
    position: relative;
  }

  .absolute-layout-item {
    position: absolute;
  }
</style>
