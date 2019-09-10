<template>
  <div v-resize="resizeHandle" :style="{width: '100%', height: '100%', position: 'relative'}">
    <div :id="'chart-'+component.id" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>

  import EchartCompMixin from '@/mixin/EchartCompMixin'
  import PnDesigner from '@/utils/PnDesigner'

  export default {
    name: 'TestBarChart2',
    mixins: [EchartCompMixin],
    attr: {
      configDataTemp: Object.assign(PnDesigner.buildEchartConfigDataTemp(), {
        chartOption: {
          tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
              type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
          },
          legend: {
            data:['利润', '支出', '收入']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis : [
            {
              type : 'value'
            }
          ],
          yAxis : [
            {
              type : 'category',
              axisTick : {show: false},
              data : ['周一','周二','周三','周四','周五','周六','周日']
            }
          ],
          series : [
            {
              name:'利润',
              type:'bar',
              label: {
                normal: {
                  show: true,
                  position: 'inside'
                }
              },
              data:[200, 170, 240, 244, 200, 220, 210]
            },
            {
              name:'收入',
              type:'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true
                }
              },
              data:[320, 302, 341, 374, 390, 450, 420]
            },
            {
              name:'支出',
              type:'bar',
              stack: '总量',
              label: {
                normal: {
                  show: true,
                  position: 'left'
                }
              },
              data:[-120, -132, -101, -134, -190, -230, -210]
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
