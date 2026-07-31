import { useEffect, useState } from 'react';
import {
  INTERNAL_FORUM_RED,
  INTERNAL_FORUM_RED_SOFT,
} from '../constants/internalForumTheme';
import { INPUT_MODE_STORAGE_KEY, INPUT_MODES } from '../utils/inputMode';

const CONTENT_WIDTH = 980;
const EYES_PER_SIDE = 234;
const TOUCH_EYES_PER_SIDE = 405;
const CONTENT_OVERLAP = 220;
const MIN_EYE_SIZE = 51;
const MAX_EYE_SIZE = MIN_EYE_SIZE * 4;
const TOUCH_MIN_EYE_SIZE = 18;
const TOUCH_MAX_EYE_SIZE = 48;

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function pointInsideDiamond(x, y, halfWidth = 40, halfHeight = 22) {
  return Math.abs((x - 50) / halfWidth) + Math.abs((y - 27) / halfHeight) <= 1;
}

function fitPupilOffsetWithinEye(targetX, targetY) {
  const topPoint = { x: 50, y: 17 };
  const bottomPoint = { x: 50, y: 38 };

  let low = 0;
  let high = 1;

  for (let index = 0; index < 18; index += 1) {
    const mid = (low + high) / 2;
    const testOffsetX = targetX * mid;
    const testOffsetY = targetY * mid;

    const topInside = pointInsideDiamond(
      topPoint.x + testOffsetX,
      topPoint.y + testOffsetY
    );
    const bottomInside = pointInsideDiamond(
      bottomPoint.x + testOffsetX,
      bottomPoint.y + testOffsetY
    );

    if (topInside && bottomInside) {
      low = mid;
    } else {
      high = mid;
    }
  }

  return {
    x: targetX * low,
    y: targetY * low,
  };
}

function seededValue(seed) {
  const raw = Math.sin(seed * 9999.17) * 43758.5453123;
  return raw - Math.floor(raw);
}

function makeStrokeOffsets(seed, count, spread) {
  return Array.from({ length: count }, (_, index) => ({
    dx: (seededValue(seed + index * 0.41) - 0.5) * spread,
    dy: (seededValue(seed + index * 0.59 + 10) - 0.5) * spread,
  }));
}

function buildEyes(sideSeed, side, targetCount = EYES_PER_SIDE, compact = false) {
  const eyes = [];
  let attempts = 0;

  while (eyes.length < targetCount && attempts < (compact ? 280000 : 60000)) {
    const seed = sideSeed + attempts * 1.73;
    const rawX = seededValue(seed + 2);
    const x = compact
      ? side === 'left'
        ? 2 + Math.pow(rawX, 1.65) * 88
        : 98 - Math.pow(rawX, 1.65) * 88
      : 3 + rawX * 94;
    const edgeFactor = side === 'left' ? x / 100 : 1 - x / 100;
    const edgeBoost = compact ? 0.84 + (1 - edgeFactor) * 0.38 : 0.86 + edgeFactor * 1.05;
    const minSize = compact ? TOUCH_MIN_EYE_SIZE : MIN_EYE_SIZE;
    const maxSize = compact ? TOUCH_MAX_EYE_SIZE : MAX_EYE_SIZE;
    const sizeBase = (minSize + seededValue(seed + 3) * (compact ? 28 : 44)) * edgeBoost;
    const sizeBoost =
      seededValue(seed + 8) > (compact ? 0.82 : 0.68)
        ? ((compact ? 8 : 18) + seededValue(seed + 9) * (compact ? 18 : 42)) * (0.72 + edgeFactor * 0.9)
        : 0;
    const size = clamp(sizeBase + sizeBoost, minSize, maxSize);
    const strokeOffsets = makeStrokeOffsets(seed + 30, 3, 7);
    const pupilOffsets = makeStrokeOffsets(seed + 90, 2, 4);
    const candidate = {
      top: 5 + seededValue(seed + 1) * 90,
      x,
      size,
      tilt: -30 + seededValue(seed + 4) * 60,
      strokeWidth: 1.8 + seededValue(seed + 6) * 0.9,
      pupilWidth: 2.1 + seededValue(seed + 7) * 0.9,
      strokeOffsets,
      pupilOffsets,
    };

    const isFarEnough = eyes.every((eye) => {
      const dx = candidate.x - eye.x;
      const dy = candidate.top - eye.top;
      const horizontalGap = Math.abs(dx);
      const verticalGap = Math.abs(dy);
      const minHorizontalGap = ((candidate.size + eye.size) / 2) * (compact ? 0.24 : 0.1);
      const minVerticalGap = ((candidate.size + eye.size) / 2) * (compact ? 0.2 : 0.065);

      if (horizontalGap < minHorizontalGap && verticalGap < minVerticalGap) {
        return false;
      }

      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (candidate.size + eye.size) * (compact ? 0.16 : 0.05);
      return distance > minDistance;
    });

    if (isFarEnough) {
      eyes.push(candidate);
    }

    attempts += 1;
  }

  return eyes;
}

