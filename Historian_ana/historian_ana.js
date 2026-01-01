// Proficy Analyze Page - JavaScript
// Vértice Uruguay

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

    // ===== SMOOTH SCROLL WITH HASH SUPPORT =====
    // Handle anchor links (#csense, #smartsignal, #PHA)
    function scrollToSection(sectionId) {
        const target = document.getElementById(sectionId);
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    }

    // Check if page loaded with hash
    if (window.location.hash) {
        const hash = window.location.hash.substring(1);
        setTimeout(() => {
            scrollToSection(hash);
        }, 100);
    }

    // Handle all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const sectionId = href.substring(1);
                scrollToSection(sectionId);
                
                // Update URL without triggering scroll
                history.pushState(null, null, href);
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
                
                // Animación especial para las tarjetas
                if (entry.target.classList.contains('question-card') || 
                    entry.target.classList.contains('feature-card') ||
                    entry.target.classList.contains('benefit-card')) {
                    const cards = entry.target.parentElement.querySelectorAll('.question-card, .feature-card, .benefit-card');
                    cards.forEach((card, index) => {
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar elementos con animación
    const animatedElements = document.querySelectorAll(
        '.intro-section, .questions-section, .product-section, .cta-section, .question-card, .feature-card, .benefit-card'
    );
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== CARDS HOVER EFFECT =====
    const cards = document.querySelectorAll('.question-card, .feature-card, .benefit-card, .industry-tag');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            if (this.classList.contains('industry-tag')) {
                this.style.transform = 'translateY(-3px)';
            } else {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== QUESTION CARDS STAGGER ANIMATION =====
    const questionCards = document.querySelectorAll('.question-card');
    
    questionCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.6s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 150 * index);
    });

    // ===== PRODUCT BADGES ANIMATION =====
    const productBadges = document.querySelectorAll('.product-badge');
    
    productBadges.forEach(badge => {
        const badgeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    badge.style.animation = 'iconFloat 3s ease-in-out infinite, iconBounce 0.8s ease';
                }
            });
        }, { threshold: 0.5 });
        
        badgeObserver.observe(badge);
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
            ripple.style.position = 'absolute';
            ripple.style.borderRadius = '50%';
            ripple.style.background = 'rgba(255, 255, 255, 0.6)';
            ripple.style.transform = 'scale(0)';
            ripple.style.animation = 'rippleEffect 0.6s ease-out';
            ripple.style.pointerEvents = 'none';
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });

    // ===== NAVIGATION ACTIVE STATE =====
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop();
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || currentPage.includes('ProdAnalyze')) {
            link.parentElement.classList.add('active');
        }
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

    // ===== PRODUCT SECTIONS HIGHLIGHT ON SCROLL =====
    const productSections = document.querySelectorAll('.product-section');
    
    productSections.forEach(section => {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.2 });
        
        sectionObserver.observe(section);
    });

    // ===== VALUE PROPOSITION ANIMATION =====
    const valueProposition = document.querySelector('.value-proposition');
    
    if (valueProposition) {
        const valueObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
                }
            });
        }, { threshold: 0.3 });
        
        valueObserver.observe(valueProposition);
    }

    // ===== INDUSTRY TAGS ANIMATION =====
    const industryTags = document.querySelectorAll('.industry-tag');
    
    industryTags.forEach((tag, index) => {
        tag.style.opacity = '0';
        tag.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
            tag.style.transition = 'all 0.4s ease';
            tag.style.opacity = '1';
            tag.style.transform = 'scale(1)';
        }, 100 * index);
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

    // ===== LOADING ANIMATION =====
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });

    // ===== PERFORMANCE: LAZY LOADING IMAGES =====
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.add('loaded');
                    }
                    imageObserver.unobserve(img);
                }
            });
        });

        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // ===== ICON ROTATION ON HOVER =====
    const iconElements = document.querySelectorAll('.question-icon, .feature-icon, .benefit-icon, .value-icon');
    
    iconElements.forEach(icon => {
        icon.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.15) rotate(360deg)';
        });
        
        icon.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ===== SECTION NAVIGATION HELPER =====
    // Create section links navigation helper
    const sections = ['csense', 'smartsignal'];
    const navHelper = document.createElement('div');
    navHelper.className = 'section-nav-helper';
    navHelper.innerHTML = `
        <div class="nav-helper-item" data-section="csense">
            <span class="nav-helper-dot"></span>
            <span class="nav-helper-label">CSense</span>
        </div>
        <div class="nav-helper-item" data-section="smartsignal">
            <span class="nav-helper-dot"></span>
            <span class="nav-helper-label">SmartSignal</span>
        </div>
    `;
    
    // Only add navigation helper on desktop
    if (window.innerWidth > 968) {
        document.body.appendChild(navHelper);
        
        // Highlight active section on scroll
        window.addEventListener('scroll', function() {
            sections.forEach(sectionId => {
                const section = document.getElementById(sectionId);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    const navItem = navHelper.querySelector(`[data-section="${sectionId}"]`);
                    
                    if (rect.top <= 200 && rect.bottom >= 200) {
                        navItem.classList.add('active');
                    } else {
                        navItem.classList.remove('active');
                    }
                }
            });
        });
        
        // Click to scroll to section
        navHelper.querySelectorAll('.nav-helper-item').forEach(item => {
            item.addEventListener('click', function() {
                const sectionId = this.getAttribute('data-section');
                scrollToSection(sectionId);
            });
        });
    }

    // ===== ADD ANIMATION STYLES TO DOCUMENT =====
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes iconBounce {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-20px) scale(1.1);
            }
        }
        
        .scroll-to-top {
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
            transition: all 0.3s ease;
            box-shadow: var(--shadow-lg);
            z-index: 999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        
        .scroll-to-top.visible {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-to-top:hover {
            transform: translateY(-5px);
            box-shadow: 0 15px 30px rgba(0, 123, 255, 0.4);
        }
        
        .section-nav-helper {
            position: fixed;
            right: 50px;
            top: 50%;
            transform: translateY(-50%);
            z-index: 998;
            display: flex;
            flex-direction: column;
            gap: 20px;
        }
        
        .nav-helper-item {
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        
        .nav-helper-dot {
            width: 12px;
            height: 12px;
            border-radius: 50%;
            background: var(--gray-300);
            border: 2px solid var(--gray-300);
            transition: all 0.3s ease;
        }
        
        .nav-helper-item.active .nav-helper-dot {
            background: var(--accent-blue);
            border-color: var(--accent-blue);
            transform: scale(1.3);
        }
        
        .nav-helper-label {
            opacity: 0;
            transform: translateX(-10px);
            transition: all 0.3s ease;
            font-size: 0.9rem;
            color: var(--gray-700);
            font-weight: 500;
            white-space: nowrap;
            background: var(--white);
            padding: 5px 12px;
            border-radius: 20px;
            box-shadow: var(--shadow-sm);
        }
        
        .nav-helper-item:hover .nav-helper-label {
            opacity: 1;
            transform: translateX(0);
        }
        
        body.keyboard-navigation *:focus {
            outline: 3px solid var(--accent-blue);
            outline-offset: 2px;
        }
        
        body:not(.keyboard-navigation) *:focus {
            outline: none;
        }
        
        @media (max-width: 968px) {
            .section-nav-helper {
                display: none;
            }
        }
        
        @media (max-width: 480px) {
            .scroll-to-top {
                width: 45px;
                height: 45px;
                bottom: 20px;
                right: 20px;
                font-size: 20px;
            }
        }
    `;
    document.head.appendChild(style);

    // ===== CONSOLE LOG =====
    console.log('Proficy Analyze Page - Initialized successfully! 🚀');
    console.log('Question Cards:', questionCards.length);
    console.log('Feature Cards:', document.querySelectorAll('.feature-card').length);
    console.log('Benefit Cards:', document.querySelectorAll('.benefit-card').length);
    console.log('Industry Tags:', industryTags.length);
    console.log('Current Hash:', window.location.hash);
});