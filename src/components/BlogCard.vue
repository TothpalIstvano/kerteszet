<template>
  <article class="blog-card">
    <div class="card-image">
      <img :src="post.image" :alt="post.title" />
      <div class="tags-overlay">
        <BlogTag v-for="tag in post.tags" :key="tag" :tag="tag" />
      </div>
    </div>
    
    <div class="card-content">
      <h3 class="card-title">{{ post.title }}</h3>
      <p class="card-excerpt">{{ post.excerpt }}</p>
      
      <div class="card-meta">
        <div class="meta-info">
          <span class="author">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            {{ post.author }}
          </span>
          <span class="date">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
              <line x1="16" y1="2" x2="16" y2="6"></line>
              <line x1="8" y1="2" x2="8" y2="6"></line>
              <line x1="3" y1="10" x2="21" y2="10"></line>
            </svg>
            {{ post.date }}
          </span>
          <span class="reading-time">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            {{ post.readingTime }}
          </span>
        </div>
      </div>
      
      <div class="card-footer">
        <div class="engagement">
          <span class="likes">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
            {{ post.likes }}
          </span>
          <span class="comments">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
            </svg>
            {{ post.comments }}
          </span>
        </div>
        <a href="#" class="read-more">
          Olvass tovább →
        </a>
      </div>
    </div>
  </article>
</template>

<script setup>
import BlogTag from './BlogTag.vue'

defineProps({
  post: {
    type: Object,
    required: true
  }
})
</script>

<style scoped>
.blog-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
}

.card-image {
  position: relative;
  height: 240px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.blog-card:hover .card-image img {
  transform: scale(1.05);
}

.tags-overlay {
  position: absolute;
  top: 16px;
  left: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}

.card-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.card-excerpt {
  color: #6b7280;
  line-height: 1.6;
  margin: 0 0 20px 0;
  font-size: 14px;
  flex: 1;
}

.card-meta {
  margin-bottom: 20px;
}

.meta-info {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 13px;
  color: #6b7280;
  flex-wrap: wrap;
}

.meta-info span {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-info svg {
  opacity: 0.6;
}

.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 20px;
  border-top: 1px solid #e5e7eb;
}

.engagement {
  display: flex;
  gap: 16px;
  align-items: center;
}

.likes,
.comments {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #6b7280;
  font-size: 14px;
}

.likes svg,
.comments svg {
  opacity: 0.7;
}

.read-more {
  color: #8b5cf6;
  text-decoration: none;
  font-weight: 600;
  font-size: 14px;
  transition: color 0.2s ease;
}

.read-more:hover {
  color: #7c3aed;
}
</style>
