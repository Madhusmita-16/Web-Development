# FITFORGE - Fitness & Wellness Website

A modern, premium, fully responsive Gym & Fitness Website built with HTML5, CSS3, JavaScript, and Bootstrap 5.

## Features

- **Modern UI**: Dark theme with neon accents and clean typography (Outfit font).
- **Fully Responsive**: Adapts seamlessly from mobile devices to large desktop screens.
- **Scroll Animations**: Elements gracefully animate into view as you scroll down.
- **Sticky Navbar**: Transparent navbar that becomes solid and sticky on scroll.
- **Interactive BMI Calculator**: Users can calculate their BMI with live validation and result categories.
- **Testimonials Carousel**: Smooth sliding carousel for user reviews.
- **Pricing & Schedule**: Detailed pricing cards and a responsive timetable.

## Technology Stack

- **HTML5** (Semantic structure)
- **CSS3** (Custom styling, Flexbox/Grid, Animations)
- **JavaScript** (Vanilla JS for DOM manipulation, scrolling, calculator, validation)
- **Bootstrap 5.3.2** (Grid system, utility classes, carousel component)
- **Font Awesome 6** (Icons)
- **Google Fonts** (Outfit)

## File Structure

```text
fitness-website/
│
├── index.html            # Main HTML file
├── css/
│   └── style.css         # Custom CSS styles
├── js/
│   └── script.js         # Custom JavaScript functionality
├── images/               # Directory for all images
│   ├── hero.jpg          # Hero background image
│   ├── gym.jpg           # About section gym image
│   └── trainers/         # Trainer profile images
│       ├── alex.jpg
│       ├── sarah.jpg
│       ├── daniel.jpg
│       └── emma.jpg
└── README.md             # Project documentation
```

## Setup Instructions

1. Clone or download this repository.
2. Open the `fitness-website` folder.
3. Ensure you add your own images in the `images` directory matching the names in the HTML, or update the image paths/placeholders in `index.html` and `css/style.css` (specifically for `hero.jpg`).
4. Open `index.html` in your web browser (or use a local server like Live Server for VS Code) to view the website.

## Design Notes

- The website relies on CSS variables for theming, making it easy to change the primary accent color or background colors in `style.css`.
- Scroll reveal animations are handled by adding `.active` classes to elements when they enter the viewport via JS.
- The BMI calculator does basic mathematical validation but is intended as an informational tool.
