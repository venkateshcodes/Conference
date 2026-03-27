// ========================================
// 404 PAGE FUNCTIONALITY
// Sanskaram University Conference 2026
// ========================================

// Array of fun facts to display randomly
const funFacts = [
    "Did you know? The Interdisciplinary Conference brings together over 500 researchers from 25+ countries!",
    "Interesting fact: Our keynote speakers have published over 2,000 research papers combined!",
    "Did you know? Early bird registration saves you up to 30% on conference fees!",
    "Fun fact: The conference features 8 parallel tracks covering 20+ research areas!",
    "Did you know? Abstract submissions have increased by 40% compared to last year!",
    "Interesting: Our program committee includes members from 15 different countries!",
    "Did you know? The conference proceedings will be indexed in Scopus and Web of Science!",
    "Fun fact: There will be over 100 poster presentations from young researchers!",
    "Did you know? The gala dinner will feature live cultural performances!",
    "Interesting: We have participants from over 50 prestigious universities worldwide!",
    "Did you know? Networking sessions are designed to connect you with industry leaders!",
    "Fun fact: The conference app will help you navigate sessions and connect with peers!",
    "Did you know? Best paper awards will be announced at the closing ceremony!",
    "Interesting: Virtual participation options are available for international attendees!",
    "Did you know? The venue features state-of-the-art presentation facilities!"
];

// Current fact index for rotation
let currentFactIndex = 0;

// ========================================
// DOM Content Loaded
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    console.log('404 Page Loaded - Path:', window.location.pathname);
    
    // Initialize animations and functionality
    initializeFunFactRotation();
    initializeKeyboardShortcuts();
    track404Error();
    addRippleEffect();
    addSmoothScrolling();
});

// ========================================
// FUN FACT ROTATION
// ========================================
function initializeFunFactRotation() {
    // Display random fun fact on load
    displayRandomFact();
    
    // Change fact every 10 seconds
    setInterval(displayRandomFact, 10000);
}

function displayRandomFact() {
    const randomIndex = Math.floor(Math.random() * funFacts.length);
    const factElement = document.getElementById('funFactText');
    
    if (factElement) {
        // Fade out animation
        factElement.style.transition = 'opacity 0.3s ease';
        factElement.style.opacity = '0';
        
        setTimeout(() => {
            factElement.textContent = funFacts[randomIndex];
            factElement.style.opacity = '1';
        }, 300);
    }
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================
function performSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchTerm = searchInput.value.trim();
    
    if (searchTerm === '') {
        showNotification('Please enter a search term', 'info');
        searchInput.focus();
        return;
    }
    
    // Show loading state
    const searchButton = document.querySelector('.search-container button');
    const originalButtonText = searchButton.innerHTML;
    searchButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Searching...';
    searchButton.disabled = true;
    
    // Simulate search delay for better UX
    setTimeout(() => {
        // Create search query
        const searchQuery = encodeURIComponent(searchTerm + ' Sanskaram University Conference 2026');
        
        // Redirect to Google search (you can replace with custom search)
        window.location.href = `https://www.google.com/search?q=${searchQuery}`;
        
        // Reset button (will not execute if redirect happens)
        searchButton.innerHTML = originalButtonText;
        searchButton.disabled = false;
    }, 300);
}

function handleSearchKeyPress(event) {
    if (event.key === 'Enter') {
        performSearch();
    }
}

// Make functions globally accessible
window.performSearch = performSearch;
window.handleSearchKeyPress = handleSearchKeyPress;

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
    // Remove existing notification if any
    const existingNotification = document.querySelector('.error-notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'error-notification';
    
    // Set styles
    const bgColor = type === 'info' ? '#C6A43F' : '#EF4444';
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: ${bgColor};
        color: white;
        padding: 12px 24px;
        border-radius: 50px;
        z-index: 10000;
        animation: fadeInUp 0.3s ease;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-size: 14px;
        font-weight: 500;
        font-family: 'Inter', sans-serif;
        display: flex;
        align-items: center;
        gap: 10px;
        white-space: nowrap;
    `;
    
    // Add icon
    const icon = type === 'info' ? 'fa-info-circle' : 'fa-exclamation-circle';
    notification.innerHTML = `
        <i class="fas ${icon}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}

// ========================================
// KEYBOARD SHORTCUTS
// ========================================
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            e.preventDefault();
            window.location.href = 'index.html';
        }
        // Press 'S' to focus on search input
        else if (e.key === 's' || e.key === 'S') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                showNotification('Start typing to search the conference website', 'info');
            }
        }
        // Press 'R' to go to registration
        else if (e.key === 'r' || e.key === 'R') {
            e.preventDefault();
            window.location.href = 'registration.html';
        }
        // Press 'Esc' to clear search
        else if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && document.activeElement === searchInput) {
                searchInput.value = '';
                searchInput.blur();
                showNotification('Search cleared', 'info');
            }
        }
    });
    
    // Display keyboard shortcuts hint in console
    console.log('Keyboard Shortcuts: H=Home, S=Search, R=Register, Esc=Clear Search');
}

