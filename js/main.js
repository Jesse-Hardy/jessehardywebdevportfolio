/* global bootstrap */
$(document).ready(function () {
  // Animate elements on scroll
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        $(entry.target).toggleClass(
          "animate__animated animate__fadeIn",
          entry.isIntersecting
        );
      });
    },
    {
      threshold: 0.5
    }
  );

  $(".card-custom, .header-custom, .footer-custom").each((_, element) =>
    observer.observe(element)
  );

  // Collapse menu when nav link is clicked
  $(".nav-link").click(() => {
    const navbarNav = $("#navbarNav");
    const bsCollapse = new bootstrap.Collapse(navbarNav[0], { toggle: false });
    if (navbarNav.hasClass("show")) {
      bsCollapse.hide();
    }
  });

  $('a[href^="#"]').click(function (e) {
    e.preventDefault();
    const target = $($(this).attr("href"));
    const headerHeight = $(".navbar-custom").outerHeight();
    $("html, body").animate(
      { scrollTop: target.offset().top - headerHeight },
      "slow"
    );
  });

  // Form validation and submission
  $(".needs-validation").submit(function (event) {
    event.preventDefault();
    $(this).addClass("was-validated");

    if (this.checkValidity()) {
      const formData = {
        name: $("#name").val(),
        email: $("#email").val(),
        message: $("#message").val()
      };

      $.ajax({
        type: "POST",
        url: "https://your_api_gateway_endpoint",
        data: JSON.stringify(formData),
        contentType: "application/json",
        success: function () {
          alert("Form submission successful!");
          $(".needs-validation").trigger("reset").removeClass("was-validated");
          $("input, textarea", this)
            .removeClass("is-invalid")
            .next()
            .css("display", "none");

          window.location.reload();
        },
        error: function () {
          alert("Failed to submit the form. Please try again.");
        }
      });

      $(this).trigger("reset").removeClass("was-validated");
      $("input, textarea", this)
        .removeClass("is-invalid")
        .next()
        .css("display", "none");

      window.location.reload();
    }
  });

  // Preloader
  setTimeout(() => $(".preloader").css("display", "none"), 1500);

  function setDarkMode(state) {
    if (state) {
      $("body").addClass("dark-mode");
      localStorage.setItem("darkMode", "enabled");
    } else {
      $("body").removeClass("dark-mode");
      localStorage.setItem("darkMode", "disabled");
    }
  }

  // Dark mode toggle
  const darkModeBtn = $("<button>", {
    class: "dark-mode-btn",
    text: "Dark Mode",
    click: function () {
      const isDarkMode = $("body").hasClass("dark-mode");
      setDarkMode(!isDarkMode);
      $(this).toggleClass("dark");
    }
  });

  // Check and set the dark mode state from localStorage
  const storedDarkMode = localStorage.getItem("darkMode");
  if (storedDarkMode === "enabled") {
    setDarkMode(true);
    $(".dark-mode-btn").addClass("dark");
  }

  $("body").append(darkModeBtn);
});
