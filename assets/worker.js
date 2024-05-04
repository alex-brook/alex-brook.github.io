const imports = importScripts("https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js")
const importedLanguages = new Map()

onmessage = (event) => {
  const { i, language, textContent } = event.data

  if (!importedLanguages.get(language)) {
    importScripts(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${language}.min.js`)
    importedLanguages.set(language, true)
  }

  let result
  if (language) {
    result = hljs.highlight(textContent, { language })
  } else {
    result = hljs.highlightAuto(textContent)
  }

  postMessage({ i, innerHTML: result.value })
}
