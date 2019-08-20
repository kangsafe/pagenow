<template>
  <div class="">
    <Form :label-width="100">
      <FormItem label="接口地址">
        <Input size="small" v-model="apiPath"/>
      </FormItem>
      <FormItem label="联动URL参数">
        <i-switch v-model="useUrlParam">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="操作">
        <Button size="small" type="primary" @click="visible = !visible">源数据编辑</Button>
      </FormItem>
    </Form>


    <Modal
        v-model="visible"
        draggable
        scrollable
        title="图表源数据编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <vue-json-editor v-model="chartOption" :show-btns="false" ></vue-json-editor>
      <div slot="footer">
        <Button type="default" @click="visible = false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'TestBarChart2Form',
    components: {
      vueJsonEditor
    },
    data() {
      return {
        visible: false
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        apiPath: 'component.compConfigData.apiPath',
        useUrlParam: 'component.compConfigData.useUrlParam',
        chartOption: 'component.compConfigData.chartOption'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
  .jsoneditor-vue {
    height: 400px;
  }
</style>
