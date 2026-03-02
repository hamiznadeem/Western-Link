const body = document.querySelector('body');

  let lastScrollTop = 0;
  const header = document.getElementById('main-header');

  window.addEventListener('scroll', function() {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop && scrollTop > 100) {
      // Nichy scroll ho raha hai - Header ko chupa do
      header.style.transform = 'translateY(-100%)';
    } else {
      // Upar scroll ho raha hai - Header wapis lao
      header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Negative scrolling rokne ke liye
  }, false);


// Nav Mneu drawerOverlay 
const menuToggle = document.getElementById('menu-toggle');
const sideDrawer = document.getElementById('side-drawer');
const drawerOverlay = document.getElementById('drawer-overlay');
const menuIcon = document.getElementById('menu-icon');

menuToggle.addEventListener('click', () => {
    const isOpen = sideDrawer.classList.contains('translate-x-0');

    if (isOpen) {
        sideDrawer.classList.remove('translate-x-0');
        sideDrawer.classList.add('translate-x-full');
        drawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
        menuIcon.classList.replace('fa-times', 'fa-bars');
        body.classList.remove('overflow-hidden');
    } else {
        sideDrawer.classList.remove('translate-x-full');
        sideDrawer.classList.add('translate-x-0');
        drawerOverlay.classList.add('opacity-100', 'pointer-events-auto');
        menuIcon.classList.replace('fa-bars', 'fa-times');
        body.classList.add('overflow-hidden'); 
        
    }
});

// Close drawer when clicking overlay
drawerOverlay.addEventListener('click', () => {
    sideDrawer.classList.add('translate-x-full');
    drawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    menuIcon.classList.replace('fa-times', 'fa-bars');
    sideDrawer.classList.remove('translate-x-0');
    sideDrawer.classList.add('translate-x-full');
    body.classList.remove('overflow-hidden');
});

const servicesBtn = document.getElementById('mobile-services-btn');
const servicesMenu = document.getElementById('mobile-services-menu');
const servicesIcon = document.getElementById('services-icon');

servicesBtn.addEventListener('click', () => {
    // Check if menu is open
    const isOpen = servicesMenu.style.maxHeight !== '0px' && servicesMenu.style.maxHeight !== '';
    
    if (isOpen) {
        servicesMenu.style.maxHeight = '0px';
        servicesIcon.style.transform = 'rotate(0deg)';
    } else {
        // scrollHeight se dynamic height calculate karein
        servicesMenu.style.maxHeight = servicesMenu.scrollHeight + 'px';
        servicesIcon.style.transform = 'rotate(180deg)';
    }
});







let projectsSwiper;

function initSwiper() {
    if (projectsSwiper) {
        projectsSwiper.destroy(true, true);
        projectsSwiper = undefined;
    }

    const screenWidth = window.innerWidth;
    
    if (screenWidth < 1024) {
        projectsSwiper = new Swiper('.projectsSwiper', {
            observer: true,
            observeParents: true,
            slidesPerView: 1,
            spaceBetween: 20,
            centeredSlides: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            on: {
                init: function() {
                    updateCircularProgress(this);
                },
                slideChange: function() {
                    updateCircularProgress(this);
                }
            }
        });
    }
}





function filterProjects(category, btn) {
    // 1. Button Styling
    document.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('text-brand-light', 'bg-brand-accent/20');
        b.classList.add('text-brand-light/60');
    });
    btn.classList.add('bg-brand-accent/20', 'text-brand-light');
    btn.classList.remove( 'text-brand-light/60');

    const allSlides = document.querySelectorAll('.project-item');
    
    allSlides.forEach(slide => {
        if (slide.getAttribute('data-category') === category) {
            slide.classList.remove('hidden');
            slide.classList.add('swiper-slide');
            slide.style.display = 'block'; 
        } else {
            slide.classList.add('hidden');
            slide.classList.remove('swiper-slide');
            slide.style.display = 'none';
        }
    });

    setTimeout(() => {
        initSwiper();
    }, 50);
}

// Start-up settings
window.addEventListener('resize', initSwiper);
document.addEventListener('DOMContentLoaded', () => {
    // Default tab trigger
    const defaultTab = document.querySelector('.tab-btn');
    if(defaultTab) filterProjects('shopify', defaultTab);
});




    function updateCircularProgress(swiperInstance) {
    const circle = document.getElementById('progress-circle');
    const indexText = document.getElementById('current-index');
    const totalText = document.getElementById('total-slides');
    const total = swiperInstance.slides.length;
    const current = swiperInstance.realIndex + 1;
    const offset = 283 - (283 * current) / total;
    
    if(circle) circle.style.strokeDashoffset = offset;
    if(indexText) indexText.innerText = current.toString().padStart(2, '0');
    if(totalText) totalText.innerText = total.toString().padStart(2, '0');
}




const counters = document.querySelectorAll('.counter');
const speed = 50;

const startCount = (counter) => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 15);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if(entry.isIntersecting) {
            startCount(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));





gsap.registerPlugin(Draggable);

function setupOrbit(elementId, autoSpeed) {
    const orbit = document.getElementById(elementId);
    if (!orbit) return;

    const items = orbit.querySelectorAll('.skill-box');

    let orbitData = {
        rotation: 0,
        isDragging: false
    };

    // AUTO ROTATE
    gsap.ticker.add(() => {
        if (!orbitData.isDragging) {
            orbitData.rotation += autoSpeed;

            gsap.set(orbit, { rotation: orbitData.rotation });
            gsap.set(items, { rotation: -orbitData.rotation });
        }
    });

    Draggable.create(orbit, {
        type: "rotation",

        trigger: items, 

        onPress() {
            orbitData.isDragging = true;
        },

        onDrag() {
            orbitData.rotation = this.rotation;
            gsap.set(items, { rotation: -this.rotation });
        },

        onRelease() {
            orbitData.rotation = this.rotation;
            orbitData.isDragging = false;
        }
    });
}

