<!--响应式布局画布(暂时还没实现)-->

<template>
  <div id="ReactiveLayout" class="reactive-layout-canvas"
       :style="{
        backgroundColor: layout.layoutConfigData.backgroundColor,
        width: layout.layoutConfigData.width,
        height: layout.layoutConfigData.height,
        padding: layout.layoutConfigData.padding
       }">
    {{layout.layoutItems}}
    <Row :gutter="layout.layoutConfigData.gutter">
      <i-col v-for="layoutItem in layout.layoutItems" :key="layoutItem.id" :span="24/layout.layoutItems.length">
        <div class="absolute-layout-item"
             :style="{
              height: layoutItem.layoutItemConfigData.height,
              backgroundColor: layoutItem.layoutItemConfigData.backgroundColor
             }"
             @click.stop="layoutItemClick(layoutItem)">
          <FuncCompContainer>
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
      const colCounts = {};
      const arr = [1, 2, 3, 4, 6, 8, 12];
      arr.forEach((value) => { colCounts[value] = value; });
      return {
        colCounts
      }
    },
    mounted() {

    },
    methods: {
      layoutItemClick(layoutItem) {
        this.$store.commit('designer/setRightSidebarComponentName', 'ReactiveLayoutItemForm');
        this.$store.commit('designer/setCurrentSelectLayoutItemId', layoutItem.id)
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
  .absolute-layout-item {

  }
</style>
