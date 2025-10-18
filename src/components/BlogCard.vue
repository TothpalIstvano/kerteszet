<template>
  <article class="blog-card">
    <div class="blog-card__image">
      <img :src="post.image" :alt="post.title" />
    </div>
    <div class="blog-card__content">
      <div class="blog-card__tags">
        <span 
          v-for="tag in post.tags" 
          :key="tag" 
          class="tag"
          :class="getTagClass(tag)"
          @click="$emit('tagClick', tag)"
        >
          {{ tag }}
        </span>
      </div>
      <h2 class="blog-card__title">{{ post.title }}</h2>
      <p class="blog-card__excerpt">{{ post.excerpt }}</p>
      <div class="blog-card__meta">
        <div class="blog-card__author-date">
          <span class="author">{{ post.author }}</span>
          <span class="date">{{ post.date }}</span>
          <span class="read-time">{{ post.readTime }}</span>
        </div>
        <div class="blog-card__stats">
          <button class="stat-button" @click="toggleLike">
            <span class="icon">❤️</span>
            <span>{{ post.likes }}</span>
          </button>
          <button class="stat-button">
            <span class="icon">💬</span>
            <span>{{ post.comments }}</span>
          </button>
        </div>
      </div>
      <div class="blog-card__actions">
        <button class="read-more-btn" @click="$emit('readMore', post.id)">
          Olvass tovább →
        </button>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'BlogCard',
  props: {
    post: {
      type: Object,
      required: true
    }
  },
  emits: ['tagClick', 'readMore'],
  methods: {
    getTagClass(tag) {
      const tagClasses = {
        'Kötés': 'tag--knitting',
        'Horgolás': 'tag--crochet',
        'Dekoráció': 'tag--decoration',
        'Kezdő': 'tag--beginner',
        'Tavaszi': 'tag--spring',
        'Őszi': 'tag--autumn',
        'DIY': 'tag--diy',
        'Pulóver': 'tag--sweater',
        'Makramé': 'tag--macrame',
        'Modern': 'tag--modern',
        'Hímzés': 'tag--embroidery',
        'Kézművesség': 'tag--crafts'
      }
      return tagClasses[tag] || 'tag--default'
    },
    toggleLike() {
      // In a real app, this would make an API call
      this.post.likes += 1
    }
  }
}
</script>