<template>
  <div>
    <div class="header container">
      <h1>Legfrissebb blogbejegyzések</h1>
      <p>Inspirálódj közösségünk tapasztalataiból! Tippek, technikák és ötletek a kézművesség szerelmeseinek.</p>
    </div>

    <div class="tags container">
      <button
        v-for="t in tags"
        :key="t"
        class="tag"
        :class="{ active: selectedTag === t }"
        @click="selectTag(t)"
      >
        {{ t }}
      </button>
    </div>

    <div class="container grid">
      <article
        v-for="p in filteredPosts"
        :key="p.id"
        class="card"
      >
        <div class="card-media" style="position:relative">
          <span class="badge">{{ p.tag }}</span>
        </div>
        <div class="card-body">
          <h3 class="card-title">{{ p.title }}</h3>
          <p class="card-excerpt">{{ p.excerpt }}</p>
          <div class="card-meta">
            <span>👤 {{ p.author }}</span>
            <span>📅 {{ formatDate(p.date) }}</span>
            <span>⏱️ {{ p.readMins }} perc</span>
          </div>
        </div>
        <div class="card-footer">
          <div class="card-meta">
            <span>❤️ {{ p.likes }}</span>
            <span>💬 {{ p.comments }}</span>
          </div>
          <RouterLink class="link" :to="{ name: 'post', params: { slug: p.slug } }">Olvass tovább →</RouterLink>
        </div>
      </article>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { posts, allTags } from '../data/posts';

const tags = allTags;
const selectedTag = ref('Összes');

const selectTag = (t) => { selectedTag.value = t; };

const filteredPosts = computed(() => {
  if (selectedTag.value === 'Összes') return posts;
  return posts.filter(p => p.tag === selectedTag.value);
});

const formatDate = (iso) => new Date(iso).toLocaleDateString('hu-HU');
</script>