// ========================================
// RIPPLE EFFECT FOR BUTTONS
// ========================================
function addRippleEffect() {
    const buttons = document.querySelectorAll('.btn');
    
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const x = e.clientX - e.target.offsetLeft;
            const y = e.clientY - e.target.offsetTop;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: 0px;
                height: 0px;
                background: rgba(255, 255, 255, 0.4);
                border-radius: 50%;
                transform: translate(-50%, -50%);
                pointer-events: none;
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
            `;
            
            // Add position relative if not set
            if (getComputedStyle(button).position === 'static') {
                button.style.position = 'relative';
                button.style.overflow = 'hidden';
            }
            
            button.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add ripple animation to stylesheet if not exists
    if (!document.querySelector('#ripple-animation')) {
        const style = document.createElement('style');
        style.id = 'ripple-animation';
        style.textContent = `
            @keyframes ripple {
                0% {
                    width: 0px;
                    height: 0px;
                    opacity: 0.5;
                }
                100% {
                    width: 200px;
                    height: 200px;
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// ========================================
// SMOOTH SCROLLING
// ========================================
function addSmoothScrolling() {
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
// TRACK 404 ERROR IN ANALYTICS
// ========================================
function track404Error() {
    // Track in Google Analytics if available
    if (typeof gtag !== 'undefined') {
        gtag('event', '404_error', {
            'page_path': window.location.pathname,
            'page_title': document.title,
            'page_referrer': document.referrer
        });
        console.log('404 Error tracked in Google Analytics');
    }
    
    // Track in console for debugging
    console.log('404 Error Details:', {
        path: window.location.pathname,
        referrer: document.referrer,
        timestamp: new Date().toISOString()
    });
}

// ========================================
// CURSOR TRAIL EFFECT (Optional)
// ========================================
let cursorTrail = [];
let isCursorTrailEnabled = false;

// Enable cursor trail on user preference (you can enable by default)
// To enable, set isCursorTrailEnabled = true

if (isCursorTrailEnabled) {
    document.addEventListener('mousemove', function(e) {
        // Limit trail length
        if (cursorTrail.length > 3) {
            const oldTrail = cursorTrail.shift();
            if (oldTrail && oldTrail.parentNode) oldTrail.remove();
        }
        
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: var(--secondary, #C6A43F);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${e.clientX - 3}px;
            top: ${e.clientY - 3}px;
            opacity: 0.5;
            transition: opacity 0.3s ease;
            animation: fadeOut 1s ease forwards;
        `;
        document.body.appendChild(trail);
        cursorTrail.push(trail);
        
        setTimeout(() => {
            if (trail && trail.parentNode) trail.remove();
        }, 1000);
    });
}

// ========================================
// PRELOAD IMAGES AND RESOURCES
// ========================================
window.addEventListener('load', function() {
    // Add a subtle entrance animation
    const container = document.querySelector('.error-container');
    if (container) {
        container.style.animation = 'scaleIn 0.6s ease';
    }
    
    // Preload important resources
    preloadImages();
});

function preloadImages() {
    // Preload any critical images if needed
    const imagesToPreload = [
        // Add image URLs if needed
    ];
    
    imagesToPreload.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// ========================================
// BROWSER COMPATIBILITY CHECKS
// ========================================
function checkBrowserCompatibility() {
    const isIE = /*@cc_on!@*/false || !!document.documentMode;
    
    if (isIE) {
        showNotification('For best experience, please use Chrome, Firefox, or Edge browser', 'info');
    }
}

checkBrowserCompatibility();

// ========================================
// EXPORT FUNCTIONS FOR DEBUGGING
// ========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        performSearch,
        showNotification,
        displayRandomFact
    };
}

// ========================================
// ADD HELPER FUNCTIONS TO WINDOW OBJECT
// ========================================
window.debug404 = {
    showNotification: (msg, type) => showNotification(msg, type),
    getFunFacts: () => funFacts,
    getCurrentPath: () => window.location.pathname
};

console.log('404 Page Scripts Loaded Successfully');
console.log('Debug commands available: window.debug404');