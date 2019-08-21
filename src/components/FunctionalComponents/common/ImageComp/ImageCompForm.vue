<template>
  <div class="">
    <Form :label-width="80">
      <FormItem label="操作">
        <Upload action="http://localhost:8090/file/upload" name="files" :max-size="1024*5">
          <Button size="small" icon="ios-cloud-upload-outline">上传图片</Button>
        </Upload>
      </FormItem>
      <FormItem label="图片路径">
        <Input size="small" v-model="imageSrc"/>
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
      <FormItem label="样式代码">
        <Input v-model="customStyleCode" type="textarea" :rows="4" placeholder="" />
      </FormItem>
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
    name: 'ImageCompForm',
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        imageSrc: 'component.compConfigData.imageSrc',
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
