// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', function() {
    
    // ===== HEADER SCROLL EFFECT =====
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

    // ===== SCROLL REVEAL ANIMATIONS =====
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

    // Observar elementos con animación
    const animatedElements = document.querySelectorAll('.workshop-section, .info-section');
    animatedElements.forEach(el => {
        observer.observe(el);
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

    // ===== BENEFIT ITEMS ANIMATION =====
    const benefitItems = document.querySelectorAll('.benefit-item');
    
    const benefitObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 80);
                benefitObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    benefitItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.5s ease';
        benefitObserver.observe(item);
    });

    // ===== NAVIGATION ACTIVE STATE =====
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || linkPage.includes('Workshop')) {
            link.parentElement.classList.add('active');
        }
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

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

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

    // ===== WORKSHOP CARD HOVER EFFECT =====
    const workshopCard = document.querySelector('.workshop-card');
    
    if (workshopCard) {
        workshopCard.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        workshopCard.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    }

    // ===== RESIZE HANDLER =====
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Cerrar menú móvil si se cambia a desktop
            if (window.innerWidth > 968) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
                
                // Cerrar todos los dropdowns
                dropdownItems.forEach(item => {
                    item.classList.remove('active');
                });
            }
        }, 250);
    });

    // ===== KEYBOARD NAVIGATION =====
    document.addEventListener('keydown', function(e) {
        // ESC para cerrar menú móvil
        if (e.key === 'Escape') {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        }
        
        // Tab para navegación por teclado
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // ===== WORKSHOP ICON ANIMATION =====
    const workshopIcon = document.querySelector('.workshop-icon');
    
    if (workshopIcon) {
        const iconObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'iconFloat 3s ease-in-out infinite';
                    iconObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        iconObserver.observe(workshopIcon);
    }

    // Agregar animación CSS para iconFloat
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
        @keyframes iconFloat {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-10px) scale(1.05);
            }
        }
    `;
    document.head.appendChild(styleSheet);

    // ===== INFO CARD ANIMATION =====
    const infoCard = document.querySelector('.info-card');
    
    if (infoCard) {
        const infoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const infoIcon = entry.target.querySelector('.info-icon');
                    if (infoIcon) {
                        infoIcon.style.animation = 'pulse 2s ease-in-out infinite';
                    }
                    infoObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        infoObserver.observe(infoCard);
    }

    // Animación de pulso para el icono de info
    const pulseStyle = document.createElement('style');
    pulseStyle.textContent = `
        @keyframes pulse {
            0%, 100% {
                transform: scale(1);
            }
            50% {
                transform: scale(1.1);
            }
        }
    `;
    document.head.appendChild(pulseStyle);

    // ===== PARALLAX EFFECT ON SCROLL (LIGERO) =====
    const workshopHeader = document.querySelector('.workshop-header');
    
    if (workshopHeader) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rect = workshopHeader.getBoundingClientRect();
            
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * 0.1);
                workshopHeader.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    }

    // ===== FEATURE CARDS HOVER ENHANCEMENT =====
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.feature-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ===== PERFORMANCE: LAZY LOADING =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });

        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => imageObserver.observe(img));
    }

    // ===== CLOSE DROPDOWNS ON OUTSIDE CLICK =====
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            dropdownItems.forEach(item => {
                if (window.innerWidth <= 968) {
                    // En mobile, solo cerrar si no es un click en el menú
                    if (!e.target.closest('.main-nav')) {
                        item.classList.remove('active');
                    }
                }
            });
        }
    });

    // ===== BENEFITS SECTION REVEAL =====
    const benefitsSection = document.querySelector('.benefits-section');
    
    if (benefitsSection) {
        const benefitsSectionObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    benefitsSectionObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        benefitsSection.style.opacity = '0';
        benefitsSection.style.transform = 'scale(0.95)';
        benefitsSection.style.transition = 'all 0.8s ease';
        benefitsSectionObserver.observe(benefitsSection);
    }

    // ===== CONSOLE LOG =====
    console.log('✅ Página de Talleres Personalizados - Vértice Uruguay');
    console.log('🎓 Talleres adaptados a su planta industrial');
    console.log('📱 Sistema de navegación: Activo');
    
    // ===== PREVENT SCROLL RESTORATION =====
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // ===== INITIAL SCROLL TO TOP =====
    window.scrollTo(0, 0);
});