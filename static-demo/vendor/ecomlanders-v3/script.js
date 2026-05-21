/* ============================================
   HALO COLLAR - ANIME.JS POWERED INTERACTIONS
   Version 3.0
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initPromoBanner();
    initMobileMenu();
    initHeroAnimation();
    initStoryPanels();
    initScrollAnimations();
    initStepHighlighter();
    initNavScroll();
    initSectionNav();
    initSmoothScroll();
    initCarousel();
    initShowcasePills();
    initColorPicker();
    initFAQ();
    initFlipCards();
    initAppSlider();
    initThemeToggle();
});

/* ---------- Hero Animation ---------- */
function initHeroAnimation() {
    const tl = anime.timeline({
        easing: 'easeOutExpo'
    });

    tl.add({
        targets: '.hero-title-line',
        translateY: ['100%', '0%'],
        opacity: [0, 1],
        duration: 1200,
        delay: anime.stagger(150)
    })
        .add({
            targets: '.hero-subtitle',
            translateY: [30, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=600')
        .add({
            targets: '.hero-cta',
            translateY: [20, 0],
            opacity: [0, 1],
            duration: 800
        }, '-=400')
        .add({
            targets: '.hero-image',
            scale: [1.1, 1.05],
            duration: 2000,
            easing: 'easeOutQuad'
        }, 0);
}

/* ---------- Story Panels - Scroll Reveal ---------- */
function initStoryPanels() {
    const panels = document.querySelectorAll('.story-panel');
    if (panels.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '0px 0px -10% 0px'
    });

    panels.forEach(panel => observer.observe(panel));
}

/* ---------- Scroll Animations ---------- */
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.anim-fade, .anim-scale, .anim-card, .anim-text');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = el.dataset.delay || 0;

                // Use anime.js for the animation
                anime({
                    targets: el,
                    translateY: el.classList.contains('anim-scale') ? 0 : [30, 0],
                    scale: el.classList.contains('anim-scale') ? [0.95, 1] : 1,
                    opacity: [0, 1],
                    duration: 800,
                    delay: parseInt(delay),
                    easing: 'easeOutExpo'
                });

                el.classList.add('visible');
                observer.unobserve(el);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add stagger delays for sibling elements
    animatedElements.forEach((el) => {
        const parent = el.parentElement;
        const siblings = parent.querySelectorAll('.anim-fade, .anim-scale, .anim-card, .anim-text');

        if (siblings.length > 1) {
            const siblingIndex = Array.from(siblings).indexOf(el);
            el.dataset.delay = siblingIndex * 100;
        }

        observer.observe(el);
    });


    // Benefits cards stagger
    const benefitCards = document.querySelectorAll('.benefit-card');
    const benefitsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.benefit-card',
                    translateY: [60, 0],
                    opacity: [0, 1],
                    duration: 800,
                    delay: anime.stagger(100, { start: 0 }),
                    easing: 'easeOutExpo'
                });
                benefitsObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (benefitCards.length > 0) {
        benefitsObserver.observe(benefitCards[0]);
    }

    // Testimonial cards stagger
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const testimonialsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                anime({
                    targets: '.testimonial-card',
                    translateY: [50, 0],
                    opacity: [0, 1],
                    duration: 700,
                    delay: anime.stagger(150),
                    easing: 'easeOutExpo'
                });
                testimonialsObserver.disconnect();
            }
        });
    }, { threshold: 0.2 });

    if (testimonialCards.length > 0) {
        testimonialsObserver.observe(testimonialCards[0]);
    }
}