const LEFT_EYES = buildEyes(3.1, 'left');
const RIGHT_EYES = buildEyes(11.4, 'right');
const TOUCH_LEFT_EYES = buildEyes(23.6, 'left', TOUCH_EYES_PER_SIDE, true);
const TOUCH_RIGHT_EYES = buildEyes(37.2, 'right', TOUCH_EYES_PER_SIDE, true);

function SketchEye({ eye, zoneLeft, zoneWidth, viewportHeight, viewportWidth, mouse, gaze }) {
  const size = eye.size;
  const height = size * 0.54;
  const centerX = zoneLeft + (zoneWidth * eye.x) / 100;
  const centerY = (viewportHeight * eye.top) / 100;
  const dx = mouse.x - centerX;
  const dy = mouse.y - centerY;
  const normalizedX = gaze ? gaze.x : clamp(dx / Math.max(viewportWidth * 0.18, 1), -1, 1);
  const normalizedY = gaze ? gaze.y : clamp(dy / Math.max(viewportHeight * 0.18, 1), -1, 1);
  const fittedOffset = fitPupilOffsetWithinEye(
    normalizedX * 24,
    normalizedY * 16
  );
  const pupilOffsetX = fittedOffset.x;
  const pupilOffsetY = fittedOffset.y;

  return (
    <div
      style={{
        position: 'absolute',
        left: centerX,
        top: centerY,
        width: size,
        height,
        transform: `translate(-50%, -50%) rotate(${eye.tilt}deg)`,
        opacity: 1,
        filter: 'drop-shadow(0 0 5px rgba(99, 245, 154, 0.18)) drop-shadow(0 0 12px rgba(47, 217, 118, 0.12))',
      }}
    >
      <svg
        viewBox="0 0 100 54"
        width="100%"
        height="100%"
        aria-hidden="true"
        style={{ overflow: 'visible' }}
      >
        {eye.strokeOffsets.map((offset, index) => (
          <polyline
            key={`outline-a-${index}`}
            points={`6,27 50,5 94,27 50,49 6,27`}
            fill="none"
            stroke={INTERNAL_FORUM_RED}
            strokeWidth={eye.strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
            transform={`translate(${offset.dx} ${offset.dy})`}
          />
        ))}
        {eye.strokeOffsets.map((offset, index) => (
          <polyline
            key={`outline-b-${index}`}
            points={`9,26 50,8 91,26 50,46 9,26`}
            fill="none"
            stroke={INTERNAL_FORUM_RED_SOFT}
            strokeWidth={eye.strokeWidth * 0.92}
            strokeLinecap="round"
            strokeLinejoin="round"
            opacity={0.88}
            transform={`translate(${offset.dx * 0.55} ${offset.dy * 0.55})`}
          />
        ))}
        {eye.pupilOffsets.map((offset, index) => (
          <line
            key={`pupil-${index}`}
            x1={50 + pupilOffsetX + offset.dx}
            y1={17 + pupilOffsetY + offset.dy}
            x2={50 + pupilOffsetX + offset.dx}
            y2={38 + pupilOffsetY + offset.dy}
            stroke={INTERNAL_FORUM_RED}
            strokeWidth={eye.pupilWidth}
            strokeLinecap="round"
            opacity={0.88}
          />
        ))}
      </svg>
    </div>
  );
}

function isTouchModeActive() {
  if (typeof document === 'undefined' || typeof window === 'undefined') return false;
  return (
    document.documentElement.classList.contains('hh-input-mode-touch') ||
    window.localStorage.getItem(INPUT_MODE_STORAGE_KEY) === INPUT_MODES.TOUCH
  );
}

function randomGaze() {
  return {
    x: -0.75 + Math.random() * 1.5,
    y: -0.55 + Math.random() * 1.1,
  };
}

export default function InternalForumEyesBackground({ active }) {
  const [isTouchMode, setIsTouchMode] = useState(isTouchModeActive);
  const [gaze, setGaze] = useState(() => randomGaze());
  const [viewport, setViewport] = useState({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
    documentHeight: typeof document === 'undefined' ? 0 : document.documentElement.scrollHeight,
  });
  const [mouse, setMouse] = useState({
    x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
    y: typeof window === 'undefined' ? 0 : window.innerHeight / 2,
  });
  const [isTouchScrolling, setIsTouchScrolling] = useState(false);

  useEffect(() => {
    if (!active) return undefined;

    const updateViewport = () => {
      const body = document.body;
      const root = document.documentElement;
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
        documentHeight: Math.max(
          window.innerHeight,
          root.scrollHeight,
          body ? body.scrollHeight : 0,
          root.offsetHeight,
          body ? body.offsetHeight : 0,
        ),
      });
      setIsTouchMode(isTouchModeActive());
    };

    const updateMouse = (event) => {
      if (!isTouchModeActive()) {
        setMouse({ x: event.clientX, y: event.clientY });
      }
    };

    let gazeTimer = 0;
    let scrollTimer = 0;
    const scheduleGaze = () => {
      gazeTimer = window.setTimeout(() => {
        if (!isTouchModeActive() || !document.documentElement.classList.contains('hh-inner-forum-touch-scrolling')) {
          setGaze(randomGaze());
        }
        scheduleGaze();
      }, 1000 + Math.random() * 1000);
    };

    const updateTouchScrollState = () => {
      if (!isTouchModeActive()) return;
      document.documentElement.classList.add('hh-inner-forum-touch-scrolling');
      setIsTouchScrolling(true);
      window.clearTimeout(scrollTimer);
      scrollTimer = window.setTimeout(() => {
        updateViewport();
        document.documentElement.classList.remove('hh-inner-forum-touch-scrolling');
        setIsTouchScrolling(false);
      }, 220);
    };

    updateViewport();
    const currentTouchMode = isTouchModeActive();
    setIsTouchMode(currentTouchMode);
    scheduleGaze();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('scroll', updateTouchScrollState, { passive: true });
    window.addEventListener('touchmove', updateTouchScrollState, { passive: true });
    window.addEventListener('heart-home:input-mode-change', updateViewport);
    if (!currentTouchMode) {
      window.addEventListener('mousemove', updateMouse);
    }

    return () => {
      window.clearTimeout(gazeTimer);
      window.clearTimeout(scrollTimer);
      document.documentElement.classList.remove('hh-inner-forum-touch-scrolling');
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('scroll', updateTouchScrollState);
      window.removeEventListener('touchmove', updateTouchScrollState);
      window.removeEventListener('heart-home:input-mode-change', updateViewport);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [active]);

  if (!active || viewport.width === 0) {
    return null;
  }

  const rawSideSpace = (viewport.width - CONTENT_WIDTH) / 2;
  const isCompactTouch = isTouchMode && viewport.width <= 768;
  const isWideTouch = isTouchMode && viewport.width > 768;
  const sideSpace = isCompactTouch
    ? clamp(viewport.width * 0.46, 150, 235)
    : clamp(rawSideSpace + CONTENT_OVERLAP, 320, 720);
  const backgroundHeight = isWideTouch
    ? Math.max(viewport.height, viewport.documentHeight || 0)
    : viewport.height;
  const leftZoneLeft = 0;
  const rightZoneLeft = viewport.width - sideSpace;
  const zoneOpacity = isCompactTouch ? 0.76 : rawSideSpace < 88 ? 0.42 : 0.82;
  const leftEyes = isCompactTouch ? TOUCH_LEFT_EYES : LEFT_EYES;
  const rightEyes = isCompactTouch ? TOUCH_RIGHT_EYES : RIGHT_EYES;

  return (
    <div
      aria-hidden="true"
      style={{
        position: isWideTouch ? 'absolute' : 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: isWideTouch ? 'auto' : 0,
        height: isWideTouch ? backgroundHeight : 'auto',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: isWideTouch ? 0.42 : isTouchMode && isTouchScrolling ? Math.min(zoneOpacity, 0.18) : zoneOpacity,
        filter: isTouchMode && isTouchScrolling ? 'saturate(0.9)' : 'saturate(1.08)',
        transition: isTouchMode ? 'opacity 160ms ease' : 'none',
        contain: isWideTouch ? 'layout paint style' : 'none',
      }}
    >
      {leftEyes.map((eye, index) => (
        <SketchEye
          key={`left-eye-${index}`}
          eye={eye}
          zoneLeft={leftZoneLeft}
          zoneWidth={sideSpace}
          viewportHeight={backgroundHeight}
          viewportWidth={viewport.width}
          mouse={mouse}
          gaze={isTouchMode ? gaze : null}
        />
      ))}

      {rightEyes.map((eye, index) => (
        <SketchEye
          key={`right-eye-${index}`}
          eye={eye}
          zoneLeft={rightZoneLeft}
          zoneWidth={sideSpace}
          viewportHeight={backgroundHeight}
          viewportWidth={viewport.width}
          mouse={mouse}
          gaze={isTouchMode ? gaze : null}
        />
      ))}
    </div>
  );
}
