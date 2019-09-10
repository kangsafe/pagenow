<template>
  <div class="about">
    <h1>This is an about page</h1>
    <a-button type="primary" @click="addRoute">添加路由到本地存储</a-button>
    <a><router-link to="/test">test</router-link></a>
  </div>
</template>

<script>
  export default {
    name: 'About',
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      addRoute () {

      }
    },
    computed: {}
  }
</script>
