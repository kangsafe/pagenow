<!--发布版绝对布局-->

<template>
  <div class="absolute-layout"
       :style="Object.assign({
         width: layout.layoutConfigData.width + layout.layoutConfigData.widthPixelUnit,
         height: layout.layoutConfigData.height + layout.layoutConfigData.heightPixelUnit,
         backgroundColor: layout.layoutConfigData.backgroundColor
       }, $PnUtil.cssToVueStyleObj(layout.layoutConfigData.customStyleCode))">

    <transition
        appear
        :enter-active-class="buildEnterActiveClass(layoutItem)"
        :leave-active-class="buildLeaveActiveClass(layoutItem)"
        v-for="layoutItem in layout.layoutItems"
        :key="layoutItem.id">
    <div class="absolute-layout-item"
         :data-id="layoutItem.id"
         :style="Object.assign({
           width: layoutItem.layoutItemConfigData.width + 'px',
           height: layoutItem.layoutItemConfigData.height + 'px',
           left: layoutItem.layoutItemConfigData.left + 'px',
           top: layoutItem.layoutItemConfigData.top + 'px',
           borderWidth: layoutItem.layoutItemConfigData.borderWidth + 'px',
           borderStyle: layoutItem.layoutItemConfigData.borderStyle,
           borderColor: layoutItem.layoutItemConfigData.borderColor,
           borderTopLeftRadius: layoutItem.layoutItemConfigData.borderTopLeftRadius + 'px',
           borderTopRightRadius: layoutItem.layoutItemConfigData.borderTopRightRadius + 'px',
           borderBottomLeftRadius: layoutItem.layoutItemConfigData.borderBottomLeftRadius + 'px',
           borderBottomRightRadius: layoutItem.layoutItemConfigData.borderBottomRightRadius + 'px',
           backgroundColor: layoutItem.layoutItemConfigData.backgroundColor,
           zIndex: layoutItem.layoutItemConfigData.zIndex,
           padding: layoutItem.layoutItemConfigData.padding + 'px',
           cursor: layoutItem.layoutItemConfigData.cursor,
           display: layoutItem.layoutItemConfigData.display
         }, $PnUtil.cssToVueStyleObj(layoutItem.layoutItemConfigData.customStyleCode))"
         @mouseenter="layoutItemMouseenterHandle(layoutItem, $event)"
         @mouseleave="layoutItemMouseleaveHandle(layoutItem, $event)">
      <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
    </div>
    </transition>

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
        let previewProjectInfo = JSON.parse(localStorage.getItem('previewProjectInfo'));
        let previewPageMetadata = JSON.parse(localStorage.getItem('previewPageMetadata'));
        this.layout = previewPageMetadata.layout;
        this.$store.commit('release/setProjectInfo', previewProjectInfo);
        this.$store.commit('release/setPageMetadata', previewPageMetadata);

      }else {
        this.$PnApi.ReleaseApi.getReleaseData(this.$route.meta.id).then(result => {
          let releaseData = result.data.data;
          let dbPage = releaseData.pageMetadata;
          dbPage.layout = JSON.parse(dbPage.layout);
          this.layout = dbPage.layout;
          this.$store.commit('release/setPageMetadata', dbPage);

          this.$store.commit('release/setProjectInfo', releaseData.projectInfo);
        })
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
