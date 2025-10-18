<template>
  <div id="app">
    <header class="header">
      <div class="container">
        <h1 class="header__title">Legfrissebb blogbejegyzések</h1>
        <p class="header__subtitle">
          Inspirálódj közösségünk tapasztalataiból! Tippek, technikák és ötletek a 
          kézművesség szerelmeseinek.
        </p>
      </div>
    </header>

    <main class="main">
      <div class="container">
        <aside class="sidebar">
          <TagFilter 
            :available-tags="availableTags"
            :selected-tags="selectedTags"
            @tags-changed="handleTagsChanged"
          />
        </aside>

        <section class="content">
          <div class="blog-grid">
            <BlogCard 
              v-for="post in filteredPosts" 
              :key="post.id"
              :post="post"
              @tag-click="handleTagClick"
              @read-more="handleReadMore"
            />
          </div>
          
          <div v-if="filteredPosts.length === 0" class="no-results">
            <h3>Nincs találat</h3>
            <p>Próbálj meg más címkéket választani, vagy töröld a szűrőket.</p>
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script>
import BlogCard from './components/BlogCard.vue'
import TagFilter from './components/TagFilter.vue'
import { blogPosts, getAllTags } from './data/blogPosts.js'

export default {
  name: 'App',
  components: {
    BlogCard,
    TagFilter
  },
  data() {
    return {
      posts: blogPosts,
      selectedTags: []
    }
  },
  computed: {
    availableTags() {
      return getAllTags()
    },
    filteredPosts() {
      if (this.selectedTags.length === 0) {
        return this.posts
      }
      
      return this.posts.filter(post => 
        this.selectedTags.some(tag => post.tags.includes(tag))
      )
    }
  },
  methods: {
    handleTagsChanged(newTags) {
      this.selectedTags = newTags
    },
    handleTagClick(tag) {
      if (!this.selectedTags.includes(tag)) {
        this.selectedTags = [...this.selectedTags, tag]
      }
    },
    handleReadMore(postId) {
      // In a real app, this would navigate to the full post
      console.log('Read more clicked for post:', postId)
      alert(`Teljes cikk megnyitása: ${this.posts.find(p => p.id === postId)?.title}`)
    }
  }
}
</script>