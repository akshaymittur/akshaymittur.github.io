# Akshay Mittur

Personal portfolio of Akshay Mittur, an MBA candidate at UW Foster with experience at NVIDIA, Booking Holdings, and Cisco. Features selected work, background, resume, and contact information in a minimalist dark design.

Built with HTML, CSS, and JavaScript. Hosted on [GitHub Pages](https://akshaymittur.github.io/) with consent-based Google Analytics.

## Code structure

- `index.html`: portfolio layout and the default blog placeholder.
- `blog/posts.json`: blog content only; initially empty.
- `blog.js`: content loading, validation, date ordering, and accessible expandable posts. Text is rendered with `textContent`, so post content cannot inject HTML.
- `styles.css`: shared theme and responsive styles, with blog styles in their own section.
- `theme.js`, `site-config.js`, and `script.js`: existing theme, analytics configuration, and consent behavior.

The site remains a static, build-free GitHub Pages site. Blog rendering uses native browser APIs and does not add third-party packages.
