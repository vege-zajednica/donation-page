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
