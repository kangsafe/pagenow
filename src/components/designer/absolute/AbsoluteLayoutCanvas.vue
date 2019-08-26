<template>
  <div id="AbsoluteLayout" class="absolute-layout-canvas"
       :style="Object.assign({
         width: layout.layoutConfigData.width,
         height: layout.layoutConfigData.height,
         backgroundColor: layout.layoutConfigData.backgroundColor
       }, layout.layoutConfigData.customStyleCode)" @click.stop="layoutCanvasClick">

    <div class="absolute-layout-item"
         :class="buildLayoutItemClassObj(layoutItem)"
         :id="layoutItem.id"
         :data-id="layoutItem.id"
         v-for="layoutItem in layout.layoutItems"
         :key="layoutItem.id"
         :style="Object.assign({
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
         }, layoutItem.layoutItemConfigData.customStyleCode)"
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
        keepCtrl: false, // 标识当前是否保持按住Ctrl按键（mac下会监听command按键），用于多选布局块时使用
        topList: {}, // 用于ctrl多选拖拽
        leftList: {}, // 用于ctrl多选拖拽
      }
    },
    mounted() {

      this.registerDragAndResizable();
      this.registerKeyDownAndUp();
    },
    methods: {

      /**
       * 注册监听键盘按键
       */
      registerKeyDownAndUp () {
        let _this = this;

        $(document).unbind('keydown');
        $(document).unbind('keyup');

        $(document).bind("keydown", function(e) {
          if(_this.$PnUtil.isMac()) {
            if(e.keyCode == 91) { // Command键
              _this.keepCtrl = true;
            }
          }else if(_this.$PnUtil.isWindows()) {
            if(e.keyCode == 17) { // Ctrl键
              _this.keepCtrl = true;
            }
          }


          if (e.keyCode == 37) { // 方向左键
            if(_this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
              _this.$store.state.designer.currentSelectLayoutItemIds.forEach((id)=>{
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: id,
                    left: ($('#'+id).position().left - 1) + 'px',
                    top: $('#'+id).position().top + 'px'
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: ($('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().left - 1) + 'px',
                    top: $('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().top + 'px'
                  });
              }
            }
            e.preventDefault()
          }else if(e.keyCode == 38) { // 方向上键
            if(_this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
              _this.$store.state.designer.currentSelectLayoutItemIds.forEach((id)=>{
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: id,
                    left: $('#'+id).position().left + 'px',
                    top: ($('#'+id).position().top - 1) + 'px'
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: $('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().left + 'px',
                    top: ($('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().top - 1) + 'px'
                  });
              }
            }
            e.preventDefault()
          }else if(e.keyCode == 39) { // 方向右键
            if(_this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
              _this.$store.state.designer.currentSelectLayoutItemIds.forEach((id)=>{
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: id,
                    left: ($('#'+id).position().left + 1) + 'px',
                    top: $('#'+id).position().top + 'px'
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: ($('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().left + 1) + 'px',
                    top: $('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().top + 'px'
                  });
              }
            }
            e.preventDefault()
          }else if(e.keyCode == 40) { // 方向下键
            if(_this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
              _this.$store.state.designer.currentSelectLayoutItemIds.forEach((id)=>{
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: id,
                    left: $('#'+id).position().left + 'px',
                    top: ($('#'+id).position().top + 1) + 'px'
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: $('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().left + 'px',
                    top: ($('#'+_this.$store.state.designer.currentSelectLayoutItemId).position().top + 1) + 'px'
                  });
              }
            }

            e.preventDefault()
          }
        });
        $(document).bind("keyup", function(e) {
          if(_this.$PnUtil.isMac()) {
            if(e.keyCode == 91) { // Command键
              _this.keepCtrl = false;
            }
          }else if(_this.$PnUtil.isWindows()) {
            if(e.keyCode == 17) { // Ctrl键
              _this.keepCtrl = false;
            }
          }
        });

      },

      registerDragAndResizable() {
        let _this = this;

        // 必须设置延迟，否则将无法正常给动态新增的布局块添加拖拽等事件
        setTimeout(() => {
          // 注册布局块拖拽
          $(".absolute-layout-item").draggable({
            containment: '#AbsoluteLayout',
            delay: 100,
            //stack: '.absolute-layout-item',
            snap: JSON.parse(localStorage.getItem('globalConfigData')).snapEnabled,
            start: function (a, b) {
              //_this.$store.commit('designer/setLayoutItemZIndex', {id: $(this).attr('data-id')})

              let currentSelectLayoutItemIds = _this.$store.state.designer.currentSelectLayoutItemIds;
              if(currentSelectLayoutItemIds.length > 0) {
                let t0 = $(this)[0].offsetTop;
                let l0 = $(this)[0].offsetLeft;

                for (let i=0; i<currentSelectLayoutItemIds.length; i++) {
                  if($(this).attr('data-id') != currentSelectLayoutItemIds[i]) {

                    let t1 = $('#'+currentSelectLayoutItemIds[i])[0].offsetTop;
                    let l1 = $('#'+currentSelectLayoutItemIds[i])[0].offsetLeft;
                    _this.topList[currentSelectLayoutItemIds[i]] = t1-t0;
                    _this.leftList[currentSelectLayoutItemIds[i]] = l1-l0;
                  }
                }
              }
            },
            drag: function (e, b) {
              _this.$store.commit('designer/setLayoutItemLeftAndTop', {id: $(this).attr('data-id'), left: $(this).position().left + 'px', top: $(this).position().top + 'px'});

              let currentSelectLayoutItemIds = _this.$store.state.designer.currentSelectLayoutItemIds;
              if(currentSelectLayoutItemIds.length > 0) {
                let t0 = $(this)[0].offsetTop;
                let l0 = $(this)[0].offsetLeft;

                for (let i=0; i<currentSelectLayoutItemIds.length; i++) {
                  if($(this).attr('data-id') != currentSelectLayoutItemIds[i]) {

                    let t = _this.topList[currentSelectLayoutItemIds[i]];
                    let l = _this.leftList[currentSelectLayoutItemIds[i]];

                    _this.$store.commit('designer/setLayoutItemLeftAndTop', {id: currentSelectLayoutItemIds[i], left: l0+l + 'px', top: t0+t + 'px'})
                  }
                }
              }
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
            delay: 100,
            resize: function (e) {
              _this.$store.commit('designer/setLayoutItemWidthAndHeight', {id: $(this).attr('data-id'), width: $(this).width() + 'px', height: $(this).height() + 'px'})
            }
          });
        }, 100);

      },

      layoutCanvasClick () {
        this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
        this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        this.$store.commit('designer/setCurrentSelectLayoutItemIds', [])
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

        // 判断当前是否按住了ctrl按键
        if(this.keepCtrl) {
          let selectLayoutItemIds = this.currentSelectLayoutItemIds.concat();

          if(selectLayoutItemIds.indexOf(layoutItem.id) > -1) {
            for (let i=0; i<selectLayoutItemIds.length; i++) {
              if(layoutItem.id == selectLayoutItemIds[i]) {
                selectLayoutItemIds.splice(i, 1);
                i--
              }
            }
          }else {
            selectLayoutItemIds.pushNoRepeat(layoutItem.id);
          }
          this.$store.commit('designer/setCurrentSelectLayoutItemIds', selectLayoutItemIds);
        } else {
          if(this.$store.state.designer.currentSelectLayoutItemIds.indexOf(layoutItem.id) == -1) {
            this.$store.commit('designer/setCurrentSelectLayoutItemIds', []) // 清除ctrl选中的布局块

          }
        }

        // 如果当前点击的布局块没有关联组件，那么就清空rightSidebarFuncCompConfigFormName状态
        if (!layoutItem.component.id) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        }
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'AbsoluteLayoutItemForm');
        this.$store.commit('designer/setCurrentSelectLayoutItemId', layoutItem.id)
      },

      buildLayoutItemClassObj: function (layoutItem) {

        if (this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
          if (this.$store.state.designer.currentSelectLayoutItemIds.indexOf(layoutItem.id) > -1 &&
            this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'black') {
            return 'activeBlack'
          }
          if (this.$store.state.designer.currentSelectLayoutItemIds.indexOf(layoutItem.id) > -1 &&
            this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'white') {
            return 'activeWhite'
          }
        }else {
          if (this.$store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
            this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'black') {
            return 'activeBlack'
          }
          if (this.$store.state.designer.currentSelectLayoutItemId == layoutItem.id &&
            this.$PnUtil.getContrastYIQ(this.layout.layoutConfigData.backgroundColor.substring(1,7)) == 'white') {
            return 'activeWhite'
          }
        }

        return ''
      }
    },
    computed: {
      ...mapFields({
        layout: 'pageMetadata.layout',
        currentSelectLayoutItemIds: 'currentSelectLayoutItemIds'
      })
    },
    watch: {
      'layout.layoutItems': {
        handler: 'registerDragAndResizable'
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
