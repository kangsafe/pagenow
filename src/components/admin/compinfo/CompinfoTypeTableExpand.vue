<template>
  <div class="">
    <Button size="small" type="primary" @click="addCompinfo">新建组件</Button>
    <Divider/>
    <Table :columns="columns" :data="tableData"></Table>

    <Drawer
        title="新建组件"
        v-model="createCompinfoDrawerVisible"
        width="450"
        :mask-closable="false">
      <CompinfoForm ref="compinfoForm"></CompinfoForm>
      <DrawerFooter>
        <Button class="m-r-5px" @click="createCompinfoDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  export default {
    name: 'CompinfoTypeTableExpand',
    props: {
      compinfoTypeId: {
        type: String,
        require: true
      }
    },
    data() {
      return {
        createCompinfoDrawerVisible: false,
        columns: [
          {
            title: '组件名',
            key: 'name'
          },
          {
            title: '别名',
            key: 'aliasName'
          },
          {
            title: '描述',
            key: 'remark'
          },
          {
            title: '创建日期',
            key: 'create_date'
          },
          {
            title: '操作',
            key: 'action',
            width: 150,
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    size: 'small',
                    type: 'primary',
                    icon: 'md-create'
                  },
                  'class': {
                    'm-r-5px': true
                  },
                  on: {
                    click: () => {
                      this.editCompinfo(params.row)
                    }
                  }
                }),
                h('Poptip', {
                  props: {
                    confirm: true,
                    transfer: true,
                    title: '您确定要删除此项吗？'
                  },
                  style: {

                  },
                  on: {
                    'on-ok': () => {
                      this.deleteCompinfo(params.row.id)
                    }
                  }
                }, [
                  h('Button', {
                    props: {
                      size: 'small',
                      type: 'error',
                      icon: 'md-trash'
                    }
                  },)
                ])
              ]);
            }
          }
        ],
        tableData: []
      }
    },
    mounted() {
      this.loadCompinfos();
    },
    methods: {

      loadCompinfos () {
        this.$PnApi.CompinfoApi.getAllCompinfoByTypeId(this.compinfoTypeId).then(result=>{
          this.tableData = result.data.data;
        })
      },

      submitForm () {
        this.$refs.compinfoForm.$refs.form.validate((valid) => {
          if (valid) {
            let formData = Object.assign({}, this.$refs.compinfoForm.formData);
            formData.type_id = this.compinfoTypeId;
            if(formData.id) {
              this.$PnApi.CompinfoApi.updateCompinfo(formData).then(result => {
                if (result.data.code == 1) {
                  this.createCompinfoDrawerVisible = !this.createCompinfoDrawerVisible;
                  this.$refs.compinfoForm.$refs.form.resetFields();
                  this.loadCompinfos();
                }else {
                  this.$Message.error(result.data.msg)
                }
              })
            }else {
              this.$PnApi.CompinfoApi.saveCompinfo(formData).then(result => {
                if (result.data.code == 1) {
                  this.createCompinfoDrawerVisible = !this.createCompinfoDrawerVisible;
                  this.$refs.compinfoForm.$refs.form.resetFields();
                  this.loadCompinfos();
                }else {
                  this.$Message.error(result.data.msg)
                }
              })
            }
          }
        });
      },

      addCompinfo () {
        this.createCompinfoDrawerVisible = !this.createCompinfoDrawerVisible;
        this.$refs.compinfoForm.$refs.form.resetFields();
      },

      editCompinfo (compinfo) {
        this.createCompinfoDrawerVisible = !this.createCompinfoDrawerVisible;
        this.$refs.compinfoForm.formData = this.$PnUtil.deleteTableRowUselessField(compinfo)
      },

      deleteCompinfo (compinfoId) {
        this.$PnApi.CompinfoApi.deleteCompinfo(compinfoId).then(result => {
          if(result.data.code != 1) {
            this.$Message.error(result.data.msg)
          }
          this.loadCompinfos();
        });

      }
    },
    computed: {}
  }
</script>

<style scoped>
  .ivu-divider-horizontal {
    margin: 10px 0px;
  }
</style>
