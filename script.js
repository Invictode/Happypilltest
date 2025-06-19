document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
            }, 500); // A little delay to ensure everything is loaded
        });
    }
    
    // --- Seamless Page Transition ---
    const pageTransitionLinks = document.querySelectorAll('.page-transition-link');
    const transitionOverlay = document.querySelector('.page-transition-overlay');

    pageTransitionLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const destination = this.href;
            const isLifeline = destination.includes('lifeline.html');
            
            // Set overlay color based on destination page theme
            transitionOverlay.style.backgroundColor = isLifeline ? 'var(--ll-ghost-white)' : 'var(--brand-dark)';
            
            // Activate the transition
            transitionOverlay.classList.add('is-active');

            // Navigate after the animation completes
            setTimeout(() => {
                window.location.href = destination;
            }, 650); // Match this to CSS transition duration
        });
    });


    // --- Scroll Animation Observer ---
    const animatedElements = document.querySelectorAll('.scroll-animate');
    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15 // Trigger when 15% of the element is visible
        });
        animatedElements.forEach(el => observer.observe(el));
    } else {
        // Fallback for older browsers
        animatedElements.forEach(el => {
            el.classList.add('is-visible');
        });
    }

    // --- Mobile Navigation (Placeholder) ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            alert("Mobile navigation to be implemented.");
        });
    }

    // --- Generic Modal Logic Function ---
    function initializeModal(cardSelector, modalOverlayId, modalCloseId, detailSelector) {
        const cards = document.querySelectorAll(cardSelector);
        const modalOverlay = document.getElementById(modalOverlayId);
        const modalCloseBtn = document.getElementById(modalCloseId);

        if (cards.length > 0 && modalOverlay) {
            const allDetails = modalOverlay.querySelectorAll(detailSelector);

            cards.forEach(card => {
                card.addEventListener('click', () => {
                    const dataId = card.dataset.doctor || card.dataset.member;
                    
                    allDetails.forEach(detail => detail.classList.remove('is-active'));

                    const activeDetail = modalOverlay.querySelector(`#${dataId}`);
                    if (activeDetail) activeDetail.classList.add('is-active');
                    
                    modalOverlay.classList.add('is-visible');
                    document.body.style.overflow = 'hidden'; // Prevent background scrolling
                });
            });

            const closeModal = () => {
                modalOverlay.classList.remove('is-visible');
                document.body.style.overflow = ''; // Restore background scrolling
            };

            modalCloseBtn.addEventListener('click', closeModal);
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) {
                    closeModal();
                }
            });
        }
    }

    // --- Initialize All Modals ---
    initializeModal('.doctor-card', 'doctor-modal-overlay', 'doctor-modal-close-btn', '.doctor-detail');
    initializeModal('.team-card', 'team-modal-overlay', 'team-modal-close-btn', '.member-detail');


    // --- FAQ Accordion Logic ---
    const faqQuestions = document.querySelectorAll('.faq-question');
    if(faqQuestions.length > 0) {
        faqQuestions.forEach(question => {
            question.addEventListener('click', () => {
                const answer = question.nextElementSibling;
                const isActive = question.classList.contains('active');
                
                // Optional: Close other accordions when one is opened
                // faqQuestions.forEach(q => {
                //     if (q !== question) {
                //         q.classList.remove('active');
                //         q.nextElementSibling.style.maxHeight = '0px';
                //     }
                // });

                question.classList.toggle('active');
                if (question.classList.contains('active')) {
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                } else {
                    answer.style.maxHeight = '0px';
                }
            });
        });
    }
});
