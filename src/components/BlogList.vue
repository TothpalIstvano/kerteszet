<template>
  <div class="blog-list-container">
    <header class="blog-header">
      <h1 class="main-title">Legfrissebb blogbejegyzések</h1>
      <p class="subtitle">
        Inspirálódj közösségünk tapasztalataiból! Tippek, technikák és ötletek a kézművesség szerelmeseinek.
      </p>
    </header>

    <div class="filter-section">
      <div class="tags-filter">
        <button
          class="filter-tag"
          :class="{ active: selectedTag === null }"
          @click="selectedTag = null"
        >
          Összes
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          class="filter-tag"
          :class="{ active: selectedTag === tag }"
          @click="selectedTag = tag"
        >
          {{ tag }}
        </button>
      </div>
    </div>

    <div class="blog-grid">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </div>

    <div v-if="filteredPosts.length === 0" class="no-results">
      <p>Nincs blogbejegyzés ezzel a címkével.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BlogCard from './BlogCard.vue'
import { blogPosts, allTags } from '../data/blogData.js'

const selectedTag = ref(null)

const filteredPosts = computed(() => {
  if (selectedTag.value === null) {
    return blogPosts
  }
  return blogPosts.filter(post => post.tags.includes(selectedTag.value))
})
</script>

<style scoped>
.blog-list-container {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 50px;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  color: white;
  margin: 0 0 16px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.subtitle {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.95);
  line-height: 1.6;
  max-width: 700px;
  margin: 0 auto;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.filter-section {
  margin-bottom: 40px;
}

.tags-filter {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 12px;
}

.filter-tag {
  padding: 10px 24px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.1);
  color: white;
  border-radius: 25px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.filter-tag:hover {
  background: rgba(255, 255, 255, 0.2);
  border-color: rgba(255, 255, 255, 0.5);
  transform: translateY(-2px);
}

.filter-tag.active {
  background: white;
  color: #8b5cf6;
  border-color: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

@media (max-width: 1024px) {
  .blog-grid {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  }
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
  
  .main-title {
    font-size: 36px;
  }
  
  .subtitle {
    font-size: 16px;
  }
}

.no-results {
  text-align: center;
  padding: 60px 20px;
  color: white;
  font-size: 18px;
}
</style>
