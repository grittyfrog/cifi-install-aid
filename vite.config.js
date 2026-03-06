import fs from 'fs';
import path from 'path';
import { pathToFileURL } from 'url';
import { defineConfig } from 'vite';
import { viteSingleFile } from 'vite-plugin-singlefile';

// Generate base64 JS modules from image assets.
// Runs at config load time so the files exist before Vite resolves imports.
const root = process.cwd();
const assetsDir = path.resolve(root, 'src/assets');
for (const file of fs.readdirSync(assetsDir)) {
  if (!/\.(png|jpg|jpeg|gif|webp)$/.test(file)) continue;
  const data = fs.readFileSync(path.join(assetsDir, file));
  const ext = path.extname(file).slice(1);
  const mime = ext === 'jpg' ? 'image/jpeg' : `image/${ext}`;
  const uri = `data:${mime};base64,${data.toString('base64')}`;
  fs.writeFileSync(
    path.join(assetsDir, `${file}.js`),
    `export default "${uri}";\n`,
  );
}

function uhtmlPrerender() {
  return {
    name: 'uhtml-prerender',
    transformIndexHtml: {
      order: 'pre',
      async handler(indexHtml) {
        const abs = pathToFileURL(path.resolve(root, 'src/prerender.js')).href;
        const { getPrerenderedHTML } = await import(abs);
        return indexHtml.replace('<!--PRERENDER-->', getPrerenderedHTML());
      },
    },
  };
}

export default defineConfig({
  plugins: [uhtmlPrerender(), viteSingleFile()],
  build: { outDir: 'docs' },
});
