// ===================================
// SMOOTH SCROLL & INTERSECTION OBSERVER
// ===================================

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate progress bars when they come into view
            if (entry.target.classList.contains('tech-item')) {
                const progressFill = entry.target.querySelector('.progress-fill');
                if (progressFill) {
                    const width = progressFill.style.width;
                    progressFill.style.width = '0';
                    setTimeout(() => {
                        progressFill.style.width = width;
                    }, 100);
                }
            }
        }
    });
}, observerOptions);

// Observe all sections and cards
document.addEventListener('DOMContentLoaded', () => {
    // Set initial state for animated elements
    const animatedElements = document.querySelectorAll(
        '.expertise-category, .app-card, .process-card, .skill-card, .tech-item'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
    
    // Animate stats counter
    animateStats();
    
    // Add hover effects to cards
    addCardEffects();
});

// ===================================
// STATS COUNTER ANIMATION
// ===================================
function animateStats() {
    const stats = document.querySelectorAll('.hero-stat-number');
    
    stats.forEach(stat => {
        const text = stat.textContent;
        const hasPlus = text.includes('+');
        const hasK = text.includes('M') || text.includes('K'); // Updated to check for M as well
        const number = parseFloat(text.replace(/[^0-9.]/g, ''));
        
        if (!isNaN(number)) {
            animateValue(stat, 0, number, 2000, hasK, hasPlus, text.includes('M'));
        }
    });
}

function animateValue(element, start, end, duration, hasK, hasPlus, hasM) {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end;
            clearInterval(timer);
        }
        
        let displayValue = Math.floor(current);
        if (hasM) {
            displayValue = displayValue + 'M';
        } else if (hasK) {
            displayValue = displayValue + 'K';
        }
        
        if (hasPlus) {
            displayValue = displayValue + '+';
        }
        
        element.textContent = displayValue;
    }, 16);
}

// ===================================
// CARD HOVER EFFECTS
// ===================================
function addCardEffects() {
    const cards = document.querySelectorAll('.app-card, .skill-card, .process-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
}

// ===================================
// PROGRESS BAR ANIMATION ON SCROLL
// ===================================
const progressBars = document.querySelectorAll('.progress-fill');
const progressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const bar = entry.target;
            const width = bar.style.width;
            bar.style.width = '0';
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
            progressObserver.unobserve(bar);
        }
    });
}, { threshold: 0.5 });

progressBars.forEach(bar => progressObserver.observe(bar));

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
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

// ===================================
// CURSOR GLOW EFFECT (OPTIONAL)
// ===================================
function addCursorGlow() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-glow';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(102, 126, 234, 0.3) 0%, transparent 70%);
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.1s ease;
        transform: translate(-50%, -50%);
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
}

// Uncomment to enable cursor glow effect
// addCursorGlow();

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================
// Debounce function for scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Optimize scroll events
const optimizedScroll = debounce(() => {
    // Add any scroll-based animations here
}, 10);

window.addEventListener('scroll', optimizedScroll);

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================
// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
        document.body.classList.add('keyboard-nav');
    }
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// ===================================
// CONSOLE MESSAGE
// ===================================
console.log('%c👋 Welcome to my portfolio!', 'font-size: 20px; font-weight: bold; color: #667eea;');
console.log('%cInterested in the code? Check out the repository!', 'font-size: 14px; color: #b4b4c8;');

// ===================================
// PROJECT MODAL & DATA
// ===================================

