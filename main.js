/**
 * main.js
 * Portfolio Application Controller
 * Satisfies Requirements: B1, B2, B4, B5
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // ==========================================
  // 1. STATE & STORAGE MANAGEMENT (B4, B5)
  // ==========================================
  const STORAGE_KEYS = {
    THEME: "portfolio_theme",
    FAVORITES: "portfolio_favorites"
  };

  // State object
  const state = {
    theme: localStorage.getItem(STORAGE_KEYS.THEME) || "dark",
    favorites: JSON.parse(localStorage.getItem(STORAGE_KEYS.FAVORITES) || "[]"),
    activeFilter: "all",
    showOnlyFavorites: false,
    projects: window.projectsData || []
  };

  // Save favorites helper (B4)
  const persistFavorites = () => {
    localStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(state.favorites));
  };

  // Save theme helper (B4)
  const persistTheme = (theme) => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
  };

  // ==========================================
  // 2. THEME SWITCHER (B2, B4)
  // ==========================================
  const themeToggleBtn = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const themeText = document.getElementById("theme-text");

  const applyTheme = (theme) => {
    state.theme = theme;
    document.documentElement.setAttribute("data-theme", theme);
    persistTheme(theme);

    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
    if (themeText) {
      themeText.textContent = theme === "dark" ? "Light Mode" : "Dark Mode";
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute("aria-label", `Switch to ${theme === "dark" ? "Light" : "Dark"} mode`);
    }
  };

  // Initialize theme from storage or system preference
  const systemPrefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  const initialTheme = localStorage.getItem(STORAGE_KEYS.THEME) || (systemPrefersDark ? "dark" : "light");
  applyTheme(initialTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const nextTheme = state.theme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
    });
  }

  // ==========================================
  // 3. MOBILE NAVIGATION DRAWER (B2)
  // ==========================================
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const primaryNav = document.getElementById("primary-nav");
  const navLinks = document.querySelectorAll(".nav-link");

  const toggleMobileNav = (forceState = null) => {
    if (!mobileMenuBtn || !primaryNav) return;
    const isExpanded = forceState !== null 
      ? forceState 
      : mobileMenuBtn.getAttribute("aria-expanded") === "true";
    
    const targetState = !isExpanded;
    mobileMenuBtn.setAttribute("aria-expanded", String(targetState));
    primaryNav.classList.toggle("nav-open", targetState);
    document.body.classList.toggle("nav-lock-scroll", targetState);

    // Update hamburger icon
    const hamburgerIcon = mobileMenuBtn.querySelector(".hamburger-icon");
    if (hamburgerIcon) {
      hamburgerIcon.textContent = targetState ? "✕" : "☰";
    }
  };

  if (mobileMenuBtn && primaryNav) {
    mobileMenuBtn.addEventListener("click", () => toggleMobileNav());

    // Close menu when clicking outside or navigating
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        if (primaryNav.classList.contains("nav-open")) {
          toggleMobileNav(false);
        }
      });
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && primaryNav.classList.contains("nav-open")) {
        toggleMobileNav(false);
      }
    });
  }

  // ==========================================
  // 4. SCROLL-TO-TOP BUTTON (A9, B2)
  // ==========================================
  const scrollTopBtn = document.getElementById("scroll-top-btn");

  const handleScrollDepth = () => {
    if (!scrollTopBtn) return;
    if (window.scrollY > 350) {
      scrollTopBtn.classList.add("visible");
    } else {
      scrollTopBtn.classList.remove("visible");
    }
  };

  window.addEventListener("scroll", handleScrollDepth, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  // ==========================================
  // 5. DYNAMIC PROJECTS RENDERING (B1, B5)
  // ==========================================
  const projectsGrid = document.getElementById("projects-grid");
  const projectCountSpan = document.getElementById("projects-count");
  const favoritesCountSpan = document.getElementById("favorites-count");

  // Favorite toggle handler
  const toggleFavorite = (projectId, starBtn) => {
    const isFav = state.favorites.includes(projectId);
    if (isFav) {
      state.favorites = state.favorites.filter((id) => id !== projectId);
    } else {
      state.favorites = [...state.favorites, projectId];
    }
    persistFavorites();
    updateFavoriteCounters();

    // Re-render or update card visual
    if (state.showOnlyFavorites) {
      renderProjects();
    } else if (starBtn) {
      const nowFav = state.favorites.includes(projectId);
      starBtn.classList.toggle("favorited", nowFav);
      starBtn.setAttribute("aria-pressed", String(nowFav));
      starBtn.title = nowFav ? "Remove from favorites" : "Save to favorites";
      starBtn.innerHTML = nowFav ? "★ Saved" : "☆ Save";
    }
  };

  const updateFavoriteCounters = () => {
    if (favoritesCountSpan) {
      favoritesCountSpan.textContent = `(${state.favorites.length})`;
    }
  };

  // Render Projects Cards (NO Live Demo link per user instruction)
  const renderProjects = () => {
    if (!projectsGrid) return;

    // Filter projects using ES6 array methods
    let filteredList = state.projects;

    if (state.activeFilter !== "all") {
      filteredList = filteredList.filter(
        ({ category }) => category === state.activeFilter
      );
    }

    if (state.showOnlyFavorites) {
      filteredList = filteredList.filter(({ id }) =>
        state.favorites.includes(id)
      );
    }

    if (projectCountSpan) {
      projectCountSpan.textContent = `Showing ${filteredList.length} of ${state.projects.length} projects`;
    }

    // Handle empty state gracefully
    if (filteredList.length === 0) {
      projectsGrid.innerHTML = `
        <article class="projects-empty-state">
          <div class="empty-icon">📂</div>
          <h3>No matching projects found</h3>
          <p>${state.showOnlyFavorites 
            ? "You haven't saved any projects to your favorites yet. Click the '☆ Save' button on any project card to bookmark it!" 
            : "Try selecting a different filter category above."}</p>
          <button type="button" class="btn btn-secondary" id="reset-filter-btn">Reset Filters</button>
        </article>
      `;

      const resetBtn = document.getElementById("reset-filter-btn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          state.activeFilter = "all";
          state.showOnlyFavorites = false;
          updateFilterButtons();
          renderProjects();
        });
      }
      return;
    }

    // Build project card markup using Array.prototype.map (B1, B5)
    projectsGrid.innerHTML = filteredList
      .map((project) => {
        const { id, title, categoryLabel, duration, shortDescription, image, technologies, repoUrl, stats } = project;
        const isFavorited = state.favorites.includes(id);

        return `
          <article class="project-card" data-id="${id}" id="project-${id}">
            <div class="project-image-wrapper">
              <img 
                src="${image}" 
                alt="System preview of ${title}" 
                class="project-thumbnail"
                loading="lazy"
                width="600"
                height="360"
              />
              <span class="project-badge">${categoryLabel}</span>
              <button 
                type="button" 
                class="btn-favorite ${isFavorited ? "favorited" : ""}" 
                data-id="${id}"
                aria-pressed="${isFavorited}"
                title="${isFavorited ? "Remove from favorites" : "Save to favorites"}"
              >
                ${isFavorited ? "★ Saved" : "☆ Save"}
              </button>
            </div>

            <div class="project-content">
              <header class="project-card-header">
                <div class="project-duration-tag">${duration || ""}</div>
                <h3 class="project-title">${title}</h3>
                <p class="project-description">${shortDescription}</p>
              </header>

              <div class="project-meta">
                <span class="project-stat-pill">
                  <strong>${stats.metricLabel}:</strong> ${stats.metricValue}
                </span>
              </div>

              <div class="tech-tag-group" aria-label="Technologies used">
                ${technologies
                  .map((tech) => `<span class="tech-tag">${tech}</span>`)
                  .join("")}
              </div>

              <footer class="project-actions">
                <button 
                  type="button" 
                  class="btn btn-sm btn-primary open-modal-btn" 
                  data-project-id="${id}"
                  aria-haspopup="dialog"
                >
                  View Project Details ↗
                </button>
                <a 
                  href="${repoUrl}" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="btn btn-sm btn-outline"
                  aria-label="Repository on GitHub for ${title}"
                  title="Source Code on GitHub"
                >
                  GitHub Repo ↗
                </a>
              </footer>
            </div>
          </article>
        `;
      })
      .join("");

    // Attach Event Listeners to Dynamically Generated Elements
    // 1. Favorite buttons
    const favButtons = projectsGrid.querySelectorAll(".btn-favorite");
    favButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const projectId = btn.getAttribute("data-id");
        toggleFavorite(projectId, btn);
      });
    });

    // 2. Open Details Modal buttons
    const modalButtons = projectsGrid.querySelectorAll(".open-modal-btn");
    modalButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const projectId = btn.getAttribute("data-project-id");
        openProjectModal(projectId);
      });
    });
  };

  // ==========================================
  // 6. FILTERING LOGIC (B2)
  // ==========================================
  const filterButtons = document.querySelectorAll(".filter-btn");
  const favFilterToggle = document.getElementById("filter-fav-toggle");

  const updateFilterButtons = () => {
    filterButtons.forEach((btn) => {
      const filterValue = btn.getAttribute("data-filter");
      const isActive = filterValue === state.activeFilter && !state.showOnlyFavorites;
      btn.classList.toggle("active", isActive);
      btn.setAttribute("aria-selected", String(isActive));
    });

    if (favFilterToggle) {
      favFilterToggle.classList.toggle("active", state.showOnlyFavorites);
      favFilterToggle.setAttribute("aria-pressed", String(state.showOnlyFavorites));
    }
  };

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const selectedFilter = btn.getAttribute("data-filter");
      state.activeFilter = selectedFilter;
      state.showOnlyFavorites = false;
      updateFilterButtons();
      renderProjects();
    });
  });

  if (favFilterToggle) {
    favFilterToggle.addEventListener("click", () => {
      state.showOnlyFavorites = !state.showOnlyFavorites;
      updateFilterButtons();
      renderProjects();
    });
  }

  // ==========================================
  // 7. PROJECT DETAILS MODAL / LIGHTBOX (B2)
  // ==========================================
  const modal = document.getElementById("project-modal");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const modalBody = document.getElementById("modal-body-content");

  const openProjectModal = (projectId) => {
    const project = state.projects.find(({ id }) => id === projectId);
    if (!project || !modal || !modalBody) return;

    const { title, categoryLabel, duration, fullDescription, image, technologies, keyFeatures, repoUrl, stats } = project;

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <span class="project-badge">${categoryLabel}</span>
        <span class="modal-duration-badge">${duration || ""}</span>
        <h2 id="modal-title" class="modal-title">${title}</h2>
      </div>

      <div class="modal-image-container">
        <img 
          src="${image}" 
          alt="System architecture diagram for ${title}" 
          class="modal-project-img"
          width="600"
          height="360"
        />
      </div>

      <div class="modal-details-grid">
        <div class="modal-main-desc">
          <h3 class="modal-subheading">Project Summary &amp; Methodology</h3>
          <p class="modal-text">${fullDescription}</p>

          <h3 class="modal-subheading">Key Technical Highlights</h3>
          <ul class="modal-feature-list">
            ${keyFeatures.map((feat) => `<li>${feat}</li>`).join("")}
          </ul>
        </div>

        <aside class="modal-side-meta">
          <h3 class="modal-subheading">Technologies Used</h3>
          <div class="tech-tag-group">
            ${technologies.map((t) => `<span class="tech-tag">${t}</span>`).join("")}
          </div>

          <div class="modal-metrics-box">
            <div class="metric-row">
              <span class="metric-key">Key Metric:</span>
              <span class="metric-val">${stats.metricLabel} (${stats.metricValue})</span>
            </div>
            <div class="metric-row">
              <span class="metric-key">Evaluation:</span>
              <span class="metric-val">${stats.benchmark}</span>
            </div>
          </div>

          <div class="modal-cta-group">
            <a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary btn-block">
              View Repository on GitHub ↗
            </a>
          </div>
        </aside>
      </div>
    `;

    // Open native dialog or display modal
    if (typeof modal.showModal === "function") {
      modal.showModal();
    } else {
      modal.setAttribute("open", "true");
    }

    if (modalBackdrop) modalBackdrop.classList.add("active");
    document.body.classList.add("modal-open-scroll");
  };

  const closeProjectModal = () => {
    if (!modal) return;
    if (typeof modal.close === "function") {
      modal.close();
    } else {
      modal.removeAttribute("open");
    }
    if (modalBackdrop) modalBackdrop.classList.remove("active");
    document.body.classList.remove("modal-open-scroll");
  };

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener("click", closeProjectModal);
  }

  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", closeProjectModal);
  }

  // Close dialog on native escape key or backdrop click
  if (modal) {
    modal.addEventListener("cancel", closeProjectModal);
    modal.addEventListener("click", (e) => {
      const rect = modal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= e.clientY &&
        e.clientY <= rect.top + rect.height &&
        rect.left <= e.clientX &&
        e.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        closeProjectModal();
      }
    });
  }

  // ==========================================
  // 8. OPTIONAL REGEX CONTACT FORM CONTROLLER (B3, B5)
  // Safely guarded if present
  // ==========================================
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    const formSuccessAlert = document.getElementById("form-success-alert");
    const formStatusLive = document.getElementById("form-status-live");

    const formFields = {
      name: {
        input: document.getElementById("contact-name"),
        error: document.getElementById("name-error"),
        regex: /^[a-zA-Z\s]{2,50}$/,
        errorMessage: "Please enter a valid full name (2–50 letters, alphabets and spaces only)."
      },
      email: {
        input: document.getElementById("contact-email"),
        error: document.getElementById("email-error"),
        regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: "Please enter a valid email address (e.g. name@domain.com)."
      },
      message: {
        input: document.getElementById("contact-message"),
        error: document.getElementById("message-error"),
        regex: /^(?!\s*$).{10,1000}$/s,
        errorMessage: "Message must contain at least 10 meaningful characters."
      }
    };

    const validateField = (fieldKey, showImmediateError = true) => {
      const field = formFields[fieldKey];
      if (!field || !field.input) return true;

      const value = field.input.value.trim();
      const isValid = field.regex.test(value);

      if (!isValid && showImmediateError) {
        field.input.classList.add("input-invalid");
        field.input.classList.remove("input-valid");
        field.input.setAttribute("aria-invalid", "true");
        if (field.error) {
          field.error.textContent = field.errorMessage;
          field.error.style.display = "block";
        }
      } else if (isValid) {
        field.input.classList.remove("input-invalid");
        field.input.classList.add("input-valid");
        field.input.setAttribute("aria-invalid", "false");
        if (field.error) {
          field.error.textContent = "";
          field.error.style.display = "none";
        }
      } else {
        field.input.classList.remove("input-invalid");
        field.input.classList.remove("input-valid");
        field.input.removeAttribute("aria-invalid");
        if (field.error) {
          field.error.textContent = "";
          field.error.style.display = "none";
        }
      }

      return isValid;
    };

    Object.keys(formFields).forEach((key) => {
      const field = formFields[key];
      if (!field.input) return;

      field.input.addEventListener("input", () => {
        if (field.input.classList.contains("input-invalid")) {
          validateField(key, true);
        }
      });

      field.input.addEventListener("blur", () => {
        if (field.input.value.trim() !== "") {
          validateField(key, true);
        }
      });
    });

    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      let isFormValid = true;
      let firstInvalidInput = null;

      Object.keys(formFields).forEach((key) => {
        const valid = validateField(key, true);
        if (!valid) {
          isFormValid = false;
          if (!firstInvalidInput) {
            firstInvalidInput = formFields[key].input;
          }
        }
      });

      if (!isFormValid) {
        if (formStatusLive) {
          formStatusLive.textContent = "Please correct the highlighted errors in the form before submitting.";
        }
        if (firstInvalidInput) {
          firstInvalidInput.focus();
        }
        return;
      }

      const submitBtn = contactForm.querySelector("button[type='submit']");
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = "Sending Message... ⏳";
      }

      setTimeout(() => {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = "Send Message 🚀";
        }

        if (formSuccessAlert) {
          formSuccessAlert.style.display = "block";
          formSuccessAlert.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        if (formStatusLive) {
          formStatusLive.textContent = "Thank you! Your message has been sent successfully.";
        }

        contactForm.reset();
        Object.keys(formFields).forEach((key) => {
          const field = formFields[key];
          if (field.input) {
            field.input.classList.remove("input-valid");
            field.input.classList.remove("input-invalid");
          }
        });

        setTimeout(() => {
          if (formSuccessAlert) {
            formSuccessAlert.style.display = "none";
          }
        }, 8000);
      }, 750);
    });
  }

  // ==========================================
  // 9. INITIALIZE APPLICATION (B1, B4)
  // ==========================================
  updateFavoriteCounters();
  renderProjects();
});
