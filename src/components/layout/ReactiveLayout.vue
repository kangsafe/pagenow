<template>
  <div class="reactive-layout"
       :style="{
        backgroundColor: layout.layoutConfigData.backgroundColor,
        width: layout.layoutConfigData.width,
        height: layout.layoutConfigData.height,
        padding: layout.layoutConfigData.padding
       }">
    <Row :style="{marginBottom: '10px'}" :gutter="row.gutter" v-for="row in layout.layoutConfigData.rows" :key="row.id">
      <i-col
          v-for="layoutItem in sortLayoutItemBySort(layoutItemsByRowId(row.id), 'sort')"
          :key="layoutItem.id"
          :span="24/layoutItemsByRowId(row.id).length">
        <div class="reactive-layout-item"
             :data-id="layoutItem.id"
             :style="{
              height: layoutItem.layoutItemConfigData.height,
              backgroundColor: layoutItem.layoutItemConfigData.backgroundColor
             }">
          <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'release/getField',
    mutationType: 'release/updateField',
  });

  export default {
    name: 'ReactiveLayout',
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
        this.$store.commit('release/setPageMetadata', previewPageMetadata)
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
      layoutItemsByRowId (rowId) {
        let arr = [];
        this.layout.layoutItems.forEach(item=>{
          if(item.layoutItemConfigData.rowId === rowId) {
            arr.push(item)
          }
        });
        return arr
      },

      sortLayoutItemBySort (array, key) {
        return array.sort(function(a,b) {
          let x = a.layoutItemConfigData[key];
          let y = b.layoutItemConfigData[key];
          return ((x<y)?-1:((x>y)?1:0));
        });
      }
    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
