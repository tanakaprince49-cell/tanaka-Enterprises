
# Tanaka Enterprises: Design & Architecture

## Core Philosophy
The website is designed to embody the "Calm Software" ethos. This means avoiding high-contrast clashing colors, excessive animations, and loud marketing jargon.

## Design Decisions
- **Color Palette**: `#050505` (True Black) provides the foundation. We use white only for critical text and interaction points. Zinc grays (`#71717a`) are used for secondary information to reduce visual load.
- **Glassmorphism**: Reusable `.glass` utility class handles the backdrop-blur and semi-transparent borders. This gives a "glossy" premium feel associated with modern Apple-esque design.
- **Typography**: Inter is used for its legibility and professional aesthetic. Tracking is tightened on headings and widened on uppercase labels for a refined editorial look.
- **Mobile First**: All layouts use grid/flex configurations that stack naturally on mobile devices, with the navigation morphing into a clean overlay.

## Architectural Decisions
- **React + TypeScript**: Provides a robust foundation for future features (like the actual Loop web app integration).
- **Tailwind CSS**: Rapid styling with utility classes ensures consistency without the weight of a custom CSS framework.
- **Suspense & Lazy Loading**: Ensures the landing page loads instantly, deferring the weight of secondary pages.
- **Mock Backend**: Waitlist logic is simulated in the UI. For production, this can be piped directly into a serverless function (Vercel/Netlify) or a tool like Formspree/Airtable for zero-cost management.

## Deployment Guide (Netlify/Vercel)
1. **GitHub**: Push this code to a new repository.
2. **Netlify**:
   - Link the repository.
   - Build Command: `npm run build` (if using a build step) or simply deploy the static assets.
   - Publish directory: `dist` or `build`.
3. **Vercel**:
   - Link the repository.
   - Select "Vite" or "Create React App" as the framework preset (depending on the build tool used).
   - Click "Deploy".
