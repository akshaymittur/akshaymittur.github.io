(() => {
  'use strict';
  const id = window.SITE_CONFIG?.gaMeasurementId || '';
  const configured = /^G-[A-Z0-9]+$/.test(id);
  const storageKey = 'am-analytics-consent-v1';
  const panel = document.getElementById('consent-panel');
  const settings = document.getElementById('analytics-settings');
  let choice = 'denied';
  let loaded = false;
  let lastFocus;
  try {
    const saved = localStorage.getItem(storageKey);
    if (['denied', 'analytics', 'all'].includes(saved)) choice = saved;
    else if (configured && panel) panel.hidden = false;
  } catch { if (configured && panel) panel.hidden = false; }

  function consentValue(value) {
    return { analytics_storage: value === 'denied' ? 'denied' : 'granted',
      ad_storage: value === 'all' ? 'granted' : 'denied',
      ad_user_data: value === 'all' ? 'granted' : 'denied',
      ad_personalization: value === 'all' ? 'granted' : 'denied' };
  }
  function enableAnalytics() {
    if (!configured || choice === 'denied' || loaded) return;
    loaded = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', consentValue(choice));
    window.gtag('js', new Date());
    window.gtag('config', id, {
      allow_google_signals: choice === 'all',
      allow_ad_personalization_signals: choice === 'all',
      page_location: location.origin + location.pathname,
      page_title: document.title
    });
    const tag = document.createElement('script');
    tag.id = 'google-analytics-tag';
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(tag);
  }
  enableAnalytics();
  settings?.addEventListener('click', () => {
    if (panel) { lastFocus = settings; panel.hidden = false; panel.querySelector('button')?.focus(); }
  });
  document.querySelectorAll('[data-consent]').forEach(button => button.addEventListener('click', () => {
    choice = button.dataset.consent;
    try { localStorage.setItem(storageKey, choice); } catch { /* Session-only consent is still honored. */ }
    if (panel) panel.hidden = true;
    lastFocus?.focus();
    // Reload after a change to stop an existing tag and apply consent before any new requests.
    if (loaded) location.reload();
    else enableAnalytics();
  }));
  function track(name, params = {}) {
    if (configured && choice !== 'denied' && loaded) window.gtag('event', name, params);
  }
  document.querySelectorAll('[data-track]').forEach(link => link.addEventListener('click', () => track(link.dataset.track)));
  document.querySelectorAll('details[data-project]').forEach(detail => detail.addEventListener('toggle', () => {
    if (detail.open) track('project_view', { project_name: detail.dataset.project });
  }));
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
})();
