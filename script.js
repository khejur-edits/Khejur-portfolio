// ========= GLOBAL PLAYER STORE =========
const ALL_PLAYERS=[];


// ========= API READY =========
function onYouTubeIframeAPIReady(){
document.querySelectorAll(".carousel-wrapper").forEach(initCarousel);
revealOnLoad();
}


// ========= CAROUSEL =========
function initCarousel(wrapper){

const carousel=wrapper.querySelector(".carousel");
const cards=[...wrapper.querySelectorAll(".video-card")];
const leftBtn=wrapper.querySelector(".left");
const rightBtn=wrapper.querySelector(".right");

let players=[];
let activeIndex=0;


// ----- CREATE PLAYERS -----
cards.forEach((card,i)=>{

const el=card.querySelector(".yt-player");

const player=new YT.Player(el,{
videoId:el.dataset.id,
playerVars:{rel:0,modestbranding:1},
events:{onStateChange:e=>onPlay(e,i)}
});

players.push(player);
ALL_PLAYERS.push(player);


// tap card → activate
card.addEventListener("click",()=>{
setActive(i);
centerCard(card,carousel);
});

});


// ----- BUTTONS -----
leftBtn.onclick=()=>move(-1);
rightBtn.onclick=()=>move(1);

function move(dir){
activeIndex=Math.max(0,Math.min(cards.length-1,activeIndex+dir));
setActive(activeIndex);
centerCard(cards[activeIndex],carousel);
}


// ----- PLAYER STATE -----
function onPlay(e,index){
if(e.data===YT.PlayerState.PLAYING){
pauseAllExcept(e.target);
activeIndex=index;
setActive(index);
centerCard(cards[index],carousel);
}
}


// ----- ACTIVE STYLE -----
function setActive(i){
cards.forEach(c=>c.classList.remove("active"));
cards[i].classList.add("active");
}

}


// ========= GLOBAL PAUSE =========
function pauseAllExcept(active){
ALL_PLAYERS.forEach(p=>{
if(p!==active){
try{p.pauseVideo();}catch{}
}
});
}


// ========= CENTER CARD =========
function centerCard(card,carousel){

const rect=card.getBoundingClientRect();
const crect=carousel.getBoundingClientRect();

const offset=
rect.left-crect.left-
(crect.width/2-rect.width/2);

carousel.scrollBy({left:offset,behavior:"smooth"});
}


// ========= THEME =========
const toggle=document.querySelector(".theme-toggle");

if(localStorage.getItem("theme")==="light")
document.body.classList.add("light");

toggle.addEventListener("click",()=>{
document.body.classList.toggle("light");
localStorage.setItem(
"theme",
document.body.classList.contains("light")?"light":"dark"
);
});


// ========= LOAD ANIMATION =========
function revealOnLoad(){
document.querySelectorAll(".video-card").forEach((card,i)=>{
setTimeout(()=>card.classList.add("show"),i*120);
});
}
