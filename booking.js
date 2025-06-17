document.addEventListener("DOMContentLoaded", () => {
  const bookingForm = document.getElementById("booking-form")
  const modal = document.getElementById("confirmation-modal")
  const closeModalBtn = document.getElementById("close-modal-btn")
  const closeModal = document.getElementById("close-modal")

  function clearValidation(fieldId) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(`${fieldId}-error`)
    const successElement = document.getElementById(`${fieldId}-success`)

    if (errorElement) {
      errorElement.style.display = "none"
    }

    if (successElement) {
      successElement.style.display = "none"
    }
  }

  function showError(fieldId, message) {
    const field = document.getElementById(fieldId)
    const errorElement = document.getElementById(`${fieldId}-error`)

    if (errorElement) {
      errorElement.textContent = message
      errorElement.style.display = "block"
    }
  }

  function showSuccess(fieldId) {
    const field = document.getElementById(fieldId)
    const successElement = document.getElementById(`${fieldId}-success`)

    if (successElement) {
      successElement.style.display = "block"
    }
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  function validatePhone(phone) {
    const re = /^\d{10}$/
    return re.test(phone)
  }

  function validateDate(date) {
    const selectedDate = new Date(date)
    const today = new Date()
    return selectedDate > today
  }

  if (bookingForm) {
    bookingForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateBookingForm()) {
        submitBooking()
      }
    })
  }

  const formFields = ["fullName", "email", "phone", "date", "time", "guests"]
  formFields.forEach((fieldId) => {
    const field = document.getElementById(fieldId)
    if (field) {
      field.addEventListener("blur", () => validateField(fieldId))
      field.addEventListener("input", () => clearValidation(fieldId))
    }
  })

  function validateField(fieldId) {
    const field = document.getElementById(fieldId)
    const value = field.value.trim()

    switch (fieldId) {
      case "fullName":
        if (!value) {
          showError(fieldId, "Full name is required")
          return false
        } else if (value.length < 2) {
          showError(fieldId, "Name must be at least 2 characters")
          return false
        } else {
          showSuccess(fieldId)
          return true
        }

      case "email":
        if (!value) {
          showError(fieldId, "Email is required")
          return false
        } else if (!validateEmail(value)) {
          showError(fieldId, "Please enter a valid email address")
          return false
        } else {
          showSuccess(fieldId)
          return true
        }

      case "phone":
        if (!value) {
          showError(fieldId, "Phone number is required")
          return false
        } else if (!validatePhone(value)) {
          showError(fieldId, "Please enter a valid phone number")
          return false
        } else {
          showSuccess(fieldId)
          return true
        }

      case "date":
        if (!value) {
          showError(fieldId, "Booking date is required")
          return false
        } else if (!validateDate(value)) {
          showError(fieldId, "Please select a future date")
          return false
        } else {
          showSuccess(fieldId)
          updateAvailableTimes(value)
          return true
        }

      case "time":
        if (!value) {
          showError(fieldId, "Booking time is required")
          return false
        } else if (!validateBookingTime(document.getElementById("date").value, value)) {
          showError(fieldId, "Please select a valid time")
          return false
        } else {
          showSuccess(fieldId)
          return true
        }

      case "guests":
        if (!value) {
          showError(fieldId, "Number of guests is required")
          return false
        } else if (Number.parseInt(value) < 1) {
          showError(fieldId, "At least 1 guest is required")
          return false
        } else {
          showSuccess(fieldId)
          return true
        }

      default:
        return true
    }
  }

  function validateBookingForm() {
    let isValid = true

    formFields.forEach((fieldId) => {
      if (!validateField(fieldId)) {
        isValid = false
      }
    })

    return isValid
  }

  function validateBookingTime(date, time) {
    if (!date || !time) return false

    const selectedDate = new Date(date)
    const today = new Date()
    const [hours, minutes] = time.split(":")
    const selectedDateTime = new Date(selectedDate)
    selectedDateTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

    if (selectedDate.toDateString() === today.toDateString()) {
      const twoHoursFromNow = new Date(today.getTime() + 2 * 60 * 60 * 1000)
      return selectedDateTime >= twoHoursFromNow
    }

    return true
  }

  function updateAvailableTimes(date) {
    const timeSelect = document.getElementById("time")
    const selectedDate = new Date(date)
    const today = new Date()

    if (selectedDate.toDateString() === today.toDateString()) {
      const options = timeSelect.querySelectorAll("option")
      const twoHoursFromNow = new Date(today.getTime() + 2 * 60 * 60 * 1000)

      options.forEach((option) => {
        if (option.value) {
          const [hours, minutes] = option.value.split(":")
          const optionTime = new Date(selectedDate)
          optionTime.setHours(Number.parseInt(hours), Number.parseInt(minutes))

          if (optionTime < twoHoursFromNow) {
            option.disabled = true
            option.textContent += " (Not Available)"
          } else {
            option.disabled = false
            option.textContent = option.textContent.replace(" (Not Available)", "")
          }
        }
      })
    } else {
      const options = timeSelect.querySelectorAll("option")
      options.forEach((option) => {
        option.disabled = false
        option.textContent = option.textContent.replace(" (Not Available)", "")
      })
    }
  }

  function submitBooking() {
    const submitBtn = bookingForm.querySelector(".submit-btn")
    const originalText = submitBtn.innerHTML

    submitBtn.innerHTML = '<div class="loading"></div> Processing...'
    submitBtn.disabled = true

    setTimeout(() => {
      const formData = new FormData(bookingForm)
      const bookingData = {
        fullName: formData.get("fullName"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        date: formData.get("date"),
        time: formData.get("time"),
        guests: formData.get("guests"),
        specialRequests: formData.get("specialRequests"),
        confirmationNumber: generateConfirmationNumber(),
      }

      showConfirmation(bookingData)
      bookingForm.reset()

      submitBtn.innerHTML = originalText
      submitBtn.disabled = false

      formFields.forEach((fieldId) => clearValidation(fieldId))
    }, 2000)
  }

  function generateConfirmationNumber() {
    return "BV" + Date.now().toString().slice(-6) + Math.floor(Math.random() * 100)
  }

  function showConfirmation(bookingData) {
    const confirmationDetails = document.getElementById("confirmation-details")
    const formattedDate = new Date(bookingData.date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const formattedTime = new Date(`2000-01-01T${bookingData.time}`).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })

    confirmationDetails.innerHTML = `
            <div class="confirmation-details">
                <p><strong>Confirmation Number:</strong> ${bookingData.confirmationNumber}</p>
                <p><strong>Name:</strong> ${bookingData.fullName}</p>
                <p><strong>Email:</strong> ${bookingData.email}</p>
                <p><strong>Phone:</strong> ${bookingData.phone}</p>
                <p><strong>Date:</strong> ${formattedDate}</p>
                <p><strong>Time:</strong> ${formattedTime}</p>
                <p><strong>Guests:</strong> ${bookingData.guests}</p>
                ${bookingData.specialRequests ? `<p><strong>Special Requests:</strong> ${bookingData.specialRequests}</p>` : ""}
                <div style="margin-top: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 5px;">
                    <p><strong>Important:</strong> Please arrive 15 minutes before your reservation time. We'll hold your table for 15 minutes past your reservation time.</p>
                </div>
            </div>
        `

    modal.classList.add("show")
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal.classList.remove("show")
    })
  }

  if (closeModal) {
    closeModal.addEventListener("click", () => {
      modal.classList.remove("show")
    })
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("show")
      }
    })
  }
})
