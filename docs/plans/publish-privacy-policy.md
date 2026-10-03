---
planId: "4f74af05-0415-41d5-a00d-d587cc2b0fa4"
classification: "PLANNED_CHANGE"
workKind: "DOCUMENTATION"
complexity: "MEDIUM"
affectedPaths:
  - "src/pages/privacy.astro"
  - "src/components/SiteFooter.astro"
  - "src/styles/global.css"
executionAgent: "engineer"
collaborationRecommendation: "autonomous"
devServerCommand: "deno task dev"
devServerUrl: "http://localhost:4321/privacy"
createdAt: "2026-10-03"
origin: "internal"
userVerifiedAt: null
routingIntent: "PLANNED_CHANGE"
sessionName: "RunWield Privacy Page"
targetBranch: "main"
status: "implemented"
---

# Publish the RunWield Privacy Policy at /privacy

## Context

Microsoft requires a live privacy policy URL before RunWield can be published to winget, because the `wld CLI` connects
to AI providers. The policy must describe the **harness** (repository `../runwield`), not just this promo site, and it
must be published on this site at `/privacy` so the winget manifest can reference `https://runwield.dev/privacy`.

The original request was to adapt the Pi.dev privacy policy. Investigation found that **pi.dev publishes no privacy
policy** (checked the site, docs, packages gallery, and the `earendil-works/pi`, `pi-website`, and `website` repos).
The policy below is therefore written from RunWield's verified data practices instead, which also matches the
product's positioning: everything stays local, and there is no telemetry.

A read-only audit of the harness source (`../runwield`, branch `main`) established every claim in the policy content.
The audit report is summarized under Approach; the executing Engineer does not need to re-audit, only to render the
claims faithfully.

## Objective

A `/privacy` page on runwield.dev that states, accurately and verifiably, what the RunWield coding harness and this
website do with API keys, credentials, and user data — and that the URL is live at `https://runwield.dev/privacy` for
the winget submission.

## Approach

One new static page, following the existing non-home page pattern (`src/pages/blog/index.astro` uses
`src/layouts/BlogLayout.astro` with header, footer, canonical URL, and Open Graph meta). The policy is a single
self-contained page; no new layout, no client JavaScript, no third-party requests.

```text
src/pages/privacy.astro   # new page, reuses BlogLayout + blog-column text styles
src/components/SiteFooter.astro   # + one "Privacy" link beside GitHub/Docs
```

The page's content is fixed by this Plan (see Implementation Steps). The Engineer may adjust wording for style but
must not add, remove, or soften any factual claim — each claim below is backed by the harness audit, and overclaiming
("no network requests at all") would be false.

> [!WARNING]
> **"No telemetry" must still disclose the update check**
>
> The CLI automatically sends one unauthenticated request to the GitHub Releases API (at most every 6 hours, cached
> in `~/.wld/update-check.json`). It carries no user data, but the policy must mention it — a reviewer comparing
> behavior to policy would otherwise find a mismatch.

### Verified data practices (the policy's factual basis)

**Local storage — nothing leaves the machine by default:**

- `~/.wld/` holds `settings.json`, `auth.json` (credentials, file mode `0600`, directory `0700`), `models.json`
  (optional plaintext `apiKey` entries), `update-check.json`, `collaboration-secrets.json`, and session transcripts
  (append-only JSONL under `~/.wld/sessions/`, plaintext, containing prompts, tool results, and file content shown
  to the model).
- Project-local: `<project>/.wld/` (runtime state, plan locks, staging), `docs/plans/*.md` (Plans as plain Markdown),
  `docs/work-records/` (Work Records). Memories are stored through the locally installed `mnemoteca` binary.
- Deleting these files deletes the data. RunWield operates no cloud service that receives any of it.

**API keys and sign-in credentials:**

- Stored only on the user's machine (`~/.wld/auth.json` with `0600` permissions, or `~/.wld/models.json`). Never sent
  to RunWield. Used only to authenticate requests to the provider they belong to. OAuth tokens from `wld login`
  flows are stored the same way.

**What is sent to AI providers:**

- On each model turn, the working context (prompts, file contents read by tools, diffs, command output, images) goes
  directly from the user's machine to the AI provider(s) the user configured, under that provider's own privacy
  terms. RunWield never sees this content. Custom providers use the user's own `baseUrl`.

**No telemetry:**

- No analytics, no crash reporting, no usage pings, no tracking identifiers, no RunWield-operated endpoint receives
  user data. (The harness's `config.schema.json` contains inherited, unimplemented `enableInstallTelemetry` /
  `enableAnalytics` / `trackingId` settings from the pi codebase — the policy describes actual behavior, not the
  dead schema entries.)

**Every network request the CLI makes:**

- Automatic: the GitHub update check above (version number only; GitHub processes the request per GitHub's privacy
  statement).
- User-initiated only: `wld update` downloads installers from GitHub Releases (SHA-256 verified); `wld share`
  uploads a session as a **secret** GitHub Gist through the user's own `gh` CLI; `wld remote` copies `~/.wld` to a
  user-chosen SSH host over SSH/SFTP; `wld install` fetches packages from npm/git; web search/fetch agent tools send
  queries to public search backends through the locally installed `ketch` binary.
- The `bash` tool can run any command the user's account can run, including network commands; it is not a sandbox.

**Optional collaboration (Plan Server):**

- Self-hosted by the user (Podman/OCI); no default server. Plan content is encrypted on the user's machine
  (AES-256-GCM) before upload; the server stores ciphertext plus minimal routing metadata. RunWield never hosts it.

**This website (runwield.dev):**

