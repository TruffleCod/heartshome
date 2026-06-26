import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MingchuanFloatingAds from './MingchuanFloatingAds';
import { publicPath } from '../utils/publicPath';

const GLITCH_TEXT = '请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名请输入姓名';
const BODY_GLITCH_CHANCE = 0.3;
const NAV_GLITCH_CHANCE = 0.3;
const IMAGE_GLITCH_CHANCE = 0.3;
const GLITCH_IMAGE_SOURCES = [
  '/images/news/glitch/glitch-news-1.png',
  '/images/news/glitch/glitch-news-2.png',
  '/images/news/glitch/glitch-news-3.png',
  '/images/news/glitch/glitch-news-4.png',
  '/images/news/glitch/glitch-news-5.png',
];
const NORMAL_NAV_ITEMS = ['首页', '要闻', '明川', '社会', '教育', '民生', '健康'];
const NAV_GLITCH_ITEMS = Array.from({ length: 7 }, () => '正文');
const NAV_GLITCH_BREADCRUMB = '正文>正文>正文>正文>正文>正文>正文';

function renderFigure(figure) {
  if (!figure?.src) {
    return null;
  }

  return (
    <figure
      style={{
        margin: '26px 0 10px',
        border: '1px solid #dfdfdf',
        background: '#fafafa',
        padding: 8,
      }}
    >
      <img
        src={publicPath(figure.src)}
        alt={figure.alt || ''}
        style={{
          display: 'block',
          width: '100%',
          height: 'auto',
        }}
      />
      {figure.caption ? (
        <figcaption
          style={{
            marginTop: 8,
            color: '#666',
            fontSize: 13,
            lineHeight: 1.7,
            textAlign: 'center',
            fontFamily: '"Microsoft YaHei", Arial, sans-serif',
          }}
        >
          {figure.caption}
        </figcaption>
      ) : null}
    </figure>
  );
}

function normalizeKeyword(value) {
  return value.replace(/\s+/g, '').trim();
}

function isTypingTarget(target) {
  if (!target) {
    return false;
  }

  const tagName = target.tagName?.toLowerCase();
  return (
    tagName === 'input' ||
    tagName === 'textarea' ||
    tagName === 'select' ||
    target.isContentEditable
  );
}

function buildParagraphsWithGlitch(paragraphs) {
  if (paragraphs.length === 0 || Math.random() >= BODY_GLITCH_CHANCE) {
    return paragraphs;
  }

  const firstBodyIndex = paragraphs[0]?.startsWith('__NEWS_LEAD__') ? 1 : 0;
  const insertAt =
    firstBodyIndex + Math.floor(Math.random() * (paragraphs.length - firstBodyIndex + 1));

  return [
    ...paragraphs.slice(0, insertAt),
    GLITCH_TEXT,
    ...paragraphs.slice(insertAt),
  ];
}

function buildFigureWithGlitch(figure) {
  if (!figure?.src || Math.random() >= IMAGE_GLITCH_CHANCE) {
    return figure;
  }

  const src =
    GLITCH_IMAGE_SOURCES[Math.floor(Math.random() * GLITCH_IMAGE_SOURCES.length)];

  return {
    ...figure,
    src,
    alt: figure.alt ? `${figure.alt}（图片异常）` : '图片异常',
  };
}

