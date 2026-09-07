const baseUrl = import.meta.env.BASE_URL || '/';

export const isTapTapH5 = import.meta.env.MODE === 'taptap';

export function publicPath(path) {
  const value = String(path);

  if (/^(?:https?:|data:|blob:)/.test(value) || value.startsWith(baseUrl)) {
    return value;
  }

  const normalizedPath = value.replace(/^\/+/, '');
  return `${baseUrl}${normalizedPath}`;
}

export function publicUrl(path) {
  if (typeof window === 'undefined') {
    return publicPath(path);
  }

  return new URL(publicPath(path), window.location.origin).href;
}

function normalizeRoute(path) {
  return `/${String(path).replace(/^\/+/, '')}`;
}

export function routePath(path) {
  const normalizedPath = normalizeRoute(path);
  return isTapTapH5 ? `${baseUrl}#${normalizedPath}` : publicPath(normalizedPath);
}

export function openGameRoute(path) {
  const normalizedPath = normalizeRoute(path);

  if (isTapTapH5) {
    window.location.hash = normalizedPath;
    return;
  }

  window.open(publicPath(normalizedPath), '_blank', 'noopener,noreferrer');
}
