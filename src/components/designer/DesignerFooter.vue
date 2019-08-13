<template>
  <Footer
      :style="{
        width: '100%',
        height: '48px',
        backgroundColor: '#515A6E',
        lineHeight: '48px',
        color: '#FFF',
        position: 'fixed',
        bottom: '0px',
        zIndex: '1',
        paddingTop: '0px',
        paddingBottom: '0px',
        paddingLeft: '310px',
        paddingRight: '310px'
      }">
    <div :style="{float: 'right'}">
      <Button size="small" type="primary" style="margin-right: 5px;">隐藏所有布局块</Button>
      <Button size="small" type="primary" @click="visible = !visible">源数据</Button>
    </div>


    <Modal
        v-model="visible"
        draggable
        scrollable
        title="源数据"
        width="650"
        :z-index="3"
        :transfer="true">
      <Alert type="error">请谨慎编辑源数据！（非特殊情况不要在此编辑源数据）</Alert>
      <vue-json-editor v-model="layout" :show-btns="false"></vue-json-editor>
      <div slot="footer">
        <Button type="default" @click="visible = false">关闭</Button>
      </div>
    </Modal>

  </Footer>
</template>

<script>

  import vueJsonEditor from 'vue-json-editor'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'DesignerFooter',
    components: {
      vueJsonEditor
    },
    data() {
      return {
        visible: false,
        columns: [
          {
            title: '组件名称',
            key: 'name'
          },
          {

          }
        ],

      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        pageMetadata: 'pageMetadata',
        layout: 'pageMetadata.layout'
      })
    }
  }
</script>

<style scoped>

</style>
