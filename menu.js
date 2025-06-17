document.addEventListener("DOMContentLoaded", () => {
  const categoryButtons = document.querySelectorAll(".category-btn")
  const menuCategories = document.querySelectorAll(".menu-category")

  categoryButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const targetCategory = this.getAttribute("data-category")

      categoryButtons.forEach((btn) => btn.classList.remove("active"))
      menuCategories.forEach((category) => category.classList.remove("active"))

      this.classList.add("active")
      const targetElement = document.getElementById(targetCategory)
      if (targetElement) {
        targetElement.classList.add("active")
      }
    })
  })

  const menuItems = document.querySelectorAll(".menu-item-card")
  menuItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px) scale(1.02)"
    })

    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)"
    })
  })


  const menuSection = document.querySelector(".menu-section .container")
  if (menuSection) {
    menuSection.insertBefore(searchInput, document.querySelector(".menu-categories"))
  }

  searchInput.addEventListener("input", function () {
    const searchTerm = this.value.toLowerCase()
    const allMenuItems = document.querySelectorAll(".menu-item-card")

    allMenuItems.forEach((item) => {
      const itemName = item.querySelector("h3").textContent.toLowerCase()
      const itemDescription = item.querySelector("p").textContent.toLowerCase()

      if (itemName.includes(searchTerm) || itemDescription.includes(searchTerm)) {
        item.style.display = "flex"
      } else {
        item.style.display = "none"
      }
    })
  })
})
