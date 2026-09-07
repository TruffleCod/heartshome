import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { publicPath, routePath } from '../utils/publicPath';
import { INPUT_MODES, readInputMode } from '../utils/inputMode';
import { savePlayerGuestbookMessage } from '../utils/dongyangGuestbookStorage';
import {
  readSearchHistory,
  recordSearchHistory,
} from '../utils/searchHistory';

const SEARCH_HISTORY_KEY = 'heart-home:dongyang-old-stories-search-history';

const menuItems = [
  { label: '首页', icon: '⌂', href: '/p/71a6d0e2bf' },
  { label: '相册', icon: '▣', href: '/p/b4e9820fa1' },
  { label: '留言', icon: '●', href: '/p/0c1f8a6d94' },
  { label: '搜索', icon: '⌕', action: 'search' },
];

const messageItems = [
  {
    name: '访客456',
    date: '2018-04-10',
    text: '以前的调查笔记怎么都找不到了？博主隐藏了吗？',
    replies: [
      { author: '访客754追评', text: '博主意外过世了，以前的文章好多都隐藏了，你可以用搜索功能试试看。' },
      { author: '访客456追评', text: '好的，找到了谢谢……好可惜啊，以前经常看这个博客的调查笔记，当鬼故事看，还挺有意思的。' },
    ],
  },
  {
    name: '访客324',
    date: '2005-04-08',
    text: '李老师，西山旧址的后续您还查吗？我外婆说她可能记得一些线索。',
  },
  {
    name: '访客165',
    date: '2003-04-05',
    text: '泥像吞心案怎么不更新了啊啊啊啊啊啊啊',
  },
];

const preloadedImageResources = new Set();

function preloadImageResource(path) {
  if (typeof window === 'undefined' || !path || preloadedImageResources.has(path)) {
    return;
  }

  preloadedImageResources.add(path);
  const image = new Image();
  image.decoding = 'async';
  image.src = path;
}

function ImageResourceLink({ path, children }) {
  const href = publicPath(path);
  const linkRef = useRef(null);

  useEffect(() => {
    const node = linkRef.current;

    if (!node || typeof IntersectionObserver === 'undefined') {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          preloadImageResource(href);
          observer.disconnect();
        }
      },
      { rootMargin: '360px 0px' }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [href]);

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => preloadImageResource(href)}
      onFocus={() => preloadImageResource(href)}
      onTouchStart={() => preloadImageResource(href)}
    >
      {children}
    </a>
  );
}

const searchItems = [
  {
    id: 'west-hill-site-collapse',
    type: 'post',
    title: '关于西山旧址坍塌事件的调查',
    path: '/p/e6b0c3f91a',
    date: '2005-03-04',
    summary: '李宏宇重新返回清川公园，记录废庙坍塌现场、考古专家说法，以及墙上密密麻麻的名字。',
    keywords: ['西山旧址'],
  },
  {
    id: 'two-yi-shrine-return-visit',
    type: 'post',
    title: '回访记录',
    path: '/p/1fd9a0c7e4',
    date: '2005-03-07',
    summary: '李宏宇去医院看望小Y，试图追问两仪祠废庙里的神像、怪梦和清川公园那天的经过。',
    keywords: ['两仪祠'],
  },
  {
    id: 'mingchuan-county-gazetteer',
    type: 'post',
    title: '明川县志',
    path: '/p/56b2d8a4c1',
    date: '明川县志',
    summary: '旧县志扫描件与文字整理。',
    keywords: ['明川县志'],
  },
  {
    id: 'mingchuan-waterways-addendum',
    type: 'post',
    title: '明川水经补遗',
    path: '/p/8a4f03c7de',
    date: '明川水经补遗',
    summary: '残页、旧地图与文字整理。',
    keywords: ['明川水经补遗'],
  },
  {
    id: 'dongyang-strange-cults-study',
    type: 'post',
    title: '东阳异崇考',
    path: '/p/2c91b7e6a4',
    date: '东阳异崇考',
    summary: '扫描页、原文整理与复原译文。',
    keywords: ['东阳异崇考', '两仪祠'],
  },
  {
    id: 'hidden-name-record',
    type: 'post',
    title: '幽名别录',
    path: '/p/f0d6a19c82',
    date: '幽名别录',
    summary: '残卷扫描件与可辨文字整理。',
    keywords: ['幽名别录', '刘义庆'],
  },
  {
    id: 'mingchuan-third-middle-case-one',
    type: 'post',
    title: '明川三中少女失踪案调查笔记 其一',
    path: '/p/a0c8e37b5f',
    date: '2005-04-12',
    summary: '',
    keywords: ['糖果屋','泡泡堂'],
  },
  {
    id: 'candy-house-chat-screenshot',
    type: 'image',
    title: '（图片）',
    path: '/images/聊天截图.jpg',
    date: '聊天截图',
    summary: '',
    keywords: ['糖果屋','泡泡堂'],
  },
  {
    id: 'mingchuan-third-middle-case-two',
    type: 'post',
    title: '明川三中少女失踪案调查笔记 其二',
    path: '/p/c49e1a0f72',
    date: '2005-04-25',
    summary: '',
    keywords: ['奉名'],
  },
  {
    id: 'mingchuan-third-middle-case-three',
    type: 'post',
    title: '明川三中少女失踪案调查笔记 其三',
    path: '/p/7f2da90b31',
    date: '2005-04-29',
    summary: '',
    keywords: ['十方洞微两仪辨心圣君'],
  },
  {
    id: 'ritual-fragment-deleted',
    type: 'deleted',
    title: '仪式残卷',
    date: '仪式残卷',
    summary: '',
    keywords: ['奉名'],
  },
  {
    id: 'mingchuan-third-middle-case-four',
    type: 'post',
    title: '明川三中少女失踪案调查笔记 其四',
    path: '/p/ed31c8b047',
    date: '2005-05-25',
    summary: '',
    keywords: ['体育器材室'],
  },
  {
    id: 'mingchuan-third-middle-case-five',
    type: 'post',
    title: '明川三中少女失踪案调查笔记 其五',
    path: '/p/4b0e72f6a9',
    date: '2016-04-16',
    summary: '',
    keywords: [],
  },
  {
    id: 'guestbook-archive',
    type: 'post',
    title: '留言板暂存箱',
    path: '/p/9c73ae0d6b',
    date: '暂存',
    summary: '',
    keywords: ['GUESTBOOK'],
  },
  {
    id: 'clay-idol-heart-case',
    type: 'post',
    title: '独家秘闻！城隍庙“泥像吞心”奇案——短短七日三条人命 胸口无伤竟藏一捧湿泥',
    path: '/p/d8b3f2a6c0',
    date: '2003-04-05',
    summary: '',
    keywords: ['泥像吞心案'],
  },
];

function normalizeKeyword(value) {
  return String(value).trim().toLowerCase().replace(/\s+/g, '');
}

function searchDongyangBlog(keyword) {
  const normalized = normalizeKeyword(keyword);

  if (!normalized) {
    return [];
  }

  return searchItems.filter((item) =>
    item.keywords.some((keywordValue) =>
      normalizeKeyword(keywordValue) === normalized
    )
  );
}

function SearchHistoryPanel({ history, onSearch }) {
  if (history.length === 0) {
    return null;
  }

  return (
    <article className="dy-search-history" aria-label="东阳旧事搜索历史">
      <h2>搜索历史（至多显示20条）</h2>
      <div className="dy-search-history-list">
        {history.map((item) => (
          <button
            className={`dy-search-history-item ${item.found ? 'found' : 'missing'}`}
            type="button"
            key={`${item.keyword}-${item.searchedAt}`}
            title="搜索"
            onClick={() => onSearch(item.keyword)}
          >
            {item.keyword}
          </button>
        ))}
      </div>
    </article>
  );
}

