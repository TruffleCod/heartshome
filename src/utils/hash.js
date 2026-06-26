export function normalizeInput(value) {
  return String(value || '').trim();
}

export async function sha256(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));

  return hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');
}

export async function hashWithPepper(value, pepper) {
  return sha256(`${pepper}${normalizeInput(value)}`);
}
