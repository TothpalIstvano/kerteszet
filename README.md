# Vue.js Blog System with Tags

A modern, responsive blog system built with Vue 3 and Vite, featuring a tag-based filtering system and beautiful card-based layout.

## Features

- 📝 Blog post cards with images, titles, excerpts, and metadata
- 🏷️ Tag-based filtering system
- 👤 Author information with avatars
- 📅 Publication dates
- ⏱️ Reading time estimates
- ❤️ Like and comment counters
- 📱 Fully responsive design
- 🎨 Beautiful gradient background with glassmorphism effects

## Project Structure

```
/workspace/
├── index.html              # Main HTML entry point
├── package.json            # Dependencies and scripts
├── vite.config.js          # Vite configuration
└── src/
    ├── main.js             # Application entry point
    ├── App.vue             # Root component
    ├── style.css           # Global styles
    ├── components/
    │   ├── BlogList.vue    # Main blog list with filtering
    │   ├── BlogCard.vue    # Individual blog post card
    │   └── BlogTag.vue     # Tag badge component
    └── data/
        └── blogData.js     # Blog posts and tags data
```

## Installation

1. Install dependencies:
```bash
npm install
```

## Development

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

## Customization

### Adding New Blog Posts

Edit `src/data/blogData.js` and add new post objects to the `blogPosts` array:

```javascript
{
  id: 5,
  title: 'Your Blog Title',
  excerpt: 'Your blog excerpt...',
  author: 'Author Name',
  date: '2024.03.20',
  readingTime: '5 perc',
  likes: 0,
  comments: 0,
  tags: ['Tag1', 'Tag2'],
  image: 'https://your-image-url.com/image.jpg'
}
```

### Adding New Tags

Add new tags to the `allTags` array in `src/data/blogData.js` and optionally customize their colors in `src/components/BlogTag.vue`.

## Technologies Used

- **Vue 3** - Progressive JavaScript framework
- **Vite** - Next-generation frontend tooling
- **CSS3** - Modern styling with Grid and Flexbox
- **Google Fonts (Inter)** - Beautiful typography

## License

MIT
