function setBurgerOpen(burgerButton, isOpen) {
 const inertElements = document.querySelectorAll('[data-burger-inert]')

 burgerButton.setAttribute('aria-expanded', isOpen)

 inertElements.forEach(element => {
  element.inert = isOpen
 })
}

function getOpenBurgerButton() {
 const openBurgerButton = document.querySelector(
  '[data-burger-button][aria-expanded="true"]'
 )

 return openBurgerButton
}

export function initBurger() {
 document.addEventListener('click', event => {
  const burgerButton = event.target.closest('[data-burger-button]')
  if (burgerButton) {
   const isOpen = burgerButton.getAttribute('aria-expanded') === 'true'
   setBurgerOpen(burgerButton, !isOpen)
   return
  }

  const burgerLink = event.target.closest('[data-burger-link]')
  if (!burgerLink) return
  const openBurgerButton = getOpenBurgerButton()
  if (!openBurgerButton) return
  setBurgerOpen(openBurgerButton, false)
 })

 document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return
  const openBurgerButton = getOpenBurgerButton()
  if (!openBurgerButton) return
  setBurgerOpen(openBurgerButton, false)
  openBurgerButton.focus()
 })

 // Дублює змінну bm з _variables.scss
 const mobileQuery = window.matchMedia('(max-width: 47.99875rem)')

 mobileQuery.addEventListener('change', () => {
  const openBurgerButton = getOpenBurgerButton()
  if (!openBurgerButton) return
  setBurgerOpen(openBurgerButton, false)
 })
}
