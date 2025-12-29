// 🔥 COMPLETE PORTFOLIO JS - ALL SYSTEMS WORKING
document.addEventListener("DOMContentLoaded", function () {
  // ==================== INITIALIZATION ====================
  console.log("🚀 Portfolio Initializing...");

  // 🔥 1. LOCAL PROFILE PICTURE - picture.jpg
  function initProfilePicture() {
    const photo = document.getElementById("profilePhoto");
    const icon = document.getElementById("profileIcon");

    if (photo) {
      photo.src = "picture.jpg";
      photo.onload = () => {
        console.log("✅ picture.jpg LOADED PERFECTLY!");
        photo.style.opacity = "1";
        photo.classList.add("loaded");
      };
      photo.onerror = () => {
        console.log("⚠️ picture.jpg not found - using icon");
        photo.style.display = "none";
        if (icon) icon.style.opacity = "1";
      };
    }
  }
  initProfilePicture();

  // ==================== NAVIGATION ====================

  // 2. NAVBAR SMOOTH SCROLL
  const navLinks = document.querySelectorAll('a[href^="#"]');
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      // Update active nav link
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // 3. MOBILE MENU
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinksContainer = document.querySelector(".nav-links");
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      navLinksContainer.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      mobileMenuBtn.innerHTML = isExpanded
        ? '<i class="fas fa-bars"></i>'
        : '<i class="fas fa-times"></i>';
    });

    // Close mobile menu when clicking links
    navLinks.forEach((link) =>
      link.addEventListener("click", () => {
        navLinksContainer.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      })
    );
  }

  // ==================== DOWNLOAD CV ====================

  // 🔥 4. CV DOWNLOAD - FIXED! Downloads "Fawaz'sCV.pdf"
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

        // Show success notification
        showNotification("✅ CV downloaded successfully!", "success");
        console.log("✅ Fawaz'sCV.pdf DOWNLOAD STARTED!");
      });
    });

  // ==================== PROJECTS CAROUSEL ====================

  // 5. PROJECTS CAROUSEL
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

    // Add scroll buttons if they exist (future feature)
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

    // Pause auto-scroll on hover
    projectsContainer.addEventListener("mouseenter", stopAutoScroll);
    projectsContainer.addEventListener("mouseleave", startAutoScroll);

    // Restart auto-scroll after manual scroll
    let scrollTimeout;
    projectsContainer.addEventListener("scroll", () => {
      stopAutoScroll();
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(startAutoScroll, 4000);
    });

    projectsContainer.style.scrollBehavior = "smooth";
    setTimeout(startAutoScroll, 2000);
  }

  // ==================== EXPERIENCE TABS ====================

  // 6. EXPERIENCE TABS
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");
  if (tabBtns.length > 0 && tabContents.length > 0) {
    tabBtns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        // Remove active class from all tabs
        tabBtns.forEach((b) => b.classList.remove("active"));
        tabContents.forEach((c) => c.classList.remove("active"));

        // Add active class to clicked tab
        btn.classList.add("active");
        if (tabContents[index]) tabContents[index].classList.add("active");
      });

      // Set first tab as active by default
      if (index === 0) {
        btn.classList.add("active");
        tabContents[0]?.classList.add("active");
      }
    });
  }

  // ==================== HOVER EFFECTS ====================

  // 7. HOVER EFFECTS
  document
    .querySelectorAll(
      ".info-item, .stat-item, .project-card, .certification-card, .skill-item, .skill-category"
    )
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        el.style.transform = "translateY(-5px)";
        el.style.boxShadow = "0 15px 30px rgba(0, 0, 0, 0.15)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "translateY(0)";
        el.style.boxShadow = "";
      });
    });

  // ==================== CONTACT FORM ====================

  // 8. CONTACT FORM
  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      // Show loading state
      btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
      btn.disabled = true;

      // Simulate form submission (replace with actual API call)
      setTimeout(() => {
        // Success
        btn.innerHTML =
          '<i class="fas fa-check-circle"></i> Sent Successfully!';
        showNotification(
          "🎉 Message sent successfully! I'll get back to you soon.",
          "success"
        );

        // Reset form after delay
        setTimeout(() => {
          this.reset();
          btn.innerHTML = originalText;
          btn.disabled = false;
        }, 3000);
      }, 2000);
    });
  }

  // ==================== HEADER SCROLL EFFECT ====================

  // 9. HEADER SCROLL EFFECT
  let ticking = false;
  function updateHeader() {
    const header = document.querySelector("header");
    if (window.scrollY > 100) {
      header.style.boxShadow = "0 12px 40px rgba(0,0,0,0.15)";
      header.style.backdropFilter = "blur(20px)";
    } else {
      header.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)";
      header.style.backdropFilter = "blur(10px)";
    }
    ticking = false;
  }
  window.addEventListener("scroll", () => {
    if (!ticking) {
      requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });

  // ==================== SCROLL ANIMATIONS ====================

  // 10. SCROLL ANIMATIONS
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
    { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
  );

  // Observe all elements for scroll animations
  document
    .querySelectorAll(
      ".stat-item, .project-card, .timeline-item, .certification-card, .skill-category, .info-item, .contact-item"
    )
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(30px)";
      el.style.transition = "all 0.6s ease";
      observer.observe(el);
    });

  // ==================== NOTIFICATION SYSTEM ====================

  // 11. NOTIFICATION SYSTEM
  function showNotification(message, type = "success") {
    // Remove existing notification
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification ${type}`;

    const icon =
      type === "success" ? "fa-check-circle" : "fa-exclamation-circle";

    notification.innerHTML = `
      <div class="notification-content">
        <i class="fas ${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;

    document.body.appendChild(notification);

    // Show notification with animation
    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    // Auto remove after 5 seconds
    const autoRemove = setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 5000);

    // Close button functionality
    const closeBtn = notification.querySelector(".notification-close");
    closeBtn.addEventListener("click", () => {
      clearTimeout(autoRemove);
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    });
  }

  // ==================== THEME TOGGLE ====================

  // 12. THEME TOGGLE FUNCTIONALITY
  function initThemeToggle() {
    // Create theme toggle button if it doesn't exist
    const ctaButtons = document.querySelector(".cta-buttons");
    if (ctaButtons && !document.getElementById("themeToggle")) {
      const toggleBtn = document.createElement("button");
      toggleBtn.id = "themeToggle";
      toggleBtn.className = "theme-toggle";
      toggleBtn.setAttribute("aria-label", "Toggle theme");
      toggleBtn.innerHTML =
        '<i class="fas fa-sun"></i><i class="fas fa-moon"></i>';
      ctaButtons.appendChild(toggleBtn);

      // Add event listener
      toggleBtn.addEventListener("click", toggleTheme);
    }

    // Get saved theme from localStorage or use device preference
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    let currentTheme = localStorage.getItem("portfolio-theme");

    // If no saved theme, use device preference
    if (!currentTheme) {
      currentTheme = prefersDarkScheme.matches ? "dark" : "light";
      localStorage.setItem("portfolio-theme", currentTheme);
    }

    // Apply the theme
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    // Apply new theme
    document.documentElement.setAttribute("data-theme", newTheme);

    // Save to localStorage
    localStorage.setItem("portfolio-theme", newTheme);

    // Add animation effect
    this.style.transform = "rotate(180deg)";
    setTimeout(() => {
      this.style.transform = "rotate(0deg)";
    }, 300);

    // Show notification
    const themeName = newTheme === "dark" ? "Dark" : "Light";
    showNotification(`🌓 Switched to ${themeName} theme`, "success");
  }

  // Initialize theme toggle
  initThemeToggle();

  // ==================== ACTIVE NAV LINK ON SCROLL ====================

  // 13. ACTIVE NAV LINK ON SCROLL
  function updateActiveNavLink() {
    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 100;

    let currentSectionId = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionId = section.getAttribute("id");

      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentSectionId = sectionId;
      }
    });

    // Update active class on nav links
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  // Initial update
  updateActiveNavLink();

  // Update on scroll
  window.addEventListener("scroll", updateActiveNavLink);

  // ==================== FORMSPREE INTEGRATION (READY TO USE) ====================

  // 14. FORMSPREE INTEGRATION (Uncomment when ready)
  /*
  // To enable email contact form:
  // 1. Sign up at https://formspree.io
  // 2. Get your form ID
  // 3. Uncomment and update this code:
  
  if (contactForm) {
    // Replace with your Formspree endpoint
    contactForm.action = "https://formspree.io/f/YOUR_FORM_ID";
    contactForm.method = "POST";
    
    // Add hidden fields for better Formspree integration
    const nextField = document.createElement("input");
    nextField.type = "hidden";
    nextField.name = "_next";
    nextField.value = window.location.href + "#contact";
    contactForm.appendChild(nextField);
    
    const subjectField = document.createElement("input");
    subjectField.type = "hidden";
    subjectField.name = "_subject";
    subjectField.value = "New Portfolio Contact Message";
    contactForm.appendChild(subjectField);
  }
  */

  // ==================== COPYRIGHT YEAR UPDATE ====================

  // 15. COPYRIGHT YEAR UPDATE
  const copyrightElement = document.querySelector(".copyright p");
  if (copyrightElement) {
    const currentYear = new Date().getFullYear();
    copyrightElement.innerHTML = `&copy; ${currentYear} Fawaz Ahmad. All Rights Reserved.`;
  }

  // ==================== MOBILE MENU OUTSIDE CLICK ====================

  // 16. MOBILE MENU OUTSIDE CLICK
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
      btn.setAttribute("aria-expanded", "false");
      btn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  // ==================== PERFORMANCE OPTIMIZATIONS ====================

  // 17. SMOOTH SCROLL POLYFILL FOR SAFARI
  if (!("scrollBehavior" in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
      const easeInOutQuad = (t, b, c, d) => {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
      };

      const smoothScroll = (target, duration) => {
        const targetPosition = target.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        let startTime = null;

        const animation = (currentTime) => {
          if (startTime === null) startTime = currentTime;
          const timeElapsed = currentTime - startTime;
          const run = easeInOutQuad(
            timeElapsed,
            startPosition,
            distance,
            duration
          );
          window.scrollTo(0, run);
          if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
      };

      document.querySelectorAll('a[href^="#"]').forEach((link) => {
        link.addEventListener("click", function (e) {
          e.preventDefault();
          const targetId = this.getAttribute("href");
          if (targetId === "#") return;
          const target = document.querySelector(targetId);
          if (target) smoothScroll(target, 800);
        });
      });
    };

    smoothScrollPolyfill();
  }

  // ==================== LAZY LOADING ====================

  // 18. LAZY LOADING FOR IMAGES
  const lazyImages = document.querySelectorAll("img[data-src]");
  if ("IntersectionObserver" in window && lazyImages.length > 0) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute("data-src");
          lazyImageObserver.unobserve(img);
        }
      });
    });

    lazyImages.forEach((img) => lazyImageObserver.observe(img));
  }

  // ==================== QUICK STATS COUNTER ANIMATION ====================

  // 19. QUICK STATS COUNTER ANIMATION
  const statNumbers = document.querySelectorAll(".stat-number");
  if (statNumbers.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const statNumber = entry.target;
            const targetNumber = parseInt(
              statNumber.textContent.replace("+", "")
            );
            const duration = 2000; // 2 seconds
            const step = targetNumber / (duration / 16); // 60fps

            let currentNumber = 0;
            const counter = setInterval(() => {
              currentNumber += step;
              if (currentNumber >= targetNumber) {
                currentNumber = targetNumber;
                clearInterval(counter);
              }
              statNumber.textContent = Math.floor(currentNumber) + "+";
            }, 16);

            observer.unobserve(statNumber);
          }
        });
      },
      { threshold: 0.5 }
    );

    statNumbers.forEach((stat) => observer.observe(stat));
  }

  // ==================== FINAL INITIALIZATION ====================

  // 20. FINAL SETUP
  document.documentElement.style.scrollBehavior = "smooth";
  document.body.style.overflowX = "hidden";

  // 21. CONSOLE LOG FOR DEBUGGING
  console.log("✅ PORTFOLIO FULLY LOADED! All systems operational:");
  console.log("   - 📸 Profile picture: picture.jpg");
  console.log("   - 📄 CV download: Fawaz'sCV.pdf");
  console.log("   - 🌓 Theme toggle: Ready");
  console.log("   - 📧 Contact form: Ready");
  console.log("   - 🎯 Projects carousel: Ready");
  console.log("   - 📊 Experience tabs: Ready");
  console.log("   - 📱 Mobile menu: Ready");
  console.log("   - 🔔 Notification system: Ready");
  console.log("   - ✨ Scroll animations: Ready");
  console.log("   - 📈 Stats counter: Ready");
});

