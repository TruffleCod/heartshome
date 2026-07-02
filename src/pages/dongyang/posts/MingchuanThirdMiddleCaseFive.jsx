import { DongyangOldStoriesLayout } from '../../DongyangOldStoriesBlog';

const fullSpace = '\u3000';
const gapMarker = '\uE000';
const gap = (count) => gapMarker.repeat(count);

const noteLines = [
  '这并不是一篇公开笔记。能看到这里，只能说明你和我特别',
  '有缘分——或者，你也在找某样东西。',
  '',
  '今天我和小Y重逢了。她长大了，留长了头发，看起来就是一',
  `个普通的都${gap(5)}市女性。如果不是${gap(5)}她先向我`,
  `打了招呼，${gap(1)}我可能完全认不出来。她叫${gap(1)}出我名字的时候，`,
  `声音里有一${gap(5)}种很轻的惊讶，像${gap(5)}是意外于`,
  `我还活着。我不确定${gap(1)}自己还是不是。小${gap(1)}Y看起来很高兴，`,
  `她说，她毕${gap(5)}业以后还去报社找${gap(5)}过我，不`,
  '过那个时候我已经辞职了。这么多年以来,她一直觉得还欠我一',
  '声谢谢。',
  '',
  '我说不敢当。',
  '',
  `小Y坚持要请我吃饭。我本来不想去，她坚持说，只喝一杯`,
  `咖啡就走。我突${gap(1)}然觉得，这一天或许${gap(4)}早就该来的，`,
  `只是我误以为${gap(1)}能${gap(1)}躲得掉。心里有什${gap(1)}么东西${gap(1)}松开了。`,
  `不是释然，${gap(5)}而是绷了很久的${gap(4)}终于断了。我`,
  `说，我知道${gap(1)}一个不${gap(1)}错的咖啡馆，离${gap(1)}这里${gap(1)}不远，那里的`,
  `豆子听别人${gap(1)}说非常${gap(1)}新鲜，你难得回${gap(1)}来明川${gap(1)}一趟，我请`,
  '你吧。她笑盈盈地说，好呀。',
  '',
  `其实我并不${gap(5)}经常喝咖啡。我${gap(1)}弄不懂${gap(1)}人类为`,
  `什么会对这${gap(1)}种深褐色的、浓稠的液体${gap(1)}着迷。${gap(1)}明明`,
  `超过一千毫${gap(1)}克的咖啡因对人类来说就${gap(5)}可以致死`,
  `，而大家每${gap(1)}天却对微量摄入这种毒药${gap(1)}甘之如${gap(1)}饴。动物`,
  `在面临危险${gap(5)}时，本能地会选${gap(1)}择逃跑${gap(1)}，而人类`,
  `反而会因为自己引以为傲的文明选择自取灭亡。如同现在的`,
  `我一样。`,
  '',
  `小Y就坐在我对面，做了美甲的纤细手指握着汤匙轻轻搅`,
  `动着咖啡${gap(5)}液，发出悦耳的${gap(1)}叮咚声${gap(1)}。我盯着她`,
  `指甲上的${gap(1)}黑色花朵纹看了一会儿，${gap(1)}它在杯${gap(1)}我的眼前顺`,
  `时针旋转${gap(1)}，${gap(3)}转了很多圈，没${gap(1)}有停下${gap(1)}来的意思。`,
  `小Y的声${gap(1)}音轻柔${gap(1)}地响起：“你什${gap(1)}么时开${gap(1)}始知道是`,
  `我？”在${gap(5)}第一个女孩失踪${gap(5)}的时候，我`,
  `就开始有这种猜想。我说。你不该告诉我你为什么去清川`,
  '公园。',
  '',
  '小Y纤长的睫毛微微颤动着。她自嘲地笑起来：“是，我',
  '不该说的。但那时候我太寂寞了。”',
  '',
  '我眼前好像又浮现出那日她躺在病床上的模样。鼻骨线性骨',
  '折，左七肋骨不完全性骨折，头面躯干及四肢多处皮下瘀血',
  `斑。这${gap(5)}些都可以被解释为倒${gap(5)}塌的房屋`,
  `所致。${gap(1)}而那几枚新鲜的、疑似烟头烫${gap(1)}伤的圆形瘢痕，就`,
  `被大家${gap(5)}选择性无视了。搜救${gap(5)}报告里没`,
  `有写，${gap(1)}医院记录里也没有写。我是在一张我自${gap(1)}己拍的照`,
  `片里发${gap(5)}现的。她的手腕从担${gap(5)}架边缘垂`,
  '下来，袖子往上滑了一截，那几个圆形的瘢痕落在衣袖刚好',
  '可以遮住的位置。',
  '',
  '“爸爸不许我往外说。王静的爸爸是市里面的大领导，他惹',
  `不起，就主${gap(5)}动提出要私。加${gap(4)}下和解上后`,
  `面的失踪事件，${gap(1)}他也怕了，连高中都${gap(1)}没读完${gap(1)}，就把我`,
  `送出了国，生怕${gap(1)}有任何人可以联系到${gap(4)}我。“你爸`,
  `现在也是市教育${gap(1)}局的大领导呢。”我${gap(1)}说。“${gap(1)}其实他应`,
  `该一直很讨厌我${gap(1)}。作为一个青少年心${gap(4)}理咨询领域`,
  '的专家，他的女儿却是一个饱受抑郁和霸凌摧残的弱者，我',
  '的存在让他很丢脸。',
  '',
  '“但没关系，我也讨厌他，所以我连名带姓都改了。现在我',
  '跟妈妈姓。”',
  '',
  '她告诉我她的新名字。我重复了一遍，随后明白过来：“这',
  '是个字谜。”小Y笑眯眯地看着我：“是的，一个只有你知道',
  '的字谜。',
  '',
  '搅动的咖啡液逐渐冷却了，液面上映出她美丽的脸。我看着',
  `那张脸在${gap(4)}深褐色的液面上${gap(4)}微微晃动。“知`,
  `道我真名${gap(1)}的人${gap(1)}，只剩下你一个${gap(1)}。”${gap(1)}了窗外有人在浇`,
  `花，水管${gap(1)}里的${gap(1)}水珠打在叶片上${gap(1)}，发${gap(1)}出细密的声响。`,
  `咖啡馆里${gap(4)}有人推门进来，${gap(4)}带进一阵风，倒`,
  '映在咖啡液里的脸颊，还有那块脖子上的暗红色胎记跟着风',
  '一起轻微地摇晃，像一朵花。我感到一阵眩晕。',

  '',
  '“我会死吗？”我问。',

  '',
  '小Y没有正面回答我。她露出一丝苦笑，目光好像落在了很遥',
  `远的地方${gap(1)}“你和${gap(1)}我一样,每天都会梦到它，是不是？”她`,
  `说，“这${gap(1)}样的我${gap(1)}们，活着和死了，又有多大区别呢？”`,
  `小Y走了${gap(1)}。窗${gap(1)}外开始下雨，玻璃上淌下细密的水痕，映`,
  `出我自己${gap(4)}的脸。疲惫、苍白，像一张被水泡烂的旧照`,
  `片。我看${gap(1)}着那${gap(1)}张脸看了很久，忽然注意到一件事——`,
  `玻璃上我${gap(1)}的倒影${gap(1)}在微笑。嘴角是往上拉的，很轻微，轻`,
  '微到我自己都感觉不到。',
  '',
  '这是我最后一次见到小Y。',
  '',
  '如果你看到这里，博客里有我为你留下的最后的礼物。如果',
  '你打不开，就不要勉强。也许这对你来说是一件好事。',
];

