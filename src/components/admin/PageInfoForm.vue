<!--页面信息表单-->

<template>
  <div class="page-info-form">
    <a-form :layout="'horizontal'" :form="form">
      <a-form-item
          label="名称"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input v-decorator="['name', {
          rules: [{
            required: true, message: '请输入名称'
          }]
        }]"/>
      </a-form-item>
      <a-form-item
          label="路径"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input v-decorator="['path', {
          rules: [{
            required: true, message: '请输入路径'
          }]
        }]"/>
      </a-form-item>
      <a-form-item
          label="标题"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-input v-decorator="['title', {
          rules: []
        }]"/>
      </a-form-item>
      <a-form-item
          label="预设布局"
          :label-col="{ span: labelCol }"
          :wrapper-col="{ span: wrapperCol }">
        <a-row :gutter="8">
          <a-col :span="12">
            <a-input v-decorator="['component', {
              rules: []
            }]"/>
          </a-col>
          <a-col :span="12">
            <a-button>选择</a-button>
          </a-col>
        </a-row>

      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  export default {
    name: 'PageInfoForm',
    data() {
      return {
        labelCol: 4,
        wrapperCol: 20
      }
    },
    beforeCreate () {
      this.form = this.$form.createForm(this);
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
