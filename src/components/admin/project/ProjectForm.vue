<template>
  <div class="project-form">
    <Form ref="form" :label-width="labelWidth" :model="formData" :rules="ruleValidate">
      <FormItem label="工程名称" prop="name">
        <Input v-model="formData.name" placeholder="请输入工程名称"/>
      </FormItem>
      <FormItem label="备注">
        <Input v-model="formData.remark" />
      </FormItem>
    </Form>
  </div>
</template>

<script>
  export default {
    name: 'ProjectForm',
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
            { required: true, message: '工程名称不能为空', trigger: 'blur' }
          ]
        }
      }
    },
    mounted() {},
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
