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