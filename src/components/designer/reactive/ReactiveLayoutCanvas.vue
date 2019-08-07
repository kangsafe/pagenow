<!--响应式布局画布(暂时还没实现)-->

<template>
  <div class="reactive-layout-canvas">
    <Row>
      <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
      <Col :xs="20" :sm="16" :md="12" :lg="8">Col</Col>
      <Col :xs="2" :sm="4" :md="6" :lg="8">Col</Col>
    </Row>
  </div>
</template>

<script>
  export default {
    name: 'ReactiveLayoutCanvas',
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
