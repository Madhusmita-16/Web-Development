/**
 * Maison Élan — Restaurant Website Main JavaScript
 * Handles: Preloader, GSAP ScrollTrigger Animations, Dynamic 125+ Item Menu,
 *          Category Filters, Menu Live Search, 30-Item Gallery & Lightbox,
 *          Testimonials Carousel, Reservation Form Validation & Confetti,
 *          Navbar Scroll & Drawer, Image Fallback Handling.
 */

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

// Global fallback image URL if an external image link encounters network issues
const FALLBACK_FOOD_IMG = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80';

/* ==========================================================================
   PRELOADER
   ========================================================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
            initHeroAnimations();
        }, 1200);
    }
});

/* ==========================================================================
   1. NAVBAR — Scroll behaviour & active state
   ========================================================================== */
const navbar = document.getElementById('mainNavbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }

    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 400) {
        scrollTop?.classList.add('visible');
    } else {
        scrollTop?.classList.remove('visible');
    }

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

/* ==========================================================================
   2. MOBILE DRAWER
   ========================================================================== */
const hamburger = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

function openDrawer() {
    hamburger?.classList.add('open');
    mobileDrawer?.classList.add('open');
    drawerOverlay?.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    hamburger?.classList.remove('open');
    mobileDrawer?.classList.remove('open');
    drawerOverlay?.classList.remove('show');
    document.body.style.overflow = '';
}

hamburger?.addEventListener('click', () => {
    mobileDrawer?.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerClose?.addEventListener('click', closeDrawer);
drawerOverlay?.addEventListener('click', closeDrawer);
drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

/* ==========================================================================
   3. HERO GSAP ANIMATIONS
   ========================================================================== */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('#heroEyebrow', { opacity: 1, y: 0, duration: 0.8, delay: 0.1 })
      .to('#heroHeadline', { opacity: 1, y: 0, duration: 1 }, '-=0.4')
      .to('#heroSubtext', { opacity: 1, y: 0, duration: 0.8 }, '-=0.6')
      .to('#heroCtas', { opacity: 1, y: 0, duration: 0.7 }, '-=0.5')
      .to('#heroCards', { opacity: 1, x: 0, duration: 0.9 }, '-=0.4');

    gsap.set('#heroEyebrow, #heroHeadline, #heroSubtext, #heroCtas', { y: 30 });
    gsap.set('#heroCards', { x: 30 });
}

/* ==========================================================================
   4. DYNAMIC MENU RENDERING (125 ITEMS) & SEARCH
   ========================================================================== */
let activeCategory = 'all';
let searchQuery = '';
let displayLimit = 24; // Initial items to show for fast render

function renderMenuGrid() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid || typeof MENU_DATA === 'undefined') return;

    // Filter items
    let filtered = MENU_DATA.filter(item => {
        const matchesCategory = (activeCategory === 'all') || (item.category === activeCategory);
        const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              item.badge.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const totalMatches = filtered.length;
    const itemsToDisplay = filtered.slice(0, displayLimit);

    if (itemsToDisplay.length === 0) {
        menuGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <div class="glass-card p-5 mx-auto" style="max-width:500px;">
                    <i class="fa-solid fa-utensils fs-1 text-gold mb-3"></i>
                    <h4>No Dishes Found</h4>
                    <p class="text-muted">No dishes matched "${searchQuery}". Try selecting another category or searching for "Truffle", "Paneer", "Salmon", or "Mocktail".</p>
                    <button class="btn-primary-gold mt-3" onclick="resetMenuFilters()">View All 125 Dishes</button>
                </div>
            </div>
        `;
        document.getElementById('loadMoreContainer')?.classList.add('d-none');
        return;
    }

    menuGrid.innerHTML = itemsToDisplay.map((dish, i) => `
        <div class="col-lg-4 col-md-6 menu-item" data-category="${dish.category}">
            <div class="menu-card glass-card ${dish.badge.includes('Signature') || dish.badge.includes('Chef') ? 'featured-card' : ''}">
                <div class="menu-card-img">
                    <img src="${dish.img}" alt="${dish.name}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_FOOD_IMG}';">
                    <div class="menu-badge">${dish.badge}</div>
                </div>
                <div class="menu-card-body">
                    <div class="menu-card-top">
                        <h5 class="menu-name">${dish.name}</h5>
                        <span class="menu-price">${dish.price}</span>
                    </div>
                    <p class="menu-desc">${dish.desc}</p>
                    <div class="menu-card-footer">
                        <div class="menu-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span>${dish.rating}</span>
                        </div>
                        <button class="menu-order-btn" onclick="handleAddToCart(this, '${dish.name.replace(/'/g, "\\'")}')">
                            <i class="fa-solid fa-plus"></i> Add
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    // Load More Button state
    const loadMoreContainer = document.getElementById('loadMoreContainer');
    const loadMoreBtn = document.getElementById('loadMoreMenuBtn');
    if (loadMoreContainer && loadMoreBtn) {
        if (totalMatches > displayLimit) {
            loadMoreContainer.classList.remove('d-none');
            loadMoreBtn.innerHTML = `<span>Show More Dishes (${totalMatches - displayLimit} remaining)</span> <i class="fa-solid fa-chevron-down ms-2"></i>`;
        } else {
            loadMoreContainer.classList.add('d-none');
        }
    }

    // Trigger subtle fade up animation on new elements
    gsap.fromTo('#menuGrid .menu-card',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out' }
    );
}

function resetMenuFilters() {
    activeCategory = 'all';
    searchQuery = '';
    displayLimit = 24;
    const searchInput = document.getElementById('menuSearchInput');
    if (searchInput) searchInput.value = '';

    document.querySelectorAll('.menu-filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.filter === 'all');
    });
    renderMenuGrid();
}

