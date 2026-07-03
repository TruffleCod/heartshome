import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { searchMingchuanNews } from '../data/mingchuanNewsIndex';
import '../styles/mingchuanNews.css';

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
        <div
          style={{
            background: '#8b0000',
            height: 10,
          }}
        />

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

export default function MingchuanNewsSearch() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const rawQuery = searchParams.get('q') || '';
  const keyword = normalizeKeyword(rawQuery);
  const results = searchMingchuanNews(keyword);
  const [showSearch, setShowSearch] = useState(false);
  const [searchKeyword, setSearchKeyword] = useState(keyword);
  const [error, setError] = useState('');

  useEffect(() => {
    setSearchKeyword(keyword);
  }, [keyword]);

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
        setSearchKeyword('');
        setShowSearch(true);
        setError('');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const normalized = normalizeKeyword(searchKeyword);

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
      className="mingchuan-news-page mingchuan-news-search-page"
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
            {['首页', '要闻', '明川', '社会', '教育', '民生', '健康'].map((item, index) => (
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
        <section
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
            当前位置：首页 &gt; 检索结果
          </div>

          <div
            style={{
              maxWidth: 850,
              margin: '0 auto',
              padding: '40px 34px 56px',
            }}
          >
            <h2
              style={{
                margin: 0,
                color: '#111',
                fontSize: 30,
                lineHeight: 1.5,
                fontWeight: 700,
                fontFamily: '"Microsoft YaHei", SimHei, sans-serif',
              }}
            >
              站内检索结果
            </h2>

            <p
              style={{
                margin: '16px 0 0',
                color: '#666',
                fontSize: 15,
                lineHeight: 1.9,
              }}
            >
              检索对象：{keyword || '未输入'}
            </p>

            <div
              style={{
                marginTop: 28,
                display: 'grid',
                gap: 18,
              }}
            >
              {results.length > 0 ? (
                results.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    style={{
                      display: 'block',
                      border: '1px solid #e0e0e0',
                      background: '#fcfcfc',
                      padding: '22px 24px',
                      textDecoration: 'none',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        color: '#8b0000',
                        fontSize: 13,
                        lineHeight: 1.8,
                        fontWeight: 700,
                      }}
                    >
                      {item.category} | {item.date} | {item.source}
                    </p>

                    <h3
                      style={{
                        margin: '10px 0 0',
                        color: '#222',
                        fontSize: 24,
                        lineHeight: 1.6,
                        fontWeight: 700,
                      }}
                    >
                      {item.title}
                    </h3>

                    <p
                      style={{
                        margin: '12px 0 0',
                        color: '#555',
                        fontSize: 16,
                        lineHeight: 1.95,
                      }}
                    >
                      {item.summary}
                    </p>
                  </Link>
                ))
              ) : (
                <div
                  style={{
                    border: '1px solid #e0e0e0',
                    background: '#fcfcfc',
                    padding: '22px 24px',
                    color: '#555',
                    fontSize: 16,
                    lineHeight: 1.9,
                  }}
                >
                  未检索到与该关键词相关的公开报道。
                </div>
              )}
            </div>
          </div>
        </section>
      </main>

      {showSearch ? (
        <HiddenSearchModal
          keyword={searchKeyword}
          onChange={(value) => {
            setSearchKeyword(value);
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
    </div>
  );
}
