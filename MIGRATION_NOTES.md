# Migration notes

Running log of content that needs a decision, verification, or a real source
before it can be considered migrated. Nothing listed here has been silently
resolved — each item below reflects an actual gap or inconsistency found
while migrating content from the old portfolio (linux-ui.framer.website).

Source verification method: raw HTML fetched via `curl` and parsed for
visible text (not the AI-summarised fetch pass), per your instruction not to
treat summarised output as verbatim source text.

---

## Homepage

- **Role kicker** ("Senior UX Designer / Product Owner", in `src/data/site.ts`)
  has no verbatim match anywhere on the old homepage. It was already present
  on the new site before this migration pass. Left unchanged — please confirm
  it's still accurate, or provide the real source line.
- **Intro paragraph** ("I design for people at work: tools, services and
  everyday chores that should take less time and leave more room for the
  parts of the job that matter.") — no verbatim match found in the old
  homepage, About page, or Resume summary checked so far. SOURCE_NEEDED. Left
  in place rather than deleted, since removing working copy with nothing to
  replace it seemed worse than flagging it — but it is not verified migrated
  content.
- Old homepage has two hero CTAs, "My work" → `/my-projects` and "About me" →
  `/about`, sitting directly under the tagline. The new homepage's
  architecture has no equivalent CTA slot (no "About me" link exists on the
  new homepage at all). Not changed — adding one would be a structural
  change, out of scope for content migration. Flagging for awareness.
- Old homepage duplicates the "Me until now" About teaser (with the two
  interview questions) directly on the homepage. The new site's About page
  is now a standalone page with no homepage teaser. Not changed — this is an
  architecture difference from earlier work, not a content gap.
- Fixed: hero tagline's closing punctuation was a period on the new site
  but an exclamation mark in the verified source (`...looking good!`). The
  old writing uses exclamation marks often as part of its voice, so this
  felt like personality, not just formatting — restored to `!`.

## Projects overview / listing

- **Confirmed real site bug** (verified in raw HTML, not a fetch artifact):
  the old Projects overview card for "The efficient grocer" shows duplicated
  Mimiro/Farmers metadata (team, year, company are all wrong — copy-pasted
  from the Farmers card). This was **not** propagated. The Grocer project's
  facts were sourced from its own case page instead, per your instruction
  that the case page takes precedence.
- **Title discrepancy**: the Grocer case page
  (`myprojects/thegrocer`) refers to the project as **"The grocer"**
  internally, but the Projects overview card labels it **"The efficient
  grocer."** These are genuinely different strings, not a summarisation
  error. I used "The grocer" (case-page precedence per your rule), filed as
  `the-grocer.md`. Please confirm this is the title you want, or tell me to
  use "The efficient grocer" instead.
- All 5 new project files were set to `featured: true` as a placeholder
  default, so the homepage's "Selected work" list isn't empty. The old site's
  homepage had no project list at all, so there's no source to base this on.
  Please confirm/curate which (if any) should actually be featured on the
  homepage.
- **Case study bodies are not yet migrated.** Each of the 5 new project
  files currently holds only verified listing-level frontmatter (title,
  role, year, client, team, one-sentence summary) plus a `SOURCE_NEEDED`
  placeholder body. The detailed narratives (Challenges, Research,
  Role/Process/Method, Outcomes, etc.) come in the next migration steps, per
  your ordering.

## Data model

- Added `team: string` (optional) to the project content schema, and
  surfaced it in the case-study template's existing meta list (same visual
  treatment as Role/Client/Year — no new design element, no layout change).
  This was necessary to actually display the team-breakdown data now present
  in the 5 project files.
- `placeholder-case-study.md` is now `draft: true` rather than deleted, so
  it no longer appears in listings but the README's documented "copy this
  file" workflow still works.

## The weather in Malawi — full case study

Source verified via raw HTML (`curl`), not the AI-summarised fetch pass.

**Heading structure**: the old page has **zero real `<h1>`–`<h6>` tags**
anywhere (confirmed by grepping the raw HTML — count is 0 for every heading
level). "CHALLENGES", "PROJECT GOAL", "MY ROLE, PROCESS AND METHOD",
"RESEARCH", "HIFI DESIGN", "AID PROJECT" and "REMOTING" are all just styled
text, not semantic headings. There was no old heading hierarchy to preserve.

**Section order (revised)**: Project goal → Aid project → My role, process
and method → Research → Challenges → Remoting → High-fidelity design → My
key takeaways. This is a deliberate reorder you requested, not the
original DOM/reading order from the source (that was the first-pass order:
Challenges → Aid project → Remoting → Project goal → My role, process and
method → Research → High-fidelity design → My key takeaways). No wording
was substantially changed as part of the reorder — sections were moved as
whole blocks, including their images.

**Four previously-flagged sentences — resolved:**

- *Aid project*: "The funding is from Norad, with in-kind from MET Norway."
  → **"The project was funded by Norad, with in-kind contributions from MET
  Norway."** (your exact wording).
