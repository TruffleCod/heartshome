import { Link } from 'react-router-dom';
import LogoPng from '../assets/logo.png';
import {
  INTERNAL_FORUM_BLACK,
  INTERNAL_FORUM_GLOW,
  INNER_FORUM_LIGHT_HEADER,
  INNER_FORUM_LIGHT_HEADER_TEXT,
} from '../constants/internalForumTheme';

export default function HeartHomeHeader({ dark = false, variant = 'default' }) {
  const headerStyles =
    variant === 'innerLight' || variant === 'innerWorkspace'
      ? {
          borderBottom: '1px solid rgba(238, 232, 220, 0.08)',
          background: INNER_FORUM_LIGHT_HEADER,
          titleColor: INNER_FORUM_LIGHT_HEADER_TEXT,
        }
      : variant === 'innerDark' || dark
        ? {
            borderBottom: '1px solid rgba(102, 215, 142, 0.18)',
            background: INTERNAL_FORUM_BLACK,
            titleColor: '#eef8f0',
            titleShadow: INTERNAL_FORUM_GLOW,
          }
        : {
            borderBottom: '1px solid #e6f5ea',
            background: 'rgba(247, 253, 247, 0.96)',
            titleColor: '#15472a',
            titleShadow: 'none',
          };

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        minHeight: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '12px 24px',
        borderBottom: headerStyles.borderBottom,
        background: headerStyles.background,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Link
        to="/home"
        aria-label="返回心之家首页"
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          textAlign: 'center',
          color: 'inherit',
          textDecoration: 'none',
        }}
      >
        <img src={LogoPng} alt="心之家" style={{ width: 48, height: 48 }} />
        <div
          style={{
            color: headerStyles.titleColor,
            fontSize: 22,
            fontWeight: 800,
            letterSpacing: '0.04em',
            lineHeight: 1.2,
            textShadow: headerStyles.titleShadow,
          }}
        >
          心之家 心理服务平台
        </div>
      </Link>
    </header>
  );
}
