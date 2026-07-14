const MAX_SEARCH_HISTORY = 20;

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function trimSearchHistory(history) {
  const nextHistory = [...history];

  while (nextHistory.length > MAX_SEARCH_HISTORY) {
    let removableIndex = -1;

    for (let index = nextHistory.length - 1; index >= 0; index -= 1) {
      if (!nextHistory[index].found) {
        removableIndex = index;
        break;
      }
    }

    nextHistory.splice(removableIndex === -1 ? nextHistory.length - 1 : removableIndex, 1);
  }

  return nextHistory;
}

export function readSearchHistory(storageKey) {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const parsed = JSON.parse(window.localStorage.getItem(storageKey) || '[]');
    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .filter((item) => typeof item?.keyword === 'string')
      .slice(0, MAX_SEARCH_HISTORY)
      .map((item) => ({
        keyword: item.keyword,
        found: Boolean(item.found),
        searchedAt: typeof item.searchedAt === 'string' ? item.searchedAt : '',
      }));
  } catch {
    return [];
  }
}

export function recordSearchHistory(storageKey, keyword, found) {
  const normalized = keyword.trim();

  if (!canUseStorage() || !normalized) {
    return [];
  }

  const history = readSearchHistory(storageKey);
  const nextEntry = {
    keyword: normalized,
    found: Boolean(found),
    searchedAt: new Date().toISOString(),
  };
  const nextHistory = [
    nextEntry,
    ...history.filter((item) => item.keyword !== normalized),
  ];
  const trimmedHistory = trimSearchHistory(nextHistory);

  try {
    window.localStorage.setItem(storageKey, JSON.stringify(trimmedHistory));
  } catch {
    return history;
  }

  return trimmedHistory;
}
