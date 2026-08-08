/**
 * Maison Élan — Restaurant Website JavaScript
 * Features: Preloader, GSAP animations, ScrollTrigger, Counter animation,
 *           Menu filtering, Lightbox, Testimonials Carousel, Reservation form,
 *           Navbar scroll effects, Mobile drawer, Scroll-to-top, Newsletter
 */

/* ── Register GSAP plugins ── */
gsap.registerPlugin(ScrollTrigger);

/* ==========================================================================
   PRELOADER
   ========================================================================== */
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Start hero animations after preloader
        initHeroAnimations();
    }, 1800);
});

/* ==========================================================================
   1. NAVBAR — Scroll behaviour + active link
   ========================================================================== */
const navbar = document.getElementById('mainNavbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id], div[id]');

window.addEventListener('scroll', () => {
    // Scrolled class
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Scroll-to-top button
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 400) {
        scrollTop.classList.add('visible');
    } else {
        scrollTop.classList.remove('visible');
    }

    // Active nav link based on scroll position
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
const hamburger   = document.getElementById('hamburger');
const mobileDrawer = document.getElementById('mobileDrawer');
const drawerOverlay = document.getElementById('drawerOverlay');
const drawerClose = document.getElementById('drawerClose');
const drawerLinks = document.querySelectorAll('.drawer-link, .drawer-cta');

function openDrawer() {
    hamburger.classList.add('open');
    mobileDrawer.classList.add('open');
    drawerOverlay.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function closeDrawer() {
    hamburger.classList.remove('open');
    mobileDrawer.classList.remove('open');
    drawerOverlay.classList.remove('show');
    document.body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
    mobileDrawer.classList.contains('open') ? closeDrawer() : openDrawer();
});
drawerClose.addEventListener('click', closeDrawer);
drawerOverlay.addEventListener('click', closeDrawer);
drawerLinks.forEach(link => link.addEventListener('click', closeDrawer));

/* ==========================================================================
   3. HERO SECTION — GSAP Entrance Animations
   ========================================================================== */
function initHeroAnimations() {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.to('#heroEyebrow', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.1,
    })
    .to('#heroHeadline', {
        opacity: 1,
        y: 0,
        duration: 1,
    }, '-=0.4')
    .to('#heroSubtext', {
        opacity: 1,
        y: 0,
        duration: 0.8,
    }, '-=0.6')
    .to('#heroCtas', {
        opacity: 1,
        y: 0,
        duration: 0.7,
    }, '-=0.5')
    .to('#heroCards', {
        opacity: 1,
        x: 0,
        duration: 0.9,
    }, '-=0.4');

    // Set initial states for GSAP (to complement CSS opacity:0)
    gsap.set('#heroEyebrow, #heroHeadline, #heroSubtext, #heroCtas', { y: 30 });
    gsap.set('#heroCards', { x: 30 });
}

/* ==========================================================================
   4. SCROLL-TRIGGERED REVEAL ANIMATIONS
   ========================================================================== */
// Reveal Up
gsap.utils.toArray('.reveal-up').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 88%',
                once: true,
            }
        }
    );
});

// Reveal Left
gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: -60 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
            }
        }
    );
});

// Reveal Right
gsap.utils.toArray('.reveal-right').forEach(el => {
    gsap.fromTo(el,
        { opacity: 0, x: 60 },
        {
            opacity: 1,
            x: 0,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: 'top 85%',
                once: true,
            }
        }
    );
});

// Staggered Menu Cards
gsap.utils.toArray('#menuGrid .menu-item').forEach((item, i) => {
    gsap.fromTo(item,
        { opacity: 0, y: 40, scale: 0.97 },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.7,
            ease: 'power2.out',
            delay: (i % 3) * 0.12,
            scrollTrigger: {
                trigger: '#menuGrid',
                start: 'top 80%',
                once: true,
            }
        }
    );
});

// Parallax on hero background
gsap.to('.hero-section', {
    backgroundPositionY: '30%',
    ease: 'none',
    scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
    }
});

// Gallery items stagger
gsap.utils.toArray('.gallery-item').forEach((item, i) => {
    gsap.fromTo(item,
        { opacity: 0, scale: 0.92 },
        {
            opacity: 1,
            scale: 1,
            duration: 0.7,
            delay: (i % 4) * 0.1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: '#galleryGrid',
                start: 'top 85%',
                once: true,
            }
        }
    );
});

