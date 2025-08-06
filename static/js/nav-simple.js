// Simple navigation injection without fetch (for file:// protocol compatibility)
function createNavigation() {
    console.log('Creating navigation directly...');
    
    const currentPath = window.location.pathname;
    const isInPagesFolder = currentPath.includes('/pages/');
    const basePath = isInPagesFolder ? '../' : './';
    const pagesPath = isInPagesFolder ? './' : './pages/';
    
    // Determine active page
    let activePage = 'home';
    if (currentPath.includes('projects.html')) activePage = 'projects';
    else if (currentPath.includes('resume.html')) activePage = 'resume';
    else if (currentPath.includes('contact.html')) activePage = 'contact';
    
    // Navigation styles
    const navStyles = `
        <style data-nav-styles="true">
        /* Navigation Styles */
        .navbar {
            backdrop-filter: blur(10px);
            background-color: rgba(33, 37, 41, 0.95) !important;
            transition: all 0.3s ease;
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .navbar-brand {
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: 1px;
            transition: all 0.3s ease;
            color: #fff !important;
        }
        
        .navbar-brand:hover {
            transform: scale(1.05);
            color: #8b5cf6 !important;
        }
        
        .navbar-nav .nav-link {
            transition: all 0.3s ease;
            position: relative;
            font-weight: 500;
            color: #fff !important;
            margin: 0 5px;
            padding: 10px 15px !important;
        }
        
        .navbar-nav .nav-link::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, #6366f1, #8b5cf6);
            transition: width 0.3s ease;
        }
        
        .navbar-nav .nav-link:hover,
        .navbar-nav .nav-link:focus {
            color: #8b5cf6 !important;
        }
        
        .navbar-nav .nav-link:hover::after,
        .navbar-nav .nav-link.active::after {
            width: 80%;
        }
        
        .navbar-nav .nav-link.active {
            color: #8b5cf6 !important;
            font-weight: 600;
        }
        
        .navbar-toggler {
            border: none;
            padding: 4px 8px;
        }
        
        .navbar-toggler:focus {
            box-shadow: none;
        }
        
        .navbar-toggler-icon {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%2833, 37, 41, 0.75%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
            filter: invert(1);
        }
        
        /* Animation for mobile menu */
        @media (max-width: 991.98px) {
            .navbar-collapse {
                background: rgba(33, 37, 41, 0.98);
                border-radius: 10px;
                margin-top: 10px;
                padding: 20px;
                border: 1px solid rgba(255, 255, 255, 0.1);
            }
            
            .navbar-nav .nav-link {
                text-align: center;
                margin: 5px 0;
                border-radius: 8px;
                transition: all 0.3s ease;
            }
            
            .navbar-nav .nav-link:hover {
                background: rgba(139, 92, 246, 0.1);
            }
        }
        </style>
    `;
    
    // Navigation HTML
    const navHTML = `
        <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
            <div class="container">
                <a class="navbar-brand" href="${basePath}index.html">VARUN K S</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNav">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'home' ? 'active' : ''}" href="${basePath}index.html">Home</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#about">About</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#skills">Skills</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="${basePath}index.html#education">Education</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'projects' ? 'active' : ''}" href="${pagesPath}projects.html">Projects</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'resume' ? 'active' : ''}" href="${pagesPath}resume.html">Resume</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link ${activePage === 'contact' ? 'active' : ''}" href="${pagesPath}contact.html">Contact</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    `;
    
    // Inject styles if not already present
    if (!document.querySelector('style[data-nav-styles]')) {
        document.head.insertAdjacentHTML('beforeend', navStyles);
        console.log('Navigation styles injected');
    }
    
    // Inject navigation HTML
    const navContainer = document.getElementById('navigation-container');
    if (navContainer) {
        navContainer.innerHTML = navHTML;
        console.log('Navigation HTML injected');
        
        // Initialize Bootstrap collapse functionality after a brief delay
        setTimeout(() => {
            if (typeof window.bootstrap !== 'undefined' && window.bootstrap.Collapse) {
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse) {
                    // Initialize the collapse component
                    new window.bootstrap.Collapse(navbarCollapse, { toggle: false });
                    console.log('Bootstrap navbar initialized');
                }
            } else {
                console.log('Bootstrap not found, navbar will use basic functionality');
            }
        }, 200);
    } else {
        console.error('Navigation container not found');
    }
}

// Load navigation when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, creating navigation');
    // Small delay to ensure Bootstrap is loaded
    setTimeout(createNavigation, 100);
});
