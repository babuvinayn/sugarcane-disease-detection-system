document.addEventListener('DOMContentLoaded', () => {
    // Intercept all clicks on links with class 'nav-link'
    document.querySelectorAll('.nav-link, a[href]').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Only animate for internal relative links OR specific auth/dashboard paths
            if (href && (href.startsWith('/') || href.includes(window.location.host))) {
                if (href === '#' || href.startsWith('javascript:')) return;
                
                e.preventDefault();
                
                const transitionWrapper = document.querySelector('.page-transition');
                if (transitionWrapper) {
                    transitionWrapper.style.transition = 'all 0.35s ease';
                    transitionWrapper.style.opacity = '0';
                    transitionWrapper.style.transform = 'translateX(-40px)';
                    
                    setTimeout(() => {
                        window.location.href = href;
                    }, 350);
                } else {
                    window.location.href = href;
                }
            }
        });
    });
});
