import * as esbuild from 'esbuild'
import glob from 'tiny-glob'

const globbedEntrypoints = await glob("src/**/*.html")

const config = {
  entryPoints: [
    'src/index.html',
    'src/assets/index.js',
    'src/assets/index.css',
    ...globbedEntrypoints
  ],
  bundle: true,
  metafile: true,
  outdir: 'dist/',
  loader: {
    '.html': 'copy',
  }
}

const serveConfig = {
  port: 8000,
  host: "127.0.0.1"
}

let ctx = await esbuild.context(config)

// If we are releasing, build and exit
const isRelease = process.argv.some(arg => arg == '--release')
if (isRelease) {
  await ctx.rebuild()
  process.exit(0)
}

// Otherwise start a dev server session
await ctx.watch()
let { host, port } = await ctx.serve(serveConfig)
console.log(`Serving on ${host}:${port}`)
