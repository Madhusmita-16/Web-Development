# NEXORA — Next-Generation Modern SaaS Social Media Platform

NEXORA is a 2026-inspired, ultra-premium, fully responsive **SaaS Social Media Web Application** built using **HTML5, CSS3, Vanilla JavaScript (ES6+), and Bootstrap 5**.

---

## 🎨 Visual Design & Motion System

* **Glassmorphism & Backdrop Blur:** Translucent glass cards (`backdrop-filter: blur(24px)`), subtle shadows, soft rounded corners, and gradient glowing borders.
* **Animated Background Blobs:** Floating, blurred radial gradient background circles creating a deep, dynamic visual atmosphere.
* **Scroll Animations:** Built using **Vanilla JavaScript `IntersectionObserver`** for smooth feed post entrance reveals (`translateY(30px) -> translateY(0)`).
* **Micro-interactions:** Particle burst animations on Likes, button scale/glow effects, story card zoom on hover, animated gradient story rings, and toast notifications.
* **Dark & Light Mode:** Seamless theme switching with persistent `localStorage` preference state (`[data-theme="dark"]`).

---

## 📱 Features Overview

- **Floating Glass Navbar:** Search input, animated active indicators, notifications dropdown with unread badge count, Messenger toggle, Theme toggle, and Profile avatar.
- **Glass Profile Sidebar:** Animated gradient avatar ring, user stats, and navigation menu links.
- **Horizontal Stories Bar:** Scrollable story cards with glowing gradient rings and full-screen story viewer.
- **Create Post Modal & Feed:** Post creation modal supporting text and image attachments. New posts animate smoothly onto the top of the feed.
- **Interactive Feed Cards:** Like button particle effects, expandable comment section, and Share modal with Clipboard API copy link.
- **Floating Messenger Panel:** Bottom-right glass messenger panel with live messaging and simulated automated replies.
- **Mobile Bottom Navigation:** Fixed glass bottom bar (`< 768px`) for mobile devices with zero horizontal scroll.

---

## 📁 Project Structure

```text
nexora/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   ├── avatars/
│   ├── posts/
│   ├── stories/
│   └── cover/
└── README.md
```

---

## 🚀 How to Run Locally

Run a local development server in the `nexora` directory:

```bash
cd nexora
npx serve . -p 3002
```