function InteractiveMap() {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const viewportRef = useRef(null);
  const dragState = useRef(null);
  const pointersRef = useRef(new Map());
  const pinchState = useRef(null);

  const isMapTouchMode = () => (
    typeof document !== 'undefined' &&
    document.documentElement.classList.contains('hh-input-mode-touch')
  );

  const getPointerMetrics = () => {
    const points = Array.from(pointersRef.current.values());

    if (points.length < 2) {
      return null;
    }

    const [first, second] = points;
    const dx = second.x - first.x;
    const dy = second.y - first.y;

    return {
      distance: Math.max(1, Math.hypot(dx, dy)),
      centerX: (first.x + second.x) / 2,
      centerY: (first.y + second.y) / 2,
    };
  };

  const clampView = (nextView) => {
    const nextScale = Number.isFinite(nextView.scale) ? nextView.scale : 1;
    const scale = Math.min(3, Math.max(1, nextScale));
    const viewport = viewportRef.current;

    if (!viewport || scale <= 1) {
      return { scale, x: 0, y: 0 };
    }

    const maxX = (viewport.clientWidth * (scale - 1)) / 2;
    const maxY = (viewport.clientHeight * (scale - 1)) / 2;
    const nextX = Number.isFinite(nextView.x) ? nextView.x : 0;
    const nextY = Number.isFinite(nextView.y) ? nextView.y : 0;

    return {
      scale,
      x: Math.min(maxX, Math.max(-maxX, nextX)),
      y: Math.min(maxY, Math.max(-maxY, nextY)),
    };
  };

  const setScale = (nextScale) => {
    setView((current) => clampView({ ...current, scale: nextScale }));
  };

  const handleWheel = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setView((current) =>
      clampView({
        ...current,
        scale: current.scale + (event.deltaY > 0 ? -0.12 : 0.12),
      })
    );
  };

  const handlePointerDown = (event) => {
    event.preventDefault();
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      return;
    }

    if (isMapTouchMode() && event.pointerType === 'touch') {
      pointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      if (pointersRef.current.size >= 2) {
        const metrics = getPointerMetrics();
        if (metrics) {
          pinchState.current = {
            ...metrics,
            scale: view.scale,
            x: view.x,
            y: view.y,
          };
          dragState.current = null;
        }
        return;
      }
    }

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: view.x,
      y: view.y,
    };
  };

  const handlePointerMove = (event) => {
    if (isMapTouchMode() && event.pointerType === 'touch') {
      if (!pointersRef.current.has(event.pointerId)) {
        return;
      }

      pointersRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });

      const metrics = getPointerMetrics();
      const pinch = pinchState.current;

      if (metrics && pinch) {
        const nextScale = pinch.scale * (metrics.distance / pinch.distance);

        setView(() =>
          clampView({
            scale: nextScale,
            x: pinch.x + metrics.centerX - pinch.centerX,
            y: pinch.y + metrics.centerY - pinch.centerY,
          })
        );
        return;
      }
    }
    const drag = dragState.current;

    if (!drag || drag.pointerId !== event.pointerId) {
      return;
    }

    setView((current) =>
      clampView({
        ...current,
        x: drag.x + event.clientX - drag.startX,
        y: drag.y + event.clientY - drag.startY,
      })
    );
  };

  const handlePointerUp = (event) => {
    if (isMapTouchMode() && event.pointerType === 'touch') {
      pointersRef.current.delete(event.pointerId);
      if (pointersRef.current.size < 2) {
        pinchState.current = null;
      }
    }

    if (dragState.current?.pointerId === event.pointerId) {
      try {
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
        // Pointer capture can disappear if the gesture is cancelled by the browser.
      }
      dragState.current = null;
    }
  };

  const handleLostPointerCapture = () => {
    dragState.current = null;
    pointersRef.current.clear();
    pinchState.current = null;
  };

  return (
    <figure className="dy-map-card">
      <div
        ref={viewportRef}
        className="dy-map-viewport"
        onWheel={handleWheel}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onLostPointerCapture={handleLostPointerCapture}
      >
        <img
          className="dy-map-image"
          src={publicPath('images/mingchuan-map.jpg')}
          alt="明川市地图"
          draggable="false"
          style={{
            transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
          }}
        />
        <div
          className="dy-map-controls"
          aria-label="地图缩放控制"
          onPointerDown={(event) => event.stopPropagation()}
          onWheel={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
        >
          <button type="button" onClick={() => setScale(view.scale + 0.2)}>＋</button>
          <button type="button" onClick={() => setScale(view.scale - 0.2)}>－</button>
        </div>
      </div>
    </figure>
  );
}

