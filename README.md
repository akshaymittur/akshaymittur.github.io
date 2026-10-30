# Akshay Mittur · Portfolio

A static, responsive portfolio for GitHub Pages. Plain HTML, CSS, and JavaScript; no build system or dependencies. Fonts are self-hosted with their licenses in `assets/`.

## Develop

Use the existing checkout; a new worktree is unnecessary. From the repository root run:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the local server in your browser. Main content lives in `index.html`, design in `styles.css`, consent and event handling in `script.js`. The public resume is `assets/akshay-mittur-resume.pdf`. Experience summaries use the latest Foster MBA resume supplied by Akshay; older resumes may have different figures and dates. Project graphics are custom illustrations, not screenshots of internal or client software.

## Publish

Push to `main`. In the repository’s **Settings → Pages**, set **Deploy from a branch**, branch **main**, folder **/ (root)**, and save. `.nojekyll` allows GitHub Pages to serve the static files directly. GitHub may take a few minutes to deploy.

Production URL: https://akshaymittur.github.io/

## Connect Google Analytics 4

The integration is implemented but **disabled until a real measurement ID is supplied**. No fake ID or third-party account is used.

1. Sign in at https://analytics.google.com/ with the Google account that should own the data. Create an account if needed, then a GA4 property. Choose your reporting timezone (e.g. America/Los_Angeles).
2. Create a **Web** data stream for `https://akshaymittur.github.io`, name it "Akshay Mittur Portfolio", and copy its **Measurement ID**, which starts with `G-`.
3. Put that public ID in `site-config.js` as `gaMeasurementId: 'G-YOURREALID'`. Commit and push to `main`.
4. Visit the published site with ad blockers off, choose **Analytics only** or **Allow all**, and check **Reports → Realtime**. Event delivery and reports may take time. Do not assume tracking works until events appear in your property.
5. Use acquisition reports for traffic sources, engagement reports for page/event trends, and user attributes reports for approximate geography, devices, and available demographics. Custom events are `resume_open`, `project_view` (with `project_name`), `contact_email`, `linkedin_click`, and `github_click`. Resume events count clicks/opens, not proof someone read the PDF. Register `project_name` as an event-scoped custom dimension if you want it in explorations.
6. If you want age, gender, and interests, review and enable **Google signals** under the property’s data collection settings where available. Check the appropriate regional consent settings. These features may require advertising-related consent; this site only grants that with **Allow all**. Demographics are aggregated, thresholded, and may remain unavailable for a small audience. GA does not reveal individual visitor identities.
7. Review data retention, internal traffic filters, and privacy disclosures before enabling collection. A short retention period such as two months is a reasonable starting point. Mark contact or resume events as key events if useful. The consent interface is a lightweight implementation, not a Google-certified consent management platform for advertising products.

The tag is never loaded before opt-in, when consent is declined, or while the measurement ID is empty. The site sends a clean page location without URL query parameters or fragments and no contact-message content. Consent can be changed from the footer or privacy page. Withdrawing consent reloads the page to stop the active tag. Google cookies previously created may persist until removed in browser settings. Avoid adding personal information to URLs or event parameters.

## Checks

Verify the home and privacy pages, all three expandable project stories, resume PDF, keyboard navigation, mobile layout, and cookie preference controls. Test analytics with a mocked tag locally; verify actual delivery separately in your own GA4 property once configured.
