<template>
  <div class="">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="主题名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入主题名称"/>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
      <FormItem label="主题JSON">
        <CodeEditor v-model="formData.jsonText" mode="Json"></CodeEditor>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'EchartThemeForm',
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
          name: '',
          remark: '',
          jsonText: '',
          create_date: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '主题名称不能为空', trigger: 'blur' }
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
