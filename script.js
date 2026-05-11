/* =========================================================
   LA OREJA AHUMADA - JS OPTIMIZADO Y CORREGIDO
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     CONFIG
  ========================= */
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* =========================
     ELEMENTOS BASE
  ========================= */
  const header       = document.querySelector(".navbar-custom");
  const menuToggle   = document.getElementById("menu-toggle");
  const navbar       = document.getElementById("navbarNav");
  const currentYear  = document.getElementById("currentYear");

  /* =========================
     AÑO ACTUAL
  ========================= */
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =========================
     MENÚ MOBILE
  ========================= */
  if (menuToggle && navbar) {

    const icon = menuToggle.querySelector("i");

    const closeMenu = () => {
      navbar.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
      if (icon) {
        icon.classList.add("fa-bars");
        icon.classList.remove("fa-times");
      }
    };

    const openMenu = () => {
      navbar.classList.add("active");
      menuToggle.setAttribute("aria-expanded", "true");
      if (icon) {
        icon.classList.remove("fa-bars");
        icon.classList.add("fa-times");
      }
    };

    menuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = navbar.classList.contains("active");
      isOpen ? closeMenu() : openMenu();
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (e) => {
      if (
        !navbar.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMenu();
      }
    });
  }

  /* =========================
     GSAP HEADER SCROLL
  ========================= */
  if (typeof gsap !== "undefined" && header && !reduceMotion) {

    let scrolled = false;

    window.addEventListener("scroll", () => {

      if (window.scrollY > 50 && !scrolled) {
        scrolled = true;
        gsap.to(header, {
          background: "rgba(18,2,2,0.98)",
          backdropFilter: "blur(12px)",
          duration: 0.3,
          ease: "power2.out"
        });

      } else if (window.scrollY <= 50 && scrolled) {
        scrolled = false;
        gsap.to(header, {
          background: "rgba(28,4,4,0.96)",
          duration: 0.3,
          ease: "power2.out"
        });
      }

    }, { passive: true });
  }

  /* =========================
     SLIDER
  ========================= */
  const track = document.getElementById("slider-track");
  const next  = document.getElementById("next");
  const prev  = document.getElementById("prev");

  if (track && next && prev) {

    const slides = track.querySelectorAll(".slider__item");

    if (slides.length > 0) {

      let index = 0;
      let autoplay;

    const dots = document.querySelectorAll(".slider-dot");

      const updateDots = () => {
        dots.forEach((dot, i) => {
          dot.classList.toggle("active", i === index);
        });
      };

      const update = () => {
        track.style.transform = `translateX(-${index * 100}%)`;
        updateDots();
      };

      const start = () => {
        clearInterval(autoplay);
        autoplay = setInterval(() => {
          index = (index + 1) % slides.length;
          update();
        }, 5000);
      };

      const stop = () => clearInterval(autoplay);

      next.addEventListener("click", () => {
        index = (index + 1) % slides.length;
        update();
        start();
      });

      prev.addEventListener("click", () => {
        index = (index - 1 + slides.length) % slides.length;
        update();
        start();
      });

      track.addEventListener("mouseenter", stop);
      track.addEventListener("mouseleave", start);

      start();
    }
  }

  /* =========================
     OWNER CARDS 3D
  ========================= */
  if (!reduceMotion && typeof gsap !== "undefined") {

    document.querySelectorAll(".owner-card").forEach(card => {

      let animationFrame;

      card.addEventListener("mousemove", (e) => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          const rect = card.getBoundingClientRect();
          const rotateX = ((e.clientY - rect.top  - rect.height / 2) / rect.height) * -8;
          const rotateY = ((e.clientX - rect.left - rect.width  / 2) / rect.width)  *  8;
          card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
        });
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      });
    });
  }

  /* =========================
     LIBRO NOSOTROS
  ========================= */
  const book = document.querySelector(".about__inner");

  if (book && !reduceMotion) {

    let animationFrame;

    book.addEventListener("mousemove", (e) => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const bounds = book.getBoundingClientRect();
        const rotateX = ((e.clientY - bounds.top  - bounds.height / 2) / (bounds.height / 2)) * -4;
        const rotateY = ((e.clientX - bounds.left - bounds.width  / 2) / (bounds.width  / 2)) *  4;
        book.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        book.style.boxShadow = `${-rotateY * 2}px ${-rotateX * 2}px 50px rgba(0,0,0,0.25)`;
      });
    });

    book.addEventListener("mouseleave", () => {
      book.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)`;
      book.style.boxShadow = "0 20px 60px rgba(0,0,0,0.12)";
    });
  }

  /* =========================
     FOUNDERS
  ========================= */
  if (!reduceMotion && typeof gsap !== "undefined") {

    document.querySelectorAll(".founder-photo").forEach(photo => {

      const img = photo.querySelector("img");

      photo.addEventListener("mouseenter", () => {
        gsap.to(photo, { scale: 1.04, y: -8, duration: 0.5, ease: "power2.out" });
        if (img) gsap.to(img, { boxShadow: "0 20px 40px rgba(0,0,0,0.35)", duration: 0.5 });
      });

      photo.addEventListener("mouseleave", () => {
        gsap.to(photo, { scale: 1, y: 0, rotateX: 0, rotateY: 0, duration: 0.7, ease: "power3.out" });
      });

      let animationFrame;

      photo.addEventListener("mousemove", (e) => {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => {
          const rect = photo.getBoundingClientRect();
          const rotateX = ((e.clientY - rect.top)  / rect.height - 0.5) * -8;
          const rotateY = ((e.clientX - rect.left) / rect.width  - 0.5) *  8;
          gsap.set(photo, { rotateX, rotateY });
        });
      });
    });
  }

}); // fin DOMContentLoaded