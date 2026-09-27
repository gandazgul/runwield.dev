---
planId: "1b426ca4-061f-44f5-aaea-a41c957c9f2f"
classification: "PLANNED_CHANGE"
workKind: "FEATURE"
complexity: "MEDIUM"
affectedPaths:
  - "src/pages/index.astro"
  - "src/pages/blog/"
  - "src/layouts/"
  - "src/components/"
  - "src/styles/global.css"
  - "astro.config.mjs"
  - "tests/blog.test.ts"
  - "README.md"
executionAgent: "frontend-engineer"
collaborationRecommendation: "autonomous"
devServerCommand: "deno task dev --host 127.0.0.1 --port 4321"
devServerUrl: "http://127.0.0.1:4321"
devServerHmr: true
createdAt: "2026-09-27"
origin: "internal"
userVerifiedAt: null
targetBranch: "main"
status: "validated_reviewer"
---

# Add a Simple Blog and Publish the First Article

## Context

The user wants to publish an article and add a Blog link to the top navigation. They selected an article list with separate Markdown post pages. They approved limited editorial changes after review against the RunWield product source. The byline is **Carlos Ravelo**, linked to **https://github.com/gandazgul**.

The website is a static Astro 7 site with Deno tasks. `src/pages/index.astro` owns the complete home page. `src/styles/global.css` owns its visual system. There is no current blog, shared page layout, test suite, or website PRD. The GitHub Pages workflow publishes `dist/` on pushes to `main`.

Product evidence is in the sibling `../runwield/` repository. Relevant owning requirements are:

