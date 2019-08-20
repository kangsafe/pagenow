
const EchartCompMixin = {
  props: {
    location: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      chart: null
    }
  },
  created () {


  },
  mounted () {

    this.chart = this.$Echarts.init(document.getElementById('chart-'+this.component.id));

  },
  methods: {
    resizeHandle () {
      this.chart.resize();
    },
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

export default EchartCompMixin
