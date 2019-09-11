<template>
  <div id="AbsoluteLayout"
       class="absolute-layout-canvas"
       :class="buildLayoutClassObj(layout)"
       :style="Object.assign({
         width: layout.layoutConfigData.width + layout.layoutConfigData.widthPixelUnit,
         height: layout.layoutConfigData.height + layout.layoutConfigData.heightPixelUnit,
         backgroundColor: layout.layoutConfigData.backgroundColor
       }, $PnUtil.cssToVueStyleObj(layout.layoutConfigData.customStyleCode))" @click.stop="layoutCanvasClick">

    <transition
        appear
        :enter-active-class="buildEnterActiveClass(layoutItem)"
        :leave-active-class="buildLeaveActiveClass(layoutItem)"
        v-for="layoutItem in layout.layoutItems"
        :key="layoutItem.id">

      <vue-draggable-resizable :id="'drag-'+layoutItem.id"
                               :draggable="layoutItem.layoutItemConfigData.draggableEnabled"
                               :resizable="layoutItem.layoutItemConfigData.resizableEnabled"
                               :parent="true"
                               :grid="[layout.layoutConfigData.dragPixel, layout.layoutConfigData.dragPixel]"
                               :x="layoutItem.layoutItemConfigData.left"
                               :y="layoutItem.layoutItemConfigData.top"
                               :w="layoutItem.layoutItemConfigData.width"
                               :h="layoutItem.layoutItemConfigData.height"
                               :style="{
                                 zIndex: layoutItem.layoutItemConfigData.zIndex,
                                 display: layoutItem.layoutItemConfigData.display
                               }"
                               @activated="onLayoutItemActivated(layoutItem)" @deactivated="onLayoutItemDeactivated"
                               @dragging="onLayoutItemDrag" @dragstop="onLayoutItemDragStop"
                               @resizing="onLayoutItemResize" @resizestop="onLayoutItemResizeStop">
        <div class="absolute-layout-item"
             :class="buildLayoutItemClassObj(layoutItem)"
             :id="layoutItem.id"
             :data-id="layoutItem.id"
             :style="Object.assign({
               borderWidth: layoutItem.layoutItemConfigData.borderWidth + 'px',
               borderStyle: layoutItem.layoutItemConfigData.borderStyle,
               borderColor: layoutItem.layoutItemConfigData.borderColor,
               borderTopLeftRadius: layoutItem.layoutItemConfigData.borderTopLeftRadius + 'px',
               borderTopRightRadius: layoutItem.layoutItemConfigData.borderTopRightRadius + 'px',
               borderBottomLeftRadius: layoutItem.layoutItemConfigData.borderBottomLeftRadius + 'px',
               borderBottomRightRadius: layoutItem.layoutItemConfigData.borderBottomRightRadius + 'px',
               backgroundColor: layoutItem.layoutItemConfigData.backgroundColor,
               padding: layoutItem.layoutItemConfigData.padding + 'px',
               cursor: layoutItem.layoutItemConfigData.cursor,
             }, $PnUtil.cssToVueStyleObj(layoutItem.layoutItemConfigData.customStyleCode))"
             @click.stop="layoutItemClick(layoutItem, $event)"
             @mouseenter="layoutItemMouseenterHandle(layoutItem, $event)"
             @mouseleave="layoutItemMouseleaveHandle(layoutItem, $event)"
             @contextmenu.prevent="layoutItemContextMenu(true, $event)">
          <FuncCompContainer :location="layoutItem.id">
            <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
          </FuncCompContainer>
        </div>
      </vue-draggable-resizable>
    </transition>

    <!--布局块右键菜单-->
    <Card ref="layoutItemContextMenu" :padding="0" shadow
          style="position: fixed; z-index: 999; display: none; border-radius: 0px;">
      <div>
        <CellGroup @on-click="layoutItemContextMenuClick">
          <Cell name="menu_delLayoutItem" style="color: #ed4014;"><Icon type="md-trash"/> 删除布局块</Cell>
          <Cell name="menu_unbindComponent"><Icon type="md-close" /> 解除关联组件</Cell>
          <Cell name="menu_copyLayoutItem"><Icon type="md-copy" /> 复制拷贝</Cell>
        </CellGroup>
      </div>
    </Card>

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
        tmpCurrentSelectLayoutItemId: '', // 临时存储当前选中布局块的ID

        keepCtrl: false, // 标识当前是否保持按住Ctrl按键（mac下会监听command按键），用于多选布局块时使用
        topList: {}, // 用于ctrl多选拖拽
        leftList: {}, // 用于ctrl多选拖拽
      }
    },
    mounted() {

      this.registerDrop();
      this.registerKeyDownAndUp();

    },
    methods: {

      layoutItemContextMenu (enabled, event) {
        //console.log(event);
        if (enabled) {
          this.$refs.layoutItemContextMenu.$el.style.display = 'block';
          this.$refs.layoutItemContextMenu.$el.style.left = (event.x + 5) + 'px';
          this.$refs.layoutItemContextMenu.$el.style.top = (event.y + 5) + 'px';
        }else {
          this.$refs.layoutItemContextMenu.$el.style.display = 'none';
        }
      },

      /**
       * 布局块右键菜单点击事件处理
       * @param name
       */
      layoutItemContextMenuClick (name) {
        let tmpLayoutItemId = this.$store.state.designer.currentSelectLayoutItemId;
        let tmpLayoutItemIds = this.currentSelectLayoutItemIds.concat();
        // 删除布局块
        if (name == 'menu_delLayoutItem') {
          this.$Modal.confirm({
            title: '提醒',
            content: '确认删除所选中的布局块吗？',
            onOk: () => {
              let layoutItemIds = [];
              if(tmpLayoutItemIds.length > 0) {
                layoutItemIds = tmpLayoutItemIds
              }else {
                layoutItemIds.pushNoRepeat(tmpLayoutItemId)
              }
              layoutItemIds.forEach(id => {
                this.$store.commit('designer/deleteLayoutItem', id);
                this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
                this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
                this.$store.commit('designer/setCurrentSelectLayoutItemIds', []);
                this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
              });
            }
          });
        }
        // 解绑关联组件
        else if (name == 'menu_unbindComponent') {
          this.$Modal.confirm({
            title: '提醒',
            content: '确认解除关联的组件吗？',
            onOk: () => {
              this.$store.commit('designer/deleteComponentByLayoutItemId', tmpLayoutItemId);
              this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
            }
          });
        }
        // 复制拷贝
        else if (name == 'menu_copyLayoutItem') {

          let newLayoutItemIds = [];
          let layoutItemIds = [];
          if(this.currentSelectLayoutItemIds.length > 0) {
            layoutItemIds = this.currentSelectLayoutItemIds.concat();
          }else {
            layoutItemIds.pushNoRepeat(tmpLayoutItemId)
          }

          layoutItemIds.forEach(id => {
            let layoutItem = this.$store.getters['designer/getLayoutItemById'](id);
            let newLayoutItemConfigData = Object.assign({}, layoutItem.layoutItemConfigData);
            newLayoutItemConfigData.left = layoutItem.layoutItemConfigData.left + 30;
            newLayoutItemConfigData.top = layoutItem.layoutItemConfigData.top + 30;

            let newLayoutItem = {
              id: this.$PnUtil.uuid(),
              layoutItemConfigData: newLayoutItemConfigData,
              component: {
                id: '',
                name: '',
                compConfigData: {}
              }
            };
            if(layoutItem.component.id) {
              let newComponent = Object.assign({}, layoutItem.component);
              newComponent.id = this.$PnUtil.uuid();
              newLayoutItem.component = newComponent
            }

            this.$store.commit('designer/addLayoutItem', newLayoutItem);
            newLayoutItemIds.pushNoRepeat(newLayoutItem.id)
          });

          if (this.currentSelectLayoutItemIds.length > 0) {
            setTimeout(()=>{
              this.$store.commit('designer/setCurrentSelectLayoutItemIds', newLayoutItemIds)
            },100)
          }

          this.$Message.info({
            duration: 5,
            closable: true,
            content: '执行复制拷贝操作之后，建议保存并重载当前页面'
          })

        }
        this.layoutItemContextMenu(false)
      },

      onLayoutItemActivated (layoutItem) {
        // console.log('onLayoutItemActivated');

        this.registerKeyDownAndUp(); // 重新注册键盘监听

        this.tmpCurrentSelectLayoutItemId = layoutItem.id;

        // 点击布局块的时候，给布局块设置droppable的属性scope为layoutItemScope，
        // 与组件库拖拽对象的scope对应，这样组件库的拖拽对象就可以放置在当前点击的布局块里
        $('.absolute-layout-item').droppable('option', 'scope', '');
        $('#'+layoutItem.id).droppable('option', 'scope', 'layoutItemScope');

        // 如果当前点击的布局块没有关联组件，那么就清空rightSidebarFuncCompConfigFormName状态
        /*if (!layoutItem.component.id) {
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        }*/
        this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'AbsoluteLayoutItemForm');
        this.$store.commit('designer/setCurrentSelectLayoutItemId', this.tmpCurrentSelectLayoutItemId)
      },

      onLayoutItemDeactivated () {
        // console.log('onLayoutItemDeactivated');
        this.tmpCurrentSelectLayoutItemId = '';

        // 此处关闭右键菜单要设置一段延时，否则在布局块失活时，同步关闭菜单的话，会出现菜单点击无效的情况
        setTimeout(item => {
          this.layoutItemContextMenu(false)
        }, 250)
      },

      onLayoutItemDrag (left, top) {
        let currentLayoutItem = this.$store.getters['designer/getLayoutItemById'](this.tmpCurrentSelectLayoutItemId);

        let offsetLeft = left - currentLayoutItem.layoutItemConfigData.left; // 左偏移
        let offsetTop = top - currentLayoutItem.layoutItemConfigData.top; // 右偏移

        let currentSelectLayoutItemIds = this.$store.state.designer.currentSelectLayoutItemIds;
        if (currentSelectLayoutItemIds.length > 0) {
          currentSelectLayoutItemIds.forEach(id => {
            if (id != this.tmpCurrentSelectLayoutItemId) {
              let otherLayoutItem = this.$store.getters['designer/getLayoutItemById'](id);
              $('#drag-'+id).css('left', otherLayoutItem.layoutItemConfigData.left + offsetLeft);
              $('#drag-'+id).css('top', otherLayoutItem.layoutItemConfigData.top + offsetTop);
            }
          });
        }
      },

      onLayoutItemDragStop (left, top) {
        // console.log('onLayoutItemDragStop');
        this.$store.commit('designer/setLayoutItemLeftAndTop', {id: this.tmpCurrentSelectLayoutItemId, left: left, top: top});
        let currentSelectLayoutItemIds = this.$store.state.designer.currentSelectLayoutItemIds;
        if (currentSelectLayoutItemIds.length > 0) {
          currentSelectLayoutItemIds.forEach(id => {
            if (id != this.tmpCurrentSelectLayoutItemId) {
              let otherLayoutItem = this.$store.getters['designer/getLayoutItemById'](id);
              this.$store.commit('designer/setLayoutItemLeftAndTop',
                {id: id, left: $('#drag-'+id).position().left, top: $('#drag-'+id).position().top});
            }
          });
        }
      },

      onLayoutItemResize (left, top, width, height) {

      },

      onLayoutItemResizeStop (left, top, width, height) {
        // console.log('onLayoutItemResizeStop');
        this.$store.commit('designer/setLayoutItemWidthAndHeight',
          {id: this.tmpCurrentSelectLayoutItemId, width: width, height: height})
      },

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
              if(_this.tmpCurrentSelectLayoutItemId) {
                let tmpIds = _this.currentSelectLayoutItemIds.concat();
                tmpIds.pushNoRepeat(_this.tmpCurrentSelectLayoutItemId);
                _this.$store.commit('designer/setCurrentSelectLayoutItemIds', tmpIds)
              }
            }
          }else if(_this.$PnUtil.isWindows()) {
            if(e.keyCode == 17) { // Ctrl键
              _this.keepCtrl = true;
              if(_this.tmpCurrentSelectLayoutItemId) {
                let tmpIds = _this.currentSelectLayoutItemIds.concat();
                tmpIds.pushNoRepeat(_this.tmpCurrentSelectLayoutItemId);
                _this.$store.commit('designer/setCurrentSelectLayoutItemIds', tmpIds)
              }
            }
          }


          if (e.keyCode == 37) { // 方向左键
            if(_this.$store.state.designer.currentSelectLayoutItemIds.length > 0) {
              _this.$store.state.designer.currentSelectLayoutItemIds.forEach((id)=>{
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: id,
                    left: ($('#drag-'+id).position().left - _this.layout.layoutConfigData.dragPixel),
                    top: $('#drag-'+id).position().top
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: ($('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().left - _this.layout.layoutConfigData.dragPixel),
                    top: $('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().top
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
                    left: $('#drag-'+id).position().left,
                    top: ($('#drag-'+id).position().top - _this.layout.layoutConfigData.dragPixel)
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: $('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().left,
                    top: ($('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().top - _this.layout.layoutConfigData.dragPixel)
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
                    left: ($('#drag-'+id).position().left + _this.layout.layoutConfigData.dragPixel),
                    top: $('#drag-'+id).position().top
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: ($('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().left + _this.layout.layoutConfigData.dragPixel),
                    top: $('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().top
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
                    left: $('#drag-'+id).position().left,
                    top: ($('#drag-'+id).position().top + _this.layout.layoutConfigData.dragPixel)
                  });
              })
            }else {
              if(_this.$store.state.designer.currentSelectLayoutItemId) {
                _this.$store.commit('designer/setLayoutItemLeftAndTop',
                  {
                    id: _this.$store.state.designer.currentSelectLayoutItemId,
                    left: $('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().left,
                    top: ($('#drag-'+_this.$store.state.designer.currentSelectLayoutItemId).position().top + _this.layout.layoutConfigData.dragPixel)
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

      registerDrop() {
        let _this = this;

        // 必须设置延迟，否则将无法正常给动态新增的布局块添加拖拽等事件
        setTimeout(() => {

          // 注册布局块放置监听
          $(".absolute-layout-item").droppable({
            accept: ".comp-card",
            drop: (e, ui) => {

              let layoutItemId = e.target.attributes['data-id'].nodeValue;
              let compName = ui.draggable[0].attributes['data-component'].nodeValue;
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

        }, 100);

      },

      layoutCanvasClick () {
        // console.log('layoutCanvasClick');
        if (!this.currentSelectLayoutItemId) {
          this.registerKeyDownAndUp(); // 重新注册键盘监听

          this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
          this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '');
          this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
          this.$store.commit('designer/setCurrentSelectLayoutItemIds', [])
        }
      },

      layoutItemClick(layoutItem, event) {

        this.layoutItemContextMenu(false);

        // 判断当前是否按住了ctrl按键
        if(this.keepCtrl) {
          let selectLayoutItemIds = this.currentSelectLayoutItemIds.concat();

          if(selectLayoutItemIds.indexOf(layoutItem.id) > -1) {
            for (let i=0; i<selectLayoutItemIds.length; i++) {
              if(layoutItem.id == selectLayoutItemIds[i]) {
                if(selectLayoutItemIds.length > 1) {
                  selectLayoutItemIds.splice(i, 1);
                  i--
                }
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

      },

      buildLayoutClassObj (layout) {
        if(layout.layoutConfigData.showGrid) {
          return layout.layoutConfigData.canvasGridClass
        }
        return ''
      },

      buildLayoutItemClassObj (layoutItem) {

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
      },

      layoutItemMouseenterHandle (layoutItem, e) {
        if(layoutItem.layoutItemConfigData.mouseenterBackgroundColor) {
          e.target.style.backgroundColor = layoutItem.layoutItemConfigData.mouseenterBackgroundColor;
        }
      },
      layoutItemMouseleaveHandle (layoutItem, e) {
        if(layoutItem.layoutItemConfigData.mouseleaveBackgroundColor) {
          e.target.style.backgroundColor = layoutItem.layoutItemConfigData.mouseleaveBackgroundColor
        }else {
          e.target.style.backgroundColor = layoutItem.layoutItemConfigData.backgroundColor
        }
      },

      buildEnterActiveClass (layoutItem) {
        if(layoutItem.layoutItemConfigData.animationVisible) {
          return 'animated ' + layoutItem.layoutItemConfigData.inAnimation + ' ' + layoutItem.layoutItemConfigData.animationDelay;
        }else {
          return ''
        }
      },
      buildLeaveActiveClass (layoutItem) {
        if(layoutItem.layoutItemConfigData.animationVisible) {
          return 'animated ' + layoutItem.layoutItemConfigData.outAnimation + ' ' + layoutItem.layoutItemConfigData.animationDelay;
        }else {
          return ''
        }
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
        handler: 'registerDrop'
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
    width: 100%;
    height: 100%;
  }

  .absolute-layout-item.activeBlack {
    box-shadow: 0 0 15px #000
  }
  .absolute-layout-item.activeWhite {
    box-shadow: 0 0 15px white
  }

  .ivu-cell i {
    font-size: 16px;
    margin-top: -2px;
  }
</style>
