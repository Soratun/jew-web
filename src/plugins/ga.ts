// Lightweight GA4 plugin for Vue
declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    doNotTrack?: string | null;
  }
}

export function loadGtag(gaId: string) {
  if (!gaId) return;

  // ป้องกันโหลดซ้ำ
  if (document.getElementById('gtag-js')) return;

  // Respect Do Not Track (ทางเลือก)
  const dnt = navigator.doNotTrack === '1' || window.doNotTrack === '1';
  if (import.meta.env.PROD && dnt) return;

  // แทรกสคริปต์
  const s = document.createElement('script');
  s.async = true;
  s.id = 'gtag-js';
  s.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(s);

  // init gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: unknown[]) { window.dataLayer!.push(args); }
  window.gtag = gtag;

  gtag('js', new Date());
  // ปิด auto page_view เพื่อจะยิงผ่าน router แทน
  gtag('config', gaId, { send_page_view: false });
}

export function pageview(gaId: string, path: string, title?: string) {
  if (!window.gtag || !gaId) return;
  window.gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path,
  });
}

export function event(gaId: string, name: string, params: Record<string, unknown> = {}) {
  if (!window.gtag || !gaId) return;
  window.gtag('event', name, params);
}
