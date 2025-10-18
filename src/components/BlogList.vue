<template>
  <div class="blog-list-container">
    <header class="blog-header">
      <h1 class="main-title">Legfrissebb blogbejegyzések</h1>
      <p class="subtitle">
        Inspirálódj közösségünk tapasztalataiból! Tippek, technikák és ötletek a kézművesség szerelmeseinek.
      </p>
    </header>

    <BlogStats />

    <div class="controls-section">
      <div class="search-bar">
        <svg class="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"></circle>
          <path d="m21 21-4.35-4.35"></path>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Keresés blogbejegyzések között..."
          class="search-input"
        />
      </div>

      <div class="sort-controls">
        <label class="sort-label">Rendezés:</label>
        <select v-model="sortBy" class="sort-select">
          <option value="date">Dátum</option>
          <option value="likes">Kedvelések</option>
          <option value="comments">Hozzászólások</option>
        </select>
      </div>
    </div>

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

    <div class="results-info">
      <p>{{ filteredPosts.length }} bejegyzés találva</p>
    </div>

    <transition-group name="blog-list" tag="div" class="blog-grid">
      <BlogCard
        v-for="post in filteredPosts"
        :key="post.id"
        :post="post"
      />
    </transition-group>

    <div v-if="filteredPosts.length === 0" class="no-results">
      <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
      <p>Nincs blogbejegyzés a keresési feltételeknek megfelelően.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import BlogCard from './BlogCard.vue'
import BlogStats from './BlogStats.vue'
import { blogPosts, allTags } from '../data/blogData.js'

const selectedTag = ref(null)
const searchQuery = ref('')
const sortBy = ref('date')

const filteredPosts = computed(() => {
  let posts = [...blogPosts]

  // Filter by tag
  if (selectedTag.value !== null) {
    posts = posts.filter(post => post.tags.includes(selectedTag.value))
  }

  // Filter by search query
  if (searchQuery.value.trim()) {
    const query = searchQuery.value.toLowerCase()
    posts = posts.filter(post =>
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query) ||
      post.tags.some(tag => tag.toLowerCase().includes(query))
    )
  }

  // Sort posts
  posts.sort((a, b) => {
    switch (sortBy.value) {
      case 'likes':
        return b.likes - a.likes
      case 'comments':
        return b.comments - a.comments
      case 'date':
      default:
        // Convert date format "2024.03.15" to comparable format
        const dateA = new Date(a.date.split('.').reverse().join('-'))
        const dateB = new Date(b.date.split('.').reverse().join('-'))
        return dateB - dateA
    }
  })

  return posts
})
</script>

<style scoped>
.blog-list-container {
  max-width: 1200px;
  margin: 0 auto;
}

.blog-header {
  text-align: center;
  margin-bottom: 40px;
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

.controls-section {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
}

.search-bar {
  position: relative;
  flex: 1;
  min-width: 280px;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: #9ca3af;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 14px 16px 14px 48px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  font-size: 15px;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
}

.search-input::placeholder {
  color: #9ca3af;
}

.search-input:focus {
  border-color: white;
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.sort-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255, 255, 255, 0.1);
  padding: 8px 16px;
  border-radius: 12px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  backdrop-filter: blur(10px);
}

.sort-label {
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.sort-select {
  padding: 6px 12px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  background: rgba(255, 255, 255, 0.95);
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
  transition: all 0.2s ease;
}

.sort-select:hover {
  background: white;
  border-color: white;
}

.filter-section {
  margin-bottom: 30px;
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

.results-info {
  text-align: center;
  margin-bottom: 20px;
}

.results-info p {
  color: rgba(255, 255, 255, 0.9);
  font-size: 15px;
  font-weight: 500;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(450px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

/* Transition animations */
.blog-list-enter-active,
.blog-list-leave-active {
  transition: all 0.4s ease;
}

.blog-list-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.blog-list-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}

.blog-list-move {
  transition: transform 0.4s ease;
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

  .controls-section {
    flex-direction: column;
  }

  .search-bar {
    width: 100%;
  }

  .sort-controls {
    width: 100%;
    justify-content: space-between;
  }
}

.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 80px 20px;
  color: white;
  font-size: 18px;
}

.no-results svg {
  margin-bottom: 20px;
  opacity: 0.7;
}

.no-results p {
  margin: 0;
  font-weight: 500;
}
</style>