- *Remoting*: fragment fixed with the smallest possible change — inserted
  "I was" so the clause has a subject and verb: **"In this project, I was
  working with forecasters and developers with varied backgrounds, so I
  chose to share my process and unfinished sketches every day in
  standup."** No words removed or reordered beyond that insertion.
- *Challenges*: "This CMS has a distinct design that differs vastly from our
  current one with elephant illustrations." — **left exactly as-is.** I
  found circumstantial evidence in the design-direction-exploration image
  (elephants appear as one of several *new* directions explored in response
  to the new CMS) and asked whether to resolve it on that basis; you chose
  to leave the sentence untouched rather than resolve it. Still ambiguous
  in the text itself.
- *Challenges*: "...who was on the ground in Malawi..." → **"...who were on
  the ground in Malawi..."** (singular → plural, smallest possible fix,
  no other wording changed).

**Media — now integrated.** All 5 images have been copied into
`public/assets/projects/malawi/` with meaningful filenames and placed inline
at their narrative points, with alt text adapted from the suggestions
originally logged here. Old site had **no alt text on any of these**
(`alt` attribute was empty on all 5) — every alt text on the new site is
newly written from actually viewing each image, not invented and not
carried over (there was nothing to carry over).

- `hifi-app-screens.png` → used as the case study's **hero image** (was
  referenced from both the hero slot and the High-fidelity design section
  in the draft version; used once, as the hero, to avoid duplicating the
  same image on one page).
- `early-wireframes.png`, `design-direction-exploration.png`,
  `task-breakdown.png` → inline figures in **Challenges**, immediately
  after the bullet list.
- `research-synthesis.png` → inline figure in **Research**, at the point
  its caption is referenced in the text ("Analysed and synthesised data...").

**Small template/schema change required to do this** (flagging per your
"content schema unless absolutely necessary" instruction — this pass made
it necessary): added `heroImage` and `heroImageAlt` (both optional strings)
to the project schema, and a small conditional in `[slug].astro` so the
hero section renders a real `<img>` when `heroImage` is set, falling back
to the existing grey placeholder box otherwise. No change to
DESIGN_SYSTEM.md, grid, typography, or the flower system — same hero
`<figure>`/`<figcaption>` markup and styling as before, just swapping what
fills it.

## The car owner — full case study

Source verified via raw HTML (`curl`). Unlike Malawi, this page has **two
real `<h2>` tags** ("SETTING PROJECT GOALS" and "CHALLENGES") — but each one
has its heading text and following paragraph merged into a single tag (a
Framer authoring quirk), so I still had to split heading from body myself.
"MY ROLE, PROCESS AND METHOD" and "My key takeaways" are not real headings
in the source, matching the general pattern seen on the other pages.

**Section order** used: Setting project goals → My role, process and method
→ Challenges → My key takeaways. This follows the same narrative logic as
Malawi (goals → process → obstacles → reflection) without forcing identical
heading names, per your instruction.