export function DongyangOldStoriesLayout({ children }) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const [recentSearches, setRecentSearches] = useState(() => readSearchHistory(SEARCH_HISTORY_KEY).slice(0, 3));
  const [inputMode, setInputMode] = useState(readInputMode);
  const closeTimer = useRef(null);
  const isTouchMode = inputMode === INPUT_MODES.TOUCH;

  useEffect(() => {
    const updateMode = (event) => {
      setInputMode(event.detail?.mode || readInputMode());
    };

    window.addEventListener('heart-home:input-mode-change', updateMode);
    window.addEventListener('storage', updateMode);
    return () => {
      window.removeEventListener('heart-home:input-mode-change', updateMode);
      window.removeEventListener('storage', updateMode);
    };
  }, []);

  const submitSearch = (event) => {
    event.preventDefault();
    const normalized = searchKeyword.trim();

    if (!normalized) {
      return;
    }

    setSearchOpen(false);
    navigate(`/p/71a6d0e2bf/search?q=${encodeURIComponent(normalized)}`);
    setRecentSearches(readSearchHistory(SEARCH_HISTORY_KEY).slice(0, 3));
  };

  const openSidebar = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    setSidebarOpen(true);
  };

  const closeSidebarSoon = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
    }
    closeTimer.current = window.setTimeout(() => setSidebarOpen(false), 140);
  };


  const handleBlogSurfaceClick = (event) => {
    if (!isTouchMode) {
      return;
    }

    const target = event.target;
    const touchedMap = target.closest?.('.dy-map-card, .dy-map-viewport, .dy-map-image');
    const image = touchedMap ? null : target.closest?.('img');

    if (image && event.currentTarget.contains(image)) {
      event.preventDefault();
      event.stopPropagation();
      setImagePreview({
        src: image.currentSrc || image.src,
        alt: image.alt || '????',
      });
      return;
    }

    const touchedPanel = target.closest?.('.dy-sidebar, .dy-search-panel, .dy-menu-toggle');

    if (!touchedPanel) {
      setSidebarOpen(false);
      setSearchOpen(false);
    }
  };

  return (
    <div className="dy-blog" onClickCapture={handleBlogSurfaceClick}>
      <style>{`
        .dy-blog {
          min-height: 100vh;
          background:
            radial-gradient(circle at 14% 8%, rgba(106, 22, 19, 0.16), transparent 28%),
            linear-gradient(90deg, rgba(106, 22, 19, 0.045) 1px, transparent 1px),
            linear-gradient(180deg, #f0d982 0%, #caa33f 100%);
          background-size: auto, 38px 38px, auto;
          color: #2a120f;
          font-family: "Microsoft YaHei", "SimSun", Arial, sans-serif;
        }

        .dy-blog * { box-sizing: border-box; }

        .dy-page {
          max-width: 1060px;
          margin: 0 auto;
          padding: 78px 28px 96px;
          --dy-top-offset: 78px;
        }

        .dy-shell {
          position: relative;
          min-height: calc(100vh - 174px);
          padding-right: 224px;
        }

        .dy-shell::before {
          content: "";
          position: absolute;
          top: 10px;
          left: -24px;
          width: 1px;
          height: calc(100% - 20px);
          background: linear-gradient(180deg, transparent, rgba(106, 22, 19, 0.3), transparent);
        }

        .dy-topline {
          max-width: 720px;
          min-height: 45px;
          margin-bottom: 54px;
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .dy-brand {
          height: 45px;
          display: inline-flex;
          align-items: center;
          border: 1px solid #6a1613;
          background: #ffeaa0;
          text-decoration: none;
          box-shadow: 5px 5px 0 rgba(42, 31, 20, 0.18);
        }

        .dy-brand strong {
          padding: 0 16px;
          color: #2a120f;
          font-size: 21px;
          line-height: 1;
          font-weight: 700;
          white-space: nowrap;
        }

        .dy-tagline {
          color: #6a1613;
          font-size: 17px;
          line-height: 1.7;
          white-space: nowrap;
        }

        .dy-menu-toggle {
          position: fixed;
          top: var(--dy-top-offset);
          right: calc((100vw - 1060px) / 2 + 196px);
          width: 35px;
          height: 35px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(106, 22, 19, 0.88);
          border-radius: 4px;
          background: rgba(255, 234, 160, 0.82);
          box-shadow: 0 0 0 2px rgba(255, 246, 196, 0.66);
          color: #6a1613;
          font-size: 23px;
          line-height: 1;
          cursor: pointer;
          z-index: 30;
        }

        .dy-sidebar {
          position: fixed;
          top: var(--dy-top-offset);
          right: calc((100vw - 1060px) / 2 - 16px);
          width: 148px;
          padding: 24px 18px;
          display: grid;
          gap: 11px;
          background: linear-gradient(180deg, rgba(255,255,255,.12), transparent 45%), #f4dc83;
          border: 1px solid rgba(106, 22, 19, 0.3);
          box-shadow: 8px 10px 0 rgba(106, 22, 19, 0.18), 0 4px 18px rgba(62, 16, 14, 0.22);
          transition: opacity 160ms ease, transform 160ms ease, visibility 160ms ease;
          z-index: 20;
        }

        .dy-sidebar::before,
        .dy-sidebar::after {
          content: "";
          position: absolute;
          left: 18px;
          right: 18px;
          height: 1px;
          background: rgba(106, 22, 19, 0.32);
        }

        .dy-sidebar::before { top: 15px; }
        .dy-sidebar::after { bottom: 15px; }

        .dy-sidebar.closed {
          opacity: 0;
          visibility: hidden;
          transform: translateX(18px);
          pointer-events: none;
        }

        .dy-side-button {
          min-height: 32px;
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0 6px;
          border: 0;
          background: transparent;
          color: #3a1713;
          text-decoration: none;
          font-family: inherit;
          font-size: 14px;
          line-height: 1.3;
          cursor: pointer;
        }

        .dy-side-button:hover { color: #8a241f; }

        .dy-side-icon {
          width: 15px;
          display: inline-flex;
          justify-content: center;
          color: #6a1613;
          font-size: 26px;
        }

        .dy-search-panel,
        .dy-card {
          max-width: 720px;
          background: linear-gradient(180deg, rgba(255,255,255,.28), transparent 36%), #ffeaa0;
          border: 1px solid rgba(106, 22, 19, 0.24);
          box-shadow: 9px 11px 0 rgba(106, 22, 19, 0.14), 0 1px 12px rgba(62, 16, 14, 0.12);
        }

        .dy-search-panel {
          position: fixed;
          top: 0;
          right: 0;
          width: min(360px, 82vw);
          height: 100vh;
          margin: 0;
          padding: 34px 28px;
          z-index: 60;
          animation: dySearchSlideIn 180ms ease-out;
        }

        .dy-search-panel form {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 60px;
          gap: 10px;
        }

        .dy-search-menu-links,
        .dy-recent-searches {
          display: none;
        }

        .dy-search-close {
          width: 38px;
          height: 34px;
          margin-bottom: 46px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(106, 22, 19, 0.44);
          background: #fff2bd;
          color: #6a1613;
          font-size: 22px;
          line-height: 1;
          cursor: pointer;
        }

        .dy-search-close:hover {
          background: #6a1613;
          color: #ffeaa0;
        }

        .dy-search-title {
          margin: 0 0 14px;
          color: #6a1613;
          font-size: 18px;
          font-weight: 700;
        }

        @keyframes dySearchSlideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }

        .dy-search-panel input,
        .dy-message-form input,
        .dy-message-form textarea {
          width: 100%;
          border: 1px solid rgba(106, 22, 19, 0.3);
          background: #fff2bd;
          color: #2a120f;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          outline: none;
        }

        .dy-search-panel input,
        .dy-message-form input {
          height: 30px;
          padding: 0 8px;
        }

        .dy-search-panel button[type="submit"] {
          height: 42px;
          min-width: 60px;
          padding: 0 12px;
          border: 1px solid rgba(106, 22, 19, 0.42);
          background: #6a1613;
          color: #ffeaa0;
          font-family: inherit;
          font-size: 15px;
          line-height: 1;
          white-space: nowrap;
          cursor: pointer;
        }

        .dy-search-results {
          max-width: 720px;
          display: grid;
          gap: 0;
          border-top: 1px dotted rgba(106, 22, 19, 0.34);
          border-bottom: 1px dotted rgba(106, 22, 19, 0.34);
        }

        .dy-search-heading {
          padding: 0 0 14px;
          border-bottom: 1px dotted rgba(106, 22, 19, 0.34);
        }

        .dy-search-heading h1 {
          margin: 0 0 8px;
          color: #2a120f;
          font-size: 22px;
          line-height: 1.4;
        }

        .dy-search-heading p {
          margin: 0;
          color: #4a241d;
          font-size: 13px;
          line-height: 1.8;
        }

        .dy-search-history {
          padding: 12px 0 14px;
          border-bottom: 1px dotted rgba(106, 22, 19, 0.34);
        }

        .dy-search-history h2 {
          margin: 0 0 8px;
          color: #4a241d;
          font-size: 14px;
          line-height: 1.4;
        }

        .dy-search-history-list {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
        }

        .dy-search-history-item {
          display: inline-flex;
          align-items: center;
          max-width: 100%;
          padding: 2px 7px;
          border: 1px solid currentColor;
          background: rgba(255, 242, 189, 0.48);
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 12px;
          line-height: 1.6;
          word-break: break-all;
          cursor: pointer;
        }

        .dy-search-history-item.found {
          color: #7b1713;
        }

        .dy-search-history-item.missing {
          color: rgba(74, 36, 29, 0.58);
        }

        .dy-result-card,
        .dy-no-results {
          display: block;
          padding: 12px 0 14px;
          background: transparent;
          border: 0;
          border-bottom: 1px dotted rgba(106, 22, 19, 0.26);
          box-shadow: none;
          color: inherit;
          text-decoration: none;
        }

        .dy-result-card:last-child,
        .dy-no-results:last-child {
          border-bottom: 0;
        }

        .dy-result-card:hover {
          background: rgba(255, 242, 189, 0.36);
        }

        .dy-result-type {
          display: inline-block;
          margin: 0 8px 6px 0;
          padding: 2px 6px;
          border-radius: 2px;
          background: #7b1713;
          color: #ffeaa0;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.25;
        }

        .dy-result-card h2 {
          margin: 0;
          color: #4a241d;
          font-size: 15px;
          line-height: 1.7;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .dy-image-links {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 8px;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.7;
        }

        .dy-image-links a,
        .dy-deleted-resource {
          color: #4a241d;
          text-decoration: underline;
          text-underline-offset: 3px;
        }

        .dy-deleted-resource {
          border: 0;
          background: transparent;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 15px;
          font-weight: 700;
          line-height: 1.7;
          padding: 0;
          cursor: pointer;
        }

        .dy-no-results {
          color: #4a241d;
          font-size: 13px;
          line-height: 1.8;
        }

        .dy-deleted-modal-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: grid;
          place-items: center;
          padding: 24px;
          background: rgba(42, 18, 15, 0.42);
        }

        .dy-deleted-modal {
          width: min(420px, 92vw);
          position: relative;
          padding: 26px 28px 24px;
          background:
            linear-gradient(180deg, rgba(255,255,255,.22), transparent 45%),
            repeating-linear-gradient(90deg, rgba(106, 22, 19, 0.05) 0 1px, transparent 1px 42px),
            #ffeaa0;
          border: 1px solid rgba(106, 22, 19, 0.52);
          box-shadow: 9px 11px 0 rgba(106, 22, 19, 0.2), 0 18px 42px rgba(42, 18, 15, 0.26);
          color: #2a120f;
        }

        .dy-deleted-modal::after {
          content: "";
          position: absolute;
          inset: 9px;
          border: 1px solid rgba(106, 22, 19, 0.12);
          pointer-events: none;
        }

        .dy-deleted-modal h2 {
          position: relative;
          z-index: 1;
          margin: 0 0 12px;
          color: #6a1613;
          font-size: 20px;
          line-height: 1.45;
        }

        .dy-deleted-modal p {
          position: relative;
          z-index: 1;
          margin: 0;
          color: #4a241d;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 14px;
          line-height: 1.9;
        }

        .dy-deleted-modal button {
          position: relative;
          z-index: 1;
          height: 32px;
          margin-top: 20px;
          padding: 0 14px;
          border: 1px solid rgba(106, 22, 19, 0.48);
          background: #fff2bd;
          color: #6a1613;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          font-weight: 700;
          cursor: pointer;
        }

        .dy-deleted-modal button:hover {
          background: #6a1613;
          color: #ffeaa0;
        }

        .dy-card {
          position: relative;
        }

        .dy-card::after {
          content: "";
          position: absolute;
          inset: 10px;
          border: 1px solid rgba(106, 22, 19, 0.1);
          pointer-events: none;
        }

        .dy-card-stamp {
          position: absolute;
          top: 18px;
          right: 20px;
          z-index: 2;
          padding: 5px 8px;
          border: 1px solid rgba(106, 22, 19, 0.7);
          color: rgba(106, 22, 19, 0.76);
          font-size: 13px;
          transform: rotate(-7deg);
        }

        .dy-cover {
          height: 270px;
          background: linear-gradient(180deg, rgba(15,10,5,.1), rgba(12,8,5,.66)), var(--dy-cover-image) center / cover;
          filter: sepia(.32) saturate(.72) contrast(.92);
        }

        .dy-card-body,
        .dy-message {
          position: relative;
          z-index: 1;
          padding: 28px 32px 30px;
        }

        .dy-meta {
          display: flex;
          gap: 14px;
          flex-wrap: wrap;
          margin-bottom: 12px;
          color: #6a1613;
          font-size: 14px;
          font-weight: 700;
        }

        .dy-card h1,
        .dy-card h2 {
          margin: 0;
          color: #2a120f;
          line-height: 1.42;
          font-weight: 700;
        }

        .dy-card h1 { font-size: 28px; }
        .dy-card h2 { font-size: 22px; }

        .dy-post-time {
          margin: 4px 0 12px;
          color: rgba(74, 36, 29, 0.52);
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 12px;
          line-height: 1.5;
        }

        .dy-card p {
          margin: 10px 0 0;
          color: #4a241d;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          line-height: 1.85;
        }

        .dy-signature {
          display: block;
          width: 100%;
          margin: 4px 0 20px;
          filter: sepia(.2) saturate(.9) contrast(.96);
        }

        .dy-investigation-photos {
          margin: 28px 0 0;
          display: grid;
          gap: 18px;
        }

        .dy-investigation-photo {
          margin: 0;
        }

        .dy-investigation-photo img {
          display: block;
          width: 100%;
          border: 1px solid rgba(106, 22, 19, 0.22);
          filter: sepia(.2) saturate(.82) contrast(.96);
        }

        .dy-investigation-photo figcaption {
          margin-top: 6px;
          color: rgba(74, 36, 29, 0.58);
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
        }

        .dy-archive-section {
          margin-top: 26px;
          padding-top: 18px;
          border-top: 1px dashed rgba(106, 22, 19, 0.22);
        }

        .dy-archive-section h2 {
          font-size: 18px;
        }

        .dy-read-more {
          display: inline-flex;
          align-items: center;
          height: 28px;
          margin-top: 6px;
          padding: 0 10px;
          border: 1px solid rgba(106, 22, 19, 0.36);
          background: #fff2bd;
          color: #6a1613;
          text-decoration: none;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          cursor: pointer;
        }

        .dy-read-more:hover {
          border-color: #6a1613;
          background: #f4dc83;
        }

        .dy-album-empty {
          max-width: 720px;
          min-height: 0;
          position: relative;
          display: block;
          padding: 18px 22px;
          overflow: hidden;
          background:
            repeating-linear-gradient(90deg, rgba(106, 22, 19, 0.05) 0 1px, transparent 1px 42px),
            #ffeaa0;
          border: 1px solid rgba(106, 22, 19, 0.2);
          box-shadow: none;
        }

        .dy-album-empty::before {
          content: "相册内容已被设置为不可见";
          position: relative;
          z-index: 1;
          color: #6a1613;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          line-height: 1.8;
        }

        .dy-album-empty::after {
          display: none;
        }

        .dy-album-slogan {
          position: relative;
          z-index: 1;
          margin: 12px 0 0;
          padding-top: 10px;
          border-top: 1px dotted rgba(106, 22, 19, 0.34);
          color: #4a241d;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 22px;
          line-height: 1.9;
          font-weight: 400;
          text-align: left;
          text-decoration: underline;
          text-decoration-thickness: 1px;
          text-underline-offset: 3px;
        }

        .dy-message-list {
          display: grid;
          gap: 0;
          border-top: 1px dotted rgba(106, 22, 19, 0.34);
        }

        .dy-message-section {
          max-width: 720px;
          padding: 18px 22px;
          background: rgba(255, 234, 160, 0.42);
          border: 1px solid rgba(106, 22, 19, 0.2);
          box-shadow: none;
        }

        .dy-message-section + .dy-message-section {
          margin-top: 28px;
        }

        .dy-message-section.archive { background: rgba(255, 234, 160, 0.36); }
        .dy-message-section.board { background: rgba(255, 242, 189, 0.5); }

        .dy-message-list .dy-card,
        .dy-message-section.board .dy-card {
          max-width: none;
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .dy-message-list .dy-card::after,
        .dy-message-section.board .dy-card::after {
          display: none;
        }

        .dy-message-list .dy-message {
          padding: 18px 0 20px;
          border-bottom: 1px dotted rgba(106, 22, 19, 0.34);
        }

        .dy-message-list .dy-meta {
          align-items: center;
          gap: 8px;
          margin-bottom: 8px;
          color: rgba(74, 36, 29, 0.62);
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 12px;
          font-weight: 400;
          line-height: 1.4;
        }

        .dy-message-list .dy-meta span:first-child,
        .dy-reply strong {
          display: inline-block;
          padding: 2px 6px;
          border-radius: 2px;
          background: #7b1713;
          color: #ffeaa0;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.25;
        }

        .dy-message-list .dy-meta span:last-child {
          color: rgba(74, 36, 29, 0.58);
          font-size: 12px;
          font-weight: 400;
        }

        .dy-message-list .dy-message p {
          margin-top: 8px;
          font-size: 13px;
          line-height: 1.75;
        }

        .dy-message-section.board .dy-message {
          padding: 0;
        }

        .dy-message-section.board .dy-card-stamp {
          display: none;
        }

        .dy-message-section.board h1 {
          margin: 0 0 8px;
          color: #2a120f;
          font-size: 18px;
          line-height: 1.4;
        }

        .dy-message-section.board p {
          margin: 0;
          color: #4a241d;
          font-family: Arial, "Microsoft YaHei", sans-serif;
          font-size: 13px;
          line-height: 1.8;
        }

        .dy-map-card {
          margin: 0 0 18px;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .dy-map-viewport {
          position: relative;
          width: 100%;
          aspect-ratio: 1440 / 780;
          overflow: hidden;
          touch-action: none;
          overscroll-behavior: contain;
          cursor: grab;
          user-select: none;
        }

        .dy-map-viewport:active { cursor: grabbing; }

        .dy-map-image {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transform-origin: center;
          will-change: transform;
          filter: sepia(.16) saturate(.82) contrast(.96);
        }

        .dy-map-controls {
          position: absolute;
          right: 12px;
          bottom: 12px;
          display: grid;
          gap: 6px;
        }

        .dy-map-controls button {
          min-width: 28px;
          height: 32px;
          border: 1px solid rgba(106, 22, 19, 0.42);
          background: rgba(255, 242, 189, 0.88);
          color: #6a1613;
          font-family: inherit;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
        }

        .dy-map-controls button:hover {
          background: #6a1613;
          color: #ffeaa0;
        }

        .dy-message-form {
          margin-top: 12px;
          display: grid;
          gap: 8px;
          padding-top: 10px;
          border-top: 1px dotted rgba(106, 22, 19, 0.32);
        }

        .dy-message-form textarea {
          min-height: 84px;
          resize: vertical;
          padding: 7px 8px;
          line-height: 1.6;
        }

        .dy-replies {
          margin-top: 12px;
          display: grid;
          gap: 8px;
        }

        .dy-reply {
          margin-left: 28px;
          padding: 8px 0 8px 14px;
          border-left: 2px solid #6a1613;
          background: transparent;
          box-shadow: none;
        }

        .dy-reply strong {
          display: inline-block;
          margin-bottom: 4px;
        }

        .dy-reply p { margin: 0; }


        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-blog {
            background:
              radial-gradient(circle at 52% 0%, rgba(255, 255, 255, 0.38), transparent 36%),
              linear-gradient(90deg, rgba(106, 22, 19, 0.045) 1px, transparent 1px),
              linear-gradient(180deg, #f4dc83 0%, #d1a943 100%);
            background-size: auto, 42px 42px, auto;
          }

          .hh-input-mode-touch .dy-page {
            width: min(100%, 720px);
            padding: 32px 18px 72px;
            --dy-top-offset: 32px;
          }

          .hh-input-mode-touch .dy-shell {
            padding-right: 0;
          }

          .hh-input-mode-touch .dy-shell::before {
            display: none;
          }

          .hh-input-mode-touch .dy-topline {
            position: relative;
            max-width: none;
            min-height: 78px;
            margin-bottom: 0;
            display: grid;
            grid-template-columns: minmax(0, 1fr) 40px;
            align-items: start;
            gap: 10px;
          }

          .hh-input-mode-touch .dy-brand {
            width: fit-content;
            height: 38px;
            margin-top: 4px;
            box-shadow: none;
          }

          .hh-input-mode-touch .dy-brand strong {
            padding: 0 18px;
            font-size: clamp(20px, 6.2vw, 27px);
            line-height: 1;
          }

          .hh-input-mode-touch .dy-tagline {
            grid-column: 1 / -1;
            max-width: 18em;
            margin-top: -20px;
            color: #6a1613;
            font-size: clamp(12px, 3.7vw, 15px);
            line-height: 1.5;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .hh-input-mode-touch .dy-menu-toggle {
            position: static !important;
            top: auto !important;
            right: auto !important;
            width: 38px;
            height: 38px;
            margin-top: 4px;
            border: 2px solid #6a1613;
            border-radius: 6px;
            background: #ffeaa0;
            box-shadow: none;
            color: #6a1613;
            font-size: 18px;
            z-index: 70;
            touch-action: manipulation;
          }

          .hh-input-mode-touch .dy-sidebar,
          .hh-input-mode-touch .dy-search-panel {
            position: absolute;
            top: 82px;
            left: 0;
            right: 0;
            width: auto;
            height: auto;
            max-height: 48vh;
            overflow: auto;
            margin: 0;
            padding: 8px 14px 10px;
            background: linear-gradient(180deg, rgba(255,255,255,.22), transparent 48%), #ffeaa0;
            border: 1px solid rgba(106, 22, 19, 0.32);
            box-shadow: 5px 7px 0 rgba(106, 22, 19, 0.13);
            transform: translateY(0);
            animation: none;
            z-index: 60;
          }

          .hh-input-mode-touch .dy-sidebar.closed {
            opacity: 0;
            visibility: hidden;
            pointer-events: none;
            transform: translateY(-10px);
          }

          .hh-input-mode-touch .dy-sidebar::before,
          .hh-input-mode-touch .dy-sidebar::after,
          .hh-input-mode-touch .dy-search-panel::before,
          .hh-input-mode-touch .dy-search-panel::after {
            display: none;
          }

          .hh-input-mode-touch .dy-side-button {
            position: relative;
            min-height: 34px;
            display: grid;
            grid-template-columns: 24px minmax(0, 1fr) 12px;
            align-items: center;
            gap: 8px;
            padding: 0;
            border-bottom: 0;
            color: #3a1713;
            justify-items: start;
            text-align: left;
            font-size: clamp(13px, 4vw, 17px);
            line-height: 1.2;
          }

          .hh-input-mode-touch .dy-side-button::before {
            content: "";
            position: absolute;
            left: 32px;
            right: 0;
            bottom: 0;
            height: 0;
            border-top: 1px solid rgba(106, 22, 19, 0.2);
          }

          .hh-input-mode-touch .dy-side-button::after {
            content: "›";
            justify-self: end;
            align-self: center;
            color: #3a1713;
            font-size: 18px;
            line-height: 1;
          }

          .hh-input-mode-touch .dy-side-button:last-child::before {
            display: none;
          }

          .hh-input-mode-touch .dy-side-icon {
            width: 24px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            line-height: 1;
          }
          .hh-input-mode-touch .dy-search-panel {
            z-index: 80;
          }

          .hh-input-mode-touch .dy-search-close,
          .hh-input-mode-touch .dy-search-title {
            display: none;
          }

          .hh-input-mode-touch .dy-search-panel form {
            grid-template-columns: minmax(0, 1fr) 38px;
            gap: 0;
            margin-bottom: 20px;
          }

          .hh-input-mode-touch .dy-search-panel input {
            height: 38px;
            padding: 0 16px;
            border: 2px solid rgba(106, 22, 19, 0.5);
            border-right: 0;
            border-radius: 6px 0 0 6px;
            background: rgba(255, 247, 203, 0.68);
            font-size: clamp(13px, 4vw, 16px);
          }

          .hh-input-mode-touch .dy-search-panel button[type="submit"] {
            height: 38px;
            border: 2px solid rgba(106, 22, 19, 0.5);
            border-left: 0;
            border-radius: 0 6px 6px 0;
            background: rgba(255, 247, 203, 0.68);
            color: #6a1613;
            font-size: 0;
          }

          .hh-input-mode-touch .dy-search-panel button[type="submit"]::before {
            content: "⌕";
            font-size: 21px;
            line-height: 1;
          }

          .hh-input-mode-touch .dy-search-panel .dy-search-menu-links {
            display: grid;
            gap: 0;
            margin: 0 0 12px;
            padding-bottom: 10px;
            border-bottom: 1px solid rgba(106, 22, 19, 0.3);
          }

          .hh-input-mode-touch .dy-search-panel .dy-search-menu-links .dy-side-button {
            min-height: 34px;
            border-bottom: 0;
          }

          .hh-input-mode-touch .dy-recent-searches {
            display: grid;
            gap: 12px;
          }

          .hh-input-mode-touch .dy-recent-title {
            color: #6a1613;
            font-size: clamp(13px, 3.9vw, 16px);
            font-weight: 700;
          }

          .hh-input-mode-touch .dy-recent-list {
            display: flex;
            flex-wrap: wrap;
            gap: 10px 16px;
          }

          .hh-input-mode-touch .dy-recent-chip {
            min-height: 34px;
            padding: 0 14px;
            border: 1px solid rgba(106, 22, 19, 0.36);
            border-radius: 5px;
            background: rgba(255, 239, 171, 0.78);
            color: #3a1713;
            font: inherit;
            font-size: clamp(12px, 3.7vw, 15px);
          }

          .hh-input-mode-touch .dy-card,
          .hh-input-mode-touch .dy-album-empty,
          .hh-input-mode-touch .dy-message-section,
          .hh-input-mode-touch .dy-search-results {
            max-width: none;
          }
        }
        @media (max-width: 1120px) {
          .dy-shell { padding-right: 190px; }
          .dy-menu-toggle { right: 210px; }
          .dy-sidebar { right: 28px; }
        }

        @media (max-width: 820px) {
          .dy-page {
            padding: 56px 18px 72px;
            --dy-top-offset: 56px;
          }
          .dy-shell { padding-right: 0; }
          .dy-topline {
            margin-bottom: 44px;
            align-items: flex-start;
            flex-direction: column;
            gap: 10px;
          }
          .dy-brand strong { font-size: 23px; }
          .dy-tagline {
            font-size: 15px;
            white-space: normal;
          }
          .dy-menu-toggle {
            right: 174px;
            background: rgba(255, 234, 160, 0.86);
          }
          .dy-sidebar {
            right: 18px;
            width: 124px;
            padding: 18px 12px;
            gap: 9px;
          }
          .dy-side-button { font-size: 13px; }
          .dy-card,
          .dy-album-empty,
          .dy-message-section,
          .dy-search-results { max-width: none; }
          .dy-cover { height: 220px; }
        }

        @media (max-width: 560px) {
          .dy-brand { height: 42px; }
          .dy-brand strong {
            padding: 0 12px;
            font-size: 21px;
          }
          .dy-menu-toggle {
            right: 148px;
            width: 32px;
            height: 32px;
            font-size: 21px;
          }
          .dy-sidebar {
            width: 112px;
            right: 14px;
            padding: 16px 10px;
          }
          .dy-side-button {
            min-height: 30px;
            gap: 6px;
            padding: 0 4px;
            font-size: 13px;
          }
          .dy-cover { height: 185px; }
          .dy-card-body,
          .dy-message { padding: 22px 20px 24px; }
          .dy-card h1 { font-size: 23px; }
          .dy-card p { font-size: 13px; }
          .dy-album-slogan { font-size: 26px; }
        }

        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-album-empty,
          .hh-input-mode-touch .dy-search-results,
          .hh-input-mode-touch .dy-message-section {
            padding: 14px 16px;
          }

          .hh-input-mode-touch .dy-album-empty::before {
            font-size: clamp(12px, 3.6vw, 14px);
            line-height: 1.6;
          }

          .hh-input-mode-touch .dy-album-slogan {
            margin-top: 10px;
            padding-top: 8px;
            font-size: clamp(15px, 4.5vw, 19px) !important;
            line-height: 1.75;
            text-underline-offset: 2px;
          }

          .hh-input-mode-touch .dy-search-heading {
            padding-bottom: 10px;
          }

          .hh-input-mode-touch .dy-search-heading h1,
          .hh-input-mode-touch .dy-search-history h2 {
            font-size: clamp(18px, 5.5vw, 23px);
            line-height: 1.35;
          }

          .hh-input-mode-touch .dy-search-heading p,
          .hh-input-mode-touch .dy-no-results,
          .hh-input-mode-touch .dy-message-section.board p,
          .hh-input-mode-touch .dy-message-list .dy-message p {
            font-size: clamp(12px, 3.7vw, 15px);
            line-height: 1.75;
          }

          .hh-input-mode-touch .dy-search-history {
            padding: 10px 0 12px;
          }

          .hh-input-mode-touch .dy-search-history-list {
            gap: 6px;
          }

          .hh-input-mode-touch .dy-search-history-item,
          .hh-input-mode-touch .dy-result-type,
          .hh-input-mode-touch .dy-message-list .dy-meta,
          .hh-input-mode-touch .dy-message-list .dy-meta span:first-child,
          .hh-input-mode-touch .dy-message-list .dy-meta span:last-child,
          .hh-input-mode-touch .dy-reply strong {
            font-size: clamp(10px, 3.2vw, 12px);
          }

          .hh-input-mode-touch .dy-result-card,
          .hh-input-mode-touch .dy-no-results,
          .hh-input-mode-touch .dy-message-list .dy-message {
            padding: 10px 0 12px;
          }

          .hh-input-mode-touch .dy-result-card h2,
          .hh-input-mode-touch .dy-image-links,
          .hh-input-mode-touch .dy-deleted-resource {
            font-size: clamp(14px, 4.3vw, 17px);
            line-height: 1.55;
          }

          .hh-input-mode-touch .dy-message-section.board h1 {
            font-size: clamp(18px, 5.6vw, 22px);
            line-height: 1.35;
          }

          .hh-input-mode-touch .dy-message-form input,
          .hh-input-mode-touch .dy-message-form textarea,
          .hh-input-mode-touch .dy-message-form button {
            font-size: clamp(12px, 3.7vw, 15px);
          }
        }

        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-search-results .dy-search-heading h1,
          .hh-input-mode-touch .dy-search-results .dy-search-history h2,
          .hh-input-mode-touch .dy-message-section.board h1 {
            font-size: clamp(16px, 4.9vw, 18px) !important;
            line-height: 1.35 !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-search-heading p,
          .hh-input-mode-touch .dy-message-section.board p,
          .hh-input-mode-touch .dy-message-list .dy-message p {
            font-size: clamp(11px, 3.45vw, 13px) !important;
            line-height: 1.65 !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-result-card h2,
          .hh-input-mode-touch .dy-search-results .dy-image-links,
          .hh-input-mode-touch .dy-search-results .dy-deleted-resource {
            font-size: clamp(13px, 4vw, 15px) !important;
            line-height: 1.48 !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-image-result-card .dy-result-type {
            margin-bottom: 5px !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-image-result-card .dy-image-links {
            display: flex !important;
            flex-wrap: wrap !important;
            margin-top: 0 !important;
            gap: 4px 10px !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-image-result-card .dy-image-links a {
            display: inline !important;
            color: #4a241d !important;
            text-decoration: underline !important;
            text-decoration-thickness: 1px !important;
            text-underline-offset: 3px !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-result-card,
          .hh-input-mode-touch .dy-search-results .dy-no-results,
          .hh-input-mode-touch .dy-message-list .dy-message {
            padding: 8px 0 10px !important;
          }

          .hh-input-mode-touch .dy-search-results .dy-search-history-item,
          .hh-input-mode-touch .dy-search-results .dy-result-type,
          .hh-input-mode-touch .dy-message-list .dy-meta,
          .hh-input-mode-touch .dy-message-list .dy-meta span:first-child,
          .hh-input-mode-touch .dy-message-list .dy-meta span:last-child {
            font-size: clamp(9px, 2.9vw, 11px) !important;
          }

          .hh-input-mode-touch .dy-message-form input,
          .hh-input-mode-touch .dy-message-form textarea,
          .hh-input-mode-touch .dy-message-form button {
            font-size: clamp(11px, 3.45vw, 13px) !important;
          }
        }


        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-deleted-modal-backdrop,
          .dy-page .dy-deleted-modal-backdrop {
            position: fixed !important;
            inset: 0 !important;
            display: grid !important;
            place-items: center !important;
            padding: 16px !important;
          }

          .hh-input-mode-touch .dy-deleted-modal,
          .dy-page .dy-deleted-modal {
            width: min(300px, calc(100vw - 36px)) !important;
            margin: 0 auto !important;
            padding: 18px 20px 17px !important;
            box-shadow: 5px 7px 0 rgba(106, 22, 19, 0.18), 0 12px 28px rgba(42, 18, 15, 0.24) !important;
            transform: none !important;
          }

          .hh-input-mode-touch .dy-deleted-modal::after,
          .dy-page .dy-deleted-modal::after {
            inset: 8px !important;
          }

          .hh-input-mode-touch .dy-deleted-modal h2,
          .dy-page .dy-deleted-modal h2 {
            font-size: clamp(17px, 5vw, 20px) !important;
            line-height: 1.3 !important;
            margin-bottom: 9px !important;
          }

          .hh-input-mode-touch .dy-deleted-modal p,
          .dy-page .dy-deleted-modal p {
            font-size: clamp(12px, 3.6vw, 14px) !important;
            line-height: 1.65 !important;
          }

          .hh-input-mode-touch .dy-deleted-modal button,
          .dy-page .dy-deleted-modal button {
            height: 28px !important;
            margin-top: 15px !important;
            padding: 0 12px !important;
            font-size: clamp(11px, 3.3vw, 13px) !important;
          }
        }

        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-message-section.archive {
            padding: 14px 16px !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-card h1 {
            font-size: clamp(18px, 5.2vw, 22px) !important;
            line-height: 1.25 !important;
            margin: 6px 0 2px !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-card p {
            font-size: clamp(11px, 3.4vw, 13px) !important;
            line-height: 1.55 !important;
            margin-top: 6px !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-card > h1:first-child,
          .hh-input-mode-touch .dy-message-section.archive > h1 {
            font-size: clamp(21px, 6.2vw, 26px) !important;
            line-height: 1.25 !important;
          }

          .hh-input-mode-touch .dy-message-list .dy-meta,
          .hh-input-mode-touch .dy-message-list .dy-meta span:first-child,
          .hh-input-mode-touch .dy-message-list .dy-meta span:last-child {
            font-size: clamp(8px, 2.65vw, 10px) !important;
          }
        }

        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-message-section.archive {
            padding: 12px 14px !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-message {
            padding: 10px 0 12px !important;
          }

          .hh-input-mode-touch .dy-message-section.archive > h1,
          .hh-input-mode-touch .dy-message-section.archive .dy-message-list + h1 {
            font-size: clamp(18px, 5vw, 22px) !important;
            line-height: 1.25 !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-message p,
          .hh-input-mode-touch .dy-message-section.archive .dy-message-list .dy-message p {
            font-size: clamp(13px, 3.8vw, 16px) !important;
            line-height: 1.35 !important;
            margin: 6px 0 0 !important;
            font-weight: 700 !important;
          }

          .hh-input-mode-touch .dy-message-section.archive .dy-meta,
          .hh-input-mode-touch .dy-message-section.archive .dy-meta span:first-child,
          .hh-input-mode-touch .dy-message-section.archive .dy-meta span:last-child {
            font-size: clamp(8px, 2.45vw, 10px) !important;
            line-height: 1.15 !important;
          }
        }

        .hh-input-mode-touch .dy-menu-toggle,
        .hh-input-mode-touch .dy-search-close {
          aspect-ratio: 1 / 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          line-height: 1;
          text-align: center;
        }

        .hh-input-mode-touch .dy-menu-toggle {
          width: 36px;
          height: 36px;
          font-size: 17px;
        }

        .hh-input-mode-touch .dy-search-close {
          width: 36px;
          height: 36px;
          margin-bottom: 28px;
          font-size: 20px;
        }

        .hh-input-mode-touch .dy-menu-toggle > span,
        .hh-input-mode-touch .dy-search-close > span {
          display: inline-block;
          line-height: 1;
        }
        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-map-controls {
            display: none;
          }
        }

        .hh-input-mode-touch .dy-map-controls {
          display: none !important;
        }

        @media (min-width: 821px) {
          .hh-input-mode-touch .dy-page {
            width: min(100%, 1180px);
            padding: 56px 48px 86px;
            --dy-top-offset: 56px;
          }

          .hh-input-mode-touch .dy-shell {
            padding-right: 360px;
          }

          .hh-input-mode-touch .dy-topline {
            max-width: 720px;
            margin-bottom: 54px;
          }

          .hh-input-mode-touch .dy-brand,
          .hh-input-mode-touch .dy-menu-toggle {
            box-shadow: none;
          }

          .hh-input-mode-touch .dy-menu-toggle {
            position: fixed;
            top: var(--dy-top-offset);
            right: calc((100vw - min(100vw, 1180px)) / 2 + 402px);
            width: 36px;
            height: 36px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 17px;
          }

          .hh-input-mode-touch .dy-sidebar {
            position: fixed;
            top: calc(var(--dy-top-offset) + 44px);
            right: calc((100vw - min(100vw, 1180px)) / 2 + 48px);
            width: min(390px, calc(100vw - 96px));
            height: auto;
            max-height: min(430px, calc(100vh - var(--dy-top-offset) - 84px));
            padding: 22px 26px;
            gap: 10px;
            overflow: auto;
            background: linear-gradient(180deg, rgba(255,255,255,.26), transparent 48%), #ffeaa0;
            border: 1px solid rgba(106, 22, 19, 0.32);
            box-shadow: 6px 8px 0 rgba(106, 22, 19, 0.13);
          }

          .hh-input-mode-touch .dy-search-panel {
            position: fixed;
            top: calc(var(--dy-top-offset) + 44px);
            right: calc((100vw - min(100vw, 1180px)) / 2 + 48px);
            width: min(390px, calc(100vw - 96px));
            height: auto;
            max-height: min(460px, calc(100vh - var(--dy-top-offset) - 84px));
            padding: 28px 30px 30px;
            overflow: auto;
            background: linear-gradient(180deg, rgba(255,255,255,.28), transparent 42%), #ffeaa0;
            border: 1px solid rgba(106, 22, 19, 0.28);
            box-shadow: 6px 8px 0 rgba(106, 22, 19, 0.13);
            animation: none;
          }

          .hh-input-mode-touch .dy-search-panel .dy-search-menu-links {
            display: none;
          }

          .hh-input-mode-touch .dy-search-title {
            display: block;
            margin: 0 0 16px;
            font-size: 18px;
          }

          .hh-input-mode-touch .dy-search-close {
            position: absolute;
            top: 18px;
            right: 18px;
            width: 34px;
            height: 34px;
            margin: 0;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 19px;
          }

          .hh-input-mode-touch .dy-search-panel form {
            grid-template-columns: minmax(0, 1fr) 66px;
            gap: 10px;
            margin-bottom: 18px;
          }

          .hh-input-mode-touch .dy-search-panel input,
          .hh-input-mode-touch .dy-search-panel button[type="submit"] {
            height: 34px;
            border: 1px solid rgba(106, 22, 19, 0.36);
            border-radius: 4px;
            font-size: 13px;
          }

          .hh-input-mode-touch .dy-search-panel button[type="submit"] {
            background: #6a1613;
            color: #ffeaa0;
            font-size: 13px;
          }

          .hh-input-mode-touch .dy-search-panel button[type="submit"]::before {
            content: none;
          }
        }
        /* dy-touch-wide-search-panel */

        @media (max-width: 820px) {
          .hh-input-mode-touch .dy-search-panel {
            max-height: none;
            overflow: visible;
          }

          .hh-input-mode-touch .dy-search-panel .dy-search-close {
            display: none !important;
          }

          .hh-input-mode-touch .dy-search-panel form {
            margin-bottom: 12px;
          }

          .hh-input-mode-touch .dy-search-panel .dy-search-menu-links {
            margin-bottom: 10px;
            padding-bottom: 8px;
          }
        }
        /* dy-touch-compact-search-close-fix */

        .hh-input-mode-touch .dy-card-body img:not(.dy-map-image),
        .hh-input-mode-touch .dy-investigation-photo img,
        .hh-input-mode-touch .dy-signature {
          cursor: zoom-in;
        }

        .dy-image-preview-backdrop {
          position: fixed;
          inset: 0;
          z-index: 130;
          display: grid;
          place-items: center;
          padding: 18px;
          background: rgba(42, 18, 15, 0.72);
        }

        .dy-image-preview-dialog {
          position: relative;
          max-width: min(94vw, 980px);
          max-height: 88vh;
          display: grid;
          place-items: center;
        }

        .dy-image-preview-dialog img {
          display: block;
          max-width: 100%;
          max-height: 88vh;
          object-fit: contain;
          background: #1d100e;
          box-shadow: 0 18px 48px rgba(0, 0, 0, 0.34);
        }

        .dy-image-preview-close {
          position: absolute;
          top: -12px;
          right: -12px;
          width: 34px;
          height: 34px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0;
          border: 1px solid rgba(106, 22, 19, 0.58);
          background: #ffeaa0;
          color: #6a1613;
          font-family: inherit;
          font-size: 22px;
          line-height: 1;
        }


        .hh-input-mode-touch .dy-recent-list {
          display: flex !important;
          flex-wrap: wrap !important;
          gap: 8px 10px !important;
          align-items: flex-start !important;
        }

        .hh-input-mode-touch .dy-recent-chip {
          appearance: none !important;
          width: auto !important;
          min-width: 128px !important;
          max-width: 100% !important;
          height: 34px !important;
          min-height: 34px !important;
          max-height: 34px !important;
          padding: 0 18px !important;
          display: inline-flex !important;
          align-items: center !important;
          justify-content: center !important;
          border: 1px solid rgba(106, 22, 19, 0.34) !important;
          border-radius: 4px !important;
          background: rgba(255, 239, 171, 0.62) !important;
          color: #3a1713 !important;
          line-height: 1 !important;
          box-shadow: none !important;
          overflow: hidden !important;
          text-overflow: ellipsis !important;
          white-space: nowrap !important;
        }

        @media (min-width: 821px) {
          .hh-input-mode-touch .dy-page {
            --dy-touch-aside: clamp(300px, 33vw, 420px);
            --dy-touch-gap: 32px;
          }

          .hh-input-mode-touch .dy-shell {
            padding-right: calc(var(--dy-touch-aside) + var(--dy-touch-gap)) !important;
          }

          .hh-input-mode-touch .dy-topline {
            max-width: calc(100% - var(--dy-touch-aside) - var(--dy-touch-gap)) !important;
            padding-right: 0;
          }

          .hh-input-mode-touch .dy-menu-toggle {
            position: absolute !important;
            top: 0 !important;
            right: calc(var(--dy-touch-aside) + 16px) !important;
          }

          .hh-input-mode-touch .dy-sidebar,
          .hh-input-mode-touch .dy-search-panel {
            position: absolute !important;
            top: 0 !important;
            right: 0 !important;
            width: var(--dy-touch-aside) !important;
            max-height: none !important;
          }

          .hh-input-mode-touch .dy-search-panel {
            padding: 28px 30px 30px;
            overflow: visible;
          }

          .hh-input-mode-touch .dy-search-panel form {
            grid-template-columns: minmax(0, 1fr) 66px;
            gap: 10px;
          }

          .hh-input-mode-touch .dy-search-panel input,
          .hh-input-mode-touch .dy-search-panel button[type="submit"] {
            width: 100%;
            min-width: 0;
          }

          .hh-input-mode-touch .dy-search-panel .dy-recent-list {
            gap: 8px 10px;
          }

          .hh-input-mode-touch .dy-search-panel .dy-recent-chip {
            min-width: min(160px, 100%);
            max-width: 100%;
          }
        }
      `}</style>

      <main className="dy-page">
        <div className="dy-shell">
          <div className="dy-topline">
            <Link className="dy-brand" to="/p/71a6d0e2bf">
              <strong>东阳旧事</strong>
            </Link>
            <button
              className="dy-menu-toggle"
              type="button"
              aria-label={sidebarOpen ? '收起侧边栏' : '展开侧边栏'}
              aria-expanded={sidebarOpen}
              onMouseEnter={() => {
                if (!isTouchMode) {
                  openSidebar();
                }
              }}
              onMouseLeave={() => {
                if (!isTouchMode) {
                  closeSidebarSoon();
                }
              }}
              onClick={() => {
                if (closeTimer.current) {
                  window.clearTimeout(closeTimer.current);
                }
                setSearchOpen(false);
                setSidebarOpen((open) => !open);
              }}
            >
              ☰
            </button>
            <span className="dy-tagline">一个记者，只写给自己看的手札记录</span>
          </div>

          <nav
            className={`dy-sidebar${sidebarOpen ? '' : ' closed'}`}
            aria-label="东阳旧事侧边栏"
            onMouseEnter={() => {
              if (!isTouchMode) {
                openSidebar();
              }
            }}
            onMouseLeave={() => {
              if (!isTouchMode) {
                closeSidebarSoon();
              }
            }}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setSidebarOpen(false);
              }
            }}
          >
            {menuItems.map((item) =>
              item.action === 'search' ? (
                <button
                  className="dy-side-button"
                  type="button"
                  key={item.label}
                  onClick={() => {
                    setSearchKeyword('');
                    setSearchOpen(true);
                    setSidebarOpen(false);
                    setRecentSearches(readSearchHistory(SEARCH_HISTORY_KEY).slice(0, 3));
                  }}
                >
                  <span className="dy-side-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ) : (
                <Link className="dy-side-button" to={item.href} key={item.label}>
                  <span className="dy-side-icon" aria-hidden="true">{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              )
            )}
          </nav>

          {searchOpen && (
            <section className="dy-search-panel" aria-label="站内搜索">
              <button
                className="dy-search-close"
                type="button"
                aria-label="关闭搜索"
                onClick={() => setSearchOpen(false)}
              >
                ×
              </button>
              <h2 className="dy-search-title">搜索</h2>
              <form onSubmit={submitSearch}>
                <input
                  type="search"
                  placeholder="输入关键词"
                  value={searchKeyword}
                  onChange={(event) => setSearchKeyword(event.target.value)}
                  autoFocus
                />
                <button type="submit">搜索</button>
              </form>
              <div className="dy-search-menu-links" aria-label="东阳旧事菜单">
                {menuItems.filter((item) => item.action !== 'search').map((item) => (
                  <Link
                    className="dy-side-button"
                    to={item.href}
                    key={`search-${item.label}`}
                    onClick={() => setSearchOpen(false)}
                  >
                    <span className="dy-side-icon" aria-hidden="true">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                ))}
              </div>
              {recentSearches.length ? (
                <div className="dy-recent-searches" aria-label="最近搜索">
                  <div className="dy-recent-title">最近搜索</div>
                  <div className="dy-recent-list">
                    {recentSearches.map((item) => (
                      <button
                        className="dy-recent-chip"
                        type="button"
                        key={`${item.keyword}-${item.searchedAt}`}
                        onClick={() => {
                          setSearchOpen(false);
                          navigate(`/p/71a6d0e2bf/search?q=${encodeURIComponent(item.keyword)}`);
                        }}
                      >
                        {item.keyword}
                      </button>
                    ))}
                  </div>
                </div>
              ) : null}
            </section>
          )}

          {children}
        </div>
      </main>
      {imagePreview ? (
        <div className="dy-image-preview-backdrop" role="presentation" onClick={() => setImagePreview(null)}>
          <div
            className="dy-image-preview-dialog"
            role="dialog"
            aria-modal="true"
            aria-label={imagePreview.alt}
            onClick={(event) => event.stopPropagation()}
          >
            <img src={imagePreview.src} alt={imagePreview.alt} />
          </div>
        </div>
      ) : null}

    </div>
  );
}

