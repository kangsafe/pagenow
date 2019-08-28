<template>
  <div class="">
    <Form :label-width="100">
      <FormItem label="调用接口">
        <i-switch v-model="useApiPath">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="接口地址">
        <i-input size="small" v-model="apiPath">
          <Button title="接口测试" slot="append" icon="md-browsers" @click="openInterfaceTestModal"></Button>
        </i-input>
      </FormItem>
      <FormItem label="联动URL参数">
        <i-switch v-model="useUrlParam">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="完全自定义">
        <i-switch v-model="onlyUseCustomJsCode">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
        <span v-show="onlyUseCustomJsCode" style="color: red; display: block; line-height: 15px;">打开此选项，将完全使用自定义代码替换原组件内部运行逻辑</span>
      </FormItem>
      <FormItem label="操作">
        <Button size="small" type="primary" @click="visible = !visible" style="margin-right: 5px;">源数据</Button>
        <Button size="small" type="primary" @click="customJsCodeModalVisible = !customJsCodeModalVisible">自定义代码</Button>
      </FormItem>
    </Form>

    <Modal
        v-model="interfaceTestModalVisible"
        draggable
        scrollable
        title="接口测试"
        width="650"
        :mask="true"
        :z-index="3">
      <Form :label-width="60" :style="{marginBottom: '10px'}">
        <FormItem label="接口地址">
          <Input v-model="apiPath"/>
        </FormItem>
      </Form>
      <JsonEditor v-model="interfaceResultData" :mode="'code'"></JsonEditor>
      <div slot="footer">
        <Button type="default" @click="interfaceTestModalVisible = false">关闭</Button>
      </div>
    </Modal>

    <Modal
        v-model="customJsCodeModalVisible"
        draggable
        scrollable
        title="自定义代码编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <CodeEditor v-model="customJsCode"></CodeEditor>
      <div slot="footer">
        <Button type="default" @click="customJsCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>

    <Modal
        v-model="visible"
        draggable
        scrollable
        title="图表源数据编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <JsonEditor v-model="chartOption"></JsonEditor>
      <div slot="footer">
        <Button type="default" @click="visible = false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'TestBarChartForm',
    data() {
      return {
        interfaceTestModalVisible: false,
        customJsCodeModalVisible: false,
        visible: false,

        interfaceResultData: null
      }
    },
    mounted() {

    },
    methods: {
      openInterfaceTestModal () {
        this.interfaceTestModalVisible = !this.interfaceTestModalVisible;
        this.loadInterfaceResultData();
      },
      loadInterfaceResultData () {
        this.$PnApi.getData(this.apiPath).then(result => {
          this.interfaceResultData = result.data.data;
        });
      }
    },
    computed: {
      ...mapFields({
        id: 'component.id',
        apiPath: 'component.compConfigData.apiPath',
        useApiPath: 'component.compConfigData.useApiPath',
        useUrlParam: 'component.compConfigData.useUrlParam',
        customJsCode: 'component.compConfigData.customJsCode',
        onlyUseCustomJsCode: 'component.compConfigData.onlyUseCustomJsCode',
        chartOption: 'component.compConfigData.chartOption'
      })
    },
    watch: {
      'apiPath': {
        handler: 'loadInterfaceResultData'
      }
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

  >>> .jsoneditor-vue {
    height: 450px;
  }

</style>
