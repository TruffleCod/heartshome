import { useState } from 'react';
import { Link } from 'react-router-dom';
import { publicPath } from '../utils/publicPath';

const storyPoints = [
  <>
    <strong>你叫叶诗隐，是一名21岁的女大学生。你有一个即将满17岁的妹妹，名叫叶诗遥。</strong>
  </>,
  <>
    一年半以前，妹妹中考超常发挥，考入了你们城市最有名的重点高中，从那时开始，原本开朗的妹妹逐渐变得沉默寡言，原本你们以为她只是课业压力大，直到有一天，她开始无法起床上学，你们才意识到事态的严重。在医院检查后，妹妹被确诊为抑郁症。
  </>,
  <>
    <strong>2026年06月15日，原本是妹妹的17岁生日，</strong>
    在留下了一封疑似遗书的信件后，妹妹失踪了。考虑到她有伤害自己的倾向，你们立刻报了警。警方调取了所有的监控，并没有找到任何妹妹离开过小区的记录，追踪手机信号也一无所获。“叶诗遥”这个人，仿佛从世界上凭空消失了……
  </>,
  <>
    <strong>更让你不安的是，这已经不是最近第一起类似事件。</strong>过去几个月里，本市陆续出现过几起少女失踪事件。新闻报道说失踪者多为十几岁的在校女生，失踪前都曾表现出情绪异常，警方尚未公布案件之间是否存在关联。
  </>,
  <>
    心急如焚的你，决定自己寻找妹妹的下落。你回到了家中，在妹妹的房间里努力翻找线索（虽然你知道这是不对的，但现在也管不了这么多了）。在妹妹的电脑里，你发现了一个奇怪的网站。
  </>,
  <>
    <strong>临走之前，她把所有的收藏和浏览记录都删得一干二净，唯独留下了这个网页——“心之家” 。</strong>
  </>,
  <>
    冥冥之中，你觉得这就是妹妹给你留下的线索。于是你点开了网页，在这个看似普通的心理咨询网站上，寻找任何有可能指向妹妹下落的信息……
  </>,
];

const playPoints = [
  <>
    <strong>这是一个网页推理游戏，所有的谜题和线索都藏在网页的字里行间。</strong>
    当前暂时只支持电脑端打开。使用移动设备可能会导致排版错位。另外，友情建议你准备一个笔记本，或者是电子文档，及时记录看起来有用的信息。真相或许就藏在不起眼的细节当中。
  </>,
  <>
    <strong>本游戏的所有的交互是基于现实常识设计的，只有【鼠标点击】和【键盘输入】两种。</strong>
    如果你是第一次接触这一类游戏，不知道从何开始，这里有一个小小的提示：不知道怎么推进剧情的时候，仔细阅读文本，并且点击一切看起来能被点击的地方。
  </>,
  <>
    <strong>部分谜题运用到的知识，可能需要使用到搜索引擎进行查询。</strong>
    我用不同的搜索引擎尝试过，只要你找对了关键词，通常可以很快地发现你要找的答案。当然，在现在这个时代你也可以直接询问AI，他们检索信息的能力或许更强大。
  </>,
  <>
    后面的路，就需要你自己去探索了——你并不总是知道，自己面对的谜题是什么。一切都需要你自己去发现。
  </>,
  <>
    <strong>本游戏含有少量恐怖元素。</strong>
    部分灵感来源于oobmab老师的《黑太岁》《巴虺的牧群》等中式克苏鲁作品，但是文笔和设定远不及其项背。在此也趁机推荐一下这两部佳作。
  </>,
  <>
  <strong>——TruffleCod敬上</strong>
  </>,
];

