// style-switcher.js
document.addEventListener("DOMContentLoaded", function () {

  const styleSwitcher = document.querySelector(".style-switcher");
  const styleSwitcherToggle = document.querySelector(".style-switcher-toggler");
  const dayNight = document.querySelector(".day-night");
  const alternateStyles = document.querySelectorAll(".alternate-style");

  // 1) Toggler open/close
  if (styleSwitcherToggle && styleSwitcher) {
    styleSwitcherToggle.addEventListener("click", function () {
      styleSwitcher.classList.toggle("open");
    });
  }

  // 2) Hide on scroll
  window.addEventListener("scroll", function () {
    if (styleSwitcher && styleSwitcher.classList.contains("open")) {
      styleSwitcher.classList.remove("open");
    }
  });

  // 3) Color switcher (global so onclick works)
  window.setActivateStyle = function (colorTitle) {
    if (!alternateStyles || alternateStyles.length === 0) return;
    alternateStyles.forEach(function (link) {
      if (link.getAttribute("title") === colorTitle) {
        link.removeAttribute("disabled");
      } else {
        link.setAttribute("disabled", "true");
      }
    });
    localStorage.setItem("selectedTheme", colorTitle);
  };

  // 4) Load saved theme (title) or set default (first)
  const savedTheme = localStorage.getItem("selectedTheme");
  if (savedTheme) {
    alternateStyles.forEach(function (link) {
      if (link.getAttribute("title") === savedTheme) link.removeAttribute("disabled");
      else link.setAttribute("disabled", "true");
    });
  } else {
    // ensure only first alternate-style (color-1) is enabled
    if (alternateStyles.length) {
      const defaultTitle = alternateStyles[0].getAttribute("title");
      alternateStyles.forEach(function (link) {
        if (link.getAttribute("title") === defaultTitle) link.removeAttribute("disabled");
        else link.setAttribute("disabled", "true");
      });
      localStorage.setItem("selectedTheme", defaultTitle);
    }
  }

  // 5) Day/Night toggle with persistence
  function updateDayNightIcon() {
    if (!dayNight) return;
    const icon = dayNight.querySelector("i");
    if (!icon) return;
    if (document.body.classList.contains("dark")) {
      icon.classList.remove("fa-moon");
      icon.classList.add("fa-sun");
    } else {
      icon.classList.remove("fa-sun");
      icon.classList.add("fa-moon");
    }
  }

  if (dayNight) {
    dayNight.addEventListener("click", function () {
      document.body.classList.toggle("dark");
      if (document.body.classList.contains("dark")) {
        localStorage.setItem("darkMode", "enabled");
      } else {
        localStorage.setItem("darkMode", "disabled");
      }
      updateDayNightIcon();
    });
  }

  // Load dark mode from localStorage
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
  updateDayNightIcon();

}); // DOMContentLoaded end



function setActiveStyle(color) {
  const links = document.querySelectorAll(".alternate-style");
  links.forEach((link) => {
    if (link.getAttribute("title") === color) {
      link.removeAttribute("disabled");
    } else {
      link.setAttribute("disabled", "true");
    }
  });
}



// get all nav links
const navLinks = document.querySelectorAll(".nav a");

navLinks.forEach(link => {
    link.addEventListener("click", function() {
        // remove active from all
        navLinks.forEach(l => l.classList.remove("active"));
        // add active to clicked one
        this.classList.add("active");
    });
});


