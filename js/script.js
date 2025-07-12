// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    window.addEventListener('load', function() {
        const preloader = document.querySelector('.preloader');
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1000);
    });

    // Set current year in footer
    document.getElementById('year').textContent = new Date().getFullYear();

    // Sticky Header
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Dark/Light Theme Toggle
    const themeToggle = document.querySelector('.theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use default
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    } else {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    }
    
    // Toggle theme
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        
        if (body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });

    // Form submission (prevent default and show success message)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Gather form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            // Show success message (in a real implementation, you would send this data to a server)
            const formGroups = contactForm.querySelectorAll('.form-group');
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            submitButton.innerHTML = 'Message Sent!';
            submitButton.style.backgroundColor = 'var(--secondary)';
            
            // Clear form
            contactForm.reset();
            
            // Reset button after 3 seconds
            setTimeout(() => {
                submitButton.innerHTML = 'Send Message';
                submitButton.style.backgroundColor = '';
            }, 3000);
        });
    }

    // Add animations to elements when they come into view
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.25
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Elements to animate
    const animateElements = [
        ...document.querySelectorAll('.section-title'),
        ...document.querySelectorAll('.about-image'),
        ...document.querySelectorAll('.about-text'),
        ...document.querySelectorAll('.project-card'),
        ...document.querySelectorAll('.skill-item'),
        ...document.querySelectorAll('.contact-info'),
        ...document.querySelectorAll('.contact-form-container')
    ];
    
    animateElements.forEach(el => {
        // Add initial animation class
        el.classList.add('fade-in');
        observer.observe(el);
    });
    
    // Add some CSS for animations
    const animationStyles = document.createElement('style');
    animationStyles.textContent = `
        .fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .fade-in.animate {
            opacity: 1;
            transform: translateY(0);
        }
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.05); }
            100% { transform: scale(1); }
        }
        .pulse {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(animationStyles);

    // Add typing effect to hero title
    const heroName = document.querySelector('.hero-content h1 .highlight');
    if (heroName) {
        const originalText = heroName.textContent;
        heroName.textContent = '';
        
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < originalText.length) {
                heroName.textContent += originalText.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
    }
});
