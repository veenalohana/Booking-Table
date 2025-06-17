document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateContactForm()) {
        submitContactForm()
      }
    })
  }

  const contactFields = ["firstName", "lastName", "contactEmail", "subject", "message"]
  contactFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.addEventListener("blur", () => validateContactField(fieldId))
      field.addEventListener("input", () => {
        field.classList.remove("error", "success")
      })
    }
  })

  function validateContactField(fieldId) {
    const field = document.getElementById(fieldId)
    const value = field.value.trim()

    switch (fieldId) {
      case "firstName":
      case "lastName":
        if (!value) {
          field.classList.add("error")
          return false
        } else if (value.length < 2) {
          field.classList.add("error")
          return false
        } else {
          field.classList.remove("error")
          field.classList.add("success")
          return true
        }

      case "contactEmail":
        if (!value) {
          field.classList.add("error")
          return false
        } else if (!validateEmail(value)) {
          field.classList.add("error")
          return false
        } else {
          field.classList.remove("error")
          field.classList.add("success")
          return true
        }

      case "subject":
        if (!value) {
          field.classList.add("error")
          return false
        } else {
          field.classList.remove("error")
          field.classList.add("success")
          return true
        }

      case "message":
        if (!value) {
          field.classList.add("error")
          return false
        } else if (value.length < 10) {
          field.classList.add("error")
          return false
        } else {
          field.classList.remove("error")
          field.classList.add("success")
          return true
        }

      default:
        return true
    }
  }

  function validateContactForm() {
    let isValid = true

    contactFields.forEach((fieldId) => {
      if (!validateContactField(fieldId)) {
        isValid = false
      }
    })

    return isValid
  }

  function submitContactForm() {
    const submitBtn = contactForm.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<div class="loading"></div> Sending...'
    submitBtn.disabled = true

    setTimeout(() => {
      showContactSuccess()
      contactForm.reset()

      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      contactFields.forEach((fieldId) => {
        const field = document.getElementById(fieldId)
        if (field) {
          field.classList.remove("error", "success")
        }
      })
    }, 2000)
  }

  function showContactSuccess() {
    
    const successMessage = document.createElement("div")
    successMessage.className = "success-message"
    successMessage.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `
    successMessage.innerHTML = `
            <div style="display: flex; align-items: center; gap: 0.5rem;">
                <i class="fas fa-check-circle"></i>
                <span>Message sent successfully! We'll get back to you soon.</span>
            </div>
        `

    document.body.appendChild(successMessage)

    setTimeout(() => {
      successMessage.style.transform = "translateX(0)"
    }, 100)

    setTimeout(() => {
      successMessage.style.transform = "translateX(100%)"
      setTimeout(() => {
        document.body.removeChild(successMessage)
      }, 300)
    }, 5000)
  }

  function initializeMap() {
    console.log("Map initialized")
  }

  const locationCards = document.querySelectorAll(".contact-card")
  locationCards.forEach((card) => {
    if (card.querySelector(".fa-map-marker-alt")) {
      card.style.cursor = "pointer"
      card.addEventListener("click", () => {
        const mapSection = document.querySelector(".map-section")
        if (mapSection) {
          mapSection.scrollIntoView({ behavior: "smooth" })
        }
      })
    }
  })

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }
})