export default function DongyangOldStoriesBlog() {
  return (
    <DongyangOldStoriesLayout>
      <article className="dy-card">
        <div
          className="dy-cover"
          style={{ '--dy-cover-image': `url("${publicPath('images/blog/LHY.jpg')}")` }}
          aria-hidden="true"
        />
        <div className="dy-card-body">
          <h1>讣告</h1>
          <div className="dy-post-time">2016-04-20 09:00</div>
          <p>各位读者：</p>
          <p>
            我们怀着沉重的心情通知大家，“东阳旧事”博客作者、前《明川晚报》记者李宏宇先生，
            已于2016年4月17日晚因交通事故不幸离世，终年47岁。
          </p>
          <p>
            事故发生于明川市西郊环山公路，因当日持续降雨，路面湿滑，车辆失控后撞击护栏，
            经医院抢救无效，于次日凌晨确认死亡。
          </p>
          <p>
            李宏宇先生曾长期任职于《明川晚报》社会新闻部，从事地方新闻与社会调查报道工作，
            期间参与多起民生事件及大案追踪。后于2006年离职成为独立撰稿人，持续记录明川本地历史、
            地方县志、民间志怪等相关内容，十年间未曾间断。
          </p>
          <p>他很少谈论自己，比起“记者”这个身份，他更像一个替别人保存故事的人。</p>
          <p>因为此意外，本博客将不再继续更新，部分涉及他人隐私的手记会转为隐藏。</p>
          <p>不便具名的旧人 敬告</p>
        </div>
      </article>
    </DongyangOldStoriesLayout>
  );
}

