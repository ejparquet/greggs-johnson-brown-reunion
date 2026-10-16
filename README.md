# Greggs · Johnson · Brown Family Reunion

The family reunion website: our history, photo gallery, family trees and reunion events.

## Pages

| Page | File | What's on it |
| --- | --- | --- |
| Home | `index.html` | Welcome, the three family lines, timeline preview, reunion preview, gallery preview |
| Our Story | `story.html` | Family history by era — Before the Records, 1800s, 1900–1949, 1950–1999, 2000–Today — plus a “Share a story” form |
| Gallery | `gallery.html` | Filterable photo gallery with a full-screen viewer, and the Elders & Ancestors family trees (logic in `assets/family-tree.js`) |
| Reunion & Events | `events.html` | Dates and countdown, day-by-day schedule, venue and lodging, RSVP form, past reunions |

## Editing content

- **Reunion date / countdown:** change `REUNION_START` at the top of `assets/site.js`, plus the date text on the pages.
- **Family trees:** edit `assets/ancestors.js` (instructions at the top of the file). Each person gets a unique `id`; children list their `parents: ['id1', 'id2']`, and a marriage is a `spouse: 'id'` on either person (a list for more than one marriage). Generations, children, grandchildren and siblings are worked out automatically, and spouses can link across the Greggs, Johnson and Brown lines. Add `bio` for the detail panel and `photo` for a portrait.
- **History entries:** in `story.html`, copy an `<div class="entry">…</div>` block inside the right era and change the year, title and text.
- **Gallery photos:** in `gallery.html`, copy a `<button class="tile …">` block and set its `data-cat`, image and caption.
- **Email address:** forms open an email to `reunion@example.com` — search and replace it with the real address.
- Anything in `[brackets]` or written as `18__` / `19__` is a placeholder.

## Publishing updates

Pages load their styles and scripts with a version number (e.g. `assets/site.js?v=20261016`). After changing any file in `assets/`, bump that number in all four HTML files so visitors' browsers fetch the new versions instead of mixing old and new files.

## Running locally

```bash
node serve.mjs
```

Then open http://localhost:3000.

## Publishing

It's a static site — no build step. It can be hosted free on GitHub Pages (Settings → Pages → Deploy from branch → `main` / root), Netlify or Vercel.
