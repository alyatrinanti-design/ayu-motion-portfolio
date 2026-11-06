# Ayu Fidyaningrum — Creative Practice

A responsive personal portfolio with an editorial visual system, motion-led transitions, project gallery and case study dialogs. Built with React, Vite and GSAP.

## Run locally

1. Install Node.js 18 or newer.
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL shown by Vite.
4. Run `npm run build` to create the production build in `dist/`.

## Portfolio content

Project summaries and selected imagery come from the supplied 2026 portfolio PDF. The gallery includes Langitlangit.id, Mahalu Spa, Nirwanafoto, Ceuceuofficial, Klikbangunan, AI Creative R&D, and HR & People Operations. Some cards use typographic art covers until original project images are available.

Project text, dates, links, skills and image references live in `src/data/projects.js`. Put approved assets in `public/projects/` and add them to a project's `images` array as `{ src: '/projects/file.jpg', alt: 'Describe the image' }`. Add only verified dates, credits, tools and outcomes. Case study dialogs show any images and tools listed for each project.

## Contact details

The portfolio uses Ayu's email and Instagram handle printed in the supplied PDF. Update those links in `src/main.jsx` if preferred contact details change. Add public links only when confirmed.

## Motion and accessibility

The site includes GSAP intro and scroll reveals, a slowly rotating hero orbit, and a scroll-linked practice marquee. Reduced-motion preferences disable the continuous orbit and CSS transitions. The mobile navigation has an expanded state, visible focus styles, and the gallery can be opened by keyboard.
