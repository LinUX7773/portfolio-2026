# Design System

This is the mandatory design contract for this portfolio. Every future page
and component must follow it. If a request conflicts with this document,
say so before implementing it rather than silently deviating from the
contract or from accessibility requirements.

**Status:** this document defines the target contract. It is written before
a full redesign of the current site, so existing pages do not yet implement
every rule here (for example, the site does not yet have a real left/right
rail grid). Bring pages into alignment as they are next touched, rather than
retrofitting everything at once unless explicitly asked to.

---

## Layout grid

Use a three-zone page grid:

```
left rail | reading column | right rail
```

These are layout **zones**, not three equal columns.

The reading column is the permanent home of narrative body content. The
following must always stay inside the reading column:

- body copy
- H2 headings
- H3 headings
- paragraphs
- lists
- inline links
- captions that belong directly to the narrative

Never move body content or subheadings into the side rails just to make a
layout more decorative. The reading column must feel stable and predictable
throughout long case studies.

### H1 / main page headings

The H1 is allowed to break the grid in ways body content cannot. H1 may:

- span a wider part of the grid
- be positioned more centrally
- use the left and/or right rail compositionally
- have significantly more scale than the body hierarchy

There must be only **one H1 per page**.

### Media

Large images, screenshots, diagrams, research artefacts, and other visual
media may extend beyond the reading column when appropriate. They may use:

- reading column + one rail
- the full content grid
- occasional full-width treatment

Never let normal body text follow these wider media widths.

### Header and footer

The global header and footer may use more of the available page width. They
are not constrained to the reading column and may use the full three-zone
grid where appropriate.

---

## Reading width

- Normal text blocks must never exceed **600px**.
- Also apply a character-based limit so line length stays stable if fonts or
  font sizes change: target **~60–65 characters per line** for normal body
  copy.
- Never let body text grow wider just because more horizontal space is
  available.
- Never justify body text.

---

## Typography

The typography should feel: light, elegant, contemporary, calm, feminine
without becoming sweet, editorial without looking like an old book website,
confident, mature.

### Font weight

Use weight with restraint:

- thin/light for larger display typography, only while legibility stays good
- regular or medium for body copy
- regular or medium for navigation, labels, and smaller interface text

Avoid unnecessary bold text. Do not use bold to manufacture hierarchy when
hierarchy can instead come from font size, typography pairing, whitespace,
spacing, grid position, alignment, or colour where appropriate.

### Bold rule

Only **one** heading per page may use a bold weight — normally the H1 /
primary page heading. H2 and H3 should use thin, light, regular, or medium,
depending on readability. Never let multiple headings on the same page
compete through boldness.

### Thin/light weights and accessibility

Thin or light weights are mainly for larger typography. Do not use thin
weights for small body text, navigation, controls, or labels if they reduce
readability. If a thin weight performs poorly on smaller screens,
lower-quality displays, at zoom, on contrast, or in different browsers, use
regular or medium instead. **Accessibility always takes priority over the
preferred visual weight.**

---

## Floral illustration system

Flowers are a recurring visual signature of this portfolio. They must be
actual, recognisable flowers.

**Never use:** branches, twigs, sprigs, generic leafy stems, abstract
botanical symbols, or plants without a recognisable flower.

### Flower family

Primary illustration family:

- Daisy
- Daffodil
- Lily of the Valley
- Snowdrop
- Cosmos
- Poppy
- Bluebell
- Lonicera

Individual illustrations may vary in form and character, but all flowers
must feel like they belong to the same visual family.

### Illustration style

- one colour only
- line drawings
- clearly recognisable as flowers
- feminine but not sweet
- modern, graphic
- slightly hand-drawn in character
- confident rather than timid
- refined but not precious
- visually substantial enough to actually be noticed

**Avoid:** wedding invitation styling, cottagecore, vintage botanical
plates, bohemian styling, bouquets, floral wallpaper, excessively delicate
hairline drawings.

### Flower scale

Do not make flowers tiny — a flower should normally be clearly visible
without the viewer having to search for it. Typical desktop scale is
approximately **80–150px tall**, depending on composition. Responsive
versions may be smaller but must stay recognisable.

### Flower placement

Flowers must feel integrated into the layout, not added as floating
decoration. Good placements include:

