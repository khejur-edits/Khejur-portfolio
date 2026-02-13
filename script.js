const ALL_PLAYERS=[];

function onYouTubeIframeAPIReady(){
document.querySelectorAll(".carousel-wrapper").forEach(initCarousel);
}

function initCarousel(wrapper){

const carousel=wrapper.querySelector(".carousel");
const cards=[...wrapper.querySelectorAll(".video-card")];
const leftBtn=wrapper.querySelector(".left");
const rightBtn=wrapper.querySelector(".right");

let activeIndex=0;

cards.forEach((card,i)=>{

const el=card.querySelector(".yt-player");

const player=new YT.Player(el,{
videoId:el.dataset.id,
playerVars:{rel:0,modestbranding:1},
events:{
onStateChange:e=>{
if(e.data===YT.PlayerState.PLAYING){
pauseAllExcept(e.target);
}
}
}
});

ALL_PLAYERS.push(player);

card.addEventListener("click",()=>{
activeIndex=i;
setActive(i);
});

});

leftBtn.onclick=()=>move(-1);
rightBtn.onclick=()=>move(1);

function move(dir){
activeIndex=Math.max(0,Math.min(cards.length-1,activeIndex+dir));
carousel.scrollBy({
left:dir*250,
behavior:"smooth"
});
setActive(activeIndex);
}

function setActive(i){
cards.forEach(c=>c.classList.remove("active"));
cards[i].classList.add("active");
}
}

function pauseAllExcept(active){
ALL_PLAYERS.forEach(p=>{
if(p!==active){
try{p.pauseVideo();}catch{}
}
});
}

/* FIX MOBILE SCROLL ISSUE */

document.addEventListener("touchstart",function(){
document.querySelectorAll("iframe").forEach(i=>{
i.style.pointerEvents="none";
});
});

document.addEventListener("touchend",function(){
document.querySelectorAll(".video-card.active iframe").forEach(i=>{
i.style.pointerEvents="auto";
});
});

/* SCROLL DOWN BUTTON */

const scrollBtn=document.querySelector(".scroll-down");

scrollBtn.addEventListener("click",()=>{
window.scrollBy({
top:window.innerHeight,
behavior:"smooth"
});
});

/* THEME */

const toggle=document.querySelector(".theme-toggle");

if(localStorage.getItem("theme")==="light"){
document.body.classList.add("light");
}

toggle.addEventListener("click",()=>{
document.body.classList.toggle("light");
localStorage.setItem(
"theme",
document.body.classList.contains("light")?"light":"dark"
);
});
