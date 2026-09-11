/* ============================================================
   EM SHERIF — Cinematic Script
   ============================================================ */
(function(){
  "use strict";
  var R=window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var M=window.innerWidth<1024;

  /* Preloader — dismiss after 1.5s max, or when DOM is ready */
  function hp(){var p=document.getElementById("pl");if(p&&!p.classList.contains("done"))p.classList.add("done")}
  setTimeout(hp,1500);
  if(document.readyState==="complete")setTimeout(hp,100);
  else window.addEventListener("load",function(){setTimeout(hp,100)});

  /* Progress */
  var pg=document.getElementById("prog");
  if(pg){function u(){var h=document.documentElement.scrollHeight-innerHeight;pg.style.width=(h>0?(scrollY/h*100):0)+"%"}addEventListener("scroll",u,{passive:true});u()}

  /* Nav */
  var nav=document.getElementById("nav");
  if(nav){function o(){nav.classList.toggle("sc",scrollY>50)}o();addEventListener("scroll",o,{passive:true})}

  /* Burger */
  var bu=document.getElementById("burger"),mv=document.getElementById("mov"),cx=document.getElementById("closeMov");
  if(bu&&mv&&cx){
    bu.addEventListener("click",function(){mv.classList.add("on");bu.classList.add("on");document.body.classList.add("lock")});
    cx.addEventListener("click",function(){mv.classList.remove("on");bu.classList.remove("on");document.body.classList.remove("lock")});
    mv.querySelectorAll("a").forEach(function(a){a.addEventListener("click",function(){mv.classList.remove("on");bu.classList.remove("on");document.body.classList.remove("lock")})});
  }

  if(typeof gsap==="undefined"||typeof ScrollTrigger==="undefined"||typeof Lenis==="undefined")return;
  if(R)return;

  /* Lenis */
  var L=new Lenis({duration:1.1,easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))},smoothWheel:true,touchMultiplier:1.5});
  function raf(t){L.raf(t);requestAnimationFrame(raf)}requestAnimationFrame(raf);
  L.on("scroll",ScrollTrigger.update);
  gsap.ticker.add(function(t){L.raf(t*1000)});gsap.ticker.lagSmoothing(0);

  /* Hero entrance */
  var heroCt=document.querySelector(".hero__ct");
  if(heroCt){
    var ht=gsap.timeline({delay:.7});
    ht.from(".hero__eb",{y:18,opacity:0,duration:.7,ease:"power3.out"})
      .from(".hero__h",{y:26,opacity:0,duration:.9,ease:"power3.out"},-=0.4)
      .from(".hero__sub",{y:16,opacity:0,duration:.7,ease:"power3.out"},-=0.5)
      .from(".hero__scroll",{opacity:0,duration:.5,ease:"power2.out"},-=0.2);
  }

  /* Scroll reveal: fade up */
  gsap.utils.toArray("[data-ru]").forEach(function(e){gsap.from(e,{y:28,opacity:0,duration:.85,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 88%"}})});

  /* Image reveal */
  gsap.utils.toArray("[data-ri]").forEach(function(e){
    gsap.fromTo(e,{clipPath:"inset(0 0 100% 0)"},{clipPath:"inset(0 0 0% 0)",duration:1.1,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 85%"}});
    var i=e.querySelector("img");if(i)gsap.fromTo(i,{scale:1.12},{scale:1,duration:1.4,ease:"power3.out",scrollTrigger:{trigger:e,start:"top 85%"}});
  });

  /* Parallax */
  gsap.utils.toArray("[data-p]").forEach(function(e){gsap.fromTo(e,{yPercent:-5},{yPercent:5,ease:"none",scrollTrigger:{trigger:e.parentElement||e,start:"top bottom",end:"bottom top",scrub:true}})});

  /* Counter */
  gsap.utils.toArray("[data-c]").forEach(function(n){
    var v=+n.getAttribute("data-c"),o={v:0};
    gsap.to(o,{v:v,duration:1.6,ease:"power2.out",scrollTrigger:{trigger:n,start:"top 90%"},onUpdate:function(){n.textContent=Math.round(o.v).toLocaleString()}});
  });

  /* Marquee */
  var mq=document.querySelector("[data-mq]");if(mq)gsap.to(mq,{x:-(mq.scrollWidth/2),ease:"none",duration:22,repeat:-1});

  /* Section headers stagger */
  gsap.utils.toArray(".sh").forEach(function(sh){
    var eb=sh.querySelector(".sh__eb"),h=sh.querySelector(".sh__h"),s=sh.querySelector(".sh__s");
    var tl=gsap.timeline({scrollTrigger:{trigger:sh,start:"top 85%"}});
    if(eb)tl.from(eb,{y:14,opacity:0,duration:.5,ease:"power3.out"});
    if(h)tl.from(h,{y:18,opacity:0,duration:.6,ease:"power3.out"},-=0.25);
    if(s)tl.from(s,{y:12,opacity:0,duration:.5,ease:"power3.out"},-=0.25);
  });

  /* Concept block stagger */
  gsap.utils.toArray(".cb").forEach(function(cb){
    var img=cb.querySelector(".cb__img"),ct=cb.querySelector(".cb__ct");
    var tl=gsap.timeline({scrollTrigger:{trigger:cb,start:"top 80%"}});
    if(img)tl.from(img,{clipPath:"inset(0 0 100% 0)",duration:1.1,ease:"power3.out"});
    if(ct)tl.from(ct.children,{y:20,opacity:0,duration:.6,stagger:.08,ease:"power3.out"},-=0.5);
  });

  /* Stat line */
  gsap.utils.toArray(".stat__line").forEach(function(l){gsap.from(l,{width:0,duration:.7,ease:"power2.out",scrollTrigger:{trigger:l,start:"top 88%"}})});

  /* Page hero content entrance */
  var phCt=document.querySelector(".ph__ct");
  if(phCt){
    var pht=gsap.timeline({delay:.4});
    pht.from(".ph__eb",{y:16,opacity:0,duration:.6,ease:"power3.out"})
      .from(".ph__h",{y:22,opacity:0,duration:.8,ease:"power3.out"},-=0.35)
      .from(".ph__sub",{y:14,opacity:0,duration:.6,ease:"power3.out"},-=0.4);
  }

  /* Location rows stagger */
  gsap.utils.toArray(".locs").forEach(function(locs){
    var rows=locs.querySelectorAll(".loc");
    gsap.from(rows,{y:16,opacity:0,duration:.5,stagger:.04,ease:"power3.out",scrollTrigger:{trigger:locs,start:"top 85%"}});
  });

  /* Menu categories stagger */
  gsap.utils.toArray(".md").forEach(function(md){
    var cats=md.querySelectorAll(".mcat");
    gsap.from(cats,{y:18,opacity:0,duration:.5,stagger:.06,ease:"power3.out",scrollTrigger:{trigger:md,start:"top 85%"}});
  });

  /* Lightbox */
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