/* ---------- How It Works Step Highlighter ---------- */
function initStepHighlighter() {
    const steps = document.querySelectorAll('.how-step');
    const images = document.querySelectorAll('.how-image');
    if (steps.length === 0) return;

    let currentStep = '1';

    const updateActiveImage = (stepNum) => {
        if (stepNum === currentStep) return;
        currentStep = stepNum;

        images.forEach(img => {
            if (img.dataset.step === stepNum) {
                img.classList.add('active');
            } else {
                img.classList.remove('active');
            }
        });
    };

    // Use scroll position to determine active step
    const handleScroll = () => {
        const viewportCenter = window.innerHeight / 2;
        let closestStep = null;
        let closestDistance = Infinity;

        steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            const stepCenter = rect.top + rect.height / 2;
            const distance = Math.abs(stepCenter - viewportCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestStep = step;
            }
        });

        if (closestStep) {
            // Update active step styling
            steps.forEach(s => s.classList.remove('active'));
            closestStep.classList.add('active');

            // Update image
            const stepNum = closestStep.dataset.step;
            updateActiveImage(stepNum);
        }
    };

    // Throttle scroll handler for performance
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleScroll();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // Initial state
    setTimeout(() => {
        steps[0].classList.add('active');
        updateActiveImage('1');
    }, 500);
}

/* ---------- Promo Banner ---------- */
function initPromoBanner() {
    const banner = document.querySelector('.promo-banner');
    const nav = document.querySelector('.nav');
    if (!banner || !nav) return;

    // Set nav offset for the banner
    nav.classList.add('has-banner');

    // Rotate messages
    const msgs = banner.querySelectorAll('.promo-msg');
    if (msgs.length > 1) {
        let current = 0;
        setInterval(() => {
            msgs[current].classList.remove('active');
            current = (current + 1) % msgs.length;
            msgs[current].classList.add('active');
        }, 10000);
    }

    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll > 50) {
            banner.style.transform = 'translateY(-100%)';
            banner.style.position = 'fixed';
            banner.style.top = '0';
            banner.style.left = '0';
            banner.style.right = '0';
            nav.classList.remove('has-banner');
        } else {
            banner.style.transform = 'translateY(0)';
            banner.style.position = 'relative';
            nav.classList.add('has-banner');
        }
        lastScroll = currentScroll;
    }, { passive: true });
}

