import { useState } from 'react';
import { DongyangOldStoriesLayout } from '../DongyangOldStoriesBlog';

const archivedMessages = [
  {
    id: 'hidden-message-1',
    label: '留言 1',
    author: '访客357',
    archivedAt: '2021-11-18 02:13',
    paragraphs: [
      '显示器在念我的名字。拔了插头也念。丢了也念。丢在楼下绿色垃圾桶里。有人往花盆里放种子，花盆以为是礼物。花盆不知道自己是花盆。花盆以为自己是人。',
      '花在我的手机里。我删过，删不掉。拔了手机卡也不行。',
      '信号塔也有。基站也有。WiFi穿墙的时候它在墙里面。以前要进山，现在不用了。喋喋不休地传播它说它饿它说它渴，它说它记下了我家电表的读数还有我的名字。',
      '它的名字是什么？？？？？？？？？？？？',
      '明天 后天。到大后天就来不及了。',
      '黑色  仰着头 四肢朝上。那本书里有。哪本书？那本书里，在那本书里。',
      '花总会开的。你们都知道的，只是你们忘了。它会帮你们记着。死是早晚的事。',

    ],
  },
  {
    id: 'hidden-message-2',
    label: '留言 2',
    author: '访客787',
    archivedAt: '2026-06-14 23:58',
    paragraphs: [
      '我明白了，园丁001是仪式的发起者，而园丁016只是代理执行的那个人。从时间上看，只有一个人有机会做到。',
      '但是……向圣君祈愿时，献上的必须是被栽种者出生时被赋予的本名。如果使用假名、代号、昵称进行祈愿，会遭到反噬。',
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
    label: '留言 3',
    author: 'LHY',
    archivedAt: '2016-04-16 00:12',
    paragraphs: [
      '我找到了残卷的另一半。残卷上说，圣君选中的代理人只能有一个，不是任何主持过栽种仪式的人都可以，只有最初与它签订契约的那个人，最初的“园丁”。只有她能终止仪式。',
      '我知道她仍然在继续仪式，我能感觉到……自从她回到明川以后，那些声音变得越来越多了。那个穿灰色外套的男人，我听见他在想：老周那个位置上坐着的为什么不是我。那个推着婴儿车的女人在想：早知道就不生了，我的人生都被这个孩子毁掉了。那个在学校门口接孩子的父亲，他蹲下来微笑着张开手臂的瞬间，我听见的是：这孩子长得越来越不像我，越来越不像。',
      '我没有时间了……每个人都在诅咒别人，无声地诅咒，礼貌地诅咒，在微笑的同时诅咒。我不知道我听见的这些是真实的还是我已经疯了，可是那些声音从来不重复，为什么它们每一个都说得那么具体，那么精确。',
      '我没有时间了。',
      '我当了很多年记者，写过很多开头，很多结尾。现在我也看到了自己的结尾。这是我最后一次写了，不是写给报纸的，是写给你的——无论你是谁，希望你能够阻止她。',
      '我把线索藏在了新闻网的那些弹窗广告里，其中老虎机里的就是谜面。当你完成一切准备后，连续点击5次[礼物]。那里有属于你的真正大奖。',
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

          .dy-archive-time {
            margin: 2px 0 0;
            color: rgba(74, 36, 29, 0.66);
            font-family: Arial, "Microsoft YaHei", sans-serif;
            font-size: 12px;
            line-height: 1.45;
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
                <p className="dy-archive-time">暂存于 {message.archivedAt}</p>
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
