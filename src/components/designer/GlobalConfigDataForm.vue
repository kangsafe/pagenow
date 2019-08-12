<template>
  <div class="global-config-data-form">
    <Form :label-width="labelWidth">
      <FormItem label="定时自动保存">
        <i-switch v-model="globalConfigData.autoSave">
          <span slot="open">开</span>
          <span slot="close">关</span>
        </i-switch>
      </FormItem>
    </Form>
  </div>
</template>

<script>
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
        globalConfigData: {

        }
      }
    },
    mounted() {
      if(localStorage.getItem('globalConfigData')) {
        this.globalConfigData = JSON.parse(localStorage.getItem('globalConfigData'))
      }
    },
    methods: {},
    computed: {

    },
    watch: {
      'globalConfigData': {
        handler: function () {
          localStorage.setItem('globalConfigData', JSON.stringify(this.globalConfigData))
        },
        deep: true
      }
    }
  }
</script>

<style scoped>

</style>
