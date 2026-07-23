/*====================================
 PERFIL
 Animaciones de entrada
====================================*/


document.addEventListener(
"DOMContentLoaded",
()=>{


const hero =
document.querySelector(".hero-perfil");


const foto =
document.querySelector(".foto-container");


const titulo =
document.querySelector(".hero-perfil h1");


const subtitulo =
document.querySelector(".subtitulo");



const elementos=[

foto,

titulo,

subtitulo

];



elementos.forEach((elemento)=>{

elemento.style.opacity="0";

elemento.style.transform=
"translateY(30px)";

elemento.style.transition=
"opacity 1s ease, transform 1s ease";

});



let delay=300;



elementos.forEach((elemento)=>{


setTimeout(()=>{


elemento.style.opacity="1";


elemento.style.transform=
"translateY(0)";


},delay);


delay+=350;


});





/*====================================
 APARICIÓN DE TARJETAS
====================================*/


const cards =
document.querySelectorAll(".card");



const observer =
new IntersectionObserver(

(entries)=>{


entries.forEach(entry=>{


if(entry.isIntersecting){


entry.target.classList.add("visible");


}


});


},

{

threshold:.2

}

);



cards.forEach(card=>{


card.classList.add("hidden");


observer.observe(card);


});



});
/*==================================================
MENU PREMIUM
No modifica variables anteriores
==================================================*/

(() => {

const premiumNavbar =
document.querySelector(".navbar");

const premiumLinks =
document.querySelectorAll(".navbar a[href^='#']");

const premiumSections =
document.querySelectorAll("section[id], header[id]");

const premiumProgress =
document.querySelector(".scroll-progress");



window.addEventListener(
"scroll",
()=>{

/* barra progreso */

const scrollTop =
window.scrollY;

const documentHeight =
document.documentElement.scrollHeight -
window.innerHeight;

const progress =
(scrollTop/documentHeight)*100;

premiumProgress.style.width =
progress+"%";



/* navbar */

if(scrollTop>80){

premiumNavbar.classList.add("scrolled");

}

else{

premiumNavbar.classList.remove("scrolled");

}



/* sección activa */

let current="";

premiumSections.forEach(section=>{

const top =
section.offsetTop-180;

const height =
section.offsetHeight;

if(scrollTop>=top &&
scrollTop<top+height){

current=section.id;

}

});



premiumLinks.forEach(link=>{

link.classList.remove("active");



if(link.getAttribute("href")==="#"+current){

link.classList.add("active");

}

});



});



})();
/*==================================================
PREMIUM REVEAL
Compatible con observers existentes
==================================================*/

(() => {

const premiumRevealItems =
document.querySelectorAll(".reveal-section");

const premiumRevealCards =
document.querySelectorAll(".reveal-card");



const premiumRevealObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add(
"reveal-visible"
);

}

});

},

{

threshold:.15,

rootMargin:
"0px 0px -80px 0px"

}

);



premiumRevealItems.forEach(section=>{

premiumRevealObserver.observe(section);

});



premiumRevealCards.forEach(card=>{

premiumRevealObserver.observe(card);

});



})();
/*==================================================
STAGGER EFFECT
==================================================*/

(() => {

const premiumGroups = [

".cards",

".timeline",

".skills"

];



premiumGroups.forEach(selector=>{

const group =
document.querySelector(selector);

if(!group) return;



const children =
group.children;



const premiumGroupObserver =
new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

[...children].forEach(

(child,index)=>{

setTimeout(()=>{

child.classList.add(
"reveal-visible"
);

},

index*120);

});

}

});

},

{

threshold:.2

}

);



premiumGroupObserver.observe(group);

});

})();
/*==================================================
PREMIUM PARALLAX ENGINE
==================================================*/

(() => {

const premiumHero =
document.querySelector(".hero-perfil");

if(!premiumHero) return;

const premiumPhoto =
premiumHero.querySelector(".foto-container");

const premiumTitle =
premiumHero.querySelector("h1");

const premiumSubtitle =
premiumHero.querySelector(".subtitulo");



window.addEventListener(
"scroll",
()=>{

const premiumScroll =
window.scrollY;



premiumPhoto.style.transform =
`translateY(${premiumScroll*0.18}px)`;


premiumTitle.style.transform =
`translateY(${premiumScroll*0.08}px)`;


premiumSubtitle.style.transform =
`translateY(${premiumScroll*0.04}px)`;

});

})();
/*==================================================
PREMIUM CARD TILT
==================================================*/

(() => {

const premiumTiltCards =
document.querySelectorAll(

".card, .experience-card, .project-card, .academic-card"

);



premiumTiltCards.forEach(card=>{

card.addEventListener(

"mousemove",

event=>{

const rect =
card.getBoundingClientRect();

const x =
event.clientX-rect.left;

const y =
event.clientY-rect.top;

const rotateY =
(x-rect.width/2)/18;

const rotateX =
(rect.height/2-y)/18;

card.style.transform=

`perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-8px)`;

}

);



card.addEventListener(

"mouseleave",

()=>{

card.style.transform="";

}

);

});

})();
/*==================================================
SECTION FOCUS
Compatible con todo el proyecto
==================================================*/

(() => {

const premiumMenuLinks =
document.querySelectorAll(".navbar a[href^='#']");

premiumMenuLinks.forEach(link=>{

link.addEventListener("click",()=>{

const targetId =
link.getAttribute("href");

const target =
document.querySelector(targetId);

if(!target) return;

setTimeout(()=>{

target.classList.remove("section-focus");

/* reinicia la animación */

void target.offsetWidth;

target.classList.add("section-focus");

},450);

});

});

})();