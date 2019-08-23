<template>
  <div class="">
    <Form :label-width="80">
      <FormItem label="文本">
        <Input size="small" v-model="text"/>
      </FormItem>
      <FormItem label="点击事件">
        <Input size="small" v-model="customJsCode"/>
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
    name: 'HelloWorldForm',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        text: 'component.compConfigData.text',
        customJsCode: 'component.compConfigData.customJsCode',
      })
    }
  }
</script>

<style scoped>

</style>
