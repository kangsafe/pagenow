<template>
  <div id="AbsoluteLayout" class="absolute-layout-canvas"
       :style="styleObj" @click.stop="layoutCanvasClick">

    <div class="absolute-layout-item"
         :class="{
          activeBlack: $store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
            $PnUtil.getContrastYIQ(layout.layoutConfigData.backgroundColor.substring(1,7)) == 'black',
          activeWhite: $store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
            $PnUtil.getContrastYIQ(layout.layoutConfigData.backgroundColor.substring(1,7)) == 'white'
         }"
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
         @click.stop="layoutItemClick(layoutItem, $event)">
      <FuncCompContainer :location="layoutItem.id">
        <component :is="layoutItem.component.name" :location="layoutItem.id"
                   v-show="layoutItem.layoutItemConfigData.compVisible"></component>
      </FuncCompContainer>
    </div>

    <!--<div style="position: absolute; right: 0px; top: 0px;">
      {{layout}}
    </div>-->
  </div>
</template>

<script>

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutCanvas',
    data() {
      return {
        styleObj: {}
      }
    },
    mounted() {
      this.buildStyleObj();
      this.registerDragAndResizable();
    },
    methods: {

      buildStyleObj () {
        this.styleObj = {
          width: this.layout.layoutConfigData.width,
          height: this.layout.layoutConfigData.height,
          backgroundColor: this.layout.layoutConfigData.backgroundColor,
        };
        this.styleObj = Object.assign(this.styleObj, this.layout.layoutConfigData.customStyleCode)
      },

      registerDragAndResizable() {
        let _this = this;

        // 必须设置延迟，否则将无法正常给动态新增的布局块添加拖拽等事件
        setTimeout(() => {
          // 注册布局块拖拽
          $(".absolute-layout-item").draggable({
            containment: '#AbsoluteLayout',
            //stack: '.absolute-layout-item',
            snap: JSON.parse(localStorage.getItem('globalConfigData')).snapEnabled,
            start: function (e) {
              //_this.$store.commit('designer/setLayoutItemZIndex', {id: $(this).attr('data-id')})
            },
            drag: function (e) {
              _this.$store.commit('designer/setLayoutItemLeftAndTop', {id: $(this).attr('data-id'), left: $(this).position().left + 'px', top: $(this).position().top + 'px'})
            },
            stop: function () {

            }
          });

          // 注册布局块放置监听
          $(".absolute-layout-item").droppable({
            accept: ".comp-card",
            drop: (e, ui) => {

              let layoutItemId = e.target.attributes['data-id'].nodeValue;
              let compName = ui.draggable[0].innerText;
              let component = {
                id: this.$PnUtil.uuid(),
                name: compName,
                compConfigData: ''
              };
              const componentsContext = require.context('../../', true, /\.vue$/);

              componentsContext.keys().forEach(fileName => {
                const componentConfig = componentsContext(fileName);

                if(componentConfig.default.name == compName) {
                  const compInst = require('../../'+fileName.slice(2, fileName.length));
                  component.compConfigData = Object.assign({}, compInst.default.attr.configDataTemp)
                }
              });

              this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
              this.$store.commit('designer/addComponentToLayoutItem', {
                layoutItemId: layoutItemId,
                component: component
              })
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

      layoutCanvasClick () {
        this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
        this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
      },

      layoutItemClick(layoutItem, event) {
        // 点击布局块的时候，给布局块设置droppable的属性scope为layoutItemScope，
        // 与组件库拖拽对象的scope对应，这样组件库的拖拽对象就可以放置在当前点击的布局块里
        $(".absolute-layout-item").droppable('option', 'scope', '');
        for (let i=0; i<event.path.length; i++) {
          let s = $(event.path[i])[0].className + '';
          if (s.indexOf('absolute-layout-item') != -1) {
            $(event.path[i]).droppable('option', 'scope', 'layoutItemScope');
          }
        }

        // 如果当前点击的布局块没有关联组件，那么就清空rightSidebarFuncCompConfigFormName状态
        if (!layoutItem.component.id) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        }
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'AbsoluteLayoutItemForm');
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
      'layout.layoutItems': {
        handler: 'registerDragAndResizable'
      },
      'layout.layoutConfigData': {
        handler: 'buildStyleObj',
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

  .absolute-layout-item.activeBlack {
    box-shadow: 0 0 10px #000
  }
  .absolute-layout-item.activeWhite {
    box-shadow: 0 0 10px white
  }
</style>
