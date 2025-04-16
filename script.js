document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.skill-slider');
    
    sliders.forEach(slider => {
        slider.addEventListener('input', function() {
            const progress = this.parentElement.querySelector('.progress');
            progress.style.width = this.value + '%';
        });
    });

    // Rocket animation
    const rocket = document.querySelector('.rocket');
    const heroHeader = document.querySelector('.hero-header');
    const bounceTexts = document.querySelectorAll('.bounce-text');
    let headerBottom = heroHeader.offsetTop + heroHeader.offsetHeight;
    let animationStarted = false;

    function moveRocket() {
        const scrollPosition = window.scrollY;
        const headerHeight = heroHeader.offsetHeight;
        const headerWidth = heroHeader.offsetWidth;
        
        if (scrollPosition <= headerBottom) {
            // Calculate diagonal movement
            const progressY = (scrollPosition / headerHeight) * 100;
            const progressX = (scrollPosition / headerHeight) * 120;
            
            rocket.style.left = `${progressX}%`;
            rocket.style.top = `${progressY}%`;
            
            if (!animationStarted) {
                animationStarted = true;
            }

            // Check for text collision
            bounceTexts.forEach(text => {
                const textRect = text.getBoundingClientRect();
                const rocketRect = rocket.getBoundingClientRect();

                if (isColliding(rocketRect, textRect)) {
                    text.classList.add('bounce');
                    setTimeout(() => {
                        text.classList.remove('bounce');
                    }, 500);
                }
            });
        }
    }

    function isColliding(rect1, rect2) {
        return !(rect1.right < rect2.left || 
                rect1.left > rect2.right || 
                rect1.bottom < rect2.top || 
                rect1.top > rect2.bottom);
    }

    // Initial position
    rocket.style.left = '-100px';
    rocket.style.top = '0';
    
    // Add scroll event listener
    window.addEventListener('scroll', moveRocket);

    // Add resize event listener to update headerBottom
    window.addEventListener('resize', () => {
        headerBottom = heroHeader.offsetTop + heroHeader.offsetHeight;
    });
}); 