**PII found in images — flagged and resolved with you before integrating
anything.** 5 of the 12 images on the old page showed a repeated sample
record (name, phone number, home address) across the car-lookup flow, one
image was a workshop photo of three identifiable colleagues, and one was a
detailed user-test data matrix. I stopped and asked before using any of
them. You confirmed the contact record is placeholder/demo data used
consistently through prototyping (not a real person's details) and that the
workshop photo is fine to publish. I still stripped the workshop photo's
embedded EXIF metadata (GPS location, phone model, capture timestamp)
before adding it to the repo — that's hidden technical metadata, not
photo content, so it didn't need a decision, only removing.

**Images — 6 used, 6 skipped as redundant.** The old page had 12 images
total; several were near-duplicate individual screens of the same flow
already shown together in one composite. Used: hero (desktop+mobile
composite), task breakdown, user-test data matrix, the 5-screen hi-fi flow
composite, the workshop photo, and the "car not found" empty state. Not
migrated: 4 individual full-size versions of screens already covered by the
flow composite, a sitemap/IA diagram, and a large low-legibility overview
board (colour palette, fonts, component sheet, two flow thumbnails). None
of these were discarded — they remain in my scratchpad if you'd like any of
them reconsidered.

**Frontmatter corrected to match the case page** (case page takes
precedence over the Projects overview card, per your standing instruction):

- `summary`: overview said "remote user-testing"; the case page's own
  wording just says "user-testing" (no "remote"). Updated to match the case
  page.
- `role`: overview said "UI & UX"; case page says "UX & UI". Updated to
  match the case page's order.
- `client`: overview said "1881.no"; case page's metadata card just says
  "1881". Updated to match the case page.
- `team`: overview said "2 developers, 1 pm, Customer service and sales";
  case page says "2 devs, 1 pm, 1 sales" — no "customer service" mentioned.
  Updated to match the case page (with "PM" capitalised, per the established
  role-abbreviation convention).

**Time-sensitive**: "This product just launched, and we're looking forward
to seeing how it performs against our goals." Classic "just launched" flag
per your instructions — the project is dated 2023, so "just launched" is
almost certainly stale by now. Left in the text (not rewritten, per your
"preserve source, flag rather than silently update" instruction) — needs
your decision on rewording when you do the writing pass.

## Farmers using machine learning — full case study

Source verified via raw HTML (`curl`). Zero real heading tags, same pattern
as Malawi — "PROJECT GOALS", "ROLE AND METHODOLOGY", "CHALLENGES", "CELEBRATING
SUCCESS" and the six challenge sub-labels are all styled text, not semantic
headings.

**Section order** used: Project goals → Role and methodology → Challenges
(with 6 sub-sections: The exciting journey of startup life, Balancing
resources, The agile dance, Leading a dynamic team, Pioneering new
technologies, Collaborative innovation) → Celebrating success → My key
takeaways. Same goals → process → obstacles → reflection logic as the other
two cases. The six challenge sub-labels were real distinct content in the
source (not layout artefacts), so I kept them as H3s rather than collapsing
them into a bullet list.

**Photos with real, identifiable people**: two of the five images show real
colleagues — a ~16-person Bosch India team photo (a branded "#LikeABosch"
company culture photo) and a 5-person ideation workshop photo. I did not
re-ask before using these, since they're the same category of content
(real workplace/project photos, no personal contact details) you already
approved for Car Owner. Flagging both here transparently in case you feel
differently about a larger, company-branded group photo specifically —
happy to remove either.

**Possible names in app mockup**: the finished app's task-list screen shows
assignee names ("Hanne Flatvold", "Oddbjørn Fjørtoft") on task cards.
Consistent with the Car Owner precedent, treated as demo/placeholder data
used in the design tool rather than real personal data — not re-confirmed
individually, flagging per the same logic.

**Media format change**: one source image was an animated GIF (a workshop
photo that auto-plays through). Converted to a static PNG (first frame)
rather than migrating it as an autoplaying GIF — an uncontrolled looping
animation is its own accessibility concern (no pause/stop), and a static
image conveys the same content. This is a format decision within "accurate
media migration," not a design change.

**Small grammar fixes applied** (obvious, not meaning-changing):
- "to make sure they confidently can report this" → "...they can
  confidently report this" (adverb placement).
- "Mimiro had chosen to partner up Bosch India" → "...partner up **with**
  Bosch India" (missing preposition).
- "Bosch strong teams of Engineers" → "Bosch**'s** strong teams of
  engineers" (missing possessive, capitalisation).
- "I've also been the Product owner" → "Product Owner" (approved
  terminology fix).
- "Appstore" → "App Store" (approved terminology fix).
- "40 Beta users" → "40 beta users" (capitalisation).
- Sentence fragment "For iOS, Android and Web." joined to the previous
  sentence with a comma rather than left as a standalone fragment.

**Left unchanged, not flagged as an issue**: "the farmer... his fields",
"his employees" — gendered generic pronoun in the Project goals list. Not
on your approved correction list, so left exactly as source. Mentioning in
case you want it addressed in the writing pass.

**Flagged 2026-09-21, per your review — left as-is, for the later
editorial pass:**

- *Role and methodology*: "I've worked in India every other month since I
  started in Mimiro." Time-sensitive (present-perfect framing an ongoing
  practice) — should be rewritten in historical tense during the later
  writing pass, not fixed now.

**Applied 2026-09-21, per your review** (capitalisation, same category as
the approved terminology list):

- *Project goals*: "Norwegian Government" → "Norwegian government"
  (lowercase, not a proper institution name). Applied directly to the
  content, since this was given as a definitive correction rather than a
  "flag for later" item. Will apply the same rule if "Norwegian Government"
  appears in any remaining case study.

## The grocer — full case study

Source verified via raw HTML (`curl`), re-confirmed from the fetch already
done during the Projects overview step. Zero real heading tags, same
pattern as the other cases — "Project Goals", "Research and Development
Process", "Challenges and Solutions" etc. are all styled text.

**Section order** used: Project goals → Research and development process
(Initial research, Design and strategy, Implementation and testing, as H3s)
→ Challenges and solutions (Team composition, Stakeholder management, as
H3s) → Project outcomes → My key takeaways. This is close to the *original*
source order already (unlike Malawi, this page's own structure already
matches the goals → process → obstacles → outcomes → reflection logic), so
very little reordering was needed.

**One section omitted**: the source has a "Key Project Elements" list
(User-centric design approach / Iterative development and testing / Strong
collaboration between UX and UI design / Effective stakeholder management)
positioned near the end. Every point in it restates something already said
under an earlier heading — it reads as a decorative recap with no new
information, matching your instruction "do not reproduce headings that
only existed to support the old Framer layout if they do not add meaning
to the narrative." Left out. Full text is preserved here in case you want
it back: "User-centric design approach; Iterative development and testing;
Strong collaboration between UX and UI design; Effective stakeholder
management."

