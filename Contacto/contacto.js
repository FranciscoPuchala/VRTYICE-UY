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
    const animatedElements = document.querySelectorAll('.contact-section, .map-section');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // ===== CONTACT ITEMS ANIMATION =====
    const contactItems = document.querySelectorAll('.contact-item');
    
    const contactObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateX(0)';
                }, index * 100);
                contactObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    contactItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        contactObserver.observe(item);
    });

    // ===== FORM VALIDATION AND SUBMISSION =====
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Obtener valores del formulario
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };

            // Validación básica
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showNotification('Por favor complete todos los campos requeridos', 'error');
                return;
            }

            // Validar email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showNotification('Por favor ingrese un email válido', 'error');
                return;
            }

            // Crear el enlace mailto con los datos del formulario
            const subjectText = getSubjectText(formData.subject);
            const mailtoLink = `mailto:info@vertice.com.uy?subject=${encodeURIComponent(subjectText)}&body=${encodeURIComponent(createEmailBody(formData))}`;
            
            // Abrir cliente de email
            window.location.href = mailtoLink;
            
            // Mostrar mensaje de éxito
            showNotification('Abriendo su cliente de email...', 'success');
            
            // Limpiar formulario después de un delay
            setTimeout(() => {
                contactForm.reset();
            }, 1000);
        });

        // Validación en tiempo real de email
        const emailInput = document.getElementById('email');
        emailInput.addEventListener('blur', function() {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (this.value && !emailRegex.test(this.value)) {
                this.style.borderColor = '#dc3545';
            } else {
                this.style.borderColor = '';
            }
        });

        // Animación de focus en inputs
        const formInputs = contactForm.querySelectorAll('input, select, textarea');
        formInputs.forEach(input => {
            input.addEventListener('focus', function() {
                this.parentElement.style.transform = 'scale(1.02)';
                this.parentElement.style.transition = 'transform 0.2s ease';
            });

            input.addEventListener('blur', function() {
                this.parentElement.style.transform = 'scale(1)';
            });
        });
    }

    // ===== HELPER FUNCTIONS =====
    function getSubjectText(subjectValue) {
        const subjects = {
            'info': 'Solicitud de Información',
            'quote': 'Solicitud de Cotización',
            'support': 'Soporte Técnico',
            'training': 'Cursos y Capacitación',
            'other': 'Consulta General'
        };
        return subjects[subjectValue] || 'Consulta desde el sitio web';
    }

    function createEmailBody(data) {
        return `
Nombre: ${data.name}
Email: ${data.email}
Teléfono: ${data.phone || 'No proporcionado'}
Empresa: ${data.company || 'No proporcionada'}

Mensaje:
${data.message}

---
Enviado desde el formulario de contacto de vertice.com.uy
        `.trim();
    }

    function showNotification(message, type) {
        // Crear elemento de notificación
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Estilos
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? '#28a745' : '#dc3545'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            font-weight: 500;
        `;
        
        document.body.appendChild(notification);
        
        // Remover después de 3 segundos
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // Agregar animaciones CSS para notificaciones
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(notificationStyle);

    // ===== NAVIGATION ACTIVE STATE =====
    const navLinks = document.querySelectorAll('.nav-item a');
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage || linkPage.includes('ContactUs')) {
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

    // ===== CONTACT CARDS HOVER EFFECT =====
    const contactCards = document.querySelectorAll('.contact-info-card, .contact-form-card');
    
    contactCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });

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

    // ===== CONTACT ICONS ANIMATION =====
    const infoIconHeader = document.querySelector('.info-icon-header');
    const formIconHeader = document.querySelector('.form-icon-header');
    
    if (infoIconHeader) {
        const iconObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'iconFloat 3s ease-in-out infinite';
                    iconObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        iconObserver.observe(infoIconHeader);
        if (formIconHeader) iconObserver.observe(formIconHeader);
    }

    // Agregar animación CSS para iconFloat
    const iconStyle = document.createElement('style');
    iconStyle.textContent = `
        @keyframes iconFloat {
            0%, 100% {
                transform: translateY(0) scale(1);
            }
            50% {
                transform: translateY(-10px) scale(1.05);
            }
        }
    `;
    document.head.appendChild(iconStyle);

    // ===== MAP ANIMATION =====
    const mapContainer = document.querySelector('.map-container');
    
    if (mapContainer) {
        const mapObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'scale(1)';
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        mapContainer.style.opacity = '0';
        mapContainer.style.transform = 'scale(0.95)';
        mapContainer.style.transition = 'all 0.8s ease';
        mapObserver.observe(mapContainer);
    }

    // ===== PARALLAX EFFECT ON HEADERS =====
    const contactHeaders = document.querySelectorAll('.info-header, .form-header');
    
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        
        contactHeaders.forEach((header, index) => {
            const rect = header.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const yPos = -(scrolled * 0.1);
                header.style.backgroundPosition = `center ${yPos}px`;
            }
        });
    });

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

    // ===== FORM GROUPS STAGGER ANIMATION =====
    const formGroups = document.querySelectorAll('.form-group');
    
    const formGroupObserver = new IntersectionObserver(function(entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 50);
                formGroupObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    formGroups.forEach(group => {
        group.style.opacity = '0';
        group.style.transform = 'translateY(20px)';
        group.style.transition = 'all 0.5s ease';
        formGroupObserver.observe(group);
    });

    // ===== CONSOLE LOG =====
    console.log('✅ Página de Contacto - Vértice Uruguay');
    console.log('📧 Formulario de contacto: Activo');
    console.log('📱 Sistema de navegación: Activo');
    console.log('🗺️ Mapa interactivo: Cargado');
    
    // ===== PREVENT SCROLL RESTORATION =====
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }

    // ===== INITIAL SCROLL TO TOP =====
    window.scrollTo(0, 0);
});