export default function StartGame() {
  const [isNoteOpen, setIsNoteOpen] = useState(false);
  const noteSrc = publicPath('note.jpg');

  return (
    <div className="start-game-page">
      <main className="start-game-shell">
        <section className="start-game-hero">
          <div>
            <p className="start-game-kicker">网页推理游戏</p>
            <h1>心之家 少女失踪案</h1>
          </div>
          <p>
            阅读以下故事背景与玩法说明后，点击“开始游戏”后，正式进入心之家的世界。
          </p>
        </section>

        <section className="start-game-layout">
          <div className="start-game-content">
            <article className="start-game-panel">
              <SectionHeading title="故事简介" />
              <div className="start-game-copy">
                {storyPoints.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </article>

            <section className="start-game-panel">
              <SectionHeading title="玩法简介" />
              <div className="start-game-copy compact">
                {playPoints.map((item, index) => (
                  <p key={index}>{item}</p>
                ))}
              </div>
            </section>

            <div className="start-game-action">
              <Link to="/">开始游戏</Link>
            </div>
          </div>

          <aside className="start-game-panel note-panel">
            <div className="note-label">
              <span>妹妹留下的信件</span>
              <small>点击放大查看</small>
            </div>
            <button
              type="button"
              className="note-button"
              onClick={() => setIsNoteOpen(true)}
              aria-label="放大查看妹妹留下的信件"
            >
              <img src={noteSrc} alt="妹妹留下的信件" />
            </button>
          </aside>
        </section>
      </main>

      {isNoteOpen && (
        <div
          className="note-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="妹妹留下的信件放大图"
          onClick={() => setIsNoteOpen(false)}
        >
          <button type="button" onClick={() => setIsNoteOpen(false)}>
            关闭
          </button>
          <img
            src={noteSrc}
            alt="妹妹留下的信件放大图"
            onClick={(event) => event.stopPropagation()}
          />
        </div>
      )}

      <style>{styles}</style>
    </div>
  );
}

function SectionHeading({ title }) {
  return (
    <header className="section-heading">
      <h2>{title}</h2>
    </header>
  );
}

const styles = `
  .start-game-page {
    min-height: 100vh;
    color: #20352a;
    background:
      linear-gradient(180deg, rgba(246, 250, 247, 0.96), rgba(235, 242, 238, 0.96)),
      repeating-linear-gradient(90deg, rgba(31, 77, 51, 0.025) 0, rgba(31, 77, 51, 0.025) 1px, transparent 1px, transparent 28px);
    font-family: "Microsoft YaHei", "PingFang SC", "Heiti SC", "SimHei", sans-serif;
  }

  .start-game-shell {
    width: min(1160px, calc(100% - 48px));
    margin: 0 auto;
    padding: 44px 0 64px;
  }

  .start-game-hero {
    display: grid;
    grid-template-columns: max-content minmax(0, 1fr);
    gap: clamp(32px, 5vw, 64px);
    align-items: center;
    padding: 34px 0 28px;
    border-bottom: 1px solid #cfded5;
  }

  .start-game-hero > div {
    display: grid;
    justify-items: start;
    justify-self: start;
    text-align: left;
  }

  .start-game-kicker {
    display: block;
    width: 100%;
    margin: 0 0 20px;
    color: #647b70;
    font-size: 14px;
    letter-spacing: 0.08em;
    text-align: left;
  }

  .start-game-hero h1 {
    margin: 0;
    color: #1f4d33;
    font-size: clamp(40px, 5vw, 56px);
    font-weight: 800;
    letter-spacing: 0;
    line-height: 1.05;
  }

  .start-game-hero p {
    margin: 0;
    justify-self: end;
    color: #4d655a;
    font-size: 16px;
    line-height: 1.9;
    white-space: nowrap;
  }

  .start-game-layout {
    display: grid;
    grid-template-columns: minmax(0, 1fr) 310px;
    gap: 24px;
    align-items: start;
    margin-top: 28px;
  }

  .start-game-content {
    display: grid;
    gap: 24px;
    min-width: 0;
  }

  .start-game-panel {
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid #d8e5dd;
    border-radius: 8px;
    box-shadow: 0 14px 36px rgba(31, 77, 51, 0.08);
    padding: clamp(24px, 4vw, 42px);
  }

  .note-panel {
    padding: 16px;
  }

  .section-heading {
    margin-bottom: 24px;
  }

  .section-heading h2 {
    margin: 0;
    color: #1f4d33;
    font-size: clamp(28px, 4vw, 44px);
    font-weight: 700;
    letter-spacing: 0;
  }

  .start-game-copy {
    display: grid;
    gap: 18px;
  }

  .start-game-copy p {
    margin: 0;
    color: #263d31;
    font-size: clamp(17px, 1.65vw, 20px);
    line-height: 1.86;
  }

  .start-game-copy.compact p {
    font-size: clamp(16px, 1.55vw, 19px);
  }

  .start-game-copy strong {
    color: #183b28;
    font-weight: 800;
  }

  .note-label {
    display: flex;
    justify-content: space-between;
    gap: 12px;
    align-items: baseline;
    margin: 2px 2px 12px;
    color: #1f4d33;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    font-weight: 700;
  }

  .note-label small {
    flex: none;
    color: #7c9186;
    font-size: 12px;
    font-weight: 400;
  }

  .note-button {
    display: block;
    width: 100%;
    padding: 0;
    border: 1px solid #cfdcd4;
    border-radius: 7px;
    background: #f8faf9;
    cursor: zoom-in;
    overflow: hidden;
  }

  .note-button img {
    display: block;
    width: 100%;
    height: auto;
  }

  .start-game-action {
    display: flex;
    justify-content: flex-start;
    padding-top: 12px;
  }

  .start-game-action a {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 172px;
    min-height: 50px;
    border-radius: 6px;
    background: #1f6f3a;
    color: #fff;
    text-decoration: none;
    font-family: "Microsoft YaHei", "PingFang SC", sans-serif;
    font-size: 18px;
    font-weight: 700;
    box-shadow: 0 10px 20px rgba(31, 111, 58, 0.2);
  }

  .note-lightbox {
    position: fixed;
    inset: 0;
    z-index: 5000;
    display: grid;
    place-items: center;
    padding: 24px;
    background: rgba(18, 30, 24, 0.76);
    cursor: zoom-out;
  }

  .note-lightbox button {
    position: fixed;
    top: 18px;
    right: 18px;
    border: 1px solid rgba(255, 255, 255, 0.5);
    border-radius: 6px;
    background: rgba(255, 255, 255, 0.92);
    color: #20352a;
    padding: 8px 14px;
    cursor: pointer;
  }

  .note-lightbox img {
    max-width: min(920px, 94vw);
    max-height: 92vh;
    width: auto;
    height: auto;
    border-radius: 7px;
    box-shadow: 0 20px 56px rgba(0, 0, 0, 0.38);
    cursor: default;
  }

  @media (max-width: 900px) {
    .start-game-shell {
      width: min(100% - 28px, 720px);
      padding-top: 24px;
    }

    .start-game-hero,
    .start-game-layout {
      grid-template-columns: 1fr;
    }

    .start-game-hero p {
      justify-self: start;
      white-space: normal;
    }

    .note-panel {
      position: static;
      max-width: 420px;
    }
  }

  @media (max-width: 560px) {
    .start-game-panel {
      padding: 22px 18px;
    }
  }
`;
