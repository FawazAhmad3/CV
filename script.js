// 🔥 COMPLETE PORTFOLIO JS - CV DOWNLOAD FIXED + picture.jpg
document.addEventListener("DOMContentLoaded", function () {
  // 🔥 0. LOCAL PROFILE PICTURE - picture.jpg
  function initProfilePicture() {
    const photo = document.getElementById("profilePhoto");
    const icon = document.getElementById("profileIcon");

    if (photo) {
      photo.src = "picture.jpg";
      photo.onload = () => {
        console.log("✅ picture.jpg LOADED PERFECTLY!");
        photo.style.opacity = "1";
      };
      photo.onerror = () => {
        console.log("⚠️ picture.jpg not found - using icon");
        photo.style.display = "none";
        if (icon) icon.style.opacity = "1";
      };
    }
  }
  initProfilePicture();

  // 1. NAVBAR SMOOTH SCROLL
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 2. MOBILE MENU
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinksContainer = document.querySelector(".nav-links");
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () =>
      navLinksContainer.classList.toggle("active")
    );
    navLinks.forEach((link) =>
      link.addEventListener("click", () =>
        navLinksContainer.classList.remove("active")
      )
    );
  }

  // 🔥 3. CV DOWNLOAD - FIXED! Downloads "Fawaz'sCV.pdf"
  document
    .querySelectorAll(".cv-download, .cv-btn, #downloadCvBtn")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();

        // ✅ PERFECT CV DOWNLOAD - Fawaz'sCV.pdf from same folder
        const link = document.createElement("a");
        link.href = "Fawaz'sCV.pdf"; // ← YOUR FILE NAME
        link.download = "Fawaz-Ahmad-CV.pdf"; // ← Download as this name
        link.style.display = "none";

        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        console.log("✅ Fawaz'sCV.pdf DOWNLOAD STARTED!");
      });
    });

  // 4. PROJECTS CAROUSEL
  const projectsContainer = document.querySelector(
    ".projects-scroll-container"
  );
  if (projectsContainer) {
    const projectCards = projectsContainer.querySelectorAll(".project-card");
    let autoScrollInterval,
      currentScrollPosition = 0;
    const scrollAmount = 350;

    console.log(`📁 Found ${projectCards.length} projects`);

    function scrollNext() {
      currentScrollPosition += scrollAmount;
      if (
        currentScrollPosition >
        projectsContainer.scrollWidth - projectsContainer.clientWidth
      ) {
        currentScrollPosition = 0;
      }
      projectsContainer.scrollTo({
        left: currentScrollPosition,
        behavior: "smooth",
      });
    }

    function scrollPrev() {
      currentScrollPosition -= scrollAmount;
      if (currentScrollPosition < 0) {
        currentScrollPosition =
          projectsContainer.scrollWidth - projectsContainer.clientWidth;
      }
      projectsContainer.scrollTo({
        left: currentScrollPosition,
        behavior: "smooth",
      });
    }

    function startAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
      autoScrollInterval = setInterval(scrollNext, 5000);
    }

    function stopAutoScroll() {
      if (autoScrollInterval) clearInterval(autoScrollInterval);
    }

    document
      .querySelectorAll('.next, .right, [class*="next"], [class*="right"]')
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          stopAutoScroll();
          scrollNext();
          setTimeout(startAutoScroll, 3000);
        });
      });

    document
      .querySelectorAll('.prev, .left, [class*="prev"], [class*="left"]')
      .forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();
          stopAutoScroll();
          scrollPrev();
          setTimeout(startAutoScroll, 3000);
        });
      });

    projectsContainer.addEventListener("mouseenter", stopAutoScroll);
    projectsContainer.addEventListener("mouseleave", startAutoScroll);

    let scrollTimeout;
    projectsContainer.addEventListener("scroll", () => {
      stopAutoScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(startAutoScroll, 4000);
    });

    projectsContainer.style.scrollBehavior = "smooth";
    setTimeout(startAutoScroll, 2000);
  }

  // 5. EXPERIENCE TABS
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  tabBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));
      btn.classList.add("active");
      if (tabContents[index]) tabContents[index].classList.add("active");
    });
    if (index === 0) {
      btn.classList.add("active");
      tabContents[0]?.classList.add("active");
    }
  });

  // 6. HOVER EFFECTS
  document
    .querySelectorAll(
      ".info-item, .stat-item, .project-card, .timeline-content, .certification-card, .skill-item, .skill-category"
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-10px) scale(1.03)";
        el.style.transition = "all 0.4s ease";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0) scale(1)";
      });
    });

  // 7. CONTACT FORM
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const original = btn.innerHTML;
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '<i class="fas fa-check-circle"></i> Sent!';
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
          this.reset();
        }, 1500);
      }, 2000);
    });
  }

  // 8. HEADER SCROLL EFFECT
  let ticking = false;
  function updateHeader() {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.background = "rgba(255, 255, 255, 0.98)";
      header.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
    } else {
      header.style.background = "rgba(255, 255, 255, 0.95)";
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // 9. SCROLL ANIMATIONS
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -100px 0px" }
  );

  document
    .querySelectorAll(
      ".stat-item, .project-card, .timeline-item, .certification-card, .skill-category, .info-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(60px)";
      el.style.transition = "all 1s ease";
      observer.observe(el);
    });

  document.documentElement.style.scrollBehavior = "smooth";
  document.body.style.overflowX = "hidden";

  console.log("✅ PORTFOLIO LOADED! picture.jpg + Fawaz'sCV.pdf READY!");
});

// 🔥 MOBILE MENU OUTSIDE CLICK
document.addEventListener("click", (e) => {
  const nav = document.querySelector(".nav-links");
  const btn = document.querySelector(".mobile-menu-btn");
  if (
    window.innerWidth <= 768 &&
    nav?.classList.contains("active") &&
    !nav.contains(e.target) &&
    !btn?.contains(e.target)
  ) {
    nav.classList.remove("active");
  }
});
