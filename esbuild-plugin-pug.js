import * as pug from 'pug'
import * as fs from 'fs'


export let pugPlugin = {
  name: 'esbuild-plugin-pug',
  setup(build) {
    build.onResolve({ filter: /\.pug$/}, args => {
      return {
        path: args.path.replace(".pug", ".html"),
        namespace: 'pug',
        pluginData: {
          contents: fs.readFileSync(args.path, 'utf8'),
          path: args.path,
        }
      }
    })

    build.onLoad({ filter: /.*/, namespace: 'pug' }, args => {
      return {
        contents: pug.render(args.pluginData.contents, { filename: args.pluginData.path, pretty: true }),
        loader: 'copy',
        watchFiles: [args.pluginData.path],
      }
    })
  }
}