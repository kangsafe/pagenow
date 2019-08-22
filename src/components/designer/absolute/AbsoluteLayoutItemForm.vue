<!--布局块数据编辑表单-->

<template>
  <div class="absolute-layout-item-form">
    <Form :label-width="80">
      <FormItem label="ID">
        <Input size="small" v-model="id" disabled/>
      </FormItem>
      <FormItem label="宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="左偏移">
        <Input size="small" v-model="left"/>
      </FormItem>
      <FormItem label="上偏移">
        <Input size="small" v-model="top"/>
      </FormItem>
      <FormItem label="边框宽度">
        <Input size="small" v-model="borderWidth"/>
      </FormItem>
      <FormItem label="边框类型">
        <Select size="small" v-model="borderStyle">
          <Option v-for="item in $PnDict.borderStyles" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="边框颜色">
        <ColorPicker size="small" v-model="borderColor" alpha/>
      </FormItem>
      <FormItem label="背景颜色">
        <ColorPicker size="small" v-model="backgroundColor" alpha/>
      </FormItem>
      <FormItem label="层级">
        <Input size="small" v-model="zIndex"/>
      </FormItem>
      <FormItem label="显示">
        <Select size="small" v-model="display">
          <Option v-for="item in $PnDict.display" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="显示组件">
        <i-switch v-model="compVisible">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="关联组件">
        <Input size="small" v-model="componentName" disabled/>
      </FormItem>
      <FormItem label="操作">
        <Dropdown trigger="click" placement="bottom-start" @on-click="dropdownClickHandle">
          <Button type="primary" size="small">
            操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="deleteLayoutItem">删除布局块</DropdownItem>
            <DropdownItem name="deleteComponent">解除关联组件</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </FormItem>
      <!--<FormItem label="功能组件">
        <i-input size="small" v-model="componentName">
          <Button size="small" slot="append" @click="selectFuncComp">选择</Button>
        </i-input>
      </FormItem>-->
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
    name: 'AbsoluteLayoutItemForm',
    props: {

    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

      dropdownClickHandle (name) {
        if (name == 'deleteComponent') {
          this.deleteComponent()
        }
        if (name == 'deleteLayoutItem') {
          this.deleteLayoutItem()
        }
      },

      deleteComponent () {
        this.$Modal.confirm({
          title: '提醒',
          content: '确认解除关联的组件吗？',
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
        console.log('selectFuncComp');

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
        width: 'layoutItemConfigData.width',
        height: 'layoutItemConfigData.height',
        left: 'layoutItemConfigData.left',
        top: 'layoutItemConfigData.top',
        borderWidth: 'layoutItemConfigData.borderWidth',
        borderStyle: 'layoutItemConfigData.borderStyle',
        borderColor: 'layoutItemConfigData.borderColor',
        backgroundColor: 'layoutItemConfigData.backgroundColor',
        zIndex: 'layoutItemConfigData.zIndex',
        display: 'layoutItemConfigData.display',
        compVisible: 'layoutItemConfigData.compVisible',

        componentId: 'component.id',
        componentName: 'component.name',
        componentConfigData: 'component.compConfigData'
      })
    },
    watch: {

    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
