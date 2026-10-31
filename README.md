# Akshay Mittur

Personal portfolio of Akshay Mittur, an MBA candidate at UW Foster with experience at NVIDIA, Booking Holdings, and Cisco. Features selected work, background, resume, and contact information in a minimalist dark design.

Built with HTML, CSS, and JavaScript. Hosted on [GitHub Pages](https://akshaymittur.github.io/) with consent-based Google Analytics.

## Managing blog posts

Edit **`blog/posts.json`** to add, update, or remove posts. No build, dependency installation, or edits to the page layout are required. The Blog section shows “Coming soon” when the file is an empty array (`[]`) or all posts are unpublished.

To add your first post, replace `[]` with the example below, then change the text:

```json
[
  {
    "id": "my-first-post",
    "title": "My first post",
    "date": "2026-10-31",
    "summary": "A short introduction shown before readers expand the post.",
    "body": [
      "Write the first paragraph here.",
      "Write the next paragraph here. Add more strings for more paragraphs."
    ],
    "published": true
  }
]
```

- **Add:** add another object inside the array, separated from the previous object by a comma. Each `id` must be unique and use lowercase letters, numbers, and single hyphens between words.
- **Update:** change the title, summary, date, or body paragraphs in that object. Dates use `YYYY-MM-DD`; posts appear newest first. Dates are display values, not a publishing schedule.
- **Hide:** set `"published": false`. Omit `published` or set it to `true` to show the post. Hidden posts remain in the publicly accessible JSON file, so keep confidential drafts elsewhere.
- **Remove:** delete the entire object and its adjacent comma. Removing the last post should leave `[]`.

Content is plain text; HTML and Markdown are not interpreted. Use `\"` for a quote inside a JSON string and `\n` for a line break. JSON does not support comments or trailing commas. A malformed published post or invalid JSON shows a loading error instead of silently hiding content.

Commit and deploy changes through the repository’s existing GitHub Pages publishing process. Opening `index.html` directly as a file will not load the JSON; use a local HTTP server to preview:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/#blog`.

## Code structure

- `index.html`: portfolio layout and the default blog placeholder.
- `blog/posts.json`: blog content only; initially empty.
- `blog.js`: content loading, validation, date ordering, and accessible expandable posts. Text is rendered with `textContent`, so post content cannot inject HTML.
- `styles.css`: shared theme and responsive styles, with blog styles in their own section.
- `theme.js`, `site-config.js`, and `script.js`: existing theme, analytics configuration, and consent behavior.

The site remains a static, build-free GitHub Pages site. Blog rendering uses native browser APIs and does not add third-party packages.