setupOrbit("inner-orbit", 0.3);
setupOrbit("outer-orbit", 0.2);

window.addEventListener("load", () => {
   setupOrbit("inner-orbit", 0.3);
   setupOrbit("outer-orbit", 0.2);
});


function toggleFaq(element) {
    const content = element.querySelector('.faq-content');
    const arrowIcon = element.querySelector('.arrow-icon');

    // Close all other items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== element) {
            item.classList.remove('faq-active');
            item.querySelector('.faq-content').style.maxHeight = null;
            item.querySelector('.arrow-icon').classList.remove('rotate-180');
        }
    });

    // Toggle current item
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
        element.classList.remove('faq-active');
        arrowIcon.classList.remove('rotate-180');
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
        element.classList.add('faq-active');
        arrowIcon.classList.add('rotate-180');
    }
}



// --- Custom Cursor ---
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.5 });
});

// Expand cursor on interactive
document.querySelectorAll('a, button, h1, h2, h3, h4, h5, h6, span, i,img').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, { scale: 1.8});
        gsap.to(cursor, { scale: 0.5 });
        // follower.classList.add("bg-brand-accent/10")
        follower.classList.remove("bg-brand-accent")
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(follower, { scale: 1 });
        gsap.to(cursor, { scale: 1 });
        // follower.classList.remove("border-brand-primary")
        follower.classList.add("bg-brand-accent")
    });

    body.addEventListener("mouseenter",function(){
    gsap.to(follower,{
        scale:1,
        opacity:1,
        margin:0
    })
})
body.addEventListener("mouseleave",function(){
    gsap.to(follower,{
        scale:0,
        opacity:0
    })
})
});


gsap.registerPlugin(ScrollTrigger);

const marquee = document.querySelector(".animate-marquee-text");

if (marquee) {

    const scrollAmount = () => marquee.scrollWidth - window.innerWidth;

    gsap.to(marquee, {
        x: () => -scrollAmount(),
        ease: "none",
        scrollTrigger: {
            trigger: ".creative-powerhouse",
            start: "top 90%",
            end: () => "+=" + scrollAmount(),
            scrub: 2,
            invalidateOnRefresh: true
        }
    });

}

    document.addEventListener("DOMContentLoaded", function() {
        
        // --- Initialize Swiper ---
        var swiper = new Swiper(".mySwiper", {
            slidesPerView: "auto",
            centeredSlides: true,  // <--- IMPORTANT: Ye active card ko center karega
                    initialSlide: 2,
            spaceBetween: 10,
            freeMode: true,
            mousewheel: {
            enable: true,      
            forceToAxis: true,
            },
            keyboard :{
                enable: true,
            },
            breakpoints: {
                768: {
                    centeredSlides: false,
                    initialSlide: 0,
                    spaceBetween: 30
                }
            }
        });

        // --- Initialize GSAP ---
        // Register Plugin
        gsap.registerPlugin(ScrollTrigger);

        // Animation 1: Header Text Fade Up
        gsap.from(".section-header", {
            scrollTrigger: {
                trigger: ".why-section",
                start: "top 80%", // Jab section screen ke 80% par aaye
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });


    
    let pricingSwiper;

function initPricingSwiper() {
    const screenWidth = window.innerWidth;

    if (screenWidth < 1024) { // Mobile and Tablet
        if (!pricingSwiper) {
            pricingSwiper = new Swiper('.pricing-swiper', {
                effect: 'cards', // Aapne "Card wala swiper" manga tha
                grabCursor: true,
                initialSlide: 1,
                cardsEffect: {
                    perSlideOffset: 1, // Cards ke darmiyan gap
                    perSlideRotate: 6, // Rotate effect
                    slideShadows: true,
                    shadowOffset: 20,
                    shadowScale: 0.94,
                },
                on: {
    slideChange: function () {
        // Jo slide center mein aaye, uske andar ka radio button check kar do
        const activeSlide = this.slides[this.activeIndex];
        const radio = activeSlide.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
    },
},
            });
        }
    } else { // Desktop
        if (pricingSwiper) {
            pricingSwiper.destroy(true, true);
            pricingSwiper = undefined;
        }
    }
}


// Initialize on Load and Resize
window.addEventListener('load', initPricingSwiper);
window.addEventListener('resize', initPricingSwiper);

    // Load hone par aur resize hone par check karein
    window.addEventListener('load', initSwiper);
    window.addEventListener('resize', initSwiper);




gsap.registerPlugin(ScrollTrigger);

// Row 1: Left sy Right move hogi (scroll down par left jayegi)
gsap.to(".scroll-row-1", {
    xPercent: -50, // Adjust movement distance
    ease: "none",
    scrollTrigger: {
        trigger: "#feedback-section",
        start: "top bottom", 
        end: "bottom top",
        scrub: 2, // Smooth scrolling effect
    }
});

// Row 2: Right sy Left move hogi (scroll down par right jayegi)
gsap.to(".scroll-row-2", {
    xPercent: 50, // Opposite direction
    ease: "none",
    scrollTrigger: {
        trigger: "#feedback-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
    }
});