<template>
  <div v-resize="resizeHandle" :style="{width: '100%', height: '100%', position: 'relative'}">
    <div :id="'chart-'+component.id" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>

  import EchartCompMixin from '@/mixin/EchartCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  export default {
    name: 'TestBarChart',
    mixins: [EchartCompMixin],
    attr: {
      configDataTemp: Object.assign(PnDesigner.buildEchartConfigDataTemp(), {
        chartOption: {
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
              label: {
                show: true,
                /*formatter: function (params) {
                  return '测试-'+params.data
                }*/
              },
              barWidth: '60%',
              // data: [10,52,200,334,390,330,220]
              data: []
            }
          ]
        }
      })
    },
    data() {
      return {
        //chart: null
      }
    },
    mounted() {
      this.drawChart();
    },
    methods: {

      drawChart () {
        let chartOption = this.component.compConfigData.chartOption;
        this.chart.setOption(chartOption);

        this.loadData();
      },
      loadData () {
        if(this.component.compConfigData.apiPath) {
          this.$PnApi.getData(this.buildApiPath(this.component.compConfigData.apiPath, this.component.compConfigData.useUrlParam)).then(result => {
            this.chart.setOption({
              series: [
                {
                  data: result.data.data
                }
              ]
            })
          });
        }

      }
    },
    computed: {}
  }
</script>

<style scoped>

</style>
