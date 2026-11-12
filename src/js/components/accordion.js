function setAccordionItemOpen(button, isOpen) {
 const panelId = button.getAttribute('aria-controls')
 const panel = document.getElementById(panelId)

 button.setAttribute('aria-expanded', isOpen)

 panel.hidden = !isOpen
}

export function initAccordion() {
 document.addEventListener('click', event => {
  const button = event.target.closest('[data-accordion-button]')
  if (!button) return
  const isOpen = button.getAttribute('aria-expanded') === 'true'

  setAccordionItemOpen(button, !isOpen)
 })
}
