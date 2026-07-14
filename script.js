/**
 * ═══════════════════════════════════════════════════════════════
 * ELYSIAN MEMORIES — SCRAPBOOK BIRTHDAY WEBSITE
 * Interactive animations and effects
 * ═══════════════════════════════════════════════════════════════
 */

// ─── Wait for fonts to load ───
document.fonts.ready.then(() => {
    initAll();
});

function initAll() {
    initEnvelopeSequence();
    initFloatingParticles();
    initFloatingHearts();
    initFloatingPetals();
    initScrollAnimations();
    initCandles();
    initSparkles();
    initMusicBtn();
}

// ═══════════════════════════════════════════════════════════════
// ENVELOPE OPEN SEQUENCE
// ═══════════════════════════════════════════════════════════════

function initEnvelopeSequence() {
    const envelopeWrapper = document.getElementById('envelopeWrapper');
    const waxSeal = document.getElementById('waxSeal');
    const letter = document.getElementById('letter');
    const letterContent = document.querySelector('.letter-content');
    const letterHeading = document.getElementById('letterHeading');
    const letterBody = document.getElementById('letterBody');
    const letterCursor = document.getElementById('letterCursor');
    const tapHint = document.getElementById('tapHint');
    const envelopeSection = document.getElementById('envelope-section');
    const mainContent = document.getElementById('mainContent');
    const musicBtn = document.getElementById('musicBtn');

    let isOpen = false;

    waxSeal.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isOpen) return;
        isOpen = true;

        // Hide tap hint
        tapHint.style.opacity = '0';
        tapHint.style.transition = 'opacity 0.5s ease';

        // Step 1: Add open class to trigger CSS flap animation
        envelopeWrapper.classList.add('open');

        // Step 2: Animate letter sliding out
        setTimeout(() => {
            letter.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
            letter.style.transform = 'translateX(-50%) translateY(-140%)';
        }, 200);

        // Step 3: Expand letter to fill screen
        setTimeout(() => {
            letter.style.transition = 'all 1s cubic-bezier(0.4, 0, 0.2, 1)';
            letter.style.width = '90vw';
            letter.style.height = '80vh';
            letter.style.maxWidth = '800px';
            letter.style.zIndex = '100';
            letter.style.boxShadow = '0 30px 80px rgba(92, 42, 42, 0.3)';
            letter.style.borderRadius = '8px';

            // Fade out envelope
            envelopeWrapper.style.transition = 'opacity 0.8s ease';
            envelopeWrapper.style.opacity = '0';
        }, 900);

        // Step 4: Reveal letter content with typewriter effect
        setTimeout(() => {
            letterContent.style.transition = 'opacity 0.8s ease';
            letterContent.style.opacity = '1';

            // Typewriter for heading
            typewriterEffect(letterHeading, 80, () => {
                // Then typewriter for body
                setTimeout(() => {
                    letterCursor.style.opacity = '1';
                    typewriterEffect(letterBody, 50, () => {
                        // Fade out cursor after typing completes
                        setTimeout(() => {
                            letterCursor.style.transition = 'opacity 0.5s ease';
                            letterCursor.style.opacity = '0';
                        }, 1500);
                    });
                }, 300);
            });
        }, 1600);

        // Step 5: Transition to main content
        setTimeout(() => {
            // Fade out envelope section
            envelopeSection.style.transition = 'opacity 1.5s ease';
            envelopeSection.style.opacity = '0';

            // Enable scrolling
            document.body.style.overflow = 'auto';

            // Show main content
            setTimeout(() => {
                mainContent.classList.add('visible');
                envelopeSection.style.pointerEvents = 'none';

                // Show music button
                musicBtn.classList.add('visible');

                // Trigger hero animations
                animateHeroElements();
            }, 500);
        }, 7000);
    });
}

// ─── Typewriter Effect ───
function typewriterEffect(element, speed, callback) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';

    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            if (callback) callback();
        }
    }, speed);
}

