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
        <Button type="primary" @click="submitProjectForm">提交</Button>
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
        this.data = [];
        this.$PnApi.ProjectApi.getAllProject().then(result => {
          this.data = result.data.data;
        })
      },

      submitProjectForm () {
        this.$refs.projectForm.$refs.form.validate((valid) => {
          if (valid) {
            this.$PnApi.ProjectApi.saveProject(this.$refs.projectForm.formData).then(result => {
              if (result.data.code == 1) {
                this.createProjectDrawerVisible = !this.createProjectDrawerVisible;
                this.$refs.projectForm.$refs.form.resetFields();
                this.loadProjects()
              }else {
                this.$message.error(result.data.msg)
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
              this.loadProjects()
            }
          });
        }else {
          this.$Message.error('请勾选需要操作的数据')
        }
      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
