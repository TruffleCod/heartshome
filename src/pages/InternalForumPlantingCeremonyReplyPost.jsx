import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import InternalForumCaveBackdrop from '../components/InternalForumCaveBackdrop';
import InternalForumEyesBackground from '../components/InternalForumEyesBackground';
import VerificationModal from '../components/VerificationModal';
import { publicPath } from '../utils/publicPath';
import {
  INTERNAL_FORUM_BLACK,
  INTERNAL_FORUM_DARK_SURFACE,
  INTERNAL_FORUM_DARK_SURFACE_ALT,
  INTERNAL_FORUM_GLOW,
  INTERNAL_FORUM_GLOW_STRONG,
  INTERNAL_FORUM_RED,
  INNER_FORUM_LIGHT_ACCENT,
  INNER_FORUM_LIGHT_BG,
  INNER_FORUM_LIGHT_BORDER,
  INNER_FORUM_LIGHT_MUTED,
  INNER_FORUM_LIGHT_TEXT,
} from '../constants/internalForumTheme';

const ceremonyRows = [
  ['花匠017', 'PXH', '已开花'],
  ['花匠042', 'WYH', '已开花'],
  ['花匠087', 'LQ', '已开花'],
  ['花匠109', 'CXM', '已开花'],
  ['花匠338', 'ZLZ', '已开花'],
  ['花匠141', 'YXL', '已开花'],
  ['花匠165', 'HJL', '已开花'],
  ['花匠204', 'LSY', '已开花'],
  ['花匠233', 'CYQ', '已开花'],
  ['花匠278', 'WYH', '已开花'],
  ['花匠297', 'ZQH', '已开花'],
  ['花匠319', 'LY', '已开花'],
  ['花匠334', 'WXS', '已开花'],
  ['花匠351', 'FXM', '已开花'],
  ['花匠356', 'YL', '已开花'],
  ['花匠358', 'CJ', '已开花'],
  ['花匠359', 'GXX', '已开花'],
];

const comments = [
  {
    author: '花匠338',
    role: 'normal_user',
    paragraphs: [
      '@园丁001这是怎么回事？？？你做了什么？？？',
      {
        type: 'link',
        href: '/p/44d2ae09f6',
        label: 'https://trufflecod.github.io/heartshome/p/44d2ae09f6',
      },
    ],
  },
  {
    author: '园丁001',
    role: 'normal_user',
    paragraphs: ['这就是你栽种的结果。'],
  },
  {
    author: '花匠338',
    role: 'normal_user',
    paragraphs: ['我要报警。'],
  },
  {
    author: '园丁001',
    role: 'normal_user',
    paragraphs: ['……别在帖子里继续说。去我的临时咨询室里。', '记得用这里的ID，别用主站的。'],
  },
];

