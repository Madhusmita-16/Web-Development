/**
 * FITFORGE Custom JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('mainNavbar');
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled', 'navbar-dark');
            navbar.classList.remove('navbar-light');
            
            // Show back to top button
            backToTopBtn.classList.remove('d-none');
            setTimeout(() => {
                backToTopBtn.style.opacity = '1';
            }, 10);
        } else {
            navbar.classList.remove('scrolled');
            
            // Hide back to top button
            backToTopBtn.style.opacity = '0';
            setTimeout(() => {
                backToTopBtn.classList.add('d-none');
            }, 300);
        }
    });

    // Back to Top functionality
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 2. Initial setup for navbar (in case loaded half-way down page)
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled', 'navbar-dark');
    } else {
        navbar.classList.add('navbar-dark'); // Default to dark for hero section
    }

    // 3. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a.nav-link, a.btn').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Only apply to hash links
            if (this.getAttribute('href').startsWith('#')) {
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.getElementById('navbarNav');
                    if (navbarCollapse.classList.contains('show')) {
                        const bsCollapse = new bootstrap.Collapse(navbarCollapse);
                        bsCollapse.hide();
                    }

                    // Calculate offset for fixed navbar
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // 4. Update Active Nav Link on Scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const headerOffset = 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerOffset;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
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

    // 5. Scroll Reveal Animations
    const revealElements = document.querySelectorAll('.reveal-fade-up, .reveal-fade-left, .reveal-fade-right, .reveal-scale-up');
    
    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const revealPoint = 100; // Trigger point
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('active');
                
                // If this is the stats section, trigger the counters
                if (element.classList.contains('active') && element.querySelector('.counter')) {
                    triggerCounters(element);
                }
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on load

    // 6. Animated Counters
    let countersTriggered = false;
    
    function triggerCounters(parentElement) {
        if (countersTriggered) return;
        
        const counters = parentElement.querySelectorAll('.counter');
        if (counters.length === 0) return;
        
        countersTriggered = true;
        const speed = 200; // The lower the slower
        
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const inc = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // 7. BMI Calculator
    const bmiForm = document.getElementById('bmiForm');
    const bmiResult = document.getElementById('bmiResult');
    const bmiValue = document.getElementById('bmiValue');
    const bmiCategory = document.getElementById('bmiCategory');
    
    if (bmiForm) {
        bmiForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const height = parseFloat(document.getElementById('height').value) / 100; // Convert cm to m
            const weight = parseFloat(document.getElementById('weight').value);
            
            if (height > 0 && weight > 0) {
                const bmi = (weight / (height * height)).toFixed(1);
                bmiValue.innerText = bmi;
                
                // Determine Category
                bmiResult.classList.remove('bg-info', 'bg-success', 'bg-warning', 'bg-danger', 'text-dark');
                bmiResult.classList.add('text-white');
                
                if (bmi < 16.0) {
                    bmiCategory.innerText = "Severe Thinness";
                    bmiResult.classList.add('bg-danger');
                } else if (bmi >= 16.0 && bmi <= 16.9) {
                    bmiCategory.innerText = "Moderate Thinness";
                    bmiResult.classList.add('bg-warning');
                    bmiResult.classList.replace('text-white', 'text-dark');
                } else if (bmi >= 17.0 && bmi <= 18.4) {
                    bmiCategory.innerText = "Mild Thinness";
                    bmiResult.classList.add('bg-info');
                    bmiResult.classList.replace('text-white', 'text-dark');
                } else if (bmi >= 18.5 && bmi <= 24.9) {
                    bmiCategory.innerText = "Normal Range";
                    bmiResult.classList.add('bg-success');
                } else if (bmi >= 25.0 && bmi <= 29.9) {
                    bmiCategory.innerText = "Pre-obese / Overweight";
                    bmiResult.classList.add('bg-warning');
                    bmiResult.classList.replace('text-white', 'text-dark');
                } else if (bmi >= 30.0 && bmi <= 34.9) {
                    bmiCategory.innerText = "Obesity Class I";
                    bmiResult.classList.add('bg-danger');
                } else if (bmi >= 35.0 && bmi <= 39.9) {
                    bmiCategory.innerText = "Obesity Class II";
                    bmiResult.classList.add('bg-danger');
                } else {
                    bmiCategory.innerText = "Obesity Class III";
                    bmiResult.classList.add('bg-danger');
                }
                
                // Show Result
                bmiResult.classList.remove('d-none');
                
                // Slight animation
                bmiResult.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    bmiResult.style.transform = 'scale(1)';
                }, 100);
            }
        });
    }

    // 8. Contact Form Validation
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (!contactForm.checkValidity()) {
                e.stopPropagation();
            } else {
                // Simulate form submission
                const submitBtn = contactForm.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerText;
                
                submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Sending...';
                submitBtn.disabled = true;
                
                setTimeout(() => {
                    submitBtn.innerHTML = '<i class="fa-solid fa-check me-2"></i> Message Sent!';
                    submitBtn.classList.replace('btn-primary-accent', 'btn-success');
                    
                    // Reset form
                    setTimeout(() => {
                        contactForm.reset();
                        contactForm.classList.remove('was-validated');
                        submitBtn.innerHTML = originalText;
                        submitBtn.classList.replace('btn-success', 'btn-primary-accent');
                        submitBtn.disabled = false;
                    }, 3000);
                }, 1500);
            }
            contactForm.classList.add('was-validated');
        });
    }

    // 9. Auto-update Copyright Year
    const currentYearElement = document.getElementById('currentYear');
    if (currentYearElement) {
        currentYearElement.innerText = new Date().getFullYear();
    }

    // 10. Program Details Modal Handler
    const programButtons = document.querySelectorAll('.btn-view-program');
    programButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalProgramTitle').innerText = btn.getAttribute('data-title');
            document.getElementById('modalProgramDesc').innerText = btn.getAttribute('data-desc');
            document.getElementById('modalProgramLevel').innerText = btn.getAttribute('data-level');
            document.getElementById('modalProgramDuration').innerText = btn.getAttribute('data-duration');
            
            const iconClass = btn.getAttribute('data-icon');
            const iconElement = document.getElementById('modalProgramIcon');
            iconElement.className = `fa-solid ${iconClass} text-primary-accent me-3 fs-4`;
        });
    });

    // 11. Trainer Profile Modal Handler
    const trainerButtons = document.querySelectorAll('.btn-view-trainer');
    trainerButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            document.getElementById('modalTrainerName').innerText = `${btn.getAttribute('data-name')} — Profile`;
            document.getElementById('modalTrainerHeader').innerText = btn.getAttribute('data-name');
            document.getElementById('modalTrainerRole').innerText = btn.getAttribute('data-role');
            document.getElementById('modalTrainerExp').innerText = btn.getAttribute('data-exp');
            document.getElementById('modalTrainerImg').src = btn.getAttribute('data-img');
            document.getElementById('modalTrainerBio').innerText = btn.getAttribute('data-bio');
        });
    });

    // 12. Membership Plan Modal Handler
    const planButtons = document.querySelectorAll('.btn-select-plan');
    planButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const plan = btn.getAttribute('data-plan') || 'Pro';
            const price = btn.getAttribute('data-price') || '₹1,999/mo';
            
            document.getElementById('modalPlanTitle').innerText = `${plan} Plan`;
            document.getElementById('modalPlanName').innerText = `${plan} Membership`;
            document.getElementById('modalPlanPrice').innerText = price;
            
            // Reset form visibility
            const membershipForm = document.getElementById('membershipForm');
            const membershipSuccess = document.getElementById('membershipSuccess');
            if (membershipForm && membershipSuccess) {
                membershipForm.classList.remove('d-none');
                membershipSuccess.classList.add('d-none');
                membershipForm.reset();
            }
        });
    });

    // 13. Membership Form Submission Handler
    const membershipForm = document.getElementById('membershipForm');
    if (membershipForm) {
        membershipForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = membershipForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin me-2"></i> Processing...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                membershipForm.classList.add('d-none');
                document.getElementById('membershipSuccess').classList.remove('d-none');
                submitBtn.innerHTML = 'Confirm & Join Now';
                submitBtn.disabled = false;
            }, 1200);
        });
    }

    // 14. Newsletter Form Handler
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('newsletterEmail');
            const feedback = document.getElementById('newsletterFeedback');
            
            if (emailInput.value) {
                feedback.innerHTML = '<i class="fa-solid fa-circle-check me-1"></i> Subscribed successfully! Check your inbox.';
                feedback.classList.remove('d-none');
                emailInput.value = '';
                setTimeout(() => {
                    feedback.classList.add('d-none');
                }, 4000);
            }
        });
    }
});
