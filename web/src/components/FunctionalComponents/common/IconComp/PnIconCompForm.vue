<template>
  <div class="">
    <Alert type="info" :style="{padding: '5px 10px 5px 10px'}">
      <span style="font-size: 13px;">请至iView官网查询图标类型</span>
      <template slot="desc"><a href="https://www.iviewui.com/components/icon" target="_blank">https://www.iviewui.com/components/icon</a></template>
    </Alert>
    <Form :label-width="105">

      <FormItem label="图标类型">
        <Input size="small" v-model="iconType"/>
      </FormItem>
      <FormItem label="图标大小">
        <Input size="small" v-model="size" placeholder="单位：px"/>
      </FormItem>
      <FormItem label="图标颜色">
        <ColorPicker size="small" v-model="color" alpha/>
      </FormItem>
      <FormItem label="">
        <Button size="small" type="primary" @click="customStyleCodeModalVisible = !customStyleCodeModalVisible">图标容器自定义样式</Button>
      </FormItem>

      <Modal
          v-model="customStyleCodeModalVisible"
          draggable
          scrollable
          title="图标容器自定义样式"
          width="650"
          :mask="true"
          :z-index="3">
        <Alert type="info">图标组件的HTML结构为：div > Icon，此处配置的是包裹Icon组件的div容器的样式</Alert>
        <CodeEditor v-model="customStyleCode" mode="SCSS"></CodeEditor>
        <div slot="footer">
          <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
        </div>
      </Modal>

    </Form>
  </div>
</template>

<script>

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'PnIconCompForm',
    data() {
      return {
        customStyleCodeModalVisible: false
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        iconType: 'component.compConfigData.iconType',
        size: 'component.compConfigData.size',
        color: 'component.compConfigData.color',
        customStyleCode: 'component.compConfigData.customStyleCode',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
