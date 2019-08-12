<template>
  <div class="reactive-layout-item-form">
    <Form :label-width="80">
      <FormItem label="ID">
        <Input size="small" v-model="id" disabled/>
      </FormItem>

      <FormItem label="高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="背景颜色">
        <ColorPicker size="small" v-model="backgroundColor" />
      </FormItem>
      <FormItem label="排序">
        <InputNumber size="small" v-model="sort" />
      </FormItem>
      <!--<FormItem label="功能组件">
        <i-input size="small" v-model="componentName">
          <Button size="small" slot="append" @click="selectFuncComp">选择</Button>
        </i-input>
      </FormItem>-->
      <FormItem label="关联组件">
        <Input size="small" v-model="componentName" disabled/>
      </FormItem>
      <FormItem label="操作">
        <Button :disabled="!componentName" size="small" type="error" @click="deleteComponent">删除关联组件</Button>
        <Button size="small" type="error" style="margin-left: 5px;" @click="deleteLayoutItem">删除此布局块</Button>
      </FormItem>
    </Form>
  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItem',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'ReactiveLayoutItemForm',
    data() {
      return {}
    },
    mounted() {

    },
    methods: {

      deleteComponent () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除关联的组件吗？',
          onOk: () => {
            this.$store.commit('designer/deleteComponentByLayoutItemId', this.id);
            this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
          }
        });
      },

      deleteLayoutItem () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认删除此布局块吗？',
          onOk: () => {
            this.$store.commit('designer/deleteLayoutItem', this.id);
            this.$store.commit('designer/setRightSidebarLayoutItemConfigFormName', '');
            this.$store.commit('designer/setCurrentSelectLayoutItemId', '');
            this.$store.commit('designer/setRightSidebarFuncCompConfigFormName', '')
          }
        });
      },

      /**
       * 弃用
       */
      selectFuncComp () {

        this.componentId = this.$PnUtil.uuid();
        this.componentName = 'Hello';

        const componentsContext = require.context('../../', true, /\.vue$/);

        componentsContext.keys().forEach(fileName => {
          const componentConfig = componentsContext(fileName);

          if(componentConfig.default.name == 'Hello') {
            const compInst = require('../../'+fileName.slice(2, fileName.length));
            this.componentConfigData = Object.assign({}, compInst.default.attr.configDataTemp)
          }
        });

      }
    },
    computed: {
      ...mapFields({
        id: 'id',
        height: 'layoutItemConfigData.height',
        backgroundColor: 'layoutItemConfigData.backgroundColor',
        sort: 'layoutItemConfigData.sort',
        componentId: 'component.id',
        componentName: 'component.name',
        componentConfigData: 'component.compConfigData'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
