document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });

    // Typed.js initialization for the hero section
    if (document.querySelector('.typed')) {
        var typed = new Typed('.typed', {
            strings: ['digital experiences', 'web solutions', 'user interfaces', 'innovative designs'],
            typeSpeed: 100,
            backSpeed: 50,
            loop: true
        });
    }

    // Counter animation for stats
    const counters = document.querySelectorAll('.counter');
    const speed = 200;
    
    if (counters.length > 0) {
        counters.forEach(counter => {
            const animate = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;
                const increment = target / speed;
                
                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(animate, 1);
                } else {
                    counter.innerText = target;
                }
            };
            
            const counterObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    animate();
                }
            }, { threshold: 0.5 });
            
            counterObserver.observe(counter);
        });
    }

    // Mobile navigation toggle
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navbar = document.getElementById('navbar');
    const body = document.body;
    
    if (mobileNavToggle && navbar) {
        mobileNavToggle.addEventListener('click', function() {
            navbar.classList.toggle('active');
            body.classList.toggle('menu-open');
            this.classList.toggle('fa-bars');
            this.classList.toggle('fa-times');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-link.scrollto').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    body.classList.remove('menu-open');
                    mobileNavToggle.classList.toggle('fa-bars');
                    mobileNavToggle.classList.toggle('fa-times');
                }
            }
        });
    });

    // Back to top button
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
        
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Preloader
    const preloader = document.querySelector('#preloader');
    if (preloader) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500);
            }, 500);
        });
    }

    // Enhanced Active Section Indicator
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link.scrollto');
    const header = document.getElementById('header');
    
    function activateCurrentSection() {
        let scrollPosition = window.scrollY + 100;
        
        // Header scroll effect
        if (window.scrollY > 50) {
            header.classList.add('header-scrolled');
        } else {
            header.classList.remove('header-scrolled');
        }
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                        
                        // Activate the nav indicator with your styling
                        const indicator = link.querySelector('.nav-indicator');
                        if (indicator) {
                            indicator.style.background = 'var(--primary-color)';
                            indicator.style.boxShadow = '0 0 8px var(--primary-color)';
                        }
                    } else {
                        // Reset other indicators
                        const otherIndicator = link.querySelector('.nav-indicator');
                        if (otherIndicator) {
                            otherIndicator.style.background = 'transparent';
                            otherIndicator.style.boxShadow = 'none';
                        }
                    }
                });
            }
        });
    }
    
    // Run on scroll and initial load
    window.addEventListener('scroll', activateCurrentSection);
    window.addEventListener('load', activateCurrentSection);

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (navbar.classList.contains('active') && 
            !e.target.closest('.navbar') && 
            !e.target.closest('.mobile-nav-toggle')) {
            navbar.classList.remove('active');
            body.classList.remove('menu-open');
            mobileNavToggle.classList.add('fa-bars');
            mobileNavToggle.classList.remove('fa-times');
        }
    });

    // Initialize Swiper (if you have any sliders)
    if (document.querySelector('.swiper-container')) {
        new Swiper('.swiper-container', {
            loop: true,
            autoplay: {
                delay: 5000,
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });
    }

    // Initialize particles.js (if you want background particles)
    if (document.getElementById('particles-js')) {
        particlesJS.load('particles-js', 'assets/js/particles.json', function() {
            console.log('Particles.js loaded');
        });
    }
});

