(() => {
  'use strict';
  const storageKey = 'am-theme';
  let theme = 'dark';
  try {
    if (localStorage.getItem(storageKey) === 'light') theme = 'light';
  } catch { /* The toggle still works when browser storage is unavailable. */ }

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', theme === 'light' ? '#f6f4ee' : '#141816');
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      const label = `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`;
      button.setAttribute('aria-label', label);
      button.title = label;
    });
  }

  // Apply the saved palette before the stylesheet paints the page.
  applyTheme();
  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-theme-toggle]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        theme = theme === 'dark' ? 'light' : 'dark';
        try { localStorage.setItem(storageKey, theme); } catch { /* Keep the choice for this page. */ }
        applyTheme();
      });
    });
    applyTheme();
  });
  window.addEventListener('storage', event => {
    if (event.key === storageKey || event.key === null) {
      theme = event.newValue === 'light' ? 'light' : 'dark';
      applyTheme();
    }
  });
})();