/* ==========================================================================
   5. ANIMATED STAT COUNTERS
   ========================================================================== */
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const target = parseInt(entry.target.dataset.target);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

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
   6. MENU CATEGORY FILTER
   ========================================================================== */
const filterBtns = document.querySelectorAll('.menu-filter-btn');
const menuItems  = document.querySelectorAll('.menu-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.dataset.filter;

        menuItems.forEach(item => {
            const category = item.dataset.category;
            if (filter === 'all' || category === filter) {
                item.classList.remove('hidden');
                // Re-animate
                gsap.fromTo(item,
                    { opacity: 0, y: 20, scale: 0.96 },
                    { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power2.out' }
                );
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

/* ==========================================================================
   7. MENU — Add to Cart Button
   ========================================================================== */
document.querySelectorAll('.menu-order-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('added')) {
            btn.classList.remove('added');
            btn.innerHTML = '<i class="fa-solid fa-plus"></i> Add';
        } else {
            btn.classList.add('added');
            btn.innerHTML = '<i class="fa-solid fa-check"></i> Added';
            showToast('Added to your order! 🍽️');

            // Ripple effect
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(0);
                width:80px;height:80px;border-radius:50%;
                background:rgba(201,168,76,0.3);
                animation:rippleOut 0.5s ease forwards;
                pointer-events:none;
            `;
            btn.style.position = 'relative';
            btn.style.overflow = 'hidden';
            btn.appendChild(ripple);
            setTimeout(() => ripple.remove(), 500);
        }
    });
});

// Toast notification
function showToast(message, duration = 3000) {
    const existing = document.querySelector('.toast-restaurant');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = 'toast-restaurant';
    toast.innerHTML = `<i class="fa-solid fa-circle-check me-2" style="color:var(--gold);"></i>${message}`;
    toast.style.cssText = `
        position:fixed;bottom:40px;left:50%;transform:translateX(-50%) translateY(20px);
        background:rgba(10,8,5,0.95);color:#f5f0e8;
        padding:14px 24px;border-radius:100px;
        border:1px solid rgba(201,168,76,0.35);
        font-size:0.88rem;font-weight:500;
        z-index:9999;
        box-shadow:0 8px 30px rgba(0,0,0,0.5);
        display:flex;align-items:center;
        opacity:0;
        transition:all 0.4s cubic-bezier(0.16,1,0.3,1);
        backdrop-filter:blur(20px);
        white-space:nowrap;
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
    }, duration);
}

// Inject ripple keyframes once
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `@keyframes rippleOut { to { transform:translate(-50%,-50%) scale(2);opacity:0; } }`;
document.head.appendChild(rippleStyle);

/* ==========================================================================
   8. GALLERY LIGHTBOX
   ========================================================================== */
const galleryItems   = Array.from(document.querySelectorAll('.gallery-item'));
const lightbox       = document.getElementById('lightbox');
const lightboxImg    = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose  = document.getElementById('lightboxClose');
const lightboxPrev   = document.getElementById('lightboxPrev');
const lightboxNext   = document.getElementById('lightboxNext');
let currentLightboxIndex = 0;

function openLightbox(index) {
    currentLightboxIndex = index;
    const item = galleryItems[index];
    lightboxImg.src = item.dataset.src || item.querySelector('img').src;
    lightboxCaption.textContent = item.querySelector('.gallery-overlay span')?.textContent || '';
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
    lightboxImg.src = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex = (currentLightboxIndex + direction + galleryItems.length) % galleryItems.length;
    lightboxImg.style.opacity = '0';
    setTimeout(() => {
        openLightbox(currentLightboxIndex);
        lightboxImg.style.opacity = '1';
    }, 200);
}

galleryItems.forEach((item, index) => {
    item.addEventListener('click', () => openLightbox(index));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
lightboxNext.addEventListener('click', () => navigateLightbox(1));

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape')     closeLightbox();
    if (e.key === 'ArrowLeft')  navigateLightbox(-1);
    if (e.key === 'ArrowRight') navigateLightbox(1);
});

// Image transition
lightboxImg.style.transition = 'opacity 0.2s ease';

/* ==========================================================================
   9. TESTIMONIALS CAROUSEL
   ========================================================================== */
const slides     = document.querySelectorAll('.testimonial-slide');
const dotsContainer = document.getElementById('testDots');
const testPrev   = document.getElementById('testPrev');
const testNext   = document.getElementById('testNext');
let currentSlide = 0;
let autoSlideInterval;

// Build dots
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.className = `test-dot ${i === 0 ? 'active' : ''}`;
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
});

function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    document.querySelectorAll('.test-dot')[currentSlide].classList.remove('active');
    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    document.querySelectorAll('.test-dot')[currentSlide].classList.add('active');
}