// ─── Animate Hero Elements ───
function animateHeroElements() {
    const heroTitle = document.getElementById('heroTitle');
    const heroSubtitle = document.getElementById('heroSubtitle');
    const heroScrollHint = document.querySelector('.hero-scroll-hint');

    setTimeout(() => {
        heroTitle.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
        heroTitle.style.opacity = '1';
        heroTitle.style.transform = 'translateY(0)';
    }, 300);

    setTimeout(() => {
        heroSubtitle.style.transition = 'all 1s ease';
        heroSubtitle.style.opacity = '1';
        heroSubtitle.style.transform = 'translateY(0)';
    }, 800);

    setTimeout(() => {
        heroScrollHint.style.transition = 'opacity 1s ease';
        heroScrollHint.style.opacity = '1';
    }, 1400);
}

// ═══════════════════════════════════════════════════════════════
// FLOATING PARTICLES
// ═══════════════════════════════════════════════════════════════

function initFloatingParticles() {
    const container = document.getElementById('particles-container');
    const colors = ['#D4A5A5', '#E8D5A3', '#F3E5E0', '#C9A961', '#fff'];

    for (let i = 0; i < 25; i++) {
        createParticle(container, colors);
    }
}

function createParticle(container, colors) {
    const particle = document.createElement('div');
    particle.className = 'floating-particle';

    const size = Math.random() * 5 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 15 + 15;
    const delay = Math.random() * 15;

    particle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        box-shadow: 0 0 ${size * 2}px ${color};
    `;

    container.appendChild(particle);
}

// ═══════════════════════════════════════════════════════════════
// FLOATING HEARTS
// ═══════════════════════════════════════════════════════════════

function initFloatingHearts() {
    const container = document.getElementById('hearts-container');

    for (let i = 0; i < 12; i++) {
        createHeart(container);
    }
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.className = 'floating-heart';

    const size = Math.random() * 20 + 12;
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 12;
    const delay = Math.random() * 12;
    const opacity = Math.random() * 0.4 + 0.2;

    heart.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
        opacity: ${opacity};
    `;

    heart.innerHTML = `
        <svg viewBox="0 0 24 24">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
        </svg>
    `;

    container.appendChild(heart);
}

// ═══════════════════════════════════════════════════════════════
// FLOATING PETALS
// ═══════════════════════════════════════════════════════════════

function initFloatingPetals() {
    const container = document.getElementById('petals-container');

    for (let i = 0; i < 15; i++) {
        createPetal(container);
    }
}

