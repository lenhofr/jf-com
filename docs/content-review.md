# Content review — what still needs Jesse

The site no longer has visible placeholders. That is not the same as the content
being approved, and the difference matters more than usual here, because the
byline belongs to a licensed attorney and a certified contract advisor.

This file lists everything on the site that a human still has to sign off on,
and everything that was deliberately **not** invented.

## 1. The eight blog posts — all ghostwritten

Every post at `/blog` has a real body now, and none of it was written by Jesse.
Each file carries an HTML comment saying so, and `npm run build` prints a warning
naming each one on every single build, so this cannot quietly go stale.

The drafting rules used, which are worth keeping if anyone extends them:

- Educational and general — how offsets, guarantees, franchise tags, NIL
  licences, and rookie-deal mechanics work.
- **No** client names, deal values, case outcomes, or specific negotiations.
- **No** biographical claims beyond what already existed in this repo.
- No dollar figures or CBA percentages that shift year to year, except the
  NFLPA three-percent fee cap, which the site already stated.
- The NIL post carries an explicit "general information, not legal advice" line.
  Consider whether the others need one, and whether Kentucky attorney
  advertising rules want a disclaimer site-wide rather than per-post.

**Action:** Jesse reads all eight. Anything he would not have said, cut.

Two of the eight — `trade-requests-rarely-go-how-players-expect` and
`what-a-franchise-tag-really-costs-you` — are invented end to end, including
their titles and excerpts. They are pagination filler. He needs to approve the
premise, not just edit the wording, or they should be deleted.

## 2. Facts pulled from `docs/bio.txt`

These are the only factual claims on the site that did not come from the approved
mockup. They came from the client-supplied biography in this repo, which is
campaign material and may be stale or differently framed than he wants here.
All of them live in `frontend/src/data/site.ts`.

| Claim                                                 | Where it shows                       |
| ----------------------------------------------------- | ------------------------------------ |
| Licensed to practise in Kentucky, 2025                | About page timeline                  |
| Quoted by Forbes, Yahoo, Nasdaq, ESPN                 | Home + Speaking "Featured In" panels |
| Former Forbes Business Council member and contributor | Home + Speaking panels               |
| JD, University of Cincinnati College of Law           | NFL Agent credentials panel          |

**Action:** verify each against the record. Press mentions in particular are the
kind of claim that needs to be true and current.

## 3. Photography — genuinely still missing

This is the one gap that could not be closed, and it should not be closed by
improvising.

The mockup calls for photographs of a real person, real clients, and real rooms:
"Jesse with client", "Speaking on stage", "Panel photo", "Press clipping",
"Interview still", "Combine / sideline", headshots for The Bench. Those cannot be
substituted with stock imagery of strangers without misrepresenting him.

What was done instead: every empty slot now renders either generated brand art
(`frontend/src/components/site/art.tsx`) or a panel of real information —
credentials, ventures, session formats, press. The pages read as finished rather
than unbuilt, and the moment a real photograph exists it drops straight in via
`ImageSlot`'s `src` prop with no other change.

**Action, when photos exist:**

| Slot                              | File                           |
| --------------------------------- | ------------------------------ |
| Stadium / draft (hero)            | `pages/NflAgent.tsx`           |
| Jesse with client                 | `pages/NflAgent.tsx`           |
| Desk / documents                  | `pages/Legal.tsx`              |
| Working photo                     | `pages/Entrepreneur.tsx`       |
| Podcast / interview, panel, press | `pages/Speaking.tsx`           |
| Speaking on stage                 | `pages/Speaking.tsx`           |
| Interview still                   | `pages/Insights.tsx`           |
| Combine / sideline                | `pages/About.tsx`              |
| The Bench headshots               | `pages/About.tsx` (`RoleTile`) |

Blog post images need no code change — they upload through Decap.

## 4. Deliberately not invented

Recorded so nobody assumes these were forgotten:

- **No new testimonials.** The four client quotes and three organiser quotes are
  the approved mockup's, anonymised as they were. Fabricating endorsements for a
  real person is not a design gap to fill.
- **No press clippings.** The Speaking page names outlets that `bio.txt` says
  quoted him; it does not reproduce or invent article coverage.
- **No names for The Bench or The Network.** Those are real colleagues. The role
  labels are unnamed on purpose, restyled so unnamed reads as deliberate rather
  than unfinished. Real names and headshots are a client deliverable.
- **No third-party logos.** NFLPA, Delta Sports, KY Bar Association, and UC Law
  appear as typographic wordmarks in the site's own type. Their actual marks are
  their property and this site has no licence to reproduce them. If Jesse has
  permission, `WordmarkTile` in `art.tsx` is where a real logo goes.
- **`frontend/src/assets/jess_flag.jpeg` is unused.** It is a strong portrait,
  but the American-flag backdrop reads as campaign framing, and Jesse is running
  for office in the 69th District per `docs/content.txt`. Mixing that signal into
  the professional-services site is his call, not a developer's. The file is
  there if he wants it.

## 5. Also worth a look

- The alt text on the blog image he uploaded through Decap was `jessehead`;
  changed to `Portrait of Jesse Foreman`. Screen readers read alt text aloud.
- `docs/content.txt` is campaign copy for the State Representative run and is not
  used by this site at all. Worth deciding whether it belongs in this repo.
- `frontend/src/assets/hero-kentucky.jpg` now backs the Contact page location
  card. It appears to be stock or generated landscape imagery — fine as regional
  atmosphere, but confirm its licence before a client-facing launch.
