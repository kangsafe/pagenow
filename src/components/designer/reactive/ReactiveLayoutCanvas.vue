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
             :style="{
              height: layoutItem.layoutItemConfigData.height,
              backgroundColor: layoutItem.layoutItemConfigData.backgroundColor
             }"
             @click="layoutItemClick(layoutItem)">
          <FuncCompContainer :location="layoutItem.id">
            <component :is="layoutItem.component.name" :location="layoutItem.id"></component>
          </FuncCompContainer>
        </div>
      </i-col>
    </Row>
  </div>
</template>

<script>
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

    },
    methods: {
      layoutItemClick(layoutItem) {
        this.$store.commit('designer/setRightSidebarComponentName', 'ReactiveLayoutItemForm');
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
    }
  }
</script>

<style scoped>
  .reactive-layout-item {

  }
</style>
