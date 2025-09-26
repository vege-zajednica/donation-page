// Modal functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('signatureModal');
    const openModalBtn = document.getElementById('openModalBtn');
    const closeModalBtn = document.getElementById('closeModal');
    const form = document.getElementById('signatureForm');

    console.log('Modal elements found:', {
        modal: !!modal,
        openModalBtn: !!openModalBtn,
        closeModalBtn: !!closeModalBtn,
        form: !!form
    });

    // Open modal when clicking the "Potpisujem" button
    if (openModalBtn) {
        openModalBtn.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Button clicked, opening modal...');
            modal.classList.remove('hidden');
            modal.classList.add('show');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
            console.log('Modal classes after click:', modal.className);
        });
    } else {
        console.error('Open modal button not found!');
    }

    // Close modal when clicking the close button
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', function() {
            closeModal();
        });
    }

    // Close modal when clicking outside of it
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            closeModal();
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(form);
            const data = {
                firstName: formData.get('firstName'),
                lastName: formData.get('lastName'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                terms: formData.get('terms')
            };

            // Validate form
            if (!data.firstName || !data.lastName || !data.phone || !data.email || !data.terms) {
                alert('Molimo popunite sva polja i prihvatite uslove korišćenja.');
                return;
            }

            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(data.email)) {
                alert('Molimo unesite ispravnu email adresu.');
                return;
            }

            // Validate phone format (basic validation)
            const phoneRegex = /^[\+]?[0-9\s\-\(\)]{8,}$/;
            if (!phoneRegex.test(data.phone)) {
                alert('Molimo unesite ispravan broj telefona.');
                return;
            }

            // Here you would typically send the data to your server
            console.log('Form submitted with data:', data);
            
            // Show success message
            alert('Hvala vam! Vaš potpis je uspešno poslat.');
            
            // Reset form and close modal
            form.reset();
            closeModal();
        });
    }

    function closeModal() {
        modal.classList.remove('show');
        modal.classList.add('hidden');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
});

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
