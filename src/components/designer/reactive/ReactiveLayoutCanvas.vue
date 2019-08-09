<!--响应式布局画布(暂时还没实现)-->

<template>
  <div id="ReactiveLayout" class="reactive-layout-canvas"
       :style="{
        backgroundColor: layout.layoutConfigData.backgroundColor,
        width: layout.layoutConfigData.width,
        height: layout.layoutConfigData.height,
        padding: layout.layoutConfigData.padding
       }">
    {{layout}}
    <Row :style="{marginBottom: '10px'}" :gutter="row.gutter" v-for="row in layout.layoutConfigData.rows" :key="row.id">
      <i-col
          v-for="layoutItem in layoutItemsByRowId(row.id)"
          :key="layoutItem.id"
          :span="24/layoutItemsByRowId(row.id).length">
        <div class="reactive-layout-item"
             :data-id="layoutItem.id"
             :style="{
              height: layoutItem.layoutItemConfigData.height,
              backgroundColor: layoutItem.layoutItemConfigData.backgroundColor
             }"
             @click.stop="layoutItemClick(layoutItem)">
          <FuncCompContainer :location="layoutItem.id">
            <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
          </FuncCompContainer>
        </div>
      </i-col>
    </Row>
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
    name: 'ReactiveLayoutCanvas',
    data() {
      return {

      }
    },
    mounted() {
      this.registerDragAndResizable()
    },
    methods: {
      registerDragAndResizable () {
        let _this = this;

        setTimeout(() => {
          // 注册布局块放置监听
          $(".reactive-layout-item").droppable({
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

              this.$store.commit('designer/addComponentToLayoutItem', {
                layoutItemId: layoutItemId,
                component: component
              })
            }
          });
        }, 100)
      },

      layoutItemClick(layoutItem) {
        // 点击布局块的时候，给布局块设置droppable的属性scope为layoutItemScope，
        // 与组件库拖拽对象的scope对应，这样组件库的拖拽对象就可以放置在当前点击的布局块里。
        // 同时给当前布局块设置激活样式active
        $(".reactive-layout-item").droppable('option', 'scope', '').removeClass('active');
        for (let i=0; i<event.path.length; i++) {
          let s = $(event.path[i])[0].className + '';
          if (s.indexOf('reactive-layout-item') != -1) {
            $(event.path[i]).droppable('option', 'scope', 'layoutItemScope');
            $(event.path[i]).addClass('active')
          }
        }

        this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', 'ReactiveLayoutItemForm');
        this.$store.commit('designer/setCurrentSelectLayoutItemId', layoutItem.id)
      },

      layoutItemsByRowId (rowId) {
        let arr = [];
        this.layout.layoutItems.forEach(item=>{
          if(item.layoutItemConfigData.rowId === rowId) {
            arr.push(item)
          }
        });
        return arr
      }
    },
    computed: {
      ...mapFields({
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
  .reactive-layout-item {

  }
  .reactive-layout-item.active {
    box-shadow: 0 0 10px #000
  }
</style>
