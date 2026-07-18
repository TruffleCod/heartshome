const PLAYER_GUESTBOOK_MESSAGES_KEY = 'heart-home:dongyang-player-guestbook-messages';
const MAX_PLAYER_GUESTBOOK_MESSAGES = 20;

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage);
}

function formatArchivedAt(date) {
  const pad = (value) => String(value).padStart(2, '0');

  return [
    date.getFullYear(),
    pad(date.getMonth() + 1),
    pad(date.getDate()),
  ].join('-') + ` ${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

function normalizePlayerMessage(item) {
  if (
    typeof item?.id !== 'string' ||
    typeof item?.author !== 'string' ||
    typeof item?.archivedAt !== 'string' ||
    !Array.isArray(item?.paragraphs)
  ) {
    return null;
  }

  const paragraphs = item.paragraphs
    .filter((paragraph) => typeof paragraph === 'string')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  if (!item.author.trim() || paragraphs.length === 0) {
    return null;
  }

  return {
    id: item.id,
    label: typeof item.label === 'string' && item.label.trim()
      ? item.label
      : 'player-guestbook-message',
    author: item.author.trim(),
    archivedAt: item.archivedAt,
    paragraphs,
    isPlayerMessage: true,
  };
}

export function readPlayerGuestbookMessages() {
  if (!canUseStorage()) {
    return [];
  }

  try {
    const parsed = JSON.parse(
      window.localStorage.getItem(PLAYER_GUESTBOOK_MESSAGES_KEY) || '[]'
    );

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(normalizePlayerMessage)
      .filter(Boolean)
      .slice(0, MAX_PLAYER_GUESTBOOK_MESSAGES);
  } catch {
    return [];
  }
}

export function savePlayerGuestbookMessage(author, text) {
  const normalizedAuthor = author.trim();
  const normalizedText = text.trim();

  if (!canUseStorage() || !normalizedAuthor || !normalizedText) {
    return readPlayerGuestbookMessages();
  }

  const message = {
    id: `player-message-${Date.now()}`,
    label: 'player-guestbook-message',
    author: normalizedAuthor,
    archivedAt: formatArchivedAt(new Date()),
    paragraphs: [normalizedText],
    isPlayerMessage: true,
  };
  const nextMessages = [
    message,
    ...readPlayerGuestbookMessages(),
  ].slice(0, MAX_PLAYER_GUESTBOOK_MESSAGES);

  try {
    window.localStorage.setItem(
      PLAYER_GUESTBOOK_MESSAGES_KEY,
      JSON.stringify(nextMessages)
    );
  } catch {
    return readPlayerGuestbookMessages();
  }

  return nextMessages;
}
