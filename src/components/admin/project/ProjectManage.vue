<!--工程管理主界面-->

<template>
  <div class="project-manage">

    <Button type="primary" @click="createProjectDrawerVisible = !createProjectDrawerVisible">新建工程</Button>
    <Divider />
    <Table ref="table" :columns="columns" :data="data"></Table>

    <Drawer
        title="新建工程"
        v-model="createProjectDrawerVisible"
        width="450"
        :mask-closable="false">
      <ProjectForm ref="projectForm"></ProjectForm>
      <DrawerFooter>
        <Button style="margin-right: 8px" @click="createProjectDrawerVisible = false">关闭</Button>
        <Button type="primary" @click="submitForm">提交</Button>
      </DrawerFooter>
    </Drawer>

  </div>
</template>

<script>
  import ProjectTableExpand from './ProjectTableExpand'

  export default {
    name: 'ProjectManage',
    data() {
      return {

        createProjectDrawerVisible: false,

        columns: [
          /*{
            type: 'selection',
            width: 60,
            align: 'center'
          },*/
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              return h(ProjectTableExpand, {
                props: {
                  projectId: params.row.id
                }
              })
            }
          },
          {
            title: '工程名称',
            key: 'name'
          },
          {
            title: '备注',
            key: 'remark'
          },
          {
            title: '图表主题',
            key: 'echartThemeName'
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
                    type: 'primary',
                    size: 'small',
                    icon: 'md-build'
                  },
                  'class': {
                    'm-r-5px': true
                  },
                  on: {
                    click: () => {
                      this.openProject(params.row)
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
                      this.deleteProject(params.row.id)
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
      this.loadProjects()
    },
    methods: {

      loadProjects () {
        this.$PnApi.ProjectApi.getAllProject().then(result => {
          this.data = result.data.data;
        })
      },

      submitForm () {
        this.$refs.projectForm.$refs.form.validate((valid) => {
          if (valid) {
            this.$PnApi.ProjectApi.saveProject(this.$refs.projectForm.formData).then(result => {
              if (result.data.code == 1) {
                this.createProjectDrawerVisible = !this.createProjectDrawerVisible;
                this.$refs.projectForm.$refs.form.resetFields();
                this.loadProjects()
              }else {
                this.$Message.error(result.data.msg)
              }
            })
          }
        });
      },

      deleteProject (projectId) {
        this.$PnApi.ProjectApi.deleteProject(projectId).then(result => {
          if(result.data.code != 1) {
            this.$Message.error(result.data.msg)
          }
          this.loadProjects()
        });
      },


      openProject (project) {
        this.$PnUtil.openPageToBlank('/designer', {project_id: project.id});
        /*let routeUrl = this.$router.resolve({
          path: '/designer',
          query: {project_id: project.id}
        });
        window.open(routeUrl.href, '_blank');*/
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
