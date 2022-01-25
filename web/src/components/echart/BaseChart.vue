<template>
  <div ref="chartRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
import { defineComponent, PropType, ref, Ref, onMounted, watch } from 'vue';

import { useECharts } from './hooks/useECharts';

export default defineComponent({
  name: 'ChareDemo',
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
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions, echarts } = useECharts(chartRef as Ref<HTMLDivElement>);
    onMounted(() => {
      setOptions(props.options);
    });

    watch(
        () => props.options,
        () => {
          console.log('data change');
          setOptions(props.options);
        },
        { deep: true }
    )
    return { chartRef };
  },
});
</script>
