import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '../utils/publicPath';
import { preloadImages } from '../utils/preloadAssets';

const CHOICE_QUESTIONS = [
  {
    id: 'q1',
    title: '在那一天之前，你最常听到什么？',
    options: [
      '“我很碍眼”',
      '“我太爱吸引注意”',
      '“我总是装作受害者的样子”',
      '“我说什么都会变成笑话”',
    ],
  },
  {
    id: 'q2',
    title: '那一天以后，你最常冒出来的想法是什么？',
    options: [
      '为什么只有我感到痛苦',
      '为什么只有我要一遍遍解释自己',
      '为什么只要求我保持冷静',
      '为什么我要遭受这一切',
    ],
  },
  {
    id: 'q3',
    title: '在那一天，你感到最恐惧的身体记忆是什么？',
    options: [
      '我的手腕被人攥到发青',
      '冰冷的刀刃贴在我的脸颊上',
      '很多人在钻进我的耳朵大笑',
      '破碎的镜子里，我的头发一截一截地被剪短',
    ],
  },
  {
    id: 'q4',
    title: '那一天，造成你的痛苦的人是谁？',
    options: [
      '那些伤害我，又说只是开玩笑的人',
      '那些明明看见了，却假装什么都没发生的人',
      '那些笑着把我当成笑话传来传去的人',
      '那些说我只是敏感、想太多、要我懂事的人',
    ],
  },
];

const NAME_ANSWERS = new Set(['赵兰子']);
const FLASH_IMAGES = [
  '/images/followup/flash-1.jpg',
  '/images/followup/flash-2.jpg',
  '/images/followup/flash-3.jpg',
  '/images/followup/flash-4.jpg',
];
const FOLLOWUP_CURSOR = `url('${publicPath('images/followup/cursor-knife.svg')}') 8 6, auto`;
const COMPLETE_TEXT = '恭喜您已登陆，当前登陆身份为花匠338。\n系统已记录下你的选择。\n\n请选择下一步。';
const COMPLETE_HIGHLIGHT = '花匠338';
const FINAL_NAME_SCRIBBLE_CONFIG = {
  deleteLineDurationMs: 600,
  durationMs: 7500,
  strokeCount: 670,
  laughCount: 1780,
  strokesPerFrame: 15,
  lineWidth: 2.4,
  lengthFactor: 1,
  curvature: 1.1,
  inkColor: '#ff1a1a',
};

function normalize(value) {
  return value.trim().replace(/\s+/g, '');
}