function handleAddToCart(btn, dishName) {
    if (btn.classList.contains('added')) {
        btn.classList.remove('added');
        btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add';
    } else {
        btn.classList.add('added');
        btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
        showToast(`Added "${dishName}" to your order! 🍽️`);
    }
}

// Category Filters Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    renderMenuGrid();
    renderGalleryGrid();

    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.filter;
            displayLimit = 24; // reset pagination limit on tab change
            renderMenuGrid();
        });
    });

    const menuSearchInput = document.getElementById('menuSearchInput');
    if (menuSearchInput) {
        menuSearchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.trim();
            displayLimit = 24;
            renderMenuGrid();
        });
    }

    const loadMoreMenuBtn = document.getElementById('loadMoreMenuBtn');
    if (loadMoreMenuBtn) {
        loadMoreMenuBtn.addEventListener('click', () => {
            displayLimit += 24;
            renderMenuGrid();
        });
    }
});

/* ==========================================================================
   5. DYNAMIC GALLERY RENDERING (30 HIGH-RES PHOTOS)
   ========================================================================== */
let currentLightboxIndex = 0;

function renderGalleryGrid() {
    const galleryGrid = document.getElementById('galleryGrid');
    if (!galleryGrid || typeof GALLERY_DATA === 'undefined') return;

    galleryGrid.innerHTML = GALLERY_DATA.map((item, i) => `
        <div class="gallery-item ${item.tall ? 'gallery-tall' : ''} ${item.wide ? 'gallery-wide' : ''}" data-index="${i}" onclick="openLightbox(${i})">
            <img src="${item.img}" alt="${item.title}" loading="lazy" onerror="this.onerror=null;this.src='${FALLBACK_FOOD_IMG}';">
            <div class="gallery-overlay">
                <i class="fa-solid fa-magnifying-glass-plus"></i>
                <span class="gallery-title">${item.title}</span>
                <small class="text-gold uppercase tracking-wider" style="font-size:0.7rem;">${item.tag}</small>
            </div>
        </div>
    `).join('');
}

