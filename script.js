const loader=document.getElementById("loader");
window.addEventListener("load",()=>setTimeout(()=>{loader.style.opacity="0";setTimeout(()=>loader.remove(),600)},500));

const glow=document.querySelector(".cursor-glow");
window.addEventListener("pointermove",e=>{glow.style.left=e.clientX+"px";glow.style.top=e.clientY+"px"});

const reveals=document.querySelectorAll(".reveal");
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");observer.unobserve(e.target)}}),{threshold:.12});
reveals.forEach((el,i)=>{el.style.transitionDelay=(i%4)*70+"ms";observer.observe(el)});

document.querySelectorAll(".tilt").forEach(card=>{
 card.addEventListener("mousemove",e=>{
   const r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
   card.style.transform=`perspective(900px) rotateX(${-y*4}deg) rotateY(${x*5}deg) translateY(-3px)`;
 });
 card.addEventListener("mouseleave",()=>card.style.transform="");
});

const topBtn=document.getElementById("top");
window.addEventListener("scroll",()=>{
 topBtn.classList.toggle("show",scrollY>600);
 const links=document.querySelectorAll("nav a");
 document.querySelectorAll("section[id]").forEach(sec=>{
   const rect=sec.getBoundingClientRect();
   if(rect.top<=130 && rect.bottom>=130){
     links.forEach(l=>l.classList.toggle("active",l.getAttribute("href")==="#"+sec.id));
   }
 });
});
topBtn.onclick=()=>scrollTo({top:0,behavior:"smooth"});

const menu=document.querySelector(".menu-btn"), nav=document.querySelector("nav");
menu?.addEventListener("click",()=>nav.classList.toggle("open"));
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>nav.classList.remove("open")));

document.querySelectorAll('a[href^="#"]').forEach(a=>a.addEventListener("click",e=>{
 const target=document.querySelector(a.getAttribute("href"));
 if(target){e.preventDefault();target.scrollIntoView({behavior:"smooth"})}
}));
