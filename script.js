// Horizontal scroll buttons
document.querySelectorAll(".carousel-wrapper").forEach(wrapper=>{
const carousel=wrapper.querySelector(".carousel");
const left=wrapper.querySelector(".left");
const right=wrapper.querySelector(".right");

left.addEventListener("click",()=>{
carousel.scrollBy({left:-300,behavior:"smooth"});
});

right.addEventListener("click",()=>{
carousel.scrollBy({left:300,behavior:"smooth"});
});
});

// Scroll down button
document.querySelector(".scroll-down").addEventListener("click",()=>{
window.scrollBy({top:window.innerHeight,behavior:"smooth"});
});
