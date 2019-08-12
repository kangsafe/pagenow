<!--发布版绝对布局-->

<template>
  <div class="absolute-layout"
       :style="{
        backgroundColor: layout.layoutConfigData.backgroundColor,
        width: layout.layoutConfigData.width,
        height: layout.layoutConfigData.height
       }">

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
