// ========================================
// MAIN JAVASCRIPT
// ========================================

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 100,
        easing: 'ease-in-out'
    });
    
    // Remove preloader
    setTimeout(() => {
        const preloader = document.querySelector('.preloader');
        if (preloader) {
            preloader.classList.add('fade-out');
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 500);
        }
    }, 1000);
    
    // Initialize all components
    initMobileMenu();
    initHeaderScroll();
    initBackToTop();
    initScrollAnimations();
    loadSpeakers();
    loadSchedule();
    loadTimeline();
    loadSponsors();
    initNewsletterForm();
    initSmoothScroll();
});

// ========================================
// MOBILE MENU
// ========================================
function initMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const icon = this.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                document.body.style.overflow = 'hidden';
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                document.body.style.overflow = '';
            }
        });
        
        // Close menu when clicking links
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
                mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                mobileMenuBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }
}

// ========================================
// HEADER SCROLL EFFECT
// ========================================
function initHeaderScroll() {
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// ========================================
// BACK TO TOP BUTTON
// ========================================
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ========================================
// SCROLL ANIMATIONS
// ========================================
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.2 });
    
    animatedElements.forEach(el => observer.observe(el));
    
    // Stagger children animation
    const staggerElements = document.querySelectorAll('.stagger-children');
    staggerElements.forEach(el => observer.observe(el));
}

// ========================================
// SMOOTH SCROLL
// ========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ========================================
// LOAD SPEAKERS
// ========================================
async function loadSpeakers() {
    try {
        const response = await fetch('data/speakers.json');
        const speakers = await response.json();
        
        const speakersGrid = document.getElementById('speakersGrid');
        if (speakersGrid) {
            speakersGrid.innerHTML = speakers.slice(0, 4).map(speaker => `
                <div class="speaker-card" data-aos="fade-up">
                    <div class="speaker-image-wrapper">
                        <img src="${speaker.image}" alt="${speaker.name}" class="speaker-image">
                        <div class="speaker-social">
                            <a href="${speaker.twitter || '#'}"><i class="fab fa-twitter"></i></a>
                            <a href="${speaker.linkedin || '#'}"><i class="fab fa-linkedin-in"></i></a>
                            <a href="${speaker.website || '#'}"><i class="fas fa-globe"></i></a>
                        </div>
                    </div>
                    <div class="speaker-info">
                        <h3 class="speaker-name">${speaker.name}</h3>
                        <p class="speaker-title">${speaker.title}</p>
                        <p class="speaker-affiliation">${speaker.affiliation}</p>
                    </div>
                </div>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading speakers:', error);
    }
}

// ========================================
// LOAD SCHEDULE
// ========================================
async function loadSchedule() {
    try {
        const response = await fetch('data/schedule.json');
        const schedule = await response.json();
        
        const scheduleContent = document.getElementById('scheduleContent');
        if (scheduleContent) {
            // Load day 1 by default
            updateScheduleView(schedule, 'day1');
            
            // Tab switching
            const tabBtns = document.querySelectorAll('.tab-btn');
            tabBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const day = btn.dataset.day;
                    tabBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    updateScheduleView(schedule, day);
                });
            });
        }
    } catch (error) {
        console.error('Error loading schedule:', error);
    }
}

function updateScheduleView(schedule, day) {
    const scheduleContent = document.getElementById('scheduleContent');
    const daySchedule = schedule[day];
    
    if (daySchedule && scheduleContent) {
        scheduleContent.innerHTML = daySchedule.map(item => `
            <div class="schedule-item" data-aos="fade-up">
                <div class="schedule-time">${item.time}</div>
                <div class="schedule-details">
                    <div class="schedule-title">${item.title}</div>
                    <div class="schedule-speaker">${item.speaker || 'TBD'}</div>
                    <div class="schedule-location"><i class="fas fa-map-marker-alt"></i> ${item.location}</div>
                </div>
            </div>
        `).join('');
    }
}

// ========================================
// LOAD TIMELINE
// ========================================
async function loadTimeline() {
    try {
        const response = await fetch('data/important-dates.json');
        const dates = await response.json();
        
        const timeline = document.getElementById('timeline');
        if (timeline) {
            timeline.innerHTML = dates.map((date, index) => `
                <div class="timeline-item" data-aos="fade-up" data-aos-delay="${index * 100}">
                    <div class="timeline-content">
                        <span class="timeline-date">${date.date}</span>
                        <h3>${date.event}</h3>
                        <p>${date.description || 'Mark your calendar for this important date.'}</p>
                    </div>
                    <div class="timeline-badge"></div>
                </div>
            `).join('');
        }
        
        // Load footer dates
        const footerDates = document.getElementById('footerDates');
        if (footerDates) {
            footerDates.innerHTML = dates.slice(0, 3).map(date => `
                <li><i class="fas fa-calendar-alt"></i> ${date.event}: ${date.date}</li>
            `).join('');
        }
    } catch (error) {
        console.error('Error loading timeline:', error);
    }
}

// ========================================
// LOAD SPONSORS
// ========================================
async function loadSponsors() {
    try {
        const response = await fetch('data/sponsors.json');
        const sponsors = await response.json();
        
        const sponsorsTrack = document.getElementById('sponsorsTrack');
        if (sponsorsTrack) {
            // Duplicate sponsors for seamless scrolling
            const sponsorItems = sponsors.map(sponsor => `
                <div class="sponsor-card">
                    <img src="${sponsor.logo}" alt="${sponsor.name}">
                </div>
            `).join('');
            
            sponsorsTrack.innerHTML = sponsorItems + sponsorItems;
        }
    } catch (error) {
        console.error('Error loading sponsors:', error);
    }
}

// ========================================
// NEWSLETTER FORM
// ========================================
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = form.querySelector('input[type="email"]').value;
            const button = form.querySelector('button');
            const originalText = button.innerHTML;
            
            // Show loading state
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Subscribing...';
            button.disabled = true;
            
            // Simulate API call (replace with actual API endpoint)
            setTimeout(() => {
                // Success message
                button.innerHTML = '<i class="fas fa-check"></i> Subscribed!';
                button.style.background = 'var(--success)';
                
                // Reset form
                form.reset();
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.innerHTML = originalText;
                    button.style.background = '';
                    button.disabled = false;
                }, 3000);
                
                // Show success notification
                showNotification('Successfully subscribed! Check your email for updates.', 'success');
            }, 1500);
        });
    }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10B981' : '#3B82F6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;
    
    document.body.appendChild(notification);
    
    // Close button
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.25rem;
        cursor: pointer;
        margin-left: 1rem;
    `;
    
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'fadeOutRight 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ========================================
// LAZY LOAD IMAGES
// ========================================
function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// PARALLAX EFFECT
// ========================================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxBg = document.querySelector('.hero-bg-parallax');
        if (parallaxBg) {
            parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function animateCounter(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = Math.floor(progress * (end - start) + start);
        element.textContent = current;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Initialize counters when in view
function initCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
                animateCounter(counter, 0, target, 2000);
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => counterObserver.observe(counter));
}

// ========================================
// ADDITIONAL UTILITIES
// ========================================
// Debounce function for performance
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

// Throttle function for performance
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export functions for debugging
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { showNotification, debounce, throttle };
}