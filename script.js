/* ============================================================
   EM SHERIF — Script
   ============================================================ */
(function(){
  "use strict";
  var R=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var M=window.innerWidth<1024;

  function hp(){var p=document.getElementById("pl");if(p)p.classList.add("done")}
  window.addEventListener("load",function(){setTimeout(hp,500)});
  setTimeout(hp,3000);

  var pg=document.getElementById("prog");
  if(pg){function u(){var h=document.documentElement.scrollHeight-innerHeight;pg.style.width=(h>0?(scrollY/h*100):0)+"%"}addEventListener("scroll",u,{passive:true});u()}

  var nav=document.getElementById("nav");
  if(nav){function o(){nav.classList.toggle("sc",scrollY>50)}o();addEventListener("scroll",o,{passive:true})}

  var bu=document.getElementById("burger"),mv=document.getElementById("mov"),cx=document.getElementById("closeMov");
  if(bu&&mv&&cx){
    bu.addEventListener("click",function(){mv.classList.add("on");bu.classList.add("on");document.body.classList.add("lock")});
    cx.addEventListener("click",function(){mv.classList.remove("on");bu.classList.remove("on");document.body.classList.remove("lock")});
    mv.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){mv.classList.remove("on");bu.classList.remove("on");document.body.classList.remove("lock")})});
  }

  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined"||typeof Lenis==="undefined")return;
  if(!R){
    var L=new Lenis({duration:1.1,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true});
    function raf(t){L.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);
    L.on("scroll",ScrollTrigger.update);
    gsap.ticker.add(function(t){L.raf(t*1000)});gsap.ticker.lagSmoothing(0);

    gsap.utils.toArray("[data-ru]").forEach(function(e){gsap.from(e,{y:28,opacity:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 88%"}})});
    gsap.utils.toArray("[data-ri]").forEach(function(e){
      gsap.fromTo(e,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.1,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 85%"}});
      var i=e.querySelector("img");if(i)gsap.fromTo(i,{scale:1.12},{scale:1,duration:1.4,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 85%"}});
    });
    gsap.utils.toArray("[data-p]").forEach(function(e){gsap.fromTo(e,{yPercent:-5},{yPercent:5,ease:"none",scrollTrigger:{trigger:e.parentElement||e,start:"top bottom",end:"bottom top",scrub:true}})});
    gsap.utils.toArray("[data-c]").forEach(function(n){
      var v=+n.getAttribute("data-c"),o={v:0};
      gsap.to(o,{v:v,duration:1.6,ease:"power2.out",scrollTrigger:{trigger:n,start:"top 90%"},onUpdate:function(){n.textContent=Math.round(o.v)}});
    });
    var mq=document.querySelector("[data-mq]");if(mq)gsap.to(mq,{x:-(mq.scrollWidth/2),ease:"none",duration:20,repeat:-1});
  }

  var ts=[].slice.call(document.querySelectorAll("[data-f]")),lb=document.getElementById("lb"),lI=document.getElementById("lbI");
  if(lb&&ts.length){
    var sr=ts.map(function(t){return t.getAttribute("data-f")}),ix=0;
    function sL(i){ix=(i+sr.length)%sr.length;lI.src=sr[ix]}
    function oL(i){sL(i);lb.classList.add("on");document.body.classList.add("lock")}
    function cL(){lb.classList.remove("on");document.body.classList.remove("lock")}
    ts.forEach(function(t,i){t.addEventListener("click",function(){oL(i)})});
    var lbX=document.getElementById("lbX"),lbP=document.getElementById("lbP"),lbN=document.getElementById("lbN");
    if(lbX)lbX.addEventListener("click",cL);
    if(lbP)lbP.addEventListener("click",function(){sL(ix-1)});
    if(lbN)lbN.addEventListener("click",function(){sL(ix+1)});
    lb.addEventListener("click",function(e){if(e.target===lb)cL()});
    document.addEventListener("keydown",function(e){if(!lb.classList.contains("on"))return;if(e.key==="Escape")cL();else if(e.key==="ArrowLeft")sL(ix-1);else if(e.key==="ArrowRight")sL(ix+1)});
  }
})();
