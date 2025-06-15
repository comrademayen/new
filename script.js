// Interactive Cursor Light
const cursorLight = document.getElementById('cursor-light');
document.addEventListener('mousemove', (e) => {
    cursorLight.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
});

// Mobile Menu Toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
         mobileMenu.classList.add('hidden');
    }
});

// Close mobile menu when a link is clicked
const mobileMenuLinks = document.querySelectorAll('#mobile-menu a, #header nav a');
mobileMenuLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(el => {
    observer.observe(el);
});

// Back to Top Button Logic
const backToTopButton = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Services List Interaction
const serviceList = document.querySelector('#services .service-list');
if (serviceList) {
    const serviceItems = serviceList.querySelectorAll('li');
    const setIndex = (event) => {
        const closest = event.target.closest('li');
        if (closest) {
            const index = [...serviceItems].indexOf(closest);
            const cols = new Array(serviceItems.length)
                .fill('1fr')
                .map((val, i) => (index === i ? '10fr' : val))
                .join(' ');

            serviceItems.forEach((item, i) => {
                item.dataset.active = (index === i).toString();
            });
            
            serviceList.style.setProperty('grid-template-columns', cols);
        }
    };
    
    const resync = () => {
        const w = Math.max(...[...serviceItems].map(i => i.offsetWidth));
        serviceList.style.setProperty('--article-width', w);
    };

    serviceList.addEventListener('pointermove', setIndex);
    window.addEventListener('resize', resync);
    resync();
}