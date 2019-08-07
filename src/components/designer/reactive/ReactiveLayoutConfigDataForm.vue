<template>
  <div class="reactive-layout-config-data-form">
    <Form :label-width="80">
      <FormItem label="画布宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="画布高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="背景色">
        <ColorPicker size="small" v-model="backgroundColor" />
      </FormItem>
      <FormItem label="间隔">
        <InputNumber size="small" :max="100" :min="0" v-model="gutter" placeholder="单位：PX"></InputNumber>
      </FormItem>
      <FormItem label="内边距">
        <Input size="small" v-model="padding"/>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'ReactiveLayoutConfigDataForm',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        height: 'pageMetadata.layout.layoutConfigData.height',
        backgroundColor: 'pageMetadata.layout.layoutConfigData.backgroundColor',
        gutter: 'pageMetadata.layout.layoutConfigData.gutter',
        padding: 'pageMetadata.layout.layoutConfigData.padding',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
