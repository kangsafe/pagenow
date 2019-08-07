<template>
  <div class="page-form">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="页面名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入页面名称"/>
      </FormItem>
      <FormItem label="路径" prop="path">
        <Input v-model="formData.path" placeholder="请输入路径"/>
      </FormItem>
      <FormItem label="标题">
        <Input v-model="formData.title" placeholder=""/>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
      <FormItem label="关联组件">
        <Input v-model="formData.component" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'PageForm',
    props: {
      labelWidth: {
        type: Number,
        default: 80
      }
    },
    data() {
      return {
        formData: {
          id: '',
          project_id: '',
          name: '',
          path: '',
          title: '',
          component: '',
          remark: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '页面名称不能为空', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '路径不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
