/* ============================================================
   EM SHERIF — Interactive Script
   Lenis + GSAP + Custom Cursor
   ============================================================ */
(function(){
  "use strict";
  var R = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var M = window.innerWidth < 1024;

  /* Lenis */
  var L = new Lenis({ duration:1.2, easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}, smoothWheel:true });
  function raf(t){ L.raf(t); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  L.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function(t){ L.raf(t*1000); });
  gsap.ticker.lagSmoothing(0);

  /* Preloader */
  window.addEventListener("load", function(){
    setTimeout(function(){ var p=document.getElementById("pl"); if(p) p.classList.add("done"); }, 2200);
  });

  /* Progress */
  var pg = document.getElementById("prog");
  function uP(){ var h=document.documentElement.scrollHeight-innerHeight; pg.style.width=(h>0?(scrollY/h*100):0)+"%"; }
  addEventListener("scroll",uP,{passive:true}); uP();

  /* Nav */
  var nav = document.getElementById("nav");
  function oS(){ nav.classList.toggle("sc", scrollY > 60); }
  oS(); addEventListener("scroll",oS,{passive:true});

  /* Cursor */
  if(!M){
    var cr=document.getElementById("crs"), d=cr.querySelector(".crs-d"), r=cr.querySelector(".crs-r"), mx=0,my=0,cx=0,cy=0;
    document.addEventListener("mousemove",function(e){ mx=e.clientX; my=e.clientY; d.style.left=mx+"px"; d.style.top=my+"px"; });
    (function aC(){ cx+=(mx-cx)*.12; cy+=(my-cy)*.12; r.style.left=cx+"px"; r.style.top=cy+"px"; requestAnimationFrame(aC); })();
    document.querySelectorAll("a,button,.gal__i,.rec__c,.locs__r,[data-open-menu]").forEach(function(el){
      el.addEventListener("mouseenter",function(){ cr.classList.add("hov"); });
      el.addEventListener("mouseleave",function(){ cr.classList.remove("hov"); });
    });
    document.addEventListener("mousedown",function(){ cr.classList.add("pr"); });
    document.addEventListener("mouseup",function(){ cr.classList.remove("pr"); });
  }

  /* Mobile menu */
  var bu=document.getElementById("burger"), ov=document.getElementById("mov"), cO=document.getElementById("closeMov");
  bu.addEventListener("click",function(){ ov.classList.add("op"); bu.classList.add("op"); document.body.classList.add("noscroll"); });
  cO.addEventListener("click",function(){ ov.classList.remove("op"); bu.classList.remove("op"); document.body.classList.remove("noscroll"); });
  ov.querySelectorAll("a").forEach(function(a){ a.addEventListener("click",function(){ ov.classList.remove("op"); bu.classList.remove("op"); document.body.classList.remove("noscroll"); }); });

  /* Menu overlay */
  var mo=document.getElementById("mo"), tabs=document.querySelectorAll(".mo__tab"), views=document.querySelectorAll("[data-view]");
  function openM(){ mo.classList.add("op"); document.body.classList.add("noscroll"); mo.scrollTop=0; try{history.replaceState(null,"","#menu");}catch(e){} }
  function closeM(){ mo.classList.remove("op"); document.body.classList.remove("noscroll"); try{history.replaceState(null,"","#top");}catch(e){} }
  document.querySelectorAll("[data-open-menu]").forEach(function(el){ el.addEventListener("click",function(e){ e.preventDefault(); ov.classList.remove("op"); bu.classList.remove("op"); document.body.classList.remove("noscroll"); openM(); }); });
  document.querySelectorAll("[data-close-menu]").forEach(function(el){ el.addEventListener("click",function(e){ e.preventDefault(); closeM(); }); });
  document.querySelectorAll("[data-go-rsv]").forEach(function(el){ el.addEventListener("click",function(e){ e.preventDefault(); closeM(); setTimeout(function(){ var r=document.getElementById("reserve"); if(r) L.scrollTo(r,{offset:-40}); },400); }); });
  tabs.forEach(function(tab){ tab.addEventListener("click",function(){ var v=tab.getAttribute("data-tab"); tabs.forEach(function(t){t.classList.toggle("on",t===tab);}); views.forEach(function(vw){vw.hidden=vw.getAttribute("data-view")!==v;}); }); });
  if(location.hash==="#menu") openM();
  document.addEventListener("keydown",function(e){ if(e.key==="Escape"&&mo.classList.contains("op")) closeM(); });

  /* GSAP Animations */
  if(!R){
    var hT=gsap.timeline({delay:2.4,defaults:{ease:"power4.out"}});
    hT.from(".hero__h .ln span",{yPercent:115,duration:1.2,stagger:.12})
      .from(".hero__eb",{y:20,opacity:0,duration:.8},"-=.9")
      .from(".hero__ar",{yPercent:30,opacity:0,duration:1},"-=1")
      .from(".hero__d",{y:20,opacity:0,duration:.8},"-=.7")
      .from(".hero__ctas",{y:20,opacity:0,duration:.8},"-=.6")
      .from(".hero__meta span",{y:-12,opacity:0,duration:.6,stagger:.08},"-=1")
      .from(".hero__sc",{opacity:0,duration:.8},"-=.4");

    gsap.utils.toArray("[data-ru]").forEach(function(el){
      gsap.from(el,{y:36,opacity:0,duration:1.1,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 88%"}});
    });

    gsap.utils.toArray("[data-ri]").forEach(function(el){
      var img=el.querySelector("img")||el;
      gsap.fromTo(el,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.4,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 85%"}});
      gsap.fromTo(img,{scale:1.2},{scale:1,duration:1.7,ease:"power3.out",scrollTrigger:{trigger:el,start:"top 85%"}});
    });

    gsap.utils.toArray("[data-p]").forEach(function(el){
      gsap.fromTo(el,{yPercent:-8},{yPercent:8,ease:"none",scrollTrigger:{trigger:el.parentElement,start:"top bottom",end:"bottom top",scrub:true}});
    });

    gsap.utils.toArray("[data-pt]").forEach(function(el){
      gsap.fromTo(el,{yPercent:-20},{yPercent:20,ease:"none",scrollTrigger:{trigger:el.parentElement,start:"top bottom",end:"bottom top",scrub:true}});
    });

    gsap.utils.toArray("[data-c]").forEach(function(node){
      var end=+node.getAttribute("data-c"), isY=end>1000, o={v:isY?2000:0};
      gsap.to(o,{v:end,duration:2,ease:"power2.out",scrollTrigger:{trigger:node,start:"top 92%"},onUpdate:function(){node.textContent=Math.round(o.v);}});
    });

    var gS=document.querySelector("[data-gs]"), gT=document.querySelector("[data-gt]");
    if(gS&&gT){
      var tW=gT.scrollWidth-gS.offsetWidth;
      gsap.to(gT,{x:-tW,ease:"none",scrollTrigger:{trigger:gS,start:"top 70%",end:"bottom 30%",scrub:1.5,invalidateOnRefresh:true}});
    }

    var mq=document.querySelector("[data-marquee]");
    if(mq){ gsap.to(mq,{x:-(mq.scrollWidth/2),ease:"none",duration:20,repeat:-1}); }
  }

  /* Lightbox */
  var ts=[].slice.call(document.querySelectorAll(".gal__i")),lb=document.getElementById("lb"),lI=document.getElementById("lbI");
  var sr=ts.map(function(t){return t.getAttribute("data-f");}), al=ts.map(function(t){var i=t.querySelector("img");return i?i.alt:"";}), ix=0;
  function sL(i){ ix=(i+sr.length)%sr.length; lI.src=sr[ix]; lI.alt=al[ix]; }
  function oL(i){ sL(i); lb.classList.add("op"); document.body.style.overflow="hidden"; }
  function cL(){ lb.classList.remove("op"); document.body.style.overflow=""; }
  ts.forEach(function(t,i){ t.addEventListener("click",function(){oL(i);}); });
  document.getElementById("lbX").addEventListener("click",cL);
  document.getElementById("lbP").addEventListener("click",function(){sL(ix-1);});
  document.getElementById("lbN").addEventListener("click",function(){sL(ix+1);});
  lb.addEventListener("click",function(e){if(e.target===lb)cL();});
  document.addEventListener("keydown",function(e){ if(!lb.classList.contains("op"))return; if(e.key==="Escape")cL(); else if(e.key==="ArrowLeft")sL(ix-1); else if(e.key==="ArrowRight")sL(ix+1); });
})();
