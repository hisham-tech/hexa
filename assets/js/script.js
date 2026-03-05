// ==========================================================================
// HEXA DİJİTAL - AWWWARDS PREMIUM JS (60 FPS OPTIMIZED)
// ==========================================================================

// GSAP Plugin Kaydı
gsap.registerPlugin(ScrollTrigger);

const DEV_MODE = false; // Geliştirme aşamasındaysan true kalabilir, canlıda false yaparsın

// --------------------------------------------------------
// 1. SPLASH BLOB ANİMASYONU (Arka Plan Kayan Renkler)
// --------------------------------------------------------
if (!DEV_MODE) {
  gsap.to(".splash-blob", {
    x: "random(-30, 30)",
    y: "random(-30, 30)",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    force3D: true, // GPU Hızlandırması
  });
}

// --------------------------------------------------------
// 2. KAYDIRMA (SCROLL) ANİMASYONLARI (Ana Fonksiyon)
// --------------------------------------------------------
function initScrollAnimations() {
  const isDeviceMobile = window.innerWidth <= 992;

  // --- Sürecimiz Başlığı ---
  gsap.fromTo(
    ".services-header-wrapper > *",
    { y: 40, opacity: 0 },
    {
      scrollTrigger: { trigger: ".section-how-we-work", start: "top 80%" },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all",
    },
  );

  // --- Sürecimiz Kartları (Bento Grid) ---
  gsap.fromTo(
    ".hexa-card",
    { y: 60, opacity: 0 },
    {
      scrollTrigger: { trigger: ".hexa-bento-grid", start: "top 85%" },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
      clearProps: "all",
    },
  );

  // --- Kutusuz Hakkımızda Yazıları ---
  gsap.fromTo(
    ".manifesto-text-area > *, .fluid-stats > *",
    { y: 50, opacity: 0 },
    {
      scrollTrigger: { trigger: ".section-manifesto-fluid", start: "top 80%" },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.15,
      ease: "power3.out",
      clearProps: "all",
    },
  );

  // --- Kutusuz Devasa Footer İçi ---
  gsap.fromTo(
    ".footer-cta-wrapper > *",
    { y: 50, opacity: 0 },
    {
      scrollTrigger: { trigger: ".fluid-footer", start: "top 85%" },
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all",
    },
  );

  // --- Sinematik Görsel (Parallax) ---
  if (!isDeviceMobile) {
    gsap.fromTo(
      ".cinematic-image",
      { y: "-15%" },
      {
        scrollTrigger: {
          trigger: ".cinematic-image-wrapper",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
        y: "15%",
        ease: "none",
        force3D: true,
      },
    );
  }

  // --- Sinematik Görsel Çerçeve Belirmesi ---
  gsap.fromTo(
    ".cinematic-image-wrapper",
    {
      y: isDeviceMobile ? 50 : 100,
      opacity: 0,
      scale: isDeviceMobile ? 1 : 0.95,
    },
    {
      scrollTrigger: { trigger: ".section-cinematic-vision", start: "top 80%" },
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "expo.out",
      clearProps: "all",
    },
  );

  // --- Ekip Kartları (Grid Reveal) ---
  gsap.fromTo(
    ".team-card",
    { y: 60, opacity: 0 },
    {
      scrollTrigger: { trigger: ".team-badge-container", start: "top 85%" },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
      clearProps: "all",
    },
  );
  // --- ZIGZAG HİZMET DETAYLARI ANİMASYONU ---
  const zigzagRows = document.querySelectorAll(".zigzag-row");

  zigzagRows.forEach((row) => {
    const visual = row.querySelector(".z-visual");
    const contents = row.querySelectorAll(".z-content > *");
    const isReverse = row.classList.contains("reverse");

    // Görsel sağdan veya soldan (reverse durumuna göre) süzülerek gelir
    gsap.fromTo(
      visual,
      { x: isReverse ? 80 : -80, opacity: 0, scale: 0.95 },
      {
        scrollTrigger: { trigger: row, start: "top 80%" },
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "power3.out",
        clearProps: "all",
      },
    );

    // Yazılar aşağıdan teker teker (stagger) havalı bir şekilde çıkar
    gsap.fromTo(
      contents,
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: row, start: "top 80%" },
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        clearProps: "all",
      },
    );
  });
  // --- GÖRSEL VİTRİN (YATAY KAYDIRMA GALERİSİ) ---
  const galleryTrack = document.querySelector(".showcase-track");
  if (galleryTrack) {
    function getGalleryScroll() {
      let trackWidth = galleryTrack.scrollWidth;
      return -(trackWidth - window.innerWidth + window.innerWidth * 0.1);
    }
    gsap.to(galleryTrack, {
      x: getGalleryScroll,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: ".section-showcase-gallery",
        start: "top center",
        end: "bottom top",
        scrub: 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // --- DEVASA TİPOGRAFİ (YATAY AKIŞ / PINNED SCROLL) ---
  const giantTrack = document.querySelector(".giant-type-track");
  if (giantTrack) {
    function getScrollAmount() {
      let trackWidth = giantTrack.scrollWidth;
      return -(trackWidth - window.innerWidth + window.innerWidth * 0.1);
    }
    gsap.to(giantTrack, {
      x: getScrollAmount,
      ease: "none",
      force3D: true,
      scrollTrigger: {
        trigger: ".section-giant-type",
        start: "top top",
        end: () => `+=${giantTrack.scrollWidth}`,
        pin: true,
        scrub: isDeviceMobile ? 0.5 : 1,
        invalidateOnRefresh: true,
      },
    });
  }

  // ========================================================
  // KENDİ OLUŞTURDUĞUMUZ SCROLLBAR (SÜRÜKLENEBİLİR & TIKLANABİLİR)
  // ========================================================
  const customScrollbar = document.getElementById("custom-scrollbar");
  const customThumb = document.getElementById("custom-scroll-thumb");

  if (customScrollbar && customThumb) {
    customScrollbar.style.opacity = "1";
    customScrollbar.style.visibility = "visible";

    function updateThumbHeight() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      if (documentHeight <= windowHeight) {
        customScrollbar.style.display = "none";
        return;
      }
      customScrollbar.style.display = "block";
      const ratio = windowHeight / documentHeight;
      customThumb.style.height = `${ratio * 100}vh`;
    }

    updateThumbHeight();
    window.addEventListener("resize", updateThumbHeight);

    gsap.to(customThumb, {
      y: () => window.innerHeight - customThumb.offsetHeight,
      ease: "none",
      scrollTrigger: {
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        invalidateOnRefresh: true,
      },
    });

    let isDragging = false;
    let startY = 0;
    let startScrollTop = 0;

    customThumb.addEventListener("mousedown", (e) => {
      isDragging = true;
      startY = e.clientY;
      startScrollTop = window.scrollY || document.documentElement.scrollTop;
      document.body.style.userSelect = "none";
      customThumb.style.backgroundColor = "#fff";
    });

    window.addEventListener("mousemove", (e) => {
      if (!isDragging) return;
      e.preventDefault();
      const deltaY = e.clientY - startY;
      const trackHeight = window.innerHeight - customThumb.offsetHeight;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollRatio = scrollableHeight / trackHeight;

      window.scrollTo({
        top: startScrollTop + deltaY * scrollRatio,
        behavior: "auto",
      });
    });

    window.addEventListener("mouseup", () => {
      if (isDragging) {
        isDragging = false;
        document.body.style.userSelect = "";
        customThumb.style.backgroundColor = "var(--neon-mint)";
      }
    });

    customScrollbar.addEventListener("click", (e) => {
      if (e.target === customThumb) return;

      const trackHeight = window.innerHeight - customThumb.offsetHeight;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const clickY = e.clientY - customThumb.offsetHeight / 2;
      const clickRatio = clickY / trackHeight;

      window.scrollTo({
        top: clickRatio * scrollableHeight,
        behavior: "smooth",
      });
    });
  }

  ScrollTrigger.refresh();
} // initScrollAnimations Bitişi

// --------------------------------------------------------
// 3. SPLASH EKRANI VE ANA GEÇİŞ MANTIĞI
// --------------------------------------------------------
const mm = gsap.matchMedia();

mm.add(
  { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
  (context) => {
    let { isDesktop, isMobile } = context.conditions;

    const mainContent = document.getElementById("main-content");
    const splashScreen = document.getElementById("splash-screen");

    document.body.classList.add("no-scroll");

    if (DEV_MODE) {
      if (splashScreen) splashScreen.style.display = "none";
      gsap.set(mainContent, { autoAlpha: 1 });
      document.body.classList.remove("no-scroll");
      initScrollAnimations();
      return;
    }

    gsap.set(mainContent, { opacity: 0 });
    gsap.set(".navbar", { y: -30, opacity: 0 });

    const startBlur = isMobile ? "blur(0px)" : "blur(10px)";
    gsap.set(".hero-content-wrapper > *", {
      y: 40,
      opacity: 0,
      filter: startBlur,
    });
    gsap.set(".hex-item, .dot-item", { scale: 0.5, opacity: 0 });

    const tl = gsap.timeline({
      defaults: { ease: "expo.out", force3D: true },
      onComplete: () => {
        const transitionTl = gsap.timeline({
          onComplete: () => {
            if (splashScreen) splashScreen.style.display = "none";
            document.body.classList.remove("no-scroll");
            initScrollAnimations();
          },
        });

        gsap.set(mainContent, { autoAlpha: 1 });

        transitionTl.to(
          splashScreen,
          { opacity: 0, duration: 0.8, ease: "power2.inOut" },
          0,
        );
        transitionTl.to(
          ".navbar",
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
            clearProps: "all",
          },
          0.1,
        );
        transitionTl.to(
          ".hero-content-wrapper > *",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: 0.15,
            ease: "expo.out",
            clearProps: "all",
          },
          0.3,
        );
        transitionTl.to(
          ".hex-item, .dot-item",
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: "back.out(1.5)",
          },
          0.5,
        );
      },
    });

    const splashMarkBlur = isMobile ? "blur(0px)" : "blur(15px)";
    gsap.set(".mark-piece", {
      opacity: 0,
      scale: 0.6,
      filter: splashMarkBlur,
      transformOrigin: "center",
    });

    if (isDesktop) {
      gsap.set("#textBlock", { width: 0, height: "auto", opacity: 0 });
    } else {
      gsap.set("#textBlock", { width: "auto", height: 0, opacity: 0 });
    }

    tl.to("#aurora", { opacity: 0.8, duration: 1.2 }, 0);
    tl.to(
      ".mark-piece",
      {
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: { amount: 0.5, from: "center" },
      },
      0.2,
    );

    if (isDesktop) {
      tl.to(
        "#textBlock",
        { width: "auto", opacity: 1, duration: 1.4, ease: "expo.inOut" },
        1.0,
      );
    } else {
      tl.to(
        "#textBlock",
        { height: "auto", opacity: 1, duration: 1.4, ease: "expo.inOut" },
        1.0,
      );
    }

    tl.fromTo(
      "#hexa",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 },
      1.2,
    );
    tl.to(
      "#dijital",
      { opacity: 1, x: 0, duration: 1.0, ease: "power2.out" },
      1.6,
    );

    return () => {
      tl.kill();
    };
  },
);

