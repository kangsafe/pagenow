<template>
  <div class="">
    <!--<Collapse>
      <Panel name="1">
        标题配置
        <p slot="content">

        </p>
      </Panel>
      <Panel name="2">
        其他配置
        <p slot="content">
          <i-form :label-width="80">
            <FormItem label="接口地址">
              <Input size="small" v-model="apiPath"/>
            </FormItem>
          </i-form>
          <Button size="small" @click="">源数据编辑</Button>
          <vue-json-editor v-model="option" :show-btns="false"></vue-json-editor>
        </p>
      </Panel>
    </Collapse>-->
    <Button size="small" @click="visible = !visible">源数据编辑</Button>

    <Modal
        v-model="visible"
        draggable
        scrollable
        title="源数据"
        width="650"
        :mask="true"
        :z-index="3">
        <Alert type="error">请谨慎编辑源数据！（非特殊情况不要在此编辑源数据）</Alert>
        <vue-json-editor v-model="option" :show-btns="false" ></vue-json-editor>
      <div slot="footer">
        <Button type="default" @click="visible = false">关闭</Button>
      </div>
    </Modal>

  </div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'TestBarChartForm',
    components: {
      vueJsonEditor
    },
    data() {
      return {
        visible: false
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        apiPath: 'component.compConfigData.apiPath',
        option: 'component.compConfigData.option'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
  .jsoneditor-vue {
    height: 400px;
  }
</style>
