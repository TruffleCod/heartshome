import { Link } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';

const paragraphs = [
  '这里是一些作者的幕后花絮。',
  '本来做这个游戏预计是能在全国最重要的考试前完成的，结果因为本人过分享受辞职后的生活，导致最后计划有变。',
  '做这个游戏的过程中，我每天花10个小时睡觉，1个小时玩猫，4个小时玩电脑，4个小时玩手机，每天只有5个小时用于真正的工作。',
  '当然一部分原因也是codex的额度只允许我连续工作5个小时。',
  '设计这个游戏的一大出发点，是我真的真的很讨厌上一份工作，讨厌到做噩梦，躯体化，胃溃疡的程度。哪怕已经离开了那家公司，我依然对那里饱含着恨意。不止是我，很多在我之前或之后离开的同事们也是这样。直到现在我们依然会时不时地聚会，将我们凝聚在一起的，是同样强烈的鄙夷和憎恶。',
  '这让我不禁在想，到底是什么让我们变成了现在这样。明明大家都是一群很善良、有活力、很好相处的人，但在那个充满恶意和中伤的职场里，我们因为有独立的想法和原则，反而成为了背负诅咒的那一个。',
  '“领导们只顾着面子和稳定，不懂得技术和设计，把真正会干活的人都赶跑了，留下溜须拍马，混吃等死的人。多不公平啊。”',
  '公平。正是这个词，让我设计了“心之家”和“圣君”的仪式。辞职前，我一度萌生了要去烧香许愿让那些人“得到报应”的想法。这种念头让我自己都感到很可怕，也最终让我坚定信念，一定要离开那个岗位。',
  '我庆幸我们所有人已经离开了那里，没有让负面情绪将我们变成更陌生的样子。',
  '也祝福大家，难关都将过去，未来皆是坦途。',
];

export default function AssessmentEasterEgg() {
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
          遇事不决全选C！
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
          恭喜你发现了隐藏关（并不是）！
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

        <Link
          to="/p/c70a5e1d92"
          style={{
            display: 'inline-flex',
            marginTop: 28,
            color: '#2f7a4a',
            textDecoration: 'none',
            fontWeight: 800,
          }}
        >
          返回游戏
        </Link>
      </main>
    </div>
  );
}
