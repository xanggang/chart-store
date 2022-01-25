<template>
  <BaseChart class="w-full h-full" :options="showOptions" @click="handle"></BaseChart>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, watch, ref } from 'vue';
import { getLineData } from './data';
import BaseChart from '@/components/echart/BaseChart.vue'
import * as echarts from 'echarts'

export default defineComponent({
  name: 'ChartDemo',
  components: { BaseChart },
  props: {
    width: {
      type: String as PropType<string>,
      default: '100%',
    },
    height: {
      type: String as PropType<string>,
      default: '100%',
    },
    options: {
      type: Object as PropType<any>,
      default: () => ({})
    }
  },
  setup(props) {
    const { barData, lineData, category } = getLineData;
    const showOptions = ref({
      backgroundColor: '#0f375f',
      title: {
        text: +new Date(),
        textStyle: {
          color: '#fff',
        }
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
          label: {
            show: true,
            backgroundColor: '#333',
          },
        },
      },
      legend: {
        data: ['line', 'bar'],
        textStyle: {
          color: '#ccc',
        },
      },
      xAxis: {
        data: category,
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      yAxis: {
        splitLine: { show: false },
        axisLine: {
          lineStyle: {
            color: '#ccc',
          },
        },
      },
      series: [
        {
          name: 'line',
          type: 'line',
          smooth: true,
          showAllSymbol: 'auto',
          symbol: 'emptyCircle',
          symbolSize: 15,
          data: lineData,
        },
        {
          name: 'bar',
          type: 'bar',
          barWidth: 10,
          itemStyle: {
            borderRadius: 5,
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#14c8d4' },
              { offset: 1, color: '#43eec6' },
            ]),
          },
          data: barData,
        },
        {
          name: 'line',
          type: 'bar',
          barGap: '-100%',
          barWidth: 10,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(20,200,212,0.5)' },
              { offset: 0.2, color: 'rgba(20,200,212,0.2)' },
              { offset: 1, color: 'rgba(20,200,212,0)' },
            ]),
          },
          z: -12,
          data: lineData,
        },
        {
          name: 'dotted',
          type: 'pictorialBar',
          symbol: 'rect',
          itemStyle: {
            color: '#0f375f',
          },
          symbolRepeat: true,
          symbolSize: [12, 4],
          symbolMargin: 1,
          z: -10,
          data: lineData,
        },
      ],
    })

    function handle() {
      // options.title.text =  +new Date()
    }

    watch(
        () => props.options,
        () => {
          showOptions.value = props.options
        },
        { deep: true }
    )
    return {
      showOptions,
      handle
    };
  },
});
</script>
