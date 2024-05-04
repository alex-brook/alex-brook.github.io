window.addEventListener("DOMContentLoaded", () => {
  const worker = new Worker("/assets/worker.js")
  const nodes = Array.from(document.querySelectorAll("code"))

  worker.onmessage = (event) => {
    const { i, innerHTML } = event.data
    nodes[i].innerHTML = innerHTML
    nodes[i].classList.toggle("highlighted", true)
  }

  const codeLanguage = (node) => {
    const lang = node.classList[0]

    if (lang && lang.startsWith("language-")) {
      return lang.split("-")[1]
    }
  }

  nodes.forEach((node, i) => {
    const language = codeLanguage(node)

    worker.postMessage({ i, language, textContent: node.textContent })
  })
})