function HiddenSearchModal({ keyword, onChange, onClose, onSubmit, error }) {
  const helperTextStyle = {
    margin: '6px 0 0',
    color: '#666',
    fontSize: 15,
    lineHeight: 1.55,
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mingchuan-search-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1200,
        background: 'rgba(19, 19, 19, 0.42)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        style={{
          width: 'min(680px, 92vw)',
          background: '#ffffff',
          border: '1px solid #d6d6d6',
          boxShadow: '0 24px 80px rgba(0, 0, 0, 0.22)',
        }}
      >
        <div style={{ background: '#8b0000', height: 10 }} />

        <form onSubmit={onSubmit} style={{ padding: '32px 34px 30px' }}>
          <p
            id="mingchuan-search-title"
            style={{
              margin: 0,
              color: '#222',
              fontSize: 24,
              fontWeight: 700,
              lineHeight: 1.5,
            }}
          >
            请输入检索对象：
          </p>

          <p style={helperTextStyle}>
            支持按姓名、官方机构全称，检索本站公开报道。
          </p>

          <p style={helperTextStyle}>
            当前搜索功能测试中，如遇故障，可尝试刷新解决。
          </p>

          <input
            autoFocus
            type="text"
            value={keyword}
            onChange={(event) => onChange(event.target.value)}
            placeholder="请输入姓名或官方机构全称"
            style={{
              width: '100%',
              marginTop: 20,
              padding: '14px 16px',
              border: '1px solid #cfcfcf',
              outline: 'none',
              fontSize: 18,
              color: '#222',
              fontFamily: '"Microsoft YaHei", Arial, sans-serif',
              boxSizing: 'border-box',
            }}
          />

          {error ? (
            <p
              style={{
                margin: '12px 0 0',
                color: '#a63232',
                fontSize: 14,
                lineHeight: 1.8,
              }}
            >
              {error}
            </p>
          ) : null}

          <div
            style={{
              marginTop: 24,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 12,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                minWidth: 96,
                padding: '10px 20px',
                border: '1px solid #d0d0d0',
                background: '#ffffff',
                color: '#666',
                cursor: 'pointer',
                fontSize: 14,
                fontFamily: 'inherit',
              }}
            >
              关闭
            </button>

            <button
              type="submit"
              style={{
                minWidth: 116,
                padding: '10px 22px',
                border: '1px solid #8b0000',
                background: '#8b0000',
                color: '#ffffff',
                cursor: 'pointer',
                fontSize: 14,
                fontWeight: 700,
                fontFamily: 'inherit',
              }}
            >
              开始检索
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function MingchuanNewsArticle({
  category = '社会',
  title,
  date,
  source = '明川新闻网',
  paragraphs = [],
  figure,
  relatedLinks = [],
  disableGlitches = false,
  hideFloatingAds = false,
}) {
  const navigate = useNavigate();
  const [showSearch, setShowSearch] = useState(false);
  const [keyword, setKeyword] = useState('');
  const [error, setError] = useState('');
  const [displayParagraphs] = useState(() =>
    disableGlitches ? paragraphs : buildParagraphsWithGlitch(paragraphs),
  );
  const [displayFigure] = useState(() =>
    disableGlitches ? figure : buildFigureWithGlitch(figure),
  );
  const [hasNavGlitch] = useState(
    () => !disableGlitches && Math.random() < NAV_GLITCH_CHANCE,
  );
  const visibleRelatedLinks = relatedLinks.filter((link) => link?.href && link?.label);
  const navItems = hasNavGlitch ? NAV_GLITCH_ITEMS : NORMAL_NAV_ITEMS;
  const breadcrumb = hasNavGlitch
    ? NAV_GLITCH_BREADCRUMB
    : `当前位置：首页 > ${category} > 正文`;

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isTypingTarget(event.target)) {
        return;
      }

      if (event.key === 'Escape' && showSearch) {
        setShowSearch(false);
        setError('');
        return;
      }

      if (event.key === '~' || event.key === '`' || event.code === 'Backquote') {
        event.preventDefault();
        setShowSearch(true);
        setError('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = normalizeKeyword(keyword);

    if (!normalized) {
      setError('请输入检索对象。');
      return;
    }

    setShowSearch(false);
    setError('');
    navigate(`/news/search?q=${encodeURIComponent(normalized)}`);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f2f2f2',
        color: '#222',
        fontFamily: '"Microsoft YaHei", Arial, sans-serif',
      }}
    >
      <header
        style={{
          background: '#ffffff',
          borderBottom: '3px solid #b00000',
        }}
      >
        <div
          style={{
            maxWidth: 1080,
            margin: '0 auto',
            padding: '26px 24px 20px',
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#8b0000',
              fontSize: 44,
              fontWeight: 700,
              letterSpacing: '0.06em',
              lineHeight: 1.1,
              fontFamily: '"Microsoft YaHei", SimHei, sans-serif',
            }}
          >
            明川新闻网
          </h1>

          <p
            style={{
              margin: '8px 0 0',
              color: '#666',
              fontSize: 13,
              letterSpacing: '0.08em',
              fontFamily: 'Arial, "Microsoft YaHei", sans-serif',
            }}
          >
            MINGCHUAN NEWS NETWORK
          </p>
        </div>

        <div style={{ background: '#8b0000' }}>
          <div
            style={{
              maxWidth: 1080,
              margin: '0 auto',
              padding: '0 24px',
              display: 'flex',
              alignItems: 'center',
              color: '#ffffff',
              fontSize: 15,
              fontWeight: 700,
              flexWrap: 'wrap',
            }}
          >
            {navItems.map((item, index) => (
              <span
                key={`${item}-${index}`}
                style={{
                  padding: '12px 18px',
                  borderLeft: '1px solid rgba(255,255,255,0.18)',
                  userSelect: 'none',
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </header>

      <main
        style={{
          maxWidth: 1080,
          margin: '18px auto 0',
          padding: '0 24px 52px',
        }}
      >
        <article
          style={{
            background: '#ffffff',
            border: '1px solid #d2d2d2',
          }}
        >
          <div
            style={{
              padding: '10px 18px',
              borderBottom: '1px solid #e3e3e3',
              background: '#fafafa',
              color: '#666',
              fontSize: 13,
            }}
          >
            {breadcrumb}
          </div>

          <div
            style={{
              maxWidth: 850,
              margin: '0 auto',
              padding: '44px 34px 56px',
            }}
          >
            <h2
              style={{
                margin: 0,
                color: '#111',
                fontSize: 30,
                lineHeight: 1.5,
                fontWeight: 700,
                textAlign: 'center',
                fontFamily: '"Microsoft YaHei", SimHei, sans-serif',
              }}
            >
              {title}
            </h2>

            <div
              style={{
                marginTop: 22,
                padding: '12px 0',
                borderTop: '1px solid #e1e1e1',
                borderBottom: '1px solid #e1e1e1',
                textAlign: 'center',
                color: '#666',
                fontSize: 13,
                lineHeight: 1.8,
              }}
            >
              <span>发布时间：{date}</span>
              <span style={{ marginLeft: 18 }}>来源：{source}</span>
            </div>

            {renderFigure(displayFigure)}

            <section
              style={{
                marginTop: 34,
                color: '#222',
                fontSize: 21,
                lineHeight: 2.05,
                letterSpacing: 0,
                fontFamily: '"SimHei", "黑体", "Microsoft YaHei", sans-serif',
              }}
            >
              {displayParagraphs.map((paragraph, index) => {
                const isSpecialLead = paragraph.startsWith('__NEWS_LEAD__');
                const isGlitch = paragraph === GLITCH_TEXT;
                const content = isSpecialLead
                  ? paragraph.replace('__NEWS_LEAD__', '')
                  : paragraph;

                return (
                  <p
                    key={`${paragraph}-${index}`}
                    style={
                      isSpecialLead
                        ? {
                            margin: '0 0 22px',
                            color: '#222',
                            fontSize: 19,
                            lineHeight: 1.9,
                            fontWeight: 700,
                            letterSpacing: '0.04em',
                            textIndent: '2em',
                          }
                        : {
                            margin: '0 0 20px',
                            textIndent: '2em',
                            color: isGlitch ? '#8b0000' : '#222',
                            fontWeight: isGlitch ? 700 : 400,
                          }
                    }
                  >
                    {content}
                  </p>
                );
              })}
            </section>

            <div
              style={{
                marginTop: 36,
                paddingTop: 18,
                borderTop: '1px solid #e5e5e5',
                color: '#555',
                fontSize: 14,
                lineHeight: 1.9,
                fontFamily: '"Microsoft YaHei", Arial, sans-serif',
              }}
            >
              {visibleRelatedLinks.length > 0 ? (
                <div>
                  <span
                    style={{
                      color: '#333',
                      fontWeight: 700,
                    }}
                  >
                    相关链接：
                  </span>

                  {visibleRelatedLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        marginLeft: index === 0 ? 8 : 16,
                        color: '#8b0000',
                        textDecoration: 'none',
                        fontWeight: 700,
                      }}
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              ) : null}

              <div
                style={{
                  marginTop: visibleRelatedLinks.length > 0 ? 12 : 0,
                  paddingTop: visibleRelatedLinks.length > 0 ? 12 : 0,
                  borderTop: visibleRelatedLinks.length > 0 ? '1px solid #eeeeee' : 'none',
                }}
              >
                <p style={{ margin: 0 }}>本站仅收录明川新闻网公开报道。</p>
                <p style={{ margin: '2px 0 0' }}>
                  明川新闻网 版权所有 Copyright © Mingchuan News Network.
                </p>
              </div>
            </div>
          </div>
        </article>
      </main>

      {showSearch ? (
        <HiddenSearchModal
          keyword={keyword}
          onChange={(value) => {
            setKeyword(value);
            setError('');
          }}
          onClose={() => {
            setShowSearch(false);
            setError('');
          }}
          onSubmit={handleSubmit}
          error={error}
        />
      ) : null}
      {hideFloatingAds ? null : <MingchuanFloatingAds />}
    </div>
  );
}
