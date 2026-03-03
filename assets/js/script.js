gsap.registerPlugin(ScrollTrigger);

const DEV_MODE = false;

if (!DEV_MODE) {
  gsap.to(".splash-blob", {
    x: "random(-30, 30)",
    y: "random(-30, 30)",
    duration: 8,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
}

function initScrollAnimations() {
  // Hizmetler Başlığı Animasyonu
  gsap.fromTo(
    ".services-header-wrapper > *",
    { y: 40, opacity: 0 }, // Başlangıç noktası (Kesin gizli)
    {
      scrollTrigger: {
        trigger: ".section-services",
        start: "top 80%",
        // toggleActions'ı sildik ki yukarı aşağı kaydırınca bug'a girmesin, bir kere temizce dolsun.
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "power3.out",
      clearProps: "all", // Animasyon bitince temizlik yapar, CSS hover efektlerinin önünü açar
    },
  );

  // Hizmet Kartları Animasyonu
  gsap.fromTo(
    ".service-card",
    { y: 60, opacity: 0 }, // Başlangıç noktası (Kesin gizli)
    {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 85%",
      },
      y: 0,
      opacity: 1,
      duration: 0.8,
      stagger: 0.2,
      ease: "back.out(1.2)",
      clearProps: "all", // Çok önemli: Hover animasyonlarının (şeffaflaşma) takılmamasını sağlar
    },
  );

  ScrollTrigger.refresh();
}
const mm = gsap.matchMedia();
mm.add(
  { isDesktop: "(min-width: 768px)", isMobile: "(max-width: 767px)" },
  (context) => {
    let { isDesktop } = context.conditions;

    const mainContent = document.getElementById("main-content");
    const splashScreen = document.getElementById("splash-screen");

    document.body.classList.add("no-scroll");

    if (DEV_MODE) {
      splashScreen.style.display = "none";
      gsap.set(mainContent, { autoAlpha: 1 });
      document.body.classList.remove("no-scroll");
      initScrollAnimations();
      return;
    }

    // --- GEÇİŞ ÖNCESİ HAZIRLIK ---
    // Sayfa görünür olmadan önce elemanları animasyon başlangıç noktalarına gizliyoruz.
    gsap.set(mainContent, { opacity: 0 }); // Ana kapsayıcı şeffaf
    gsap.set(".navbar", { y: -30, opacity: 0 }); // Navbar yukarıda gizli
    gsap.set(".hero-content > *", { y: 40, opacity: 0, filter: "blur(10px)" }); // Yazılar aşağıda, şeffaf ve bulanık
    gsap.set(".hex-item, .dot-item", { scale: 0.5, opacity: 0 }); // 3D objeler küçük ve şeffaf

    const tl = gsap.timeline({
      defaults: { ease: "expo.out" },
      onComplete: () => {
        // --- GEÇİŞ ANİMASYONU ---
        // Splash ekranının kaybolması ve ana içeriğin belirmesi için yeni bir timeline
        const transitionTl = gsap.timeline({
          onComplete: () => {
            splashScreen.style.display = "none";
            document.body.classList.remove("no-scroll");
            initScrollAnimations();
          },
        });

        // 1. Ana içeriği görünür yap (opacity'si 0 olan çocukları etkilemez)
        gsap.set(mainContent, { autoAlpha: 1 });

        // 2. Splash ekranını eriterek kaybet
        transitionTl.to(
          splashScreen,
          {
            opacity: 0,
            duration: 0.8,
            ease: "power2.inOut",
          },
          0,
        );

        // 3. İçerik animasyonlarını splash erirken başlat
        // Navbar yukarıdan süzülür
        transitionTl.to(
          ".navbar",
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "power3.out",
          },
          0.1, // Splash erimeye başladıktan hemen sonra
        );

        // Yazılar blur efektinden çıkarak aşağıdan süzülür
        transitionTl.to(
          ".hero-content > *",
          {
            y: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            stagger: 0.15,
            ease: "expo.out",
          },
          0.3, // Navbar'dan hemen sonra başlar
        );

        // 3D Altıgenler hafif esneyerek (back.out) havalı bir şekilde belirir
        transitionTl.to(
          ".hex-item, .dot-item",
          {
            scale: 1,
            opacity: 1,
            duration: 1.5,
            stagger: 0.05,
            ease: "back.out(1.5)",
          },
          0.5, // Yazılardan biraz sonra
        );
      },
    });

    // --- SPLASH EKRANI KENDİ İÇ ANİMASYONLARI ---
    gsap.set(".mark-piece", {
      opacity: 0,
      scale: 0.6,
      filter: "blur(15px)",
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

// 3D Mouse Etkileşimi
document.addEventListener("DOMContentLoaded", () => {
  const honeycomb = document.getElementById("interactive-honeycomb");
  if (!honeycomb) return;
  const baseRotateX = 15;
  const baseRotateY = -15;
  const maxTilt = 8;

  document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    const mouseX = (e.clientX - centerX) / centerX;
    const mouseY = (e.clientY - centerY) / centerY;
    const rotateX = baseRotateX - mouseY * maxTilt;
    const rotateY = baseRotateY + mouseX * maxTilt;
    honeycomb.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });
});

//    Hamburger Menu
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.getElementById("hamburger");
  const navMenu = document.getElementById("nav-menu");

  // Hamburger tıklandığında menüyü aç/kapat
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
    document.body.classList.toggle("no-scroll"); // Menü açıkken arka plan kaymasın
  });

  // Menüdeki bir linke tıklandığında menüyü kapat
  document.querySelectorAll(".nav-link").forEach((n) =>
    n.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }),
  );
});
