const HJS_BASE = "https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0"
const imported = new Map()

onmessage = (event) => {
  const { i, language, textContent } = event.data

  const scriptsToImport = []

  if (!imported.get("base")) {
    scriptsToImport.push(`${HJS_BASE}/highlight.min.js`)
    imported.set("base", true)
  }

  if (!imported.get(language)) {
    scriptsToImport.push(`${HJS_BASE}/languages/${language}.min.js`)
    imported.set(language, true)
  }

  importScripts(...scriptsToImport)

  let result
  if (language) {
    result = hljs.highlight(textContent, { language })
  } else {
    result = hljs.highlightAuto(textContent)
  }

  postMessage({ i, innerHTML: result.value })
}
