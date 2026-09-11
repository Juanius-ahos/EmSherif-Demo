/* ============================================================
   EM SHERIF RESTAURANT — INTERACTIVE SCRIPT
   Lenis + GSAP + Custom Cursor + Editorial Animations
   ============================================================ */
(function(){
  "use strict";

  var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var isMobile = window.innerWidth < 1024;

  /* ---- LENIS SMOOTH SCROLL ---- */
  var lenis = new Lenis({ duration:1.2, easing:function(t){return Math.min(1,1.001-Math.pow(2,-10*t))}, smoothWheel:true });
  function raf(time){ lenis.raf(time); requestAnimationFrame(raf); }
  requestAnimationFrame(raf);
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(function(t){ lenis.raf(t*1000); });
  gsap.ticker.lagSmoothing(0);

  /* ---- PRELOADER ---- */
  window.addEventListener("load", function(){
    setTimeout(function(){
      var pl = document.getElementById("preloader");
      if(pl) pl.classList.add("done");
    }, 2200);
  });

  /* ---- PROGRESS BAR ---- */
  var prog = document.getElementById("progress");
  function updateProgress(){
    var h = document.documentElement.scrollHeight - innerHeight;
    prog.style.width = (h > 0 ? (scrollY / h * 100) : 0) + "%";
  }
  addEventListener("scroll", updateProgress, {passive:true});
  updateProgress();

  /* ---- NAV SCROLL ---- */
  var nav = document.getElementById("nav");
  function onScroll(){ nav.classList.toggle("scrolled", scrollY > 60); }
  onScroll();
  addEventListener("scroll", onScroll, {passive:true});

  /* ---- CUSTOM CURSOR ---- */
  if(!isMobile){
    var cursor = document.getElementById("cursor");
    var dot = cursor.querySelector(".cursor-dot");
    var ring = cursor.querySelector(".cursor-ring");
    var mx = 0, my = 0, cx = 0, cy = 0;

    document.addEventListener("mousemove", function(e){
      mx = e.clientX; my = e.clientY;
      dot.style.left = mx + "px"; dot.style.top = my + "px";
    });

    function animCursor(){
      cx += (mx - cx) * 0.12;
      cy += (my - cy) * 0.12;
      ring.style.left = cx + "px";
      ring.style.top = cy + "px";
      requestAnimationFrame(animCursor);
    }
    animCursor();

    var hoverEls = document.querySelectorAll("a, button, .gallery__item, .recog__card, .loc__row, [data-open-menu]");
    hoverEls.forEach(function(el){
      el.addEventListener("mouseenter", function(){ cursor.classList.add("hovering"); });
      el.addEventListener("mouseleave", function(){ cursor.classList.remove("hovering"); });
    });

    document.addEventListener("mousedown", function(){ cursor.classList.add("press"); });
    document.addEventListener("mouseup", function(){ cursor.classList.remove("press"); });
  }

  /* ---- MOBILE MENU ---- */
  var burger = document.getElementById("burger");
  var moverlay = document.getElementById("moverlay");
  var closeOv = document.getElementById("closeOverlay");

  burger.addEventListener("click", function(){
    moverlay.classList.add("open");
    burger.classList.add("open");
    document.body.classList.add("noscroll");
  });
  closeOv.addEventListener("click", function(){
    moverlay.classList.remove("open");
    burger.classList.remove("open");
    document.body.classList.remove("noscroll");
  });
  moverlay.querySelectorAll("a").forEach(function(a){
    a.addEventListener("click", function(){
      moverlay.classList.remove("open");
      burger.classList.remove("open");
      document.body.classList.remove("noscroll");
    });
  });

  /* ---- MENU OVERLAY ---- */
  var menuOverlay = document.getElementById("menuOverlay");
  var tabs = document.querySelectorAll(".mo__tab");
  var views = document.querySelectorAll("[data-view]");

  function openMenu(){
    menuOverlay.classList.add("open");
    document.body.classList.add("noscroll");
    menuOverlay.scrollTop = 0;
    try{ history.replaceState(null,"","#menu"); }catch(e){}
  }
  function closeMenu(){
    menuOverlay.classList.remove("open");
    document.body.classList.remove("noscroll");
    try{ history.replaceState(null,"","#top"); }catch(e){}
  }

  document.querySelectorAll("[data-open-menu]").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      moverlay.classList.remove("open");
      burger.classList.remove("open");
      document.body.classList.remove("noscroll");
      openMenu();
    });
  });

  document.querySelectorAll("[data-close-menu]").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      closeMenu();
    });
  });

  document.querySelectorAll("[data-go-reserve]").forEach(function(el){
    el.addEventListener("click", function(e){
      e.preventDefault();
      closeMenu();
      setTimeout(function(){
        var r = document.getElementById("reserve");
        if(r) lenis.scrollTo(r, {offset:-40});
      }, 400);
    });
  });

  tabs.forEach(function(tab){
    tab.addEventListener("click", function(){
      var v = tab.getAttribute("data-tab");
      tabs.forEach(function(t){ t.classList.toggle("active", t === tab); });
      views.forEach(function(view){ view.hidden = view.getAttribute("data-view") !== v; });
    });
  });

  if(location.hash === "#menu") openMenu();
  document.addEventListener("keydown", function(e){
    if(e.key === "Escape" && menuOverlay.classList.contains("open")) closeMenu();
  });

  /* ---- TEXT REVEAL ANIMATION (GSAP) ---- */
  if(!reduce){
    /* Hero load sequence */
    var heroTl = gsap.timeline({ delay:2.4, defaults:{ease:"power4.out"} });
    heroTl
      .from(".hero__title .line span", { yPercent:115, duration:1.2, stagger:0.12 })
      .from(".hero__eyebrow", { y:20, opacity:0, duration:0.8 }, "-=0.9")
      .from(".hero__ar", { yPercent:30, opacity:0, duration:1 }, "-=1")
      .from(".hero__desc", { y:20, opacity:0, duration:0.8 }, "-=0.7")
      .from(".hero__ctas", { y:20, opacity:0, duration:0.8 }, "-=0.6")
      .from(".hero__meta span", { y:-12, opacity:0, duration:0.6, stagger:0.08 }, "-=1")
      .from(".hero__scroll", { opacity:0, duration:0.8 }, "-=0.4");

    /* Reveal-up on scroll */
    gsap.utils.toArray("[data-reveal-up]").forEach(function(el){
      gsap.from(el, {
        y:36, opacity:0, duration:1.1, ease:"power3.out",
        scrollTrigger:{ trigger:el, start:"top 88%" }
      });
    });

    /* Image reveal: clip-path unmask */
    gsap.utils.toArray("[data-reveal-img]").forEach(function(el){
      var img = el.querySelector("img") || el;
      gsap.fromTo(el,
        { clipPath:"inset(0 0 100% 0)" },
        { clipPath:"inset(0 0 0% 0)", duration:1.4, ease:"power3.out",
          scrollTrigger:{ trigger:el, start:"top 85%" }
        }
      );
      gsap.fromTo(img,
        { scale:1.2 },
        { scale:1, duration:1.7, ease:"power3.out",
          scrollTrigger:{ trigger:el, start:"top 85%" }
        }
      );
    });

    /* Parallax on [data-parallax] */
    gsap.utils.toArray("[data-parallax]").forEach(function(el){
      gsap.fromTo(el,
        { yPercent:-8 },
        { yPercent:8, ease:"none",
          scrollTrigger:{ trigger:el.parentElement, start:"top bottom", end:"bottom top", scrub:true }
        }
      );
    });

    /* Parallax text (manifesto bg) */
    gsap.utils.toArray("[data-parallax-text]").forEach(function(el){
      gsap.fromTo(el,
        { yPercent:-20 },
        { yPercent:20, ease:"none",
          scrollTrigger:{ trigger:el.parentElement, start:"top bottom", end:"bottom top", scrub:true }
        }
      );
    });

    /* Counter animation */
    gsap.utils.toArray("[data-count]").forEach(function(node){
      var end = +node.getAttribute("data-count");
      var isYear = end > 1000;
      var o = { v: isYear ? 2000 : 0 };
      gsap.to(o, {
        v: end, duration:2, ease:"power2.out",
        scrollTrigger:{ trigger:node, start:"top 92%" },
        onUpdate: function(){ node.textContent = Math.round(o.v); }
      });
    });

    /* Gallery horizontal scroll */
    var galleryScroll = document.querySelector("[data-gallery-scroll]");
    var galleryTrack = document.querySelector("[data-gallery-track]");
    if(galleryScroll && galleryTrack){
      var totalScroll = galleryTrack.scrollWidth - galleryScroll.offsetWidth;
      gsap.to(galleryTrack, {
        x: -totalScroll,
        ease:"none",
        scrollTrigger:{
          trigger:galleryScroll,
          start:"top 70%",
          end:"bottom 30%",
          scrub:1.5,
          invalidateOnRefresh:true
        }
      });
    }

    /* Marquee continuous scroll */
    var marqueeEl = document.querySelector("[data-marquee]");
    if(marqueeEl){
      var marqueeW = marqueeEl.scrollWidth / 2;
      gsap.to(marqueeEl, {
        x: -marqueeW,
        ease:"none",
        duration:20,
        repeat:-1
      });
    }
  }

  /* ---- LIGHTBOX ---- */
  var tiles = [].slice.call(document.querySelectorAll(".gallery__item"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var srcs = tiles.map(function(t){ return t.getAttribute("data-full"); });
  var alts = tiles.map(function(t){ var i = t.querySelector("img"); return i ? i.alt : ""; });
  var idx = 0;

  function showLb(i){ idx = (i + srcs.length) % srcs.length; lbImg.src = srcs[idx]; lbImg.alt = alts[idx]; }
  function openLb(i){ showLb(i); lb.classList.add("open"); document.body.style.overflow = "hidden"; }
  function closeLb(){ lb.classList.remove("open"); document.body.style.overflow = ""; }

  tiles.forEach(function(t, i){
    t.addEventListener("click", function(){ openLb(i); });
  });
  document.getElementById("lbClose").addEventListener("click", closeLb);
  document.getElementById("lbPrev").addEventListener("click", function(){ showLb(idx - 1); });
  document.getElementById("lbNext").addEventListener("click", function(){ showLb(idx + 1); });
  lb.addEventListener("click", function(e){ if(e.target === lb) closeLb(); });
  document.addEventListener("keydown", function(e){
    if(!lb.classList.contains("open")) return;
    if(e.key === "Escape") closeLb();
    else if(e.key === "ArrowLeft") showLb(idx - 1);
    else if(e.key === "ArrowRight") showLb(idx + 1);
  });

})();
