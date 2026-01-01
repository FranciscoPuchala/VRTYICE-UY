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

// ==================== PROTECCIONES DE SEGURIDAD ====================

// 1. Deshabilitar click derecho
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// 2. Deshabilitar F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+S
document.addEventListener('keydown', function(e) {
    // F12
    if (e.key === 'F12') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Inspeccionar)
    if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Consola)
    if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Selector de elementos)
    if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (Ver código fuente)
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+S (Guardar página)
    if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+K (Consola en Firefox)
    if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        return false;
    }
});

// 3. Detectar si las DevTools están abiertas
(function() {
    const devtools = /./;
    devtools.toString = function() {
        this.opened = true;
    };
    
    const checkDevTools = setInterval(function() {
        console.log('%c', devtools);
        if (devtools.opened) {
            alert('⚠️ Herramientas de desarrollo detectadas. Por favor, ciérralas.');
            window.location.reload();
        }
        devtools.opened = false;
    }, 1000);
})();

// 4. Detectar DevTools por dimensiones de ventana
(function() {
    const threshold = 160;
    const widthThreshold = window.outerWidth - window.innerWidth > threshold;
    const heightThreshold = window.outerHeight - window.innerHeight > threshold;
    
    if (widthThreshold || heightThreshold) {
        // DevTools probablemente abierto al cargar
    }
    
    window.addEventListener('resize', function() {
        const widthThreshold = window.outerWidth - window.innerWidth > threshold;
        const heightThreshold = window.outerHeight - window.innerHeight > threshold;
        
        if (widthThreshold || heightThreshold) {
            document.body.innerHTML = '<h1 style="text-align:center;margin-top:50px;">⚠️ Por favor, cierra las herramientas de desarrollo</h1>';
        }
    });
})();

// 5. Deshabilitar selección de texto
document.addEventListener('selectstart', function(e) {
    e.preventDefault();
    return false;
});

// 6. Deshabilitar copiar
document.addEventListener('copy', function(e) {
    e.preventDefault();
    return false;
});

// 7. Deshabilitar arrastrar imágenes
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// 8. Protección contra screenshots (limitado)
document.addEventListener('keyup', function(e) {
    // Print Screen
    if (e.key === 'PrintScreen') {
        navigator.clipboard.writeText('');
        alert('⚠️ Screenshots deshabilitadas');
    }
});

// 9. Limpiar consola constantemente
setInterval(function() {
    console.clear();
}, 1000);

// 10. Mensaje de advertencia en consola
console.log('%c⚠️ ADVERTENCIA', 'color: red; font-size: 50px; font-weight: bold;');
console.log('%cEsta es una función del navegador destinada a desarrolladores.', 'font-size: 16px;');
console.log('%cSi alguien te pidió que copies y pegues algo aquí, es un fraude.', 'font-size: 16px;');
console.log('%c© HVAC - Instalaciones Termomecánicas', 'font-size: 14px; font-weight: bold;');

// 11. Detectar si el usuario está intentando ver el código fuente
window.addEventListener('blur', function() {
    setTimeout(function() {
        if (document.activeElement === document.querySelector('iframe')) {
            // Posible intento de ver código fuente
        }
    }, 100);
});

// 12. Ofuscar el código en runtime (avanzado)
(function() {
    const originalLog = console.log;
    console.log = function() {
        // Sobrescribir console.log
    };
})();

// ==================== FIN PROTECCIONES ====================