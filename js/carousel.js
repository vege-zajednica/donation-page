// Simple Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('carousel-slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 0;
    const totalSlides = 3; // Number of slides
    
    // Function to update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        slides.style.transform = `translateX(${translateX}%)`;
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.remove('bg-gray-300');
                dot.classList.add('bg-primary-500');
            } else {
                dot.classList.remove('bg-primary-500');
                dot.classList.add('bg-gray-300');
            }
        });
        
        // Update progress bar
        const progress = ((currentSlide + 1) / totalSlides) * 100;
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateCarousel();
    }
    
    // Event listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);
    
    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            prevSlide();
        } else if (e.key === 'ArrowRight') {
            nextSlide();
        }
    });
    
    // Auto-play removed as requested
    
    // Initialize carousel
    updateCarousel();
});
