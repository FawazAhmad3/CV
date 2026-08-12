document.addEventListener("DOMContentLoaded", function () {
  console.log("🚀 Portfolio Overhaul Script Initializing...");

  // ===== PROFILE PICTURE DYNAMIC LOADER =====
  function initProfilePicture() {
    const photo = document.getElementById("profilePhoto");
    const icon = document.getElementById("profileIcon");

    if (photo) {
      photo.onload = () => {
        console.log("✅ Fawaz.jpg loaded successfully!");
        photo.style.opacity = "1";
        photo.classList.add("loaded");
        if (icon) icon.style.opacity = "0";
      };
      photo.onerror = () => {
        console.log("⚠️ Fawaz.jpg fallback trigger");
        photo.style.display = "none";
        if (icon) icon.style.opacity = "1";
      };
      // Force trigger load
      if (photo.complete) {
        photo.onload();
      }
    }
  }
  initProfilePicture();

  // ===== NAVIGATION & MOBILE MENU =====
  const navLinks = document.querySelectorAll('header nav a[href^="#"]');
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinksContainer = document.getElementById("navLinks");

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      if (window.innerWidth <= 768) {
        navLinksContainer.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  });

  // Mobile Toggler
  if (mobileMenuBtn && navLinksContainer) {
    mobileMenuBtn.addEventListener("click", () => {
      const isExpanded = mobileMenuBtn.getAttribute("aria-expanded") === "true";
      navLinksContainer.classList.toggle("active");
      mobileMenuBtn.setAttribute("aria-expanded", !isExpanded);
      mobileMenuBtn.innerHTML = isExpanded
        ? '<i class="fas fa-bars"></i>'
        : '<i class="fas fa-times"></i>';
    });

    // Outside click closer
    document.addEventListener("click", (e) => {
      if (
        window.innerWidth <= 768 &&
        navLinksContainer.classList.contains("active") &&
        !navLinksContainer.contains(e.target) &&
        !mobileMenuBtn.contains(e.target)
      ) {
        navLinksContainer.classList.remove("active");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
      }
    });
  }

  // ===== THEME TOGGLER =====
  function showNotification(message, type = "success") {
    // Remove existing
    const oldNotif = document.querySelector(".notification");
    if (oldNotif) oldNotif.remove();

    const notif = document.createElement("div");
    notif.className = `notification ${type}`;
    const icon = type === "success" ? "fa-check-circle" : "fa-exclamation-circle";

    notif.innerHTML = `
      <div class="notification-content">
        <i class="fas ${icon}"></i>
        <span>${message}</span>
      </div>
      <button class="notification-close" aria-label="Close notification">
        <i class="fas fa-times"></i>
      </button>
    `;
    document.body.appendChild(notif);

    setTimeout(() => notif.classList.add("show"), 10);

    const autoRemove = setTimeout(() => {
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 300);
    }, 4000);

    notif.querySelector(".notification-close").addEventListener("click", () => {
      clearTimeout(autoRemove);
      notif.classList.remove("show");
      setTimeout(() => notif.remove(), 300);
    });
  }

  function initThemeToggle() {
    const toggleBtn = document.getElementById("themeToggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", toggleTheme);
    }

    const currentTheme = localStorage.getItem("portfolio-theme") || "light";
    document.documentElement.setAttribute("data-theme", currentTheme);
  }

  function toggleTheme() {
    const root = document.documentElement;
    const currentTheme = root.getAttribute("data-theme") || "light";
    const newTheme = currentTheme === "dark" ? "light" : "dark";

    root.setAttribute("data-theme", newTheme);
    localStorage.setItem("portfolio-theme", newTheme);

    this.style.transform = "rotate(180deg)";
    setTimeout(() => {
      this.style.transform = "rotate(0deg)";
    }, 300);

    showNotification(`🌓 Theme changed to ${newTheme} mode`, "success");
  }

  initThemeToggle();

  // ===== CV DOWNLOAD SCRIPT =====
  document.querySelectorAll(".cv-download, .cv-btn, #downloadCvBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const link = document.createElement("a");
      link.href = "Fawaz'sCV.pdf";
      link.download = "Fawaz_Ahmad_CV.pdf";
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showNotification("✅ CV download started!", "success");
    });
  });

  // ===== EXPERIENCE & CERTIFICATIONS TABS =====
  const tabBtns = document.querySelectorAll(".tab-btn");
  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const category = btn.getAttribute("data-tab");
      if (!category) return;

      const parentSection = btn.closest("section");
      if (parentSection) {
        parentSection.querySelectorAll(".tab-btn").forEach((b) => b.classList.remove("active"));
        parentSection.querySelectorAll(".tab-content").forEach((c) => c.classList.remove("active"));
        btn.classList.add("active");
        const targetContent = document.getElementById(category + "-content");
        if (targetContent) {
          targetContent.classList.add("active");
        }
      }
    });
  });

  // ===== HOVER EFFECTS =====
  document.querySelectorAll(".info-item, .stat-item, .certification-card, .skill-item, .skill-category, .contact-item").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      el.style.transform = el.classList.contains("contact-item") ? "translateX(8px)" : "translateY(-5px)";
      el.style.transition = "all 0.3s ease";
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  // ===== CONTACT FORM COMPOSER =====
  window.sendContactForm = function () {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const msg = document.getElementById("message").value.trim();

    if (!name || !email || !msg) {
      alert("Please fill in Name, Email, and Message.");
      return;
    }

    const bodyText = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${msg}`;
    const mailto = `mailto:fawazahmad913@gmail.com?subject=${encodeURIComponent(subject || "Portfolio Message")}&body=${encodeURIComponent(bodyText)}`;
    
    window.location.href = mailto;
    showNotification("📧 Redirecting to your mail application...", "success");

    // Clear form
    const form = document.getElementById("contactForm");
    if (form) form.reset();
  };

  // ===== SCROLL REVEAL OBSERVERS =====
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

  document.querySelectorAll(".stat-item, .timeline-item, .certification-card, .skill-category, .info-item, .contact-item").forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
    observer.observe(el);
  });

  // Nav scroll indicator
  window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 80) {
      header.style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.08)";
      header.style.padding = "14px 0";
    } else {
      header.style.boxShadow = "0 4px 12px rgba(0, 0, 0, 0.03)";
      header.style.padding = "20px 0";
    }

    const sections = document.querySelectorAll("section[id]");
    const scrollPos = window.scrollY + 120;
    sections.forEach((s) => {
      if (scrollPos >= s.offsetTop && scrollPos < s.offsetTop + s.clientHeight) {
        document.querySelectorAll("header nav a").forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === "#" + s.getAttribute("id"));
        });
      }
    });
  });

  // ===== PROJECTS CLOCK CAROUSEL ENGINE =====
  (function () {
    const track = document.getElementById("projectsTrack");
    const stage = document.getElementById("clockStage");
    const hand = document.getElementById("clockHand");
    const activeCard = document.getElementById("activeCard");
    const dotsEl = document.getElementById("carDots");
    if (!track || !stage) return;

    // Read cards
    const cards = Array.from(track.querySelectorAll(".proj-card"));
    const projects = cards.map(c => {
      return {
        icon: c.querySelector(".proj-icon") ? c.querySelector(".proj-icon").innerHTML : "📁",
        type: c.querySelector(".proj-type") ? c.querySelector(".proj-type").innerHTML : "",
        name: c.querySelector(".proj-name") ? c.querySelector(".proj-name").innerHTML : "",
        desc: c.querySelector(".proj-desc") ? c.querySelector(".proj-desc").innerHTML : "",
        tags: c.querySelector(".proj-tags") ? c.querySelector(".proj-tags").innerHTML : "",
        link: c.querySelector(".proj-link") ? c.querySelector(".proj-link").outerHTML : ""
      };
    });

    const N = projects.length;
    let current = 0;
    let totalDeg = 0;
    let autoTimer;
    const nodes = [];

    function slotAngle(i) {
      return (i / N) * 360 - 90;
    }

    const canvas = document.getElementById("clockTicksCanvas");
    function drawTicks() {
      if (!canvas) return;
      const size = stage.offsetWidth;
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, size, size);

      const cx = size / 2, cy = size / 2, r = size * 0.47;
      const totalTicks = N * 5;

      for (let i = 0; i < totalTicks; i++) {
        const a = (i / totalTicks) * Math.PI * 2 - Math.PI / 2;
        const isMajor = i % 5 === 0;
        const tickLen = isMajor ? size * 0.035 : size * 0.018;
        const tickW = isMajor ? 2 : 1;
        const color = isMajor ? "rgba(99, 102, 241, 0.22)" : "rgba(99, 102, 241, 0.08)";

        const x1 = cx + r * Math.cos(a);
        const y1 = cy + r * Math.sin(a);
        const x2 = cx + (r - tickLen) * Math.cos(a);
        const y2 = cy + (r - tickLen) * Math.sin(a);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = color;
        ctx.lineWidth = tickW;
        ctx.stroke();
      }
    }

    function buildNodes() {
      nodes.forEach(n => n.remove());
      nodes.length = 0;
      const size = stage.offsetWidth;
      const r = size * 0.425;

      for (let i = 0; i < N; i++) {
        const nd = document.createElement("div");
        nd.className = "proj-node";
        nd.innerHTML = projects[i].icon;
        nd.title = projects[i].name;

        const angle = slotAngle(i) * Math.PI / 180;
        const x = size / 2 + Math.cos(angle) * r;
        const y = size / 2 + Math.sin(angle) * r;

        nd.style.left = x + "px";
        nd.style.top = y + "px";
        nd.addEventListener("click", () => {
          goTo(i);
          resetAuto();
        });

        stage.appendChild(nd);
        nodes.push(nd);
      }
    }

    function showCard(i) {
      const p = projects[i];
      activeCard.innerHTML = `
        <div class="proj-type">${p.type}</div>
        <div class="proj-icon">${p.icon}</div>
        <div class="proj-name">${p.name}</div>
        <div class="proj-desc">${p.desc}</div>
        <div class="proj-tags">${p.tags}</div>
        <div style="margin-top: 0.2rem;">${p.link}</div>
      `;
      activeCard.classList.remove("pac-fade");
      void activeCard.offsetWidth;
      activeCard.classList.add("pac-fade");
    }

    function updateNodes() {
      nodes.forEach((nd, i) => nd.classList.toggle("active", i === current));
    }

    function updateDots() {
      if (!dotsEl) return;
      dotsEl.innerHTML = "";
      for (let i = 0; i < N; i++) {
        const d = document.createElement("div");
        d.className = "car-dot" + (i === current ? " active" : "");
        d.onclick = () => {
          goTo(i);
          resetAuto();
        };
        dotsEl.appendChild(d);
      }
    }

    function goTo(i) {
      current = ((i % N) + N) % N;
      const targetBase = slotAngle(current);
      let target = targetBase;
      while (target <= totalDeg - 1) target += 360;
      totalDeg = target;

      hand.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
      hand.style.transform = `rotate(${totalDeg}deg)`;

      showCard(current);
      updateNodes();
      updateDots();
    }

    function autoAdvance() {
      goTo((current + 1) % N);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      autoTimer = setInterval(autoAdvance, 4200);
    }

    function init() {
      drawTicks();
      buildNodes();
      totalDeg = slotAngle(0);
      hand.style.transition = "none";
      hand.style.transform = `rotate(${totalDeg}deg)`;
      current = 0;
      showCard(0);
      updateNodes();
      updateDots();
    }

    window.clockMove = function (dir) {
      const next = (current + dir + N) % N;
      if (dir < 0) {
        const steps = N - 1;
        const target = totalDeg + (360 / N) * steps;
        current = next;
        totalDeg = target;
        hand.style.transition = "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)";
        hand.style.transform = `rotate(${totalDeg}deg)`;
        showCard(current);
        updateNodes();
        updateDots();
      } else {
        goTo(next);
      }
      resetAuto();
    };

    // Swipe
    let startX = 0;
    stage.addEventListener("touchstart", e => { startX = e.touches[0].clientX; }, { passive: true });
    stage.addEventListener("touchend", e => {
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) clockMove(dx < 0 ? 1 : -1);
    }, { passive: true });

    window.addEventListener("resize", () => {
      drawTicks();
      buildNodes();
      updateNodes();
      hand.style.transition = "none";
      hand.style.transform = `rotate(${totalDeg}deg)`;
    });

    requestAnimationFrame(() => requestAnimationFrame(init));
    setTimeout(resetAuto, 600);
  })();
});
