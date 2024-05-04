const imports = ["https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/highlight.min.js"]
const languages = ["ruby", "dockerfile"]
languages.forEach(language => imports.push(`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.9.0/languages/${language}.min.js`))
importScripts(...imports)

onmessage = (event) => {
  const { i, language, textContent } = event.data

  let result
  if (language) {
    result = hljs.highlight(textContent, { language })
  } else {
    result = hljs.highlightAuto(textContent)
  }

  postMessage({ i, innerHTML: result.value })
}
