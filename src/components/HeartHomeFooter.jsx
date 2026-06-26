import { Link } from 'react-router-dom';
import LogoPng from '../assets/logo.png';
import {
  INTERNAL_FORUM_BLACK,
  INTERNAL_FORUM_GLOW,
  INTERNAL_FORUM_RED,
  INNER_FORUM_LIGHT_HEADER,
  INNER_FORUM_LIGHT_HEADER_TEXT,
} from '../constants/internalForumTheme';

export default function HeartHomeFooter({
  onOpenForum,
  contentMaxWidth = 1100,
  outerHorizontalPadding = 28,
  innerHorizontalPadding = 0,
  dark = false,
  variant = 'default',
}) {
  const styles =
    variant === 'innerLight' || variant === 'innerWorkspace'
      ? {
          background: INNER_FORUM_LIGHT_HEADER,
          text: INNER_FORUM_LIGHT_HEADER_TEXT,
          subText: 'rgba(245, 240, 229, 0.78)',
          borderTop: 'none',
        }
      : variant === 'innerDark' || dark
        ? {
            background: INTERNAL_FORUM_BLACK,
            text: INTERNAL_FORUM_RED,
            subText: 'rgba(102, 215, 142, 0.78)',
            borderTop: 'none',
            textShadow: INTERNAL_FORUM_GLOW,
          }
        : {
            background: '#1f4d33',
            text: '#eef8f0',
            subText: 'rgba(238, 248, 240, 0.78)',
            borderTop: 'none',
            textShadow: 'none',
          };

  return (
    <footer
      style={{
        background: styles.background,
        borderTop: styles.borderTop,
        color: styles.text,
        padding: `24px ${outerHorizontalPadding}px`,
        textShadow: styles.textShadow,
      }}
    >
      <div
        style={{
          maxWidth: contentMaxWidth,
          margin: '0 auto',
          padding: `0 ${innerHorizontalPadding}px`,
          display: 'flex',
          justifyContent: 'space-between',
          gap: 36,
          alignItems: 'center',
          flexWrap: 'wrap',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              flex: '0 0 auto',
            }}
          >
            <img
              src={LogoPng}
              alt="心之家"
              style={{
                width: 42,
                height: 42,
                objectFit: 'contain',
                filter: 'brightness(1.08)',
              }}
            />
            <strong style={{ fontSize: 18, letterSpacing: '0.04em' }}>心之家</strong>
          </div>

          <p
            style={{
              margin: 0,
              color: styles.subText,
              fontSize: 14,
              lineHeight: 1.5,
              whiteSpace: 'nowrap',
            }}
          >
            在这里，每一次表达都值得被认真听见。
          </p>
        </div>

        <nav
          style={{
            display: 'flex',
            gap: 22,
            flexWrap: 'wrap',
            fontSize: 14,
            fontWeight: 700,
          }}
        >
          <Link to="/p/a8f3c1e29b" style={{ color: styles.text, textDecoration: 'none' }}>
            首页
          </Link>
          <Link to="/p/4d9e2b7a10" style={{ color: styles.text, textDecoration: 'none' }}>
            了解自己
          </Link>
          <button
            type="button"
            onClick={onOpenForum}
            style={{
              border: 'none',
              background: 'transparent',
              color: styles.text,
              padding: 0,
              cursor: 'pointer',
              font: 'inherit',
              fontWeight: 700,
            }}
          >
            倾听他人
          </button>
        </nav>
      </div>
    </footer>
  );
}
