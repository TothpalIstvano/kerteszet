# Quick Start Guide

## Getting Started

Your Vue.js blog system with tags is ready to use! Here's how to get it running:

### 1. Start Development Server

```bash
npm run dev
```

Then open your browser to the URL shown (typically `http://localhost:5173`)

### 2. What You'll See

- **Main Header**: "Legfrissebb blogbejegyzések" with a subtitle
- **Tag Filter Bar**: Click on tags to filter posts, or "Összes" to see all posts
- **Blog Cards**: Each card shows:
  - Featured image
  - Tag badges
  - Post title and excerpt
  - Author name, date, and reading time
  - Like and comment counts
  - "Olvass tovább →" (Read more) link

### 3. Key Features

#### Tag Filtering
Click any tag in the filter bar to show only posts with that tag. Click "Összes" to reset.

#### Responsive Design
The layout automatically adjusts for:
- Desktop: 2-column grid
- Tablet: 2-column or 1-column
- Mobile: Single column

#### Hover Effects
- Cards lift up and grow shadows on hover
- Images zoom slightly
- Read more link changes color

### 4. Customization

#### Change Blog Posts
Edit `src/data/blogData.js`:
- Modify existing posts
- Add new posts to the `blogPosts` array
- Update the `allTags` array for new tag categories

#### Change Colors
- Tag colors: `src/components/BlogTag.vue`
- Background gradient: `src/App.vue` (line 12)
- Card styles: `src/components/BlogCard.vue`

#### Change Text
- Header text: `src/components/BlogList.vue` (lines 3-6)
- Button labels: Same file, in the filter section

### 5. Production Build

When ready to deploy:

```bash
npm run build
```

Files will be in the `dist/` directory, ready to deploy to any static hosting service.

## Troubleshooting

**Port already in use?**
- Vite will automatically try the next available port

**Missing packages?**
- Run `npm install` again

**Build errors?**
- Check that all files are saved
- Verify Node.js version is 16+ with `node --version`

## Next Steps

Consider adding:
- Individual blog post pages
- Search functionality
- Pagination for many posts
- Dark mode toggle
- Social sharing buttons
- RSS feed
- Comments system
