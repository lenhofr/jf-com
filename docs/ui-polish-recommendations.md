# UI polish recommendations (notes)

## Header / navbar badge
- The new square badge is visually heavier than the old circle; consider slightly reducing its height on mobile and/or tightening the horizontal gap so the wordmark stays the primary focus.

## BIO image crop behavior
- The BIO image uses `object-cover`, which can crop unpredictably across screen widths.
  - If it ever crops poorly, switch to `object-contain` (optionally with a subtle background) or set an explicit object position (e.g. `object-[50%_20%]`).

## BIO section rhythm
- Since the final paragraph now spans full width beneath both columns, consider adding a bit of spacing or a subtle divider above it to make the transition feel intentional.

## Performance / asset weight
- `jess_working.jpeg` is ~1.6MB in the build output; consider compressing it (same visual size) to improve load time.

## Footer disclaimer / compliance
- Current changes include removal of the footer “Paid for by …” disclaimer; if this is required for compliance, we should restore it (or confirm the correct wording).
