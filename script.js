/* ============================================================
   EM SHERIF — Interactive Engine (Multi-page)
   Lenis + GSAP + Custom Cursor + Lightbox
   ============================================================ */
(function(){
  "use strict";
  var R = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var M = window.innerWidth < 1024;

  /* ---- Lenis ---- */
  var L = new Lenis({ duration:1.15, easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}, smoothWheel:true });
  function raf(t){ L.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  L.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function(t){ L.raf(t*1000); });
  gsap.ticker.lagSmoothing(0);

  /* ---- Preloader ---- */
  window.addEventListener("load", function(){
    setTimeout(function(){ var p=document.getElementById("pl"); if(p) p.classList.add("done"); }, 1800);
  });

  /* ---- Progress ---- */
  var pg = document.getElementById("prog");
  if(pg){
    function uP(){ var h=document.documentElement.scrollHeight-innerHeight; pg.style.width=(h>0?(scrollY/h*100):0)+"%"; }
    addEventListener("scroll",uP,{passive:true}); uP();
  }

  /* ---- Nav scroll ---- */
  var nav = document.getElementById("nav");
  if(nav){
    function oS(){ nav.classList.toggle("sc", scrollY > 50); }
    oS(); addEventListener("scroll",oS,{passive:true});
  }

  /* ---- Custom cursor ---- */
  if(!M){
    var cr=document.getElementById("crs");
    if(cr){
      var d=cr.querySelector(".crs-d"), r=cr.querySelector(".crs-r"), mx=0,my=0,cx=0,cy=0;
      document.addEventListener("mousemove",function(e){ mx=e.clientX; my=e.clientY; d.style.left=mx+"px"; d.style.top=my+"px"; });
      (function aC(){ cx+=(mx-cx)*.12; cy+=(my-cy)*.12; r.style.left=cx+"px"; r.style.top=cy+"px"; requestAnimationFrame(aC); })();
      document.querySelectorAll("a,button,.gal__i,.cc,.pc,.loc__r").forEach(function(el){
        el.addEventListener("mouseenter",function(){ cr.classList.add("hov"); });
        el.addEventListener("mouseleave",function(){ cr.classList.remove("hov"); });
      });
      document.addEventListener("mousedown",function(){ cr.classList.add("pr"); });
      document.addEventListener("mouseup",function(){ cr.classList.remove("pr"); });
    }
  }

  /* ---- Mobile menu ---- */
  var bu=document.getElementById("burger"), ov=document.getElementById("mov"), cO=document.getElementById("closeMov");
  if(bu&&ov&&cO){
    bu.addEventListener("click",function(){ ov.classList.add("op"); bu.classList.add("op"); document.body.classList.add("noscroll"); });
    cO.addEventListener("click",function(){ ov.classList.remove("op"); bu.classList.remove("op"); document.body.classList.remove("noscroll"); });
    ov.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ ov.classList.remove("op"); bu.classList.remove("op"); document.body.classList.remove("noscroll"); }); });
  }

  /* ---- GSAP Animations ---- */
  if(!R){
    // Reveal up
    gsap.utils.toArray("[data-ru]").forEach(function(el){
      gsap.from(el,{y:40,opacity:0,duration:1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}});
    });
    // Image reveal
    gsap.utils.toArray("[data-ri]").forEach(function(el){
      gsap.fromTo(el,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.3,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 85%"}});
      var img=el.querySelector("img");
      if(img) gsap.fromTo(img,{scale:1.2},{scale:1,duration:1.6,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 85%"}});
    });
    // Parallax image
    gsap.utils.toArray("[data-p]").forEach(function(el){
      gsap.fromTo(el,{yPercent:-8},{yPercent:8,ease:"none",scrollTrigger:{trigger:el.parentElement||el,start:"top bottom",end:"bottom top",scrub:true}});
    });
    // Counter
    gsap.utils.toArray("[data-c]").forEach(function(node){
      var end=+node.getAttribute("data-c"), o={v:0};
      gsap.to(o,{v:end,duration:2,ease:"power2.out",scrollTrigger:{trigger:node,start:"top 92%"},onUpdate:function(){node.textContent=Math.round(o.v);}});
    });
    // Gallery horizontal
    var gS=document.querySelector("[data-gs]"), gT=document.querySelector("[data-gt]");
    if(gS&&gT){
      var tW=gT.scrollWidth-gS.offsetWidth;
      gsap.to(gT,{x:-tW,ease:"none",scrollTrigger:{trigger:gS,start:"top 70%",end:"bottom 30%",scrub:1.5,invalidateOnRefresh:true}});
    }
    // Marquee
    var mq=document.querySelector("[data-marquee]");
    if(mq){ gsap.to(mq,{x:-(mq.scrollWidth/2),ease:"none",duration:25,repeat:-1}); }
    // Hero text stagger (for pages that have it)
    var hSpans=document.querySelectorAll(".ph__h .ln span");
    if(hSpans.length){
      gsap.from(hSpans,{yPercent:115,duration:1.1,stagger:.1,ease:"power4.out",delay:2});
    }
    var phSub=document.querySelector(".ph__sub");
    if(phSub) gsap.from(phSub,{y:16,opacity:0,duration:.8,ease:"power3.out",delay:2.8});
  }

  /* ---- Lightbox ---- */
  var ts=[].slice.call(document.querySelectorAll(".gal__i[data-f]")),lb=document.getElementById("lb"),lI=document.getElementById("lbI");
  if(lb&&ts.length){
    var sr=ts.map(function(t){return t.getAttribute("data-f");}), al=ts.map(function(t){var i=t.querySelector(".cap b");return i?i.textContent:"";}), ix=0;
    function sL(i){ ix=(i+sr.length)%sr.length; lI.src=sr[ix]; }
    function oL(i){ sL(i); lb.classList.add("op"); document.body.style.overflow="hidden"; }
    function cL(){ lb.classList.remove("op"); document.body.style.overflow=""; }
    ts.forEach(function(t,i){ t.addEventListener("click",function(){oL(i);}); });
    document.getElementById("lbX").addEventListener("click",cL);
    document.getElementById("lbP").addEventListener("click",function(){sL(ix-1);});
    document.getElementById("lbN").addEventListener("click",function(){sL(ix+1);});
    lb.addEventListener("click",function(e){if(e.target===lb)cL();});
    document.addEventListener("keydown",function(e){ if(!lb.classList.contains("op"))return; if(e.key==="Escape")cL(); else if(e.key==="ArrowLeft")sL(ix-1); else if(e.key==="ArrowRight")sL(ix+1); });
  }
})();
