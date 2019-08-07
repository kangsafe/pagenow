<!--布局块中的组件容器，包裹在具体功能组件外层-->

<template>
  <div class="component-container" @dblclick="testClick">
    <slot></slot>
    <a-modal
        title="布局项配置"
        :visible="layoutItemConfigFormModalVisible"
        @ok="handleOk"
        @cancel="handleCancel">
      <LayoutItemConfigForm :data="layoutItemData"/>
    </a-modal>
  </div>
</template>

<script>
  import {
    Modal
  } from 'ant-design-vue'
  import LayoutItemConfigForm from './LayoutItemConfigForm'

  export default {
    name: 'ComponentContainer',
    components: {
      AModal: Modal,
      LayoutItemConfigForm
    },
    props: {
      location: {
        type: String,
        required: true,
        default: ''
      },
      layoutItem: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        layoutItemConfigFormModalVisible: false,
        layoutItemData: {

        }
      }
    },
    mounted() {
      if (this.layoutItem) {
        this.layoutItemData = this.layoutItem
      }
    },
    methods: {
      testClick () {
        this.layoutItemConfigFormModalVisible = !this.layoutItemConfigFormModalVisible;
        console.log("ComponentContainer:" + JSON.stringify(this.layoutItem));
      },


      handleOk () {
        this.$emit('saveLayoutItem', this.layoutItemData);
        this.layoutItemConfigFormModalVisible = !this.layoutItemConfigFormModalVisible;
      },
      handleCancel () {
        this.layoutItemConfigFormModalVisible = !this.layoutItemConfigFormModalVisible;
      }
    },
    computed: {}
  }
</script>

<style scoped>
  .component-container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
  }
</style>
