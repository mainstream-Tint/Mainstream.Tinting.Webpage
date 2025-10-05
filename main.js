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
        
        if ( link.pathname === window.location.pathname ) {
            const targetId = link.hash;
            if (targetId && targetId.length > 1) {
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    e.preventDefault();

                    const navElement = document.querySelector('nav');
                    if (navElement && navElement.__x && navElement.__x.$data.isMobileMenuOpen) {
                        navElement.__x.$data.isMobileMenuOpen = false;
                    }
                    
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
        }
    });

    // --- Active Nav Link Highlighting on Scroll (for index.html) ---
    const aboutSection = document.getElementById('about');
    const faqSection = document.getElementById('faq-contact');
    const aboutLink = document.querySelector('button.nav-link-lift:has(span:contains("About"))');
    
    if ((aboutSection || faqSection) && aboutLink) {å
        const sectionsToWatch = [aboutSection, faqSection].filter(Boolean);

        const navObserver = new IntersectionObserver((entries) => {
            let isAnySectionIntersecting = entries.some(entry => entry.isIntersecting);
            if (isAnySectionIntersecting) {
                aboutLink.classList.add('nav-active');
            } else {
                aboutLink.classList.remove('nav-active');
            }
        }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });

        sectionsToWatch.forEach(section => navObserver.observe(section));
    }

    // --- Reveal on Scroll Animation ---
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    const elementsToReveal = document.querySelectorAll('.reveal-on-scroll');
    elementsToReveal.forEach(el => revealObserver.observe(el));
});
