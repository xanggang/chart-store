import CodeMirror from '../import'
import { Editor as CodeEditorType } from 'codemirror'
import { onMounted, ref, Ref, reactive, unref } from 'vue'
import { checkJson, getJson, getConfig, setConfig } from './utils'

interface IUseJsonEditorType {
  jsonEditor: CodeEditorType | null;
  isErrorJson: Ref<boolean>;
  foldJson(): void;
  getJsonEditorValue(): string;
  setJson(): void;
  jsonOption?: any;
}

export default function (domRef: Ref<HTMLTextAreaElement | null>): IUseJsonEditorType {
  let jsonEditor!: CodeEditorType
  const isErrorJson = ref(false)

  const jsonOption = reactive(getConfig())

  onMounted(() => {
    jsonEditor = CodeMirror.fromTextArea(unref(domRef), {
      value: '',
      mode: { name: "javascript", json: true},
      lineNumbers: true,
      theme: 'eclipse',
      tabSize: 2,
      smartIndent: true, // 是否智能缩进
      // keyMap: 'vim',
      lineWrapping: true,
      foldGutter: true,
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'],
      matchBrackets: true
    })
    jsonEditor.on('blur', (e: CodeEditorType) => {
      const value = e.getValue()
      console.log(value);
      isErrorJson.value = checkJson(value)
    })
  })

  const getValue = () => {
    return jsonEditor.getValue()
  }

  const getJsonEditorValue = () => {
    const value = jsonEditor.getValue()
    console.log(value.toString() === value);
    // const json = getJson(value)
    // console.log(json);
    return value
  }

  const foldJson = () => {
    const valueString = getValue()
    const json = getJson(valueString)
    const dataString = JSON.stringify(json, null, 2)
    jsonEditor.setValue(dataString)
  }

  const setJson = () => {
    jsonEditor.setValue('')
  }

  return {
    jsonEditor,
    isErrorJson,
    foldJson,
    getJsonEditorValue,
    setJson,
    jsonOption
  }
}
