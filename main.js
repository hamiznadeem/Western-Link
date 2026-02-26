
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
    } else {
        sideDrawer.classList.remove('translate-x-full');
        sideDrawer.classList.add('translate-x-0');
        drawerOverlay.classList.add('opacity-100', 'pointer-events-auto');
        menuIcon.classList.replace('fa-bars', 'fa-times');
    }
});

// Close drawer when clicking overlay
drawerOverlay.addEventListener('click', () => {
    sideDrawer.classList.add('translate-x-full');
    drawerOverlay.classList.remove('opacity-100', 'pointer-events-auto');
    menuIcon.classList.replace('fa-times', 'fa-bars');
    sideDrawer.classList.remove('translate-x-0');
    sideDrawer.classList.add('translate-x-full');
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
const body = document.querySelector('body');
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

window.addEventListener('mousemove', (e) => {
    gsap.to(cursor, { x: e.clientX, y: e.clientY, duration: 0 });
    gsap.to(follower, { x: e.clientX - 20, y: e.clientY - 20, duration: 0.5 });
});


// Expand cursor on interactive
document.querySelectorAll('a, button, h1, h2, h3, h4, h5, h6, span, i').forEach(el => {
    el.addEventListener('mouseenter', () => {
        gsap.to(follower, { scale: 1.8, borderColor: '#60a5fa' });
        gsap.to(cursor, { scale: 0.5 });
        follower.classList.remove("bg-brand-accent")
    });
    el.addEventListener('mouseleave', () => {
        gsap.to(follower, { scale: 1, borderColor: 'rgba(96,165,250,0.4)' });
        gsap.to(cursor, { scale: 1 });
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

    let swiper;

    function initSwiper() {
        const screenWidth = window.innerWidth;

        // Agar screen 1024px se choti hai (Mobile/Tablet) aur swiper nahi bana
        if (screenWidth < 1024) {
            if (!swiper) {
                swiper = new Swiper('.projectsSwiper', {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    grabCursor: true,
                    loop: true,
                    autoplay: {
                        delay: 3500,
                        disableOnInteraction: false,
                    },
                    pagination: {
                        el: ".swiper-pagination",
                        clickable: true,
                    },
                    breakpoints: {
                        768: { slidesPerView: 2 }
                    }
                });
            }
        } 
        // Agar screen 1024px ya usse bari hai aur swiper chal raha hai
        else if (swiper) {
            swiper.destroy(true, true);
            swiper = undefined;
        }
    }


    
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