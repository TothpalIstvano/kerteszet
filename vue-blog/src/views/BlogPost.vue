<template>
  <div class="container">
    <RouterLink class="link" to="/">← Vissza</RouterLink>
    <h1 style="margin-top:8px">{{ post?.title }}</h1>
    <div style="color:#6b7280; margin: 8px 0 16px; display:flex; gap:16px">
      <span class="tag" style="background:#ede9fe;border-color:#ede9fe">{{ post?.tag }}</span>
      <span>👤 {{ post?.author }}</span>
      <span>📅 {{ post && formatDate(post.date) }}</span>
      <span>⏱️ {{ post?.readMins }} perc</span>
    </div>
    <div class="card-media" style="border-radius:12px"></div>
    <p style="font-size:18px;line-height:1.7;margin-top:16px">{{ post?.content }}</p>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, RouterLink } from 'vue-router';
import { posts } from '../data/posts';

const route = useRoute();
const post = computed(() => posts.find(p => p.slug === route.params.slug));
const formatDate = (iso) => new Date(iso).toLocaleDateString('hu-HU');
</script>
