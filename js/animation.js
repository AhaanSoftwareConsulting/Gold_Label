window.addEventListener("load", () => {
  gsap.registerPlugin(ScrollTrigger);

  const introLogo = document.getElementById("introLogo");
  const headerLogo = document.getElementById("headerLogo");
  const overlay = document.getElementById("introOverlay");
  const deskMenu = document.getElementById("deskMenu");

  const hero = document.getElementById("hero");
  const heroText = document.getElementById("heroText");
  const heroButtons = document.getElementById("heroButtons");

  // HERO reveal text only
const heroRevealText = document.querySelectorAll("#hero .reveal-text");


  // Scroll reveal text (excluding hero)
  const scrollRevealTexts = document.querySelectorAll(
    "section .reveal-text:not(#hero .reveal-text)"
  );

  document.body.style.overflow = "hidden";

  /* --------------------
     LOGO POSITION CALC
  -------------------- */
  const introRect = introLogo.getBoundingClientRect();
  const headerRect = headerLogo.getBoundingClientRect();

  const deltaX =
    headerRect.left +
    headerRect.width / 2 -
    (introRect.left + introRect.width / 2);

  const deltaY =
    headerRect.top +
    headerRect.height / 2 -
    (introRect.top + introRect.height / 2);

  const scaleRatio = headerRect.width / introRect.width;

  /* --------------------
     INITIAL STATES
  -------------------- */
  gsap.set([deskMenu], { opacity: 0, y: 10 });
  gsap.from(hero, { opacity: 0, duration: 0.5 });
  gsap.set(heroText, { opacity: 0, y: 30 });
  gsap.set(heroButtons, { opacity: 0, y: 20 });

  gsap.set(heroRevealText, { clipPath: "inset(0 100% 0 0)" });
  gsap.set(scrollRevealTexts, { clipPath: "inset(0 100% 0 0)" });

  /* --------------------
     INTRO + HERO TIMELINE
  -------------------- */
  const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

  tl.to(introLogo, {
    x: deltaX,
    y: deltaY,
    scale: scaleRatio,
    duration: 1.6
  })
    .to(introLogo, { opacity: 0, duration: 0.3 })
    .set(overlay, { display: "none" })
    .set(headerLogo, { opacity: 1 })

    .to([deskMenu], {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.15
    })


    // Hero text color fill
    .to(heroRevealText, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.4,
      stagger: 0.25,
      ease: "power2.out"
    })

    .to(heroText, {
      opacity: 1,
      y: 0,
      duration: 0.6
    })

    .to(heroButtons, {
      opacity: 1,
      y: 0,
      duration: 0.5
    })

    .call(() => {
      document.body.style.overflow = "";
    });

  /* --------------------
     SCROLL TEXT COLOR FILL
  -------------------- */
  scrollRevealTexts.forEach(text => {
    const wrapper = text.closest(".reveal-wrapper") || text;

    gsap.to(text, {
      clipPath: "inset(0 0% 0 0)",
      duration: 1.2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: wrapper,
        start: "top 80%",
        once: true
      }
    });
  });

  /* --------------------
     SCROLL POSITION REVEALS
  -------------------- */

  const revealDefaults = {
  opacity: 0,
  duration: 1.4,              // ⬅ slower
  ease: "power3.out",         // ⬅ smoother
  scrollTrigger: {
    start: "top 85%",
    once: true
  }
};

  gsap.utils.toArray(".reveal, .reveal-up").forEach((el, i) => {
  gsap.from(el, {
    ...revealDefaults,
    y: 120,                   // ⬅ more travel = visible motion
    delay: i * 0.05,           // ⬅ soft stagger
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    }
  });
});


  gsap.utils.toArray(".reveal-left").forEach((el, i) => {
  gsap.from(el, {
    ...revealDefaults,
    x: -140,
    delay: i * 0.05,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    }
  });
});


  gsap.utils.toArray(".reveal-right").forEach((el, i) => {
  gsap.from(el, {
    ...revealDefaults,
    x: 140,
    delay: i * 0.05,
    scrollTrigger: {
      trigger: el,
      start: "top 85%",
      once: true
    }
  });
});


  /* --------------------
     BUTTON HOVER (REUSABLE)
  -------------------- */
  document.querySelectorAll(".gsap-btn").forEach(btn => {
    const layer = btn.querySelector(".gsap-layer");

    btn.addEventListener("mouseenter", () => {
      gsap.to(layer, {
        scale: 1.08,
        y: 2,
        duration: 0.3,
        ease: "power2.out"
      });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(layer, {
        scale: 1,
        y: 0,
        duration: 0.3,
        ease: "power2.out"
      });
    });
  });
});
