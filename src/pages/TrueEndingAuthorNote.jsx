import { Link } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';

const TRUE_ENDING_AUTHOR_NOTE_PATH = '/p/5e0f3a9b2c';
export const RITUAL_QUESTIONS_PATH = '/p/d7e40a1c9b';
export { TRUE_ENDING_AUTHOR_NOTE_PATH };

const paragraphs = [
  '谢谢你走到了这里。',
  '如果你看见了这段话，说明你已经找到了圣君的真实姓名。这不是最热烈、最圆满的结局，但它是这个故事里最接近“停止”的一刻。活下来的人终于拥有了一点可以呼吸的空隙。',
  '感谢你游玩“心之家”这款游戏，这是我独立开发的第一款网页推理解谜。代码开发采用了Codex辅助，以及部分图片资源借由AI生成。',
  '谜题设计和文案主笔主要由本人【黑松露鳕鱼】负责开发。这是我全网唯一、真实无比的名字，没有其他的假名、代号、昵称（狗头）。',
  '感谢玩到这里的你们，也感谢在开发过程中所有帮助过我的漕河泾牛马们。',
];

export default function TrueEndingAuthorNote() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7fbf7',
        color: '#1f2f28',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader />

      <main
        style={{
          maxWidth: 820,
          margin: '0 auto',
          padding: '96px 28px 120px',
        }}
      >
        <p
          style={{
            margin: '0 0 14px',
            color: '#2f7a4a',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.12em',
          }}
        >
          TRUE ENDING UNLOCKED
        </p>

        <h1
          style={{
            margin: '0 0 28px',
            color: '#1f4d33',
            fontSize: 40,
            fontWeight: 600,
            lineHeight: 1.35,
          }}
        >
          真结局通关纪念！
        </h1>

        <div
          style={{
            border: '1px solid #dce9de',
            borderRadius: 8,
            background: '#ffffff',
            padding: '32px 34px',
            boxShadow: '0 16px 36px rgba(21, 71, 42, 0.06)',
          }}
        >
          {paragraphs.map((paragraph, index) => (
            <p
              key={paragraph}
              style={{
                margin: index === 0 ? 0 : '18px 0 0',
                color: '#4e5965',
                fontSize: 17,
                fontWeight: 450,
                lineHeight: 1.9,
              }}
            >
              {paragraph}
            </p>
          ))}
        </div>

        <nav
          style={{
            display: 'flex',
            gap: 22,
            flexWrap: 'wrap',
            marginTop: 28,
          }}
          aria-label="真结局页面导航"
        >
          <Link to="/" style={bottomLinkStyle}>
            返回心之家
          </Link>
          <Link to={RITUAL_QUESTIONS_PATH} style={bottomLinkStyle}>
            返回理智评估
          </Link>
        </nav>
      </main>
    </div>
  );
}

const bottomLinkStyle = {
  color: '#2f7a4a',
  textDecoration: 'none',
  fontWeight: 800,
};
