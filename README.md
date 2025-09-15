# Slomimo kaveze - Donation Page

## Project Structure

```
donation-page/
├── index.html          # Main HTML file
├── css/
│   └── styles.css      # Compiled Tailwind CSS
├── js/
│   └── script.js       # JavaScript functionality
├── input.css           # Tailwind CSS input file
├── tailwind.config.js  # Tailwind configuration
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. **Clone or download the project**
   ```bash
   cd donation-page
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```
   This will:
   - Start Tailwind CSS in watch mode
   - Launch a live development server at `http://localhost:3000`

### Alternative Commands

- **Build CSS only**: `npm run build-css`
- **Build for production**: `npm run build`
- **Development server only**: `npm run dev`

## Customization

### Colors and Theme

Edit `tailwind.config.js` to customize the color scheme:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom primary colors
        500: '#your-color',
        600: '#your-color',
        // ...
      }
    }
  }
}
```

### Custom Styles

Add custom CSS in `input.css`:

```css
@layer components {
  .your-custom-class {
    @apply your-tailwind-classes;
  }
}
```

### Content

- **Text Content**: Edit `index.html` to change text, headings, and content
- **Images**: Add images to the `images/` folder and update references in HTML
- **Contact Information**: Update contact details in the contact section

## JavaScript Features

The included JavaScript provides:

- **Smooth Scrolling**: Smooth scrolling for anchor links
- **Form Validation**: Client-side form validation
- **Donation Modal**: Interactive donation interface
- **Animations**: Scroll-triggered animations
- **Utility Functions**: Helper functions for common tasks

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers

## Deployment

### Static Hosting

1. **Build for production**:
   ```bash
   npm run build
   ```

2. **Upload files**:
   - Upload all files to your web server
   - Ensure `css/styles.css` is accessible

### GitHub Pages

1. Push your code to a GitHub repository
2. Enable GitHub Pages in repository settings
3. Select the main branch as source

## Development

### File Structure

- `index.html` - Main HTML structure
- `input.css` - Tailwind CSS input with custom styles
- `css/styles.css` - Compiled CSS (auto-generated)
- `js/script.js` - JavaScript functionality
- `tailwind.config.js` - Tailwind configuration

### Adding New Features

1. **New Pages**: Create additional HTML files
2. **New Styles**: Add to `input.css` using Tailwind classes
3. **New JavaScript**: Add functions to `script.js` or create new JS files
4. **New Images**: Add to `images/` folder and reference in HTML

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.

---

**Slomimo kaveze** - Breaking down barriers, building stronger communities.