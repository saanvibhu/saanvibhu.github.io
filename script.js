// EmailJS Configuration
const EMAILJS_CONFIG = {
    PUBLIC_KEY: 'sdOnzPzGvVN-NEplm',
    SERVICE_ID: 'service_51232qo',
    TEMPLATE_ID: 'template_47hc238'
};

// Initialize EmailJS
(function() {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
})();

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Form submission handler with EmailJS
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const submitBtn = this.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnLoading = submitBtn.querySelector('.btn-loading');
        const formMessage = document.getElementById('form-message');
        
        // Show loading state
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        formMessage.style.display = 'none';
        
        // Send email using EmailJS
        emailjs.sendForm(
            EMAILJS_CONFIG.SERVICE_ID,
            EMAILJS_CONFIG.TEMPLATE_ID,
            this
        )
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            
            // Show success message
            formMessage.textContent = '✓ Thank you! Your message has been sent successfully. I\'ll get back to you soon!';
            formMessage.style.display = 'block';
            formMessage.style.background = '#dcfce7';
            formMessage.style.color = '#166534';
            formMessage.style.border = '1px solid #86efac';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
            
        }, function(error) {
            console.log('FAILED...', error);
            
            // Show error message
            formMessage.textContent = '✗ Oops! Something went wrong. Please try again or email me directly at saanvibhu13@gmail.com';
            formMessage.style.display = 'block';
            formMessage.style.background = '#fee2e2';
            formMessage.style.color = '#991b1b';
            formMessage.style.border = '1px solid #fca5a5';
        })
        .finally(function() {
            // Reset button state
            submitBtn.disabled = false;
            btnText.style.display = 'inline-block';
            btnLoading.style.display = 'none';
        });
    });
}

// Add animation on scroll for project cards
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all project cards
document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(card);
});

// Active navigation link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink?.classList.add('active');
        } else {
            navLink?.classList.remove('active');
        }
    });
});