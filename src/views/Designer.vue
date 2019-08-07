<template>
  <div class="designer-container">
    <DesignerMain :projectId="this.$route.query.project_id"/>
  </div>
</template>

<script>
  export default {
    name: 'Designer',
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {},
    computed: {}
  }
</script>

<style scoped>

  .designer-container {
    width: 100%;
    height: 100%;
  }

</style>