function formatBirthdayInput(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6)}`;
}

function isValidBirthdayInput(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 8);
  if (digits.length !== 8) return false;

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

function ScribbleStrikeDebugPanel() {
  const suspenseLeadInMs = 1000;
  const [inputValue, setInputValue] = useState('');
  const [displayValue, setDisplayValue] = useState('赵兰子');
  const [scribbleScope, setScribbleScope] = useState('page');
  const [deleteLineDurationMs, setDeleteLineDurationMs] = useState(1000);
  const [durationMs, setDurationMs] = useState(2000);
  const [strokeCount, setStrokeCount] = useState(240);
  const [strokesPerFrame, setStrokesPerFrame] = useState(10);
  const [lineWidth, setLineWidth] = useState(2.4);
  const [lengthFactor, setLengthFactor] = useState(1);
  const [curvature, setCurvature] = useState(0.15);
  const [inkColor, setInkColor] = useState('#ff1a1a');
  const [laughCount, setLaughCount] = useState(180);
  const [isAnimating, setIsAnimating] = useState(false);
  const [hint, setHint] = useState('输入“赵兰子”并提交，调试凌乱划掉效果。');

  const boxRef = useRef(null);
  const textRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(0);
  const drawnRef = useRef(0);
  const laughDrawnRef = useRef(0);
  const segmentProgressRef = useRef(0);
  const activeSegmentRef = useRef(null);
  const deleteSegmentRef = useRef(null);
  const laughCarryRef = useRef(0);
  const pathPointRef = useRef(null);
  const directionRef = useRef(0);

  const clearCanvas = () => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
    setIsAnimating(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    laughDrawnRef.current = 0;
    segmentProgressRef.current = 0;
    activeSegmentRef.current = null;
    deleteSegmentRef.current = null;
    laughCarryRef.current = 0;
  };

  const resizeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    const width = window.innerWidth;
    const height = window.innerHeight;
    if (!width || !height) return;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  };

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
  const lerp = (a, b, t) => a + (b - a) * t;
  const easeInExplosive = (progress) => {
    const clamped = clamp(progress, 0, 1);
    return Math.pow(clamped, 4.8);
  };

  const getSuspenseBuildProgress = (elapsed, totalDuration) => {
    if (totalDuration <= 0) return 1;
    if (elapsed <= 0) return 0;
    if (elapsed < suspenseLeadInMs) {
      // During the first second, barely anything changes to build pressure.
      return (elapsed / suspenseLeadInMs) * 0.008;
    }
    const remainingDuration = Math.max(1, totalDuration - suspenseLeadInMs);
    const acceleratedProgress = clamp((elapsed - suspenseLeadInMs) / remainingDuration, 0, 1);
    return 0.008 + (1 - 0.008) * easeInExplosive(acceleratedProgress);
  };

  const buildNextContinuousSegment = (bounds) => {
    const left = bounds.x;
    const right = bounds.x + bounds.width;
    const top = bounds.y;
    const bottom = bounds.y + bounds.height;
    if (!pathPointRef.current) {
      pathPointRef.current = {
        x: left + Math.random() * (right - left),
        y: top + Math.random() * (bottom - top),
      };
      directionRef.current = Math.random() * Math.PI * 2;
    }

    const baseX = pathPointRef.current.x;
    const baseY = pathPointRef.current.y;
    if (Math.random() < 0.2) {
      directionRef.current += (Math.random() - 0.5) * Math.PI * 1.4;
    } else {
      directionRef.current += (Math.random() - 0.5) * (0.25 + curvature * 1.2);
    }
    const angle = directionRef.current;
    const maxSpan = Math.max(bounds.width, bounds.height);
    const longSlash = Math.random() < 0.3;
    const step =
      maxSpan *
      (longSlash ? 0.42 + Math.random() * 0.5 : 0.12 + Math.random() * 0.22) *
      lengthFactor;
    let endX = baseX + Math.cos(angle) * step;
    let endY = baseY + Math.sin(angle) * step;

    if (endX < left || endX > right) {
      directionRef.current = Math.PI - directionRef.current;
      endX = clamp(endX, left, right);
    }
    if (endY < top || endY > bottom) {
      directionRef.current = -directionRef.current;
      endY = clamp(endY, top, bottom);
    }

    if (Math.random() < 0.12) {
      pathPointRef.current = {
        x: left + Math.random() * (right - left),
        y: top + Math.random() * (bottom - top),
      };
    }

    const useCurve = Math.random() < Math.max(0.08, curvature * 0.35);
    const normalAngle = angle + Math.PI / 2;
    const curveSpan = step * curvature * (0.2 + Math.random() * 0.5);
    const cpX = clamp((baseX + endX) * 0.5 + Math.cos(normalAngle) * curveSpan, left, right);
    const cpY = clamp((baseY + endY) * 0.5 + Math.sin(normalAngle) * curveSpan, top, bottom);
    const baseWidth = lineWidth * (0.9 + Math.random() * 0.55);

    pathPointRef.current = { x: endX, y: endY };
    return {
      baseX,
      baseY,
      endX,
      endY,
      useCurve,
      cpX,
      cpY,
      baseWidth,
    };
  };

  const drawHandSegment = (ctx, segment, fraction) => {
    const t = clamp(fraction, 0, 1);
    if (!segment || t <= 0) return;
    const passCount = segment.passCount || 3;

    for (let pass = 0; pass < passCount; pass += 1) {
      const jitterX = (Math.random() - 0.5) * (1.4 + lineWidth * 0.22);
      const jitterY = (Math.random() - 0.5) * (1.4 + lineWidth * 0.22);
      ctx.globalAlpha = 0.24 + Math.random() * 0.18;
      ctx.strokeStyle = inkColor;
      ctx.lineWidth = segment.baseWidth * (0.78 + Math.random() * 0.28);
      ctx.beginPath();
      ctx.moveTo(segment.baseX + jitterX, segment.baseY + jitterY);
      if (segment.useCurve) {
        const q0x = lerp(segment.baseX, segment.cpX, t);
        const q0y = lerp(segment.baseY, segment.cpY, t);
        const q1x = lerp(segment.cpX, segment.endX, t);
        const q1y = lerp(segment.cpY, segment.endY, t);
        const r0x = lerp(q0x, q1x, t);
        const r0y = lerp(q0y, q1y, t);
        ctx.quadraticCurveTo(q0x + jitterX, q0y + jitterY, r0x + jitterX, r0y + jitterY);
      } else {
        ctx.lineTo(lerp(segment.baseX, segment.endX, t) + jitterX, lerp(segment.baseY, segment.endY, t) + jitterY);
      }
      ctx.stroke();
    }
  };

  const drawLaughOverlay = (ctx, bounds, count) => {
    const left = bounds.x;
    const top = bounds.y;
    const width = bounds.width;
    const height = bounds.height;
    const totalCount = Math.max(1, count);
    const phrases = ['HA', 'HAHA', 'HAHAHA', 'HAHAHAHA', 'HAHAHAHAHA'];

    ctx.save();
    ctx.beginPath();
    ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
    ctx.clip();

    for (let i = 0; i < totalCount; i += 1) {
      const phrase = phrases[Math.floor(Math.random() * phrases.length)];
      const x = left + Math.random() * width;
      const y = top + Math.random() * height;
      const fontSize = Math.round((height > 180 ? 18 : 14) + Math.random() * (height > 180 ? 62 : 32));
      const rotation = (Math.random() - 0.5) * 0.8;
      const scaleX = 0.82 + Math.random() * 0.42;
      const scaleY = 0.84 + Math.random() * 0.38;
      const skewX = (Math.random() - 0.5) * 0.42;
      const skewY = (Math.random() - 0.5) * 0.18;

      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rotation);
      ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);
      ctx.font = `700 ${fontSize}px "HanziPen SC", "FZShuTi", "STXinwei", "STXingkai", "Xingkai SC", cursive`;
      ctx.textBaseline = 'middle';
      ctx.fillStyle = inkColor;
      ctx.globalAlpha = 0.18 + Math.random() * 0.22;

      // Extra offset and deformation make the text feel less typeset and more scrawled by hand.
      for (let pass = 0; pass < 4; pass += 1) {
        const offsetX = (Math.random() - 0.5) * 6;
        const offsetY = (Math.random() - 0.5) * 6;
        ctx.fillText(phrase, offsetX, offsetY);
      }
      ctx.restore();
    }

    ctx.restore();
  };

  const startScribble = () => {
    if (animationRef.current) {
      window.cancelAnimationFrame(animationRef.current);
      animationRef.current = 0;
    }
    resizeCanvas();
    clearCanvas();

    const canvas = canvasRef.current;
    const boxEl = boxRef.current;
    const textEl = textRef.current;
    if (!canvas || !textEl || !boxEl) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const canvasRect = canvas.getBoundingClientRect();
    const inputRectDom = boxEl.getBoundingClientRect();
    const textRect = textEl.getBoundingClientRect();
    const textBounds = {
      x: textRect.left - canvasRect.left,
      y: textRect.top - canvasRect.top,
      width: textRect.width,
      height: textRect.height,
    };
    const getTextClipBounds = () => {
      const padX = textBounds.width * 0.34;
      const padY = textBounds.height * 0.48;
      const clipX = Math.max(0, textBounds.x - padX);
      const clipY = Math.max(0, textBounds.y - padY);
      return {
        x: clipX,
        y: clipY,
        width: Math.max(0, Math.min(canvas.clientWidth - clipX, textBounds.width + padX * 2)),
        height: Math.max(0, Math.min(canvas.clientHeight - clipY, textBounds.height + padY * 2)),
      };
    };

    const fullClipBounds = {
      x: 0,
      y: 0,
      width: canvas.clientWidth,
      height: canvas.clientHeight,
    };
    const rawTextClipBounds = getTextClipBounds();
    const intersectRect = (a, b) => {
      const x = Math.max(a.x, b.x);
      const y = Math.max(a.y, b.y);
      const right = Math.min(a.x + a.width, b.x + b.width);
      const bottom = Math.min(a.y + a.height, b.y + b.height);
      return {
        x,
        y,
        width: Math.max(0, right - x),
        height: Math.max(0, bottom - y),
      };
    };
    const inputRect = {
      x: inputRectDom.left - canvasRect.left,
      y: inputRectDom.top - canvasRect.top,
      width: inputRectDom.width,
      height: inputRectDom.height,
    };
    const textClipRaw = intersectRect(rawTextClipBounds, inputRect);
    const clipInset = Math.ceil(lineWidth * 1.2);
    const textClipBounds = {
      x: textClipRaw.x + clipInset,
      y: textClipRaw.y + clipInset,
      width: Math.max(0, textClipRaw.width - clipInset * 2),
      height: Math.max(0, textClipRaw.height - clipInset * 2),
    };
    const inputClipBounds = {
      x: inputRect.x + clipInset,
      y: inputRect.y + clipInset,
      width: Math.max(0, inputRect.width - clipInset * 2),
      height: Math.max(0, inputRect.height - clipInset * 2),
    };
    const scribbleBounds =
      scribbleScope === 'text'
        ? textClipBounds
        : scribbleScope === 'input'
          ? inputClipBounds
          : fullClipBounds;

    drawnRef.current = 0;
    laughDrawnRef.current = 0;
    setIsAnimating(true);
    const startedAt = performance.now();
    pathPointRef.current = null;
    const lineY = textBounds.y + textBounds.height * 0.55;
    const lineStartX = textBounds.x;
    const lineEndX = textBounds.x + textBounds.width;
    deleteSegmentRef.current = {
      baseX: lineStartX,
      baseY: lineY,
      endX: lineEndX,
      endY: lineY,
      useCurve: false,
      cpX: lineStartX,
      cpY: lineY,
      baseWidth: lineWidth * 1.28,
      passCount: 4,
    };
    let chaosStarted = false;

    const tick = (now) => {
      const elapsed = now - startedAt;
      const lineProgress = Math.min(1, elapsed / deleteLineDurationMs);
      const chaosElapsed = Math.max(0, elapsed - deleteLineDurationMs);
      const chaosProgress = Math.min(1, chaosElapsed / durationMs);
      const scribbleBuildProgress = getSuspenseBuildProgress(
        Math.min(durationMs, chaosElapsed * 2),
        durationMs,
      );
      const laughBuildProgress = getSuspenseBuildProgress(chaosElapsed, durationMs);
      const target = Math.floor(strokeCount * scribbleBuildProgress);
      const laughTarget = laughCount * laughBuildProgress;
      let frameBudget = strokesPerFrame;

      if (lineProgress < 1) {
        ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
        ctx.save();
        ctx.beginPath();
        ctx.rect(textClipBounds.x, textClipBounds.y, textClipBounds.width, textClipBounds.height);
        ctx.clip();
        drawHandSegment(ctx, deleteSegmentRef.current, lineProgress);
        ctx.restore();
        animationRef.current = window.requestAnimationFrame(tick);
        return;
      }

      if (!chaosStarted) {
        chaosStarted = true;
        pathPointRef.current = { x: lineEndX, y: lineY };
        directionRef.current = -Math.PI / 6;
        setHint('删除线已划完，线条与 HAHA 正在同步失控...');
      }

      while (drawnRef.current < target && frameBudget > 0) {
        ctx.save();
        ctx.beginPath();
        ctx.rect(scribbleBounds.x, scribbleBounds.y, scribbleBounds.width, scribbleBounds.height);
        ctx.clip();
        if (!activeSegmentRef.current) {
          activeSegmentRef.current = buildNextContinuousSegment(scribbleBounds);
          segmentProgressRef.current = 0;
        }
        segmentProgressRef.current = Math.min(
          1,
          segmentProgressRef.current + Math.max(0.04, scribbleBuildProgress * 0.85),
        );
        drawHandSegment(ctx, activeSegmentRef.current, segmentProgressRef.current);
        if (segmentProgressRef.current >= 1) {
          activeSegmentRef.current = null;
          segmentProgressRef.current = 0;
          drawnRef.current += 1;
          frameBudget -= 1;
        } else {
          frameBudget = 0;
        }
        ctx.restore();
      }
      laughCarryRef.current += Math.max(0, laughTarget - laughDrawnRef.current);
      const nextLaughCount = Math.floor(laughCarryRef.current);
      if (nextLaughCount > 0) {
        drawLaughOverlay(ctx, fullClipBounds, nextLaughCount);
        laughCarryRef.current -= nextLaughCount;
        laughDrawnRef.current += nextLaughCount;
      }
      if (chaosProgress < 1) {
        animationRef.current = window.requestAnimationFrame(tick);
      } else {
        setHint('动画结束，可继续调参后测试。');
        setIsAnimating(false);
        animationRef.current = 0;
      }
    };
    animationRef.current = window.requestAnimationFrame(tick);
  };

  useEffect(() => {
    resizeCanvas();
    const onResize = () => resizeCanvas();
    window.addEventListener('resize', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      if (animationRef.current) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    const normalized = inputValue.trim().replace(/\s+/g, '');
    if (normalized !== '赵兰子') {
      setDisplayValue(normalized || '（空）');
      setHint('必须输入“赵兰子”才触发。');
      clearCanvas();
      return;
    }
    setDisplayValue(normalized);
    setHint('触发成功：删除线缓慢生成中...');
    startScribble();
  };

  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        background:
          'radial-gradient(circle at 16% 12%, rgba(108, 130, 119, 0.14), transparent 42%), radial-gradient(circle at 88% 78%, rgba(82, 97, 89, 0.12), transparent 40%), linear-gradient(140deg, #141816 0%, #1a201d 55%, #171c1a 100%)',
        color: '#d7ded8',
        padding: 24,
        boxSizing: 'border-box',
      }}
    >
      <section style={{ width: 'min(980px, 96vw)', border: '1px solid #3d4a43', borderRadius: 14, background: 'rgba(199, 206, 201, 0.06)', padding: 24 }}>
        <h2 style={{ margin: '0 0 10px', fontSize: 30, fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif' }}>凌乱划掉效果调试（AssessmentFollowUp）</h2>
        <p style={{ margin: '0 0 16px', color: '#b8c5be' }}>{hint}</p>

        <form onSubmit={onSubmit} style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 16 }}>
          <input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="输入赵兰子"
            style={{ height: 44, width: 260, borderRadius: 8, border: '1px solid #56665d', padding: '0 12px', fontSize: 18 }}
          />
          <button type="submit" style={{ height: 44, minWidth: 88, borderRadius: 8, border: '1px solid #5b6f65', background: '#2d3b34', color: '#dbe4dd', fontWeight: 700 }}>提交</button>
          <button type="button" onClick={() => { setInputValue('赵兰子'); setDisplayValue('赵兰子'); setHint('已填入赵兰子。'); }} style={{ height: 44, minWidth: 104, borderRadius: 8, border: '1px solid #5b6f65', background: '#1f2723', color: '#dbe4dd', fontWeight: 700 }}>一键填入</button>
          <button type="button" onClick={() => { clearCanvas(); setDisplayValue(inputValue.trim().replace(/\s+/g, '') || '赵兰子'); setHint('画布已清空。'); }} style={{ height: 44, minWidth: 88, borderRadius: 8, border: '1px solid #5b6f65', background: '#1f2723', color: '#dbe4dd', fontWeight: 700 }}>清空</button>
        </form>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(220px, 1fr))', gap: 12, marginBottom: 16 }}>
          <label style={{ display: 'grid', gap: 6 }}>
            线条出现范围
            <select value={scribbleScope} onChange={(e) => setScribbleScope(e.target.value)} style={{ height: 40, borderRadius: 8, border: '1px solid #56665d', background: '#1f2723', color: '#dbe4dd', padding: '0 10px' }}>
              <option value="text">仅文字区域</option>
              <option value="input">覆盖整个输入框</option>
              <option value="page">覆盖整个页面</option>
            </select>
          </label>
          <div />
          <label style={{ display: 'grid', gap: 6 }}>删除线时长（ms）：{deleteLineDurationMs}<input type="range" min={300} max={10000} step={50} value={deleteLineDurationMs} onChange={(e) => setDeleteLineDurationMs(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>全页涂画时长（ms）：{durationMs}<input type="range" min={300} max={10000} step={50} value={durationMs} onChange={(e) => setDurationMs(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>路径段数：{strokeCount}<input type="range" min={40} max={900} step={10} value={strokeCount} onChange={(e) => setStrokeCount(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>HAHA 总量：{laughCount}<input type="range" min={20} max={2400} step={20} value={laughCount} onChange={(e) => setLaughCount(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>每帧新增路径段：{strokesPerFrame}<input type="range" min={1} max={20} step={1} value={strokesPerFrame} onChange={(e) => setStrokesPerFrame(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>线条粗细：{lineWidth.toFixed(1)}<input type="range" min={0.8} max={4.5} step={0.1} value={lineWidth} onChange={(e) => setLineWidth(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>线条长度：{lengthFactor.toFixed(2)}x<input type="range" min={0.4} max={2.2} step={0.05} value={lengthFactor} onChange={(e) => setLengthFactor(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>线条曲度：{curvature.toFixed(2)}<input type="range" min={0} max={1.4} step={0.05} value={curvature} onChange={(e) => setCurvature(Number(e.target.value))} /></label>
          <label style={{ display: 'grid', gap: 6 }}>颜色：<input type="color" value={inkColor} onChange={(e) => setInkColor(e.target.value)} /></label>
        </div>

        <div ref={boxRef} style={{ position: 'relative', height: 124, border: '1px solid #506259', borderRadius: 12, background: '#d4d9d5', overflow: 'hidden', display: 'grid', alignItems: 'center', padding: '0 16px' }}>
          <span ref={textRef} style={{ position: 'relative', zIndex: 2, width: 'fit-content', fontSize: 46, fontWeight: 800, color: '#1b1f26', letterSpacing: '0.06em', fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif' }}>
            {displayValue}
          </span>
          <canvas
            ref={canvasRef}
            style={{ position: 'fixed', inset: 0, zIndex: 9999, pointerEvents: 'none' }}
          />
        </div>
        <p style={{ margin: '10px 0 0', color: '#b8c5be', fontSize: 13 }}>{isAnimating ? '动画进行中...' : '动画结束，可继续调参后测试。'}</p>
      </section>
    </main>
  );
}

export default function AssessmentFollowUp() {
  const navigate = useNavigate();
  const isScribbleDebugMode = useMemo(() => {
    const search = typeof window !== 'undefined' ? window.location.search : '';
    return new URLSearchParams(search).get('debugScribble') === '1';
  }, []);
  const [birthdayDigits, setBirthdayDigits] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [answers, setAnswers] = useState({});
  const [noticeText, setNoticeText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const [isExitRewritten, setIsExitRewritten] = useState(false);

  const [isBooting, setIsBooting] = useState(true);
  const [glitchLevel, setGlitchLevel] = useState(0);
  const [glitchTick, setGlitchTick] = useState(0);
  const [showErrorStorm, setShowErrorStorm] = useState(false);
  const [showBlueScreen, setShowBlueScreen] = useState(false);
  const [currentFlashImageIndex, setCurrentFlashImageIndex] = useState(-1);
  const [blueScreenPercent, setBlueScreenPercent] = useState(0);
  const [errorWindows, setErrorWindows] = useState([]);
  const [pausedLineIndex, setPausedLineIndex] = useState(-1);
  const [loadingDotCount, setLoadingDotCount] = useState(1);
  const [typedTitle, setTypedTitle] = useState('');
  const [typedLines, setTypedLines] = useState([]);
  const [hoveredOptionIndex, setHoveredOptionIndex] = useState(-1);
  const [strikethroughTarget, setStrikethroughTarget] = useState(null);
  const [isNameStrikeAnimating, setIsNameStrikeAnimating] = useState(false);
  const [showFinalScribbleCanvas, setShowFinalScribbleCanvas] = useState(false);
  const [typedCompleteLength, setTypedCompleteLength] = useState(0);
  const noiseCanvasRef = useRef(null);
  const finalScribbleCanvasRef = useRef(null);
  const finalNameInputRef = useRef(null);
  const optionAdvanceTimerRef = useRef(null);
  const nameStrikeTimerRef = useRef(null);

  const answeredCount = Object.keys(answers).length;
  const currentQuestion = CHOICE_QUESTIONS[answeredCount];
  const showFinalNameInput = dateConfirmed && answeredCount === CHOICE_QUESTIONS.length;
  const shouldShowNoise =
    !isBooting || showBlueScreen || currentFlashImageIndex >= 0;
  const questionTitleStyle = {
    margin: 0,
    color: '#d0d8d2',
    fontWeight: 500,
    fontSize: 'clamp(30px,2.4vw,42px)',
    lineHeight: 1.2,
    whiteSpace: 'nowrap',
  };

  const glitchTexts = useMemo(
    () => [
      '系统校验中：正在匹配静息评估结果...',
      '系统校验中：正在确认风险标签与访谈记录...',
      '系统提醒：检测到异常情绪波动，准备追加测试...',
      '系统提醒：请保持屏幕常亮，过程约需数秒...',
      '系统校验中：正在连接封存记录索引...',
      '系统校验中：正在读取...读取...读取...',
      '系统提示：字段校验失败，尝试修复...',
      '锟斤拷统提示：鍏抽敭璁板綍涓嶅彲璇诲彇',
      '系缁熸牎楠屼腑锛氭暟鎹啓鍏ヤ腑...',
      '系统记录：��ϲ���ѵ�½����ǰ��½�',
      '绯荤粺鎻愮ず锛氭。妗堢儲寮曞彂鐢熷亸绉?',
      '系统校验中：鏍煎紡鍖栧け璐ワ紝閲嶈瘯...',
      '锟斤拷锟斤拷锟斤拷：鍐呮牳鍥炲簲寮傚父',
      '系统提示：修复成功。追加测试已就绪。',
    ],
    [],
  );

  useEffect(() => {
    preloadImages(FLASH_IMAGES);
  }, []);

  useEffect(() => {
    const tickTimer = window.setInterval(() => {
      setGlitchTick((tick) => tick + 1);
    }, 90);

    return () => {
      window.clearInterval(tickTimer);
    };
  }, []);

  useEffect(() => {
    if (pausedLineIndex < 0) return undefined;
    const dotTimer = window.setInterval(() => {
      setLoadingDotCount((count) => (count >= 3 ? 1 : count + 1));
    }, 260);
    return () => window.clearInterval(dotTimer);
  }, [pausedLineIndex]);

  useEffect(() => {
    if (!showErrorStorm) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset storm windows immediately when leaving this staged effect.
      setErrorWindows([]);
      return;
    }

    const makeWindow = (index) => ({
      id: `${Date.now()}-${index}`,
      top: Math.floor(Math.random() * 84),
      left: Math.floor(Math.random() * 84),
      width: 220 + Math.floor(Math.random() * 190),
      message:
        index % 3 === 0
          ? 'System memory access failed.'
          : index % 3 === 1
            ? 'Unexpected null pointer.'
            : 'Archive index corrupted.',
    });

    const intervalId = window.setInterval(() => {
      const next = Array.from({ length: 36 }, (_, index) => makeWindow(index));
      setErrorWindows(next);
    }, 85);

    return () => window.clearInterval(intervalId);
  }, [showErrorStorm]);

  useEffect(() => {
    if (!showBlueScreen) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Reset the staged progress bar before the next blue-screen run.
      setBlueScreenPercent(0);
      return undefined;
    }

    setBlueScreenPercent(0);
    const startAt = Date.now();
    const progressTimer = window.setInterval(() => {
      const elapsed = Date.now() - startAt;
      const nextPercent = Math.min(100, Math.floor((elapsed / 4000) * 100));
      setBlueScreenPercent(nextPercent);
    }, 80);

    return () => window.clearInterval(progressTimer);
  }, [showBlueScreen]);

  useEffect(() => {
    if (!shouldShowNoise) return undefined;

    const canvas = noiseCanvasRef.current;
    if (!canvas) return undefined;

    const patternRefreshInterval = 2;
    const patternAlpha = 10;
    const patternSize = 250;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return undefined;

    let animationId = 0;
    let frame = 0;
    const noiseData = ctx.createImageData(patternSize, patternSize);
    const noise32 = new Uint32Array(noiseData.data.buffer);

    const resize = () => {
      canvas.width = patternSize;
      canvas.height = patternSize;
      canvas.style.width = '100vw';
      canvas.style.height = '100vh';
      ctx.imageSmoothingEnabled = false;
    };

    const drawGrain = () => {
      const alpha = patternAlpha << 24;
      for (let i = 0; i < noise32.length; i += 1) {
        const value = (Math.random() * 255) | 0;
        noise32[i] = alpha | (value << 16) | (value << 8) | value;
      }
    };

    const loop = () => {
      if (frame % Math.max(1, Math.round(patternRefreshInterval)) === 0) {
        drawGrain();
        ctx.putImageData(noiseData, 0, 0);
      }
      frame += 1;
      animationId = window.requestAnimationFrame(loop);
    };

    resize();
    drawGrain();
    ctx.putImageData(noiseData, 0, 0);
    loop();

    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      window.cancelAnimationFrame(animationId);
    };
  }, [shouldShowNoise]);

  useEffect(() => {
    if (isBooting) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const prevHtmlCursor = html.style.cursor;
    const prevBodyCursor = body.style.cursor;

    html.style.cursor = FOLLOWUP_CURSOR;
    body.style.cursor = FOLLOWUP_CURSOR;

    return () => {
      html.style.cursor = prevHtmlCursor;
      body.style.cursor = prevBodyCursor;
    };
  }, [isBooting]);
  useEffect(() => {
    const titleText = '系统正在复核你的评估结果';
    const fullLines = glitchTexts;
    const titleCharsPerTick = 1;
    const lineCharsPerTick = 1;
    const fastLineCharsPerTick = 4;
    const typeIntervalMs = 38;

    let titleIndex = 0;
    let lineIndex = 0;
    let charIndex = 0;
    let currentTitle = '';
    let currentLines = [];
    let pausedUntil = 0;
    const phaseTimers = [];

    const timer = window.setInterval(() => {
      if (!isBooting) {
        window.clearInterval(timer);
        return;
      }

      const now = Date.now();
      if (pausedUntil && now < pausedUntil) {
        return;
      }
      if (pausedUntil && now >= pausedUntil) {
        pausedUntil = 0;
        setPausedLineIndex(-1);
      }

      if (titleIndex < titleText.length) {
        titleIndex = Math.min(titleText.length, titleIndex + titleCharsPerTick);
        currentTitle = titleText.slice(0, titleIndex);
        setTypedTitle(currentTitle);
        return;
      }

      if (lineIndex >= fullLines.length) {
        return;
      }

      const targetLine = fullLines[lineIndex];
      const charsPerTick = lineIndex >= 4 ? fastLineCharsPerTick : lineCharsPerTick;
      const nextCharIndex = Math.min(targetLine.length, charIndex + charsPerTick);
      const partial = targetLine.slice(0, nextCharIndex);
      const nextLines = [...currentLines];
      nextLines[lineIndex] = partial;
      currentLines = nextLines;
      setTypedLines(nextLines);
      charIndex = nextCharIndex;

      if (charIndex >= targetLine.length) {
        if (lineIndex === 0) {
          pausedUntil = Date.now() + 2000;
          setPausedLineIndex(0);
        } else if (lineIndex === 3) {
          pausedUntil = Date.now() + 2000;
          setPausedLineIndex(3);
          phaseTimers.push(window.setTimeout(() => setGlitchLevel(1), 2000));
          phaseTimers.push(window.setTimeout(() => setGlitchLevel(2), 4000));
          phaseTimers.push(window.setTimeout(() => setGlitchLevel(3), 4000));
          phaseTimers.push(window.setTimeout(() => setShowErrorStorm(true), 4000));
          phaseTimers.push(window.setTimeout(() => setShowErrorStorm(false), 7000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(0), 7000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(-1), 9000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(true), 9000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(false), 10000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(1), 10000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(-1), 12000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(true), 12000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(false), 13000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(2), 13000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(-1), 15000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(true), 15000));
          phaseTimers.push(window.setTimeout(() => setShowBlueScreen(false), 19000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(3), 19000));
          phaseTimers.push(window.setTimeout(() => setCurrentFlashImageIndex(-1), 21000));
          phaseTimers.push(window.setTimeout(() => setIsBooting(false), 21000));
        } else {
          pausedUntil = 0;
        }
        lineIndex += 1;
        charIndex = 0;
      }
    }, typeIntervalMs);

    return () => {
      window.clearInterval(timer);
      phaseTimers.forEach((phaseTimer) => window.clearTimeout(phaseTimer));
    };
  }, [glitchTexts, isBooting]);

  useEffect(() => () => {
    if (optionAdvanceTimerRef.current) {
      window.clearTimeout(optionAdvanceTimerRef.current);
    }
    if (nameStrikeTimerRef.current) {
      window.clearTimeout(nameStrikeTimerRef.current);
    }
  }, []);

  useEffect(() => {
    if (!isComplete) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- Restart the completion typewriter whenever the ending is hidden.
      setTypedCompleteLength(0);
      return undefined;
    }

    let current = 0;
    const timer = window.setInterval(() => {
      current += 1;
      setTypedCompleteLength(current);
      if (current >= COMPLETE_TEXT.length) {
        window.clearInterval(timer);
      }
    }, 200);

    return () => window.clearInterval(timer);
  }, [isComplete]);

  const jitterPower = 4.2;
  const jitterX = showErrorStorm ? Math.sin(glitchTick * 0.9) * jitterPower : 0;
  const jitterY = showErrorStorm ? Math.cos(glitchTick * 1.1) * (jitterPower * 0.72) : 0;

  const handleDateSubmit = (event) => {
    event.preventDefault();
    if (!isValidBirthdayInput(birthdayDigits)) {
      setNoticeText('输入错误，自动返回上一页');
      window.setTimeout(() => {
        navigate('/p/c70a5e1d92');
      }, 900);
      return;
    }

    const normalizedDigits = String(birthdayDigits).replace(/\D/g, '').slice(0, 8);
    if (normalizedDigits !== '20260513') {
      setNoticeText('输入错误，自动返回上一页');
      window.setTimeout(() => {
        navigate('/p/c70a5e1d92');
      }, 900);
      return;
    }
    setNoticeText('');
    setDateConfirmed(true);
  };

  const handleOptionSelect = (questionId, optionIndex) => {
    if (strikethroughTarget) return;

    setHoveredOptionIndex(-1);
    setStrikethroughTarget({ questionId, optionIndex });

    if (optionAdvanceTimerRef.current) {
      window.clearTimeout(optionAdvanceTimerRef.current);
    }

    optionAdvanceTimerRef.current = window.setTimeout(() => {
      setAnswers((current) => ({
        ...current,
        [questionId]: optionIndex,
      }));
      setStrikethroughTarget(null);
      optionAdvanceTimerRef.current = null;
    }, 500);
  };

  const handleNameSubmit = (event) => {
    event.preventDefault();
    const normalizedName = normalize(nameInput);
    if (!NAME_ANSWERS.has(normalizedName)) {
      setNoticeText('并未找到相关对象，请确认是否输入正确姓名');
      return;
    }
    setNoticeText('');
    setIsNameStrikeAnimating(true);
    if (nameStrikeTimerRef.current) {
      window.clearTimeout(nameStrikeTimerRef.current);
    }
    setShowFinalScribbleCanvas(true);
    nameStrikeTimerRef.current = window.setTimeout(() => {
      const canvas = finalScribbleCanvasRef.current;
      const inputEl = finalNameInputRef.current;
      if (!canvas || !inputEl) {
        setShowFinalScribbleCanvas(false);
        setIsNameStrikeAnimating(false);
        setIsComplete(true);
        nameStrikeTimerRef.current = null;
        return;
      }

      const cfg = FINAL_NAME_SCRIBBLE_CONFIG;
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        setShowFinalScribbleCanvas(false);
        setIsNameStrikeAnimating(false);
        setIsComplete(true);
        nameStrikeTimerRef.current = null;
        return;
      }

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      ctx.font = '800 28px "KaiTi", "STKaiti", "Kaiti SC", serif';

      const inputRect = inputEl.getBoundingClientRect();
      const measured = ctx.measureText(nameInput);
      const textWidth = Math.max(1, Math.ceil(measured.width));
      const textHeight = Math.max(
        1,
        Math.ceil((measured.actualBoundingBoxAscent || 20) + (measured.actualBoundingBoxDescent || 8)),
      );
      const textX = inputRect.left + 14;
      const textY = inputRect.top + (inputRect.height - textHeight) / 2;
      const padX = textWidth * 0.34;
      const padY = textHeight * 0.48;
      const rawTextClip = {
        x: textX - padX,
        y: textY - padY,
        width: textWidth + padX * 2,
        height: textHeight + padY * 2,
      };
      const inputBounds = {
        x: inputRect.left,
        y: inputRect.top,
        width: inputRect.width,
        height: inputRect.height,
      };
      const intersectRect = (a, b) => {
        const x = Math.max(a.x, b.x);
        const y = Math.max(a.y, b.y);
        const right = Math.min(a.x + a.width, b.x + b.width);
        const bottom = Math.min(a.y + a.height, b.y + b.height);
        return {
          x,
          y,
          width: Math.max(0, right - x),
          height: Math.max(0, bottom - y),
        };
      };
      const textClipRaw = intersectRect(rawTextClip, inputBounds);
      const clipInset = Math.ceil(cfg.lineWidth * 1.2);
      const textClip = {
        x: textClipRaw.x + clipInset,
        y: textClipRaw.y + clipInset,
        width: Math.max(0, textClipRaw.width - clipInset * 2),
        height: Math.max(0, textClipRaw.height - clipInset * 2),
      };
      const inputClip = {
        x: inputRect.left + clipInset,
        y: inputRect.top + clipInset,
        width: Math.max(0, inputRect.width - clipInset * 2),
        height: Math.max(0, inputRect.height - clipInset * 2),
      };
      const fullClip = { x: 0, y: 0, width: window.innerWidth, height: window.innerHeight };

      const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
      const lerp = (a, b, t) => a + (b - a) * t;
      const easeInExplosive = (progress) => {
        const clamped = clamp(progress, 0, 1);
        return Math.pow(clamped, 4.8);
      };
      const getSuspenseBuildProgress = (elapsed, totalDuration) => {
        if (totalDuration <= 0) return 1;
        if (elapsed <= 0) return 0;
        if (elapsed < 1000) {
          return (elapsed / 1000) * 0.008;
        }
        const remainingDuration = Math.max(1, totalDuration - 1000);
        const acceleratedProgress = clamp((elapsed - 1000) / remainingDuration, 0, 1);
        return 0.008 + (1 - 0.008) * easeInExplosive(acceleratedProgress);
      };

      let point = null;
      let direction = Math.random() * Math.PI * 2;
      let drawn = 0;
      let laughsDrawn = 0;
      let segmentProgress = 0;
      let activeSegment = null;
      let laughCarry = 0;
      const startAt = performance.now();
      const lineY = textY + textHeight * 0.55;
      const lineStartX = textX;
      const lineEndX = textX + textWidth;
      const deleteSegment = {
        baseX: lineStartX,
        baseY: lineY,
        endX: lineEndX,
        endY: lineY,
        useCurve: false,
        cpX: lineStartX,
        cpY: lineY,
        baseWidth: cfg.lineWidth * 1.28,
        passCount: 4,
      };

      const drawHandSegment = (segment, fraction) => {
        const t = clamp(fraction, 0, 1);
        if (!segment || t <= 0) return;
        const passCount = segment.passCount || 3;

        for (let pass = 0; pass < passCount; pass += 1) {
          const jitterX = (Math.random() - 0.5) * (1.4 + cfg.lineWidth * 0.22);
          const jitterY = (Math.random() - 0.5) * (1.4 + cfg.lineWidth * 0.22);
          ctx.globalAlpha = 0.24 + Math.random() * 0.18;
          ctx.strokeStyle = cfg.inkColor;
          ctx.lineWidth = segment.baseWidth * (0.78 + Math.random() * 0.28);
          ctx.beginPath();
          ctx.moveTo(segment.baseX + jitterX, segment.baseY + jitterY);
          if (segment.useCurve) {
            const q0x = lerp(segment.baseX, segment.cpX, t);
            const q0y = lerp(segment.baseY, segment.cpY, t);
            const q1x = lerp(segment.cpX, segment.endX, t);
            const q1y = lerp(segment.cpY, segment.endY, t);
            const r0x = lerp(q0x, q1x, t);
            const r0y = lerp(q0y, q1y, t);
            ctx.quadraticCurveTo(q0x + jitterX, q0y + jitterY, r0x + jitterX, r0y + jitterY);
          } else {
            ctx.lineTo(
              lerp(segment.baseX, segment.endX, t) + jitterX,
              lerp(segment.baseY, segment.endY, t) + jitterY,
            );
          }
          ctx.stroke();
        }
      };

      const drawLaughOverlay = (bounds, count) => {
        const phrases = ['HA', 'HAHA', 'HAHAHA', 'HAHAHAHA', 'HAHAHAHAHA'];
        const left = bounds.x;
        const top = bounds.y;
        const width = bounds.width;
        const height = bounds.height;
        const totalCount = Math.max(1, count);

        ctx.save();
        ctx.beginPath();
        ctx.rect(bounds.x, bounds.y, bounds.width, bounds.height);
        ctx.clip();

        for (let i = 0; i < totalCount; i += 1) {
          const phrase = phrases[Math.floor(Math.random() * phrases.length)];
          const x = left + Math.random() * width;
          const y = top + Math.random() * height;
          const fontSize = Math.round(
            (height > 180 ? 18 : 14) + Math.random() * (height > 180 ? 62 : 32),
          );
          const rotation = (Math.random() - 0.5) * 0.8;
          const scaleX = 0.82 + Math.random() * 0.42;
          const scaleY = 0.84 + Math.random() * 0.38;
          const skewX = (Math.random() - 0.5) * 0.42;
          const skewY = (Math.random() - 0.5) * 0.18;

          ctx.save();
          ctx.translate(x, y);
          ctx.rotate(rotation);
          ctx.transform(scaleX, skewY, skewX, scaleY, 0, 0);
          ctx.font = `700 ${fontSize}px "HanziPen SC", "FZShuTi", "STXinwei", "STXingkai", "Xingkai SC", cursive`;
          ctx.textBaseline = 'middle';
          ctx.fillStyle = cfg.inkColor;
          ctx.globalAlpha = 0.18 + Math.random() * 0.22;

          for (let pass = 0; pass < 4; pass += 1) {
            const offsetX = (Math.random() - 0.5) * 6;
            const offsetY = (Math.random() - 0.5) * 6;
            ctx.fillText(phrase, offsetX, offsetY);
          }
          ctx.restore();
        }

        ctx.restore();
      };

      const buildNextContinuousSegment = (bounds) => {
        const left = bounds.x;
        const right = bounds.x + bounds.width;
        const top = bounds.y;
        const bottom = bounds.y + bounds.height;

        if (!point) {
          point = {
            x: left + Math.random() * (right - left),
            y: top + Math.random() * (bottom - top),
          };
          direction = Math.random() * Math.PI * 2;
        }

        const baseX = point.x;
        const baseY = point.y;
        if (Math.random() < 0.2) {
          direction += (Math.random() - 0.5) * Math.PI * 1.4;
        } else {
          direction += (Math.random() - 0.5) * (0.25 + cfg.curvature * 1.2);
        }

        const longSlash = Math.random() < 0.3;
        const maxSpan = Math.max(bounds.width, bounds.height);
        const step =
          maxSpan *
          (longSlash ? 0.42 + Math.random() * 0.5 : 0.12 + Math.random() * 0.22) *
          cfg.lengthFactor;

        let endX = baseX + Math.cos(direction) * step;
        let endY = baseY + Math.sin(direction) * step;

        if (endX < left || endX > right) {
          direction = Math.PI - direction;
          endX = clamp(endX, left, right);
        }
        if (endY < top || endY > bottom) {
          direction = -direction;
          endY = clamp(endY, top, bottom);
        }

        const useCurve = Math.random() < Math.max(0.08, cfg.curvature * 0.35);
        const normalAngle = direction + Math.PI / 2;
        const curveSpan = step * cfg.curvature * (0.2 + Math.random() * 0.5);
        const cpX = clamp((baseX + endX) * 0.5 + Math.cos(normalAngle) * curveSpan, left, right);
        const cpY = clamp((baseY + endY) * 0.5 + Math.sin(normalAngle) * curveSpan, top, bottom);
        const baseWidth = cfg.lineWidth * (0.9 + Math.random() * 0.55);
        point = { x: endX, y: endY };
        return {
          baseX,
          baseY,
          endX,
          endY,
          useCurve,
          cpX,
          cpY,
          baseWidth,
        };
      };

      const tick = (now) => {
        const elapsed = now - startAt;
        const lineProgress = Math.min(1, elapsed / cfg.deleteLineDurationMs);
        const chaosElapsed = Math.max(0, elapsed - cfg.deleteLineDurationMs);
        const chaosProgress = Math.min(1, chaosElapsed / cfg.durationMs);
        const scribbleBuildProgress = getSuspenseBuildProgress(
          Math.min(cfg.durationMs, chaosElapsed * 2),
          cfg.durationMs,
        );
        const laughBuildProgress = getSuspenseBuildProgress(chaosElapsed, cfg.durationMs);
        const target = Math.floor(cfg.strokeCount * scribbleBuildProgress);
        const laughTarget = cfg.laughCount * laughBuildProgress;
        let budget = cfg.strokesPerFrame;

        if (lineProgress < 1) {
          ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
          ctx.save();
          ctx.beginPath();
          ctx.rect(textClip.x, textClip.y, textClip.width, textClip.height);
          ctx.clip();
          drawHandSegment(deleteSegment, lineProgress);
          ctx.restore();
          window.requestAnimationFrame(tick);
          return;
        }

        if (!point) {
          point = { x: lineEndX, y: lineY };
          direction = -Math.PI / 6;
        }

        while (drawn < target && budget > 0) {
          ctx.save();
          ctx.beginPath();
          ctx.rect(inputClip.x, inputClip.y, inputClip.width, inputClip.height);
          ctx.clip();
          if (!activeSegment) {
            activeSegment = buildNextContinuousSegment(inputClip);
            segmentProgress = 0;
          }
          segmentProgress = Math.min(
            1,
            segmentProgress + Math.max(0.04, scribbleBuildProgress * 0.85),
          );
          drawHandSegment(activeSegment, segmentProgress);
          if (segmentProgress >= 1) {
            activeSegment = null;
            segmentProgress = 0;
            drawn += 1;
            budget -= 1;
          } else {
            budget = 0;
          }
          ctx.restore();
        }

        laughCarry += Math.max(0, laughTarget - laughsDrawn);
        const nextLaughCount = Math.floor(laughCarry);
        if (nextLaughCount > 0) {
          drawLaughOverlay(fullClip, nextLaughCount);
          laughCarry -= nextLaughCount;
          laughsDrawn += nextLaughCount;
        }

        if (chaosProgress < 1) {
          window.requestAnimationFrame(tick);
          return;
        }

        setShowFinalScribbleCanvas(false);
        setIsNameStrikeAnimating(false);
        setIsComplete(true);
        nameStrikeTimerRef.current = null;
      };

      window.requestAnimationFrame(tick);
    }, 20);
  };

  const handleContinue = () => {
    navigate('/p/3e7b10a9c4');
  };

  const handleExit = () => {
    setIsExitRewritten(true);
  };

  if (isScribbleDebugMode) {
    return <ScribbleStrikeDebugPanel />;
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        background: isBooting
          ? 'linear-gradient(140deg, #f5f8f6 0%, #eef4f0 56%, #f6faf7 100%)'
          : 'radial-gradient(circle at 16% 12%, rgba(108, 130, 119, 0.14), transparent 42%), radial-gradient(circle at 88% 78%, rgba(82, 97, 89, 0.12), transparent 40%), linear-gradient(140deg, #141816 0%, #1a201d 55%, #171c1a 100%)',
        color: isBooting ? '#3f5a4d' : '#d7ded8',
        fontFamily: isBooting
          ? 'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif'
          : '"Noto Serif SC", "Songti SC", "STSong", "SimSun", serif',
      }}
    >
      {shouldShowNoise && (
        <canvas
          ref={noiseCanvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: showBlueScreen ? 3010 : currentFlashImageIndex >= 0 ? 2910 : 12,
            pointerEvents: 'none',
            imageRendering: 'pixelated',
            mixBlendMode: 'normal',
            opacity: showBlueScreen || currentFlashImageIndex >= 0 ? 0.8 : 1,
          }}
        />
      )}
      {showFinalScribbleCanvas && (
        <canvas
          ref={finalScribbleCanvasRef}
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2800,
            pointerEvents: 'none',
          }}
        />
      )}
      {isBooting && showBlueScreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 3000,
            background: '#0a2a9f',
            color: '#f0f6ff',
            fontFamily: '"Consolas", "Courier New", monospace',
            display: 'grid',
            alignContent: 'center',
            justifyContent: 'center',
            gap: 12,
            padding: 24,
          }}
        >
          <p style={{ margin: 0, fontSize: 20 }}>A problem has been detected and system has been shut down.</p>
          <p style={{ margin: 0, fontSize: 16 }}>STOP: 0x0000007B (0xF7A9E908, 0xC0000034, 0x00000000, 0x00000000)</p>
          <p style={{ margin: 0, fontSize: 16 }}>Collecting memory dump... {blueScreenPercent}%</p>
        </div>
      )}

      {isBooting && currentFlashImageIndex >= 0 && !showBlueScreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2900,
            background: '#000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12,
            overflow: 'hidden',
          }}
        >
          <img
            src={publicPath(FLASH_IMAGES[currentFlashImageIndex])}
            alt={`闪回画面${currentFlashImageIndex + 1}`}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.02) saturate(0.88)',
              transform: 'scale(1.012)',
            }}
          />
        </div>
      )}

      {isBooting && showErrorStorm && !showBlueScreen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 2600,
            pointerEvents: 'none',
          }}
        >
          {errorWindows.map((item) => (
            <div
              key={item.id}
              style={{
                position: 'absolute',
                top: `${item.top}%`,
                left: `${item.left}%`,
                width: item.width,
                background: '#f3f3f3',
                border: '1px solid #666',
                boxShadow: '0 2px 10px rgba(0,0,0,0.28)',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div style={{ background: '#e3e3e3', color: '#202020', padding: '4px 8px', fontSize: 12, fontWeight: 700 }}>
                System Error
              </div>
              <div style={{ padding: '8px 10px', fontSize: 12, color: '#111' }}>
                <div style={{ marginBottom: 6 }}>Error Copying File or Folder</div>
                <div>{item.message}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      <main
        style={{
          width: 'min(1360px, 96vw)',
          margin: '0 auto',
          padding: '84px 0 120px',
          minHeight: '100vh',
          display: 'grid',
          alignContent: isBooting ? 'start' : 'center',
          position: 'relative',
          zIndex: 20,
        }}
      >
        {isBooting && (
          <section
            style={{
              maxWidth: 1280,
              border: '1px solid #cfe1d5',
              borderRadius: 14,
              background: '#ffffff',
              boxShadow: `0 16px 36px rgba(21, 71, 42, ${glitchLevel >= 2 ? 0.2 : 0.08})`,
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
              transform: `translate(${jitterX}px, ${jitterY}px)`,
              filter: showErrorStorm ? 'blur(1.1px)' : 'none',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
                background:
                  glitchLevel >= 2
                    ? 'repeating-linear-gradient(0deg, rgba(52,83,66,0.04), rgba(52,83,66,0.04) 1px, transparent 1px, transparent 3px)'
                    : 'transparent',
                opacity: glitchLevel >= 2 ? 1 : 0,
              }}
            />
            <p
              style={{
                margin: 0,
                color: '#5c7a69',
                fontSize: 13,
                letterSpacing: '0.12em',
              }}
            >
              HEART HOME / SYSTEM CHECK
            </p>
            <h1
              style={{
                margin: '10px 0 18px',
                color: '#305640',
                fontWeight: 600,
                fontSize: 'clamp(28px,2.3vw,40px)',
                lineHeight: 1.2,
              }}
            >
              {typedTitle}
            </h1>
            <div style={{ display: 'grid', gap: 10 }}>
              {typedLines.map((line, idx) => (
                <p
                  key={`typed-line-${idx}`}
                  style={{
                    margin: 0,
                    color: idx % 2 === 0 ? '#3f5f4f' : '#5a7568',
                    fontSize: 'clamp(16px,1.5vw,22px)',
                    opacity: glitchLevel >= 1 && idx === 4 ? 0.68 : 1,
                    filter: glitchLevel >= 2 && idx >= 5 ? 'blur(0.3px)' : 'none',
                    textShadow:
                      glitchLevel >= 3 && idx >= 6
                        ? '1px 0 rgba(174, 66, 66, 0.45), -1px 0 rgba(79, 144, 130, 0.45)'
                        : 'none',
                  }}
                >
                  {line}
                  {pausedLineIndex === idx ? '.'.repeat(loadingDotCount) : ''}
                </p>
              ))}
            </div>
          </section>
        )}

        {!isBooting && !dateConfirmed && (
          <form
            onSubmit={handleDateSubmit}
            style={{
              display: 'grid',
              gap: 24,
              maxWidth: 1280,
              width: '100%',
              justifySelf: 'center',
              border: '1px solid #3c4a43',
              borderRadius: 14,
              background: 'rgba(197, 205, 198, 0.06)',
              boxShadow: '0 24px 50px rgba(8, 10, 9, 0.35)',
              padding: '34px 30px',
              fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
            }}
          >
            <h1 style={questionTitleStyle}>
              请输入你记忆中最痛苦的那一天：
            </h1>
            <input
              type="text"
              placeholder="YYYY/MM/DD"
              value={formatBirthdayInput(birthdayDigits)}
              onChange={(event) =>
                setBirthdayDigits(String(event.target.value).replace(/\D/g, '').slice(0, 8))
              }
              inputMode="numeric"
              maxLength={10}
              autoComplete="off"
              autoFocus
              style={{
                height: 62,
                border: '1px solid #506259',
                borderRadius: 10,
                background: '#d4d9d5',
                padding: '0 18px',
                fontSize: 28,
                color: '#860700ff',
                fontWeight: 800,
                caretColor: '#860700ff',
                width: 'min(1120px, 100%)',
              }}
            />
            <div>
              <button
                type="submit"
                style={{
                  height: 44,
                  minWidth: 112,
                  borderRadius: 8,
                  border: '1px solid #5b6f65',
                  background: '#2d3b34',
                  color: '#dbe4dd',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'inherit',
                }}
              >
                提交
              </button>
            </div>
          </form>
        )}

        {!isBooting && dateConfirmed && currentQuestion && (
          <section
            style={{
              maxWidth: 960,
              width: '100%',
              justifySelf: 'center',
              border: '1px solid #3d4a43',
              borderRadius: 14,
              background: 'rgba(199, 206, 201, 0.06)',
              boxShadow: '0 24px 50px rgba(8, 10, 9, 0.35)',
              padding: '32px 30px',
              fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
            }}
          >
            <h2 style={{ ...questionTitleStyle, margin: '0 0 20px' }}>
              {currentQuestion.title}
            </h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {currentQuestion.options.map((option, index) => {
                const isStriking =
                  strikethroughTarget?.questionId === currentQuestion.id &&
                  strikethroughTarget?.optionIndex === index;
                const isLockedByStrike = Boolean(strikethroughTarget);
                return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleOptionSelect(currentQuestion.id, index)}
                  onMouseEnter={() => setHoveredOptionIndex(index)}
                  onMouseLeave={() => setHoveredOptionIndex(-1)}
                  disabled={isLockedByStrike}
                  aria-pressed={answers[currentQuestion.id] === index}
                  style={{
                    transform: hoveredOptionIndex === index ? 'translateY(-1px)' : 'translateY(0)',
                    textAlign: 'left',
                    border:
                      answers[currentQuestion.id] === index
                        ? '1px solid #8ea99b'
                        : hoveredOptionIndex === index
                          ? '1px solid #93a89d'
                          : '1px solid #46574e',
                    background:
                      answers[currentQuestion.id] === index
                        ? 'rgba(148, 172, 158, 0.24)'
                        : hoveredOptionIndex === index
                          ? 'linear-gradient(120deg, rgba(58, 67, 61, 0.92), rgba(38, 45, 41, 0.92))'
                          : 'rgba(24, 31, 28, 0.65)',
                    boxShadow:
                      hoveredOptionIndex === index
                        ? '0 8px 18px rgba(9, 14, 11, 0.34)'
                        : 'none',
                    color: answers[currentQuestion.id] === index ? '#e6efea' : '#bec9c2',
                    borderRadius: 10,
                    fontSize: 'clamp(24px,2vw,34px)',
                    lineHeight: 1.34,
                    cursor: 'inherit',
                    padding: '14px 16px',
                    transition: 'all 160ms ease',
                    opacity: isLockedByStrike && !isStriking ? 0.8 : 1,
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <span style={{ position: 'relative', display: 'block', zIndex: 1 }}>
                    {String.fromCharCode(65 + index)}. {option}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      left: 16,
                      right: 16,
                      top: '50%',
                      height: 3,
                      borderRadius: 999,
                      background: 'linear-gradient(90deg, #6d0000 0%, #8f0303 45%, #b30b0b 100%)',
                      transformOrigin: 'left center',
                      transform: isStriking ? 'translateY(-50%) scaleX(1)' : 'translateY(-50%) scaleX(0)',
                      transition: 'transform 500ms linear',
                      zIndex: 2,
                      boxShadow: isStriking ? '0 0 8px rgba(151, 8, 8, 0.42)' : 'none',
                    }}
                  />
                  {answers[currentQuestion.id] === index ? '  （已选择）' : ''}
                </button>
                );
              })}
            </div>
          </section>
        )}

        {!isBooting && showFinalNameInput && !isComplete && (
          <form
            onSubmit={handleNameSubmit}
            style={{
              display: 'grid',
              gap: 24,
              maxWidth: 1120,
              width: '100%',
              justifySelf: 'center',
              border: '1px solid #3c4a43',
              borderRadius: 14,
              background: 'rgba(197, 205, 198, 0.06)',
              boxShadow: '0 24px 50px rgba(8, 10, 9, 0.35)',
              padding: '34px 30px',
              fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif',
            }}
          >
            <h2 style={questionTitleStyle}>
              现在，请输入你最讨厌的那个人的名字：
            </h2>
            <div style={{ position: 'relative' }}>
              <input
                ref={finalNameInputRef}
                type="text"
                value={nameInput}
                onChange={(event) => setNameInput(event.target.value)}
                autoFocus
                disabled={isNameStrikeAnimating}
                style={{
                  height: 62,
                  width: '100%',
                  border: '1px solid #506259',
                  borderRadius: 10,
                  background: '#d4d9d5',
                  padding: '0 14px',
                  fontSize: 28,
                  color: '#860700ff',
                  fontWeight: 800,
                  caretColor: '#860700ff',
                }}
              />
            </div>
            <div>
              <button
                type="submit"
                disabled={isNameStrikeAnimating}
                style={{
                  height: 44,
                  minWidth: 112,
                  borderRadius: 8,
                  border: '1px solid #5b6f65',
                  background: '#2d3b34',
                  color: '#dbe4dd',
                  fontSize: 15,
                  fontWeight: 700,
                  cursor: 'inherit',
                }}
              >
                提交
              </button>
            </div>
          </form>
        )}

        {!isBooting && isComplete && (
          <section style={{ maxWidth: 900, width: '100%', justifySelf: 'center', border: '1px solid #3e4c45', borderRadius: 14, padding: '34px 30px', background: 'rgba(197, 205, 198, 0.07)', fontFamily: '"KaiTi", "STKaiti", "Kaiti SC", serif' }}>
            <p style={{ margin: 0, color: '#cad5cf', fontSize: 'clamp(26px,2.1vw,34px)', lineHeight: 1.6 }}>
              {Array.from(COMPLETE_TEXT.slice(0, typedCompleteLength)).map((char, index) => {
                if (char === '\n') return <br key={`complete-break-${index}`} />;
                const highlightStart = COMPLETE_TEXT.indexOf(COMPLETE_HIGHLIGHT);
                const highlightEnd = highlightStart + COMPLETE_HIGHLIGHT.length;
                const isHighlight = index >= highlightStart && index < highlightEnd;
                return (
                  <span
                    key={`complete-char-${index}`}
                    style={isHighlight ? { color: '#cc1006ff', fontWeight: 800 } : undefined}
                  >
                    {char}
                  </span>
                );
              })}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 26, opacity: typedCompleteLength >= COMPLETE_TEXT.length ? 1 : 0, transition: 'opacity 220ms ease' }}>
              <button
                type="button"
                onClick={handleContinue}
                style={{
                  height: 44,
                  minWidth: 130,
                  borderRadius: 8,
                  border: '1px solid #5b6f65',
                  background: '#2d3b34',
                  color: '#dbe4dd',
                  fontSize: 20,
                  fontWeight: 700,
                  cursor: 'inherit',
                }}
              >
                A 继续
              </button>
              <button
                type="button"
                onClick={isExitRewritten ? handleContinue : handleExit}
                style={{
                  height: 44,
                  minWidth: 130,
                  borderRadius: 8,
                  border: '1px solid #5b6f65',
                  background: '#2d3b34',
                  color: '#dbe4dd',
                  fontSize: 20,
                  fontWeight: 700,
                  cursor: 'inherit',
                }}
              >
                B {isExitRewritten ? '继续' : '退出'}
              </button>
            </div>
          </section>
        )}

        {!isBooting && noticeText && (
          <p
            style={{
              margin: '40px 0 0',
              color: '#e4ece7',
              background: 'rgba(78, 88, 82, 0.92)',
              borderRadius: 6,
              padding: '14px 18px',
              width: 'fit-content',
              fontSize: 28,
            }}
          >
            {noticeText}
          </p>
        )}
      </main>
    </div>
  );
}