function nextSlide() { goToSlide(currentSlide + 1); }
function prevSlide() { goToSlide(currentSlide - 1); }

testNext.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
testPrev.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5500);
}
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

// Start auto-slide when testimonials section is visible
const testimonialObserver = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
        startAutoSlide();
    } else {
        clearInterval(autoSlideInterval);
    }
}, { threshold: 0.3 });
const testimonialsSection = document.getElementById('reviews');
if (testimonialsSection) testimonialObserver.observe(testimonialsSection);

/* ==========================================================================
   10. RESERVATION FORM — Validation + Success
   ========================================================================== */
const resForm    = document.getElementById('reservationForm');
const resSuccess = document.getElementById('reservationSuccess');
const reserveBtn = document.getElementById('reserveBtn');
const newResBtn  = document.getElementById('newReservationBtn');

// Set min date to today
const resDateInput = document.getElementById('resDate');
if (resDateInput) {
    const today = new Date().toISOString().split('T')[0];
    resDateInput.setAttribute('min', today);
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

// Clear errors on input
['resName','resEmail','resPhone','resDate','resTime','resGuests'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.addEventListener('input', () => clearError(id));
    if (el) el.addEventListener('change', () => clearError(id));
});

function validateForm() {
    let valid = true;

    const name   = document.getElementById('resName').value.trim();
    const email  = document.getElementById('resEmail').value.trim();
    const phone  = document.getElementById('resPhone').value.trim();
    const date   = document.getElementById('resDate').value;
    const time   = document.getElementById('resTime').value;
    const guests = document.getElementById('resGuests').value;

    if (!name || name.length < 2) {
        showError('resName', 'Please enter your full name (min 2 characters).');
        valid = false;
    }
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showError('resEmail', 'Please enter a valid email address.');
        valid = false;
    }
    if (!phone || !/^[\+]?[\d\s\-\(\)]{7,15}$/.test(phone)) {
        showError('resPhone', 'Please enter a valid phone number.');
        valid = false;
    }
    if (!date) {
        showError('resDate', 'Please select a preferred date.');
        valid = false;
    }
    if (!time) {
        showError('resTime', 'Please choose a time slot.');
        valid = false;
    }
    if (!guests) {
        showError('resGuests', 'Please select number of guests.');
        valid = false;
    }

    return valid;
}

resForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Simulate submission
    reserveBtn.disabled = true;
    reserveBtn.innerHTML = '<span>Reserving...</span> <i class="fa-solid fa-spinner fa-spin ms-2"></i>';

    setTimeout(() => {
        resForm.classList.add('d-none');
        resSuccess.classList.remove('d-none');

        gsap.from(resSuccess, {
            opacity: 0,
            y: 30,
            duration: 0.6,
            ease: 'power3.out'
        });

        // Confetti burst
        launchConfetti();
    }, 1800);
});

newResBtn?.addEventListener('click', () => {
    resForm.classList.remove('d-none');
    resSuccess.classList.add('d-none');
    resForm.reset();
    reserveBtn.disabled = false;
    reserveBtn.innerHTML = '<span>Reserve Your Table</span> <i class="fa-regular fa-calendar ms-2"></i>';
    ['resName','resEmail','resPhone','resDate','resTime','resGuests'].forEach(id => clearError(id));
});

/* Simple confetti burst */
function launchConfetti() {
    const colors = ['#c9a84c', '#e8c86d', '#fff', '#9a7535'];
    for (let i = 0; i < 60; i++) {
        const dot = document.createElement('div');
        const color = colors[Math.floor(Math.random() * colors.length)];
        const x = Math.random() * window.innerWidth;
        const y = window.innerHeight / 2;
        dot.style.cssText = `
            position:fixed;left:${x}px;top:${y}px;
            width:${4 + Math.random()*6}px;height:${4 + Math.random()*6}px;
            background:${color};border-radius:${Math.random()>0.5?'50%':'2px'};
            pointer-events:none;z-index:9999;
        `;
        document.body.appendChild(dot);
        gsap.to(dot, {
            y: -(Math.random() * 300 + 100),
            x: (Math.random() - 0.5) * 400,
            opacity: 0,
            duration: 1.5 + Math.random(),
            ease: 'power2.out',
            onComplete: () => dot.remove()
        });
    }
}