const projects = {
    biadjo: {
        title: "Biadjo App",
        description: "Biadjo is a ride-hailing application designed specifically for Libyan citizens, similar to Uber. The app allows users to book taxis and cars, choose their destinations, and get real-time updates. It features a comprehensive driver verification system where drivers must upload their car images, driver's license, and personal information to ensure safety and authenticity. Built with Flutter for mobile, Node.js for backend, and Firebase Cloud Messaging for real-time notifications.",
        images: [
            "Biadjo App/0.png",
            "Biadjo App/1.png",
            "Biadjo App/2.png",
            "Biadjo App/3.png",
            "Biadjo App/4.png",
            "Biadjo App/5.png",
            "Biadjo App/6.png",
            "Biadjo App/7.png",
            "Biadjo App/8.png",
            "Biadjo App/9.png",
            "Biadjo App/10.png",
            "Biadjo App/11.png",
            "Biadjo App/12.png",
            "Biadjo App/13.png",
            "Biadjo App/14.png",
            "Biadjo App/15.png",
            "Biadjo App/16.png",
            "Biadjo App/17.png",
            "Biadjo App/18.png",
            "Biadjo App/19.png",
            "Biadjo App/20.png",
            "Biadjo App/21.png",
            "Biadjo App/22.png",
            "Biadjo App/23.png",
            "Biadjo App/24.png"
        ]
    },
    matchify: {
        title: "Matchify",
        description: "Matchify is a comprehensive talent marketplace app similar to Upwork and LinkedIn. It connects talents with recruiters, leveraging AI to analyze profiles and generate tailored proposals. Key features include mission posting, AI-driven matchmaking, and real-time chat.",
        images: [
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.53.33.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.53.37.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.53.41.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.53.46.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.54.00.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.54.28.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.54.34.png",
            "MatchiFy App/Simulator Screenshot - iPhone 17 Pro - 2025-12-05 at 18.54.41.png"
        ]
    },
    runway: {
        title: "Runway",
        description: "Runway is a feature-rich e-commerce application developed with Flutter and Firebase. It offers a seamless shopping experience with real-time product updates, user authentication, and a secure checkout process.",
        images: [
            "RunWay/Screenshot_1765013860.png",
            "RunWay/Screenshot_1765013863.png",
            "RunWay/Screenshot_1765013869.png",
            "RunWay/Screenshot_1765013884.png",
            "RunWay/Screenshot_1765013908.png",
            "RunWay/Screenshot_1765013935.png"
        ]
    },
    coffe: {
        title: "Coffe App",
        description: "A beautifully designed coffee discovery app built with Flutter. It showcases a modern, minimalist UI/UX that allows users to explore different coffee blends, view details, and enjoy a smooth ordering flow.",
        images: [
            "coffe App/Screenshot_1765012976.png",
            "coffe App/Screenshot_1765013037.png",
            "coffe App/Screenshot_1765013043.png",
            "coffe App/Screenshot_1765013046.png",
            "coffe App/Screenshot_1765013062.png",
            "coffe App/Screenshot_1765013079.png",
            "coffe App/Screenshot_1765013089.png"
        ]
    },
    studymate: {
        title: "StudyMate",
        description: "An educational platform designed for professors and students. Professors can upload course recordings, which are processed using Python for speech-to-text functionality, allowing students to listen or read the content. The app features an AI-powered chatbot for student queries and integrated Firebase Cloud Messaging for real-time notifications. Built with Flutter.",
        images: [
            "StudyMate/Screenshot_1753459020.png",
            "StudyMate/Screenshot_1753459024.png",
            "StudyMate/Screenshot_1753459027.png",
            "StudyMate/Screenshot_1753459031.png",
            "StudyMate/Screenshot_1753459036.png",
            "StudyMate/Screenshot_1753459038.png",
            "StudyMate/Screenshot_1753459043.png",
            "StudyMate/Screenshot_1753459047.png",
            "StudyMate/Screenshot_1753459049.png",
            "StudyMate/Screenshot_1753459055.png",
            "StudyMate/Screenshot_1753459058.png",
            "StudyMate/Screenshot_1753459070.png",
            "StudyMate/Screenshot_1753459077.png",
            "StudyMate/Screenshot_1753459080.png",
            "StudyMate/Screenshot_1753459084.png",
            "StudyMate/Screenshot_1753459086.png",
            "StudyMate/Screenshot_1753459090.png",
            "StudyMate/Screenshot_1753459092.png",
            "StudyMate/Screenshot_1753459096.png",
            "StudyMate/Screenshot_1753459118.png",
            "StudyMate/Screenshot_1753459120.png",
            "StudyMate/Screenshot_1753459140.png",
            "StudyMate/Screenshot_1753459312.png",
            "StudyMate/Screenshot_1753459792.png",
            "StudyMate/Screenshot_1753460100.png",
            "StudyMate/Screenshot_1753461440.png",
            "StudyMate/Screenshot_1753461488.png"
        ]
    }
};

const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.getElementsByClassName("close-modal")[0];

function openModal(projectId) {
    const project = projects[projectId];
    if (!project) return;

    // Generate Gallery HTML with URL-encoded image paths
    const galleryHtml = project.images.map(img => {
        const encodedImg = encodeURI(img);
        return `
        <div class="gallery-item" onclick="viewImage('${encodedImg}')">
            <img src="${encodedImg}" alt="${project.title} Screenshot" class="gallery-img">
        </div>
    `;
    }).join('');

    modalBody.innerHTML = `
        <div class="modal-header">
            <h2 class="modal-title">${project.title}</h2>
            <p class="modal-desc">${project.description}</p>
        </div>
        <div class="gallery-grid">
            ${galleryHtml}
        </div>
    `;

    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling behind modal
}

// Close Modal Logic
closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Optional: Simple Lightbox for larger view (reusing the modal could cover this, but simple 'viewImage' placeholder for now)
function viewImage(imgSrc) {
    window.open(imgSrc, '_blank');
}

