// Simple Carousel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.getElementById('carousel-slides');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const dots = document.querySelectorAll('.carousel-dot');
    
    let currentSlide = 1; // Start at the first real slide (index 1)
    const totalSlides = 3; // Number of real slides
    
    // Function to update carousel position
    function updateCarousel() {
        const translateX = -currentSlide * 100;
        slides.style.transform = `translateX(${translateX}%)`;
        
        // Update dots based on real slide position
        const realSlideIndex = getRealSlideIndex();
        dots.forEach((dot, index) => {
            if (index === realSlideIndex) {
                dot.classList.remove('bg-gray-500');
                dot.classList.add('bg-primary-500');
            } else {
                dot.classList.remove('bg-primary-500');
                dot.classList.add('bg-gray-500');
            }
        });
    }
    
    // Get the real slide index (0, 1, or 2)
    function getRealSlideIndex() {
        if (currentSlide === 0) return 2; // Duplicate of last slide
        if (currentSlide === 4) return 0; // Duplicate of first slide
        return currentSlide - 1; // Real slides are at indices 1, 2, 3
    }
    
    // Next slide function
    function nextSlide() {
        currentSlide++;
        if (currentSlide === 4) {
            // We're at the duplicate of the first slide, jump back to real first slide
            currentSlide = 1;
        }
        updateCarousel();
    }
    
    // Previous slide function
    function prevSlide() {
        currentSlide--;
        if (currentSlide === 0) {
            // We're at the duplicate of the last slide, jump to real last slide
            currentSlide = 3;
        }
        updateCarousel();
    }
    
    // Go to specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex + 1; // Real slides start at index 1
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
    
    // Initialize carousel at the first real slide
    updateCarousel();
});
