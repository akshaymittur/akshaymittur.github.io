(() => {
  'use strict';

  const container = document.getElementById('blog-posts');
  const emptyState = document.getElementById('blog-empty');
  if (!container || !emptyState) return;

  const dateFormat = new Intl.DateTimeFormat('en-US', {
    year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC'
  });

  // Content is plain text, never HTML. Keep authoring separate from rendering.
  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text) node.textContent = text;
    return node;
  }

  function publishedPosts(data) {
    if (!Array.isArray(data)) throw new Error('Blog content must be an array.');
    const ids = new Set();
    return data.filter(post => post?.published !== false).map(post => {
      const hasText = value => typeof value === 'string' && value.trim().length > 0;
      const validDate = typeof post?.date === 'string' &&
        /^\d{4}-\d{2}-\d{2}$/.test(post.date) &&
        !Number.isNaN(Date.parse(post.date)) &&
        new Date(post.date).toISOString().slice(0, 10) === post.date;

      if (!post || typeof post.id !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(post.id) ||
          ids.has(post.id) || !hasText(post.title) || !hasText(post.summary) || !validDate ||
          !Array.isArray(post.body) || !post.body.length || !post.body.every(hasText) ||
          (post.published !== undefined && typeof post.published !== 'boolean')) {
        throw new Error('Each published post needs a unique id, title, date (YYYY-MM-DD), summary, and body paragraphs.');
      }
      ids.add(post.id);
      return post;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }

  function renderPost(post) {
    const article = element('article', 'blog-post');
    article.id = `blog-${post.id}`;
    const date = element('time', 'eyebrow', dateFormat.format(new Date(post.date)));
    date.dateTime = post.date;
    const heading = element('h3', '', post.title);
    heading.id = `${article.id}-title`;
    article.setAttribute('aria-labelledby', heading.id);

    const details = element('details', 'blog-details');
    const summary = element('summary', '', 'Read post');
    summary.setAttribute('aria-label', `Read post: ${post.title}`);
    const icon = element('span', '', '+');
    icon.setAttribute('aria-hidden', 'true');
    summary.append(icon);
    const body = element('div', 'blog-body');
    post.body.forEach(paragraph => body.append(element('p', '', paragraph)));
    details.append(summary, body);
    article.append(date, heading, element('p', 'blog-summary', post.summary), details);
    return article;
  }

  async function loadPosts() {
    try {
      const response = await fetch('blog/posts.json');
      if (!response.ok) throw new Error(`Blog request failed (${response.status}).`);
      const posts = publishedPosts(await response.json());
      container.replaceChildren(...posts.map(renderPost));
      emptyState.hidden = posts.length > 0;
    } catch (error) {
      // A failed request must not be mistaken for a blog with no posts.
      emptyState.querySelector('.eyebrow').textContent = 'BLOG';
      emptyState.querySelector('h3').textContent = 'Writing will be back soon.';
      emptyState.querySelector('p').textContent = 'Posts could not be loaded. Please try again later.';
      console.error('Unable to load blog posts:', error);
    }
  }

  loadPosts();
})();