- Static site on GitHub Pages. No cookies, no analytics, no trackers. GitHub logs standard request data (IP address,
  user agent) as any web host does. The beta form ("Try It With Me") opens the visitor's own email client addressed
  to `beta@runwield.dev` by default; email is used only to reply about the beta.

## Expected Change Surface

- `src/pages/privacy.astro` — new page; renders the policy using `BlogLayout` and existing `blog-column` typography;
  title "Privacy Policy", description summarizing the local-first/no-telemetry position.
- `src/components/SiteFooter.astro` — add a `Privacy` link beside the existing GitHub and Docs links.
- `src/styles/global.css` — only if existing blog text styles do not cover the policy's headings/lists; keep
  additions minimal.

This list is guidance, not an allowlist: verify the real footprint during implementation and change whatever the
Implementation Steps need. Stop and report only if discovery changes approved intent.

## Reuse Opportunities

- `src/layouts/BlogLayout.astro` — full page shell (header, footer, canonical, OG meta) already used by non-home
  pages.
- `.blog-column` / existing prose styles in `src/styles/global.css` — readable text column without new design work.

## Implementation Steps

1. `src/pages/privacy.astro` exists, imports `BlogLayout`, and is served at `/privacy` with title "Privacy Policy |
   RunWield" and a meta description stating that RunWield runs locally, keeps plans, sessions, and credentials on the
   user's machine, and collects no telemetry.
2. The page renders these sections, in this order, each making the claims listed under _Verified data practices_:
   - **Summary** — RunWield runs on your machine; Plans, sessions, and credentials stay local; no telemetry.
   - **What RunWield stores on your machine** — the `~/.wld/` and project-local paths, transcript plaintext nature,
     and "delete the files to delete the data".
   - **API keys and sign-in credentials** — local-only storage with `0600` permissions; never sent to RunWield; used
     only with the provider they belong to.
   - **What is sent to AI providers** — working context goes directly to the user's configured provider under that
     provider's terms; RunWield never receives it.
   - **No telemetry** — the no-analytics/no-crash-report/no-tracking claim.
   - **Network requests** — the automatic GitHub update check (disclosed, including the 6-hour cache), and the
     user-initiated requests (`wld update`, `wld share` secret Gist, `wld remote`, `wld install`, ketch web tools,
     unrestricted `bash`).
   - **Optional collaboration** — self-hosted Plan Server, client-side AES-256-GCM encryption, ciphertext-only
     upload, no default server.
   - **This website** — static GitHub Pages site, no cookies or trackers, GitHub request logs, beta form mailto
     behavior.
   - **Changes and contact** — "Last updated: October 3, 2026", contact `beta@runwield.dev` (see assumption below),
     and a sentence that policy changes update this page's date.
3. `src/components/SiteFooter.astro` contains a `Privacy` link (`href="/privacy"`) rendered beside the GitHub and
   Docs links on every page.
4. The page adds no client-side scripts, no external requests, and no third-party origins beyond the fonts and
   assets the site already loads.
5. `deno task check` and `deno task build` pass, and `dist/privacy/index.html` exists in the build output.

## Approval Confirmation

No `supersedes` Work Record IDs are proposed. This is new work with no prior record to replace.

## Verification Plan

- Automated: `deno task check && deno task build` (the project's confirmed verification command).
- Build-output checks (after `deno task build`):
  - `dist/privacy/index.html` exists and contains, at minimum, the strings "no telemetry", `auth.json`, "GitHub
    Releases", "AES-256-GCM", and `beta@runwield.dev` — proving the load-bearing claims rendered rather than a
    placeholder page.
  - `dist/index.html` contains `href="/privacy"` — the footer link is live on the home page.
  - `grep -c "script src=" dist/privacy/index.html` returns 0 (or matches only what the existing pages already
    load) — the page introduces no new external scripts.
- Manual: run `deno task dev`, open `http://localhost:4321/privacy`, and:
  - Read the page at mobile and desktop widths; headings and lists render in the site's typography.
  - Click the footer `Privacy` link from the home page; it navigates to `/privacy`.
  - Confirm the page's claims match the _Verified data practices_ list above — no claim added, removed, or softened.
- Deployment: the existing GitHub Pages workflow publishes on push to `main`; after merge, `https://runwield.dev/privacy`
  must return 200 before the winget manifest references it.

## Edge Cases & Considerations

- **Overclaiming risk** — the policy must not say "no network requests"; it must say "no telemetry" and disclose the
  automatic GitHub update check. Mitigated by the fixed claim list in the Implementation Steps.
- **Winget manifest follow-up (out of scope, harness repo)** — `../runwield/scripts/package-winget.js` currently has
  no privacy URL field. After this page is live, the winget manifest needs `https://runwield.dev/privacy` added as
  the publisher privacy/agreement URL. That change belongs to the harness repository, not this site.
- **Dead schema entries (out of scope, harness repo)** — `config.schema.json` in the harness documents
  `enableInstallTelemetry` / `enableAnalytics` / `trackingId` settings inherited from pi that RunWield does not
  implement. Removing them would keep schema and policy consistent; separate follow-up.
- **External helper binaries** — `ketch` (web search) and `mnemoteca` (memories) are separate binaries whose
  internals are not verifiable from the harness repo. The policy words their flows exactly as audited ("queries are
  sent to the search backends ketch is configured to use") and claims nothing further.
- **Assumption: contact address** — the policy lists `beta@runwield.dev`, the site's existing public contact. If a
  dedicated `privacy@runwield.dev` is preferred, it is a one-line change in the page and this section.
- **Assumption: "Last updated" date** — set to the implementation date; the step uses October 3, 2026 as the plan
  date and the Engineer should use the actual merge date.
