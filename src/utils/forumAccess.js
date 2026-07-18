import { publicPath } from './publicPath';

export const VISITOR_FORUM_PATH = '/p/b12e8f40a6';
export const WORKSPACE_PATH = '/p/1b9c60e4fa';
export const BU_XIANG_WORKSPACE_PATH = '/p/82f4d90c31';
export const LOGIN_PATH = '/p/6e58c2b9a1';

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

export function getHeartHomeCurrentUser() {
  if (typeof window === 'undefined') {
    return '';
  }

  return window.localStorage.getItem('heartHomeCurrentUser') || '';
}

export function getHeartHomeWorkspacePath(user = getHeartHomeCurrentUser()) {
  return user === '不想再背锅' ? BU_XIANG_WORKSPACE_PATH : WORKSPACE_PATH;
}

export function clearHeartHomeLogin() {
  window.localStorage.removeItem('heartHomeLoggedIn');
  window.localStorage.removeItem('heartHomeCurrentUser');
}
