<!--绝对布局画布配置表单-->
<template>
  <div class="absolute-layout-data-form">
    <Form :label-width="80">
      <FormItem label="画布宽度">
        <Input size="small" v-model="width"/>
      </FormItem>
      <FormItem label="画布高度">
        <Input size="small" v-model="height"/>
      </FormItem>
      <FormItem label="背景色">
        <ColorPicker size="small" v-model="backgroundColor" />
      </FormItem>
      <FormItem label="操作">
        <Button size="small" type="primary" @click="addLayoutItem" style="margin-right: 5px;">添加布局块</Button>
        <Dropdown trigger="click" placement="bottom-start" @on-click="dropdownClickHandle">
          <Button type="primary" size="small">
            其他操作
            <Icon type="ios-arrow-down"></Icon>
          </Button>
          <DropdownMenu slot="list">
            <DropdownItem name="lockDragAndResizable">{{lockDragAndResizableVisible ? '解锁拖拽':'锁定拖拽'}}</DropdownItem>
            <DropdownItem name="customStyle">自定义样式</DropdownItem>
          </DropdownMenu>
        </Dropdown>
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
      <vue-json-editor v-model="customStyleCode" :show-btns="false" :mode="'code'"></vue-json-editor>
      <div slot="footer">
        <Button type="default" @click="customStyleCodeModalVisible = false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import vueJsonEditor from 'vue-json-editor'

  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getField',
    mutationType: 'designer/updateField',
  });

  export default {
    name: 'AbsoluteLayoutConfigDataForm',
    components: {
      vueJsonEditor
    },
    data() {
      return {
        lockDragAndResizableVisible: false,
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
        if (name == 'lockDragAndResizable') {
          if(this.lockDragAndResizableVisible) {
            $('.absolute-layout-item').draggable('enable');
            $('.absolute-layout-item').resizable('enable');
          }else {
            $('.absolute-layout-item').draggable('disable');
            $('.absolute-layout-item').resizable('disable');
          }
          this.lockDragAndResizableVisible = !this.lockDragAndResizableVisible
        }
        if (name == 'customStyle') {
          this.customStyleCodeModalVisible = !this.customStyleCodeModalVisible
        }
      },
    },
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        height: 'pageMetadata.layout.layoutConfigData.height',
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