- aligned with a heading
- sitting on or interrupting a horizontal divider line
- occupying one of the side rails
- tucked into the footer
- appearing near the header
- slightly overlapping the boundary between sections
- partly cropped by the viewport edge
- appearing in intentional whitespace beside content

Placement may vary from page to page, and should sometimes feel slightly
unexpected.

### Flower frequency

- Normally a **maximum of one** floral illustration per page.
- The homepage may use **two** only if the overall composition clearly
  benefits.
- Flowers belong to the **page**, not to repeated components. Never
  automatically place flowers inside project rows, cards, list items,
  repeated content modules, or every heading. A page with several projects
  must not produce one flower per project.

### Flowers and body content

Flowers may live in the left or right rail while body content stays safely
inside the reading column. A flower may visually approach or overlap a
heading area slightly, but it must never:

- interfere with body reading
- cover important text
- reduce readability
- create confusing reading order
- push body content out of its grid
- communicate information necessary to understand the page

Decorative flower SVGs must use `aria-hidden="true"` and must not appear in
the accessibility tree.

---

## Responsive behaviour

- At narrow widths, collapse the layout cleanly to one column.
- DOM reading order must remain logical — never rely on CSS visual
  reordering to make a page understandable.
- Normal content must work at **320 CSS px** without horizontal scrolling.
- Responsive behaviour must preserve: readable line length, clear
  hierarchy, logical reading order, comfortable spacing, accessible
  navigation, and visible floral illustrations where appropriate.
- Do not simply hide design elements on mobile unless there is a good
  reason — adapt them to the smaller composition instead.

---

## Accessibility

**WCAG 2.2 AA is a hard requirement.** Aim for AAA wherever reasonably
achievable without harming usability or the visual identity.

### Contrast

- Normal text must meet at least **4.5:1**.
- Prefer **7:1** for normal body text where the palette allows it.
- Large text must meet the relevant WCAG contrast requirements.
- Never use colour alone to communicate meaning.

### Keyboard and focus

- All interactive functionality must work with keyboard navigation.
- Visible focus states are mandatory.
- Focus indication must not depend on colour alone, and must not be so
  subtle that it's difficult to see.

### Semantics

- Use semantic HTML (`header`, `nav`, `main`, `article`, `section`,
  `footer`, etc.) with an appropriate hierarchy.
- Heading hierarchy must remain logical: one H1 per page, followed
  logically by H2 and H3.

### Zoom and reflow

- Text and functionality must remain usable at **200% zoom**.
- Normal content must reflow without horizontal scrolling.
- Layouts must tolerate user-adjusted line height, paragraph spacing,
  letter spacing, and word spacing without losing content or functionality.

### Interaction

- Never rely on hover alone.
- Interactive elements must remain understandable and usable without a
  mouse.
- Controls and navigation must have adequate target size and spacing.
- Respect `prefers-reduced-motion` for any future animation.

---

## Visual direction

The portfolio should feel: contemporary, feminine, confident, warm,
editorial, Scandinavian, refined, slightly playful, mature, clearly
designed rather than merely typeset.

**Avoid:** generic SaaS design, early-2000s book/literary website styling,
old-fashioned editorial web design, beige minimalism for its own sake,
excessive symmetry, rigid box-based layouts, heavy bold typography,
excessive rounded cards, glassmorphism, purple gradients, decorative
clutter, wedding stationery aesthetics.

---

## Design principle

Use whitespace intentionally. Large amounts of empty space are not, by
themselves, sophistication. Create visual interest through: grid,
asymmetry, typography, scale, spacing, alignment, selective overlap, floral
illustration, and controlled variation between sections.

The site should be elegant and calm without becoming passive or timid.

---

## Accessibility review before completion

Before considering a new page or major component complete, review:

- desktop layout
- tablet layout
- mobile layout
- 320px reflow
- body width
- line length
- heading hierarchy
- font weights
- keyboard navigation
- visible focus states
- colour contrast
- 200% zoom
- text-spacing robustness
- logical DOM reading order
- floral illustration accessibility

If anything fails WCAG 2.2 AA, fix it before considering the page complete.
If an AAA improvement is reasonably achievable without harming usability or
visual clarity, prefer the AAA solution.

If a requested visual treatment conflicts with accessibility, say so before
implementing it rather than silently compromising accessibility.