**Voice note — flagging for your editorial pass, not fixed now**: this
case reads noticeably more corporate/generic than the other four ("This
e-commerce solution has significantly improved the bulk ordering process
for Norwegian grocers, streamlining their operations and enhancing their
ability to focus on core business activities," "Strong collaboration
between UX and UI design," "Effective stakeholder management"). This is
what's actually in the source, not something introduced during migration —
but it's a real tonal inconsistency next to the first-person, personal
voice in Malawi, Car Owner and Farmers, and you may want to rewrite this
one more substantially than the others in the later pass.

**Photo with real, identifiable people**: the workshop photo shows 3
colleagues at a whiteboard. Same category as the ones already approved for
Car Owner and used (flagged, not re-asked) for Farmers — no personal
contact details, just a real work photo.

**No PII concerns in the product screenshots** (unlike Car Owner) — the
order-list and product-detail images show inventory/order data (product
names, EAN codes, quantities), not customer or personal data.

**Flagged 2026-09-21, per your review — unverified outcome claims, left
exactly as-is:**

- *Project outcomes*: "Increased efficiency, allowing shopkeepers more time
  for customer and employee interaction."
- *Project outcomes* (closing line): "This e-commerce solution has
  significantly improved the bulk ordering process for Norwegian grocers,
  streamlining their operations and enhancing their ability to focus on
  core business activities."

Both are outcome/impact claims with no supporting evidence or metrics
anywhere in the source. Not rewritten or strengthened now — to be reviewed
in the later editorial/fact-check pass. Do not increase their strength of
claim unless real evidence turns up.

## Service management — full case study

Source verified via raw HTML (`curl`). Zero real heading tags, same pattern
as the others.

**Section order** used: Project goals → Role, tasks and method → Challenges
→ Successful releases → My key takeaways. Same goals → process → obstacles
→ outcome → reflection logic as the other cases; this page's own order
already matched it closely.

**Largest image set of any case study — 10 source images, 5 used.**
Skipped as redundant: a small low-res dashboard shot (superseded by a
cleaner, larger one used as hero), one more real-product screenshot with
names (redundant with the hero image), and three more workshop/sticky-note
photos of the same general kind as the one used (all in scratchpad, not
discarded, if you want any reconsidered).

**Real names in product-screenshot mockups**: two of the used/considered
screenshots show a logged-in demo user ("Thomas Fjeldheim") and various
named agents/tickets ("Terje Burum," "Mads Lundgreen," etc.) — same
category as Car Owner, not re-confirmed individually. Additional
supporting evidence this time: one wireframe's example ticket list uses
"Monty Don," "Carol Klein" and "Chris Beardshaw" as customer names — these
are real, well-known BBC gardening presenters, a strong signal that these
are joke/placeholder names rather than real customers. Gives me more
confidence the naming pattern across all these mockups is deliberate demo
data, consistent with what you already approved.

**Photos with real, identifiable people**: one workshop group photo used
(~10 colleagues, mostly from behind, reviewing a sprint board). Same
category as previously approved/flagged, not re-asked.

**Left unresolved, not translated**: "173 kommuner" in the Successful
releases section — Norwegian for "173 municipalities," left exactly as
source rather than translated. This is a different case from the Farmers
"til ITIL standard" fix elsewhere (that was a genuine typo/fragment that
made the sentence ungrammatical in any language); "173 kommuner" is a
grammatically valid Norwegian phrase sitting inside an English sentence —
a language-mixing choice, not a typo, so I treated it as outside "obvious"
correction scope. Flagging for your decision.

**Small grammar fixes applied** (obvious, not meaning-changing):
- "compliant with til ITIL standard" → "compliant with the ITIL standard"
  (stray Norwegian word / broken fragment).
- "3 day- training" → "3-day training" (hyphenation).
- "potential customer" → "potential customers" (plural agreement).
- "Owning the backlog and plan releases" → "...and **planning** releases"
  (parallel structure with the rest of the list).
- "Write user stories" / "Build wireframes" → "Writing user stories" /
  "Building wireframes" (parallel structure — the list mixes gerund and
  imperative forms in the source; normalised to match the majority).
- "existing users current setup" → "existing users**'** current setup"
  (missing possessive).
- "prioritizing" → "prioritising" (British spelling).

**Flagged 2026-09-21, per your review — for the later editorial/fact-check
pass, not changed now:**

- *Successful releases*: "This product is now the most used Service
  management tool in Norway." Factual market-position claim — must be
  verified before publication. Not strengthened or rewritten.
- *Successful releases*: "More than 450 companies in Scandinavia use the
  tool every day." Time-sensitive numerical claim — needs verification
  before publication.
- *Successful releases*: "173 kommuner" — confirmed: should become "173
  municipalities" in the later English writing pass (supersedes the "left
  unresolved" framing above — translation is approved, just deferred to
  the writing pass rather than done now).
- *Project goals*: "compliant with the ITIL standard" — review in the
  editorial pass; consider "aligned with ITIL practices" if that's an
  accurate reflection of the original meaning.

## Hidden/unlinked case-study audit

Requested before continuing to About/Mentoring/Resume. Checked
`sitemap.xml`, `robots.txt`, every link in every previously-fetched page's
raw HTML, the `industries-and-brands` page, and grepped the site's JS
bundles for embedded route strings.

