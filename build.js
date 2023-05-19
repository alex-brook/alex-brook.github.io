import * as esbuild from 'esbuild'
import { globSync } from 'glob'
import { pugPlugin } from './esbuild-plugin-pug.js'

const isRelease = process.argv.some(arg => arg == '--release')
const globbedEntrypoints = globSync("src/**/*.pug")
const liveReloadSnippet = "(() => { new EventSource('esbuild').addEventListener('change', () => location.reload()) })();" 

// find all the post directories so we can render a list of them in the index
const pugGlobals = () => {
  const postPaths = globSync('src/posts/*')
  const postFiles = globSync('src/posts/*.*')
  const postDirectories = postPaths
    .filter(path => !postFiles.includes(path))
    .map(path => path.replace('src/', ''))

  return {
    postDirectories: postDirectories,
  }
}

const config = {
  entryPoints: [
    ...globbedEntrypoints,
    'src/assets/index.js',
    'src/assets/index.css'
  ],
  bundle: true,
  metafile: true,
  outdir: 'dist/',
  banner: {
    js: isRelease ? '' : liveReloadSnippet
  },
  plugins: [
    pugPlugin(pugGlobals)
  ]
}

const serveConfig = {
  port: 8000,
  host: "127.0.0.1"
}

let ctx = await esbuild.context(config)

// If we are releasing, build and exit
if (isRelease) {
  await ctx.rebuild()
  process.exit(0)
}

// Otherwise start a dev server session
await ctx.watch()
let { host, port } = await ctx.serve(serveConfig)
console.log(`Serving on ${host}:${port}`)
