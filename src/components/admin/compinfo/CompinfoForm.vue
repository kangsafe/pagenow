<template>
  <div class="">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="组件名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入组件名称"/>
      </FormItem>
      <FormItem label="组件别名" prop="aliasName">
        <Input v-model="formData.aliasName" placeholder="请输入组件别名"/>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'CompinfoForm',
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
          aliasName: '',
          remark: '',
          create_date: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '组件名称不能为空', trigger: 'blur' }
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
