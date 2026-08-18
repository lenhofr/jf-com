# Design mockups

`jesse-foreman-site.dc.html` is the approved multi-page mockup exported from the
Claude design conversation, kept here as the source of truth for the site's
visual language. Open it directly in a browser (it loads `support.js` from this
same folder) and use the black bar at the top to switch between pages.

It defines all nine pages — Home, About, The NFL Agent, Legal, Entrepreneur,
Speaking & Media, Insights, Blog, Contact — along with the palette and type
scale now implemented in `frontend/`:

| Token        | Value     | Used for                        |
| ------------ | --------- | ------------------------------- |
| `forest-900` | `#0F2E22` | Primary dark sections, footer   |
| `forest-800` | `#123A2B` | Secondary dark sections         |
| `forest-700` | `#1C5741` | Headings on light backgrounds   |
| `moss`       | `#4E8C5E` | Buttons, links, accents         |
| `mint`       | `#7FBE92` | Eyebrow labels on dark          |
| `mint-50`    | `#E8F1EB` | Light green section backgrounds |
| `sage-50`    | `#F5F7F5` | Off-white section backgrounds   |
| `paper`      | `#EDEEEB` | Page background                 |

Type: **Archivo** for headings, **Public Sans** for body — both from Google Fonts.

The mockup is desktop-only; the responsive behaviour below `lg` was added during
implementation and is not represented here.

## Still needed to finish the design

Every image in the mockup is a hatched placeholder. The implementation no longer
reproduces those hatches: unfilled slots render generated brand art
(`frontend/src/components/site/art.tsx`) or a panel of real information, so the
running site reads as finished. That means **the gaps are no longer visible in
the site** — they are tracked in `docs/content-review.md` instead.

Genuinely outstanding:

- **Photography.** Hero, sideline/stadium, "Jesse with client", desk/documents,
  speaking-on-stage, podcast/interview, panel, and press-clipping. All of it
  depicts a real person and real rooms, so none of it can be substituted with
  stock. Drops in through `ImageSlot`'s `src` prop when it exists.
- **Real names and headshots** for "The Bench" and "The Network". Currently
  unnamed role labels, restyled so that reads as deliberate.
- **Partner logos** for NFLPA, Delta Sports, KY Bar Association and UC Law, if
  permission to reproduce them is obtained. They are typographic wordmarks for
  now, since this site has no licence to their marks.

Closed since the mockup:

- Post bodies exist and are substantive — but all eight are ghostwritten and
  await Jesse's sign-off. See `docs/content-review.md`.
- A post-detail page (`/blog/<slug>`) was designed and built; the mockup had none.
- Article images upload through Decap; posts without one get seeded generated art.
- The Contact map embed is now a photographic location card linking out to Maps,
  rather than a third-party iframe loading an outside tracker on every visit.