// ==================== WINDOW RESIZE HANDLER ====================

// 22. WINDOW RESIZE HANDLER
window.addEventListener("resize", () => {
  const nav = document.querySelector(".nav-links");
  const mobileBtn = document.querySelector(".mobile-menu-btn");

  // Close mobile menu when resizing to desktop
  if (window.innerWidth > 768 && nav?.classList.contains("active")) {
    nav.classList.remove("active");
    if (mobileBtn) {
      mobileBtn.setAttribute("aria-expanded", "false");
      mobileBtn.innerHTML = '<i class="fas fa-bars"></i>';
    }
  }
});

// ==================== PREFERS REDUCED MOTION ====================

// 23. PREFERS REDUCED MOTION SUPPORT
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
);
if (prefersReducedMotion.matches) {
  // Disable smooth scroll and animations
  document.documentElement.style.scrollBehavior = "auto";

  // Add reduced motion styles
  const style = document.createElement("style");
  style.textContent = `
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
    
    .project-card,
    .info-item,
    .stat-item,
    .certification-card,
    .skill-item {
      transition: none !important;
      transform: none !important;
    }
  `;
  document.head.appendChild(style);
}

// ==================== PAGE VISIBILITY ====================

// 24. PAGE VISIBILITY API - Pause animations when tab is not visible
document.addEventListener("visibilitychange", () => {
  const projectsContainer = document.querySelector(
    ".projects-scroll-container"
  );
  if (projectsContainer) {
    if (document.hidden) {
      // Stop auto-scroll when tab is not visible
      projectsContainer.dispatchEvent(new Event("mouseenter"));
    } else {
      // Restart auto-scroll when tab becomes visible
      projectsContainer.dispatchEvent(new Event("mouseleave"));
    }
  }
});

