<template>
  <a-card hoverable  class="w-full overflow-hidden">
    <template #cover>
      <img alt="example" src="https://cdn.jsdelivr.net/gh/apache/echarts-website@asf-site/examples/data/thumb/line-simple.png?_v_=1641520500142" />
    </template>
    <a-card-meta title="折线图">
      <template #description>包含: pie、line</template>
    </a-card-meta>
  </a-card>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: "Card"
})
</script>

<style scoped>

</style>