// Lightbox modal logic
function openLightbox(index) {
    if (typeof GALLERY_DATA === 'undefined') return;
    currentLightboxIndex = index;
    const item = GALLERY_DATA[index];
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');

    if (!lightbox || !lightboxImg || !lightboxCaption) return;

    lightboxImg.src = item.img;
    lightboxCaption.innerHTML = `<h5 class="text-gold mb-1">${item.title}</h5><span class="badge bg-gold text-dark">${item.tag}</span>`;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox?.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(dir) {
    if (typeof GALLERY_DATA === 'undefined') return;
    currentLightboxIndex = (currentLightboxIndex + dir + GALLERY_DATA.length) % GALLERY_DATA.length;
    const lightboxImg = document.getElementById('lightboxImg');
    if (lightboxImg) {
        lightboxImg.style.opacity = '0';
        setTimeout(() => {
            openLightbox(currentLightboxIndex);
            lightboxImg.style.opacity = '1';
        }, 150);
    }
}

document.getElementById('lightboxClose')?.addEventListener('click', closeLightbox);
document.getElementById('lightboxPrev')?.addEventListener('click', () => navigateLightbox(-1));
document.getElementById('lightboxNext')?.addEventListener('click', () => navigateLightbox(1));
document.getElementById('lightbox')?.addEventListener('click', (e) => {
    if (e.target.id === 'lightbox') closeLightbox();
});
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox?.classList.contains('active')) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

/* ==========================================================================
   6. SCROLL REVEAL ANIMATIONS (GSAP)
   ========================================================================== */
gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true }
        }
    );
});

gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: -50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
    );
});

gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: 50 },
        {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', once: true }
        }
    );
});

/* ==========================================================================
   7. STAT COUNTERS
   ========================================================================== */
const statNumbers = document.querySelectorAll('.stat-number');
const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.dataset.target);
            let current = 0;
            const step = target / 60;
            const update = () => {
                current += step;
                if (current < target) {
                    entry.target.textContent = Math.floor(current);
                    requestAnimationFrame(update);
                } else {
                    entry.target.textContent = target;
                }
            };
            requestAnimationFrame(update);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

/* ==========================================================================
   8. TESTIMONIALS CAROUSEL
   ========================================================================== */
const slides = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('testDots');
let currentSlide = 0;
let autoSlideInterval;

