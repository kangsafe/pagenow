<!--发布版绝对布局-->

<template>
  <div class="absolute-layout"
       :style="Object.assign({
         width: layout.layoutConfigData.width,
         height: layout.layoutConfigData.height,
         backgroundColor: layout.layoutConfigData.backgroundColor
       }, layout.layoutConfigData.customStyleCode)">

    <div class="absolute-layout-item"
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
           borderTopLeftRadius: layoutItem.layoutItemConfigData.borderTopLeftRadius,
           borderTopRightRadius: layoutItem.layoutItemConfigData.borderTopRightRadius,
           borderBottomLeftRadius: layoutItem.layoutItemConfigData.borderBottomLeftRadius,
           borderBottomRightRadius: layoutItem.layoutItemConfigData.borderBottomRightRadius,
           backgroundColor: layoutItem.layoutItemConfigData.backgroundColor,
           zIndex: layoutItem.layoutItemConfigData.zIndex,
           display: layoutItem.layoutItemConfigData.display,
           padding: layoutItem.layoutItemConfigData.padding
         }, layoutItem.layoutItemConfigData.customStyleCode)"
         @mouseenter="layoutItemMouseenterHandle(layoutItem, $event)"
         @mouseleave="layoutItemMouseleaveHandle(layoutItem, $event)">
      <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
    </div>

  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'release/getField',
    mutationType: 'release/updateField',
  });

  export default {
    name: 'AbsoluteLayout',
    data() {
      return {
        layout: {
          layoutConfigData: {

          },
          layoutItems: []
        }
      }
    },
    created() {
      // 检查当前URL中是否有预览标识，如果有，则总浏览器本地存储中读取页面源数据信息进行预览
      if(this.$route.query.preview) {
        let dbPage = JSON.parse(localStorage.getItem('previewPageMetadata'));
        this.layout = dbPage.layout;
        this.$store.commit('release/setPageMetadata', dbPage)
      }else {
        this.$PnApi.PageApi.getPageById(this.$route.meta.id).then(result => {
          let dbPage = result.data.data;
          dbPage.layout = JSON.parse(dbPage.layout);
          this.layout = dbPage.layout;
          this.$store.commit('release/setPageMetadata', dbPage)
        });
      }
    },
    mounted() {

    },
    methods: {
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
      }
    },
    computed: {}
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
