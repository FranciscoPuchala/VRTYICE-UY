// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HEADER SCROLL EFFECT - EXACTO DE LA PÁGINA DE INICIO =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Agregar clase cuando se hace scroll
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== MOBILE MENU TOGGLE - EXACTO DE LA PÁGINA DE INICIO =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ===== DROPDOWN MENU INTERACTIVITY - EXACTO DE LA PÁGINA DE INICIO =====
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.dropdown-toggle');
        
        // Para mobile: toggle en click
        if (link) {
            link.addEventListener('click', function(e) {
                if (window.innerWidth <= 968) {
                    e.preventDefault();
                    item.classList.toggle('active');
                }
            });
        }
    });

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== INTERSECTION OBSERVER - ANIMACIONES =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos con clase fade-in-up
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(element => {
        observer.observe(element);
    });

    // ===== FEATURE CARDS ANIMATION =====
    const featureCards = document.querySelectorAll('.feature-card');
    
    const featureObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                featureObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    featureCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        featureObserver.observe(card);
    });

    // ===== DESCRIPTION CARDS HOVER EFFECT =====
    const descriptionCards = document.querySelectorAll('.description-card');
    
    descriptionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-12px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-8px)';
        });
    });

    // ===== PARALLAX EFFECT EN HERO =====
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    
    if (hero && heroContent) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const heroHeight = hero.offsetHeight;
            
            if (scrolled < heroHeight) {
                const parallaxSpeed = 0.5;
                heroContent.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
                heroContent.style.opacity = 1 - (scrolled / heroHeight) * 1.5;
            }
        });
    }

    // ===== HIGHLIGHT CARD ANIMATION =====
    const highlightCard = document.querySelector('.highlight-card');
    
    if (highlightCard) {
        const highlightObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                    highlightObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        highlightObserver.observe(highlightCard);
    }

    // ===== CLOSE MOBILE MENU ON LINK CLICK =====
    const navLinksAll = document.querySelectorAll('.nav-item a');
    
    navLinksAll.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 968 && !this.classList.contains('dropdown-toggle')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // ===== SCROLL TO TOP BUTTON =====
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.setAttribute('aria-label', 'Volver arriba');
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-accent);
        color: var(--white);
        border: none;
        font-size: 24px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all var(--transition-medium);
        box-shadow: var(--shadow-lg);
        z-index: 999;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    scrollToTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px)';
        this.style.boxShadow = '0 15px 30px rgba(0, 123, 255, 0.4)';
    });

    scrollToTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'var(--shadow-lg)';
    });

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Cerrar menú móvil si se cambia a escritorio
            if (window.innerWidth > 968) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }, 250);
    });

    // ===== KEYBOARD NAVIGATION - EXACTO DE LA PÁGINA DE INICIO =====
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        // Tab para navegación por teclado
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== NAVIGATION ACTIVE STATE =====
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.parentElement.classList.add('active');
        }
    });

    // ===== LAZY LOADING DE IMÁGENES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== PERFORMANCE OPTIMIZATION =====
    // Reducir animaciones si el usuario prefiere movimiento reducido
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        const root = document.documentElement;
        root.style.setProperty('--transition-fast', '0.05s');
        root.style.setProperty('--transition-medium', '0.1s');
        root.style.setProperty('--transition-slow', '0.15s');
    }

    // ===== CERRAR MENÚ MÓVIL AL HACER CLIC FUERA =====
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 968) {
            if (!e.target.closest('.header') && mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
    });

    // ===== CTA BUTTONS RIPPLE EFFECT =====
    const ctaButtons = document.querySelectorAll('.cta-button');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.6);
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                transform: scale(0);
                animation: rippleEffect 0.6s ease-out;
                pointer-events: none;
            `;
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // Añadir keyframes para el efecto ripple
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        /* Keyboard navigation focus */
        body.keyboard-navigation *:focus {
            outline: 3px solid var(--accent-blue);
            outline-offset: 2px;
        }

        body:not(.keyboard-navigation) *:focus {
            outline: none;
        }
    `;
    document.head.appendChild(style);

    // ===== ANALYTICS TRACKING (OPCIONAL) =====
    featureCards.forEach(card => {
        card.addEventListener('click', function() {
            const featureName = this.querySelector('h3').textContent;
            console.log('Feature viewed:', featureName);
            // Aquí puedes añadir código para enviar a Google Analytics, etc.
        });
    });

    // ===== NUMBER COUNTER ANIMATION FOR FEATURE NUMBERS =====
    const featureNumbers = document.querySelectorAll('.feature-number');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetNumber = parseInt(entry.target.textContent);
                let currentNumber = 0;
                const increment = targetNumber / 30;
                
                const counter = setInterval(() => {
                    currentNumber += increment;
                    if (currentNumber >= targetNumber) {
                        entry.target.textContent = String(targetNumber).padStart(2, '0');
                        clearInterval(counter);
                    } else {
                        entry.target.textContent = String(Math.floor(currentNumber)).padStart(2, '0');
                    }
                }, 30);
                
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    featureNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // ===== HOVER EFFECT FOR ICONS =====
    const allIcons = document.querySelectorAll('.card-icon, .feature-icon, .highlight-icon');
    
    allIcons.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.animation = 'pulse 0.5s ease';
        });
        
        icon.addEventListener('animationend', function() {
            this.style.animation = '';
        });
    });

    // Añadir animación pulse
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
        }
    `;
    document.head.appendChild(pulseStyle);

    // ===== DEBUG MODE (OPCIONAL) =====
    if (localStorage.getItem('debug') === 'true') {
        console.log('Debug mode enabled');
        console.log('Viewport width:', window.innerWidth);
        console.log('Viewport height:', window.innerHeight);
        console.log('Fade elements:', fadeElements.length);
        console.log('Feature cards:', featureCards.length);
        console.log('Description cards:', descriptionCards.length);
    }

    // ===== CONSOLE LOG =====
    console.log('Vértice Batch Execution - Initialized successfully! 🚀');
    console.log('Feature cards:', featureCards.length);
    console.log('Description cards:', descriptionCards.length);
});

// ========================================
// FUNCIONES GLOBALES ÚTILES
// ========================================

// Función para detectar si un elemento está visible
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Función para hacer throttle de eventos
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Función para hacer debounce de eventos
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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