<template>
  <div class="test-bar-chart">
    <div :id="'chart-'+component.id" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>
  import FuncCompMixin from '../../../../mixin/FuncCompMixin'

  export default {
    name: 'TestBarChart2',
    mixins: [FuncCompMixin],
    attr: {
      configDataTemp: {

      }
    },
    data() {
      return {
        chart: null
      }
    },
    mounted() {
      this.drawChart();
    },
    methods: {
      drawChart: function () {
        this.chart = this.$Echarts.init(document.getElementById('chart-'+this.component.id));
        let option = {
          xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
          },
          yAxis: {
            type: 'value'
          },
          series: [{
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar'
          }]
        };
        this.chart.setOption(option);
      }
    },
    computed: {}
  }
</script>

<style scoped>
  .test-bar-chart {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
