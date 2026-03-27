// ========================================
// COUNTDOWN TIMER
// ========================================

// Conference date (April 15, 2026)
const conferenceDate = new Date(2026, 3, 15, 9, 0, 0); // Month is 0-indexed

function updateCountdown() {
    const now = new Date().getTime();
    const distance = conferenceDate - now;
    
    // Time calculations
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
    // Update DOM
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    
    if (daysElement) daysElement.textContent = formatNumber(days);
    if (hoursElement) hoursElement.textContent = formatNumber(hours);
    if (minutesElement) minutesElement.textContent = formatNumber(minutes);
    if (secondsElement) secondsElement.textContent = formatNumber(seconds);
    
    // Add pulse animation when seconds change
    if (secondsElement) {
        secondsElement.classList.add('pulse');
        setTimeout(() => {
            secondsElement.classList.remove('pulse');
        }, 100);
    }
    
    // Check if conference has started
    if (distance < 0) {
        document.getElementById('countdown').innerHTML = `
            <div class="countdown-started">
                <i class="fas fa-calendar-check"></i>
                <h3>The Conference Has Begun!</h3>
                <p>Join us at Sanskaram University</p>
            </div>
        `;
    }
}

function formatNumber(number) {
    return number < 10 ? '0' + number : number.toString();
}

// Update countdown every second
setInterval(updateCountdown, 1000);

// Initial call
updateCountdown();

// Add CSS for pulse animation
const style = document.createElement('style');
style.textContent = `
    .pulse {
        animation: numberPulse 0.3s ease;
    }
    
    @keyframes numberPulse {
        0% {
            transform: scale(1);
        }
        50% {
            transform: scale(1.1);
            color: var(--secondary);
        }
        100% {
            transform: scale(1);
        }
    }
    
    .countdown-started {
        text-align: center;
        background: rgba(255,255,255,0.1);
        padding: 2rem;
        border-radius: 1rem;
    }
    
    .countdown-started i {
        font-size: 3rem;
        color: var(--secondary);
        margin-bottom: 1rem;
    }
    
    .countdown-started h3 {
        font-size: 1.5rem;
        margin-bottom: 0.5rem;
    }
    
    .countdown-started p {
        color: rgba(255,255,255,0.9);
    }
`;
document.head.appendChild(style);