export default function InternalForumPlantingCeremonyReplyPost() {
  const [showVerification, setShowVerification] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [showReturnBubble, setShowReturnBubble] = useState(false);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open(publicPath('p/b12e8f40a6'), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => setShowReturnBubble(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'inner-forum-lights:/p/5a1f90d7c3',
      String(lightsOn)
    );
    window.dispatchEvent(
      new CustomEvent('inner-forum-theme-change', {
        detail: { path: '/p/5a1f90d7c3', lightsOn },
      })
    );
  }, [lightsOn]);

  const theme = lightsOn
    ? {
        bg: INNER_FORUM_LIGHT_BG,
        text: INNER_FORUM_LIGHT_TEXT,
        title: INNER_FORUM_LIGHT_ACCENT,
        meta: INNER_FORUM_LIGHT_MUTED,
        switchText: INNER_FORUM_LIGHT_TEXT,
        switchBorder: INNER_FORUM_LIGHT_BORDER,
      }
    : {
        bg: INTERNAL_FORUM_BLACK,
        text: INTERNAL_FORUM_RED,
        title: INTERNAL_FORUM_RED,
        meta: INTERNAL_FORUM_RED,
        switchText: '#fff200',
        switchBorder: '#fff200',
        glow: INTERNAL_FORUM_GLOW,
        strongGlow: INTERNAL_FORUM_GLOW_STRONG,
      };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: lightsOn ? INNER_FORUM_LIGHT_BG : INTERNAL_FORUM_BLACK,
        background: theme.bg,
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <InternalForumCaveBackdrop active={!lightsOn} />
      <InternalForumEyesBackground active={!lightsOn} />

      <HeartHomeHeader dark={!lightsOn} variant={lightsOn ? 'innerLight' : 'innerDark'} />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 980,
          margin: '0 auto',
          padding: '64px 42px 92px',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
        }}
      >
        <Link
          to="/p/3e7b10a9c4"
          style={{
            position: 'sticky',
            top: 'calc(100vh - 92px)',
            marginLeft: 'calc(100% + 4px)',
            zIndex: 20,
            width: 32,
            height: 84,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: lightsOn ? INNER_FORUM_LIGHT_ACCENT : INTERNAL_FORUM_RED,
            color: '#ffffff',
            border: lightsOn ? `1px solid ${INNER_FORUM_LIGHT_ACCENT}` : `1px solid ${INTERNAL_FORUM_RED}`,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.01em',
            lineHeight: 1.15,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            opacity: showReturnBubble ? 1 : 0,
            visibility: showReturnBubble ? 'visible' : 'hidden',
            transform: showReturnBubble ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: showReturnBubble ? 'auto' : 'none',
            transition: 'opacity 220ms ease, transform 220ms ease, visibility 220ms ease',
          }}
          title="返回论坛"
          aria-label="返回论坛"
        >
          {'返\n回\n论\n坛'}
        </Link>

        <article>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 16,
              marginBottom: 46,
            }}
          >
            <h1 style={{ margin: 0, color: theme.title, fontSize: 34, fontWeight: 800, lineHeight: 1.35, textShadow: lightsOn ? 'none' : theme.strongGlow }}>
              【公告】第三十一届栽种仪式顺利完成
            </h1>
            <button
              type="button"
              onClick={() => setLightsOn((prev) => !prev)}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                border: `1px solid ${theme.switchBorder}`,
                background: 'transparent',
                color: theme.switchText,
                fontSize: 20,
                fontWeight: 700,
                padding: 0,
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
              aria-label={lightsOn ? '关灯' : '开灯'}
              title={lightsOn ? '关灯' : '开灯'}
            >
              {lightsOn ? '💡' : '◌'}
            </button>
          </div>

          <div
            style={{
              margin: '0 0 56px',
              color: theme.meta,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 18px',
              fontSize: 16,
              lineHeight: 1.8,
              textShadow: lightsOn ? 'none' : theme.glow,
            }}
          >
            <span>ID: 园丁016</span>
            <span>发帖时间: 2026/05/24 23:33:33</span>
          </div>

          <p style={{ margin: '0 0 22px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            本届栽种仪式已顺利完成。本届栽种的对象有：
          </p>

          <div style={{ margin: '0 0 42px', overflowX: 'auto' }}>
            <table
              style={{
                width: '100%',
                minWidth: 620,
                borderCollapse: 'collapse',
                color: theme.text,
                fontSize: 20,
                lineHeight: 1.6,
              }}
            >
              <thead>
                <tr>
                  {['花匠', '栽种对象', '状态'].map((header) => (
                    <th
                      key={header}
                      style={{
                        border: `1px solid ${lightsOn ? '#d4dde0' : INTERNAL_FORUM_RED}`,
                        padding: '8px 12px',
                        textAlign: 'left',
                        fontWeight: 700,
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {ceremonyRows.map((row) => (
                  <tr key={row[0]}>
                    {row.map((cell) => (
                      <td
                        key={`${row[0]}-${cell}`}
                        style={{
                          border: `1px solid ${lightsOn ? '#d4dde0' : INTERNAL_FORUM_RED}`,
                          padding: '8px 12px',
                          verticalAlign: 'top',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ margin: '0 0 42px', color: theme.text, fontSize: 21, lineHeight: 1.85, textShadow: lightsOn ? 'none' : theme.glow }}>
            <p style={{ margin: '0 0 6px' }}>本届新增花匠：14</p>
            <p style={{ margin: '0 0 6px' }}>累计栽种：359</p>
            <p style={{ margin: 0 }}>累计开花：2,812</p>
          </div>

          <p style={{ margin: '0 0 56px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            新一届栽种仪式预计于2026/06/28执行，花匠需在执行日之前敬奉姓名，过时不候。
            <br />
            详情请联系管理员@园丁001。
          </p>

          {!lightsOn ? (
            <div
              style={{
                margin: '0 0 56px',
                color: theme.text,
                fontSize: 60,
                lineHeight: 1.7,
                fontWeight: 700,
                fontFamily: '"STKaiti", "KaiTi", "Kaiti SC", "DFKai-SB", serif',
                letterSpacing: '0.03em',
                textShadow: '0 0 8px rgba(161, 0, 0, 0.45), 0 0 18px rgba(161, 0, 0, 0.22)',
                whiteSpace: 'pre-line',
              }}
            >
              {'善为恶因，恶为善果。\n名既出口，因果自见。\n众心归一，诚祈圣君。\n十方洞彻，两仪辨心。\n圣君垂鉴，俯纳愚衷。'}
            </div>
          ) : null}

          {!lightsOn ? (
            <section
              style={{
                border: `1px solid ${INTERNAL_FORUM_RED}`,
                background: INTERNAL_FORUM_BLACK,
                borderRadius: 14,
                padding: 18,
                display: 'grid',
                gap: 14,
              }}
            >
              {comments.map((comment, index) => (
                <article
                  key={`${comment.author}-${index}`}
                  style={{
                    border: `1px solid ${INTERNAL_FORUM_RED}`,
                    background: INTERNAL_FORUM_DARK_SURFACE,
                    borderRadius: 12,
                    padding: '14px 16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: 10,
                      color: INTERNAL_FORUM_RED,
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    <span>ID: {comment.author}</span>
                    <span
                      style={{
                        border: `1px solid ${INTERNAL_FORUM_RED}`,
                        color: INTERNAL_FORUM_RED,
                        background: INTERNAL_FORUM_DARK_SURFACE_ALT,
                        borderRadius: 999,
                        padding: '2px 10px',
                        fontSize: 14,
                      }}
                    >
                      {comment.author === '园丁001' ? '管理员' : '花匠'}
                    </span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        display: 'grid',
                        placeItems: 'center',
                        border: `1px solid ${INTERNAL_FORUM_RED}`,
                        color: INTERNAL_FORUM_RED,
                        background: INTERNAL_FORUM_DARK_SURFACE_ALT,
                        fontWeight: 800,
                      }}
                    >
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>
                  {comment.paragraphs.map((paragraph, paragraphIndex) => {
                    const paragraphStyle = {
                      margin: paragraphIndex === comment.paragraphs.length - 1 ? '0' : '0 0 10px',
                      color: INTERNAL_FORUM_RED,
                      fontSize: 18,
                      lineHeight: 1.8,
                      whiteSpace: 'pre-line',
                    };

                    if (typeof paragraph === 'object' && paragraph?.type === 'link') {
                      return (
                        <p
                          key={`${comment.author}-${paragraphIndex}`}
                          style={paragraphStyle}
                        >
                          <a
                            href={publicPath(paragraph.href)}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: INTERNAL_FORUM_RED,
                              textDecoration: 'underline',
                              wordBreak: 'break-all',
                            }}
                          >
                            {paragraph.label}
                          </a>
                        </p>
                      );
                    }

                    return (
                      <p
                        key={`${comment.author}-${paragraphIndex}`}
                        style={paragraphStyle}
                      >
                        {paragraph}
                      </p>
                    );
                  })}
                </article>
              ))}
            </section>
          ) : null}
        </article>
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={980}
        outerHorizontalPadding={0}
        innerHorizontalPadding={42}
        dark={!lightsOn}
        variant={lightsOn ? 'innerLight' : 'innerDark'}
      />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}
    </div>
  );
}
