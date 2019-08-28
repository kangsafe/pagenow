<template>
  <div class="">
    <Form :label-width="80">

      <!--<FormItem label="文本">
        <Input size="small" v-model="text"/>
      </FormItem>-->
      <FormItem label="字体大小">
        <Input size="small" v-model="fontSize"/>
      </FormItem>
      <FormItem label="字体颜色">
        <ColorPicker size="small" v-model="color" alpha/>
      </FormItem>
      <FormItem label="行高">
        <Input size="small" v-model="lineHeight"/>
      </FormItem>
      <FormItem label="操作">
        <Button size="small" type="primary" @click="customStyleCodeModalVisible = !customStyleCodeModalVisible" style="margin-right: 5px;">自定义样式</Button>
        <Button size="small" type="primary" @click="textEditorModalVisible = !textEditorModalVisible">文本编辑</Button>
      </FormItem>
    </Form>

    <Modal
        v-model="customStyleCodeModalVisible"
        draggable
        scrollable
        title="自定义样式编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <Alert type="info">提示：自定义样式会与预设样式进行浅合并，如果存在相同属性配置，自定义样式会覆盖预设样式</Alert>
      <PnJsonEditor v-model="customStyleCode" :mode="'code'"></PnJsonEditor>
      <div slot="footer">
        <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>

    <Modal
        v-model="textEditorModalVisible"
        draggable
        scrollable
        title="文本编辑"
        width="850"
        :mask="true"
        :z-index="3">
      <vue-ueditor-wrap v-model="text" :config="uEditorConfig"></vue-ueditor-wrap>
      <div slot="footer">
        <Button type="default" @click="textEditorModalVisible = false">关闭</Button>
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
    name: 'TextCompForm',
    data() {
      return {
        customStyleCodeModalVisible: false,
        textEditorModalVisible: false,
        uEditorConfig: {
          // 初始容器高度
          initialFrameHeight: 240,
          // 初始容器宽度
          initialFrameWidth: '100%'
        }
      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapFields({
        text: 'component.compConfigData.text',
        fontSize: 'component.compConfigData.fontSize',
        color: 'component.compConfigData.color',
        lineHeight: 'component.compConfigData.lineHeight',
        customStyleCode: 'component.compConfigData.customStyleCode'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
