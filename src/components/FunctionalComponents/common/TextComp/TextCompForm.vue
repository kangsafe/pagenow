<template>
  <div class="">
    <Form :label-width="105">

      <FormItem label="ID">
        <Input size="small" v-model="id" disabled/>
      </FormItem>
      <FormItem label="悬浮文本">
        <Input size="small" v-model="title"/>
      </FormItem>
      <FormItem label="文本容器宽度">
        <Input size="small" v-model="width" placeholder="示例：66px、100%..."/>
      </FormItem>
      <FormItem label="文本容器高度">
        <Input size="small" v-model="height" placeholder="示例：66px、100%..."/>
      </FormItem>
      <FormItem label="文本容器背景色">
        <ColorPicker size="small" v-model="backgroundColor" alpha/>
      </FormItem>

      <FormItem label="字体大小">
        <Input size="small" v-model="fontSize"/>
      </FormItem>
      <FormItem label="字体颜色">
        <ColorPicker size="small" v-model="color" alpha/>
      </FormItem>
      <FormItem label="行高">
        <Input size="small" v-model="lineHeight" placeholder="示例：66px"/>
      </FormItem>

      <FormItem label="事件定义">
        <Button size="small" type="primary" @click="customClickJsCodeModalVisible = !customClickJsCodeModalVisible">单击事件编辑</Button>
      </FormItem>

      <FormItem label="操作">
        <Button size="small" type="primary" @click="textEditorModalVisible = !textEditorModalVisible" style="margin-right: 5px;">文本编辑</Button>
        <Button size="small" type="primary" @click="customStyleCodeModalVisible = !customStyleCodeModalVisible">自定义样式</Button>

      </FormItem>
    </Form>

    <Modal
        v-model="customClickJsCodeModalVisible"
        draggable
        scrollable
        title="单击事件代码编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <CodeEditor v-model="customClickJsCode"></CodeEditor>
      <div slot="footer">
        <Button type="default" @click="customClickJsCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>

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
      <Alert type="info">提示：富文本编辑器内设置的样式优先级高于组件预设样式</Alert>
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
        customClickJsCodeModalVisible: false,
        customStyleCodeModalVisible: false,
        textEditorModalVisible: false,
        uEditorConfig: {
          // 初始容器高度
          initialFrameHeight: 240,
          // 初始容器宽度
          initialFrameWidth: '100%',
          UEDITOR_HOME_URL: '/pagenow/static/UEditor/'
        }
      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {
      ...mapFields({
        id: 'component.id',
        text: 'component.compConfigData.text',
        title: 'component.compConfigData.title',

        width: 'component.compConfigData.width',
        height: 'component.compConfigData.height',
        backgroundColor: 'component.compConfigData.backgroundColor',


        fontSize: 'component.compConfigData.fontSize',
        color: 'component.compConfigData.color',
        lineHeight: 'component.compConfigData.lineHeight',
        customStyleCode: 'component.compConfigData.customStyleCode',

        customClickJsCode: 'component.compConfigData.customClickJsCode'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
