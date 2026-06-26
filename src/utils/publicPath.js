const baseUrl = import.meta.env.BASE_URL || '/';

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
