<!--结构树表格展开控件-->
<template>
  <div class="">
    <span>组件({{row.componentName}}) -- <Button size="small" icon="md-eye"></Button></span>
  </div>
</template>

<script>
  export default {
    name: 'StructureTreeTableExpand',
    props: {
      row: Object
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

</style>
