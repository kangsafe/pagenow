<template>
  <div class="reactive-layout-config-data-form">
    <Form :label-width="105">
      <FormItem label="画布宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="画布高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="背景色">
        <ColorPicker size="small" v-model="backgroundColor" />
      </FormItem>
      <FormItem label="内边距">
        <Input size="small" v-model="padding"/>
      </FormItem>

      <FormItem label="操作">
        <Button size="small" type="primary" @click="rowColFormModalVisible = !rowColFormModalVisible">行列数据编辑</Button>
      </FormItem>
    </Form>

    <Modal
        v-model="rowColFormModalVisible"
        draggable
        scrollable
        title="行列数据编辑"
        width="650"
        :transfer="false">
      <ReactiveRowColForm></ReactiveRowColForm>
      <div slot="footer">
        <Button type="default" @click="rowColFormModalVisible = false">关闭</Button>
      </div>
    </Modal>
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
        rowColFormModalVisible: false
      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        height: 'pageMetadata.layout.layoutConfigData.height',
        backgroundColor: 'pageMetadata.layout.layoutConfigData.backgroundColor',
        padding: 'pageMetadata.layout.layoutConfigData.padding',
        rowMargin: 'pageMetadata.layout.layoutConfigData.rowMargin',
      }),

    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
