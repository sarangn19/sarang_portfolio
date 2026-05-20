// ============================================
// PORTFOLIO INTERACTIONS & ANIMATIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initCustomCursor();
    initSmoothScroll();
    initNavbarAnimations();
    initScrollReveal();
    initMagneticButtons();
    initParallax();
    initTextAnimations();
    initMobileMenu();
    initLinkHoverEffects();
    initCapabilities();
});

// ============================================
// CUSTOM CURSOR
// ============================================
function initCustomCursor() {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cursor = document.createElement('div');
    cursor.className = 'cursor';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow
    function animateCursor() {
        // Main cursor (smooth follow)
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Dot (fast follow)
        dotX += (mouseX - dotX) * 0.5;
        dotY += (mouseY - dotY) * 0.5;
        cursorDot.style.left = dotX + 'px';
        cursorDot.style.top = dotY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .work-card, .service-card');
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
    });
}

// ============================================
// SMOOTH SCROLL (Native with easing)
// ============================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                const offset = 80; // Account for fixed navbar
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// NAVBAR ANIMATIONS
// ============================================
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    let ticking = false;

    // Initial animation
    setTimeout(() => {
        navbar.classList.add('visible');
    }, 100);

    function updateNavbar() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class
        if (currentScroll > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Hide/show on scroll direction
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }, { passive: true });
}

// ============================================
// SCROLL REVEAL ANIMATIONS
// ============================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll(
        '.service-card, .process-step, .section-title'
    );
    // work-card and testimonial removed - was causing visibility issues

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay based on element index within parent
                const parent = entry.target.parentElement;
                const siblings = Array.from(parent.children);
                const elIndex = siblings.indexOf(entry.target);
                
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, elIndex * 100);

                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    revealElements.forEach(el => observer.observe(el));

    // CTA Section reveal
    const ctaSection = document.querySelector('.cta');
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        ctaObserver.observe(ctaSection);
    }
}

// ============================================
// MAGNETIC BUTTON EFFECT
// ============================================
function initMagneticButtons() {
    // Only on desktop
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const magneticElements = document.querySelectorAll('.btn');
    
    magneticElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });
}

// ============================================
// PARALLAX EFFECTS (Disabled for work images)
// ============================================
function initParallax() {
    // Parallax disabled - was causing visibility issues
}

// ============================================
// TEXT ANIMATIONS
// ============================================
function initTextAnimations() {
    // Hero title character animation
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.innerHTML = '';
        
        // Split by words
        const words = text.split(' ');
        words.forEach((word, wordIndex) => {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'word';
            wordSpan.style.display = 'inline-block';
            wordSpan.style.overflow = 'hidden';
            wordSpan.style.marginRight = '0.25em';
            
            // Split word into characters
            const chars = word.split('');
            chars.forEach((char, charIndex) => {
                const charSpan = document.createElement('span');
                charSpan.className = 'char';
                charSpan.textContent = char;
                charSpan.style.display = 'inline-block';
                charSpan.style.animationDelay = `${(wordIndex * 0.1) + (charIndex * 0.03)}s`;
                wordSpan.appendChild(charSpan);
            });
            
            heroTitle.appendChild(wordSpan);
        });
    }

    // Section title animations â€” skip on case study pages
    if (document.body.classList.contains('cs-page')) return;
    document.querySelectorAll('h2, h3').forEach(title => {
        title.classList.add('text-reveal');
        const text = title.textContent;
        title.innerHTML = `<span>${text}</span>`;
    });
}

// ============================================
// MOBILE MENU
// ============================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            
            // Animate hamburger to X
            const spans = mobileMenuBtn.querySelectorAll('span');
            if (mobileMenuBtn.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.transform = 'rotate(-45deg) translate(0, 0)';
            } else {
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            }
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
                const spans = mobileMenuBtn.querySelectorAll('span');
                spans[0].style.transform = '';
                spans[1].style.transform = '';
            });
        });
    }
}

// ============================================
// LINK HOVER EFFECTS
// ============================================
function initLinkHoverEffects() {
    // Add underline animation to footer links
    document.querySelectorAll('.footer-column a').forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)';
        });
    });

    // Work card hover simplified
    // CSS handles hover effects now
}

// ============================================
// SCROLL VELOCITY DETECTION (Disabled)
// ============================================
// Skew effect disabled - was causing visibility issues

// ============================================
// CAPABILITIES SCROLL
// ============================================
function initCapabilities() {
    const words = document.querySelectorAll('.cap-word');
    const groups = document.querySelectorAll('.cap-group');
    const items = document.querySelectorAll('.cap-item');
    if (!words.length) return;

    // Activate first word by default
    words[0].classList.add('active');

    // IntersectionObserver â€” highlight word when group enters viewport
    const wordObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            const key = entry.target.dataset.group;
            words.forEach(w => w.classList.toggle('active', w.dataset.cap === key));
        });
    }, { threshold: 0.4 });

    groups.forEach(g => wordObserver.observe(g));

    // IntersectionObserver â€” fade items in as they scroll into view
    const itemObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                itemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    items.forEach(item => itemObserver.observe(item));
}
// ============================================
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations for accessibility
    document.querySelectorAll('.service-card, .work-card, .process-step').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
        el.style.transition = 'none';
    });
}

