<!--绝对布局画布配置表单-->
<template>
  <div class="absolute-layout-data-form">
    <Form :label-width="105">
      <FormItem label="背景色">
        <ColorPicker size="small" v-model="backgroundColor" alpha/>
      </FormItem>
      <FormItem label="画布宽度">
        <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="width"></InputNumber>
        <Select size="small" v-model="widthPixelUnit" :style="{width: '60px'}">
          <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="画布高度">
        <InputNumber class="m-r-5px" size="small" :max="10000" :min="0" :step="1" v-model="height"></InputNumber>
        <Select size="small" v-model="heightPixelUnit" :style="{width: '60px'}">
          <Option v-for="item in $PnDict.pixelUnits" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="显示辅助网格">
        <i-switch v-model="showGrid">
          <span slot="open"></span>
          <span slot="close"></span>
        </i-switch>
      </FormItem>
      <FormItem label="网格像素">
        <Select transfer size="small" v-model="canvasGridClass">
          <Option v-for="item in $PnDict.canvasGridClass" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
      </FormItem>
      <FormItem label="拖拽单位像素">
        <InputNumber size="small" :max="10000" :min="0" :step="5" v-model="dragPixel"></InputNumber> px
      </FormItem>

      <FormItem label="操作">
        <Button class="m-r-5px" size="small" type="primary" @click="addLayoutItem">添加布局块</Button>
        <Button size="small" type="primary" @click="customStyleCodeModalVisible = !customStyleCodeModalVisible">自定义样式</Button>
        <!--<Dropdown trigger="click" placement="bottom-start" @on-click="dropdownClickHandle">
          <Button type="primary" size="small">
            其他操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">

            <DropdownItem name="customStyle">自定义样式</DropdownItem>
          </DropdownMenu>
        </Dropdown>-->
      </FormItem>
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
      <!--<PnJsonEditor v-model="customStyleCode" :mode="'code'"></PnJsonEditor>-->
      <CodeEditor v-model="customStyleCode" mode="SCSS"></CodeEditor>
      <div slot="footer">
        <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutConfigDataForm',
    data() {
      return {
        customStyleCodeModalVisible: false
      }
    },
    created () {

    },
    mounted() {

    },
    methods: {
      addLayoutItem () {
        this.$store.commit('designer/addLayoutItem', this.$PnDesigner.buildAbsoluteLayoutItemConfigData());
      },

      dropdownClickHandle (name) {

        if (name == 'customStyle') {
          this.customStyleCodeModalVisible = !this.customStyleCodeModalVisible
        }
      },
    },
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        widthPixelUnit: 'pageMetadata.layout.layoutConfigData.widthPixelUnit',
        height: 'pageMetadata.layout.layoutConfigData.height',
        heightPixelUnit: 'pageMetadata.layout.layoutConfigData.heightPixelUnit',
        showGrid: 'pageMetadata.layout.layoutConfigData.showGrid',
        canvasGridClass: 'pageMetadata.layout.layoutConfigData.canvasGridClass',
        dragPixel: 'pageMetadata.layout.layoutConfigData.dragPixel',
        backgroundColor: 'pageMetadata.layout.layoutConfigData.backgroundColor',
        customStyleCode: 'pageMetadata.layout.layoutConfigData.customStyleCode'
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
