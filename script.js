/* ============================================================
   EM SHERIF — Cinematic Script
   ============================================================ */
(function(){
  "use strict";

  var prefersReduced = window.matchMedia("(prefers-reduced-motion:reduce)").matches;
  var isMobile = window.innerWidth < 1024;

  /* ---- Preloader ---- */
  function hidePreloader(){
    var p = document.getElementById("pl");
    if(p) p.classList.add("done");
  }
  window.addEventListener("load", function(){ setTimeout(hidePreloader, 600) });
  setTimeout(hidePreloader, 3500);

  /* ---- Progress Bar ---- */
  var prog = document.getElementById("prog");
  if(prog){
    function updateProgress(){
      var h = document.documentElement.scrollHeight - innerHeight;
      prog.style.width = (h > 0 ? (scrollY / h * 100) : 0) + "%";
    }
    addEventListener("scroll", updateProgress, {passive:true});
    updateProgress();
  }

  /* ---- Nav Scroll ---- */
  var nav = document.getElementById("nav");
  if(nav){
    function toggleNav(){ nav.classList.toggle("sc", scrollY > 60) }
    toggleNav();
    addEventListener("scroll", toggleNav, {passive:true});
  }

  /* ---- Mobile Menu ---- */
  var burger = document.getElementById("burger");
  var mov = document.getElementById("mov");
  var closeMov = document.getElementById("closeMov");
  if(burger && mov && closeMov){
    burger.addEventListener("click", function(){
      mov.classList.add("on");
      burger.classList.add("on");
      document.body.classList.add("lock");
    });
    closeMov.addEventListener("click", function(){
      mov.classList.remove("on");
      burger.classList.remove("on");
      document.body.classList.remove("lock");
    });
    mov.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        mov.classList.remove("on");
        burger.classList.remove("on");
        document.body.classList.remove("lock");
      });
    });
  }

  /* ---- Skip animations if reduced motion ---- */
  if(typeof gsap === "undefined" || typeof ScrollTrigger === "undefined" || typeof Lenis === "undefined") return;
  if(prefersReduced) return;

  /* ---- Smooth Scroll (Lenis) ---- */
  var lenis = new Lenis({
    duration: 1.2,
    easing: function(t){ return Math.min(1, 1.001 - Math.pow(2, -10 * t)) },
    smoothWheel: true,
    touchMultiplier: 1.5
  });

  function raf(time){
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function(t){ lenis.raf(t * 1000) });
  gsap.ticker.lagSmoothing(0);

  /* ---- Scroll Reveal: Fade Up ---- */
  gsap.utils.toArray("[data-ru]").forEach(function(el){
    gsap.from(el, {
      y: 36,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });
  });

  /* ---- Scroll Reveal: Image Curtain ---- */
  gsap.utils.toArray("[data-ri]").forEach(function(el){
    var overlay = el.querySelector("::after");
    gsap.fromTo(el,
      { clipPath: "inset(0 0 100% 0)" },
      {
        clipPath: "inset(0 0 0% 0)",
        duration: 1.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none none"
        }
      }
    );
    var img = el.querySelector("img");
    if(img){
      gsap.fromTo(img,
        { scale: 1.15 },
        {
          scale: 1,
          duration: 1.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 82%",
            toggleActions: "play none none none"
          }
        }
      );
    }
  });

  /* ---- Parallax ---- */
  gsap.utils.toArray("[data-p]").forEach(function(el){
    gsap.fromTo(el,
      { yPercent: -6 },
      {
        yPercent: 6,
        ease: "none",
        scrollTrigger: {
          trigger: el.parentElement || el,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.5
        }
      }
    );
  });

  /* ---- Counter Animation ---- */
  gsap.utils.toArray("[data-c]").forEach(function(el){
    var target = +el.getAttribute("data-c");
    var obj = { v: 0 };
    gsap.to(obj, {
      v: target,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 88%",
        toggleActions: "play none none none"
      },
      onUpdate: function(){
        el.textContent = Math.round(obj.v).toLocaleString();
      }
    });
  });

  /* ---- Marquee ---- */
  var mq = document.querySelector("[data-mq]");
  if(mq){
    gsap.to(mq, {
      x: -(mq.scrollWidth / 2),
      ease: "none",
      duration: 25,
      repeat: -1
    });
  }

  /* ---- Hero Animations ---- */
  var heroCt = document.querySelector(".hero__ct");
  if(heroCt){
    var heroTl = gsap.timeline({delay: 0.8});
    heroTl
      .from(".hero__eb", {y: 20, opacity: 0, duration: 0.8, ease: "power3.out"})
      .from(".hero__h", {y: 30, opacity: 0, duration: 1, ease: "power3.out"}, "-=0.5")
      .from(".hero__sub", {y: 20, opacity: 0, duration: 0.8, ease: "power3.out"}, "-=0.6")
      .from(".hero__scroll", {opacity: 0, duration: 0.6, ease: "power2.out"}, "-=0.3");
  }

  /* ---- Section Header Stagger ---- */
  gsap.utils.toArray(".sh").forEach(function(sh){
    var eb = sh.querySelector(".sh__eb");
    var h = sh.querySelector(".sh__h");
    var s = sh.querySelector(".sh__s");
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: sh,
        start: "top 85%",
        toggleActions: "play none none none"
      }
    });
    if(eb) tl.from(eb, {y: 16, opacity: 0, duration: 0.6, ease: "power3.out"});
    if(h) tl.from(h, {y: 20, opacity: 0, duration: 0.7, ease: "power3.out"}, "-=0.3");
    if(s) tl.from(s, {y: 14, opacity: 0, duration: 0.6, ease: "power3.out"}, "-=0.3");
  });

  /* ---- Concept Block Stagger ---- */
  gsap.utils.toArray(".cb").forEach(function(cb){
    var img = cb.querySelector(".cb__img");
    var ct = cb.querySelector(".cb__ct");
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: cb,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });
    if(img) tl.from(img, {clipPath: "inset(0 0 100% 0)", duration: 1.2, ease: "power3.out"});
    if(ct){
      var children = ct.children;
      tl.from(children, {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: "power3.out"
      }, "-=0.6");
    }
  });

  /* ---- Location Row Hover ---- */
  gsap.utils.toArray(".loc").forEach(function(loc){
    loc.addEventListener("mouseenter", function(){
      gsap.to(loc, {paddingLeft: 14, duration: 0.4, ease: "power2.out"});
    });
    loc.addEventListener("mouseleave", function(){
      gsap.to(loc, {paddingLeft: 0, duration: 0.4, ease: "power2.out"});
    });
  });

  /* ---- Stat Line Grow ---- */
  gsap.utils.toArray(".stat__line").forEach(function(line){
    gsap.from(line, {
      width: 0,
      duration: 0.8,
      ease: "power2.out",
      scrollTrigger: {
        trigger: line,
        start: "top 88%",
        toggleActions: "play none none none"
      }
    });
  });

  /* ---- Lightbox ---- */
  var thumbs = [].slice.call(document.querySelectorAll("[data-f]"));
  var lb = document.getElementById("lb");
  var lbImg = document.getElementById("lbI");

  if(lb && thumbs.length){
    var srcs = thumbs.map(function(t){ return t.getAttribute("data-f") });
    var ix = 0;

    function showSlide(i){
      ix = (i + srcs.length) % srcs.length;
      lbImg.src = srcs[ix];
    }
    function openLb(i){
      showSlide(i);
      lb.classList.add("on");
      document.body.classList.add("lock");
    }
    function closeLb(){
      lb.classList.remove("on");
      document.body.classList.remove("lock");
    }

    thumbs.forEach(function(t, i){
      t.addEventListener("click", function(){ openLb(i) });
    });

    var lbX = document.getElementById("lbX");
    var lbP = document.getElementById("lbP");
    var lbN = document.getElementById("lbN");

    if(lbX) lbX.addEventListener("click", closeLb);
    if(lbP) lbP.addEventListener("click", function(){ showSlide(ix - 1) });
    if(lbN) lbN.addEventListener("click", function(){ showSlide(ix + 1) });

    lb.addEventListener("click", function(e){
      if(e.target === lb) closeLb();
    });

    document.addEventListener("keydown", function(e){
      if(!lb.classList.contains("on")) return;
      if(e.key === "Escape") closeLb();
      else if(e.key === "ArrowLeft") showSlide(ix - 1);
      else if(e.key === "ArrowRight") showSlide(ix + 1);
    });
  }

})();
