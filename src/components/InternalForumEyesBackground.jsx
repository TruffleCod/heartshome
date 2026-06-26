import { useEffect, useState } from 'react';
import {
  INTERNAL_FORUM_RED,
  INTERNAL_FORUM_RED_SOFT,
} from '../constants/internalForumTheme';

const CONTENT_WIDTH = 980;
const EYES_PER_SIDE = 234;
const CONTENT_OVERLAP = 220;
const MIN_EYE_SIZE = 51;
const MAX_EYE_SIZE = MIN_EYE_SIZE * 4;

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

function buildEyes(sideSeed, side) {
  const eyes = [];
  let attempts = 0;

  while (eyes.length < EYES_PER_SIDE && attempts < 60000) {
    const seed = sideSeed + attempts * 1.73;
    const x = 3 + seededValue(seed + 2) * 94;
    const edgeFactor = side === 'left' ? x / 100 : 1 - x / 100;
    const edgeBoost = 0.86 + edgeFactor * 1.05;
    const sizeBase = (MIN_EYE_SIZE + seededValue(seed + 3) * 44) * edgeBoost;
    const sizeBoost =
      seededValue(seed + 8) > 0.68
        ? (18 + seededValue(seed + 9) * 42) * (0.72 + edgeFactor * 0.9)
        : 0;
    const size = clamp(sizeBase + sizeBoost, MIN_EYE_SIZE, MAX_EYE_SIZE);
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
      const minHorizontalGap = ((candidate.size + eye.size) / 2) * 0.1;
      const minVerticalGap = ((candidate.size + eye.size) / 2) * 0.065;

      if (horizontalGap < minHorizontalGap && verticalGap < minVerticalGap) {
        return false;
      }

      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = (candidate.size + eye.size) * 0.05;
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

function SketchEye({ eye, zoneLeft, zoneWidth, viewportHeight, viewportWidth, mouse }) {
  const size = eye.size;
  const height = size * 0.54;
  const centerX = zoneLeft + (zoneWidth * eye.x) / 100;
  const centerY = (viewportHeight * eye.top) / 100;
  const dx = mouse.x - centerX;
  const dy = mouse.y - centerY;
  const normalizedX = clamp(dx / Math.max(viewportWidth * 0.18, 1), -1, 1);
  const normalizedY = clamp(dy / Math.max(viewportHeight * 0.18, 1), -1, 1);
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

export default function InternalForumEyesBackground({ active }) {
  const [viewport, setViewport] = useState({
    width: typeof window === 'undefined' ? 0 : window.innerWidth,
    height: typeof window === 'undefined' ? 0 : window.innerHeight,
  });
  const [mouse, setMouse] = useState({
    x: typeof window === 'undefined' ? 0 : window.innerWidth / 2,
    y: typeof window === 'undefined' ? 0 : window.innerHeight / 2,
  });

  useEffect(() => {
    if (!active) return undefined;

    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    const updateMouse = (event) => {
      setMouse({ x: event.clientX, y: event.clientY });
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    window.addEventListener('mousemove', updateMouse);

    return () => {
      window.removeEventListener('resize', updateViewport);
      window.removeEventListener('mousemove', updateMouse);
    };
  }, [active]);

  if (!active || viewport.width === 0) {
    return null;
  }

  const rawSideSpace = (viewport.width - CONTENT_WIDTH) / 2;
  const sideSpace = clamp(rawSideSpace + CONTENT_OVERLAP, 320, 720);
  const leftZoneLeft = 0;
  const rightZoneLeft = viewport.width - sideSpace;
  const zoneOpacity = rawSideSpace < 88 ? 0.42 : 0.82;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
        opacity: zoneOpacity,
        filter: 'saturate(1.08)',
      }}
    >
      {LEFT_EYES.map((eye, index) => (
        <SketchEye
          key={`left-eye-${index}`}
          eye={eye}
          zoneLeft={leftZoneLeft}
          zoneWidth={sideSpace}
          viewportHeight={viewport.height}
          viewportWidth={viewport.width}
          mouse={mouse}
        />
      ))}

      {RIGHT_EYES.map((eye, index) => (
        <SketchEye
          key={`right-eye-${index}`}
          eye={eye}
          zoneLeft={rightZoneLeft}
          zoneWidth={sideSpace}
          viewportHeight={viewport.height}
          viewportWidth={viewport.width}
          mouse={mouse}
        />
      ))}
    </div>
  );
}
