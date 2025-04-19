
function createSnowflakes() {
    const snowContainer = document.querySelector('.snow');
    const snowflakeCount = 50;
    
    for(let i = 0; i < snowflakeCount; i++) {
        const snowflake = document.createElement('div');
        snowflake.classList.add('snowflake');
        
        // Random positioning
        snowflake.style.left = `${Math.random() * 100}%`;
        snowflake.style.opacity = Math.random();
        snowflake.style.width = `${Math.random() * 5 + 2}px`;
        snowflake.style.height = snowflake.style.width;
        
        // Random animation duration
        const animationDuration = Math.random() * 10 + 5;
        snowflake.style.animation = `fall ${animationDuration}s linear infinite`;
        snowflake.style.animationDelay = `${Math.random() * 5}s`;
        
        snowContainer.appendChild(snowflake);
    }
}

// Typing animation
function typeWriter() {
    const roles = ["Web Developer", "UI/UX Designer", "Frontend Expert", "Full-Stack Developer"];
    const roleElement = document.getElementById('role');
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function type() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            roleElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            roleElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }
        
        if (!isDeleting && charIndex === currentRole.length) {
            isDeleting = true;
            typingSpeed = 1000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
        }
        
        setTimeout(type, typingSpeed);
    }
    
    type();
}

// Page navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('[data-page]');
    const pages = document.querySelectorAll('.page');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetPage = this.getAttribute('data-page');
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(navLink => {
                navLink.classList.remove('active-page');
                if (navLink.getAttribute('data-page') === targetPage) {
                    navLink.classList.add('active-page');
                }
            });
            
            // Show target page, hide others
            pages.forEach(page => {
                page.classList.add('hidden');
                page.classList.remove('active');
            });
            
            const currentPage = document.getElementById(targetPage);
            currentPage.classList.remove('hidden');
            
            // Add slight delay for animation
            setTimeout(() => {
                currentPage.classList.add('active');
            }, 10);
            
            // Close mobile menu if open
            document.querySelector('.mobile-menu').classList.remove('active');
        });
    });
}

