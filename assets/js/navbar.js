export function initNavbar() {
  if (typeof gsap === "undefined") return;
  if (typeof SplitText === "undefined") return;
  if (typeof window.jQuery === "undefined") return;

  const $ = window.jQuery;
  gsap.registerPlugin(SplitText);

  const $header = $("#siteHeader");
  const $menuToggle = $("#menuToggle");
  const $fullWidthMenu = $("#fullWidthMenu");
  const $overlayMenuContent = $fullWidthMenu.find(".overlay-menu-content");
  const $overlayLinks = $fullWidthMenu.find(".overlay-nav-list li a");
  const $overlayImages = $fullWidthMenu.find(".overlay-menu-image");

  if (!$header.length || !$menuToggle.length || !$fullWidthMenu.length) return;

  const $toggleLines = $menuToggle.find("span");
  const $lineTop = $toggleLines.eq(0);
  const $lineMiddle = $toggleLines.eq(1);
  const $lineBottom = $toggleLines.eq(2);

  let splitInitialized = false;
  let splitInstances = [];
  let isOpen = false;
  let isAnimating = false;
  let lastActiveImageIndex = 0;

  const getHeaderTargetWidth = () => (window.matchMedia("(max-width: 768px)").matches ? "96%" : "30%");

  const initIntroAnimation = () => {
    gsap.set($header.find(".header-logo, .menu-toggle"), { autoAlpha: 0, y: 10 });
    gsap.set($fullWidthMenu, {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      visibility: "hidden",
      autoAlpha: 0,
      pointerEvents: "none",
      height: 0,
    });

    gsap.set($overlayMenuContent, { autoAlpha: 0, y: 24 });
    gsap.set($overlayImages, { autoAlpha: 0, scale: 1.05 });
    gsap.set($overlayImages.eq(0), { autoAlpha: 1, scale: 1 });

    gsap
      .timeline({ delay: 0.2 })
      .fromTo($header, { width: "6.25rem" }, { width: getHeaderTargetWidth(), duration: 1.25, ease: "power3.out" })
      .to($header.find(".header-logo, .menu-toggle"), { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "<0.5");
  };

  const createSplitTextForLinks = () => {
    if (splitInitialized) return;
    splitInitialized = true;

    splitInstances.forEach((split) => split.revert());
    splitInstances = [];

    $overlayLinks.each(function () {
      const $link = $(this);
      const split = new SplitText(this, { type: "lines" });
      splitInstances.push(split);
      const lines = split.lines || [];

      $link.empty();
      lines.forEach((line) => {
        const text = line.textContent;
        const mask = document.createElement("span");
        mask.className = "mask";

        const inner = document.createElement("span");
        inner.className = "line-inner";
        inner.textContent = text;

        const hoverInner = document.createElement("span");
        hoverInner.className = "line-inner hover";
        hoverInner.textContent = text;

        mask.appendChild(inner);
        mask.appendChild(hoverInner);
        $link[0].appendChild(mask);
      });
    });

    gsap.set($overlayMenuContent.find(".line-inner.hover"), {
      yPercent: 100,
      autoAlpha: 0,
    });
    gsap.set($overlayMenuContent.find(".line-inner:not(.hover)"), {
      yPercent: 100,
      autoAlpha: 0,
    });
  };

  const animateToggleToX = () => {
    const tl = gsap.timeline();
    tl.to($lineMiddle, { autoAlpha: 0, duration: 0.2, ease: "power2.out" });
    tl.to($lineTop, { y: 6, rotation: 45, duration: 0.35, ease: "power2.out" }, "<0.1");
    tl.to($lineBottom, { y: -6, rotation: -45, duration: 0.35, ease: "power2.out" }, "<");
  };

  const animateToggleToHamburger = (timeline) => {
    timeline.to($lineMiddle, { autoAlpha: 1, duration: 0.2, ease: "power2.inOut" }, "<");
    timeline.to($lineTop, { y: 0, rotation: 0, duration: 0.35, ease: "power2.inOut" }, "<");
    timeline.to($lineBottom, { y: 0, rotation: 0, duration: 0.35, ease: "power2.inOut" }, "<");
  };

  const setActiveImage = (index) => {
    lastActiveImageIndex = Number(index) || 0;
    $overlayImages.each(function (i) {
      gsap.to(this, {
        autoAlpha: i === lastActiveImageIndex ? 1 : 0,
        scale: i === lastActiveImageIndex ? 1 : 1.05,
        duration: i === lastActiveImageIndex ? 0.8 : 0.6,
        ease: "power3.out",
      });
    });
  };

  const openMenu = () => {
    if (isAnimating || isOpen) return;
    isAnimating = true;
    isOpen = true;
    createSplitTextForLinks();
    setActiveImage(0);

    document.body.classList.add("overlay-active");
    $menuToggle.css("pointer-events", "none");
    $menuToggle.attr("aria-expanded", "true");
    $fullWidthMenu.attr("aria-hidden", "false");

    const tlMenuIn = gsap.timeline({
      onStart: () => gsap.set($fullWidthMenu, { visibility: "visible" }),
      onComplete: () => {
        isAnimating = false;
        $menuToggle.css("pointer-events", "");
      },
    });

    tlMenuIn
      .to($fullWidthMenu, {
        height: "100vh",
        autoAlpha: 1,
        pointerEvents: "auto",
        duration: 1.45,
        ease: "power4.out",
      })
      .to($overlayMenuContent, { autoAlpha: 1, y: 0, duration: 1.1, ease: "power4.inOut" }, 0.35)
      .to(
        $overlayMenuContent.find(".line-inner:not(.hover)"),
        {
          yPercent: 0,
          autoAlpha: 1,
          duration: 1.35,
          ease: "power4.out",
          stagger: 0.22,
        },
        0.55,
      );

    animateToggleToX();
  };

  const closeMenu = () => {
    if (isAnimating || !isOpen) return;
    isAnimating = true;
    isOpen = false;

    document.body.classList.remove("overlay-active");
    $menuToggle.css("pointer-events", "none");
    $overlayMenuContent.css("pointer-events", "none");
    $menuToggle.attr("aria-expanded", "false");
    $fullWidthMenu.attr("aria-hidden", "true");

    gsap.killTweensOf($overlayMenuContent.find(".line-inner"));
    gsap.set($overlayMenuContent.find(".line-inner.hover"), { yPercent: 100, autoAlpha: 0 });
    gsap.set($overlayMenuContent.find(".line-inner:not(.hover)"), { yPercent: 0, autoAlpha: 1 });

    const tlOut = gsap.timeline({
      onComplete: () => {
        gsap.set($fullWidthMenu, { visibility: "hidden", pointerEvents: "none" });
        isAnimating = false;
        $menuToggle.css("pointer-events", "");
        $overlayMenuContent.css("pointer-events", "");
      },
    });

    tlOut
      .to(
        $overlayMenuContent.find(".line-inner:not(.hover)"),
        {
          autoAlpha: 0,
          yPercent: -110,
          duration: 1.15,
          ease: "power4.inOut",
          stagger: { each: 0.1, from: "start" },
        },
        0,
      )
      .to($overlayMenuContent, { autoAlpha: 0, y: 18, duration: 1.1, ease: "power4.inOut" }, 0.22)
      .to(
        $fullWidthMenu,
        {
          height: 0,
          autoAlpha: 0,
          duration: 1.35,
          ease: "power4.inOut",
        },
        1.1,
      );

    animateToggleToHamburger(tlOut);
  };

  $overlayMenuContent.on("mouseenter", ".overlay-nav-list li a", function () {
    const $link = $(this);
    const index = Number($link.data("image-index")) || 0;
    setActiveImage(index);

    gsap.to($link.find(".line-inner:not(.hover)"), {
      yPercent: -100,
      autoAlpha: 0,
      duration: 0.6,
      ease: "power3.out",
    });
    gsap.to($link.find(".line-inner.hover"), {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.6,
      ease: "power3.out",
    });
  });

  $overlayMenuContent.on("mouseleave", ".overlay-nav-list li a", function () {
    const $link = $(this);
    gsap.to($link.find(".line-inner:not(.hover)"), {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.5,
      ease: "power3.inOut",
    });
    gsap.to($link.find(".line-inner.hover"), {
      yPercent: 100,
      autoAlpha: 0,
      duration: 0.5,
      ease: "power3.inOut",
    });

    setActiveImage(lastActiveImageIndex);
  });

  $overlayLinks.on("click", function () {
    closeMenu();
  });

  $menuToggle.on("click", () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  $(window).on("resize", () => {
    if (!isOpen) {
      gsap.to($header, { width: getHeaderTargetWidth(), duration: 0.45, ease: "power2.out" });
    }
  });

  $(window).on("keydown", (event) => {
    if (event.key === "Escape" && isOpen) {
      closeMenu();
    }
  });

  initIntroAnimation();
}