if (slides.length > 0 && dotsContainer) {
    dotsContainer.innerHTML = '';
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.className = `test-dot ${i === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => goToSlide(i));
        dotsContainer.appendChild(dot);
    });
}

function goToSlide(index) {
    if (slides.length === 0) return;
    slides[currentSlide]?.classList.remove('active');
    document.querySelectorAll('.test-dot')[currentSlide]?.classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide]?.classList.add('active');
    document.querySelectorAll('.test-dot')[currentSlide]?.classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

document.getElementById('testNext')?.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
document.getElementById('testPrev')?.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

function startAutoSlide() { autoSlideInterval = setInterval(nextSlide, 5500); }
function resetAutoSlide() { clearInterval(autoSlideInterval); startAutoSlide(); }

const testimonialsSection = document.getElementById('reviews');
if (testimonialsSection) {
    new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) startAutoSlide();
        else clearInterval(autoSlideInterval);
    }, { threshold: 0.3 }).observe(testimonialsSection);
}

/* ==========================================================================
   9. RESERVATION FORM
   ========================================================================== */
const resForm = document.getElementById('reservationForm');
const resSuccess = document.getElementById('reservationSuccess');
const reserveBtn = document.getElementById('reserveBtn');
const newResBtn = document.getElementById('newReservationBtn');

const resDateInput = document.getElementById('resDate');
if (resDateInput) {
    resDateInput.setAttribute('min', new Date().toISOString().split('T')[0]);
}

function showError(id, msg) {
    const el = document.getElementById(id);
    const errEl = document.getElementById('err' + id.replace('res', '').charAt(0).toUpperCase() + id.replace('res', '').slice(1));
    if (el) el.classList.add('error');
    if (errEl) errEl.textContent = msg;
}

function clearError(id) {
    const el = document.getElementById(id);
    const errEl = document.getElementById('err' + id.replace('res', '').charAt(0).toUpperCase() + id.replace('res', '').slice(1));
    if (el) el.classList.remove('error');
    if (errEl) errEl.textContent = '';
}

['resName','resEmail','resPhone','resDate','resTime','resGuests'].forEach(id => {
    const el = document.getElementById(id);
    el?.addEventListener('input', () => clearError(id));
    el?.addEventListener('change', () => clearError(id));
});

resForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    let valid = true;

    const name = document.getElementById('resName').value.trim();
    const email = document.getElementById('resEmail').value.trim();
    const phone = document.getElementById('resPhone').value.trim();
    const date = document.getElementById('resDate').value;
    const time = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;

    if (!name || name.length < 2) { showError('resName', 'Please enter your full name.'); valid = false; }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showError('resEmail', 'Please enter a valid email.'); valid = false; }
    if (!phone || phone.length < 7) { showError('resPhone', 'Please enter a valid phone number.'); valid = false; }
    if (!date) { showError('resDate', 'Please select a date.'); valid = false; }
    if (!time) { showError('resTime', 'Please select a time slot.'); valid = false; }
    if (!guests) { showError('resGuests', 'Please select guests count.'); valid = false; }

    if (!valid) return;

    reserveBtn.disabled = true;
    reserveBtn.innerHTML = '<span>Reserving...</span> <i class="fa-solid fa-spinner fa-spin ms-2"></i>';

    setTimeout(() => {
        resForm.classList.add('d-none');
        resSuccess?.classList.remove('d-none');
        launchConfetti();
    }, 1500);
});

newResBtn?.addEventListener('click', () => {
    resForm?.classList.remove('d-none');
    resSuccess?.classList.add('d-none');
    resForm?.reset();
    if (reserveBtn) {
        reserveBtn.disabled = false;
        reserveBtn.innerHTML = '<span>Reserve Your Table</span> <i class="fa-regular fa-calendar ms-2"></i>';
    }
});

function launchConfetti() {
    const colors = ['#c9a84c', '#e8c86d', '#ffffff', '#9a7535'];
    for (let i = 0; i < 70; i++) {
        const dot = document.createElement('div');
        dot.style.cssText = `
            position:fixed;left:${Math.random()*100}vw;top:50vh;
            width:${5+Math.random()*6}px;height:${5+Math.random()*6}px;
            background:${colors[Math.floor(Math.random()*colors.length)]};
            border-radius:${Math.random()>0.5?'50%':'2px'};
            pointer-events:none;z-index:99999;
        `;
        document.body.appendChild(dot);
        gsap.to(dot, {
            y: -(Math.random()*350 + 100),
            x: (Math.random()-0.5)*400,
            opacity: 0,
            duration: 1.5 + Math.random(),
            ease: 'power2.out',
            onComplete: () => dot.remove()
        });
    }
}

/* ==========================================================================
   10. TOAST & UTILS
   ========================================================================== */
function showToast(msg) {
    const existing = document.querySelector('.toast-restaurant');
    existing?.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-restaurant';
    toast.innerHTML = `<i class="fa-solid fa-circle-check me-2" style="color:var(--gold);"></i>${msg}`;
    toast.style.cssText = `
        position:fixed;bottom:35px;left:50%;transform:translateX(-50%) translateY(20px);
        background:rgba(15,12,7,0.95);color:#f5f0e8;
        padding:14px 28px;border-radius:100px;
        border:1px solid rgba(201,168,76,0.4);
        font-size:0.9rem;font-weight:500;z-index:99999;
        box-shadow:0 10px 40px rgba(0,0,0,0.6);
        display:flex;align-items:center;opacity:0;
        transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
        backdrop-filter:blur(20px);white-space:nowrap;
    `;
    document.body.appendChild(toast);
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });
    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(10px)';
        setTimeout(() => toast.remove(), 400);
    }, 3000);
}

document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
