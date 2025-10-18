<template>
  <div class="tag-filter">
    <h3 class="tag-filter__title">Szűrés címkék szerint</h3>
    <div class="tag-filter__tags">
      <button 
        class="tag-filter__tag"
        :class="{ 'tag-filter__tag--active': selectedTags.length === 0 }"
        @click="clearFilters"
      >
        Összes
      </button>
      <button 
        v-for="tag in availableTags" 
        :key="tag"
        class="tag-filter__tag"
        :class="{ 'tag-filter__tag--active': selectedTags.includes(tag) }"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </button>
    </div>
    <div v-if="selectedTags.length > 0" class="tag-filter__clear">
      <button @click="clearFilters" class="clear-btn">
        Szűrők törlése
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TagFilter',
  props: {
    availableTags: {
      type: Array,
      required: true
    },
    selectedTags: {
      type: Array,
      default: () => []
    }
  },
  emits: ['tagsChanged'],
  methods: {
    toggleTag(tag) {
      const newTags = [...this.selectedTags]
      const index = newTags.indexOf(tag)
      
      if (index > -1) {
        newTags.splice(index, 1)
      } else {
        newTags.push(tag)
      }
      
      this.$emit('tagsChanged', newTags)
    },
    clearFilters() {
      this.$emit('tagsChanged', [])
    }
  }
}
</script>