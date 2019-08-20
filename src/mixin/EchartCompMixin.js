
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
    buildApiPath (apiPath, useUrlParam) {
      if(useUrlParam) {
        let params = '';
        for(let q in this.$route.query) {
          params += ''+q+'='+this.$route.query[q]+'&'
        }
        params = params.substr(0, params.length-1);

        apiPath += '?'+params;
      }
      return apiPath
    }
  },
  computed: {
    component: function () {
      if(this.$store.state.release.pageMetadata) {
        return this.$store.getters['release/getLayoutItemById'](this.location).component
      }else {
        return this.$store.getters['designer/getLayoutItemById'](this.location).component
      }
    }
  },
  watch: {
    'component.compConfigData': {
      handler: 'drawChart',
      deep: true
    }
  }
};

export default EchartCompMixin
