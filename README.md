# Career Info-Tech website

Single-page static website built with React, TypeScript and Vite. There is no backend: enquiries
open WhatsApp with the message filled in, and nothing is stored.

## Commands

```bash
npm install
npm run dev       # local development server
npm run build     # typecheck, build and prerender into dist/
npm run preview   # serve the production build locally
```

## Deploying

1. Copy `.env.example` to `.env` and set `SITE_URL` to the live address. This adds the canonical
   URL, the social preview image, `sitemap.xml` and the sitemap line in `robots.txt`.
2. Run `npm run build`.
3. Upload the contents of `dist/` to any static host. All paths are relative, so the site works at
   a domain root or inside a sub-folder.

## Common updates

| To change | Edit |
| --- | --- |
| Phone numbers, addresses, email, WhatsApp number, map links | `src/data/site.ts` |
| Courses, modules, categories, card colours | `src/data/courses.ts` |
| WhatsApp message wording | `src/lib/whatsapp.ts` |
| Colours, fonts, spacing | `src/styles/base.css` (variables at the top) |
| Logo | `public/images/logo.png` |
| Syllabus PDF | `public/syllabus/` (keep the file name, or update `src/data/site.ts`) |

If the syllabus PDF is re-paginated, update each course's `pdfPage` in `src/data/courses.ts`. The
"View Syllabus PDF" buttons use it to open the right page.

## Image credit

The hero photo comes from Unsplash and is used under the Unsplash License.
