// AboutUs Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones principales
    const sections = document.querySelectorAll('.overview-section, .partnership-section, .values-section, .services-overview-section, .why-us-section');
    sections.forEach(section => {
        scrollObserver.observe(section);
    });

    // Observar tarjetas individuales
    const cards = document.querySelectorAll('.value-card, .expertise-card');
    cards.forEach(card => {
        scrollObserver.observe(card);
    });

    // ===== VALUE CARDS PARALLAX EFFECT =====
    const valueCards = document.querySelectorAll('.value-card');
    
    valueCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== EXPERTISE CARDS STAGGER ANIMATION =====
    const expertiseCards = document.querySelectorAll('.expertise-card');
    
    const expertiseObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                }, index * 150);
                expertiseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    expertiseCards.forEach(card => {
        expertiseObserver.observe(card);
    });

    // ===== ANIMATED COUNTER FOR EXPERTISE NUMBERS =====
    function animateValue(element, start, end, duration, suffix = '') {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            
            if (end === '∞') {
                element.textContent = '∞';
            } else {
                const value = Math.floor(progress * (end - start) + start);
                element.textContent = value + suffix;
            }
            
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    const expertiseNumbers = document.querySelectorAll('.expertise-number');
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const text = entry.target.textContent;
                
                if (text === '∞') {
                    entry.target.textContent = '0';
                    setTimeout(() => {
                        entry.target.textContent = '∞';
                        entry.target.style.animation = 'pulse 2s ease-in-out infinite';
                    }, 1000);
                } else if (text.includes('+')) {
                    const num = parseInt(text);
                    animateValue(entry.target, 0, num, 2000, '+');
                } else if (text.includes('%')) {
                    const num = parseInt(text);
                    animateValue(entry.target, 0, num, 2000, '%');
                }
                
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    expertiseNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // ===== SMOOTH SCROLL TO SECTIONS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 80;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== IMAGE PLACEHOLDER INTERACTION =====
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== CTA BUTTON RIPPLE EFFECT =====
    const ctaButtons = document.querySelectorAll('.cta-buttons .btn');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== PARALLAX SCROLL EFFECT FOR HERO =====
    const aboutHero = document.querySelector('.about-hero');
    
    if (aboutHero) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        aboutHero.style.transform = `translateY(${scrolled * 0.4}px)`;
                        aboutHero.style.opacity = 1 - (scrolled / 600);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== VALUE ICON ANIMATIONS =====
    const valueIcons = document.querySelectorAll('.value-icon');
    
    valueIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            const svg = this.querySelector('svg');
            if (svg) {
                svg.style.animation = 'none';
                setTimeout(() => {
                    svg.style.animation = 'iconBounce 0.6s ease';
                }, 10);
            }
        });
    });

    // Agregar animación de bounce para los iconos
    const style = document.createElement('style');
    style.textContent = `
        @keyframes iconBounce {
            0%, 100% { transform: translateY(0); }
            25% { transform: translateY(-10px); }
            50% { transform: translateY(0); }
            75% { transform: translateY(-5px); }
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(style);

    // ===== LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        setTimeout(() => {
            const heroContent = document.querySelector('.about-hero .hero-content');
            if (heroContent) {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }
        }, 100);
    });

    // ===== PERFORMANCE: THROTTLE SCROLL EVENTS =====
    let scrollTimeout;
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        
        scrollTimeout = setTimeout(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDirection = scrollTop > lastScrollTop ? 'down' : 'up';
            lastScrollTop = scrollTop;
            
            document.body.setAttribute('data-scroll-direction', scrollDirection);
        }, 100);
    });

    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== GE LINK EXTERNAL INDICATOR =====
    const geLink = document.querySelector('.ge-link');
    if (geLink) {
        geLink.addEventListener('click', function(e) {
            console.log('Opening GE Vernova website...');
        });
    }

    // ===== SECTION REVEAL ON SCROLL =====
    const revealSections = document.querySelectorAll('.overview-section, .partnership-section, .values-section, .services-overview-section, .expertise-section, .why-us-section');
    
    const revealObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.8s ease';
        revealObserver.observe(section);
    });

    // ===== CONSOLE LOG =====
    console.log('AboutUs Page - Initialized successfully! 🚀');
    console.log('Value Cards:', valueCards.length);
    console.log('Expertise Cards:', expertiseCards.length);
});