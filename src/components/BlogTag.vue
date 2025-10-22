<template>
  <span class="blog-tag" :style="{ backgroundColor: color }">
    {{ tag }}
  </span>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tag: {
    type: String,
    required: true
  }
})

// Generate a color based on the tag name for visual distinction
const color = computed(() => {
  const colors = {
    'Kávés': '#8b5cf6',
    'Horgolás': '#a855f7',
    'Kézművesség': '#7c3aed',
    'DIY': '#6d28d9',
    'Kötés': '#9333ea',
    'Kezdő': '#a78bfa'
  }
  return colors[props.tag] || '#8b5cf6'
})
</script>

<style scoped>
.blog-tag {
  display: inline-block;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 500;
  color: white;
  margin-right: 8px;
  margin-bottom: 8px;
}
</style>