function createPetal(container) {
    const petal = document.createElement('div');
    petal.className = 'floating-petal';

    const size = Math.random() * 15 + 8;
    const left = Math.random() * 100;
    const duration = Math.random() * 18 + 12;
    const delay = Math.random() * 10;

    // Randomize petal color between dusty rose and soft pink
    const hue = Math.random() * 30 + 330; // 330-360 (pink/rose range)
    const saturation = Math.random() * 30 + 50;
    const lightness = Math.random() * 20 + 70;

    petal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: ${delay}s;
    `;

    petal.querySelector = null; // will use ::before

    // Override the gradient with random hue
    const style = document.createElement('style');
    const uniqueClass = `petal-${Math.random().toString(36).substr(2, 9)}`;
    petal.classList.add(uniqueClass);
    style.textContent = `.${uniqueClass}::before {
        background: linear-gradient(135deg, hsl(${hue}, ${saturation}%, ${lightness}%), transparent) !important;
    }`;
    document.head.appendChild(style);

    container.appendChild(petal);
}

// ═══════════════════════════════════════════════════════════════
// SCROLL ANIMATIONS (Intersection Observer)
// ═══════════════════════════════════════════════════════════════

function initScrollAnimations() {
    // Polaroid pop-in animation
    const polaroids = document.querySelectorAll('.polaroid');
    const polaroidObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.style.getPropertyValue('--delay')) || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay * 1000);
                polaroidObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    polaroids.forEach(p => polaroidObserver.observe(p));

    // Gallery title
    const galleryTitle = document.querySelector('.gallery-title');
    if (galleryTitle) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    titleObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        titleObserver.observe(galleryTitle);
    }

    // SVG Scribble text animations
    initScribbleAnimations();

    // Wish section animations
    initWishSectionAnimations();

    // Love letter card animation
    const loveLetterCard = document.querySelector('.love-letter-card');
    if (loveLetterCard) {
        const cardObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    cardObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        cardObserver.observe(loveLetterCard);
    }

    // Final section animations
    initFinalSectionAnimations();

    // Flower captions
    const flowerCaptions = document.querySelectorAll('.flower-caption');
    flowerCaptions.forEach(caption => {
        const captionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transition = 'all 1s ease 1.5s';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                    captionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        captionObserver.observe(caption);
    });

    // Parallax effect for background sections
    initParallaxEffect();
}

// ─── SVG Scribble Text Animations ───
function initScribbleAnimations() {
    // Section 1: "You are my sunshine"
    const strokeText1 = document.getElementById('strokeText1');
    const baseText1 = document.getElementById('baseText1');

    if (strokeText1 && baseText1) {
        const observer1 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Animate stroke drawing
                    strokeText1.style.transition = 'stroke-dashoffset 3s cubic-bezier(0.4, 0, 0.2, 1)';
                    strokeText1.style.strokeDashoffset = '0';

                    // Fade in base text after stroke
                    setTimeout(() => {
                        baseText1.style.transition = 'opacity 1.5s ease';
                        baseText1.style.opacity = '1';
                    }, 1500);

                    observer1.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer1.observe(strokeText1.closest('.flower-message-section'));
    }

    // Section 2: "Love you to the moon and back"
    const strokeText2 = document.getElementById('strokeText2');
    const baseText2 = document.getElementById('baseText2');

    if (strokeText2 && baseText2) {
        const observer2 = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    strokeText2.style.transition = 'stroke-dashoffset 3s cubic-bezier(0.4, 0, 0.2, 1)';
                    strokeText2.style.strokeDashoffset = '0';

                    setTimeout(() => {
                        baseText2.style.transition = 'opacity 1.5s ease';
                        baseText2.style.opacity = '1';
                    }, 1500);

                    observer2.unobserve(entry.target);
                }
            });
        }, { threshold: 0.4 });

        observer2.observe(strokeText2.closest('.flower-message-section'));
    }
}

// ─── Wish Section Animations ───
function initWishSectionAnimations() {
    const wishTitle = document.getElementById('wishTitle');
    const wishSubtitle = document.querySelector('.wish-subtitle');

    if (wishTitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    wishTitle.style.transition = 'all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)';
                    wishTitle.style.opacity = '1';
                    wishTitle.style.transform = 'scale(1)';

                    if (wishSubtitle) {
                        setTimeout(() => {
                            wishSubtitle.style.transition = 'opacity 1s ease';
                            wishSubtitle.style.opacity = '1';
                        }, 400);
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(wishTitle.closest('.wish-section'));
    }
}

// ─── Final Section Animations ───
function initFinalSectionAnimations() {
    const finalTitle = document.getElementById('finalTitle');
    const finalSubtitle = document.getElementById('finalSubtitle');
    const finalHeart = document.querySelector('.final-heart');

    if (finalTitle) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Title animation
                    finalTitle.style.transition = 'all 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    finalTitle.style.opacity = '1';
                    finalTitle.style.transform = 'scale(1)';

                    // Subtitle animation
                    setTimeout(() => {
                        if (finalSubtitle) {
                            finalSubtitle.style.transition = 'all 1s ease';
                            finalSubtitle.style.opacity = '1';
                        }
                    }, 500);

                    // Heart animation
                    setTimeout(() => {
                        if (finalHeart) {
                            finalHeart.style.transition = 'opacity 1s ease';
                            finalHeart.style.opacity = '1';
                        }
                    }, 900);

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        observer.observe(finalTitle.closest('.final-section'));
    }
}

// ─── Parallax Effect ───
function initParallaxEffect() {
    const parallaxSections = document.querySelectorAll('.flower-message-section');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        parallaxSections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const sectionCenter = rect.top + rect.height / 2;
            const viewportCenter = window.innerHeight / 2;
            const distance = (sectionCenter - viewportCenter) * 0.05;

            section.style.backgroundPositionY = `calc(50% + ${distance}px)`;
        });
    }, { passive: true });
}

// ═══════════════════════════════════════════════════════════════
// CANDLE INTERACTIONS
// ═══════════════════════════════════════════════════════════════

function initCandles() {
    const candles = document.querySelectorAll('.candle');
    const wishesDisplay = document.getElementById('wishesDisplay');

    candles.forEach((candle) => {
        candle.addEventListener('click', () => {
            if (candle.classList.contains('extinguished')) return;

            // Extinguish candle
            candle.classList.add('extinguished');

            // Get wish text
            const wish = candle.dataset.wish;

            // Show wish
            showWish(wish, wishesDisplay);
        });
    });
}

function showWish(wish, container) {
    // Clear previous wish with fade out
    const existingWish = container.querySelector('.wish-text');
    if (existingWish) {
        existingWish.style.transition = 'opacity 0.5s ease';
        existingWish.style.opacity = '0';
        setTimeout(() => {
            existingWish.remove();
            displayNewWish(wish, container);
        }, 500);
    } else {
        displayNewWish(wish, container);
    }
}

function displayNewWish(wish, container) {
    const wishEl = document.createElement('p');
    wishEl.className = 'wish-text';
    wishEl.textContent = `"${wish}"`;
    wishEl.style.opacity = '0';
    wishEl.style.transform = 'translateY(20px)';
    container.appendChild(wishEl);

    // Animate in
    requestAnimationFrame(() => {
        wishEl.style.transition = 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)';
        wishEl.style.opacity = '1';
        wishEl.style.transform = 'translateY(0)';
    });
}

// ═══════════════════════════════════════════════════════════════
// SPARKLES FOR FINAL SECTION
// ═══════════════════════════════════════════════════════════════

function initSparkles() {
    const container = document.getElementById('sparklesContainer');
    if (!container) return;

    for (let i = 0; i < 40; i++) {
        createSparkle(container);
    }
}

function createSparkle(container) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    const size = Math.random() * 4 + 2;
    const left = Math.random() * 100;
    const top = Math.random() * 100;
    const delay = Math.random() * 3;
    const duration = Math.random() * 2 + 1.5;

    sparkle.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        top: ${top}%;
        animation-delay: ${delay}s;
        animation-duration: ${duration}s;
    `;

    container.appendChild(sparkle);
}

// ═══════════════════════════════════════════════════════════════
// MUSIC BUTTON
// ═══════════════════════════════════════════════════════════════

function initMusicBtn() {
    const musicBtn = document.getElementById('musicBtn');
    if (!musicBtn) return;

    // Note: Since no audio file was uploaded, we create a visual toggle
    // The user can add their own audio file later
    musicBtn.addEventListener('click', () => {
        musicBtn.classList.toggle('muted');

        // Here you would toggle audio playback:
        // if (!audio.paused) { audio.pause(); } else { audio.play(); }
    });
}

// ═══════════════════════════════════════════════════════════════
// SMOOTH SCROLL BEHAVIOR
// ═══════════════════════════════════════════════════════════════

// Custom smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ═══════════════════════════════════════════════════════════════
// REDUCED MOTION SUPPORT
// ═══════════════════════════════════════════════════════════════

if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    // Disable complex animations for users who prefer reduced motion
    document.querySelectorAll('.floating-particle, .floating-heart, .floating-petal').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0.3';
    });

    document.querySelectorAll('.sparkle').forEach(el => {
        el.style.animation = 'none';
        el.style.opacity = '0.5';
    });
}
