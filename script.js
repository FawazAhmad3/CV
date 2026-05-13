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

  // ==================== PROJECTS DATA ====================
  const projectsData = [
    {
      id: 1,
      title: "University Management System",
      category: "Python Flask • PostgreSQL",
      description: "University Management SaaS Portal is a comprehensive Flask-based web application supporting 5 distinct roles (Student, Teacher, Office Staff, HOD, System Admin) with granular permissions across multi-tenant universities and departments.",
      tech: ["Python Flask", "Jinja", "PostgreSQL", "Replit Host"],
      icon: "fa-database",
      color: "#6366f1",
      links: []
    },
    {
      id: 2,
      title: "Real-time Suspicious Activity Detection",
      category: "Python • OpenCV • AI",
      description: "Real-time intelligent surveillance system using Python, OpenCV, and Google Gemini API to detect suspicious activities including weapon handling, fighting, fire, and smoking.",
      tech: ["Python", "OpenCV", "Gemini API", "SQLite"],
      icon: "fa-shield-alt",
      color: "#10b981",
      links: [
        { label: "View Code", url: "https://github.com/FawazAhmad3/Activity-detection-through-api-free/main", icon: "fa-github" }
      ]
    },
    {
      id: 3,
      title: "Hand Gesture Brightness Control",
      category: "Python • Computer Vision",
      description: "Used MediaPipe and OpenCV to create a gesture-controlled system that adjusts screen brightness in real-time based on hand gestures.",
      tech: ["Python", "MediaPipe", "OpenCV"],
      icon: "fa-hand-paper",
      color: "#f59e0b",
      links: []
    },
    {
      id: 4,
      title: "Disease Prediction App",
      category: "Machine Learning • Python",
      description: "Machine learning-based application to predict potential illnesses based on user-input symptoms using trained datasets.",
      tech: ["Python", "Machine Learning", "Scikit-learn"],
      icon: "fa-heartbeat",
      color: "#ef4444",
      links: []
    },
    {
      id: 5,
      title: "File Management System",
      category: "JavaFX • MySQL",
      description: "JavaFX + XAMPP-based desktop application for file management with user authentication, file categorization, and search functionality.",
      tech: ["JavaFX", "XAMPP", "MySQL"],
      icon: "fa-folder-open",
      color: "#3b82f6",
      links: [
        { label: "View Code", url: "https://github.com/FawazAhmad3/File_management_System", icon: "fa-github" }
      ]
    },
    {
      id: 6,
      title: "IIT Department Web Portal",
      category: "Web Development",
      description: "Developed a web portal for department information sharing using HTML, CSS, JavaScript, and XAMPP for backend functionality.",
      tech: ["HTML/CSS", "JavaScript", "XAMPP"],
      icon: "fa-laptop-code",
      color: "#8b5cf6",
      links: []
    },
    {
      id: 7,
      title: "English Department DBMS",
      category: "SQL • PHP • Web",
      description: "Created a SQL web-based DBMS to manage staff and student records with login authentication and CRUD functionality.",
      tech: ["SQL", "PHP", "HTML/CSS"],
      icon: "fa-chalkboard-teacher",
      color: "#ec4899",
      links: []
    }
  ];

  // ==================== ORBITAL PROJECTS GALLERY ====================
  const projectsSection = document.getElementById("projects");
  
  if (projectsSection) {
    const orbitalContainer = document.createElement("div");
    orbitalContainer.className = "orbital-container";
    
    // Create Header for the section (re-using current title but adding subtext)
    const sectionHeader = `
      <div class="section-title orbital-header">
        <h2>My Projects</h2>
        <p>From AI systems to complex web portals — interactive showcase.</p>
      </div>
    `;
    
    const orbitalGallery = `
      <div class="orbital-wrapper">
        <div class="orbital-orbit">
          <div class="orbital-path"></div>
          <div class="orbital-icons-container" id="orbitalIcons"></div>
        </div>
        
        <div class="central-card-wrapper">
          <div class="central-card" id="centralCard">
            <div class="card-glow"></div>
            <div class="card-content">
              <div class="project-badge" id="cardCategory"></div>
              <div class="project-icon-large"><i id="cardIcon" class="fas"></i></div>
              <h3 id="cardTitle"></h3>
              <p id="cardDescription"></p>
              <div class="project-tech-tags" id="cardTech"></div>
              <div class="project-action-links" id="cardLinks"></div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    projectsSection.innerHTML = `<div class="container">${sectionHeader}${orbitalGallery}</div>`;
    
    const iconsContainer = document.getElementById("orbitalIcons");
    const centralCard = document.getElementById("centralCard");
    const orbitalOrbit = document.querySelector(".orbital-orbit");
    let activeProjectIndex = 0;
    
    // Helper to convert hex to RGB for CSS variables (glow effects)
    function hexToRgb(hex) {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? 
        `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : 
        "99, 102, 241";
    }

    // Function to update the central card
    function updateCentralCard(project) {
      const cardTitle = document.getElementById("cardTitle");
      const cardCategory = document.getElementById("cardCategory");
      const cardIcon = document.getElementById("cardIcon");
      const cardDescription = document.getElementById("cardDescription");
      const cardTech = document.getElementById("cardTech");
      const cardLinks = document.getElementById("cardLinks");
      
      // Animate out
      centralCard.classList.remove("active");
      
      setTimeout(() => {
        cardTitle.textContent = project.title;
        cardCategory.textContent = project.category;
        cardIcon.className = `fas ${project.icon}`;
        cardDescription.textContent = project.description;
        
        // Render tech tags
        cardTech.innerHTML = project.tech.map(t => `<span class="tech-tag">${t}</span>`).join("");
        
        // Render links
        cardLinks.innerHTML = project.links.length > 0 ? project.links.map(l => `
          <a href="${l.url}" target="_blank" rel="noopener" class="btn btn-outline">
            <i class="fab ${l.icon}"></i> ${l.label}
          </a>
        `).join("") : "";
        
        // Update glow colors
        centralCard.style.setProperty('--project-color', project.color);
        centralCard.style.setProperty('--project-color-rgb', hexToRgb(project.color));
        
        // Animate in
        centralCard.classList.add("active");
      }, 400);
    }
    
    // Render orbital icons
    function renderOrbitalIcons() {
      const radius = window.innerWidth > 768 ? 400 : 180;
      const count = projectsData.length;
      
      // Clear container
      iconsContainer.innerHTML = '';
      
      // Create line
      let activeLine = document.querySelector(".active-line");
      if (!activeLine) {
        activeLine = document.createElement("div");
        activeLine.className = "active-line";
        orbitalOrbit.appendChild(activeLine);
      }
      
      projectsData.forEach((project, index) => {
        const angle = (index / count) * 2 * Math.PI - Math.PI / 2;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        
        const iconBtn = document.createElement("button");
        iconBtn.className = `orbital-icon-btn ${index === activeProjectIndex ? "active" : ""}`;
        iconBtn.style.transform = `translate(${x}px, ${y}px)`;
        iconBtn.innerHTML = `<i class="fas ${project.icon}"></i>`;
        iconBtn.setAttribute("aria-label", `View ${project.title}`);
        
        // Custom properties for hover scaling
        iconBtn.style.setProperty('--tw-translate-x', `${x}px`);
        iconBtn.style.setProperty('--tw-translate-y', `${y}px`);
        
        iconBtn.onclick = () => {
          if (index !== activeProjectIndex) {
            activeProjectIndex = index;
            document.querySelectorAll(".orbital-icon-btn").forEach(btn => btn.classList.remove("active"));
            iconBtn.classList.add("active");
            
            updateCentralCard(project);
            rotateOrbit(index);
            updateLine(index, radius);
          }
        };
        
        iconsContainer.appendChild(iconBtn);
      });
      
      // Initial state
      updateCentralCard(projectsData[activeProjectIndex]);
      rotateOrbit(activeProjectIndex);
      updateLine(activeProjectIndex, radius);
    }
    
    // Function to update the connecting line
    function updateLine(index, radius) {
      const activeLine = document.querySelector(".active-line");
      if (activeLine) {
        const angle = (index / projectsData.length) * 360 - 90;
        activeLine.style.width = `${radius - 40}px`;
        activeLine.style.transform = `rotate(${angle}deg)`;
        activeLine.style.setProperty('--project-color', projectsData[index].color);
      }
    }
    
    let currentRotation = 0;
    function rotateOrbit(index) {
      const count = projectsData.length;
      const targetRotation = -(index / count) * 360;
      
      // Smooth rotation logic
      const diff = ((targetRotation - currentRotation + 180) % 360) - 180;
      currentRotation += diff;
      
      iconsContainer.style.transform = `rotate(${currentRotation}deg)`;
      
      // Keep icons upright
      document.querySelectorAll(".orbital-icon-btn").forEach(btn => {
        btn.style.setProperty('--icon-rotation', `${-currentRotation}deg`);
      });
    }
    
    renderOrbitalIcons();
    
    // Handle resize
    let resizeTimer;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        renderOrbitalIcons();
      }, 250);
    });
  }

  // ==================== EXPERIENCE TABS ====================

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
