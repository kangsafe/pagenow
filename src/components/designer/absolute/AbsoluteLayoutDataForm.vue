<template>
  <div class="absolute-layout-data-form">
    <a-form layout="inline">
      <a-form-item label="编辑区宽度">
        <a-input size="small" :style="{width: '70px'}" v-model="width"/>
      </a-form-item>
      <a-form-item label="编辑区高度">
        <a-input size="small" :style="{width: '70px'}" v-model="height"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapFields } from 'vuex-map-fields';

  export default {
    name: 'AbsoluteLayoutDataForm',
    data() {
      return {

      }
    },
    created () {

    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        height: 'pageMetadata.layout.layoutConfigData.height'
      })
    }
  }
</script>

<style scoped>

</style>
