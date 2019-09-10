<template>
  <div class="compinfo-type-form">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="类型名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入类型名称"/>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'CompinfoTypeForm',
    props: {
      labelWidth: {
        type: Number,
        default: 80
      }
    },
    data() {
      return {
        formData: {
          name: '',
          remark: ''
        },
        ruleValidate: {
          name: [
            { required: true, message: '类型名称不能为空', trigger: 'blur' }
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
