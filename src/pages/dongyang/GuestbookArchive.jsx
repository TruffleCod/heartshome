import { useState } from 'react';
import { DongyangOldStoriesLayout } from '../DongyangOldStoriesBlog';

const archivedMessages = [
  {
    id: 'hidden-message-1',
    label: '暂存留言 1',
    author: '访客357',
    paragraphs: [
      '显示器在念我的名字。拔了插头也念。丢了也念。丢在楼下绿色垃圾桶里。有人往花盆里放种子，花盆以为是礼物。花盆不知道自己是花盆。花盆以为自己是人。',
      '花在我的手机里。我删过，删不掉。拔了手机卡也不行。',
      '信号塔也有。基站也有。WiFi穿墙的时候它在墙里面。以前要进山，现在不用了。喋喋不休地传播它说它饿它说它渴它说它记下了你家电表的读数还有你的名字。',
      '明天 后天。到大后天就来不及了。',
      '黑色  仰着头 四肢朝上。',
      '花总会开的。你们都知道的，你们都养过花，只是你们忘了。它会帮你们记着。早晚的事。',
    ],
  },
  {
    id: 'hidden-message-2',
    label: '暂存留言 2',
    author: '访客787',
    paragraphs: [
      '规则一：圣君是绝对公正的。它会看到被栽种者的一切罪行，并予以裁决。',
      '规则二：向圣君祈愿时，献上的必须是被栽种者的本名。如果使用假名、代号、昵称进行祈愿，会遭到反噬。',
      '我不知道她真正的名字。我失败了。对不起。',
      '这些天以来，我一直能听到有人在叫我的名字。一开始只是在梦里，后来是白天。走在走廊里，街上的车流里，哪怕现在坐在电脑前，我也能依稀从风扇的嗡嗡声中听到那种很细很远的回声。',
      '“它”，她，他们。他们在呼唤我。',
      '赵兰子失踪那天晚上，我梦见了她，她站在洞窟里，墙上已经刻好了她的名字。她在哭，眼泪顺着脸淌下来，流进花心里。',
      '她说的对。是我亲自输入了赵兰子的名字。赵兰子是被我害死的。',
      '我不想再看到任何人被“它”吞掉了。如果“它”吃掉我，是不是就不会再吃别人了？',
      '爸爸妈妈还有姐姐，对不起。我没有成为你们期望的样子。姐姐你教过我，被欺负了要反抗，要保护自己，你教我做一个勇敢的人。我真的试过了，但我不是你。你的妹妹既不够善良，也不够勇敢。',
      '也许它不会因为我停下来。可是我已经想不出更好的办法了。',
    ],
  },
  {
    id: 'hidden-message-3',
    label: '暂存留言 3',
    author: 'LHY',
    paragraphs: [
      '园丁的账号里有阻止仪式的唯一办法。我把线索藏在了新闻网的弹窗里，希望你能够破解它。',
      '一加一。',
      '我一半你一半。',
      '守门员。',
      '王。',
      '伐。',
      '闪。',
    ],
  },
];

export default function DongyangGuestbookArchive() {
  const [activeMessageId, setActiveMessageId] = useState(null);

  return (
    <DongyangOldStoriesLayout>
      <section className="dy-message-section archive" aria-label="留言板暂存箱">
        <style>{`
          .dy-archive-list {
            max-width: 720px;
            border-top: 1px dotted rgba(106, 22, 19, 0.34);
            border-bottom: 1px dotted rgba(106, 22, 19, 0.34);
          }

          .dy-archive-item {
            border-bottom: 1px dotted rgba(106, 22, 19, 0.26);
          }

          .dy-archive-item:last-child {
            border-bottom: 0;
          }

          .dy-archive-trigger {
            width: 100%;
            display: block;
            padding: 12px 0 14px;
            border: 0;
            background: transparent;
            color: inherit;
            text-align: left;
            cursor: pointer;
          }

          .dy-archive-trigger:hover {
            background: rgba(255, 242, 189, 0.36);
          }

          .dy-archive-trigger h2 {
            margin: 0;
            color: #4a241d;
            font-family: Arial, "Microsoft YaHei", sans-serif;
            font-size: 15px;
            font-weight: 700;
            line-height: 1.7;
            text-decoration: underline;
            text-underline-offset: 3px;
          }

          .dy-archive-panel {
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            transition: max-height 260ms ease, opacity 180ms ease;
          }

          .dy-archive-panel.open {
            max-height: 900px;
            opacity: 1;
          }

          .dy-archive-panel-inner {
            box-sizing: border-box;
            padding: 14px 18px 18px;
          }
        `}</style>
        <div className="dy-search-heading">
          <h1>留言板暂存箱</h1>
          <p>以下内容已被暂存。部分留言正文尚未恢复。</p>
        </div>

        <div className="dy-archive-list">
          {archivedMessages.map((message) => (
            <div className="dy-archive-item" key={message.id}>
              <button
                className="dy-archive-trigger"
                type="button"
                onClick={() =>
                  setActiveMessageId((current) =>
                    current === message.id ? null : message.id
                  )
                }
              >
                <p className="dy-result-type">隐藏留言 | {message.author}</p>
                <h2>{message.label}</h2>
              </button>
              <div
                className={`dy-archive-panel${
                  activeMessageId === message.id ? ' open' : ''
                }`}
              >
                <article className="dy-card dy-message dy-archive-panel-inner">
                  {message.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </article>
              </div>
            </div>
          ))}
        </div>
      </section>
    </DongyangOldStoriesLayout>
  );
}
