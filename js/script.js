// FAQ Toggle functionality
function toggleFaq(questionElement) {
    const answerElement = questionElement.nextElementSibling;
    const arrowElement = questionElement.querySelector('.faq-arrow');
    
    if (answerElement.classList.contains('collapsed')) {
        // Expand
        answerElement.classList.remove('collapsed');
        arrowElement.classList.remove('rotated');
    } else {
        // Collapse
        answerElement.classList.add('collapsed');
        arrowElement.classList.add('rotated');
    }
}

// Initialize FAQ sections to be collapsed by default
document.addEventListener('DOMContentLoaded', function() {
    const faqAnswers = document.querySelectorAll('.faq-answer');
    const faqArrows = document.querySelectorAll('.faq-arrow');
    
    faqAnswers.forEach(answer => {
        answer.classList.add('collapsed');
    });
    
    faqArrows.forEach(arrow => {
        arrow.classList.add('rotated');
    });
    
    // Initialize sticky donation button
    initStickyDonationButton();
});

// Sticky Donation Button functionality
function initStickyDonationButton() {
    const donateBtn = document.getElementById('stickyDonateBtn');
    const thankYouSection = document.getElementById('thank-you');
    const donorboxContainer = document.querySelector('.donorbox-container');
    
    if (!donateBtn || !thankYouSection || !donorboxContainer) {
        return;
    }
    
    let lastScrollTop = 0;
    let isSticky = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const thankYouRect = thankYouSection.getBoundingClientRect();
        const thankYouBottom = thankYouRect.bottom;
        
        // Get hero section (where donorbox is)
        const heroSection = document.getElementById('hero');
        const heroRect = heroSection.getBoundingClientRect();
        const heroBottom = heroRect.bottom;
        
        // Get button position relative to viewport
        const buttonRect = donateBtn.getBoundingClientRect();
        const buttonTop = buttonRect.top;
        
        // Check if scrolling up
        const isScrollingUp = scrollTop < lastScrollTop;
        
        // Make sticky when scrolling up past the thank-you section
        if (isScrollingUp && scrollTop > thankYouBottom) {
            if (!isSticky) {
                donateBtn.classList.add('sticky');
                isSticky = true;
            }
        } else if (scrollTop <= heroBottom + 100) {
            // Remove sticky when scrolling back to the hero section
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
