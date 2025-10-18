# Vue.js Blog System with Tags

A modern, responsive blog system built with Vue.js 3 and Vite, featuring tag-based filtering and a beautiful Hungarian craft-focused design.

## Features

- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile
- 🏷️ **Tag-based Filtering** - Filter blog posts by multiple tags
- ❤️ **Interactive Elements** - Like posts and view comment counts
- 🎨 **Modern UI** - Beautiful gradient design with smooth animations
- 🇭🇺 **Hungarian Content** - Sample content focused on crafts and DIY projects
- ⚡ **Fast Performance** - Built with Vite for optimal development and build speed

## Tech Stack

- **Vue.js 3** - Progressive JavaScript framework
- **Vite** - Next generation frontend tooling
- **CSS3** - Modern styling with Grid, Flexbox, and animations
- **JavaScript ES6+** - Modern JavaScript features

## Project Structure

```
src/
├── components/
│   ├── BlogCard.vue      # Individual blog post card component
│   └── TagFilter.vue     # Tag filtering sidebar component
├── data/
│   └── blogPosts.js      # Sample blog post data
├── App.vue               # Main application component
├── main.js              # Application entry point
└── style.css            # Global styles and component styling
```

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Features in Detail

### Tag System
- Click on any tag to filter posts
- Multiple tags can be selected for combined filtering
- Easy clear filters functionality
- Color-coded tags for different categories

### Blog Cards
- Responsive card layout with images
- Author information and publication dates
- Like and comment count display
- "Read more" functionality (ready for routing integration)
- Hover effects and smooth animations

### Responsive Design
- Mobile-first approach
- Flexible grid system
- Optimized for all screen sizes
- Touch-friendly interface

## Customization

### Adding New Blog Posts
Edit `src/data/blogPosts.js` to add new posts:

```javascript
{
  id: 7,
  title: "Your Post Title",
  excerpt: "Brief description...",
  content: "Full content...",
  author: "Author Name",
  date: "2024.03.20",
  readTime: "5 perc",
  likes: 0,
  comments: 0,
  tags: ["Tag1", "Tag2"],
  image: "https://your-image-url.jpg"
}
```

### Styling
The design uses CSS custom properties and can be easily customized by modifying the color schemes in `src/style.css`.

### Tag Colors
Tag colors are defined in the CSS with specific classes. Add new tag color schemes by extending the tag color definitions.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.