export function DongyangOldStoriesAlbum() {
  return (
    <DongyangOldStoriesLayout>
      <section className="dy-album-empty" aria-label="东阳旧事相册">
        <p className="dy-album-slogan">
          本博客收录了明川市历代方志、舆图、碑刻及民间文献，兼存考辨异闻、案狱旧档，供文史研究者参考，也欢迎历史爱好者参与讨论。
        </p>
        <p className="dy-album-slogan">
          如需了解相关历史资料，可通过搜索功能查询。
        </p>
      </section>
    </DongyangOldStoriesLayout>
  );
}

export function DongyangOldStoriesSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const results = searchDongyangBlog(keyword);
  const resultCount = results.length;
  const [deletedResourceOpen, setDeletedResourceOpen] = useState(false);
  const [searchHistory, setSearchHistory] = useState(() =>
    readSearchHistory(SEARCH_HISTORY_KEY)
  );

  useEffect(() => {
    const normalized = keyword.trim();

    if (!normalized) {
      return;
    }

    // eslint-disable-next-line react-hooks/set-state-in-effect -- Reflect the localStorage write immediately after this query resolves.
    setSearchHistory(recordSearchHistory(SEARCH_HISTORY_KEY, normalized, resultCount > 0));
  }, [keyword, resultCount]);

  const handleSearchHistoryItem = (historyKeyword) => {
    navigate(`/p/71a6d0e2bf/search?q=${encodeURIComponent(historyKeyword)}`);
  };

  return (
    <DongyangOldStoriesLayout>
      <section className="dy-search-results" aria-label="东阳旧事搜索结果">
        <article className="dy-search-heading">
          <h1>搜索结果</h1>
          <p>检索对象：{keyword || '未输入'}</p>
        </article>

        <SearchHistoryPanel history={searchHistory} onSearch={handleSearchHistoryItem} />

        {results.length > 0 ? (
          results.map((item) =>
            item.type === 'image' ? (
              <article className="dy-result-card dy-image-result-card" key={item.id}>
                <p className="dy-result-type">图片资源 | {item.date}</p>
                <h2 className="dy-image-links">
                  {(item.paths || [item.path]).map((path, index) => (
                    <ImageResourceLink path={path} key={path}>
                      查看图片{(item.paths || []).length > 1 ? index + 1 : ''}
                    </ImageResourceLink>
                  ))}
                  {item.downloadPath ? (
                    <a href={publicPath(item.downloadPath)} download={item.downloadName || true}>
                      查看译文
                    </a>
                  ) : null}
                </h2>
              </article>
            ) : item.type === 'text' ? (
              <a
                className="dy-result-card"
                href={routePath(item.path)}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
              >
                <p className="dy-result-type">文本资源 | {item.date}</p>
                <h2>{item.title}</h2>
              </a>
            ) : item.type === 'deleted' ? (
              <article className="dy-result-card dy-image-result-card" key={item.id}>
                <p className="dy-result-type">图片资源 | {item.date}</p>
                <h2 className="dy-image-links">
                  <button
                    className="dy-deleted-resource"
                    type="button"
                    onClick={() => setDeletedResourceOpen(true)}
                  >
                    查看图片
                  </button>
                </h2>
              </article>
            ) : (
              <a
                className="dy-result-card"
                href={routePath(item.path)}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
              >
                <p className="dy-result-type">博文链接 | {item.date}</p>
                <h2>{item.title}</h2>
              </a>
            )
          )
        ) : (
          <div className="dy-no-results">没有检索到相关内容。</div>
        )}
      </section>
      {deletedResourceOpen ? (
        <div
          className="dy-deleted-modal-backdrop"
          role="presentation"
          onClick={() => setDeletedResourceOpen(false)}
        >
          <section
            className="dy-deleted-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dy-deleted-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="dy-deleted-modal-title">资源不可用</h2>
            <p>该资源已被删除。</p>
            <button type="button" onClick={() => setDeletedResourceOpen(false)}>
              确定
            </button>
          </section>
        </div>
      ) : null}
    </DongyangOldStoriesLayout>
  );
}

