<!--布局块数据编辑表单-->

<template>
  <div class="absolute-layout-item-form">
    <Form :label-width="80">
      <FormItem label="ID">
        <Input size="small" v-model="id"/>
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
        <ColorPicker size="small" v-model="borderColor" />
      </FormItem>
      <FormItem label="背景颜色">
        <ColorPicker size="small" v-model="backgroundColor" />
      </FormItem>
      <FormItem label="功能组件">
        <i-input size="small" v-model="componentName">

          <Button size="small" slot="append" @click="selectFuncComp">选择</Button>
        </i-input>
      </FormItem>
    </Form>

    <!--这里使用一个隐藏的component标签来引入动态添加的功能组件，以便获取组件的data.configData配置-->
    <!--<component ref="funcComp" :is="componentName" v-show="false"></component>-->
  </div>
</template>

<script>
  import Vue from 'vue'
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItemById',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'AbsoluteLayoutItemForm',
    props: {

    },
    data() {
      return {
        labelCol: 6,
        wrapperCol: 16
      }
    },
    mounted() {

    },
    methods: {
      deleteLayoutItem () {

      },
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

        //console.log(require('../Hello.vue'));

        // setTimeout(()=>{
        //   this.componentConfigData = this.$refs.funcComp.configData
        // }, 100)

      }
    },
    computed: {
      ...mapFields({
        id: 'id',
        width: 'width',
        height: 'height',
        left: 'left',
        top: 'top',
        borderWidth: 'borderWidth',
        borderStyle: 'borderStyle',
        borderColor: 'borderColor',
        backgroundColor: 'backgroundColor',
        componentId: 'component.id',
        componentName: 'component.name',
        componentConfigData: 'component.configData'
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