/* ---------- Mobile Menu ---------- */
function initMobileMenu() {
    const toggle = document.querySelector('.nav-mobile-toggle');
    const mobileMenu = document.querySelector('.nav-mobile-menu');
    if (!toggle || !mobileMenu) return;

    // Move the menu out of .nav. Once .nav.scrolled applies backdrop-filter, .nav
    // becomes a containing block for fixed-position descendants (CSS spec), which
    // collapses the fullscreen menu to the size of .nav itself (~60px). Hoisting to
    // #halo-v2-root keeps position: fixed pinned to the viewport while preserving the
    // safeguard CSS scope (#halo-v2-root .nav-mobile-menu).
    const variantRoot = document.getElementById('halo-v2-root');
    if (variantRoot && mobileMenu.parentElement !== variantRoot) {
        variantRoot.appendChild(mobileMenu);
    }

    toggle.addEventListener('click', () => {
        const isActive = mobileMenu.classList.contains('active');
        if (isActive) {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        } else {
            mobileMenu.classList.add('active');
            toggle.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });

    // Close on backdrop click
    mobileMenu.addEventListener('click', (e) => {
        if (e.target === mobileMenu || e.target === mobileMenu.querySelector('.nav-mobile-menu::before')) {
            mobileMenu.classList.remove('active');
            toggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ---------- Navigation Scroll Effect ---------- */
function initNavScroll() {
    const nav = document.querySelector('.nav');
    const logoImg = nav ? nav.querySelector('.logo-img') : null;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 100) {
            nav.classList.add('scrolled');
            if (logoImg) logoImg.src = '../vendor/ecomlanders-v3/halo-logo-dark.svg';
        } else {
            nav.classList.remove('scrolled');
            if (logoImg) logoImg.src = '../vendor/ecomlanders-v3/halo-logo.svg?v=2';
        }
    }, { passive: true });
}

/* ---------- Sticky Section Nav ---------- */
function initSectionNav() {
    const sectionNav = document.getElementById('sectionNav');
    const hero = document.querySelector('.hero');
    const nav = document.querySelector('.nav');
    const links = document.querySelectorAll('.section-nav__link');
    if (!sectionNav || !hero || !nav || links.length === 0) return;

    // Sections to track
    const sectionIds = ['features', 'how-works', 'halo-app', 'who-is-for', 'faq'];
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    // Show/hide section nav (and main nav) based on hero visibility.
    // Desktop only: on mobile the section-nav has no logo / hamburger / shop link,
    // so swapping it in for .nav would strand the user with no menu access.
    const desktopNavQuery = window.matchMedia('(min-width: 1025px)');
    let isVisible = false;
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!desktopNavQuery.matches) {
                // Mobile: keep main nav visible so the hamburger stays reachable.
                nav.classList.remove('nav-hidden');
                sectionNav.classList.remove('visible');
                isVisible = false;
                return;
            }
            if (entry.isIntersecting) {
                // Hero is in view — show main nav, hide section nav
                nav.classList.remove('nav-hidden');
                sectionNav.classList.remove('visible');
                isVisible = false;
            } else {
                // Hero scrolled out — hide main nav, show section nav
                nav.classList.add('nav-hidden');
                sectionNav.classList.add('visible');
                isVisible = true;
            }
        });
    }, {
        threshold: 0,
        rootMargin: '-60px 0px 0px 0px'
    });

    // If the user resizes across the breakpoint, clear any stale mobile/desktop state.
    desktopNavQuery.addEventListener('change', () => {
        if (!desktopNavQuery.matches) {
            nav.classList.remove('nav-hidden');
            sectionNav.classList.remove('visible');
            isVisible = false;
        }
    });

    heroObserver.observe(hero);

    // Scroll spy — highlight active section
    let currentActive = null;

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                setActiveLink(id);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '-120px 0px -50% 0px'
    });

    sections.forEach(section => sectionObserver.observe(section));

    const linksContainer = sectionNav.querySelector('.section-nav__links');

    function setActiveLink(id) {
        if (currentActive === id) return;
        currentActive = id;

        links.forEach(link => {
            if (link.getAttribute('data-section') === id) {
                link.classList.add('active');
                // Scroll the active link into view within the horizontal nav
                if (linksContainer) {
                    const linkLeft = link.offsetLeft;
                    const linkWidth = link.offsetWidth;
                    const containerWidth = linksContainer.clientWidth;
                    const scrollLeft = linksContainer.scrollLeft;
                    // Center the active link in the visible area
                    const targetScroll = linkLeft - (containerWidth / 2) + (linkWidth / 2);
                    linksContainer.scrollTo({ left: targetScroll, behavior: 'smooth' });
                }
            } else {
                link.classList.remove('active');
            }
        });
    }
}

/* ---------- Smooth Scroll ---------- */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const mainNav = document.querySelector('.nav');
                const sectionNav = document.getElementById('sectionNav');
                // Use section nav height if main nav is hidden, otherwise use main nav
                const navOffset = (mainNav && mainNav.classList.contains('nav-hidden') && sectionNav)
                    ? sectionNav.offsetHeight
                    : (mainNav ? mainNav.offsetHeight : 0);
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navOffset - 8;

                // Use anime.js for smooth scroll — fast & snappy
                anime({
                    targets: { scroll: window.pageYOffset },
                    scroll: targetPosition,
                    duration: 500,
                    easing: 'easeOutQuart',
                    update: function (anim) {
                        window.scrollTo(0, anim.animations[0].currentValue);
                    }
                });
            }
        });
    });
}

/* ---------- Parallax on scroll (disabled) ---------- */
/* Removed to prevent image gaps at certain widths */

