// Migration & Virtualization Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== MOBILE MENU TOGGLE =====
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mainNav = document.getElementById('mainNav');
    
    if (mobileMenuToggle && mainNav) {
        mobileMenuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // ===== DROPDOWN MENU INTERACTIVITY =====
    const dropdownItems = document.querySelectorAll('.nav-item.dropdown');
    
    dropdownItems.forEach(item => {
        const link = item.querySelector('.dropdown-toggle');
        
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

    // ===== SCROLL REVEAL ANIMATIONS =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observar elementos animados
    const animatedElements = document.querySelectorAll(
        '.intro-card, .migration-card, .services-highlight, .benefit-card, .cta-section'
    );
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== MIGRATION CARDS INTERACTION =====
    const migrationCards = document.querySelectorAll('.migration-card');
    
    migrationCards.forEach(card => {
        // Efecto de inclinación 3D
        card.addEventListener('mousemove', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== SERVICE ITEMS STAGGER ANIMATION =====
    const serviceItems = document.querySelectorAll('.service-item');
    
    const serviceObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                serviceObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    serviceItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = 'all 0.6s ease';
        serviceObserver.observe(item);
    });

    // ===== BENEFIT CARDS HOVER EFFECT =====
    const benefitCards = document.querySelectorAll('.benefit-card');
    
    benefitCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            benefitCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            benefitCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // ===== BUTTON RIPPLE EFFECT =====
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
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

    // ===== CLOSE MOBILE MENU ON LINK CLICK =====
    const navLinks = document.querySelectorAll('.nav-item a');
    
    navLinks.forEach(link => {
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
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });
    
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== PARALLAX EFFECT ON HERO =====
    const heroSection = document.querySelector('.migration-hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===== NUMBER ANIMATION IN SERVICE ITEMS =====
    const serviceNumbers = document.querySelectorAll('.service-number');
    
    const numberObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = entry.target;
                number.style.animation = 'bounceIn 0.6s ease';
                numberObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    serviceNumbers.forEach(number => {
        numberObserver.observe(number);
    });

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 968) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }, 250);
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
        
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== DYNAMIC INTRO CARD ANIMATION =====
    const introCard = document.querySelector('.intro-card');
    
    if (introCard) {
        const introObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const icon = introCard.querySelector('.intro-icon');
                    if (icon) {
                        setTimeout(() => {
                            icon.style.animation = 'bounceIn 0.8s ease, iconFloat 3s ease-in-out 0.8s infinite';
                        }, 300);
                    }
                    introObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        introObserver.observe(introCard);
    }

    // ===== CTA SECTION INTERACTION =====
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const buttons = ctaSection.querySelectorAll('.btn');
                    buttons.forEach((btn, index) => {
                        setTimeout(() => {
                            btn.style.transform = 'scale(1)';
                            btn.style.opacity = '1';
                        }, index * 150);
                    });
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Preparar botones para animación
        const ctaButtons = ctaSection.querySelectorAll('.btn');
        ctaButtons.forEach(btn => {
            btn.style.transform = 'scale(0.8)';
            btn.style.opacity = '0';
            btn.style.transition = 'all 0.4s ease';
        });

        ctaObserver.observe(ctaSection);
    }

    // ===== CONSOLE LOG =====
    console.log('Migración & Virtualización Page - Initialized successfully! 🚀');
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