// Project filtering
function setupProjectFilters() {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active', 'bg-pink-500', 'text-white'));
            this.classList.add('active', 'bg-pink-500', 'text-white');
            
            // Filter projects
            projectCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// Project modal
function setupProjectModal() {
    const viewButtons = document.querySelectorAll('.view-project-btn');
    const modal = document.getElementById('project-modal');
    const modalContent = document.getElementById('modal-content');
    const closeModal = document.getElementById('close-modal');
    
    // Project details data
    const projectDetails = {
        '1': {
            title: 'E-commerce Platform',
            images: ['/api/placeholder/800/500', '/api/placeholder/800/500'],
            description: 'A comprehensive e-commerce solution built with React and Node.js. Features include user authentication, product catalog, shopping cart, payment processing, and admin dashboard for inventory management.',
            features: ['User registration and profiles', 'Product search and filtering', 'Shopping cart and checkout', 'Payment gateway integration', 'Order tracking', 'Admin dashboard'],
            technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Redux', 'Stripe API', 'AWS S3'],
            challenge: 'The main challenge was creating a secure and scalable payment processing system while ensuring a smooth user experience throughout the checkout process.',
            solution: 'Implemented a microservices architecture for better scalability and used Redis for caching frequently accessed data to improve performance.',
            github: '',
            demo: '#'
        },
        // Other project details...
        '2': {
            title: 'Portfolio Website',
            images: ['/api/placeholder/800/500', '/api/placeholder/800/500'],
            description: 'A responsive portfolio website showcasing my work and skills. Features smooth animations, dark theme, and dynamic content loading.',
            features: ['Responsive design', 'Animated transitions', 'Project filtering', 'Contact form', 'Dynamic theme switching'],
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'GSAP', 'FormSpree'],
            challenge: 'Creating a visually appealing design that works seamlessly across all devices while maintaining fast load times.',
            solution: 'Utilized modern CSS features like Grid and Flexbox for layouts, and implemented lazy loading for images to improve performance.',
            github: '#',
            demo: '#'
        },
        '3': {
            title: 'Weather App',
            images: ['/api/placeholder/800/500', '/api/placeholder/800/500'],
            description: 'A weather forecasting application that provides real-time weather updates based on user location or search. Features include hourly and 7-day forecasts, radar maps, and weather alerts.',
            features: ['Geolocation detection', 'Search by city/ZIP', '7-day forecast', 'Weather maps', 'Temperature units toggle'],
            technologies: ['React', 'OpenWeatherMap API', 'Mapbox', 'Tailwind CSS', 'localStorage'],
            challenge: 'Handling API rate limits and ensuring accurate weather data across different geographical locations.',
            solution: 'Implemented smart caching mechanisms and fallback options when primary API calls fail or reach rate limits.',
            github: '#',
            demo: '#'
        }
    };
    
    viewButtons.forEach(button => {
        button.addEventListener('click', function() {
            const projectId = this.getAttribute('data-project');
            const project = projectDetails[projectId];
            
            if (project) {
                let html = `
                    <div class="project-modal-content">
                        <h3 class="text-2xl font-bold mb-4 gradient-text">${project.title}</h3>
                        
                        <div class="mb-6 relative overflow-hidden rounded-lg">
                            <img src="${project.images[0]}" alt="${project.title}" class="w-full">
                        </div>
                        
                        <div class="mb-6">
                            <h4 class="text-xl font-bold mb-2">Description</h4>
                            <p>${project.description}</p>
                        </div>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <div>
                                <h4 class="text-xl font-bold mb-2">Features</h4>
                                <ul class="list-disc pl-5 space-y-1">
                                    ${project.features.map(feature => `<li>${feature}</li>`).join('')}
                                </ul>
                            </div>
                            
                            <div>
                                <h4 class="text-xl font-bold mb-2">Technologies Used</h4>
                                <div class="flex flex-wrap gap-2">
                                    ${project.technologies.map(tech => `
                                        <span class="px-2 py-1 bg-pink-900 bg-opacity-50 rounded text-xs">${tech}</span>
                                    `).join('')}
                                </div>
                            </div>
                        </div>
                        
                        <div class="mb-6">
                            <h4 class="text-xl font-bold mb-2">Challenge & Solution</h4>
                            <p class="mb-2"><strong>Challenge:</strong> ${project.challenge}</p>
                            <p><strong>Solution:</strong> ${project.solution}</p>
                        </div>
                        
                        <div class="flex space-x-4">
                            <a href="${project.github}" class="bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white px-4 py-2 rounded">View Code</a>
                            <a href="${project.demo}" class="bg-transparent border border-pink-500 text-pink-500 hover:bg-pink-500 hover:text-white px-4 py-2 rounded transition-colors duration-300">Live Demo</a>
                        </div>
                    </div>
                `;
                
                modalContent.innerHTML = html;
                modal.classList.remove('hidden');
            }
        });
    });
    
    closeModal.addEventListener('click', function() {
        modal.classList.add('hidden');
    });
    
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });
}

// Mobile menu
function setupMobileMenu() {
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    
    menuToggle.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
    });
}

// Contact form
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const notification = document.querySelector('.message-notification');
    const messageText = document.querySelector('.message-text');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulate form submission
        messageText.textContent = "Thank you for your message! I'll get back to you soon.";
        notification.classList.add('show');
        
        // Hide notification after 5 seconds
        setTimeout(() => {
            notification.classList.remove('show');
        }, 5000);
        
        // Reset form
        contactForm.reset();
    });
}

// Loading screen
function handleLoading() {
    const loadingScreen = document.querySelector('.loading-screen');
    
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
        }, 1500);
    });
}

// Initialize all functions
document.addEventListener('DOMContentLoaded', function() {
    createSnowflakes();
    typeWriter();
    setupNavigation();
    setupProjectFilters();
    setupProjectModal();
    setupMobileMenu();
    setupContactForm();
    handleLoading();
    
    // Show welcome notification after 3 seconds
    setTimeout(() => {
        document.querySelector('.message-notification').classList.add('show');
        
        // Hide after 5 seconds
        setTimeout(() => {
            document.querySelector('.message-notification').classList.remove('show');
        }, 5000);
    }, 3000);
});