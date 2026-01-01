// Soporte Técnico Page JavaScript
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
        '.intro-card, .section-header, .requirement-card, .remote-support-section, .feature-item, .cta-section'
    );
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== REQUIREMENT CARDS INTERACTION =====
    const requirementCards = document.querySelectorAll('.requirement-card');
    
    requirementCards.forEach(card => {
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

        // Efecto de escala en hover
        card.addEventListener('mouseenter', function() {
            requirementCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', function() {
            requirementCards.forEach(otherCard => {
                otherCard.style.opacity = '1';
            });
        });
    });

    // ===== FEATURE ITEMS STAGGER ANIMATION =====
    const featureItems = document.querySelectorAll('.feature-item');
    
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
    }, { threshold: 0.2 });

    featureItems.forEach(item => {
        featureObserver.observe(item);
    });

    // ===== HERO ICON ANIMATION =====
    const heroIcon = document.querySelector('.support-hero .hero-icon');
    
    if (heroIcon) {
        setInterval(() => {
            heroIcon.style.animation = 'none';
            setTimeout(() => {
                heroIcon.style.animation = 'iconPulse 3s ease-in-out infinite';
            }, 10);
        }, 5000);
    }

    // ===== REMOTE SUPPORT CARD INTERACTION =====
    const remoteSupportCard = document.querySelector('.remote-support-card');
    
    if (remoteSupportCard) {
        remoteSupportCard.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.remote-icon-large');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(360deg)';
            }
        });
        
        remoteSupportCard.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.remote-icon-large');
            if (icon) {
                icon.style.transform = '';
            }
        });
    }

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

    // ===== CTA BUTTON HOVER EFFECT =====
    const ctaButton = document.querySelector('.btn-large');
    
    if (ctaButton) {
        ctaButton.addEventListener('mouseenter', function() {
            const ctaIcon = document.querySelector('.cta-icon');
            if (ctaIcon) {
                ctaIcon.style.transform = 'scale(1.2) rotate(360deg)';
                ctaIcon.style.transition = 'all 0.5s ease';
            }
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            const ctaIcon = document.querySelector('.cta-icon');
            if (ctaIcon) {
                ctaIcon.style.transform = '';
            }
        });
    }

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
    const heroSection = document.querySelector('.support-hero');
    
    if (heroSection) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.3;
            
            if (scrolled < heroSection.offsetHeight) {
                heroSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ===== INTRO CARD ANIMATION =====
    const introCard = document.querySelector('.intro-card');
    
    if (introCard) {
        const introObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    introCard.style.animation = 'fadeInUp 0.8s ease forwards';
                    introObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        introObserver.observe(introCard);
    }

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Animar hero icon al cargar
        const heroIcon = document.querySelector('.hero-icon');
        if (heroIcon) {
            setTimeout(() => {
                heroIcon.style.animation = 'bounceIn 0.8s ease, iconPulse 3s ease-in-out 0.8s infinite';
            }, 300);
        }
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

    // ===== DYNAMIC NUMBER COUNTER FOR STATS =====
    function animateNumber(element, target, duration) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ===== REQUIREMENT CARDS ICON ROTATION =====
    requirementCards.forEach((card, index) => {
        const icon = card.querySelector('.requirement-icon');
        if (icon) {
            setTimeout(() => {
                icon.style.animation = 'iconFloat 3s ease-in-out infinite';
                icon.style.animationDelay = `${index * 0.2}s`;
            }, 1000 + (index * 200));
        }
    });

    // ===== CTA SECTION ENTRANCE ANIMATION =====
    const ctaSection = document.querySelector('.cta-section');
    
    if (ctaSection) {
        const ctaObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const ctaIcon = ctaSection.querySelector('.cta-icon');
                    const ctaButton = ctaSection.querySelector('.btn-large');
                    
                    if (ctaIcon) {
                        setTimeout(() => {
                            ctaIcon.style.transform = 'scale(1)';
                            ctaIcon.style.opacity = '1';
                        }, 300);
                    }
                    
                    if (ctaButton) {
                        setTimeout(() => {
                            ctaButton.style.transform = 'scale(1)';
                            ctaButton.style.opacity = '1';
                        }, 600);
                    }
                    
                    ctaObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        // Preparar elementos para animación
        const ctaIcon = ctaSection.querySelector('.cta-icon');
        const ctaButton = ctaSection.querySelector('.btn-large');
        
        if (ctaIcon) {
            ctaIcon.style.transform = 'scale(0)';
            ctaIcon.style.opacity = '0';
            ctaIcon.style.transition = 'all 0.5s ease';
        }
        
        if (ctaButton) {
            ctaButton.style.transform = 'scale(0.8)';
            ctaButton.style.opacity = '0';
            ctaButton.style.transition = 'all 0.5s ease';
        }

        ctaObserver.observe(ctaSection);
    }

    // ===== CONSOLE LOG =====
    console.log('Soporte Técnico Page - Initialized successfully! 🚀');
    console.log('Ready to assist with technical support requests!');
});