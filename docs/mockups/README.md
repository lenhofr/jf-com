# Design mockups

`jesse-foreman-site.dc.html` is the approved multi-page mockup exported from the
Claude design conversation, kept here as the source of truth for the site's
visual language. Open it directly in a browser (it loads `support.js` from this
same folder) and use the black bar at the top to switch between pages.

It defines all nine pages — Home, About, The NFL Agent, Legal, Entrepreneur,
Speaking & Media, Insights, Blog, Contact — along with the palette and type
scale now implemented in `frontend/`:

| Token            | Value     | Used for                        |
| ---------------- | --------- | ------------------------------- |
| `forest-900`     | `#0F2E22` | Primary dark sections, footer   |
| `forest-800`     | `#123A2B` | Secondary dark sections         |
| `forest-700`     | `#1C5741` | Headings on light backgrounds   |
| `moss`           | `#4E8C5E` | Buttons, links, accents         |
| `mint`           | `#7FBE92` | Eyebrow labels on dark          |
| `mint-50`        | `#E8F1EB` | Light green section backgrounds |
| `sage-50`        | `#F5F7F5` | Off-white section backgrounds   |
| `paper`          | `#EDEEEB` | Page background                 |

Type: **Archivo** for headings, **Public Sans** for body — both from Google Fonts.

The mockup is desktop-only; the responsive behaviour below `lg` was added during
implementation and is not represented here.

## Still needed to finish the design

Every image in the mockup is a hatched placeholder. The implementation keeps
those placeholders (with their captions) wherever a real asset does not exist
yet, so remaining gaps are visible in the running site:

- Hero, sideline/stadium, "Jesse with client", desk/documents, speaking-on-stage,
  podcast/interview, panel, and press-clipping photography
- Partner logos: NFLPA, Delta Sports, KY Bar Association, UC Law
- Headshots and real names for "The Bench" and "The Network"
- Article images, and the body text for the posts in `frontend/src/data/site.ts`
  (titles and excerpts are placeholders from the mockup; no post-detail page was
  designed)
- A map embed on the Contact page
