// iFIX Product Page Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const scrollObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Línea problemática eliminada: entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('visible');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar secciones principales
    const sections = document.querySelectorAll('.intro-section, .benefits-section, .specs-section, .industries-section');
    sections.forEach(section => {
        scrollObserver.observe(section);
    });

    // Observar tarjetas individuales
    const cards = document.querySelectorAll('.feature-card, .benefit-item, .industry-card, .spec-category');
    cards.forEach(card => {
        scrollObserver.observe(card);
    });

    // ===== FEATURE CARDS PARALLAX EFFECT =====
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-15px) scale(1.03)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== BENEFIT ITEMS STAGGER ANIMATION =====
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    benefitItems.forEach(item => {
        benefitObserver.observe(item);
    });

    // ===== INDUSTRY CARDS HOVER EFFECT =====
    const industryCards = document.querySelectorAll('.industry-card');
    
    industryCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.background = 'linear-gradient(135deg, #ffffff 0%, #f0f7ff 100%)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.background = '';
        });
    });

    // ===== SPECS ACCORDION EFFECT (Optional Enhancement) =====
    const specCategories = document.querySelectorAll('.spec-category');
    
    specCategories.forEach(category => {
        category.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Cerrar todas las categorías
            specCategories.forEach(cat => {
                cat.classList.remove('active');
                cat.style.maxHeight = null;
            });
            
            // Abrir la categoría clickeada si no estaba activa
            if (!isActive) {
                this.classList.add('active');
                this.style.maxHeight = this.scrollHeight + 'px';
            }
        });
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
            // Animación de pulso al hacer click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 200);
        });
    });

    // ===== PROGRESSIVE NUMBER COUNTER =====
    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = value.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Animar números si existen elementos con clase "counter"
    const counters = document.querySelectorAll('.counter');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.target);
                animateValue(entry.target, 0, target, 2000);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
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
    const productHero = document.querySelector('.product-hero');
    
    if (productHero) {
        let ticking = false;
        
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    const scrolled = window.pageYOffset;
                    if (scrolled < window.innerHeight) {
                        productHero.style.transform = `translateY(${scrolled * 0.4}px)`;
                        productHero.style.opacity = 1 - (scrolled / 600);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    // ===== FEATURE ICON ANIMATIONS =====
    const featureIcons = document.querySelectorAll('.feature-icon');
    
    featureIcons.forEach(icon => {
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
    `;
    document.head.appendChild(style);

    // ===== SPEC ITEMS REVEAL ON SCROLL =====
    const specItems = document.querySelectorAll('.spec-items li');
    
    const specItemObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 50);
                specItemObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    specItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        specItemObserver.observe(item);
    });

    // ===== LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('page-loaded');
        
        // Trigger animations after page load
        setTimeout(() => {
            const heroContent = document.querySelector('.product-hero .hero-content');
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
            
            // Agregar clase al body según dirección de scroll
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

    // ===== CONSOLE LOG =====
    console.log('iFIX Product Page - Initialized successfully! 🚀');
    console.log('Features:', featureCards.length);
    console.log('Benefits:', benefitItems.length);
    console.log('Industries:', industryCards.length);
}); 