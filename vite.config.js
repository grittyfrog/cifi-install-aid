import { defineConfig, createServer } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

function uhtmlPrerender() {
  let server;
  let resolvedConfig;

  return {
    name: 'uhtml-prerender',
    configResolved(config) {
      resolvedConfig = config;
    },
    configureServer(s) {
      server = s;
    },
    transformIndexHtml: {
      order: 'pre',
      async handler(indexHtml) {
        let mod;
        if (server) {
          mod = await server.ssrLoadModule('/src/prerender.js');
        } else {
          const tmpServer = await createServer({
            configFile: false,
            root: resolvedConfig.root,
            server: { middlewareMode: true },
            appType: 'custom',
            plugins: [],
          });
          mod = await tmpServer.ssrLoadModule('/src/prerender.js');
          await tmpServer.close();
        }
        const prerendered = mod.getPrerenderedHTML();
        return indexHtml.replace('<!--PRERENDER-->', prerendered);
      },
    },
  };
}

export default defineConfig({
  plugins: [uhtmlPrerender(), viteSingleFile()],
});
