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

      <Divider :style="{fontSize: '13px'}" dashed>边框圆角</Divider>
        <FormItem label="上左">
          <Input size="small" v-model="borderTopLeftRadius"/>
        </FormItem>
        <FormItem label="上右">
          <Input size="small" v-model="borderTopRightRadius"/>
        </FormItem>
        <FormItem label="下右">
          <Input size="small" v-model="borderBottomLeftRadius"/>
        </FormItem>
        <FormItem label="下左">
          <Input size="small" v-model="borderBottomRightRadius"/>
        </FormItem>
      <Divider dashed/>

      <FormItem label="背景颜色">
        <ColorPicker size="small" v-model="backgroundColor" alpha/>
      </FormItem>
      <FormItem label="滑入背景色">
        <ColorPicker size="small" v-model="mouseenterBackgroundColor" alpha/>
      </FormItem>
      <FormItem label="滑出背景色">
        <ColorPicker size="small" v-model="mouseleaveBackgroundColor" alpha/>
      </FormItem>
      <FormItem label="层级">
        <InputNumber size="small" :max="1000" :min="1" v-model="zIndex"></InputNumber>
      </FormItem>
      <FormItem label="内边距">
        <Input size="small" v-model="padding"/>
      </FormItem>
      <FormItem label="是否显示">
        <Select size="small" v-model="display">
          <Option v-for="item in $PnDict.display" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
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
            <DropdownItem name="customStyle">自定义样式</DropdownItem>
            <DropdownItem divided name="deleteLayoutItem">删除布局块</DropdownItem>
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

    <Modal
        v-model="customStyleCodeModalVisible"
        draggable
        scrollable
        title="自定义样式编辑"
        width="650"
        :mask="true"
        :z-index="3">
      <Alert type="info">提示：自定义样式会与预设样式进行浅合并，如果存在相同属性配置，自定义样式会覆盖预设样式</Alert>
      <PnJsonEditor v-model="customStyleCode" :mode="'code'"></PnJsonEditor>
      <div slot="footer">
        <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>

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
    data() {
      return {
        customStyleCodeModalVisible: false
      }
    },
    mounted() {

    },
    methods: {

      dropdownClickHandle (name) {
        if (name == 'customStyle') {
          this.customStyleCodeModalVisible = !this.customStyleCodeModalVisible
        }
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

        borderTopLeftRadius: 'layoutItemConfigData.borderTopLeftRadius',
        borderTopRightRadius: 'layoutItemConfigData.borderTopRightRadius',
        borderBottomLeftRadius: 'layoutItemConfigData.borderBottomLeftRadius',
        borderBottomRightRadius: 'layoutItemConfigData.borderBottomRightRadius',

        backgroundColor: 'layoutItemConfigData.backgroundColor',
        mouseenterBackgroundColor: 'layoutItemConfigData.mouseenterBackgroundColor',
        mouseleaveBackgroundColor: 'layoutItemConfigData.mouseleaveBackgroundColor',

        zIndex: 'layoutItemConfigData.zIndex',
        padding: 'layoutItemConfigData.padding',
        display: 'layoutItemConfigData.display',
        compVisible: 'layoutItemConfigData.compVisible',
        customStyleCode: 'layoutItemConfigData.customStyleCode',

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
  .ivu-divider-horizontal {
    margin: 10px 0px 10px 0px;
  }
</style>
