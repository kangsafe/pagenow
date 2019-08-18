<template>
  <Header
      :style="{
            position: 'fixed',
            width: '100%',
            height: '48px',
            backgroundColor: '#515A6E',
            lineHeight: '48px',
            padding: '0 20px'
          }">
    <Button size="small" type="primary" style="margin-right: 5px;" @click="saveCurrentEditPage">保存</Button>

    <Drawer
        title="全局配置"
        v-model="globalConfigDataDrawerVisible"
        width="450"
        :mask-closable="true">
      <GlobalConfigDataForm></GlobalConfigDataForm>
    </Drawer>
    <ButtonGroup size="small" style="margin-right: 5px;">
      <Button type="primary" @click="saveDraft">存为草稿</Button>
      <Button type="default" @click="loadDraft">加载草稿</Button>
    </ButtonGroup>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            @click="clearCanvas">清空画布</Button>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            :disabled="!$store.state.designer.pageMetadata.id"
            @click="previewPage">预览</Button>


    <div :style="{float: 'right'}">
      <Button size="small" type="primary" style=""
              @click="globalConfigDataDrawerVisible = !globalConfigDataDrawerVisible">全局配置</Button>
    </div>


  </Header>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerHeader',
    data() {
      return {

        globalConfigDataDrawerVisible: false,

      }
    },
    mounted() {

    },
    methods: {

      saveCurrentEditPage () {
        let page = Object.assign({}, this.pageMetadata);
        page.layout = JSON.stringify(page.layout);
        this.$PnApi.PageApi.updatePage(page).then(result => {
          if(result.data.code == 1) {
            this.$Message.success('保存成功')
          }
        })
        // this.$PnApi.PageApi.updatePageLayout(this.currentSelectPageId, this.pageMetadata.layout).then(result => {
        //   if(result.data.code == 1) {
        //     this.$Message.success('保存成功')
        //   }
        // })
      },


      /**
       * 保存草稿
       */
      saveDraft () {
        localStorage.setItem('layoutCache', JSON.stringify(this.$store.state.designer.pageMetadata.layout));
        this.$Message.success('已将当前布局保存至草稿')
      },

      /**
       * 加载草稿
       */
      loadDraft () {
        if(localStorage.getItem('layoutCache')) {
          this.$store.commit('designer/setLayout', JSON.parse(localStorage.getItem('layoutCache')))
        }
      },

      clearCanvas () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认清空画布内容吗？',
          onOk: () => {
            this.$store.commit('designer/resetDesigner')
          }
        });
      },

      previewPage () {
        //console.log(this.pageMetadata);
        localStorage.setItem('previewPageMetadata', JSON.stringify(this.pageMetadata));
        this.$PnUtil.openPageToBlank(this.pageMetadata.path, {preview: 'true'})
      },
    },
    computed: {
      ...mapFields({
        pageMetadata: 'pageMetadata'
      }),
    }
  }
</script>

<style scoped>

</style>
