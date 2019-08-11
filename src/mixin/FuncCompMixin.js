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
    component: function () {
      if(this.$store.state.release.pageMetadata) {
        return this.$store.getters['release/getLayoutItemById'](this.location).component
      }else {
        return this.$store.getters['designer/getLayoutItemById'](this.location).component
      }
    }
  }
};

export default FuncCompMixin