// --------------------------------------------------------
// 4. 3D MOUSE ETKİLEŞİMİ (Ana Petek)
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const honeycomb = document.getElementById("interactive-honeycomb");
  if (!honeycomb) return;

  const baseRotateX = 15;
  const baseRotateY = -15;
  const maxTilt = 8;
  let rafId = null;

  document.addEventListener("mousemove", (e) => {
    if (window.innerWidth < 768) return;

    if (rafId) cancelAnimationFrame(rafId);

    rafId = requestAnimationFrame(() => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const mouseX = (e.clientX - centerX) / centerX;
      const mouseY = (e.clientY - centerY) / centerY;

      const rotateX = baseRotateX - mouseY * maxTilt;
      const rotateY = baseRotateY + mouseX * maxTilt;

      honeycomb.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
  });
});

// --------------------------------------------------------
// 5. HAMBURGER MENÜ YÖNETİMİ
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  if (!hamburger || !navMenu) return;

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll");
  });

  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }),
  );
});

// --------------------------------------------------------
// 6. LOTTIE AKILLI OYNATICI (Mobil İçin Odak Modu)
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const bentoCards = document.querySelectorAll(".hexa-card");
  if (bentoCards.length === 0) return;

  const isMobile = window.matchMedia("(max-width: 992px)").matches;

  const mobileObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const lottie = entry.target.querySelector("dotlottie-player");
        if (!lottie) return;

        if (entry.isIntersecting) {
          document
            .querySelectorAll(".hexa-card dotlottie-player")
            .forEach((p) => {
              if (p !== lottie) p.pause();
            });
          lottie.play();
        } else {
          lottie.pause();
        }
      });
    },
    {
      rootMargin: "-35% 0px -35% 0px",
      threshold: 0,
    },
  );

  bentoCards.forEach((card) => {
    setTimeout(() => {
      const lottie = card.querySelector("dotlottie-player");
      if (!lottie) return;

      lottie.pause();

      if (!isMobile) {
        card.addEventListener("mouseenter", () => lottie.play());
        card.addEventListener("mouseleave", () => {
          lottie.pause();
        });
      } else {
        mobileObserver.observe(card);
      }
    }, 500);
  });
});

