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
    <Button class="m-r-5px" size="small" type="primary"
            :disabled="!pageMetadata.id"
            @click="saveCurrentEditPage">保存</Button>

    <Poptip transfer trigger="hover" placement="bottom-start"
            title="说明" content="一般在执行布局块复制拷贝的时候需要点击保存并重载">
      <Button class="m-r-5px" size="small" type="success"
            :disabled="!pageMetadata.id"
            @click="saveCurrentEditPageAndHeavyLoad">保存并重载</Button>
    </Poptip>

    <Poptip transfer trigger="hover" placement="bottom-start"
            title="说明" content="可以将当前页面临时保存在浏览器本地存储中">
    <ButtonGroup size="small" style="margin-right: 5px;">
      <Button type="primary" :disabled="!pageMetadata.id" @click="saveDraft">存为草稿</Button>
      <Button type="default" :disabled="!pageMetadata.id" @click="loadDraft">加载草稿</Button>
    </ButtonGroup>
    </Poptip>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            :disabled="!pageMetadata.id"
            @click="clearCanvas">清空画布</Button>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            :disabled="!pageMetadata.id"
            @click="clearMultiSelect">清除多选</Button>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            :disabled="!pageMetadata.id"
            @click="stepBackward">撤回</Button>
    <Button size="small" type="primary"
            style="margin-right: 5px;"
            :disabled="!$store.state.designer.pageMetadata.id"
            @click="previewPage">预览</Button>

    <div :style="{float: 'right'}">
      <Button size="small" type="primary" style=""
              @click="globalConfigDataDrawerVisible = !globalConfigDataDrawerVisible">全局配置</Button>
    </div>


    <Drawer
        title="全局配置"
        v-model="globalConfigDataDrawerVisible"
        width="450"
        :mask-closable="true">
      <GlobalConfigDataForm></GlobalConfigDataForm>
    </Drawer>

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

      /**
       * 保存当前编辑页面
       */
      saveCurrentEditPage () {
        let page = Object.assign({}, this.pageMetadata);
        page.layout = JSON.stringify(page.layout);
        delete page.echartThemeJsonText;
        this.$PnApi.PageApi.updatePage(page).then(result => {
          if(result.data.code == 1) {
            this.$Message.success('保存成功')
          }
        })
      },

      /**
       * 保存并重载当前页面
       */
      saveCurrentEditPageAndHeavyLoad () {
        this.saveCurrentEditPage();
        setTimeout(()=>{
          this.$store.commit('designer/resetDesigner');
          this.$store.dispatch('designer/loadPage', this.pageMetadata.id);
        },150);
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

      /**
       * 清除多选
       */
      clearMultiSelect () {
        this.$store.commit('designer/setCurrentSelectLayoutItemIds', []);
        this.$Message.success('已清除多选数据')
      },

      /**
       * 后退一步
       */
      stepBackward () {
        if(localStorage.getItem('PageMetadataLayoutLocalRecord')) {
          let PageMetadataLayoutLocalRecord = JSON.parse(localStorage.getItem('PageMetadataLayoutLocalRecord'));
          this.$store.commit('designer/setLayout', PageMetadataLayoutLocalRecord[0])
        }
      },

      previewPage () {
        //console.log(this.pageMetadata);
        // 将当前工程信息和当前打开页面的源数据存入本地存储
        localStorage.setItem('previewProjectInfo', JSON.stringify(this.projectInfo));
        localStorage.setItem('previewPageMetadata', JSON.stringify(this.pageMetadata));
        this.$PnUtil.openPageToBlank(this.pageMetadata.path, {preview: 'true'})
      },
    },
    computed: {
      ...mapFields({
        projectInfo: 'projectInfo',
        pageMetadata: 'pageMetadata'
      }),
    }
  }
</script>

<style scoped>

</style>