function measureGridWidth(text) {
  return Array.from(text).length;
}

function splitGridLine(line) {
  const fragments = [];
  let cursor = 0;
  let start = 0;
  let text = '';
  let gapText = '';
  let gapStart = 0;

  const flushText = () => {
    if (text) {
      fragments.push({ text, x: start });
      text = '';
    }
  };

  const flushGap = () => {
    if (gapText) {
      fragments.push({ text: gapText, x: gapStart, isGap: true });
      gapText = '';
    }
  };

  Array.from(line).forEach((character) => {
    if (character === fullSpace) {
      flushText();
      flushGap();

      cursor += 1;
      return;
    }

    if (character === gapMarker) {
      flushText();

      if (!gapText) {
        gapStart = cursor;
      }

      gapText += '＊';
      cursor += 1;
      return;
    }

    flushGap();

    if (!text) {
      start = cursor;
    }

    text += character;
    cursor += 1;
  });

  flushText();
  flushGap();

  return {
    isBlank: line === '',
    fragments,
    width: cursor,
  };
}

const noteRows = noteLines.map(splitGridLine);
const canvasColumns = Math.max(...noteLines.map(measureGridWidth));

export default function MingchuanThirdMiddleCaseFive() {
  return (
    <DongyangOldStoriesLayout>
      <article className="dy-card dy-case-five-card" style={{ '--dy-note-columns': canvasColumns }}>
        <div className="dy-card-body">
          <style>{`
            .dy-case-five-card {
              --dy-note-font-size: clamp(13px, 1.28vw, 20px);
              --dy-note-cell: var(--dy-note-font-size);
              --dy-note-side-padding: 42px;
              width: min(
                calc((var(--dy-note-cell) * var(--dy-note-columns)) + (var(--dy-note-side-padding) * 2)),
                100%
              );
              max-width: 100%;
              margin-inline: 0;
            }

            .dy-case-five-card .dy-card-body {
              padding: 28px var(--dy-note-side-padding) 32px;
            }

            .dy-case-five-card .dy-case-five-content {
              width: calc(var(--dy-note-cell) * var(--dy-note-columns));
              max-width: 100%;
              margin: 0 auto;
            }

            .dy-case-five-card .dy-hidden-note {
              max-width: 100%;
              padding-top: 10px;
              overflow: hidden;
            }

            .dy-case-five-card .dy-hidden-note-canvas {
              width: calc(var(--dy-note-cell) * var(--dy-note-columns));
              max-width: 100%;
              margin: 0;
              color: #4a241d;
              font-family: "Microsoft YaHei", SimHei, Arial, sans-serif;
              font-size: var(--dy-note-font-size);
              font-weight: 800;
              line-height: 1.18;
              letter-spacing: 0;
              user-select: text;
            }

            .dy-case-five-card .dy-note-line {
              position: relative;
              height: calc(var(--dy-note-font-size) * 1.18);
            }

            .dy-case-five-card .dy-note-line.blank {
              height: calc(var(--dy-note-font-size) * 1.75);
            }

            .dy-case-five-card .dy-note-fragment {
              position: absolute;
              top: 0;
              left: calc(var(--dy-note-cell) * var(--dy-note-x));
              white-space: pre;
            }

            .dy-case-five-card .dy-note-fragment.gap {
              font-family: inherit;
            }

            @media (max-width: 820px) {
              .dy-case-five-card {
                --dy-note-font-size: clamp(8px, 1.9vw, 12px);
                --dy-note-side-padding: 18px;
              }

              .dy-case-five-card .dy-card-body {
                padding-top: 22px;
                padding-bottom: 24px;
              }
            }
          `}</style>
          <div className="dy-case-five-content">
            <h1>明川三中少女失踪案调查笔记 其五</h1>
            <div className="dy-post-time">2016-04-16 23:47</div>
            <div className="dy-hidden-note" aria-label="调查笔记正文">
              <div className="dy-hidden-note-canvas">
                {noteRows.map((row, rowIndex) => (
                  <div
                    className={`dy-note-line${row.isBlank ? ' blank' : ''}`}
                    key={`note-row-${rowIndex}`}
                  >
                    {row.fragments.map((fragment, fragmentIndex) => (
                      <span
                        className={`dy-note-fragment${fragment.isGap ? ' gap' : ''}`}
                        key={`note-row-${rowIndex}-fragment-${fragmentIndex}`}
                        style={{ '--dy-note-x': fragment.x }}
                      >
                        {fragment.text}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </DongyangOldStoriesLayout>
  );
}
