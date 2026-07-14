import { publicPath } from './publicPath';

export const VISITOR_FORUM_PATH = '/p/b12e8f40a6';
export const WORKSPACE_PATH = '/p/1b9c60e4fa';

export function isVisitorForumVerified() {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('heartHomeForumVerified') === 'true'
  );
}

export function markVisitorForumVerified() {
  window.localStorage.setItem('heartHomeForumVerified', 'true');
}

export function openVisitorForumWindow() {
  window.open(publicPath(VISITOR_FORUM_PATH), '_blank', 'noopener,noreferrer');
}

export function openVisitorForumOrVerify(showVerification) {
  if (isVisitorForumVerified()) {
    openVisitorForumWindow();
    return;
  }

  showVerification();
}

export function markHeartHomeLoggedIn(user) {
  window.localStorage.setItem('heartHomeLoggedIn', 'true');
  window.localStorage.setItem('heartHomeCurrentUser', user);
}
