<template>
  <div class="layout-item-config-form">
    <a-form :layout="'horizontal'">
      <a-form-item
          label="X"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input-number :min="0" :max="12" v-model="formData.x"/>
      </a-form-item>
      <a-form-item
          label="Y"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input-number :min="0" :max="12" v-model="formData.y"/>
      </a-form-item>
      <a-form-item
          label="W"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input-number :min="0" :max="12" v-model="formData.w"/>
      </a-form-item>
      <a-form-item
          label="H"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input-number :min="0" :max="12" v-model="formData.h"/>
      </a-form-item>
      <a-form-item
          label="I"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input v-model="formData.i"/>
      </a-form-item>
      <a-form-item
          label="I"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input v-model="formData.component"/>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import {
    Form,
    Input,
    InputNumber
  } from 'ant-design-vue'

  export default {
    name: 'LayoutItemConfigForm',
    components: {
      AForm: Form,
      AFormItem: Form.Item,
      AInput: Input,
      AInputNumber: InputNumber
    },
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        labelCol: 3,
        wrapperCol: 20,
        formData: {
          x: '',
          y: '',
          w: '',
          h: '',
          i: '',
          component: ''
        }
      }
    },
    mounted() {
      if(this.data) {
        this.formData = this.data;
      }
    },
    methods: {

    },
    computed: {}
  }
</script>

<style scoped>

</style>