/* ---------- Add to Cart Button ---------- */
(function () {
    const addToCartBtn = document.querySelector('.pricing-card .btn-primary');

    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const originalText = addToCartBtn.textContent;

            anime({
                targets: addToCartBtn,
                scale: [1, 0.95, 1],
                duration: 300,
                easing: 'easeInOutQuad'
            });

            addToCartBtn.textContent = 'Added!';
            addToCartBtn.style.background = '#22c55e';

            setTimeout(() => {
                addToCartBtn.textContent = originalText;
                addToCartBtn.style.background = '';
            }, 2000);
        });
    }
})();

/* ---------- Highlights Carousel ---------- */
function initCarousel() {
    const track = document.querySelector('.carousel-track');
    const cards = document.querySelectorAll('.carousel-card');
    const dots = document.querySelectorAll('.carousel-dot');
    const pauseBtn = document.querySelector('.carousel-pause');

    if (!track || cards.length === 0) return;

    let currentIndex = 0;
    let isPlaying = false;
    let autoplayInterval;
    let isDragging = false;
    let startX = 0;
    let scrollLeft = 0;

    const getCardWidth = () => {
        const card = cards[0];
        const gap = 24; // 1.5rem
        return card.offsetWidth + gap;
    };

    const goToSlide = (index) => {
        currentIndex = index;
        const cardWidth = getCardWidth();
        track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    };

    const nextSlide = () => {
        const next = (currentIndex + 1) % cards.length;
        goToSlide(next);
    };

    const startAutoplay = () => {
        if (autoplayInterval) clearInterval(autoplayInterval);
        autoplayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoplay = () => {
        clearInterval(autoplayInterval);
    };

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            if (isPlaying) {
                stopAutoplay();
                startAutoplay();
            }
        });
    });

    // Pause button
    pauseBtn.addEventListener('click', () => {
        isPlaying = !isPlaying;
        if (isPlaying) {
            startAutoplay();
            pauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1"/>
                <rect x="14" y="5" width="4" height="14" rx="1"/>
            </svg>`;
        } else {
            stopAutoplay();
            pauseBtn.innerHTML = `<svg viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5.14v13.72a1 1 0 001.5.86l11-6.86a1 1 0 000-1.72l-11-6.86a1 1 0 00-1.5.86z"/>
            </svg>`;
        }
    });

    // Drag to scroll
    track.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = currentIndex * getCardWidth();
        track.style.transition = 'none';
    });

    track.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX);
        track.style.transform = `translateX(-${scrollLeft - walk}px)`;
    });

    track.addEventListener('mouseup', (e) => {
        if (!isDragging) return;
        isDragging = false;
        track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';

        const x = e.pageX - track.offsetLeft;
        const walk = x - startX;
        const cardWidth = getCardWidth();

        if (Math.abs(walk) > cardWidth / 4) {
            if (walk > 0 && currentIndex > 0) {
                goToSlide(currentIndex - 1);
            } else if (walk < 0 && currentIndex < cards.length - 1) {
                goToSlide(currentIndex + 1);
            } else {
                goToSlide(currentIndex);
            }
        } else {
            goToSlide(currentIndex);
        }

        if (isPlaying) {
            stopAutoplay();
            startAutoplay();
        }
    });

    track.addEventListener('mouseleave', () => {
        if (isDragging) {
            isDragging = false;
            track.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
            goToSlide(currentIndex);
        }
    });

    // Paused by default - no autoplay on init
}

/* ---------- Product Showcase Pills ---------- */
function initShowcasePills() {
    const pills = document.querySelectorAll('.feature-pill');
    let collarImg = document.getElementById('showcase-collar-img');
    const navUp = document.getElementById('nav-up');
    const navDown = document.getElementById('nav-down');
    const featuresContainer = document.querySelector('.showcase-features');

    if (pills.length === 0 || !collarImg) return;

    let currentIndex = -1;

    const collarImages = {
        intro: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-sunburst-collar.webp',
        colors: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-sunburst-collar.webp',
        gps: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-sunburst-collar.webp',
        battery: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-midnight-collar.webp',
        fences: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-graphite-collar.webp',
        training: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-blaze-collar.webp',
        waterproof: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-midnight-collar.webp'
    };

    const updateNavButtons = () => {
        if (navUp) navUp.disabled = currentIndex <= 0;
        if (navDown) navDown.disabled = currentIndex >= pills.length - 1 || currentIndex === -1;

        // Toggle has-active class for showing nav arrows
        if (featuresContainer) {
            if (currentIndex >= 0) {
                featuresContainer.classList.add('has-active');
            } else {
                featuresContainer.classList.remove('has-active');
            }
        }
    };

    const activatePill = (index, animate = true) => {
        if (index < 0 || index >= pills.length) return;

        const pill = pills[index];
        const feature = pill.dataset.feature;
        const wasActive = pill.classList.contains('active');

        // Close all pills
        pills.forEach(p => p.classList.remove('active'));

        // Open the selected pill
        pill.classList.add('active');
        currentIndex = index;
        updateNavButtons();

        // Change collar image with fade
        if (collarImages[feature] && !wasActive) {
            anime({
                targets: collarImg,
                opacity: [1, 0],
                duration: 150,
                easing: 'easeOutQuad',
                complete: () => {
                    collarImg.src = collarImages[feature];
                    anime({
                        targets: collarImg,
                        opacity: [0, 1],
                        duration: 250,
                        easing: 'easeInQuad'
                    });
                }
            });
        }
    };

    // Click handlers for pills
    pills.forEach((pill, index) => {
        pill.addEventListener('click', () => {
            if (currentIndex === index) {
                // Clicking active pill closes it
                pill.classList.remove('active');
                currentIndex = -1;
                updateNavButtons();
            } else {
                activatePill(index);
            }
        });
    });

    // Navigation button handlers
    if (navUp) {
        navUp.addEventListener('click', () => {
            if (currentIndex > 0) {
                activatePill(currentIndex - 1);
            } else if (currentIndex === -1) {
                activatePill(pills.length - 1);
            }
        });
    }

    if (navDown) {
        navDown.addEventListener('click', () => {
            if (currentIndex === -1) {
                activatePill(0);
            } else if (currentIndex < pills.length - 1) {
                activatePill(currentIndex + 1);
            }
        });
    }

    // Color swatch handlers within the Colors pill
    const pillSwatches = document.querySelectorAll('.pill-swatch');
    const colorDot = document.querySelector('.color-dot');
    const pillColorImages = {
        sunburst: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-sunburst-collar.webp',
        midnight: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-midnight-collar.webp',
        orchid: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-orchid-collar.webp',
        graphite: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-graphite-collar.webp',
        blaze: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-blaze-collar.webp',
        realtree: 'https://halo.onitdigital.com/wp-content/themes/halocollar/images/h5/h5-realtree-collar.webp'
    };
    const colorGradients = {
        sunburst: '#FCD62D',
        midnight: '#1e3a5f',
        orchid: '#9b59b6',
        graphite: '#4a4a4a',
        blaze: '#e55039',
        realtree: '#5c6b4a'
    };

    pillSwatches.forEach(swatch => {
        swatch.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent pill from closing
            const color = swatch.dataset.color;

            // Update active swatch
            pillSwatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Update color dot
            if (colorDot) {
                colorDot.style.background = colorGradients[color];
            }

            // Update collar image
            if (pillColorImages[color]) {
                anime({
                    targets: collarImg,
                    opacity: [1, 0],
                    duration: 150,
                    easing: 'easeOutQuad',
                    complete: () => {
                        collarImg.src = pillColorImages[color];
                        anime({
                            targets: collarImg,
                            opacity: [0, 1],
                            duration: 250,
                            easing: 'easeInQuad'
                        });
                    }
                });
            }
        });
    });

    activatePill(0, false);
    updateNavButtons();
}

/* ---------- Color Picker ---------- */
function initColorPicker() {
    const swatches = document.querySelectorAll('.color-swatch');
    let collarImage = document.getElementById('pricing-collar-image');

    if (!swatches.length || !collarImage) return;

    const colorImages = {
        sunburst: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-sunburst-collar.webp',
        midnight: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-midnight-collar.webp',
        orchid: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-orchid-collar.webp',
        graphite: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-graphite-collar.webp',
        blaze: 'https://www.halocollar.com/wp-content/themes/halocollar/images/h5/h5-blaze-collar.webp',
        realtree: 'https://halo.onitdigital.com/wp-content/themes/halocollar/images/h5/h5-realtree-collar.webp'
    };

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.dataset.color;
            const newImageUrl = colorImages[color];

            if (!newImageUrl) return;

            // Update active state
            swatches.forEach(s => s.classList.remove('active'));
            swatch.classList.add('active');

            // Animate image change
            anime({
                targets: collarImage,
                opacity: [1, 0],
                duration: 150,
                easing: 'easeOutQuad',
                complete: () => {
                    collarImage.src = newImageUrl;
                    collarImage.onload = () => {
                        anime({
                            targets: collarImage,
                            opacity: [0, 1],
                            duration: 150,
                            easing: 'easeInQuad'
                        });
                    };
                }
            });
        });
    });
}

/* ---------- FAQ Accordion ---------- */
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all other items
            faqItems.forEach(otherItem => {
                otherItem.classList.remove('active');
            });

            // Toggle current item
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // Tab switching
    var faqTabs = document.querySelectorAll('.faq-tab');
    var faqContents = document.querySelectorAll('.faq-tab-content');
    faqTabs.forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = tab.getAttribute('data-tab');
            faqTabs.forEach(function(t) { t.classList.remove('active'); });
            faqContents.forEach(function(c) { c.classList.remove('active'); });
            tab.classList.add('active');
            var content = document.querySelector('.faq-tab-content[data-content="' + target + '"]');
            if (content) content.classList.add('active');
        });
    });
}

// ===== BLUR CAROUSEL =====

// ===== FLIP CAROUSEL =====
function initFlipCards() {
    // Flip logic
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });

    // Scroll logic
    const trackWrapper = document.querySelector('.flip-carousel-track-wrapper');
    const prevBtn = document.querySelector('.flip-carousel-nav .nav-btn-prev');
    const nextBtn = document.querySelector('.flip-carousel-nav .nav-btn-next');

    if (trackWrapper && prevBtn && nextBtn) {
        // Card width depends on media query, but for desktop it's 380px + 12px gap = 392px
        // For mobile it's 300px + 12px = 312px. We can just use a percentage of the clientWidth or read a card offset
        const getScrollAmount = () => {
            const firstCard = trackWrapper.querySelector('.flip-card');
            return firstCard ? firstCard.offsetWidth + 12 : 392;
        };

        const updateButtons = () => {
            prevBtn.disabled = trackWrapper.scrollLeft <= 0;
            // 5px buffer
            nextBtn.disabled = trackWrapper.scrollLeft >= (trackWrapper.scrollWidth - trackWrapper.clientWidth - 5);
        };

        prevBtn.addEventListener('click', () => {
            trackWrapper.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
        });

        nextBtn.addEventListener('click', () => {
            trackWrapper.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
        });

        trackWrapper.addEventListener('scroll', updateButtons, { passive: true });
        window.addEventListener('resize', updateButtons, { passive: true });

        // Initial check
        setTimeout(updateButtons, 100);
    }
}

// ===== APP SLIDER =====
function initAppSlider() {
    const track = document.getElementById('appSliderTrack');
    const nextBtn = document.getElementById('appSliderNext');

    if (track && nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const firstCard = track.querySelector('.app-slider-card');
            if (!firstCard) return;

            // Read gap or default to 40px (2.5rem)
            const computedStyle = window.getComputedStyle(track);
            const gap = parseFloat(computedStyle.gap) || 40;
            const scrollStep = firstCard.offsetWidth + gap;

            const currentScroll = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;

            if (currentScroll >= maxScroll - 50) {
                // Rewind cleanly
                track.scrollLeft = 0;
            } else {
                track.scrollLeft = currentScroll + scrollStep;
            }
        });
    }
}

/* ---------- Everywhere Flip Cards ---------- */
function initEverywhereCards() {
    const cards = document.querySelectorAll('.everywhere-card');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('is-flipped');
        });
    });
}

function initEverywhereSlider() {
    const slider = document.getElementById('everywhereSlider');
    const prevBtn = document.getElementById('everywherePrev');
    const nextBtn = document.getElementById('everywhereNext');

    if (!slider || !prevBtn || !nextBtn) return;

    // Arrow navigation — scroll by one card width + gap (instant)
    function getScrollStep() {
        const card = slider.querySelector('.everywhere-card');
        if (!card) return 374;
        const gap = parseFloat(getComputedStyle(slider).gap) || 24;
        return card.offsetWidth + gap;
    }

    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getScrollStep(), behavior: 'auto' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getScrollStep(), behavior: 'auto' });
    });

    // Drag to scroll
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
        slider.style.scrollBehavior = 'auto';
        slider.style.scrollSnapType = 'none';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const walk = e.pageX - startX;
        slider.scrollLeft = scrollStart - walk;
    });

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        slider.style.scrollBehavior = '';
        slider.style.scrollSnapType = '';
    };

    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', stopDrag);
}

initEverywhereCards();
initEverywhereSlider();

/* ---------- Smart Safety Carousel ---------- */
function initSmartSafetySlider() {
    const slider = document.getElementById('smartSafetySlider');
    const prevBtn = document.getElementById('smartSafetyPrev');
    const nextBtn = document.getElementById('smartSafetyNext');

    if (!slider || !prevBtn || !nextBtn) return;

    const getScrollStep = () => {
        const card = slider.querySelector('.smart-safety-card');
        return card ? card.offsetWidth + 24 : 500;
    };

    // Arrow navigation
    prevBtn.addEventListener('click', () => {
        slider.scrollBy({ left: -getScrollStep(), behavior: 'smooth' });
    });

    nextBtn.addEventListener('click', () => {
        slider.scrollBy({ left: getScrollStep(), behavior: 'smooth' });
    });

    // Drag to scroll
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX;
        scrollStart = slider.scrollLeft;
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const walk = e.pageX - startX;
        slider.scrollLeft = scrollStart - walk;
    });

    const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
    };

    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mouseleave', stopDrag);
}

initSmartSafetySlider();

console.log('Halo Landing Page 3.0 with anime.js initialized');

// ===== FEATURE CAROUSEL =====
function initBlurCarousel() {
    const section = document.querySelector('.blur-carousel-section');
    if (!section) return;

    const track = section.querySelector('.blur-carousel-track');
    const cards = section.querySelectorAll('.blur-card');
    const prevBtn = section.querySelector('.blur-nav-prev');
    const nextBtn = section.querySelector('.blur-nav-next');

    if (!track || !prevBtn || !nextBtn) return;

    let currentIndex = 0;
    function getStepWidth() { return (cards[0] ? cards[0].offsetWidth + 24 : 308); }

    function updateCarousel() {
        const offset = currentIndex * getStepWidth();
        track.style.transform = `translateX(-${offset}px)`;
        prevBtn.disabled = currentIndex === 0;
        nextBtn.disabled = currentIndex >= cards.length - 4;
    }

    prevBtn.addEventListener('click', () => {
        if (currentIndex > 0) { currentIndex--; updateCarousel(); }
    });

    nextBtn.addEventListener('click', () => {
        if (currentIndex < cards.length - 4) { currentIndex++; updateCarousel(); }
    });

    updateCarousel();
}

initBlurCarousel();

/* ---------- Theme: Light Mode Default ---------- */
function initThemeToggle() {
    // Light mode is now the default — set unconditionally
    document.documentElement.setAttribute('data-theme', 'light');
    localStorage.removeItem('halo-theme');
}
