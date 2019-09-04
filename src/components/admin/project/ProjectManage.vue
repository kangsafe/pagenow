<!--工程管理主界面-->

<template>
  <div class="project-manage">

    <Button type="primary" @click="createProjectDrawerVisible = !createProjectDrawerVisible">新建工程</Button>&nbsp;
    <Button type="error" @click="deleteProjects">删除</Button>
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
  export default {
    name: 'ProjectManage',
    data() {
      return {

        createProjectDrawerVisible: false,

        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
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
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.openProject(params.row)
                    }
                  }
                }, '编辑')
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

      deleteProjects () {
        if(this.$refs.table.getSelection().length > 0) {
          this.$Modal.confirm({
            title: '提醒',
            content: '确认删除选中项吗？',
            onOk: () => {
              let arr = this.$refs.table.getSelection();
              arr.forEach((item)=>{
                this.$PnApi.ProjectApi.deleteProject(item.id).then(result => {
                  if(result.data.code != 1) {
                    this.$Message.error(result.data.msg)
                  }
                });
              });
              setTimeout(()=>{
                this.loadProjects()
              },100)
            }
          });
        }else {
          this.$Message.error('请勾选需要操作的数据')
        }
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

</style>
