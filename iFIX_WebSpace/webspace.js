// Product WebSpace Specific JavaScript

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const contentObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                contentObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar todas las secciones de contenido
    const contentSections = document.querySelectorAll('.content-section');
    contentSections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        contentObserver.observe(section);
    });

    // ===== USE CASE CARDS STAGGERED ANIMATION =====
    const useCaseCards = document.querySelectorAll('.use-case-card');
    
    const useCaseObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                useCaseObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    useCaseCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        useCaseObserver.observe(card);
    });

    // ===== FEATURE DETAIL CARDS STAGGERED ANIMATION =====
    const featureDetailCards = document.querySelectorAll('.feature-detail-card');
    
    const featureDetailObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                featureDetailObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    featureDetailCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        featureDetailObserver.observe(card);
    });

    // ===== HIGHLIGHT BOX ANIMATION =====
    const highlightBoxes = document.querySelectorAll('.highlight-box');
    
    const highlightObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
                highlightObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    highlightBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'scale(0.95)';
        box.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        highlightObserver.observe(box);
    });

    // ===== EMPHASIS BOX ANIMATION =====
    const emphasisBoxes = document.querySelectorAll('.emphasis-box');
    
    const emphasisObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
                emphasisObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    emphasisBoxes.forEach(box => {
        box.style.opacity = '0';
        box.style.transform = 'translateX(-30px)';
        box.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        emphasisObserver.observe(box);
    });

    // ===== USE CASE CARDS HOVER EFFECT =====
    useCaseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

    // ===== FEATURE NUMBER COUNTER ANIMATION =====
    const featureNumbers = document.querySelectorAll('.feature-number');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                const targetNumber = parseInt(number.textContent);
                let currentNumber = 0;
                
                const increment = () => {
                    if (currentNumber < targetNumber) {
                        currentNumber++;
                        number.textContent = String(currentNumber).padStart(2, '0');
                        setTimeout(increment, 50);
                    }
                };
                
                increment();
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    featureNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // ===== IMAGE PLACEHOLDER INTERACTION =====
    const imagePlaceholders = document.querySelectorAll('.image-placeholder');
    
    imagePlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            console.log('Image placeholder clicked - Ready for image upload');
            // Aquí se puede agregar funcionalidad de subida de imagen
        });
    });

    // ===== CTA SECTION PARALLAX =====
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const ctaTop = ctaSection.offsetTop;
            const ctaHeight = ctaSection.offsetHeight;
            
            // Solo aplicar parallax cuando la sección está visible
            if (scrolled > ctaTop - window.innerHeight && scrolled < ctaTop + ctaHeight) {
                const parallaxSpeed = 0.3;
                const yPos = (scrolled - ctaTop) * parallaxSpeed;
                ctaSection.querySelector('.cta-content').style.transform = `translateY(${yPos}px)`;
            }
        });
    }

    // ===== SMOOTH SCROLLING FOR INTERNAL LINKS =====
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href !== '#!') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const header = document.getElementById('header');
                    const headerHeight = header ? header.offsetHeight : 0;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // ===== BREADCRUMB ACTIVE STATE =====
    const breadcrumbLinks = document.querySelectorAll('.breadcrumb a');
    const currentPath = window.location.pathname;
    
    breadcrumbLinks.forEach(link => {
        if (link.getAttribute('href') && currentPath.includes(link.getAttribute('href'))) {
            link.style.fontWeight = '600';
            link.style.color = 'var(--primary-blue)';
        }
    });

    // ===== HEADER HIGHLIGHT ON SCROLL =====
    const header = document.getElementById('header');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });

    // ===== INTERSECTION OBSERVER FOR SECTION TITLES =====
    const sectionTitles = document.querySelectorAll('.section-title');
    
    const titleObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animar el underline
                const underline = entry.target.querySelector('::after');
                if (entry.target.classList.contains('centered')) {
                    entry.target.style.setProperty('--underline-width', '100%');
                }
                
                titleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    sectionTitles.forEach(title => {
        title.style.opacity = '0';
        title.style.transform = 'translateY(20px)';
        title.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        titleObserver.observe(title);
    });

    // ===== ADD RIPPLE EFFECT TO CTA BUTTONS =====
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

    // ===== DYNAMIC LOADING STATE =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Fade in hero
        const productHero = document.querySelector('.product-hero');
        if (productHero) {
            productHero.style.opacity = '0';
            productHero.style.transition = 'opacity 0.8s ease';
            setTimeout(() => {
                productHero.style.opacity = '1';
            }, 100);
        }
    });

    // ===== PERFORMANCE: LAZY LOAD IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        }, { rootMargin: '50px' });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== CONSOLE MESSAGE =====
    console.log('%cProficy WebSpace - Page Loaded Successfully! 🚀', 
                'color: #007bff; font-size: 16px; font-weight: bold;');
    console.log('%cAll animations and interactions initialized.', 
                'color: #28a745; font-size: 12px;');
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