<template>
  <div class="global-config-data-form">
    <Form :label-width="labelWidth">
      <FormItem label="拖拽自动对齐">
        <i-switch v-model="snapEnabled">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
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
    name: 'GlobalConfigDataForm',
    props: {
      labelWidth: {
        type: Number,
        default: 120
      }
    },
    data() {
      return {
        value1: true
      }
    },
    mounted() {

    },
    methods: {},
    computed: {
      ...mapFields({
        snapEnabled: 'globalConfigData.snapEnabled'
      })
    }
  }
</script>

<style scoped>

</style>
