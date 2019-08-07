<template>
  <div class="page-manage">
    <div style="margin-bottom: 15px;">
      <a-button type="primary" @click="pageInfoFormDrawerVisible = !pageInfoFormDrawerVisible">创建页面</a-button>
      <a-divider type="vertical" />
    </div>

    <a-row :gutter="30">
      <a-col :span="6" v-for="pageInfo in pageInfos" :key="pageInfo.id">
        <a-card
            hoverable
        >
          <img
              alt="example"
              src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
              slot="cover"
          />
          <template class="ant-card-actions" slot="actions">
            <a :href="pageInfo.path" target="_blank"><a-icon type="setting" /></a>
            <a :href="'/designer?pageInfoId='+pageInfo.id" target="_blank"><a-icon type="edit" /></a>
            <a-icon type="ellipsis" />
          </template>
          <a-card-meta
              :title="pageInfo.name"
              description="This is the description">
            <a-avatar slot="avatar" src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
          </a-card-meta>
        </a-card>
      </a-col>

    </a-row>


    <a-drawer
        title="创建页面"
        :width="500"
        placement="right"
        :closable="false"
        :maskClosable="false"
        :visible="pageInfoFormDrawerVisible">
      <PageInfoForm ref="pageInfoForm"/>

      <DrawerFooter>
        <a-button @click="pageInfoFormDrawerVisible = !pageInfoFormDrawerVisible">关闭</a-button>
        <a-divider type="vertical" />
        <a-button type="primary" @click="savePageInfoHandle">保存</a-button>
      </DrawerFooter>
    </a-drawer>
  </div>
</template>

<script>
  export default {
    name: 'PageManage',
    data() {
      return {
        pageInfoFormDrawerVisible: false,
        pageInfos: []
      }
    },
    mounted() {
      this.loadPageInfos();
    },
    methods: {

      loadPageInfos () {
        this.$PnApi.PageInfoApi.getPageInfos().then((result)=>{
          this.pageInfos = result.data.data;
          console.log(this.pageInfos);
        })
      },

      savePageInfoHandle () {
        const form = this.$refs.pageInfoForm.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }

          this.$PnApi.PageInfoApi.savePageInfo(values).then((result)=>{
            if(result.data.code == 1) {
              this.$message.success('保存成功');
              this.loadPageInfos();
              form.resetFields();
              this.pageInfoFormDrawerVisible = !this.pageInfoFormDrawerVisible
            }else {
              this.$message.error(result.data.msg)
            }
          });

        });
      },


    },
    computed: {}
  }
</script>

<style scoped>

</style>
