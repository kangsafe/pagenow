<template>
  <div class="test-bar-chart" v-resize="resizeHandle">
    <div :id="'chart-'+component.id" style="width: 100%; height:100%;"></div>
  </div>
</template>

<script>

  import EchartCompMixin from '../../../../mixin/EchartCompMixin'

  export default {
    name: 'TestBarChart',
    mixins: [EchartCompMixin],
    attr: {
      configDataTemp: {
        apiPath: 'http://localhost:8090/echart/test1',
        chartOption: {
          title: {
            id: '',
            show: false,
            text: '标题',
            link: '',
            target: 'blank',
            textStyle: {
              color: '#333',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 18,
              lineHeight: 56,
              width: '',
              height: '',
              textBorderColor: 'transparent',
              textBorderWidth: 0,
              textShadowColor: 'transparent',
              textShadowBlur: 0,
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              rich: {}
            },
            subtext: '',
            sublink: '',
            subtarget: 'blank',
            subtextStyle: {
              color: '#aaa',
              fontStyle: 'normal',
              fontWeight: 'normal',
              fontFamily: 'sans-serif',
              fontSize: 12,
              align: '',
              verticalAlign: '',
              lineHeight: 18,
              width: '',
              height: '',
              textBorderColor: 'transparent',
              textBorderWidth: 0,
              textShadowColor: 'transparent',
              textShadowBlur: 0,
              textShadowOffsetX: 0,
              textShadowOffsetY: 0,
              rich: {}
            },
            textAlign: 'auto',
            textVerticalAlign: 'auto',
            triggerEvent: false,
            padding: 5,
            itemGap: 10,
            zlevel: 0,
            z: 2,
            left: 'auto',
            top: 'auto',
            right: 'auto',
            bottom: 'auto',
            backgroundColor: 'transparent',
            borderColor: '#ccc',
            borderWidth: 0,
            borderRadius: 0,
            shadowBlur: '',
            shadowColor: '',
            shadowOffsetX: 0,
            shadowOffsetY: 0,
          },
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
      }
    },
    data() {
      return {
        //chart: null
      }
    },
    mounted() {

      //this.chart = this.$Echarts.init(document.getElementById('chart-'+this.component.id));

      this.drawChart();
      //eval("(function(){"+this.func1+"})()")
      // this.$EventBus.$on('hello-click', (data)=>{
      //   this.drawChart()
      // })
    },
    methods: {

      drawChart () {
        //console.log(this.$route.query);
        let chartOption = this.component.compConfigData.chartOption;

        this.chart.setOption(chartOption);

        this.$PnApi.getData(this.component.compConfigData.apiPath).then(result => {
          this.chart.setOption({
            series: [
              {
                data: result.data.data
              }
            ]
          })
        });

      },
      /*loadData () {
        this.$PnApi.getData(this.component.compConfigData.apiPath).then(result => {
          //console.log(result.data.data);
          this.chart.setOption({
            series: [
              {
                data: result.data.data
              }
            ]
          })
          // option.series[0].data = result.data.data;
          // this.chart.setOption(option);
        });
      }*/
    },
    computed: {},
    watch: {
      'component.compConfigData.chartOption': {
        handler: 'drawChart',
        deep: true
      }
    }
  }
</script>

<style scoped>
  .test-bar-chart {
    width: 100%;
    height: 100%;
    position: relative;
  }
</style>
