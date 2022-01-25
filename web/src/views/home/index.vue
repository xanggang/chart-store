<template>
  <div class="h-full w-full">
    <div>
      <a-form
          layout="inline"
          :model="formState"
      >

        <a-form-item label="图表类型">
          <a-select
              ref="select"
              style="width: 120px"
          >
            <a-select-option value="白">白</a-select-option>
            <a-select-option value="黑">黑</a-select-option>
          </a-select>
        </a-form-item>

        <a-form-item label="风格">
          <a-select
              ref="select"
              style="width: 120px"
          >
            <a-select-option value="白">白</a-select-option>
            <a-select-option value="黑">黑</a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item label="上传者">
          <a-input></a-input>
        </a-form-item>

        <a-form-item>
          <a-button
              type="primary"
              html-type="submit"
          >
            搜索
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <div class="w-full mt-[20px]">

      <a-row :gutter="[16, 16]">
        <a-col :xs="12" :sm="12" :md="8" :lg="6" :xl="4"  v-for="item in 20">
          <Card></Card>
        </a-col>
      </a-row>

    </div>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons-vue';
import { defineComponent, reactive, ref } from 'vue';
import Card from './Card.vue'
export default defineComponent({
  components: {
    Card
  },
  setup() {
    const formState = reactive({
      style: ''
    })
    return {
      formState
    };
  },
});
</script>

<style>
#components-layout-demo-top-side-2 .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
