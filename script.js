/* ============================================================
   EM SHERIF — Cinematic Script
   ============================================================ */
(function(){
  "use strict";
  var R = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var M = window.matchMedia("(max-width:900px)").matches;

  /* ---- Preloader: dismiss on load, hard cap at 1.4s ---- */
  function hidePreloader(){
    var p = document.getElementById("pl");
    if(p && !p.classList.contains("done")) p.classList.add("done");
  }
  window.addEventListener("load", function(){ setTimeout(hidePreloader, 200); });
  setTimeout(hidePreloader, 1400);
  if(document.readyState === "complete") setTimeout(hidePreloader, 100);

  /* ---- Video: set the right source once (avoids double-download on mobile) ---- */
  (function(){
    document.querySelectorAll("video.bg").forEach(function(v){
      var desktop = v.getAttribute("data-desktop"),
          mobile  = v.getAttribute("data-mobile"),
          src = (M && mobile) ? mobile : (desktop || mobile);
      if(src && !v.getAttribute("src")){ v.setAttribute("src", src); v.load(); }
      // Kick off playback once buffered (some mobiles need an explicit call)
      var tryPlay = function(){ var pr = v.play(); if(pr && pr.catch) pr.catch(function(){}); };
      if(v.readyState >= 2) tryPlay();
      v.addEventListener("loadeddata", tryPlay, { once:true });
      v.addEventListener("canplay", function(){ v.classList.add("ready"); tryPlay(); }, { once:true });
    });
  })();

  /* ---- Scroll progress bar ---- */
  var pg = document.getElementById("prog");
  if(pg){
    var updProg = function(){
      var h = document.documentElement.scrollHeight - window.innerHeight;
      pg.style.width = (h > 0 ? (window.scrollY / h * 100) : 0) + "%";
    };
    addEventListener("scroll", updProg, { passive:true });
    updProg();
  }

  /* ---- Nav condense on scroll ---- */
  var nav = document.getElementById("nav");
  if(nav){
    var updNav = function(){ nav.classList.toggle("sc", window.scrollY > 50); };
    updNav();
    addEventListener("scroll", updNav, { passive:true });
  }

  /* ---- Mobile menu ---- */
  var burger = document.getElementById("burger"),
      mov = document.getElementById("mov"),
      closeMov = document.getElementById("closeMov");
  if(burger && mov){
    var openMenu = function(){ mov.classList.add("on"); burger.classList.add("on"); document.body.classList.add("lock"); };
    var closeMenu = function(){ mov.classList.remove("on"); burger.classList.remove("on"); document.body.classList.remove("lock"); };
    burger.addEventListener("click", function(){ mov.classList.contains("on") ? closeMenu() : openMenu(); });
    if(closeMov) closeMov.addEventListener("click", closeMenu);
    mov.querySelectorAll("a").forEach(function(a){ a.addEventListener("click", closeMenu); });
    document.addEventListener("keydown", function(e){ if(e.key === "Escape") closeMenu(); });
  }

  /* ---- Lightbox (gallery) ---- */
  (function(){
    var triggers = [].slice.call(document.querySelectorAll("[data-f]")),
        lb = document.getElementById("lb"),
        lI = document.getElementById("lbI");
    if(!lb || !triggers.length) return;
    var srcs = triggers.map(function(t){ return t.getAttribute("data-f"); }), ix = 0;
    function show(i){ ix = (i + srcs.length) % srcs.length; lI.src = srcs[ix]; }
    function open(i){ show(i); lb.classList.add("on"); document.body.classList.add("lock"); }
    function close(){ lb.classList.remove("on"); document.body.classList.remove("lock"); }
    triggers.forEach(function(t,i){ t.addEventListener("click", function(){ open(i); }); });
    var lbX = document.getElementById("lbX"), lbP = document.getElementById("lbP"), lbN = document.getElementById("lbN");
    if(lbX) lbX.addEventListener("click", close);
    if(lbP) lbP.addEventListener("click", function(){ show(ix - 1); });
    if(lbN) lbN.addEventListener("click", function(){ show(ix + 1); });
    lb.addEventListener("click", function(e){ if(e.target === lb) close(); });
    document.addEventListener("keydown", function(e){
      if(!lb.classList.contains("on")) return;
      if(e.key === "Escape") close();
      else if(e.key === "ArrowLeft") show(ix - 1);
      else if(e.key === "ArrowRight") show(ix + 1);
    });
  })();

  /* ============================================================
     Motion layer — GSAP + Lenis. Degrades gracefully if either
     the libraries are missing or reduced-motion is requested.
     A lightweight IntersectionObserver fallback handles reveals.
     ============================================================ */
  var hasGSAP = (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined");

  if(R || !hasGSAP){
    // Fallback: reveal everything with a simple observer so nothing stays hidden.
    var revealEls = document.querySelectorAll("[data-ru],[data-ri],.sh,.cb,.stat");
    if("IntersectionObserver" in window && !R){
      var io = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add("in"); io.unobserve(en.target); } });
      }, { threshold:0.12 });
      revealEls.forEach(function(el){ el.classList.add("obs"); io.observe(el); });
    }
    // Counters still animate cheaply.
    document.querySelectorAll("[data-c]").forEach(function(n){ n.textContent = (+n.getAttribute("data-c")).toLocaleString(); });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  /* ---- Lenis smooth scroll ---- */
  if(typeof Lenis !== "undefined"){
    var lenis = new Lenis({
      duration: 1.1,
      easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)); },
      smoothWheel: true,
      touchMultiplier: 1.5
    });
    function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(function(t){ lenis.raf(t * 1000); });
    gsap.ticker.lagSmoothing(0);
  }

  /* ---- Hero entrance ---- */
  var heroCt = document.querySelector(".hero__ct");
  if(heroCt){
    gsap.timeline({ delay:.5 })
      .from(".hero__eb",   { y:18, opacity:0, duration:.7, ease:"power3.out" })
      .from(".hero__h",    { y:26, opacity:0, duration:.9, ease:"power3.out" }, "-=0.4")
      .from(".hero__sub",  { y:16, opacity:0, duration:.7, ease:"power3.out" }, "-=0.5")
      .from(".hero__scroll",{ opacity:0, duration:.5, ease:"power2.out" }, "-=0.2");
  }

  /* ---- Page hero entrance ---- */
  var phCt = document.querySelector(".ph__ct");
  if(phCt){
    gsap.timeline({ delay:.3 })
      .from(".ph__eb",  { y:16, opacity:0, duration:.6, ease:"power3.out" })
      .from(".ph__h",   { y:22, opacity:0, duration:.8, ease:"power3.out" }, "-=0.35")
      .from(".ph__sub", { y:14, opacity:0, duration:.6, ease:"power3.out" }, "-=0.4");
  }

  /* ---- Fade-up reveals ---- */
  gsap.utils.toArray("[data-ru]").forEach(function(el){
    gsap.from(el, { y:32, opacity:0, duration:.9, ease:"power3.out",
      scrollTrigger:{ trigger:el, start:"top 88%" } });
  });

  /* ---- Image clip reveal + subtle zoom ---- */
  gsap.utils.toArray("[data-ri]").forEach(function(el){
    gsap.fromTo(el, { clipPath:"inset(0 0 100% 0)" }, { clipPath:"inset(0 0 0% 0)",
      duration:1.1, ease:"power3.out", scrollTrigger:{ trigger:el, start:"top 85%" } });
    var img = el.querySelector("img");
    if(img) gsap.fromTo(img, { scale:1.12 }, { scale:1, duration:1.4, ease:"power3.out",
      scrollTrigger:{ trigger:el, start:"top 85%" } });
  });

  /* ---- Parallax ---- */
  gsap.utils.toArray("[data-p]").forEach(function(el){
    gsap.fromTo(el, { yPercent:-6 }, { yPercent:6, ease:"none",
      scrollTrigger:{ trigger:el.parentElement || el, start:"top bottom", end:"bottom top", scrub:true } });
  });

  /* ---- Hero video subtle parallax drift ---- */
  var heroMedia = document.querySelector(".hero video.bg, .hero img.bg");
  if(heroMedia){
    gsap.to(".hero .bg", { yPercent:12, ease:"none",
      scrollTrigger:{ trigger:".hero", start:"top top", end:"bottom top", scrub:true } });
  }

  /* ---- Counters ---- */
  gsap.utils.toArray("[data-c]").forEach(function(n){
    var target = +n.getAttribute("data-c"), obj = { v:0 };
    gsap.to(obj, { v:target, duration:1.6, ease:"power2.out",
      scrollTrigger:{ trigger:n, start:"top 90%" },
      onUpdate:function(){ n.textContent = Math.round(obj.v).toLocaleString(); } });
  });

  /* ---- Marquee loop ---- */
  var mq = document.querySelector("[data-mq]");
  if(mq) gsap.to(mq, { x:-(mq.scrollWidth / 2), ease:"none", duration:22, repeat:-1 });

  /* ---- Section header stagger ---- */
  gsap.utils.toArray(".sh").forEach(function(sh){
    var eb = sh.querySelector(".sh__eb"), h = sh.querySelector(".sh__h"), s = sh.querySelector(".sh__s");
    var tl = gsap.timeline({ scrollTrigger:{ trigger:sh, start:"top 85%" } });
    if(eb) tl.from(eb, { y:14, opacity:0, duration:.5, ease:"power3.out" });
    if(h)  tl.from(h,  { y:18, opacity:0, duration:.6, ease:"power3.out" }, "-=0.25");
    if(s)  tl.from(s,  { y:12, opacity:0, duration:.5, ease:"power3.out" }, "-=0.25");
  });

  /* ---- Concept block stagger ---- */
  gsap.utils.toArray(".cb").forEach(function(cb){
    var img = cb.querySelector(".cb__img"), ct = cb.querySelector(".cb__ct");
    var tl = gsap.timeline({ scrollTrigger:{ trigger:cb, start:"top 80%" } });
    if(img) tl.from(img, { clipPath:"inset(0 0 100% 0)", duration:1.1, ease:"power3.out" });
    if(ct)  tl.from(ct.children, { y:20, opacity:0, duration:.6, stagger:.08, ease:"power3.out" }, "-=0.5");
  });

  /* ---- Stat underline draw ---- */
  gsap.utils.toArray(".stat__line").forEach(function(l){
    gsap.from(l, { width:0, duration:.7, ease:"power2.out",
      scrollTrigger:{ trigger:l, start:"top 88%" } });
  });

  /* ---- Location rows stagger ---- */
  gsap.utils.toArray(".locs").forEach(function(locs){
    gsap.from(locs.querySelectorAll(".loc"), { y:16, opacity:0, duration:.5, stagger:.04, ease:"power3.out",
      scrollTrigger:{ trigger:locs, start:"top 85%" } });
  });

  /* ---- Menu categories stagger ---- */
  gsap.utils.toArray(".md").forEach(function(md){
    gsap.from(md.querySelectorAll(".mcat"), { y:18, opacity:0, duration:.5, stagger:.06, ease:"power3.out",
      scrollTrigger:{ trigger:md, start:"top 85%" } });
  });

  /* Recalculate once fonts/images settle so triggers stay accurate */
  window.addEventListener("load", function(){ ScrollTrigger.refresh(); });
})();
