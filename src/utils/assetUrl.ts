/**
 * Resolves static asset paths across local development, AI Studio preview,
 * and GitHub Pages deployments (e.g. https://username.github.io/vistiria-properties/).
 */
export function resolveAssetUrl(url: string | undefined | null): string {
  if (!url) return '';

  // Return external URLs as-is
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Normalize /src/assets/... to assets/...
  let clean = url.replace(/^\/?src\/assets\//, 'assets/');

  // Remove leading ./ or /
  clean = clean.replace(/^(\.\/|\/)+/, '');

  // 1. When hosted on GitHub Pages: <username>.github.io/<repo>/
  if (typeof window !== 'undefined' && window.location.hostname.endsWith('github.io')) {
    const parts = window.location.pathname.split('/').filter(Boolean);
    const repoSegment = parts.length > 0 ? parts[0] : '';
    if (repoSegment && !clean.startsWith(repoSegment + '/')) {
      return `/${repoSegment}/${clean}`;
    }
  }

  // 2. Vite base URL (e.g. '/vistiria-properties/' or '/' or './')
  const baseUrl = import.meta.env.BASE_URL || '/';
  const prefix = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;

  if (prefix !== '/' && prefix !== './' && clean.startsWith(prefix.replace(/^\//, ''))) {
    return `/${clean}`;
  }

  return `${prefix}${clean}`;
}
