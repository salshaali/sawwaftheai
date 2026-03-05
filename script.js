document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing once revealed if you only want it to happen once
                // observer.unobserve(entry.target); 
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => scrollObserver.observe(el));

    // 2. Smooth Scrolling for Navigation Links
    const navLinks = document.querySelectorAll('.nav-links a, .hero-buttons a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            // Only apply to hash links
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // 3. Terms & Conditions Modal Logic (Removed - Now using separate pages)


    // 4. Parallax effect for Background Shapes (Subtle)
    window.addEventListener('mousemove', (e) => {
        const shapes = document.querySelectorAll('.bg-shape');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        shapes.forEach((shape, index) => {
            const speed = (index + 1) * 20;
            const moveX = (window.innerWidth / 2 - e.clientX) * (speed / 1000);
            const moveY = (window.innerHeight / 2 - e.clientY) * (speed / 1000);

            // shape.style.transform = `translate(${moveX}px, ${moveY}px)`;
        });
    });

    // 5. Video Play/Pause Logic & Interactive Overlay
    const welcomeVideo = document.getElementById('welcome-video');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playMeOverlay = document.getElementById('playMeOverlay');
    const videoControls = document.getElementById('videoControls');

    if (welcomeVideo && playPauseBtn && playMeOverlay && videoControls) {

        // Function to start the video and hide the overlay
        const startVideo = () => {
            welcomeVideo.play().then(() => {
                playMeOverlay.classList.add('hidden');
                videoControls.style.opacity = '1';
                videoControls.style.pointerEvents = 'auto';
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            }).catch(e => {
                console.error("Autoplay prevented:", e);
            });
        };

        // First click on the overlay initiates playback with sound
        playMeOverlay.addEventListener('click', startVideo);

        const togglePlay = () => {
            if (welcomeVideo.paused) {
                welcomeVideo.play();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            } else {
                welcomeVideo.pause();
                playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
            }
        };

        playPauseBtn.addEventListener('click', togglePlay);
        welcomeVideo.addEventListener('click', () => {
            // Only toggle if the overlay is hidden (i.e. already started)
            if (playMeOverlay.classList.contains('hidden')) {
                togglePlay();
            } else {
                startVideo();
            }
        });

        // Show "Play Again" overlay when video ends
        welcomeVideo.addEventListener('ended', () => {
            playMeOverlay.classList.remove('hidden');
            const playText = playMeOverlay.querySelector('.play-text');
            if (playText) playText.textContent = 'Play Again';
            const playIcon = playMeOverlay.querySelector('.play-arrow i');
            if (playIcon) playIcon.className = 'fa-solid fa-rotate-right';

            videoControls.style.opacity = '0';
            videoControls.style.pointerEvents = 'none';
        });
    }

    // 6. Navigation Scroll Transition
    const navWrapper = document.querySelector('.nav-wrapper');
    if (navWrapper) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navWrapper.classList.add('scrolled');
            } else {
                navWrapper.classList.remove('scrolled');
            }
        });
    }

    // 7. Mobile Navigation Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navLinksContainer = document.getElementById('nav-links');
    const navItemsList = document.querySelectorAll('.nav-links a');

    if (mobileMenuBtn && navLinksContainer) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Toggle icon
            const icon = mobileMenuBtn.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when a link is clicked
        navItemsList.forEach(item => {
            item.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = mobileMenuBtn.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 9. Contact Modal Logic
    const openContactModalBtns = document.querySelectorAll('.open-contact-modal');
    const closeContactModalBtn = document.getElementById('closeContactModalBtn');
    const contactModal = document.getElementById('contactModal');
    const contactForm = document.getElementById('contactForm');

    if (openContactModalBtns.length > 0 && closeContactModalBtn && contactModal && contactForm) {

        const openModal = () => {
            contactModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scrolling
        };

        const closeModal = () => {
            contactModal.classList.remove('active');
            document.body.style.overflow = '';
        };

        openContactModalBtns.forEach(btn => {
            btn.addEventListener('click', openModal);
        });

        closeContactModalBtn.addEventListener('click', closeModal);

        // Close on outside click
        contactModal.addEventListener('click', (e) => {
            if (e.target === contactModal) {
                closeModal();
            }
        });

        // Handle Formspree AJAX submission
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            // Set Loading state
            submitBtn.innerHTML = 'Sending <i class="fa-solid fa-spinner fa-spin" style="margin-left: 8px;"></i>';
            submitBtn.disabled = true;

            const formData = new FormData(contactForm);

            try {
                const response = await fetch('https://formspree.io/f/mqeyzwor', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success UI Feedback
                    submitBtn.innerHTML = 'Message Sent <i class="fa-solid fa-check" style="margin-left: 8px;"></i>';
                    submitBtn.style.background = '#0f9d58';
                    contactForm.reset();

                    // Close modal after a short delay
                    setTimeout(() => {
                        closeModal();
                        // Reset button for next time
                        setTimeout(() => {
                            submitBtn.innerHTML = originalBtnText;
                            submitBtn.style.background = '';
                            submitBtn.disabled = false;
                        }, 500);
                    }, 2000);
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error("Submission Error:", error);
                submitBtn.innerHTML = 'Error. Try Again?';
                submitBtn.style.background = '#ea4335';
                submitBtn.disabled = false;

                setTimeout(() => {
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.style.background = '';
                }, 3000);
            }
        });
    }

    // 10. Scramble Text Animation
    const scrambleElements = document.querySelectorAll('.scramble-text');
    const scrambleObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const fx = new TextScramble(el);
                const text = el.getAttribute('data-text');

                // Initialize with some abstract characters before revealing the real text
                el.innerText = '00000000'.substring(0, text.length);

                fx.setText(text);
                observer.unobserve(el);
            }
        });
    }, observerOptions);

    scrambleElements.forEach(el => scrambleObserver.observe(el));
});

// TextScramble Utility Class
class TextScramble {
    constructor(el) {
        this.el = el;
        this.chars = '!<>-_\\\\/[]{}—=+*^?#________1234567890';
        this.update = this.update.bind(this);
    }

    setText(newText) {
        const oldText = this.el.innerText;
        const length = Math.max(oldText.length, newText.length);
        const promise = new Promise((resolve) => this.resolve = resolve);
        this.queue = [];
        for (let i = 0; i < length; i++) {
            const from = oldText[i] || '';
            const to = newText[i] || '';
            const start = Math.floor(Math.random() * 40);
            const end = start + Math.floor(Math.random() * 40);
            this.queue.push({ from, to, start, end });
        }
        cancelAnimationFrame(this.frameRequest);
        this.frame = 0;
        this.update();
        return promise;
    }

    update() {
        let output = '';
        let complete = 0;
        for (let i = 0, n = this.queue.length; i < n; i++) {
            let { from, to, start, end, char } = this.queue[i];
            if (this.frame >= end) {
                complete++;
                output += to;
            } else if (this.frame >= start) {
                if (!char || Math.random() < 0.28) {
                    char = this.randomChar();
                    this.queue[i].char = char;
                }
                output += `<span class="dud">${char}</span>`;
            } else {
                output += from;
            }
        }
        this.el.innerHTML = output;
        if (complete === this.queue.length) {
            this.resolve();
        } else {
            this.frameRequest = requestAnimationFrame(this.update);
            this.frame++;
        }
    }

    randomChar() {
        return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
}
