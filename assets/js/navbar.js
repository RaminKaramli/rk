export function initNavbar() {
  if (typeof gsap === "undefined") return;
  if (typeof window.jQuery === "undefined") return;

  const $ = window.jQuery;

  const $header = $("#siteHeader");
  const $aboutSection = $("#about");
  const $menuToggle = $("#menuToggle");
  const $fullWidthMenu = $("#fullWidthMenu");
  const $themeToggle = $("#themeToggle");
  const $overlayMenuContent = $fullWidthMenu.find(".overlay-menu-content");
  const $overlayLinks = $fullWidthMenu.find(".overlay-nav-list li a");
  const $overlayImages = $fullWidthMenu.find(".overlay-menu-image");
  const $hamIcon = $menuToggle.find(".ham6");

  if (!$header.length || !$menuToggle.length || !$fullWidthMenu.length) return;

  if ($fullWidthMenu.parent()[0] !== document.body) {
    $fullWidthMenu.appendTo(document.body);
  }

  if ($header.parent()[0] !== document.body) {
    $header.appendTo(document.body);
  }

  if ($themeToggle.length && $themeToggle.parent()[0] !== document.body) {
    $themeToggle.appendTo(document.body);
  }

  let isOpen = false;
  let isAnimating = false;
  let sectionTrigger = null;
  const MENU_DURATION = 0.6;

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
      height: "100vh",
    });

    gsap.set($overlayMenuContent, { autoAlpha: 0 });
    gsap.set($overlayLinks, { autoAlpha: 0, x: 0, y: 0 });
    gsap.set($overlayImages, { autoAlpha: 0, scale: 1.03 });
    gsap.set($overlayImages.eq(0), { autoAlpha: 1, scale: 1 });

    gsap
      .timeline({ delay: 0.2 })
      .fromTo($header, { width: "6.25rem" }, { width: getHeaderTargetWidth(), duration: 1.25, ease: "power3.out" })
      .to($header.find(".header-logo, .menu-toggle"), { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "<0.5");
  };

  const setHeaderSectionState = (shouldBeLeft) => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      $header.removeClass("site-header--section2-left");
      return;
    }

    $header.toggleClass("site-header--section2-left", shouldBeLeft);
  };

  const updateHeaderSectionState = () => {
    if (!$aboutSection.length) {
      setHeaderSectionState(false);
      return;
    }

    const aboutTop = $aboutSection[0].getBoundingClientRect().top;
    setHeaderSectionState(aboutTop <= 0);
  };

  const refreshHeaderSectionTrigger = () => {
    if (sectionTrigger) {
      sectionTrigger.kill();
      sectionTrigger = null;
    }

    if (!$aboutSection.length || window.matchMedia("(max-width: 768px)").matches) {
      setHeaderSectionState(false);
      return;
    }

    if (typeof ScrollTrigger === "undefined") {
      updateHeaderSectionState();
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    sectionTrigger = ScrollTrigger.create({
      trigger: $aboutSection[0],
      start: "top top",
      end: "bottom top",
      onEnter: () => setHeaderSectionState(true),
      onEnterBack: () => setHeaderSectionState(true),
      onLeaveBack: () => setHeaderSectionState(false),
    });

    updateHeaderSectionState();
  };

  const setActiveImage = (index) => {
    const safeIndex = Number(index) || 0;
    $overlayImages.each(function (i) {
      gsap.to(this, {
        autoAlpha: i === safeIndex ? 1 : 0,
        scale: i === safeIndex ? 1 : 1.03,
        duration: 0.45,
        ease: "power2.out",
      });
    });
  };

  const openMenu = () => {
    if (isAnimating || isOpen) return;
    isAnimating = true;
    isOpen = true;

    document.body.classList.add("overlay-active");
    $menuToggle.css("pointer-events", "none");
    $header.addClass("is-open");
    $menuToggle.attr("aria-expanded", "true");
    $fullWidthMenu.attr("aria-hidden", "false");
    if ($hamIcon.length) $hamIcon.addClass("active");

    gsap.killTweensOf([$overlayLinks, $overlayMenuContent, $fullWidthMenu]);
    gsap.set($overlayMenuContent, { autoAlpha: 0, x: 0, y: 0 });
    gsap.set($overlayLinks, { autoAlpha: 0, x: 0, y: 0 });
    setActiveImage(0);

    gsap
      .timeline({
        onStart: () =>
          gsap.set($fullWidthMenu, { visibility: "visible", autoAlpha: 0, pointerEvents: "auto", height: "100vh" }),
        onComplete: () => {
          isAnimating = false;
          $menuToggle.css("pointer-events", "");
        },
      })
      .to($fullWidthMenu, { autoAlpha: 1, duration: MENU_DURATION, ease: "power1.out" }, 0)
      .to($overlayMenuContent, { autoAlpha: 1, duration: MENU_DURATION, ease: "power2.out" }, 0)
      .to($overlayLinks, { autoAlpha: 1, duration: MENU_DURATION, stagger: 0.06, ease: "power2.out" }, 0);
  };

  const closeMenu = () => {
    if (!isOpen && !isAnimating) return;
    isAnimating = true;
    isOpen = false;

    document.body.classList.remove("overlay-active");
    $menuToggle.css("pointer-events", "none");
    $overlayMenuContent.css("pointer-events", "none");
    $header.removeClass("is-open");
    $menuToggle.attr("aria-expanded", "false");
    $fullWidthMenu.attr("aria-hidden", "true");
    if ($hamIcon.length) $hamIcon.removeClass("active");

    gsap.killTweensOf([$overlayLinks, $overlayMenuContent, $fullWidthMenu]);

    gsap
      .timeline({
        onComplete: () => {
          gsap.set($fullWidthMenu, {
            visibility: "hidden",
            pointerEvents: "none",
            autoAlpha: 0,
            height: "100vh",
          });
          gsap.set($overlayMenuContent, { autoAlpha: 0, x: 0, y: 0 });
          gsap.set($overlayLinks, { autoAlpha: 0, x: 0, y: 0 });
          isAnimating = false;
          $menuToggle.css("pointer-events", "");
          $overlayMenuContent.css("pointer-events", "");
        },
      })
      .to($overlayLinks, { autoAlpha: 0, duration: 0.6, ease: "power2.inOut" }, 0)
      .to($overlayMenuContent, { autoAlpha: 0, duration: MENU_DURATION, ease: "power2.inOut" }, 0)
      .to($fullWidthMenu, { autoAlpha: 0, duration: MENU_DURATION, ease: "power2.inOut" }, 0);
  };

  $overlayMenuContent.on("mouseenter", ".overlay-nav-list li a", function () {
    const $link = $(this);
    const index = Number($link.data("image-index")) || 0;
    setActiveImage(index);
    gsap.to($link, { x: 10, duration: 0.25, ease: "power2.out" });
  });

  $overlayMenuContent.on("mouseleave", ".overlay-nav-list li a", function () {
    gsap.to(this, { x: 0, duration: 0.25, ease: "power2.out" });
  });

  $overlayLinks.on("click", function () {
    closeMenu();
  });

  $menuToggle.on("click", () => {
    if (isOpen) closeMenu();
    else openMenu();
  });

  $(window).on("resize", () => {
    refreshHeaderSectionTrigger();
    if (!isOpen) {
      gsap.to($header, { width: getHeaderTargetWidth(), duration: 0.45, ease: "power2.out" });
    }
  });

  $(window).on("keydown", (event) => {
    if (event.key === "Escape" && isOpen) closeMenu();
  });

  initIntroAnimation();
  refreshHeaderSectionTrigger();
}
