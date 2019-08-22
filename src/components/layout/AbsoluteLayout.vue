<!--发布版绝对布局-->

<template>
  <div class="absolute-layout"
       :style="styleObj">

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
         }">
      <component :is="layoutItem.component.name" :location="layoutItem.id"
                 v-show="layoutItem.layoutItemConfigData.compVisible"></component>
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
        styleObj: {},
        layout: {
          layoutConfigData: {

          },
          layoutItems: []
        }
      }
    },
    created() {
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
      this.buildStyleObj()
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