- **`/myprojects/thegrid`** — a genuine, distinct published route found
  only in a JS bundle (`script_main.D38rxxC-.mjs`), not linked from any
  nav, the sitemap, or any case study's "more" list. Returns HTTP 200 and
  is a real page (confirmed by testing an actual nonexistent route, which
  correctly returns 404 with different content) — but the page body is
  byte-for-byte identical to `/holdingspace` (verified with `diff`): no
  heading, no text, no images, just the site shell. No title beyond the
  generic site name. Almost certainly an abandoned/draft project that was
  created in Framer's CMS but never written. **Not migrated — no content
  exists to migrate.**
- **`/holdingspace`** — same empty page shell, reads as a designer's blank
  staging/scratch canvas rather than a project at all.
- **`/industries-and-brands`** — real content (a categorized list of
  clients/brands worked with), but it's résumé-adjacent, not a case study.
  Every outbound link on it points back to one of the 5 already-known
  cases — no new project pages discovered there.
- Company names appearing on that brands list with no case-study page of
  their own (Bring, Norwegian Post, Norwegian Data Protection Authority,
  Norwegian Tax Administration, Pearson, Fronter, Red Cross, Buypass,
  Kongsberg Digital, Northern Beat, and others) all correspond to roles
  already covered in the Resume work history — read as career mentions,
  not evidence of missing case studies.

**Conclusion: no additional genuine case studies exist on the old site.**

## Time-sensitive content spotted during initial inspection

Not yet migrated into the site — flagging early since these were visible
during the first read-through of the old pages, ahead of their turn in the
migration order.

- **About page**: "...I do what I have done for the past 25 years."
  A moving target; will need a fixed figure or rephrasing when About is
  migrated (step 8).
- **About page / old homepage teaser**: "...currently looking for a new
  position where I can create value." Classic "currently" flag — may be
  outdated given the Resume shows an active, ongoing role.
- **Mentoring page**: "For the past 2 years I have been working as a
  mentor..." next to a stats block reading "Jan 2022 - ongoing." These two
  are inconsistent with each other regardless of when "now" is, and
  "ongoing" is itself time-sensitive. Needs a decision when Mentoring is
  migrated (step 9).
- **Resume**: title reads "UX Lead & Product Owner (Current)" and the
  Experis/Anyshore role is dated "2021–Present." Exactly the "Present" case
  you asked me to flag rather than assume is still accurate. Needs
  verification before migrating (step 10).
  **Correction on migration**: raw HTML shows the actual page title is
  literally "My resume" / "Professional Experience" — there is no "(Current)"
  suffix anywhere in the source. That phrase must have been an artifact of
  the earlier AI-summarised Fetch pass, not real source text. Not used.

## About — full page

Source: `https://linux-ui.framer.website/about`. Zero real heading tags
(same as every other page). The existing intro block ("Me until now" +
three paragraphs + interview-questions rail) was left untouched, as
instructed — it was already migrated earlier from the old homepage teaser,
not from this page, and isn't part of this pass.

New content added below the existing intro, in a second `site-frame` +
`.prose` block, with headings I imposed based on content grouping (source
has no real headings, same reasoning as every case study):
Roles, lives and passions → Work → Design philosophy → Research repository
→ Mentor → (portrait photo) → Personal.

- **Roles/Lives/Passions reconstruction**: the source renders these as
  three side-by-side tag columns that the plain-text extraction flattens
  into a jumbled run-on. I went back to the raw HTML and read the actual
  `<div>`/`<p>` boundaries directly rather than guessing — the grouping now
  on the page (8 role tags, "Sandefjord, Norway" under Lives, 8 passion
  tags) is verbatim from source, not inferred from the flattened text.
- Terminology fixes applied (all pre-approved): "Product owner" →
  "Product Owner", "Scrum master" → "Scrum Master", "Agile coach" →
  "Agile Coach" (Roles list); "simplistic" → "simple" (Design philosophy).
- Obvious spelling/grammar fixes applied: "norway" → "Norway" (Work);
  "where ever" → "wherever", "usertesting" → "user testing", "sernior" →
  "senior", "I have also design for" → "I have also designed for" (Design
  philosophy); "short- and long term" → "short- and long-term" (Mentor,
  hyphen consistency); "free heel skiing" → "free-heel skiing" (Personal).
- **Left as-is, not fixed** (ambiguous, flagging per your instruction
  rather than guessing):
  - "Doing user research is expensive, often they sit vacant in a folder
    somewhere." — "they" doesn't agree with "user research" (singular).
    Reads like it should refer to "research reports/findings" (plural),
    but that's an interpretation, not a certainty, so I didn't touch it.
  - "I love the ocean -> Surfing, diving, open water swimming..." — the
    literal "->" arrow and the capital "Surfing" straight after it read
    like a possible formatting artifact from the page builder, but could
    equally be an intentional stylistic aside. Kept verbatim.
  - "UX lead - consultant — my clients..." (Work) mixes a hyphen-as-dash
    and a real em dash in one sentence. Meaning is clear enough that I
    left it rather than "fixing" a style choice.
