// src/plugins/ga.ts
export function loadGtag(gaId: string) {
  if (!gaId) {
    console.warn('GA: missing GA_ID');
    return;
  }

  // กันโหลดซ้ำ
  if (document.getElementById('gtag-js')) return;

  const script = document.createElement('script');
  script.id = 'gtag-js';
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag() { (window as any).dataLayer.push(arguments); }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  // ปิด auto page_view ให้ router เป็นคนยิงเอง
  gtag('config', gaId, { send_page_view: false });
}

export function pageview(gaId: string, path: string, title?: string) {
  if (!gaId) return;
  const gtag = (window as any).gtag;
  if (!gtag) {
    console.warn('GA: gtag not ready yet');
    return;
  }
  gtag('event', 'page_view', {
    page_title: title || document.title,
    page_location: window.location.href,
    page_path: path,
  });
}
