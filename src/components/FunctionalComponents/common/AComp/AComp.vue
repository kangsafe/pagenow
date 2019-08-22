<template>
  <div class="">
    <a :href="`http://localhost:8081/designer?p=${$route.query.project_id}`"
       :target="component.compConfigData.target">{{component.compConfigData.text}}</a>
  </div>
</template>

<script>

  import FuncCompMixin from '@/mixin/FuncCompMixin'

  export default {
    name: 'AComp',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {
        text: '超链接',
        href: 'http://www.baidu.com',
        target: '_blank',

        fontSize: '',
        color: '',

        useCustomStyle: false,
        customStyleCode: '{}'
      }
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style scoped>

</style>
