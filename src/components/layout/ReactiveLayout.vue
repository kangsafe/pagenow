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
