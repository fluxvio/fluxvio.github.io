// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor Logic
const cursor = document.querySelector('.custom-cursor');
const cursorFollower = document.querySelector('.custom-cursor-follower');

let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;
let cursorX = mouseX;
let cursorY = mouseY;
let followerX = mouseX;
let followerY = mouseY;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Show cursors on first move
    cursor.style.opacity = '1';
    cursorFollower.style.opacity = '1';
});

// Animation loop for smooth follower effect
function loop() {
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    
    cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px)`;
    cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
    
    requestAnimationFrame(loop);
}
loop();

// Hover interactions for cursor
const hoverables = document.querySelectorAll('.hoverable-link, .hoverable-btn, .hoverable-card');
hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursorFollower.style.width = '60px';
        cursorFollower.style.height = '60px';
        cursorFollower.style.backgroundColor = 'rgba(255, 0, 229, 0.1)';
        cursorFollower.style.borderColor = '#FF00E5';
        
        if(el.classList.contains('hoverable-link') || el.classList.contains('hoverable-btn')){
            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(0.5)`;
        }
    });
    
    el.addEventListener('mouseleave', () => {
        cursorFollower.style.width = '40px';
        cursorFollower.style.height = '40px';
        cursorFollower.style.backgroundColor = 'transparent';
        cursorFollower.style.borderColor = '#00A6FF';
        cursor.style.transform = `translate(${cursorX - 8}px, ${cursorY - 8}px) scale(1)`;
    });
});

// Sticky Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('nav-scrolled');
    } else {
        navbar.classList.remove('nav-scrolled');
    }
});

// 3D Cube Rotation
const cube = document.querySelector('.cube');
if (cube) {
    gsap.to(cube, {
        rotateX: 360,
        rotateY: 360,
        duration: 20,
        repeat: -1,
        ease: "none"
    });
}

// Scroll Animations
// Hero Content
gsap.from('.hero-content > *', {
    y: 50,
    opacity: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power3.out",
    delay: 0.2
});

gsap.from('.hero-visuals', {
    scale: 0.8,
    opacity: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.5
});

// Service Cards animation removed to ensure visibility across all devices


// Section Headers
gsap.utils.toArray('.section-header').forEach(header => {
    gsap.from(header, {
        scrollTrigger: {
            trigger: header,
            start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });
});

// How It Works Steps
gsap.from('.step-card', {
    scrollTrigger: {
        trigger: '#how',
        start: 'top 80%',
    },
    y: 50,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: "power3.out"
});

// Animated Connecting Lines for Steps
ScrollTrigger.matchMedia({
    // Desktop layout
    "(min-width: 768px)": function() {
        gsap.to('.line-progress', {
            scrollTrigger: {
                trigger: '#how',
                start: 'top 50%',
                end: 'bottom 80%',
                scrub: 1
            },
            width: '100%',
            ease: "none"
        });
    },
    // Mobile layout
    "(max-width: 767px)": function() {
        gsap.to('.line-progress-mobile', {
            scrollTrigger: {
                trigger: '#how',
                start: 'top 60%',
                end: 'bottom 90%',
                scrub: 1
            },
            height: '100%',
            ease: "none"
        });
    }
});

// Footer Elements
gsap.from('.footer-info > *, .footer-links, .footer-contact', {
    scrollTrigger: {
        trigger: 'footer',
        start: 'top 90%',
    },
    y: 20,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: "power3.out"
});

// Formspree Interception & Notification
document.addEventListener('DOMContentLoaded', () => {
    // Notification UI System
    function showNotification(message, type = 'success') {
        const toast = document.createElement('div');
        toast.className = `fixed bottom-8 right-8 px-6 py-4 rounded-lg flex items-center gap-3 z-[10000] transform translate-y-20 opacity-0 transition-all duration-500 ease-out shadow-[0_0_20px_rgba(0,0,0,0.5)] border ${type === 'success' ? 'bg-surface border-primary' : 'bg-surface border-red-500'}`;
        
        const icon = document.createElement('div');
        if (type === 'success') {
            icon.innerHTML = '<svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>';
            toast.querySelector('.border-primary') && toast.classList.add('shadow-[0_0_15px_rgba(0,166,255,0.3)]');
        } else {
            icon.innerHTML = '<svg class="w-6 h-6 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>';
            toast.classList.add('shadow-[0_0_15px_rgba(239,68,68,0.3)]');
        }

        const text = document.createElement('span');
        text.className = 'text-white font-medium text-sm tracking-wide';
        text.innerText = message;

        toast.appendChild(icon);
        toast.appendChild(text);
        document.body.appendChild(toast);

        // Animate In
        requestAnimationFrame(() => {
            toast.classList.remove('translate-y-20', 'opacity-0');
        });

        // Animate Out & Remove
        setTimeout(() => {
            toast.classList.add('translate-y-20', 'opacity-0');
            setTimeout(() => {
                toast.remove();
            }, 500);
        }, 4000);
    }

    const forms = document.querySelectorAll('form[action^="https://formspree.io"]');
    
    forms.forEach(form => {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const action = form.getAttribute('action');
            if (!action) return;

            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            const originalClasses = submitBtn.className;
            
            // Loading State
            submitBtn.innerText = 'Sending...';
            submitBtn.classList.add('opacity-75', 'cursor-wait');

            const formData = new FormData(form);

            try {
                const response = await fetch(action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    form.reset();
                    showNotification('Request dispatched successfully. Our team will be in touch.', 'success');
                } else {
                    const data = await response.json();
                    if (Object.hasOwn(data, 'errors')) {
                        showNotification(data["errors"].map(error => error["message"]).join(", "), 'error');
                    } else {
                        showNotification('Oops! There was a problem submitting your form.', 'error');
                    }
                }
            } catch (error) {
                showNotification('Oops! There was a problem submitting your form.', 'error');
            } finally {
                // Restore button state
                submitBtn.innerText = originalText;
                submitBtn.className = originalClasses;
            }
        });
    });
});

