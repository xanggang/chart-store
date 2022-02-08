<template>
  <div class="w-full h-full flex">
    <div class="w-[40%] mr-[20px] bg-red-100 overflow-hidden">
      <Codemirror @set-data="handleSetData"></Codemirror>
    </div>
    <div class="w-[60%] h-[300px] bg-red-300">
      <Chart :options="options"></Chart>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Chart from './components/Chart.vue'
import Codemirror from '@/components/codemirror/index.vue'

export default defineComponent({
  name: "Home",
  components: { Chart, Codemirror },
  setup() {

    const opt = ref({})

    function handleSetData (e) {
      console.log(e);
      const d = `function run () { const ${e}  return option} run()`
      console.log(d);
      const s = eval(d)
      opt.value = s
    }
    return {
      handleSetData,
      options: opt
    }
  }
})
</script>

<style scoped>

</style>
