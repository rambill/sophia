// =================================
// INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
// =================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in-scroll elements
document.querySelectorAll('.fade-in-scroll').forEach(el => {
    observer.observe(el);
});

// =================================
// NAVIGATION MENU TOGGLE
// =================================
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// =================================
// FILTER PORTFOLIO ITEMS
// =================================
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');

        const filterValue = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 10);
            } else {
                item.style.display = 'none';
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
            }
        });
    });
});

// Initial state for portfolio items
portfolioItems.forEach(item => {
    item.style.transition = 'all 0.3s ease';
    item.style.opacity = '1';
    item.style.transform = 'scale(1)';
});

// =================================
// SMOOTH SCROLL FOR NAVIGATION
// =================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// =================================
// FORM HANDLING - REMOVED
// =================================

// =================================
// NAVBAR BACKGROUND ON SCROLL
// =================================
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.15)';
    } else {
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.1)';
    }
});

// =================================
// ACTIVE NAV LINK ON SCROLL
// =================================
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            // Remove active class from all links
            document.querySelectorAll('.nav-link').forEach(link => {
                link.style.color = '';
            });
            // Add styling to current link
            if (navLink) {
                navLink.style.color = 'var(--primary-color)';
            }
        }
    });
});

// =================================
// TYPEWRITER EFFECT (Optional Enhancement)
// =================================
function typeWriter(element, text, speed = 50) {
    let index = 0;
    element.textContent = '';

    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Apply typewriter effect to hero subtitle if desired
window.addEventListener('load', () => {
    const subtitle = document.querySelector('.subtitle');
    if (subtitle) {
        const text = subtitle.textContent;
        typeWriter(subtitle, text, 50);
    }
});

// =================================
// PARALLAX EFFECT
// =================================
window.addEventListener('scroll', () => {
    const parallexElements = document.querySelectorAll('[data-parallax]');

    parallexElements.forEach(element => {
        const scrollPosition = window.scrollY;
        const elementOffset = element.offsetTop;
        const distance = scrollPosition - elementOffset;
        element.style.transform = `translateY(${distance * 0.5}px)`;
    });
});

// =================================
// COUNTER ANIMATION FOR STATS
// =================================
function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(counter);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// Trigger counter animation when stats section comes into view
const statsSection = document.querySelector('.about-stats');
let statsAnimated = false;

if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                document.querySelectorAll('.stat h3').forEach(stat => {
                    const target = parseInt(stat.textContent);
                    animateCounter(stat, target);
                });
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// =================================
// SKILL PROGRESS ANIMATION
// =================================
const skillBarsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.progress');
            progressBars.forEach(bar => {
                const width = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = width;
                    bar.style.transition = 'width 1.5s ease-out';
                }, 100);
            });
            skillBarsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const skillsSection = document.querySelector('.skills');
if (skillsSection) {
    skillBarsObserver.observe(skillsSection);
}

// =================================
// MOUSE MOVE EFFECT ON HERO
// =================================
const hero = document.querySelector('.hero');
const animatedShape = document.querySelector('.animated-shape');

if (hero && animatedShape) {
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth;
        const mouseY = e.clientY / window.innerHeight;

        const moveX = (mouseX - 0.5) * 50;
        const moveY = (mouseY - 0.5) * 50;

        animatedShape.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// =================================
// RIPPLE EFFECT ON BUTTONS
// =================================
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.position = 'absolute';
        ripple.style.width = size + 'px';
        ripple.style.height = size + 'px';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.borderRadius = '50%';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';

        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// =================================
// DOCUMENT READY
// =================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Portfolio website loaded successfully!');
});