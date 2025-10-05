document.addEventListener('DOMContentLoaded', () => {
    // --- Set Current Year in Footer ---
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById('back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Universal Smooth Scroll for Anchor Links ---
    document.body.addEventListener('click', function(e) {
        const link = e.target.closest('a[href*="#"]');
        if (!link) return;

        const targetId = link.hash;
        if (targetId && targetId.length > 1) {
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();

                // --- NEW & IMPROVED MENU CLOSING LOGIC ---
                // Get the main <nav> element which holds the Alpine.js state
                const navElement = document.querySelector('nav');
                // If the nav's Alpine data shows the menu is open, set it to false.
                if (navElement && navElement.__x && navElement.__x.$data.isMobileMenuOpen) {
                    navElement.__x.$data.isMobileMenuOpen = false;
                }
                // --- END OF NEW LOGIC ---
                
                // Use a short delay to allow the menu to start closing before scrolling
                setTimeout(() => {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = targetPosition - navHeight - 16; 

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }, 150);
            }
        }
    });
});