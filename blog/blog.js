import { createApp, ref, computed, onMounted } from 'vue'

function slugify(text){
  return String(text).toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)+/g,'')
}

createApp({
  setup(){
    const posts = ref([])
    const selectedTags = ref(new Set())
    const activePost = ref(null)
    const dialogEl = ref(null)

    const availableTags = computed(()=>{
      const s = new Set()
      posts.value.forEach(p => (p.tags||[]).forEach(t => s.add(t)))
      return Array.from(s).sort()
    })

    const filteredPosts = computed(()=>{
      if(!selectedTags.value.size) return posts.value
      return posts.value.filter(p => (p.tags||[]).some(t => selectedTags.value.has(t)))
    })

    function toggleTag(tag){
      if(selectedTags.value.has(tag)) selectedTags.value.delete(tag)
      else selectedTags.value.add(tag)
      selectedTags.value = new Set(selectedTags.value) // trigger
    }
    function clearTags(){ selectedTags.value = new Set() }

    function tagColor(tag){
      const map = {
        'Kötés':'#a855f7', 'Horgolás':'#7c3aed', 'Hímzés':'#db2777', 'Szövés':'#2563eb'
      }
      return map[tag] || '#7c3aed'
    }

    function formatDate(iso){
      const d = new Date(iso)
      return d.toLocaleDateString('hu-HU', { year:'numeric', month:'2-digit', day:'2-digit' })
    }

    function openPost(post){
      activePost.value = post
      dialogEl.value?.showModal()
    }
    function closePost(){ dialogEl.value?.close() }

    onMounted(async ()=>{
      const res = await fetch('./data/posts.json')
      const data = await res.json()
      posts.value = data.map((p,idx)=>({
        id: p.id ?? idx+1,
        title: p.title,
        excerpt: p.excerpt,
        content: p.content,
        author: p.author,
        dateISO: p.dateISO,
        readMins: p.readMins,
        tags: p.tags,
        primaryTag: p.tags?.[0] ?? 'Egyéb',
        cover: p.cover ?? `https://picsum.photos/seed/${slugify(p.title)}/800/500`
      }))
    })

    return {
      // state
      posts, selectedTags, availableTags, filteredPosts, activePost, dialogEl,
      // methods
      toggleTag, clearTags, openPost, closePost, tagColor, formatDate,
    }
  }
}).mount('#app')
