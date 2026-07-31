export const INPUT_MODE_STORAGE_KEY = 'heart-home:input-mode';
export const INPUT_MODES = {
  POINTER: 'pointer',
  TOUCH: 'touch',
};
export const TOUCH_LAYOUTS = {
  NARROW: 'narrow',
  WIDE: 'wide',
};
export const TOUCH_LAYOUT_BREAKPOINT = 768;

let isViewportWatcherBound = false;

export function normalizeInputMode(value) {
  return value === INPUT_MODES.TOUCH ? INPUT_MODES.TOUCH : INPUT_MODES.POINTER;
}

export function readInputMode() {
  if (typeof window === 'undefined') return INPUT_MODES.POINTER;
  return normalizeInputMode(window.localStorage.getItem(INPUT_MODE_STORAGE_KEY));
}

export function readTouchLayout() {
  if (typeof window === 'undefined') return TOUCH_LAYOUTS.WIDE;
  return window.innerWidth <= TOUCH_LAYOUT_BREAKPOINT
    ? TOUCH_LAYOUTS.NARROW
    : TOUCH_LAYOUTS.WIDE;
}

export function applyInputMode(mode) {
  if (typeof document === 'undefined') return;

  const normalizedMode = normalizeInputMode(mode);
  const touchLayout = readTouchLayout();
  const isTouchMode = normalizedMode === INPUT_MODES.TOUCH;

  document.documentElement.classList.toggle(
    'hh-input-mode-touch',
    isTouchMode,
  );
  document.documentElement.classList.toggle(
    'hh-input-mode-pointer',
    normalizedMode === INPUT_MODES.POINTER,
  );
  document.documentElement.classList.toggle(
    'hh-input-mode-touch-narrow',
    isTouchMode && touchLayout === TOUCH_LAYOUTS.NARROW,
  );
  document.documentElement.classList.toggle(
    'hh-input-mode-touch-wide',
    isTouchMode && touchLayout === TOUCH_LAYOUTS.WIDE,
  );

  return { mode: normalizedMode, touchLayout: isTouchMode ? touchLayout : null };
}

export function saveInputMode(mode) {
  const normalizedMode = normalizeInputMode(mode);
  const inputContext = applyInputMode(normalizedMode);

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(INPUT_MODE_STORAGE_KEY, normalizedMode);
    window.dispatchEvent(
      new CustomEvent('heart-home:input-mode-change', {
        detail: inputContext,
      }),
    );
  }

  return normalizedMode;
}

export function watchInputModeViewport() {
  if (typeof window === 'undefined' || isViewportWatcherBound) return;
  isViewportWatcherBound = true;

  const refreshInputContext = () => {
    const inputContext = applyInputMode(readInputMode());
    window.dispatchEvent(
      new CustomEvent('heart-home:input-mode-change', {
        detail: inputContext,
      }),
    );
  };

  window.addEventListener('resize', refreshInputContext, { passive: true });
  window.addEventListener('orientationchange', refreshInputContext, { passive: true });
}
