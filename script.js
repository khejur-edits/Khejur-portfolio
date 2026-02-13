// ================= HORIZONTAL NAVIGATION =================
document.querySelectorAll(".carousel-wrapper").forEach(wrapper=>{
const carousel = wrapper.querySelector(".carousel");
const left = wrapper.querySelector(".left");
const right = wrapper.querySelector(".right");

left.addEventListener("click",()=>{
carousel.scrollBy({left:-300,behavior:"smooth"});
});

right.addEventListener("click",()=>{
carousel.scrollBy({left:300,behavior:"smooth"});
});

// ================= CENTER ACTIVE CARD EFFECT =================
const cards = wrapper.querySelectorAll(".video-card");

function updateActiveCard(){
const center = window.innerWidth / 2;

cards.forEach(card=>{
const rect = card.getBoundingClientRect();
const cardCenter = rect.left + rect.width / 2;
const distance = Math.abs(center - cardCenter);

if(distance < 150){
card.classList.add("active");
card.classList.remove("show");
}else if(distance < 300){
card.classList.add("show");
card.classList.remove("active");
}else{
card.classList.remove("active","show");
}
});
}

carousel.addEventListener("scroll",updateActiveCard);
window.addEventListener("resize",updateActiveCard);
updateActiveCard();
});


// ================= SCROLL DOWN BUTTON =================
document.querySelector(".scroll-down").addEventListener("click",()=>{
window.scrollBy({top:window.innerHeight,behavior:"smooth"});
});


// ================= POP-IN ON LOAD =================
window.addEventListener("load",()=>{
document.querySelectorAll(".video-card").forEach((card,i)=>{
setTimeout(()=>{
card.classList.add("show");
}, i * 100);
});
});
