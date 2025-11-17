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

                    // **FIX START: This block now correctly executes inside the conditional**
                    const navElement = document.querySelector('nav');
                    if (navElement && navElement.__x && navElement.__x.$data.isMobileMenuOpen) {
                        // Fire a custom event for Alpine to listen to
                        navElement.dispatchEvent(new CustomEvent('close-mobile-menu'));
                    }
                    // **FIX END**

                    requestAnimationFrame(() => {
                        const navHeight = document.querySelector('nav').offsetHeight;
                        const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                        const offsetPosition = targetPosition - navHeight - 16; 

                        window.scrollTo({
                            top: offsetPosition,
                            behavior: 'smooth'
                        });
                    });
                }
            }
        }
    });

// --- Active Nav Link Highlighting on Scroll (Mobile Only on index.html) ---
const heroHeader = document.getElementById('hero-header');
const aboutSection = document.getElementById('about');
const faqSection = document.getElementById('faq-contact');

// Only run this script on the index page
if (heroHeader && aboutSection && faqSection) {
    const mobileHomeLink = document.getElementById('mobile-nav-home');
    const mobileWhyUsLink = document.getElementById('mobile-nav-why-us');
    const mobileFaqLink = document.getElementById('mobile-nav-faq');
    
    // Check if we found all the mobile links
    if (mobileHomeLink && mobileWhyUsLink && mobileFaqLink) {
        const sections = [heroHeader, aboutSection, faqSection];
        const links = [mobileHomeLink, mobileWhyUsLink, mobileFaqLink];

        const observer = new IntersectionObserver(entries => {
            
            // Get all sections that are currently visible
            const visibleSections = entries
                .filter(e => e.isIntersecting)
                .map(e => e.target.id);

            // Remove active class from all links first
            links.forEach(link => link.classList.remove('nav-active'));

            // Apply active class based on priority: FAQ > About > Home
            if (visibleSections.includes('faq-contact')) {
                mobileFaqLink.classList.add('nav-active');
            } else if (visibleSections.includes('about')) {
                mobileWhyUsLink.classList.add('nav-active');
            } else {
                // Default to home if no other section is prioritized or if only hero is visible
                mobileHomeLink.classList.add('nav-active');
            }

        }, { 
            // This margin means the section is "active" when it's in the middle 60% of the screen
            // (cuts off top 20% and bottom 20%)
            rootMargin: '-20% 0px -20% 0px',
            threshold: 0 
        });

        sections.forEach(section => observer.observe(section));
    }
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
