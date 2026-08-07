(function () {
  "use strict";
  window.ELORA = window.ELORA || {};
  window.ELORA_MOTION = Object.freeze({
    duration:{instant:.12,fast:.22,base:.42,slow:.76,hero:1.1},
    ease:{luxury:"power4.out",soft:"power2.out",in:"power2.in",standard:"power3.inOut"},
    distance:{small:12,base:28,large:52},
    stagger:{tight:.045,base:.075,relaxed:.12}
  });
  var M=window.ELORA_MOTION, swipers=[], observers=[], contexts=[], cleanupFns=[];
  function reduced(){return window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;}
  function cleanup(){
    swipers.forEach(function(s){try{s.destroy(true,true);}catch(e){}});swipers=[];
    observers.forEach(function(o){try{o.disconnect();}catch(e){}});observers=[];
    contexts.forEach(function(c){try{c.revert();}catch(e){}});contexts=[];
    cleanupFns.forEach(function(fn){try{fn();}catch(e){}});cleanupFns=[];
  }
  function revealFallback(){
    var nodes=document.querySelectorAll("[data-reveal]");
    if(reduced()||!("IntersectionObserver" in window)){nodes.forEach(function(n){n.classList.add("is-revealed");});return;}
    var observer=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add("is-revealed");observer.unobserve(entry.target);}});},{threshold:.09,rootMargin:"0px 0px -4%"});
    nodes.forEach(function(n){observer.observe(n);});observers.push(observer);
  }
  function bindScrollUI(){
    var header=document.querySelector("[data-header]"),bar=document.querySelector("[data-scroll-progress]"),last=window.scrollY,ticking=false;
    function update(){var top=window.scrollY,max=Math.max(1,document.documentElement.scrollHeight-window.innerHeight),progress=Math.min(1,top/max);if(bar)bar.style.transform="scaleX("+progress+")";if(header){header.classList.toggle("is-condensed",top>16);header.classList.toggle("is-hidden",top>Math.max(160,last+8)&&top>last);}last=top;ticking=false;}
    function onScroll(){if(!ticking){requestAnimationFrame(update);ticking=true;}}
    window.addEventListener("scroll",onScroll,{passive:true});update();cleanupFns.push(function(){window.removeEventListener("scroll",onScroll);});
  }
  function bindMagnetic(){
    if(reduced()||!window.matchMedia("(hover:hover) and (pointer:fine)").matches)return;
    document.querySelectorAll("[data-magnetic]").forEach(function(node){function move(e){var r=node.getBoundingClientRect(),x=(e.clientX-r.left-r.width/2)*.14,y=(e.clientY-r.top-r.height/2)*.18;window.gsap?window.gsap.to(node,{x:x,y:y,duration:.28,ease:"power2.out"}):(node.style.transform="translate("+x+"px,"+y+"px)");}function leave(){window.gsap?window.gsap.to(node,{x:0,y:0,duration:.55,ease:"elastic.out(1,.45)"}):(node.style.transform="");}node.addEventListener("pointermove",move);node.addEventListener("pointerleave",leave);cleanupFns.push(function(){node.removeEventListener("pointermove",move);node.removeEventListener("pointerleave",leave);});});
  }
  function bindGallerySwipe(){
    var gallery=document.querySelector("[data-product-gallery]"),startX=0;if(!gallery)return;
    function start(e){startX=e.changedTouches[0].clientX;}function end(e){var dx=e.changedTouches[0].clientX-startX;if(Math.abs(dx)<48)return;var thumbs=Array.prototype.slice.call(gallery.querySelectorAll("[data-gallery-thumb]")),current=thumbs.indexOf(gallery.querySelector("[data-gallery-thumb].is-active")),rtl=document.documentElement.dir==="rtl",step=(dx<0?1:-1)*(rtl?-1:1),next=thumbs[Math.max(0,Math.min(thumbs.length-1,current+step))];if(next)next.click();}
    gallery.addEventListener("touchstart",start,{passive:true});gallery.addEventListener("touchend",end,{passive:true});cleanupFns.push(function(){gallery.removeEventListener("touchstart",start);gallery.removeEventListener("touchend",end);});
  }
  function initSwipers(){document.querySelectorAll("[data-swiper]").forEach(function(node){if(!window.Swiper)return;swipers.push(new Swiper(node,{slidesPerView:1.28,spaceBetween:12,speed:650,grabCursor:true,watchOverflow:true,pagination:{el:node.querySelector(".swiper-pagination"),clickable:true},a11y:{enabled:true},breakpoints:{640:{slidesPerView:2.2,spaceBetween:16},1024:{slidesPerView:4,spaceBetween:22}}}));});}
  function gsapEnter(main){
    if(!window.gsap||reduced())return false;
    if(window.ScrollTrigger)window.gsap.registerPlugin(window.ScrollTrigger);
    var curtain=document.querySelector(".route-curtain"),ctx=window.gsap.context(function(){
      window.gsap.fromTo("[data-header]",{y:-16,opacity:0},{y:0,opacity:1,duration:M.duration.slow,ease:M.ease.luxury,clearProps:"transform,opacity"});
      window.gsap.fromTo(main,{opacity:0,y:M.distance.small},{opacity:1,y:0,duration:M.duration.base,ease:M.ease.soft,clearProps:"transform,opacity"});
      if(curtain)window.gsap.to(curtain,{clipPath:document.documentElement.dir==="rtl"?"inset(0 100% 0 0)":"inset(0 0 0 100%)",duration:M.duration.slow,ease:M.ease.luxury,onComplete:function(){curtain.classList.remove("is-active");curtain.style.clipPath="";}});
      if(document.querySelector("[data-hero-media]")){window.gsap.fromTo("[data-hero-media] img",{scale:1.12},{scale:1.055,duration:1.8,ease:M.ease.luxury});window.gsap.fromTo("[data-hero-copy] > *",{y:M.distance.large,opacity:0},{y:0,opacity:1,duration:M.duration.hero,stagger:M.stagger.relaxed,ease:M.ease.luxury,delay:.12});}
      if(document.querySelector("[data-shein-hero]"))window.gsap.fromTo("[data-shein-hero] > *",{y:M.distance.base,opacity:0},{y:0,opacity:1,duration:M.duration.slow,stagger:M.stagger.base,ease:M.ease.luxury});
      if(document.querySelector("[data-step-card]"))window.gsap.fromTo("[data-step-card]",{y:M.distance.base,opacity:0},{y:0,opacity:1,duration:M.duration.slow,stagger:M.stagger.base,ease:M.ease.luxury,scrollTrigger:{trigger:".how-steps",start:"top 86%"}});
      if(document.querySelector("[data-status-timeline]"))window.gsap.fromTo(".request-timeline__step",{x:document.documentElement.dir==="rtl"?18:-18,opacity:0},{x:0,opacity:1,duration:M.duration.base,stagger:M.stagger.tight,ease:M.ease.soft});
      if(document.querySelector("[data-confirmation-mark]"))window.gsap.fromTo("[data-confirmation-mark]",{scale:.72,opacity:0,rotate:-8},{scale:1,opacity:1,rotate:0,duration:M.duration.slow,ease:"back.out(1.35)"});
      if(window.ScrollTrigger){window.gsap.utils.toArray("[data-parallax]").forEach(function(node){window.gsap.to(node,{yPercent:5,ease:"none",scrollTrigger:{trigger:node,scrub:.7,start:"top bottom",end:"bottom top"}});});window.gsap.utils.toArray("[data-reveal]").forEach(function(node){var type=node.getAttribute("data-reveal"),from={opacity:0,y:type==="horizontal"?0:M.distance.base};if(type==="horizontal")from.x=document.documentElement.dir==="rtl"?-M.distance.large:M.distance.large;if(type==="scale"||type==="product")from.scale=.96;if(type==="clip")from.clipPath="inset(0 0 100% 0)";window.gsap.fromTo(node,from,{opacity:1,x:0,y:0,scale:1,clipPath:"inset(0 0 0% 0)",duration:type==="clip"?.95:M.duration.slow,ease:M.ease.luxury,scrollTrigger:{trigger:node,start:"top 88%",once:true},onStart:function(){node.classList.add("is-revealed");}});});}
    },main.parentNode||document.body);contexts.push(ctx);return true;
  }
  function enter(){
    cleanup();var main=document.getElementById("main-content");if(!main)return;
    bindScrollUI();bindMagnetic();bindGallerySwipe();initSwipers();var animated=gsapEnter(main);if(!animated||!window.ScrollTrigger)revealFallback();
    if(window.lucide)window.lucide.createIcons();document.dispatchEvent(new CustomEvent("elora:page-ready"));
  }
  function exit(done){
    var main=document.getElementById("main-content"),curtain=document.querySelector(".route-curtain");
    if(window.gsap&&main&&!reduced()&&curtain){curtain.classList.add("is-active");window.gsap.set(curtain,{clipPath:document.documentElement.dir==="rtl"?"inset(0 0 0 100%)":"inset(0 100% 0 0)"});window.gsap.to(curtain,{clipPath:"inset(0 0 0 0)",duration:M.duration.base,ease:M.ease.standard,onComplete:function(){cleanup();done();}});}else if(window.gsap&&main&&!reduced()){window.gsap.to(main,{opacity:0,y:-M.distance.small,duration:M.duration.fast,ease:M.ease.in,onComplete:function(){cleanup();done();}});}else{cleanup();done();}
  }
  function buttonSuccess(button){if(!button)return;var old=button.innerHTML;button.disabled=true;button.innerHTML='<i class="icon" data-lucide="check"></i>'+window.ELORA.I18N.t("common.success");button.classList.add("is-success");if(window.lucide)window.lucide.createIcons();setTimeout(function(){button.disabled=false;button.classList.remove("is-success");button.innerHTML=old;if(window.lucide)window.lucide.createIcons();},1000);}
  window.ELORA.Animations={enter:enter,exit:exit,cleanup:cleanup,buttonSuccess:buttonSuccess,reduced:reduced};
})();
