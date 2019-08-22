<template>
  <div class="">
    <Form :label-width="80">
      <FormItem label="操作">
        <Upload :action="uploadAction"
                name="files" :on-success="imageUploadSuccessHandle" :show-upload-list="true">
          <Button size="small" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="图片相对路径">
        <Input size="small" v-model="relativePath"/>
      </FormItem>
      <FormItem label="图片宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="图片高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="自定义样式">
        <i-switch v-model="useCustomStyle">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="操作">
        <Button size="small" type="primary" @click="customStyleCodeModalVisible = !customStyleCodeModalVisible">样式代码</Button>
      </FormItem>
    </Form>

    <Modal
        v-model="customStyleCodeModalVisible"
        draggable
        scrollable
        title="样式代码编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <vue-json-editor v-model="customStyleCode" :show-btns="false" :mode="'code'"></vue-json-editor>
      <div slot="footer">
        <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
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
    name: 'ImageCompForm',
    components: {
      vueJsonEditor
    },
    data() {
      return {
        customStyleCodeModalVisible: false,
        uploadAction: process.env.VUE_APP_BASEPATH + '/file/upload'
      }
    },
    mounted() {

    },
    methods: {
      imageUploadSuccessHandle (res) {

        if(res.code == 1) {
          this.relativePath = res.data.relativePath
        }
      }
    },
    computed: {
      ...mapFields({
        relativePath: 'component.compConfigData.relativePath',
        width: 'component.compConfigData.width',
        height: 'component.compConfigData.height',
        useCustomStyle: 'component.compConfigData.useCustomStyle',
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
