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
        <Button size="small" type="primary" @click="addLayoutItem">添加布局块</Button>
      </FormItem>
    </Form>
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
    },
    computed: {
      ...mapFields({
        width: 'pageMetadata.layout.layoutConfigData.width',
        height: 'pageMetadata.layout.layoutConfigData.height',
        backgroundColor: 'pageMetadata.layout.layoutConfigData.backgroundColor',
      })
    }
  }
</script>

<style scoped>
  .ivu-form-item {
    margin-bottom: 0px;
  }
</style>
