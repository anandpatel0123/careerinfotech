// Runs after both Vite builds. Bakes the rendered page into dist/index.html so the
// content is real HTML for search engines and appears before JavaScript loads.
import { existsSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadEnv } from 'vite';

const root = process.cwd();
const distHtml = resolve(root, 'dist/index.html');
const ssrDir = resolve(root, '.ssr');
const ssrEntry = ['entry-server.js', 'entry-server.mjs'].map((file) => resolve(ssrDir, file)).find(existsSync);

if (!ssrEntry) throw new Error('Server bundle not found in .ssr');

const { render, structuredData } = await import(pathToFileURL(ssrEntry).href);

const env = { ...loadEnv('production', root, ''), ...process.env };
const siteUrl = env.SITE_URL?.replace(/\/+$/, '');

const jsonLd = JSON.stringify(structuredData(siteUrl)).replace(/</g, '\\u003c');
const seoHead = [
  ...(siteUrl
    ? [
        `<link rel="canonical" href="${siteUrl}/" />`,
        `<meta property="og:url" content="${siteUrl}/" />`,
        `<meta property="og:image" content="${siteUrl}/images/og-image.jpg" />`,
        `<meta property="og:image:width" content="1200" />`,
        `<meta property="og:image:height" content="630" />`,
        `<meta name="twitter:image" content="${siteUrl}/images/og-image.jpg" />`,
      ]
    : []),
  `<script type="application/ld+json">${jsonLd}</script>`,
].join('\n    ');

const html = readFileSync(distHtml, 'utf8')
  .replace('<!--seo-head-->', () => seoHead)
  .replace('<!--app-html-->', () => render());

writeFileSync(distHtml, html);

const robots = ['User-agent: *', 'Allow: /'];

if (siteUrl) {
  robots.push('', `Sitemap: ${siteUrl}/sitemap.xml`);
  writeFileSync(
    resolve(root, 'dist/sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url><loc>${siteUrl}/</loc></url>\n</urlset>\n`,
  );
} else {
  console.warn('SITE_URL is not set, so the canonical URL, social preview image and sitemap were skipped.');
}

writeFileSync(resolve(root, 'dist/robots.txt'), `${robots.join('\n')}\n`);
rmSync(ssrDir, { recursive: true, force: true });
console.log('Prerendered dist/index.html');
