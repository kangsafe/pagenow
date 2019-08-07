// 功能组件混入对象

const FuncCompMixin = {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  created () {


  },
  computed: {
    configData: function () {
      if(this.$store.state.release.pageInfo) {
        return {}
      }else {
        return this.$store.getters['designer/getLayoutItemById'](this.location).component.configData
      }
    }
  }
};

export default FuncCompMixin