// --------------------------------------------------------
// 7. AKORDEON GALERİ MANTIĞI
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const panels = document.querySelectorAll(".acc-panel");
  panels.forEach((panel) => {
    panel.addEventListener("click", () => {
      if (panel.classList.contains("active")) return;
      panels.forEach((p) => p.classList.remove("active"));
      panel.classList.add("active");
    });
  });
});

// --------------------------------------------------------
// 8. S.S.S. (DEVASA KUTULU AKORDEON MANTIĞI)
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    if (!question) return;

    question.addEventListener("click", () => {
      const isActive = item.classList.contains("active");
      const answer = item.querySelector(".faq-answer");

      if (isActive) {
        item.classList.remove("active");
        answer.style.maxHeight = null;
      } else {
        faqItems.forEach((otherItem) => {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = null;
        });

        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});

// --------------------------------------------------------
// 9. DİKEY HUD PROGRESS BAR (Sol Alt Kaydırma Çubuğu)
// --------------------------------------------------------
document.addEventListener("DOMContentLoaded", () => {
  const hudProgressFill = document.getElementById("hud-progress-fill");

  if (hudProgressFill) {
    window.addEventListener("scroll", () => {
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      let progress = (scrolled / scrollableHeight) * 100;
      hudProgressFill.style.height = `${progress}%`;
    });
  }
});

// --------------------------------------------------------
// 10. FPS SAYACI (GELİŞTİRİCİ TESTİ)
// --------------------------------------------------------
// Canlıya çıkarken bu kısmı silebilirsin
// (function () {
//   var script = document.createElement("script");
//   script.onload = function () {
//     var stats = new Stats();
//     document.body.appendChild(stats.dom);
//     requestAnimationFrame(function loop() {
//       stats.update();
//       requestAnimationFrame(loop);
//     });
//   };
//   script.src = "//mrdoob.github.io/stats.js/build/stats.min.js";
//   document.head.appendChild(script);
// })();
