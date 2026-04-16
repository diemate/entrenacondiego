# Audit Report — entrenacondiego

**Date:** 2026-04-15  
**Auditor:** Claude Code (automated)  
**Base commit:** `5a8867d` (origin/main)

---

## Table of Contents

1. [Part 1 — Bugs](#part-1--bugs)
2. [Part 2 — SEO](#part-2--seo)
3. [Part 3 — Security](#part-3--security)
4. [Human Action Checklist](#human-action-checklist)

---

## Part 1 — Bugs

### B-01 · MEDIUM · Contact form allows double-submission

**File:** `src/components/contact-form.tsx`  
**Description:** The "Enviar Mensaje" button is never disabled during the async `onSubmit` handler. A user can click it multiple times in quick succession and send duplicate emails before the first response returns.  
**Fix:** Set `disabled={form.formState.isSubmitting}` on the Button and optionally show a loading indicator.

---

### B-02 · MEDIUM · API route leaks raw error messages to the client

**File:** `src/app/api/contact/route.ts:44`  
**Description:** `{ ok: false, error: (error as Error).message }` forwards the raw exception message (which may include SMTP config details, file paths, or stack frames) to the browser.  
**Fix:** Return a generic string `"Error interno. Inténtalo más tarde."` to the client; keep the full error server-side in the existing `console.error`.

---

### B-03 · LOW · Commented dead code in API route

**File:** `src/app/api/contact/route.ts:18`  
**Description:** Two commented-out `console.log` lines add visual noise and hint at unfinished work.  
**Fix:** Remove them.

---

### B-04 · HIGH · Legal / Privacy page contains unfilled placeholder text

**File:** `src/app/legal/page.tsx`  
**Description:** Numerous `[FILL IN]` tokens appear in the published Política de Privacidad and Términos y Condiciones (responsible party name/NIF, address, email, refund terms, cancellation days, jurisdiction city). Publishing a live page with placeholder GDPR/LOPDGDD disclosures is a legal/compliance risk and damages user trust.  
**Fix:** ⚠️ **Requires human action** — fill in the real data with a lawyer's input. See [Human Action Checklist](#human-action-checklist).

---

### B-05 · MEDIUM · HTML injection in outgoing email template

**File:** `src/app/api/contact/mailTemplate.ts`  
**Description:** `name`, `email`, `phone`, and `message` fields are interpolated directly into the HTML email without escaping. A user who submits `<img src=x onerror="...">` or `<b>` tags will cause those tags to render in Diego's inbox and could be used for phishing / email-client attacks.  
**Fix:** Escape `&`, `<`, `>`, `"`, `'` before interpolation. (Handled in PR 3 — Security.)

---

### B-06 · LOW · Unused heavy production dependencies inflate bundle

**File:** `package.json`  
**Description:** The following packages appear in `dependencies` but are not referenced in any page or component that gets shipped to users:  
- `firebase` + all `@genkit-ai/*` + `genkit` — AI/Firebase plumbing wired only to `src/ai/` which is not imported by any route.  
- `recharts` — no chart component exists in the UI.  
- `react-day-picker` + `date-fns` — no date-picker component exists.  
- `embla-carousel-react` — no carousel component exists.  
- `patch-package` — a dev-time patcher that should be in `devDependencies`.  
- `dotenv` — Next.js loads `.env` natively; this package is redundant.  

**Impact:** Each unused dependency increases `node_modules` size, adds to the security surface (audited CVEs below include many from these packages), and can accidentally be tree-shaken imperfectly.  
**Fix (recommended, not in PR 1):** Verify no hidden imports, then remove. Flagged as out-of-scope for automated fix because removing them changes `package.json` in ways that require careful testing.

---

### B-07 · LOW · `dangerouslySetInnerHTML` on developer-authored HTML strings

**File:** `src/app/faq/page.tsx:95`  
**Description:** FAQ answers are stored as raw HTML strings and rendered with `dangerouslySetInnerHTML`. The content is developer-authored (not user input), so there is no immediate XSS risk, but the pattern is fragile — if answer content is ever loaded from a CMS or external source, it becomes a critical vulnerability.  
**Fix (recommended):** Refactor FAQ answers to use structured data (plain strings + optional `ReactNode` for links) and render with JSX. Not automated in PR 1 — low priority given the static nature.

---

### B-08 · LOW · Missing `aria-label` / `aria-describedby` on icon-only interactive elements

**File:** `src/components/footer.tsx` (Instagram button)  
**Description:** The Instagram icon button in the footer has an `aria-label="Instagram"` ✓. No further issues found in interactive elements.  
**Status:** No action required.

---

### B-09 · LOW · Heading hierarchy — `h3` used inside accordions without parent `h2`

**File:** `src/app/legal/page.tsx`  
**Description:** The legal page renders `<h3>` headings inside accordion bodies, but the accordion trigger (the section heading) uses a styled `<button>` element with no heading tag. Screen readers will encounter `h3` without a preceding `h2`, breaking the heading outline.  
**Fix:** Wrap AccordionTrigger content in an `<h2>` or use `asChild` to render the trigger as a heading. (Applied in PR 1.)

---

### B-10 · LOW · `new Date().getFullYear()` in footer causes potential hydration mismatch

**File:** `src/components/footer.tsx:11`  
**Description:** `new Date().getFullYear()` is evaluated at SSR time and again during client hydration. If a year rolls over between server render and client hydration (extremely unlikely, but possible during the first minutes of January 1st), React will log a hydration warning.  
**Fix:** Minimal risk; documented as known. Can be fixed by converting Footer to a Client Component or using a static year variable. Deferred.

---

## Part 2 — SEO

### S-01 · HIGH · No `sitemap.xml`

**File:** `public/` (missing)  
**Description:** Search engines cannot discover all pages efficiently without a sitemap. The site has at least 4 indexable routes (`/`, `/faq`, `/legal`, `/planes` redirect).  
**Fix:** Add `src/app/sitemap.ts` using Next.js App Router's built-in sitemap generation. Use `NEXT_PUBLIC_SITE_URL` env variable for the base URL.

---

### S-02 · HIGH · No `robots.txt`

**File:** `public/` (missing)  
**Description:** Without `robots.txt`, crawlers must guess crawl rules. Also, the sitemap URL cannot be declared.  
**Fix:** Add `src/app/robots.ts`.

---

### S-03 · HIGH · No Open Graph or Twitter Card metadata

**File:** `src/app/layout.tsx`  
**Description:** No `og:title`, `og:description`, `og:image`, `og:type`, `og:url`, `og:locale`, `twitter:card`, or `twitter:title` tags exist on any page. This means link-shares on WhatsApp, Twitter/X, LinkedIn, and iMessage show no preview.  
**Fix:** Add via Next.js `metadata` / `openGraph` object in layout and per-page.

---

### S-04 · HIGH · No structured data (JSON-LD)

**File:** All pages  
**Description:** No `LocalBusiness`, `Person`, `Service`, or `FAQPage` schema. Missing rich-result eligibility in Google Search for a local service business.  
**Fix:** Add a `<StructuredData>` server component with:  
- `LocalBusiness` with name, description, url, image, telephone (placeholder), address (Madrid / Vallecas), areaServed, sameAs (Instagram).  
- `Person` for Diego (name, jobTitle, worksFor).  
- `Service` for each of the three offerings.  
- `FAQPage` for the FAQ page.

---

### S-05 · HIGH · `<title>` and `<meta description>` missing geographic keywords

**File:** `src/app/layout.tsx:9`  
**Description:** Current title: `"Diego Jimenez | Asesor de Hábitos Saludables y Entrenador Personal"` — no mention of Madrid or Vallecas.  
**Proposed title:** `"entrenaconDiego — Entrenador Personal en Madrid y Vallecas"` (57 chars)  
**Current description:** Missing "Madrid", "Vallecas", "online".  
**Proposed description:** `"Entrenador personal certificado en Madrid y Vallecas. Programas 100% personalizados de entrenamiento, nutrición y hábitos. Método 4R. Sesión diagnóstico GRATUITA."` (163 chars — slightly over; trimmed below)  
**Fix (SEO PR):** Update layout metadata. **No copy changes to visible page content.**

---

### S-06 · MEDIUM · Hero `<h1>` contains no geographic or service signal

**File:** `src/components/sections/hero-section.tsx`  
**Description:** Current `<h1>`: *"La PRECISIÓN de la ingeniería aplicada a tu entrenamiento"* — strong brand copy but invisible to SEO for "entrenador personal Madrid" searches.  
**⚠️ Requires human approval before applying.**  
**Proposed addition:** Add a visually de-emphasized (small, above the H1) element or subtitle tag that includes the geographic keyword, e.g. the existing eyebrow text `"Entrenador Personal · Madrid · Vallecas · Online"`. Alternatively, suggest to Diego adding a short line like *"Entrenador Personal certificado en Madrid y Vallecas"* as a subtitle below the H1 without touching the H1 itself. This preserves brand voice.  
**Not executed in PR 2.** Documented here for human decision.

---

### S-07 · MEDIUM · Google Fonts loaded via render-blocking `<link>` tags

**File:** `src/app/layout.tsx:22-25`  
**Description:** Two `<link rel="stylesheet">` calls to `fonts.googleapis.com` are render-blocking resources that delay the First Contentful Paint. Next.js `next/font/google` is the recommended replacement — it inlines the font-face declarations, self-hosts the font files, and eliminates the cross-origin round-trip.  
**Fix:** Replace with `next/font/google` imports. No visual change.

---

### S-08 · MEDIUM · Per-page metadata missing on secondary pages

**File:** `src/app/faq/page.tsx`, `src/app/legal/page.tsx`, `src/app/planes/page.tsx`  
**Description:** Only the root layout exports `metadata`; secondary pages inherit the generic title and description.  
**Fix:** Add `export const metadata: Metadata` to each page with unique title, description, and canonical URL.

---

### S-09 · MEDIUM · No canonical `<link rel="canonical">` tag

**File:** `src/app/layout.tsx`  
**Description:** Without a canonical tag, crawlers may index the same page at multiple URLs (e.g. with/without trailing slash, with query strings). Next.js App Router supports `alternates.canonical` in the `Metadata` object.  
**Fix:** Add `alternates: { canonical: '<url>' }` to each page's metadata.

---

### S-10 · LOW · `alt` text on hero and avatar images could carry natural keywords

**File:** `src/components/sections/hero-section.tsx`, `src/components/sections/about-section.tsx`  
**Description:** Hero image has `alt="Hero background"` (decorative — `alt=""` would be more correct), avatar has `alt="Diego Jimenez"` (good). The hero background is genuinely decorative so `alt=""` is correct per WCAG.  
**Fix:** Change hero `alt` to `""` (empty = decorative). Avatar is fine as-is.

---

### S-11 · LOW · Local SEO — No NAP block in footer

**File:** `src/components/footer.tsx`  
**Description:** Google Business Profile citations require consistent Name, Address, Phone (NAP) data across the web. The footer currently shows only the copyright line and nav links.  
**Fix (PR 2):** Add a small NAP line to the footer: name, area ("Madrid · Vallecas · Online"), and a phone/email line (if Diego approves). The exact address/phone is **required from Diego** — flagged in Human Action Checklist.  
**Partial fix applied:** Add "Madrid · Vallecas · Online" area marker to footer.

---

### S-12 · LOW · Image `alt` on about section avatar

**File:** `src/components/sections/about-section.tsx`  
**Description:** Current: `alt="Diego Jimenez"`. A richer alt with role/location ("Diego Jiménez, entrenador personal en Madrid") would carry keyword signal.  
**⚠️ Counts as copy change — requires human approval.** Not executed in PR 2. Documented for reference.

---

### S-13 · INFO · Analytics not set up

**Description:** No analytics or conversion tracking is present. Recommendation: install Plausible Analytics (privacy-friendly, GDPR-compliant without consent banner for basic stats, €9/mo) or self-hosted Umami. Do **not** install without Diego's consent.  
**Not executed.** See Human Action Checklist.

---

### S-14 · INFO · Google Search Console not configured

**Description:** No `google-site-verification` meta tag exists.  
**Not executed.** Requires Diego to create/verify the Search Console property.

---

## Part 3 — Security

### SEC-01 · HIGH · No HTTP security headers

**File:** `next.config.ts`  
**Description:** The application sends no security headers. A quick check shows no `Content-Security-Policy`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, or `Permissions-Policy`. This means:  
- Pages can be iframe'd (clickjacking risk).  
- Browsers will sniff MIME types (content-type sniffing attacks).  
- Referer headers leak the full URL to external resources.  
**Fix:** Add a `headers()` function to `next.config.ts`. Applied in PR 3.

---

### SEC-02 · HIGH · HTML injection in outbound email

**File:** `src/app/api/contact/mailTemplate.ts`  
**Description:** User-supplied `name`, `email`, `phone`, and `message` are interpolated verbatim into an HTML string. Specially crafted inputs can inject arbitrary HTML/CSS into the email received by Diego, enabling email spoofing, phishing lures, and visual deception in the inbox.  
**Example attack:** `name = '</td></tr><tr><td>SPOOFED_CONTENT`  
**Fix:** Escape all five HTML special characters (`& < > " '`) before interpolation.

---

### SEC-03 · HIGH · No rate limiting on contact form endpoint

**File:** `src/app/api/contact/route.ts`  
**Description:** The `/api/contact` endpoint has no throttle. An attacker can send thousands of POST requests per minute, resulting in:  
1. SMTP quota exhaustion (and potential account suspension).  
2. Email flooding of Diego's inbox.  
3. Financial cost if a paid SMTP provider is used.  
**Fix:** Add an in-memory rate limiter (3 submissions per IP per hour). Applied in PR 3.

---

### SEC-04 · HIGH · Next.js version has multiple known CVEs

**File:** `package.json` (`"next": "15.3.8"`)  
**CVEs (selection):**  
- Cache Key Confusion for Image Optimization (HIGH)  
- Content Injection Vulnerability for Image Optimization (HIGH)  
- Improper Middleware Redirect Handling leads to SSRF (HIGH)  
- HTTP request smuggling via rewrites (HIGH)  
**Fix:** Upgrade to `next@15.5.15` (non-breaking minor release). Applied in PR 3.

---

### SEC-05 · HIGH · nodemailer version has SMTP command injection CVEs

**File:** `package.json` (`"nodemailer": "^7.0.9"`)  
**CVEs:**  
- SMTP command injection via CRLF in transport name option (HIGH)  
- SMTP command injection via unsanitized `envelope.size` (HIGH)  
- `addressparser` DoS via recursive calls (MEDIUM)  
**Fix:** Upgrade to latest `nodemailer` patch. Applied in PR 3.

---

### SEC-06 · MEDIUM · Contact form has no spam protection (no honeypot / CAPTCHA)

**File:** `src/components/contact-form.tsx`, `src/app/api/contact/route.ts`  
**Description:** Automated bots can fill and submit the contact form trivially, leading to spam flooding Diego's inbox.  
**Fix:** Add a honeypot field (hidden text input; if filled, the server silently rejects the submission). This is invisible to real users and effective against basic bots. Applied in PR 3.

---

### SEC-07 · MEDIUM · Raw error messages returned to the client

**File:** `src/app/api/contact/route.ts:44`  
**Description:** Internal SMTP error messages (host unreachable, auth failures, etc.) are forwarded to the browser response. This can reveal infrastructure details (SMTP host, auth method).  
**Fix:** Return a generic message to the client. Applied in PR 1.

---

### SEC-08 · MEDIUM · No `.env.example` file

**File:** repository root  
**Description:** There is no `.env.example` documenting the required environment variables. New developers or deployment environments must reverse-engineer required variables from the code. The actual `.env` file is correctly gitignored.  
**Fix:** Create `.env.example` with placeholder values. Applied in PR 3.

---

### SEC-09 · MEDIUM · Legal pages have unfilled GDPR/LOPDGDD placeholders (compliance)

**File:** `src/app/legal/page.tsx`  
**Description:** The live privacy policy contains `[FILL IN]` tokens for the data controller identity, contact email, NIF, address, and processing details. Publishing incomplete GDPR and LOPDGDD disclosures is a compliance violation. AEPD can issue fines.  
**Fix:** ⚠️ **Requires human action.** See Human Action Checklist.

---

### SEC-10 · LOW · `@babel/runtime` ReDoS vulnerability (moderate CVE)

**File:** `package.json` (transitive dependency)  
**CVE:** GHSA-968p-4wvh-cqc8 — ReDoS via named capturing groups in generated code  
**Fix:** `npm audit fix` resolves this without breaking changes.

---

### SEC-11 · LOW · Multiple CVEs in unused/dev-time transitive dependencies

**Description:** 45 total vulnerabilities flagged by `npm audit`. Most are in transitive dependencies of `genkit`, `firebase`, and other packages that are imported into `src/ai/` but never bundled with any page. The risk is low since they don't run in production, but they inflate the audit surface.  
**Fix (recommended):** Remove unused direct dependencies (`firebase`, `genkit`, `@genkit-ai/*`, etc.) as noted in B-06. The CVE count will drop significantly.

---

### SEC-12 · LOW · Google Fonts loaded cross-origin (privacy / CSP complexity)

**File:** `src/app/layout.tsx`  
**Description:** Loading fonts from `fonts.googleapis.com` / `fonts.gstatic.com` sends the user's IP to Google on every page load. In a Spanish/EU context this constitutes a cross-border personal data transfer. Germany's LfDI has issued guidance against this pattern.  
**Fix:** Switch to `next/font/google` (self-hosted, zero external font requests). Applied in PR 2.

---

### SEC-13 · INFO · No CSRF token on API endpoint

**File:** `src/app/api/contact/route.ts`  
**Description:** The contact endpoint has no explicit CSRF token. However, Next.js App Router's fetch-based client (`fetch` with `Content-Type: application/json`) is not vulnerable to classic form-based CSRF because browsers do not send JSON content-type cross-origin without a preflight. Combined with the rate limiter (PR 3), the residual risk is low.  
**Fix:** No explicit fix required. Rate limiting (SEC-03) and origin-check headers (SEC-01 CSP) provide adequate mitigation.

---

## Human Action Checklist

Items that cannot be automated and **must be completed by Diego / his team**:

| # | Priority | Action |
|---|----------|--------|
| H-01 | 🔴 HIGH | Fill in all `[FILL IN]` placeholders in `/legal` page with accurate legal data (NIF, address, email, refund policy, etc.). Involve a lawyer. |
| H-02 | 🔴 HIGH | Set up real SMTP credentials in `.env` (use `.env.example` as template). Test contact form in production. |
| H-03 | 🟡 MEDIUM | Claim/create Google Business Profile at google.com/business with NAP matching the site. |
| H-04 | 🟡 MEDIUM | Set up Google Search Console: verify site, submit sitemap, monitor coverage. |
| H-05 | 🟡 MEDIUM | Decide on analytics: recommended Plausible Analytics (`NEXT_PUBLIC_PLAUSIBLE_DOMAIN`). |
| H-06 | 🟡 MEDIUM | Confirm/update `NEXT_PUBLIC_SITE_URL` env variable to the production domain. |
| H-07 | 🟡 MEDIUM | Review proposed title/H1 change (S-05, S-06) and approve the geographic keyword additions. |
| H-08 | 🟡 MEDIUM | Get consistent citations on Spanish local directories: Páginas Amarillas, Hotfrog, Yelp España, ThreeBestRated. |
| H-09 | 🟢 LOW | Consider adding NAP to footer (phone number and area). |
| H-10 | 🟢 LOW | If `src/ai/` Genkit flows are not needed, remove `firebase`, `genkit`, and `@genkit-ai/*` from `package.json` to reduce CVE surface (drops ~30 of the 45 audit findings). |
