<template>
  <div class="test-bar-chart">
    <div :id="'chart-'+component.id" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>
  import FuncCompMixin from '../../../../mixin/FuncCompMixin'

  export default {
    name: 'TestBarChart',
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
          color: ['#3398DB'],
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'category',
              data : ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              axisTick: {
                alignWithLabel: true
              }
            }
          ],
          yAxis : [
            {
              type : 'value'
            }
          ],
          series : [
            {
              name:'直接访问',
              type:'bar',
              barWidth: '60%',
              data:[10, 52, 200, 334, 390, 330, 220]
            }
          ]
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
