const POST_LIKE_STORAGE_PREFIX = 'heartHomePostLiked:';

export function getStoredPostLiked(likeStorageKey) {
  if (!likeStorageKey || typeof window === 'undefined') {
    return false;
  }

  try {
    return window.localStorage.getItem(`${POST_LIKE_STORAGE_PREFIX}${likeStorageKey}`) === 'true';
  } catch {
    return false;
  }
}

export function setStoredPostLiked(likeStorageKey, liked) {
  if (!likeStorageKey || typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(
    `${POST_LIKE_STORAGE_PREFIX}${likeStorageKey}`,
    liked ? 'true' : 'false'
  );
}
