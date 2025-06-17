
document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    document.body.classList.remove("loading")
    document.body.classList.add("loaded")
  }, 100)

  const navToggle = document.getElementById("nav-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active")
      navToggle.classList.toggle("active")
    })

    const navLinks = document.querySelectorAll(".nav-link")
    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active")
        navToggle.classList.remove("active")
      })
    })
  }

  const themeToggle = document.getElementById("theme-toggle")
  const body = document.body

  const currentTheme = localStorage.getItem("theme") || "light"
  body.setAttribute("data-theme", currentTheme)

  updateThemeIcon(currentTheme)

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const currentTheme = body.getAttribute("data-theme")
      const newTheme = currentTheme === "dark" ? "light" : "dark"

      body.setAttribute("data-theme", newTheme)
      localStorage.setItem("theme", newTheme)
      updateThemeIcon(newTheme)
    })
  }

  function updateThemeIcon(theme) {
    const icon = themeToggle?.querySelector("i")
    if (icon) {
      icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon"
    }
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]')
  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const targetId = this.getAttribute("href").substring(1)
      const targetElement = document.getElementById(targetId)

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add("visible")
        }, 100)
      }
    })
  }, observerOptions)

  const elementsToAnimate = document.querySelectorAll(`
  .hero-content, 
  .hero-image, 
  .about-text, 
  .about-image, 
  .feature, 
  .menu-item, 
  .menu-item-card,
  .booking-info,
  .booking-form-container,
  .contact-card,
  .contact-form-section
`)

  elementsToAnimate.forEach((el, index) => {
    el.classList.add("fade-in")
    el.style.transitionDelay = `${index * 0.1}s`
    observer.observe(el)
  })

  let lastScrollY = window.scrollY
  const navbar = document.querySelector(".navbar")

  window.addEventListener("scroll", () => {
    const currentScrollY = window.scrollY

    if (currentScrollY > 100) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    if (currentScrollY > lastScrollY && currentScrollY > 200) {
      navbar.style.transform = "translateY(-100%)"
    } else {
      navbar.style.transform = "translateY(0)"
    }

    lastScrollY = currentScrollY
  })

  window.validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  window.validatePhone = (phone) => {
    const phoneRegex = /^[+]?[1-9][\d]{0,15}$/
    const cleanPhone = phone.replace(/[\s\-$$$$]/g, "")
    return phoneRegex.test(cleanPhone) && cleanPhone.length >= 10
  }

  window.validateDate = (date) => {
    const selectedDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    return selectedDate >= today
  }

  window.showError = (fieldId, message) => {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "-error")

    if (field && errorElement) {
      field.classList.add("error")
      field.classList.remove("success")
      errorElement.textContent = message
      errorElement.classList.add("show")
    }
  }

  window.showSuccess = (fieldId) => {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "-error")

    if (field && errorElement) {
      field.classList.remove("error")
      field.classList.add("success")
      errorElement.classList.remove("show")
    }
  }

  window.clearValidation = (fieldId) => {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(fieldId + "-error")

    if (field && errorElement) {
      field.classList.remove("error", "success")
      errorElement.classList.remove("show")
    }
  }

  const dateInputs = document.querySelectorAll('input[type="date"]')
  const today = new Date().toISOString().split("T")[0]
  dateInputs.forEach((input) => {
    input.setAttribute("min", today)
  })

  window.addEventListener("load", () => {
    document.body.classList.add("loaded")

    const heroContent = document.querySelector(".hero-content")
    const heroImage = document.querySelector(".hero-image")

    if (heroContent) {
      setTimeout(() => {
        heroContent.style.opacity = "1"
        heroContent.style.transform = "translateY(0)"
      }, 300)
    }

    if (heroImage) {
      setTimeout(() => {
        heroImage.style.opacity = "1"
        heroImage.style.transform = "translateX(0)"
      }, 600)
    }
  })
})

window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const heroImage = document.querySelector(".hero-image")

  if (heroImage && scrolled < window.innerHeight) {
    heroImage.style.transform = `translateY(${scrolled * 0.2}px)`
  }
})
