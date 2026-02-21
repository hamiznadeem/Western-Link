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
    });



    // Custom curser Animatiom circle
    function circleEffect(){

    var Content = document.querySelector("body")
    var circle = document.querySelector("#circle")


    Content.addEventListener("mousemove",function(dets){
        gsap.to(circle,{
            x:dets.x,
            y:dets.y,
            scale:1,
            opacity:1
        })
    })

    Content.addEventListener("mouseenter",function(){
        gsap.to(circle,{
            scale:1,
            opacity:1,
            margin:0
        })
    })
    Content.addEventListener("mouseleave",function(){
        gsap.to(circle,{
            scale:0,
            opacity:0
        })
    })
    }
    circleEffect()