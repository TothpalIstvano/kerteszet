<template>
  <div class="app">
    <BlogList />
  </div>
</template>

<script setup>
import BlogList from './components/BlogList.vue'
</script>

<style scoped>
.app {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 60px 20px;
}
</style>