- **Time-sensitive, not rewritten** (flag only, per your instruction):
  "the past 25 years" (Work) and "currently looking for a new position"
  (existing intro) were already logged above. Adding one more from this
  pass: "currently focusing on building a system for storing user
  research" (Research repository) — same "currently" pattern.
- **Image**: 1 real photo (`portrait.png`, 1920×1272, no EXIF/metadata
  chunks in the file — checked directly, nothing to strip). It's a
  personal/self portrait — a woman in profile, eyes closed, leaning
  against a tree in a forest at golden hour, yellow jumper, plaid scarf —
  almost certainly your own photo rather than anyone else's, so the PII
  precedent established for third parties doesn't really apply here, but
  flagging it anyway since it's a real, identifiable personal photo (of
  you) going on the site for the first time. No figcaption added — the
  source gave it none and there's nothing factual to caption it with.

## Mentoring — full page

Source: `https://linux-ui.framer.website/mentoring`. Zero real heading
tags. Meta block (Roles: Mentor / Sessions: 104 / Time: Jan 2022 – ongoing
/ Company: ADPList) is read directly from the raw HTML in document order —
confirmed unambiguous, unlike the About tag lists. Section used: My key
takeaways (four short lines, kept as four short paragraphs rather than
merged into one, matching the source's short-statement rhythm) plus the
two narrative paragraphs about mentoring on ADPList.

- Fixes applied: "compartmentalize" → "compartmentalised" → *(British
  spelling)* "compartmentalise"; "mentees bravely shares" → "mentees
  bravely share" (subject–verb agreement); stray zero-width-space
  characters after "inspiration." removed (invisible formatting artifact,
  not content).
- **Not fixed, flagged instead**: "junior UX-UI designers" — the rest of
  the site mixes "UX/UI" (Resume, existing About intro) and "UX & UI"
  (Car Owner frontmatter) for the same thing. Left as the source's
  "UX-UI" rather than silently picking one; worth deciding a single
  house style in the later terminology pass.
- **"Company: ADPList"** — the meta field is literally labelled "Company"
  in the source, but ADPList is the mentoring platform, not an employer.
  This looks like a reused case-study template field applied to a
  volunteer activity rather than a job. Kept the literal source label
  rather than relabelling it myself.
- **Resolved**: "For the past 2 years I have been working as a mentor..."
  was flagged as time-sensitive (inconsistent with "Jan 2022 – ongoing" in
  the meta block). You confirmed the ADPList start date (January 2022) and
  asked for this updated directly, so it now reads "For the past 3 years"
  — applied, not just flagged.
- **Images — 6 found, only 1 used.** All 6 were downloaded and viewed:
  - `img1` (used, `mentoring-stats.png`) — an ADPList community-statistics
    card: total minutes mentored, 1:1 bookings, countries mentored, and a
    small country breakdown table. This is your own aggregate activity
    data, not about any third party, so it went straight onto the page.
  - `img2`, `img3`, `img4` — **not used.** These are ADPList review
    screenshots: real named mentees (full name, headshot photo, job
    title, employer, and a direct quote about you), captured from a
    third-party review platform. This is a different kind of PII from
    anything migrated so far — earlier cases were your own workplace
    photos/mockups reused in their original context; these are other
    identifiable people's names, faces and personal opinions, given in
    the context of ADPList, being considered for reuse as testimonial
    content on an unrelated site. I judged that reusing them here without
    reconfirming with each mentee isn't something I should decide
    unilaterally, so I left them out rather than publish them. Happy to
    revisit if you want to use anonymised or aggregate quotes instead, or
    if you've already cleared this with them.
  - `img5`, `img6` — **not used.** Screenshots of your own ADPList profile
    page (mentor card, and the full profile page with nav chrome,
    notification badges etc.). No third-party PII concern, but they
    largely duplicate the stats already shown in `img1` and `img6`
    specifically includes UI chrome (search bar, notification icon,
    "Create Session" button) that isn't appropriate for this site.
    Skipped as redundant/unsuitable rather than for privacy reasons.

## Resume — full page

Source: `https://linux-ui.framer.website/my-resume`. Zero real heading
tags. The flattened text interleaves the Profile/Education/Skills/
Tools/Languages/Portfolio block between the first and second job entries,
and lists jobs out of chronological order — both are artifacts of the
page's column layout being flattened by text extraction, not the real
reading order. I reconstructed the obvious intended structure using the
year ranges already present in the source (same reasoning used to impose
headings on every case study): Profile → experience chart → Experience
(reverse-chronological: Experis 2021–Present, Mimiro 2019–2020, Northern
Beat 2016–2019, Pureservice 2013–2016, Pearson 2010–2013, Tieto Evry
1997–2004) → Education and training → Skills and tools → Languages.

- Fixes applied (British spelling, pre-approved terms, and obvious
  capitalisation/punctuation): "user-centered" → "user-centred" (Profile,
  Northern Beat); "analyzed" → "analysed", "Synthesized" → "Synthesised"
  (Northern Beat); "Norgesgruppen" → "NorgesGruppen" (pre-approved);
  "hi-fidelity" → "high-fidelity" (Experis/Meteorological Institute
  bullet, pre-approved); "IT Service management" → "IT service
  management" (Pureservice, mid-sentence capitalisation); "Frontend
  developer specializing" → "Front-end developer specialising"
  (pre-approved term + British spelling); added missing closing periods
  and normalised the "Company: description" separator to a colon
  throughout the bullet lists, since every other bullet already used that
  pattern and the DPA line alone used a period.
- **"2021 – Present" (Experis/Anyshore)**: kept as written, not converted
  to a fixed end date — already flagged above, now source-verified
  verbatim. This is the most visible "Present" claim on the whole site;
  worth deciding on directly since the Resume page is likely to get more
  scrutiny than a case study.
- **Not fixed, flagged instead**:
  - "Tieto Evry" (1997–2004) — Tietoevry only came into existence as a
    single company in a 2019 merger, so this name is almost certainly
    anachronistic for a role held 1997–2004 (it was probably "Tieto"
    alone, or an earlier predecessor, at the time). I didn't guess at a
    replacement name — kept the source's literal text.
  - Team-size mismatch: Resume says the Mimiro role led "a team of 20
    remote developers"; the migrated Farmers case study says "22
    engineers in Bosch Bangalore, India, 25 in total." Both are real
    source text from different pages of the same old site — I didn't
    reconcile them, since I don't know which (if either) is the accurate
    figure.
  - Experience-figure mismatch: the Profile paragraph says "over 14 years
    of international experience"; the bar-chart image you're now seeing
    on the page separately says "Industry 28 years." These aren't
    necessarily contradictory (international experience vs. total
    industry experience are different measures) but they sit close
    together on the same page and may read as inconsistent — worth a
    look.
- **Omitted**: the closing line "Portfolio: Available upon request" was
  left off the migrated page. It doesn't make sense in its new context —
  this Resume page already lives inside the portfolio it's referring to.
  Full text preserved here in case you'd rather keep it: "Portfolio:
  Available upon request."
- **Image**: 1 real image (`experience-chart.png`, 1402×1638) — a bar
  chart of years of experience by role/area (Industry 28, UX Designer 21,
  Agile PO 10, Developer 5, UI Design 4, Web Analyst 3). Placed near the
  top as a career-at-a-glance visual, alt text written from direct
  inspection.

## Brands & Industries — full page

Source: `https://linux-ui.framer.website/industries-and-brands`. This is
the page found during the hidden-page audit and previously described
there as "résumé-adjacent, not a case study" — it's the same page, now
migrated at your request as `/brands`.

- **Correction to the earlier audit**: I'd characterised this page as
  "hidden/unlinked." That wasn't quite right — it's linked from a footer
  navigation row present on every page of the old site ("My projects /
  About me / Mentor / Resume / Brands & Industries"), it just isn't part
  of the primary header nav I'd been tracking. Not a case study either
  way, so the earlier conclusion ("no additional genuine case studies")
  still stands.
- **No logo/image assets exist on this page.** I checked the raw HTML
  directly — zero `<img>` tags, zero background-image references, zero
  inline SVGs, zero `framerusercontent.com` image URLs anywhere on the
  page. It is a pure text list: organisation names grouped under category
  labels, styled with typography only (no icons, no logo marks). Your
  request described "logo arrangement" and "relative logo sizing" —
  I want to flag clearly that there is nothing like that in the actual
  source to preserve or retrieve. I did not fabricate logos to fill that
  gap. If you have the real logo assets somewhere else (e.g. a design
  file, not the live Framer export), I can wire them in, but I won't
  invent placeholder marks for organisations.
- **Layout decision**: the source renders this as an absolutely-positioned
  Framer canvas (fixed pixel coordinates, not a CSS grid), which doesn't
  translate directly to a responsive layout. I preserved the DOM/reading
  order of the 9 category groups and every item within them exactly as
  they appear in the source markup (this is also the order a screen
  reader would already encounter on the old page, since absolute
  positioning doesn't change DOM/tab order) and rebuilt the visual
  composition as a flowing multi-column text wall (CSS `columns`,
  1 → 2 → 3 columns as viewport grows, each category kept intact within a
  column via `break-inside: avoid`). This is deliberately not a card
  grid, carousel or project-tile layout, and not the standard
  reading-column template — categories sit as loose typographic groups
  with generous whitespace, closer to a credits/clients wall than a
  component grid.
- **Category order preserved** exactly as source DOM order: Retail,
  Logistics, Public sector / Government, Education and learning,
  Humanitarian organization / charity / NGOs, Other, IT industry, Farming,
  Telecom. Item order within each category preserved exactly as listed in
  source, including two intentional duplicates that exist in the source
  itself — "Norwegian Post" appears under both Logistics and Public
  sector, and "Directorate of Agriculture" appears under both Public
  sector and Farming. Not deduplicated.
- **Links preserved and re-pointed**: 6 of the ~40 organisation names were
  hyperlinks to case studies on the old site. Kept them as links, updated
  to the equivalent new routes: NorgesGruppen → `/projects/the-grocer`;
  Norwegian Meteorological Institute → `/projects/the-weather-in-malawi`;
  The Department of Climate Change and Meteorological Services of Malawi
  → `/projects/the-weather-in-malawi`; Save the Children →
  `/projects/the-weather-in-malawi`; World Meteorological Organization
  (UN) → `/projects/the-weather-in-malawi`; 1881.no → `/projects/car-owner`;
  Pureservice → `/projects/service-management`; Mimiro → `/projects/farmers`;
  ADP List → `/mentoring`. All other names are plain text, matching source
  (not every organisation has a case study or page to link to).
- Fixes applied: "Public sector / Goverment" → "Public sector / Government"
  (obvious spelling typo); "ADP List" → "ADPList" (the platform's actual
  brand name is one word — confirmed directly from the ADPList product UI
  while reviewing images for the Mentoring page, so treating this as an
  established-name correction rather than a stylistic rewrite).
- **Not fixed, flagged instead**: "1881.no" is written with the domain
  suffix here but as "1881" in the Car Owner case study frontmatter —
  inconsistent between pages; left both as their own source wording for
  now, worth a single house style decision in the later terminology pass.
  "Tieto Evry" appears here too, with the same anachronism caveat already
  logged under Resume (the merged company name postdates a 1997–2004-era
  role elsewhere on the site, though here it's undated so less obviously
  wrong).
- No flower added to this page. Every other page has picked up one
  flower as part of the site's decorative system, but that's a new-site
  convention the old Brands page never had, and you were explicit that
  this page should stay a preserved exception rather than get the
  standard treatment — happy to add one if you'd rather it matched the
  rest of the site visually.
- Not added to primary navigation, per your instruction — route exists at
  `/brands` but isn't linked from the header yet.

## Content-fidelity audit — About and Mentoring (re-check against old site)

Re-fetched `about` and `mentoring` fresh from the live old site (confirmed
byte-identical to the previously cached copies, so the source hasn't
changed) and re-extracted every text node — not just `<p>` tags this time,
but every `span`, `div`, `br`-joined fragment and `a` — plus every `<img>`
on both pages, to check for anything the original migration missed.

**Result**: the text content on both pages was already complete. Every
sentence, list item, role/passion tag, and statistic from the old pages
matches what's on the new About and Mentoring pages. Two real issues found
and fixed:

1. **About — "Mentor" section was two paragraphs in source, one on the
   new page.** The old page has "Every week, during evenings I also
   volunteer..." and "I've also done some local events - Figma
   Fridays..." as two separate `<p>` elements; the migration had merged
   them into one. Restored the original two-paragraph split — no wording
   changed, only the paragraph break.
2. **Mentoring — two of the six original images were left out based on
   my own judgement ("redundant"/"has UI chrome"), not for privacy
   reasons.** Restored both, using the original assets (stripped of the
   `eXIf`/`tEXt`/`iCCP` metadata chunks they contained, same as other
   real screenshots on this site):
   - `adplist-profile-card.png` — Lin's ADPList mentor card (timezone,
     role, 108 sessions, 35 reviews). Placed where it sat in the source,
     right before "For the past 2 years...".
   - `adplist-full-profile.png` — Lin's full ADPList profile page
     (About Me summary, community statistics, profile insight badges,
     available sessions). Placed at the end, matching source position.
   Both show only Lin's own information — no third-party privacy concern.

**Everything else checked and confirmed already present**: Roles, Lives,
and Passions tags (all 8 role tags, all 8 passion tags); Work, Design
philosophy, and Research repository paragraphs; the About portrait photo;
the Personal/hobbies paragraph; Mentoring's stats card, "My key
takeaways" (all four lines), and both narrative paragraphs. The
`data-framer-name` attribute on the About page's WORK/Research-repository
frame contains an *older draft* of that copy (different from what's
actually rendered/visible) — confirmed this is stale internal Framer
metadata, not real page content, so it was correctly not migrated.

**Update — restored, per your explicit permission**: you confirmed the
mentees in the three held-back review screenshots gave permission for
their names, photos and reviews to be used in this portfolio. Restored
all three, original assets (metadata-stripped, same as every other real
screenshot on this site), in source sequence between the stats card and
the ADPList profile card:
- `review-michetti-depaemelaere-christian.png` — Stephen Michetti, Ellen
  Depaemelaere, Christian
- `review-tan-ghasemian.png` — Erin Tan, Sara Ghasemian
- `review-marr-kraus-rui.png` — Alissa Marr, Marina Kraus, Yaowei Rui

Alt text transcribes each reviewer's name, role/company, date and review
quote, since the quotes are the actual content being conveyed, not
decorative.

**Standing rule going forward** (per your correction): do not hold back
or omit old-site content based on my own editorial judgement — content
completeness first. Flag concerns (privacy, redundancy, chrome-heavy
screenshots) for your decision instead of deciding unilaterally.

**One thing flagged, not changed**: in the true source order, "My key
takeaways" and its four short lines come *before* the stats-card image,
not after — the current page has the stats card first, then the
heading/takeaways. I didn't reorder this since it wasn't part of what
was asked this round; flagging in case you want it matched to source
order too.