- [Plan review](../../../runwield/docs/prd/runwield-core-prd.md#plan-review): review and approval for planned work.
- [Execution, validation, and recovery](../../../runwield/docs/prd/runwield-core-prd.md#execution-validation-and-recovery): configured checks, repair, and optional human review.
- [Semantic review and repair](../../../runwield/docs/prd/runwield-core-prd.md#semantic-review-and-repair): review against the approved Plan, not proof of correctness.
- [Work records](../../../runwield/docs/prd/runwield-core-prd.md#work-records): durable outcome summaries with truthful completion confidence.

These requirements constrain article claims; this change does not change the product capabilities. No sibling PRD, ADR, or product code changes are required. The website glossary at `docs/domain-language.md` remains current. The article uses its existing terms Plan, Validation, and Work Record; it adds no domain concept.

## Objective

Visitors can follow **Home → Blog → Article**, read the approved article on desktop or mobile, open the author's GitHub profile, and return to the website. A maintainer can publish another post by adding one Markdown file.

Preserve home-page content, section links, demo video, install-command copying, beta form behavior, and existing external links. No CMS, database, client-side blog application, tags, search, comments, feed, pagination, or sidebar is in scope.

## Approach

Use Astro's native Markdown page support. Each Markdown file owns its content and metadata. The index discovers posts at build time with a typed `import.meta.glob<MarkdownInstance<...>>` eager import. Use Astro's generated page URL, not a second slug registry.

```text
src/
├── components/
│   ├── SiteHeader.astro        # one navigation definition for all pages
│   └── SiteFooter.astro        # existing footer, with links that work on every route
├── layouts/
│   ├── BlogLayout.astro        # blog document head, fonts, chrome, and main landmark
│   └── BlogPostLayout.astro    # title, publication date, linked byline, and article body
└── pages/
    ├── index.astro             # existing landing page; shared header and footer
    └── blog/
        ├── index.astro         # /blog; title, date, and description for each post
        └── the-overconfident-intern.md
                               # /blog/the-overconfident-intern
```

The post front matter contains `layout`, `title`, `description`, `publishedDate` as a quoted ISO date, `author`, and `authorUrl`. The filename sets the route. List posts newest first, with a stable filename tie-breaker for equal dates. Render dates without a timezone shift. Render all Markdown posts; do not add draft or scheduled-publishing semantics.

A content collection or publishing service would add setup that this small blog does not need. Native Markdown pages keep the authoring rule simple and use an interface confirmed in the installed Astro types.

**Reading design:** keep the current Outfit and IBM Plex Mono fonts, dark background, and mint accents. Use a text-first index, not image cards. The article uses a single column of about 68 characters, generous paragraph spacing, and roughly 18–20 px body text with a 1.65–1.75 line height. The long title wraps naturally. No cover image or reading animation is needed.

**Shared navigation:** add Blog between How it works and Docs. Keep all current links. On narrow screens, wrap the links rather than hiding Blog or adding a JavaScript menu. Use root-relative website assets and section links (`/`, `/#flow`, `/#beta`). Mark Blog as active on the blog routes. Blog headers stay in normal document flow so wrapped navigation cannot cover the title. Preserve the home header's current placement and animation.

Blog content and footer must be visible without JavaScript. Keep the home page's scroll, reveal, form, and copy scripts on the home page. Do not move these scripts into the blog layout. Shared footer rendering must not make blog visibility depend on the home reveal script.

The current `build.assetsPrefix: "."` is risky on nested routes. Remove this override and use Astro's root-based default for the custom-domain deployment. Keep static output, `trailingSlash: "never"`, inline stylesheets, and sitemap integration. Verify the emitted asset URLs, not only the development server.

## Expected Change Surface

The boundaries this change is expected to touch. This list is guidance, not an allowlist: verify the real footprint
during implementation and change whatever the Implementation Steps need, including files not named here. Stop and report
only when discovery changes approved intent — the change reaches another subsystem, public behavior or architecture
shifts, migration or compatibility risk grows, or the Verification Plan no longer proves the objective.

- `src/pages/index.astro` — reuse shared navigation and footer while leaving home content and scripts intact.
- `src/components/SiteHeader.astro`, `src/components/SiteFooter.astro` — own route-safe site links and shared chrome. Route-specific presentation can be derived from `Astro.url.pathname`.
- `src/layouts/BlogLayout.astro`, `src/layouts/BlogPostLayout.astro` — own blog metadata, landmarks, and article presentation.
- `src/pages/blog/index.astro` and Markdown posts — own the index and publishable content without a separate post registry.
- `src/styles/global.css` and scoped blog layout styles — reuse tokens, support wrapped navigation, and add readable article styles without broad landing-page changes.
- `astro.config.mjs` — remove the relative asset prefix so nested routes load generated assets correctly.
- `tests/blog.test.ts` — check real build output for routes, content, navigation, and metadata.
- `README.md` — document the post file location, required front matter, date/order rules, local preview, and existing deployment path.
- `public/llms.txt` — add a short link to the public Blog; preserve existing product and documentation references.

The sibling product repository, deployment workflow, beta form configuration, and domain glossary stay unchanged. Preserve the user's existing `.gitignore` modification.

## Reuse Opportunities

- `src/pages/index.astro` — existing brand markup, navigation labels, footer, skip link, canonical URL pattern, and social image.
- `src/styles/global.css` — existing colors, font families, control styling, focus treatment, and responsive breakpoints.
- `astro.config.mjs` — static generation, canonical site URL, and automatic sitemap generation.
- `deno.json` — existing development, build, check, and preview tasks. No new runtime dependency is needed.
- Astro's `MarkdownInstance` interface — typed front matter, generated URL, and Markdown rendering for file-based posts.

## Implementation Steps

1. `SiteHeader.astro` and `SiteFooter.astro` own the shared navigation and footer. Home and both blog routes render them. Blog is visible and keyboard-accessible at all target widths. Existing navigation destinations survive. The Blog link has an appropriate active state on blog pages; do not label the index as the current page on a different article route. Blog chrome needs no home-page script to appear.
2. `/blog` is a generated static page with one visible heading and a semantic list. It discovers Markdown posts without hardcoded article entries. Each item shows the post title as a link, publication date, and description. The order follows the date and tie-break rule in Approach.
3. `/blog/the-overconfident-intern` renders the article in the appendix through the Markdown layout. Its title appears once as the page heading. The byline reads `Carlos Ravelo` and links to `https://github.com/gandazgul`. The publication date is visible in a `time` element with an ISO `datetime`. The article has a Back to Blog link. Do not make further editorial changes without user approval.
4. Each blog route has a distinct page title and description, an absolute self-canonical URL, Open Graph title/description/URL, and the existing absolute social-card URL. The article uses `og:type=article`; the index uses `website`. Icons, logo, fonts, and stylesheet URLs work on a direct nested-route load. The sitemap includes both blog URLs. Blog navigation and reading work with JavaScript disabled.
5. The blog styles satisfy the reading design and prevent title, byline, navigation, or body overflow at 320, 390, 768, and 1440 px. Links have visible keyboard focus. The home page keeps its content and interactions. Remove only the relative asset-prefix override from the build settings unless actual output requires another bounded correction.
6. `tests/blog.test.ts` checks the built HTML and sitemap, not source file names alone. It fails when the article is omitted, replaced with a placeholder, lacks the approved byline, has the old unsupported product claims, or is unreachable from the index. It also checks route-specific metadata and shared navigation destinations. Use Deno's test runner and no new browser-test dependency.
7. `README.md` explains how to add a Markdown post, including a complete front-matter example, date ordering, filename-derived URLs, and build/preview commands. `public/llms.txt` links to `https://runwield.dev/blog`. Product claims and links remain consistent with the cited product requirements; do not mark new product capabilities as shipped or change sibling requirements for this website feature.

## Approval Confirmation

No Work Records are superseded. The user approved the simple Markdown blog, the proposed editorial corrections, and the linked Carlos Ravelo byline. The appendix is the complete publication copy for Plan review.

## Verification Plan

### Automated

- Build the actual static routes with `deno task build`, then run `deno test --allow-read tests/blog.test.ts`.
- The focused tests must read the generated pages and sitemap. Normalize rendered text and assert all article paragraphs from the appendix in order, not only the heading. Decode HTML entities when comparing text. Assert the exact author label and URL, the index-to-article link, Back to Blog, root navigation destinations, canonical URLs, distinct titles/descriptions, Open Graph types, and both sitemap entries.
- Explicitly reject the old phrases `full audit trail that proves its correctness`, `They can't reason`, and `They can't ask clarifying questions` from the rendered article. A placeholder article or a renamed home page must fail these checks.
- **Authoring smoke check:** temporarily add a second Markdown post with a different title and later date. Build and confirm it appears first on `/blog` and has its own working URL without any index or route code edits. Remove the fixture and rebuild; confirm only the approved article remains. This proves the authoring promise rather than just the first route.
- RunWield's full project verification remains `deno task check && deno task build`. Do not add duplicate full-suite runs during managed execution solely for this Plan.

### Headed browser

Use `agent-browser` with an assignment-specific named session. Start with `deno task dev --host 127.0.0.1 --port 4321` at `http://127.0.0.1:4321`. Also test built output with `deno task preview --host 127.0.0.1 --port 4322` at `http://127.0.0.1:4322`.

- At 1440×1000 and 390×844, follow Home → Blog → article → Back to Blog. Open the author link and confirm its exact destination. Use the brand, How it works, and Try it with me links from the article; confirm they reach the correct home sections.
- At 320 and 768 px wide, verify that navigation wraps, no link disappears, the long title and byline fit, and the article has no horizontal clipping. Do not accept `overflow-x: hidden` as proof that content fits.
- Use the keyboard for the skip link, navigation, article title link, byline, and Back to Blog. Confirm visible focus and a main landmark. Check one page heading per route and readable contrast.
- Reload `/blog/the-overconfident-intern` directly in the built preview. Confirm logo and fonts load with no failed local asset requests. Check console errors and network failures. Repeat the reading/navigation flow with JavaScript disabled and reduced motion enabled; content remains visible.
- Smoke-test the unchanged home page: demo controls, install-copy feedback, and beta form preparation. With the default mailto setup, confirm request preparation without sending email. If a form endpoint is configured, do not submit real data during verification.
- Capture and inspect desktop and mobile screenshots of the index and article, plus the changed home navigation. Batch fixes and use at most one confirmation pass.

### Semantic review

Compare the full rendered article with the approved appendix. Confirm there are no added capability claims, invented citations, stock images, or unapproved copy changes. Confirm the implementation preserves one-file post authoring and does not add a hardcoded post list, unnecessary backend, or blog JavaScript. Existing tests do not cover the home page; the explicit browser checks protect its current behavior.

## Edge Cases & Considerations

- **Long title and fifth navigation link:** use wrapping and a normal-flow blog header; do not reduce text until it is too small to read.
- **Nested route assets:** production output can differ from development. Test built preview and emitted paths after removing the relative asset prefix.
- **Date stability:** use a stored date, not a date calculated on each build. Reviewable assumption: use the actual date when the article file is first added; later builds retain it.
- **Shared footer visibility:** `data-reveal` is hidden by default in existing CSS. Preserve home behavior, but keep blog content and chrome visible without that script.
- **Markdown edits:** preserve the user's rhetorical style outside the approved corrections. The STE style requirement applies to this Plan and new maintenance guidance, not a rewrite of the supplied article.
- **Publishing:** delivery through the existing GitHub Pages workflow is unchanged. Do not claim the article is live until deployment is confirmed. This Plan does not authorize a separate manual production deployment.
- **Scope:** no draft status, scheduling, RSS, search, image pipeline, or analytics. Those features can be planned when needed.

## Approved Article Copy

Title: **The Overconfident Intern: Why Your AI Assistant Is Burning Out Your Seniors**

Byline: **[Carlos Ravelo](https://github.com/gandazgul)**

Description: **AI-generated code can shift work onto senior engineers. Collaborative planning and visible validation evidence offer a better way to review changes.**

Store the title and byline in front matter. The article body below must not repeat the heading or byline.

---

It’s 8 PM. The office is quiet, bathed in the cool glow of monitors on standby. All except one. A senior developer leans forward, tracing lines of code they didn’t write, their dinner long gone cold. They were supposed to be home two hours ago. The task was simple: implement a small feature change using the new AI coding assistant everyone was excited about. The tool generated the code in seconds. It looked clean. It passed the linter. It was merged.

And it was a time bomb.

Now, deep in a debugging rabbit hole, the developer has found the problem. The AI-generated code, so plausible on the surface, missed a critical edge case. It failed to properly handle a null value from a dependent service under load. It was a subtle, insidious bug that the initial tests did not catch, the kind of mistake a junior developer might make. This wasn't velocity. This was a trap. The AI assistant wasn't a partner; it was an overconfident intern, creating work that looked right but was secretly broken.

This is the hidden reality for engineering teams adopting most of today's AI coding tools. The promise is incredible: slash development time, automate tedious tasks, and free up senior engineers for high-level architectural work. But the reality is the "supervision tax." Every piece of AI-generated code comes with an invisible invoice for expert-level review and debugging. Your most experienced, most expensive engineers are being turned into babysitters for a machine that produces plausible but incorrect output.

The supervision tax is more than just lost time. It's a massive drain on cognitive resources. Instead of thinking about the system as a whole, your senior developers are forced to second-guess every function, every variable, and every logical step proposed by the AI. They have to mentally model every potential failure point the AI may have missed. This constant, low-grade paranoia leads directly to burnout. The very tool meant to reduce their workload is actively increasing it, forcing them to clean up messes instead of creating value.

The problem is not code generation alone. It is code generation without enough context and verification. AI assistants can produce convincing code while missing your business rules, architectural constraints, or the downstream effects of a change. They can reason through problems and ask clarifying questions, but those capabilities do not guarantee that they will identify the questions that matter for your system.

It's time for a new model. Your AI assistant shouldn't be an intern you have to babysit. It should be a specialist whose work comes with evidence you can inspect.

For planned changes, RunWield helps you develop a clear, human-readable Plan that you can review and approve before execution.

RunWield runs your configured verification command and reviews planned changes against the approved Plan. Agents can write tests and use failing regression tests to guide bug fixes. Your team controls the test suite and verification command.

The result is more than generated code: it is a change with validation evidence you can inspect. Work Records preserve completed outcomes and useful context for future planning. These checks support engineering judgment; they do not replace it. Your senior developers are no longer forensic accountants trying to find a hidden bug. They are a review board, looking at a change, its validation results, and the context needed to review it. The conversation shifts from "Is this secretly broken?" to "Does this meet the business requirement?".

The promise of AI in software development is real, but not if it comes at the cost of your best people's sanity and time. Stop paying the supervision tax. Stop cleaning up messes at 8 PM.

It's time to start shipping with confidence.
