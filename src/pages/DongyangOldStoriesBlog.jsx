import { useRef, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { publicPath } from '../utils/publicPath';

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
    type: 'image',
    title: '（图片）',
    paths: ['/images/明川县志1.jpg', '/images/明川县志2.jpg'],
    date: '明川县志',
    summary: '',
    keywords: ['明川县志'],
  },
  {
    id: 'mingchuan-waterways-addendum',
    type: 'image',
    title: '（图片）',
    paths: ['/images/明川水经补遗1.jpg', '/images/明川水经补遗2.jpg'],
    date: '明川水经补遗',
    summary: '',
    keywords: ['明川水经补遗'],
  },
  {
    id: 'dongyang-strange-cults-study',
    type: 'image',
    title: '（图片）',
    paths: ['/images/东阳异崇考1.jpg', '/images/东阳异崇考2.jpg'],
    downloadPath: '/images/复原译文.txt',
    downloadName: '复原译文.txt',
    date: '东阳异崇考',
    summary: '',
    keywords: ['两仪祠'],
  },
  {
    id: 'hidden-name-record',
    type: 'image',
    title: '（图片）',
    path: '/images/幽名别录.jpg',
    date: '幽名别录',
    summary: '',
    keywords: ['刘义庆'],
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
];

function normalizeKeyword(value) {
  return value.trim().toLowerCase();
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

function InteractiveMap() {
  const [view, setView] = useState({ scale: 1, x: 0, y: 0 });
  const viewportRef = useRef(null);
  const dragState = useRef(null);

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

    dragState.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      x: view.x,
      y: view.y,
    };
  };

  const handlePointerMove = (event) => {
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
    if (dragState.current?.pointerId === event.pointerId) {
      try {
        if (event.currentTarget.hasPointerCapture?.(event.pointerId)) {
          event.currentTarget.releasePointerCapture(event.pointerId);
        }
      } catch {
      }
      dragState.current = null;
    }
  };

  const handleLostPointerCapture = () => {
    dragState.current = null;
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
  const closeTimer = useRef(null);

  const submitSearch = (event) => {
    event.preventDefault();
    const normalized = searchKeyword.trim();

    if (!normalized) {
      return;
    }

    setSearchOpen(false);
    navigate(`/p/71a6d0e2bf/search?q=${encodeURIComponent(normalized)}`);
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

  return (
    <div className="dy-blog">
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
          font-size: 25px;
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
          font-size: 13px;
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
          grid-template-columns: minmax(0, 1fr) 54px;
          gap: 10px;
        }

        .dy-search-close {
          width: 44px;
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
          border: 1px solid rgba(106, 22, 19, 0.42);
          background: #6a1613;
          color: #ffeaa0;
          font-family: inherit;
          font-size: 15px;
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
          font-size: 13px;
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
          min-width: 42px;
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
          .dy-album-slogan { font-size: 13px; }
        }
      `}</style>

      <main className="dy-page">
        <div className="dy-shell">
          <div className="dy-topline">
            <Link className="dy-brand" to="/p/71a6d0e2bf">
              <strong>东阳旧事</strong>
            </Link>
            <span className="dy-tagline">一个记者，只写给自己看的手札记录</span>
          </div>

          <button
            className="dy-menu-toggle"
            type="button"
            aria-label={sidebarOpen ? '收起侧边栏' : '展开侧边栏'}
            aria-expanded={sidebarOpen}
            onMouseEnter={openSidebar}
            onMouseLeave={closeSidebarSoon}
            onFocus={openSidebar}
            onClick={() => setSidebarOpen((open) => !open)}
          >
            ☰
          </button>

          <nav
            className={`dy-sidebar${sidebarOpen ? '' : ' closed'}`}
            aria-label="东阳旧事侧边栏"
            onMouseEnter={openSidebar}
            onMouseLeave={closeSidebarSoon}
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
                    setSearchOpen(true);
                    setSidebarOpen(false);
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
            </section>
          )}

          {children}
        </div>
      </main>
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
            已于2016年4月17日晚因交通事故不幸离世，终年36岁。
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
          本网收录本邑历代方志、舆图、碑刻及民间文献，兼存考辨异闻、案狱旧档，供文史研究者参考。
          请务必了解相关历史资料。请务必了解相关历史资料。请务必了解相关历史资料。请务必了解相关历史资料。
        </p>
      </section>
    </DongyangOldStoriesLayout>
  );
}

export function DongyangOldStoriesSearch() {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('q') || '';
  const results = searchDongyangBlog(keyword);
  const [deletedResourceOpen, setDeletedResourceOpen] = useState(false);

  return (
    <DongyangOldStoriesLayout>
      <section className="dy-search-results" aria-label="东阳旧事搜索结果">
        <article className="dy-search-heading">
          <h1>搜索结果</h1>
          <p>检索对象：{keyword || '未输入'}</p>
        </article>

        {results.length > 0 ? (
          results.map((item) =>
            item.type === 'image' ? (
              <article className="dy-result-card" key={item.id}>
                <p className="dy-result-type">图片资源 | {item.date}</p>
                <div className="dy-image-links">
                  {(item.paths || [item.path]).map((path, index) => (
                    <a
                      href={publicPath(path)}
                      target="_blank"
                      rel="noopener noreferrer"
                      key={path}
                    >
                      查看图片{(item.paths || []).length > 1 ? index + 1 : ''}
                    </a>
                  ))}
                  {item.downloadPath ? (
                    <a href={publicPath(item.downloadPath)} download={item.downloadName || true}>
                      查看译文
                    </a>
                  ) : null}
                </div>
              </article>
            ) : item.type === 'text' ? (
              <a
                className="dy-result-card"
                href={publicPath(item.path)}
                target="_blank"
                rel="noopener noreferrer"
                key={item.id}
              >
                <p className="dy-result-type">文本资源 | {item.date}</p>
                <h2>{item.title}</h2>
              </a>
            ) : item.type === 'deleted' ? (
              <article className="dy-result-card" key={item.id}>
                <p className="dy-result-type">图片资源 | {item.date}</p>
                <div className="dy-image-links">
                  <button
                    className="dy-deleted-resource"
                    type="button"
                    onClick={() => setDeletedResourceOpen(true)}
                  >
                    查看图片
                  </button>
                </div>
              </article>
            ) : (
              <Link className="dy-result-card" to={item.path} key={item.id}>
                <p className="dy-result-type">博文链接 | {item.date}</p>
                <h2>{item.title}</h2>
              </Link>
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
          <form className="dy-message-form" onSubmit={(event) => event.preventDefault()}>
            <input type="text" placeholder="称呼" />
            <textarea placeholder="留言内容" />
            <button className="dy-read-more" type="submit">暂存留言</button>
          </form>
        </article>
      </section>
    </DongyangOldStoriesLayout>
  );
}
