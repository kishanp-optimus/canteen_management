# ICAS Assets Guide

This folder contains assets for the ICAS (Intelligent Canteen Automation System) application.

## Folder Structure

```
assets/
├── images/           # All image assets
│   ├── logo/         # Logo files
│   ├── dishes/       # Dish images
│   └── icons/        # UI icons
└── README.md         # This file
```

## What to Add

### 1. Logo Files (`images/logo/`)
- `logo.png` - Main logo (recommended: 200x200px)
- `logo-white.png` - White version for dark backgrounds
- `favicon.ico` - Browser favicon (32x32px)

### 2. Dish Images (`images/dishes/`)
Replace emoji placeholders with actual dish images:
- `veg-thali.jpg` - Veg Thali image (400x300px)
- `paneer-bowl.jpg` - Paneer Bowl image
- `noodles.jpg` - Noodles image
- `masala-chai.jpg` - Masala Chai image
- `veg-sandwich.jpg` - Veg Sandwich image
- `cold-coffee.jpg` - Cold Coffee image
- `samosa.jpg` - Samosa image
- `chole-bhature.jpg` - Chole Bhature image

**Recommended specifications:**
- Format: JPEG or WebP (for smaller file size)
- Resolution: 400x300px or 2:3 aspect ratio
- File size: Under 100KB each

### 3. Icons (`images/icons/`)
Optional custom icons to replace emojis:
- `cart.svg` - Shopping cart icon
- `user.svg` - User profile icon
- `menu.svg` - Menu/hamburger icon
- `order.svg` - Orders icon
- `vote.svg` - Voting icon
- `dashboard.svg` - Dashboard icon

**Recommended specifications:**
- Format: SVG (scalable)
- Size: 24x24px base

## Using Images in Components

To use images instead of emojis, update the MenuCard component:

```jsx
// Instead of:
<span className="dish-emoji">{item.emoji}</span>

// Use:
<img 
  src={`/assets/images/dishes/${item.slug}.jpg`} 
  alt={item.name}
  className="dish-image"
/>
```

## Image Optimization Tips

1. Use WebP format for 25-35% smaller file sizes
2. Compress images with tools like TinyPNG or Squoosh
3. Consider using lazy loading for better performance
4. Provide multiple resolutions for responsive design

## Placeholder Service

For development, you can use placeholder image services:
- https://placehold.co/400x300/FF6B35/white?text=Dish+Name
- https://picsum.photos/400/300

Example:
```jsx
<img src="https://placehold.co/400x300/FF6B35/white?text=Veg+Thali" alt="Veg Thali" />
```
