<!--组件库管理主界面-->

<template>
  <div class="compinfo-manage">
    <Button type="primary" @click="createCompinfoTypeDrawerVisible = !createCompinfoTypeDrawerVisible">创建类型</Button>&nbsp;

    <Divider />
    <Table :columns="columns" :data="tableData"></Table>

    <Drawer
        title="创建类型"
        v-model="createCompinfoTypeDrawerVisible"
        width="450"
        :mask-closable="false">
      <CompinfoTypeForm ref="compinfoTypeForm"></CompinfoTypeForm>
      <DrawerFooter>
        <Button class="m-r-5px" @click="createCompinfoTypeDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  import CompinfoTypeTableExpand from './CompinfoTypeTableExpand'

  export default {
    name: 'CompinfoManage',
    data() {
      return {
        createCompinfoTypeDrawerVisible: false,
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(CompinfoTypeTableExpand, {
                props: {
                  compinfoTypeId: params.row.id
                }
              })
            }
          },
          {
            title: '组件类型',
            key: 'name'
          },
          {
            title: '描述',
            key: 'remark'
          },
          {
            title: '创建日期',
            key: 'create_date'
          }
        ],
        tableData: []
      }
    },
    mounted() {
      this.loadCompinfoTypes()
    },
    methods: {
      loadCompinfoTypes () {
        this.$PnApi.CompinfoApi.getAllCompinfoType().then(result=>{
          this.tableData = result.data.data;
        })
      },

      submitForm () {
        this.$refs.compinfoTypeForm.$refs.form.validate((valid) => {
          if (valid) {
            this.$PnApi.CompinfoApi.saveCompinfoType(this.$refs.compinfoTypeForm.formData).then(result => {
              if (result.data.code == 1) {
                this.createCompinfoTypeDrawerVisible = !this.createCompinfoTypeDrawerVisible;
                this.$refs.compinfoTypeForm.$refs.form.resetFields();
                this.loadCompinfoTypes()
              }else {
                this.$Message.error(result.data.msg)
              }
            })
          }
        });
      }

    },
    computed: {}
  }
</script>

<style scoped>
  >>> td.ivu-table-expanded-cell {
    padding: 10px 20px 10px 20px;
  }
</style>