/* ==========================================================================
   11. NEWSLETTER FORM
   ========================================================================== */
const newsletterEmail = document.getElementById('newsletterEmail');
const newsletterBtn   = document.getElementById('newsletterBtn');
const newsletterMsg   = document.getElementById('newsletterMsg');

newsletterBtn?.addEventListener('click', () => {
    const email = newsletterEmail.value.trim();
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        newsletterEmail.style.borderColor = '#ef4444';
        setTimeout(() => newsletterEmail.style.borderColor = '', 2000);
        return;
    }
    newsletterEmail.value = '';
    newsletterMsg.classList.remove('d-none');
    setTimeout(() => newsletterMsg.classList.add('d-none'), 5000);
});

/* ==========================================================================
   12. SCROLL-TO-TOP
   ========================================================================== */
document.getElementById('scrollTop')?.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ==========================================================================
   13. SMOOTH ANCHOR SCROLLING (for all internal links)
   ========================================================================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ==========================================================================
   14. NAVBAR LINK — Hover glow effect via GSAP
   ========================================================================== */
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
        gsap.to(link, { scale: 1.06, duration: 0.3, ease: 'power2.out' });
    });
    link.addEventListener('mouseleave', () => {
        gsap.to(link, { scale: 1, duration: 0.3, ease: 'power2.out' });
    });
});

/* ==========================================================================
   15. HERO PARALLAX — Mouse Move effect
   ========================================================================== */
const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth  - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;

        gsap.to('.orb-1', { x: x * 0.4, y: y * 0.4, duration: 2, ease: 'power1.out' });
        gsap.to('.orb-2', { x: -x * 0.3, y: -y * 0.3, duration: 2.5, ease: 'power1.out' });
        gsap.to('.orb-3', { x: x * 0.2, y: y * 0.5, duration: 3, ease: 'power1.out' });
        gsap.to('#heroHeadline', { x: x * 0.05, y: y * 0.05, duration: 1.5, ease: 'power1.out' });
    });
}

/* ==========================================================================
   16. CHEF CARDS — GSAP hover animation
   ========================================================================== */
document.querySelectorAll('.chef-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card.querySelector('.chef-img'), { scale: 1.05, duration: 0.5, ease: 'power2.out' });
    });
    card.addEventListener('mouseleave', () => {
        gsap.to(card.querySelector('.chef-img'), { scale: 1, duration: 0.5, ease: 'power2.out' });
    });
});

/* ==========================================================================
   17. FLOAT CARDS — stagger animation on scroll
   ========================================================================== */
gsap.utils.toArray('.float-card').forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, x: 40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: card,
                start: 'top 95%',
                once: true,
            }
        }
    );
});

/* ==========================================================================
   18. ABOUT IMAGE — Floating animation
   ========================================================================== */
gsap.to('.about-img-badge', {
    y: -12,
    duration: 2.5,
    ease: 'power1.inOut',
    yoyo: true,
    repeat: -1,
});

/* ==========================================================================
   19. BUTTON — Magnetic hover effect
   ========================================================================== */
document.querySelectorAll('.btn-primary-gold').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top  - rect.height / 2;
        gsap.to(btn, { x: x * 0.15, y: y * 0.15, duration: 0.4, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
});

/* ==========================================================================
   20. CONTACT CARDS — stagger reveal
   ========================================================================== */
gsap.utils.toArray('.contact-card').forEach((card, i) => {
    gsap.fromTo(card,
        { opacity: 0, x: -40 },
        {
            opacity: 1,
            x: 0,
            duration: 0.7,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
                trigger: '#contact',
                start: 'top 80%',
                once: true,
            }
        }
    );
});

/* ==========================================================================
   INIT LOG
   ========================================================================== */
console.log('%c🍽 Maison Élan — Loaded Successfully', 'color:#c9a84c;font-size:14px;font-weight:bold;');
