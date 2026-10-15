function getOwnElements(tabRoot, selector) {
 const allElements = [...tabRoot.querySelectorAll(selector)]
 return allElements.filter(
  element => element.closest('[data-tabs]') === tabRoot
 )
}

function selectTab(button) {
 const tabRoot = button.closest('[data-tabs]')
 const tabButtons = getOwnElements(tabRoot, '[data-tabs-button]')
 const tabPanels = getOwnElements(tabRoot, '[data-tabs-panel]')

 tabButtons.forEach(tabButton => {
  tabButton.setAttribute('aria-selected', 'false')
  tabButton.tabIndex = -1
 })

 tabPanels.forEach(tabPanel => {
  tabPanel.hidden = true
 })

 button.setAttribute('aria-selected', 'true')
 button.tabIndex = 0

 const panelId = button.getAttribute('aria-controls')
 const selectedPanel = document.getElementById(panelId)

 selectedPanel.hidden = false

 if (tabRoot.hasAttribute('data-tabs-hash')) {
  history.replaceState(null, '', '#' + button.id)
 }
}

function getButtonForKey(button, key) {
 const tabRoot = button.closest('[data-tabs]')
 const tabButtons = getOwnElements(tabRoot, '[data-tabs-button]')
 const currentIndex = tabButtons.indexOf(button)
 const lastIndex = tabButtons.length - 1

 if (key === 'ArrowRight') {
  if (currentIndex === lastIndex) {
   return tabButtons[0]
  }
  return tabButtons[currentIndex + 1]
 }

 if (key === 'ArrowLeft') {
  if (currentIndex === 0) {
   return tabButtons[lastIndex]
  }
  return tabButtons[currentIndex - 1]
 }

 if (key === 'Home') {
  return tabButtons[0]
 }
 if (key === 'End') {
  return tabButtons[lastIndex]
 }
}

function selectTabFromHash() {
 const tabId = location.hash.slice(1)
 if (!tabId) return

 const button = document.getElementById(tabId)
 if (!button || !button.hasAttribute('data-tabs-button')) return

 const tabRoot = button.closest('[data-tabs]')
 if (!tabRoot.hasAttribute('data-tabs-hash')) return

 selectTab(button)
}

export function initTabs() {
 document.addEventListener('click', event => {
  const button = event.target.closest('[data-tabs-button]')
  if (!button) return
  selectTab(button)
 })

 document.addEventListener('keydown', event => {
  const button = event.target.closest('[data-tabs-button]')
  if (!button) return

  const buttonToSelect = getButtonForKey(button, event.key)
  if (!buttonToSelect) return

  event.preventDefault()

  selectTab(buttonToSelect)

  buttonToSelect.focus()
 })

 selectTabFromHash()

 window.addEventListener('hashchange', selectTabFromHash)
}
