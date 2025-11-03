// Initialize sticky donation button on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded - version 20241201-001');
    
    // Initialize UTM tracking
    initUTMTracking();
    
    // Initialize sticky donation button
    initStickyDonationButton();
});

// UTM Tracking functionality
async function initUTMTracking() {
    const storageKey = 'visitor_hash';
    
    // Check if hash exists in localStorage
    let visitorHash = localStorage.getItem(storageKey);
    
    // If no hash exists, create a new one
    if (!visitorHash) {
        visitorHash = generateUniqueIdentifier();
        localStorage.setItem(storageKey, visitorHash);
        console.log('Created new visitor hash:', visitorHash);
    } else {
        console.log('Existing visitor hash found:', visitorHash);
    }
    
    // Get UTM parameters from URL
    const urlParams = new URLSearchParams(window.location.search);
    const utmParams = {
        source: urlParams.get('source'),
        medium: urlParams.get('medium'),
        campaign: urlParams.get('campaign'),
        content: urlParams.get('content'),
        term: urlParams.get('term')
    };
    
    console.log('UTM parameters from URL:', utmParams);
    
    // Store UTM parameters in localStorage (overwrites previous, even if null)
    localStorage.setItem('utm_params', JSON.stringify(utmParams));
    
    // Send visit data to API
    await sendVisitToAPI(visitorHash, utmParams);
    
    return visitorHash;
}

// Send visit data to API
async function sendVisitToAPI(hash, utmParams) {
    try {
        // Get user agent
        const userAgent = navigator.userAgent;
        
        // Get IP address
        const ipAddress = await getIPAddress();
        
        // Prepare payload
        const payload = {
            token: 'engagmentslomimokaveze',
            hash: hash,
            ip_address: ipAddress,
            user_agent: userAgent,
            version: 'dp',
            utm_source: utmParams.source,
            utm_medium: utmParams.medium,
            utm_campaign: utmParams.campaign,
            utm_content: utmParams.content,
            utm_term: utmParams.term
        };
        
        console.log('Sending visit data to API:', payload);
        
        // Send to API
        const response = await fetch('https://api.slomimokaveze.rs/visit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        
        if (response.ok) {
            console.log('Visit data sent successfully to API');
        } else {
            console.error('Failed to send visit data to API:', response.status);
        }
    } catch (error) {
        console.error('Error sending visit data to API:', error);
    }
}

// Get IP address from external service
async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}

// Generate a 30-character unique identifier
function generateUniqueIdentifier() {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2);
    
    // Combine and take 30 characters
    const combined = timestamp + randomStr;
    return combined.substring(0, 30);
}

// Sticky Donation Button functionality
function initStickyDonationButton() {
    const donateBtn = document.getElementById('stickyDonateBtn');
    const donorboxContainer = document.querySelector('.donorbox-container');
    
    if (!donateBtn) {
        console.log('Sticky donate button not found');
        return;
    }
    
    if (!donorboxContainer) {
        console.log('Donorbox container not found');
        return;
    }
    
    let lastScrollTop = 0;
    let isSticky = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        // Get hero section (where donorbox is)
        const heroSection = document.getElementById('hero');
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // Show sticky button when hero section is not visible (scrolled past it)
        if (heroBottom <= 0) {
            if (!isSticky) {
                donateBtn.classList.add('sticky');
                isSticky = true;
            }
        } else {
            // Hide sticky button when hero section is visible
            if (isSticky) {
                donateBtn.classList.remove('sticky');
                isSticky = false;
            }
        }
        
        lastScrollTop = scrollTop;
    }
    
    // Throttle scroll events for better performance
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(handleScroll, 10);
    });
    
    // Click handler to scroll to donorbox
    donateBtn.addEventListener('click', function() {
        donorboxContainer.scrollIntoView({ 
            behavior: 'smooth',
            block: 'center'
        });
    });
}