export function DongyangOldStoriesMessages() {
  const [visitorName, setVisitorName] = useState('');
  const [messageText, setMessageText] = useState('');
  const [messageModal, setMessageModal] = useState(null);

  const handleMessageSubmit = (event) => {
    event.preventDefault();

    if (!visitorName.trim() || !messageText.trim()) {
      setMessageModal({
        title: '称呼或正文为空',
        text: '请输入完成后再提交。',
      });
      return;
    }

    savePlayerGuestbookMessage(visitorName, messageText);

    setMessageModal({
      title: '留言已暂存！',
      text: '感谢你的留言，内容已写入暂存箱。',
    });
  };

  return (
    <DongyangOldStoriesLayout>
      <section className="dy-message-section archive" aria-label="地图与历史留言">
        <InteractiveMap />

        <div className="dy-message-list">
          {messageItems.map((message) => (
            <article className="dy-card dy-message" key={`${message.name}-${message.date}`}>
              <div className="dy-meta">
                <span>{message.name}</span>
                <span>{message.date}</span>
              </div>
              <p>{message.text}</p>
              {message.replies && (
                <div className="dy-replies">
                  {message.replies.map((reply) => (
                    <div className="dy-reply" key={`${message.name}-${reply.author}`}>
                      <strong>{reply.author}</strong>
                      <p>{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="dy-message-section board" aria-label="留言板功能">
        <article className="dy-card dy-message">
          <span className="dy-card-stamp">读者来信</span>
          <h1>留言板</h1>
          <p>如果你知道某条旧闻的补充线索，可以先写在这里。本站不会公开真实联系方式。</p>
          <form className="dy-message-form" onSubmit={handleMessageSubmit}>
            <input
              type="text"
              placeholder="称呼"
              value={visitorName}
              onChange={(event) => setVisitorName(event.target.value)}
            />
            <textarea
              placeholder="留言内容"
              value={messageText}
              onChange={(event) => setMessageText(event.target.value)}
            />
            <button className="dy-read-more" type="submit">暂存留言</button>
          </form>
        </article>
      </section>

      {messageModal ? (
        <div
          className="dy-deleted-modal-backdrop"
          role="presentation"
          onClick={() => setMessageModal(null)}
        >
          <section
            className="dy-deleted-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="dy-message-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <h2 id="dy-message-modal-title">{messageModal.title}</h2>
            <p>{messageModal.text}</p>
            <button type="button" onClick={() => setMessageModal(null)}>
              确定
            </button>
          </section>
        </div>
      ) : null}
    </DongyangOldStoriesLayout>
  );
}
