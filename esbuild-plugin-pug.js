import * as pug from 'pug'
import * as fs from 'fs'

// A plugin to compile pug templates to html
export function pugPlugin(globalsFunction) {
  return {
    name: 'esbuild-plugin-pug',
    setup(build) {
      let globals;
      build.onStart(() => {
        globals = globalsFunction()
      })

      build.onResolve({ filter: /\.pug$/ }, args => {
        return {
          path: args.path.replace(".pug", ".html"),
          namespace: 'pug',
          pluginData: {
            contents: fs.readFileSync(args.path, 'utf8'),
            path: args.path,
          }
        }
      })

      // build all non-partials
      build.onLoad({ filter: /\/[^_]\w+\.html$/, namespace: 'pug' }, args => {
        return {
          contents: pug.render(args.pluginData.contents, {
            filename: args.pluginData.path,
            pretty: true,
            ...globals,
          }),
          loader: 'copy',
          watchFiles: [args.pluginData.path],
        }
      })

      // don't build partials, but still trigger a rebuild when they change
      build.onLoad({ filter: /_\w+\.html/, namespace: 'pug' }, args => {
        return {
          contents: '',
          loader: 'empty',
          watchFiles: [args.pluginData.path]
        }
      })
    }
  }
} 
