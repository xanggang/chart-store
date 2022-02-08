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

const mock = "option = {\n    backgroundColor: '#080b30',\n    title: {\n        text: '哎呦,不错哦',\n        textStyle: {\n            align: 'center',\n            color: '#fff',\n            fontSize: 20,\n        },\n        top: '5%',\n        left: 'center',\n    },\n    tooltip: {\n        trigger: 'axis',\n        axisPointer: {\n            lineStyle: {\n                color: {\n                    type: 'linear',\n                    x: 0,\n                    y: 0,\n                    x2: 0,\n                    y2: 1,\n                    colorStops: [{\n                        offset: 0,\n                        color: 'rgba(0, 255, 233,0)'\n                    }, {\n                        offset: 0.5,\n                        color: 'rgba(255, 255, 255,1)',\n                    }, {\n                        offset: 1,\n                        color: 'rgba(0, 255, 233,0)'\n                    }],\n                    global: false\n                }\n            },\n        },\n    },\n    grid: {\n        top: '15%',\n        left: '5%',\n        right: '5%',\n        bottom: '15%',\n        // containLabel: true\n    },\n    xAxis: [{\n        type: 'category',\n        axisLine: {\n            show: true\n        },\n        splitArea: {\n            // show: true,\n            color: '#f00',\n            lineStyle: {\n                color: '#f00'\n            },\n        },\n        axisLabel: {\n            color: '#fff'\n        },\n        splitLine: {\n            show: false\n        },\n        boundaryGap: false,\n        data: ['A', 'B', 'C', 'D', 'E', 'F'],\n\n    }],\n\n    yAxis: [{\n        type: 'value',\n        min: 0,\n        // max: 140,\n        splitNumber: 4,\n        splitLine: {\n            show: true,\n            lineStyle: {\n                color: 'rgba(255,255,255,0.1)'\n            }\n        },\n        axisLine: {\n            show: false,\n        },\n        axisLabel: {\n            show: false,\n            margin: 20,\n            textStyle: {\n                color: '#d1e6eb',\n\n            },\n        },\n        axisTick: {\n            show: false,\n        },\n    }],\n    series: [{\n            name: '注册总量',\n            type: 'line',\n            // smooth: true, //是否平滑\n            showAllSymbol: true,\n            // symbol: 'image://./static/images/guang-circle.png',\n            symbol: 'circle',\n            symbolSize: 25,\n            lineStyle: {\n                normal: {\n                    color: \"#6c50f3\",\n                    shadowColor: 'rgba(0, 0, 0, .3)',\n                    shadowBlur: 0,\n                    shadowOffsetY: 5,\n                    shadowOffsetX: 5,\n                },\n            },\n            label: {\n                show: true,\n                position: 'top',\n                textStyle: {\n                    color: '#6c50f3',\n                }\n            },\n            itemStyle: {\n                color: \"#6c50f3\",\n                 borderColor: \"#fff\",\n                borderWidth: 3,\n                shadowColor: 'rgba(0, 0, 0, .3)',\n                shadowBlur: 0,\n                shadowOffsetY: 2,\n                shadowOffsetX: 2,\n            },\n            tooltip: {\n                show: false\n            },\n            areaStyle: {\n                normal: {\n                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n                            offset: 0,\n                            color: 'rgba(108,80,243,0.3)'\n                        },\n                        {\n                            offset: 1,\n                            color: 'rgba(108,80,243,0)'\n                        }\n                    ], false),\n                    shadowColor: 'rgba(108,80,243, 0.9)',\n                    shadowBlur: 20\n                }\n            },\n            data: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02, ]\n        },\n        {\n            name: '注册总量',\n            type: 'line',\n            // smooth: true, //是否平滑\n            showAllSymbol: true,\n            // symbol: 'image://./static/images/guang-circle.png',\n            symbol: 'circle',\n            symbolSize: 25,\n            lineStyle: {\n                normal: {\n                    color: \"#00ca95\",\n                    shadowColor: 'rgba(0, 0, 0, .3)',\n                    shadowBlur: 0,\n                    shadowOffsetY: 5,\n                    shadowOffsetX: 5,\n                },\n            },\n            label: {\n                show: true,\n                position: 'top',\n                textStyle: {\n                    color: '#00ca95',\n                }\n            },\n\n            itemStyle: {\n                color: \"#00ca95\",\n                borderColor: \"#fff\",\n                borderWidth: 3,\n                shadowColor: 'rgba(0, 0, 0, .3)',\n                shadowBlur: 0,\n                shadowOffsetY: 2,\n                shadowOffsetX: 2,\n            },\n            tooltip: {\n                show: false\n            },\n            areaStyle: {\n                normal: {\n                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{\n                            offset: 0,\n                            color: 'rgba(0,202,149,0.3)'\n                        },\n                        {\n                            offset: 1,\n                            color: 'rgba(0,202,149,0)'\n                        }\n                    ], false),\n                    shadowColor: 'rgba(0,202,149, 0.9)',\n                    shadowBlur: 20\n                }\n            },\n            data: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14, ],\n        },\n    ]\n};"

export default function (domRef: Ref<HTMLTextAreaElement | null>): IUseJsonEditorType {
  let jsonEditor!: CodeEditorType
  const isErrorJson = ref(false)

  const jsonOption = reactive(getConfig())

  console.log(mock);

  onMounted(() => {
    jsonEditor = CodeMirror.fromTextArea(unref(domRef), {
      value: '12333',
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
    // jsonEditor.on('blur', (e: CodeEditorType) => {
    //   const value = e.getValue()
    //   console.log(value);
    //   isErrorJson.value = checkJson(value)
    // })
  })

  const getValue = () => {
    return jsonEditor.getValue()
  }

  const getJsonEditorValue = () => {
    const value = jsonEditor.getValue()
    console.log(value.toString());
    return value
  }

  const foldJson = () => {
    const valueString = getValue()
    const json = getJson(valueString)
    const dataString = JSON.stringify(json, null, 2)
    jsonEditor.setValue(dataString)
  }

  const setJson = () => {
    jsonEditor.setValue(mock)
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