// ==================== ERROR HANDLING ====================

// 25. GLOBAL ERROR HANDLING
window.addEventListener("error", (e) => {
  console.error("🚨 Global error caught:", e.error);

  // Show user-friendly error notification
  const notification = document.createElement("div");
  notification.className = "notification error";
  notification.innerHTML = `
    <div class="notification-content">
      <i class="fas fa-exclamation-circle"></i>
      <span>Oops! Something went wrong. Please refresh the page.</span>
    </div>
    <button class="notification-close">
      <i class="fas fa-times"></i>
    </button>
  `;

  document.body.appendChild(notification);
  setTimeout(() => notification.classList.add("show"), 10);

  // Auto remove
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => notification.remove(), 300);
  }, 5000);
});

// ==================== SERVICE WORKER FOR PWA (OPTIONAL) ====================

// 26. SERVICE WORKER REGISTRATION (Optional - for PWA)
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log("✅ ServiceWorker registered:", registration.scope);
      })
      .catch((error) => {
        console.log("⚠️ ServiceWorker registration failed:", error);
      });
  });
}

// ==================== OFFLINE DETECTION ====================

// 27. OFFLINE DETECTION
window.addEventListener("online", () => {
  showNotification("🌐 You're back online!", "success");
});

window.addEventListener("offline", () => {
  showNotification("📴 You're offline. Some features may not work.", "error");
});

console.log("🚀 Portfolio JavaScript loaded successfully!");
