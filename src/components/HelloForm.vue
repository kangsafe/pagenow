<template>
  <div class="">
    <Form :label-width="80">
      <FormItem label="文本">
        <Input size="small" v-model="text"/>
      </FormItem>
    </Form>

  </div>
</template>

<script>
  import { createHelpers } from 'vuex-map-fields';

  const { mapFields } = createHelpers({
    getterType: 'designer/getLayoutItemById',
    mutationType: 'designer/updateLayoutItem',
  });

  export default {
    name: 'HelloForm',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        text: 'component.configData.text'
      })
    }
  }
</script>

<style scoped>

</style>
