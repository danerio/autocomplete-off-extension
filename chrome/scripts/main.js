
const AUTOFILLABLE_NODE_TYPES = [
  'input',
  'form'
]

const OBSERVER_CONFIG = Object.freeze({
  childList: true,
  subtree: true
});

onPageLoad()

const observer = new MutationObserver(function (mutations) {
  mutations.forEach(function (mutation) {
    const { addedNodes } = mutation

    addedNodes.forEach(traverseNodes)
  });
});

// Observe the body (and its descendants) for `childList` changes.
observer.observe(document.body, OBSERVER_CONFIG);

function traverseNodes(node) {
  if(AUTOFILLABLE_NODE_TYPES.includes(node.nodeName.toLowerCase())) disableAutofill(node)

  node.childNodes.forEach((childNode) => traverseNodes(childNode))
}

function onPageLoad() {
  const elements = document.querySelectorAll(...AUTOFILLABLE_NODE_TYPES)
  elements.forEach(disableAutofill)
}

function disableAutofill(element) {
  console.log("Setting autocomplete=disabled for:", element)
  element.setAttribute('autocomplete', 'disabled')
}

window.onbeforeunload = function(){
  console.log("Disconnecting Observer")
  observer.disconnect()
}