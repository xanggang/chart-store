<template>
  <div class="h-full w-full" :class="{ error: isErrorJson }">
    <a-button @click="foldJson">格式化代码</a-button>
    <a-button @click="handleGetData">getJsonEditorValue</a-button>
    <textarea class="h-full w-full" ref="domRef"></textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import useJsonEditor from './hooks/useJsonEditor'

export default defineComponent({
  name: "Code",
  emits: ['set-data'],
  setup(_, { emit }) {
    const domRef = ref<null | HTMLTextAreaElement>(null)
    const {
      isErrorJson,
      foldJson,
      getJsonEditorValue,
      jsonOption
    } = useJsonEditor(domRef)

    function handleGetData() {
      const res= getJsonEditorValue()

      emit('set-data', res)
    }

    return {
      domRef,
      foldJson,
      handleGetData,
      isErrorJson
    }
  }
})
</script>

<style>

.error {
  border: 1px solid red;
}

.CodeMirror {
  height: 100%;
}
</style>
