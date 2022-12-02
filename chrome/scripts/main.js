const elements = document.querySelectorAll("input", "form")

console.log(`Discovered ${elements.length} that could potentially autocomplete.`)

elements.forEach((element) => {
  console.log("Setting autocomplete=disabled for:", element)
  element.setAttribute('autocomplete', 'disabled')
})
