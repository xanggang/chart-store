<template>
  <a-layout class="h-[100vh] w-[100vw]">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
          theme="dark"
          mode="horizontal"
          v-model:selectedKeys="selectedKeys1"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1">列表</a-menu-item>
        <a-menu-item key="2">添加</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout>
      <a-layout style="padding: 24px">
        <a-layout-content
            :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '280px' }"
        >
          <router-view></router-view>
        </a-layout-content>
      </a-layout>
    </a-layout>
  </a-layout>
</template>
