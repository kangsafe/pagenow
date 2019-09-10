<template>
  <div class="echart-theme-manage">
    <Button type="primary" @click="addEchartTheme">新建主题</Button>
    <Divider />
    <Table ref="table" :columns="columns" :data="data"></Table>


    <Drawer
        title="主题编辑"
        v-model="echartThemeFormDrawerVisible"
        width="650"
        :mask-closable="false">
      <EchartThemeForm ref="echartThemeForm"></EchartThemeForm>
      <DrawerFooter>
        <Button style="margin-right: 8px" @click="echartThemeFormDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>
  </div>
</template>

<script>
  export default {
    name: 'EchartThemeManage',
    data() {
      return {
        echartThemeFormDrawerVisible: false,
        columns: [
          {
            title: '主题名称',
            key: 'name'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '创建时间',
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
                      this.editEchartTheme(params.row)
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
                      this.deleteEchartTheme(params.row.id)
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
        data: [

        ]
      }
    },
    mounted() {
      this.loadEchartThemes()
    },
    methods: {

      loadEchartThemes () {
        this.$PnApi.EchartThemeApi.getAllEchartTheme().then(result=>{
          this.data = result.data.data;
        })
      },

      submitForm () {
        this.$refs.echartThemeForm.$refs.form.validate((valid) => {
          if (valid) {
            let formData = Object.assign({}, this.$refs.echartThemeForm.formData);
            if(formData.id) {
              this.$PnApi.EchartThemeApi.updateEchartTheme(this.$refs.echartThemeForm.formData).then(result => {
                if (result.data.code == 1) {
                  this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
                  this.$refs.echartThemeForm.$refs.form.resetFields();
                  this.loadEchartThemes()
                }else {
                  this.$Message.error(result.data.msg)
                }
              })
            }else {
              this.$PnApi.EchartThemeApi.saveEchartTheme(this.$refs.echartThemeForm.formData).then(result => {
                if (result.data.code == 1) {
                  this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
                  this.$refs.echartThemeForm.$refs.form.resetFields();
                  this.loadEchartThemes()
                }else {
                  this.$Message.error(result.data.msg)
                }
              })
            }
          }
        });
      },

      addEchartTheme () {
        this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
        this.$refs.echartThemeForm.formData = {
          id: '',
          name: '',
          remark: '',
          jsonText: '',
          create_date: ''
        }
      },

      editEchartTheme (echartTheme) {
        this.echartThemeFormDrawerVisible = !this.echartThemeFormDrawerVisible;
        this.$refs.echartThemeForm.formData = this.$PnUtil.deleteTableRowUselessField(echartTheme)
      },

      deleteEchartTheme (echartThemeId) {
        this.$PnApi.EchartThemeApi.deleteEchartTheme(echartThemeId).then(result => {
          if(result.data.code != 1) {
            this.$Message.error(result.data.msg)
          }
          this.loadEchartThemes();
        });

      }

    },
    computed: {}
  }
</script>

<style scoped>

</style>
