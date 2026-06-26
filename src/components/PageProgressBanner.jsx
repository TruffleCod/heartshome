import {
  INNER_FORUM_LIGHT_HEADER,
  INNER_FORUM_LIGHT_HEADER_TEXT,
} from '../constants/internalForumTheme';

export default function PageProgressBanner({
  current,
  total,
  projectName = '心之家 Project',
  disclaimerText = '本页面内容仅用于互动叙事与虚构体验，请勿将其中信息视为现实依据。',
  theme = 'dark',
  progressLabel,
}) {
  const progressText =
    progressLabel || (current === 'N/A' || total === 'N/A' ? 'N/A' : `${current}/${total}`);

  const themeStyles = {
    dark: {
      borderTop: '1px solid rgba(226, 241, 230, 0.18)',
      background: '#1f4d33',
      color: 'rgba(238, 248, 240, 0.92)',
    },
    red: {
      borderTop: 'none',
      background: '#000000',
      color: '#a10000',
    },
    light: {
      borderTop: '1px solid #d7e6dc',
      background: '#f3f8f4',
      color: '#2e4a3a',
    },
    news: {
      borderTop: '1px solid #d7d7d7',
      background: '#f2f2f2',
      color: '#a10000',
    },
    dongyang: {
      borderTop: '1px solid rgba(106, 22, 19, 0.24)',
      background: '#caa33f',
      color: '#6a1613',
    },
    charcoal: {
      borderTop: '1px solid rgba(96, 118, 107, 0.24)',
      background: '#111815',
      color: 'rgba(214, 225, 219, 0.92)',
    },
    innerLight: {
      borderTop: 'none',
      background: INNER_FORUM_LIGHT_HEADER,
      color: INNER_FORUM_LIGHT_HEADER_TEXT,
    },
    innerWorkspace: {
      borderTop: 'none',
      background: INNER_FORUM_LIGHT_HEADER,
      color: INNER_FORUM_LIGHT_HEADER_TEXT,
    },
    innerDark: {
      borderTop: '1px solid rgba(99, 245, 154, 0.16)',
      background: '#010704',
      color: '#63f59a',
    },
  };

  const palette = themeStyles[theme] || themeStyles.light;

  return (
    <div
      style={{
        borderTop: palette.borderTop,
        background: palette.background,
        color: palette.color,
        position: 'relative',
        zIndex: 100,
        padding: '13px 18px 15px',
        fontSize: 14,
        lineHeight: 1.8,
        textAlign: 'center',
        letterSpacing: '0.01em',
      }}
    >
      <div>{disclaimerText}</div>
      <div
        style={{
          marginTop: 4,
          fontSize: 15,
          fontWeight: 700,
        }}
      >
        © {projectName} 当前页面收集进度 {progressText}
      </div>
    </div>
  );
}
