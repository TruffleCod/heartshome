import { DongyangOldStoriesLayout } from '../../DongyangOldStoriesBlog';

const fullSpace = '\u3000';
const gap = (count) => fullSpace.repeat(count);

const noteLines = [
  '这并不是一篇公开笔记。 能看到这里， 只能说明你和我特别',
  '有缘分——或者，你也在找某样东西。',
  '',
  '今天我和小Y重逢了。她长大了，留长了头发，看起来就是一',
  `个普通的${gap(5)}都市女性。如${gap(5)}果不是她先向`,
  `我打了招${gap(1)}呼，我可能完全认不出${gap(1)}来。她叫出我名字的时`,
  `候，声音${gap(5)}里有一种很轻${gap(5)}的惊讶，像是`,
  `意外于我还活着。${gap(1)}我不确定自己${gap(1)}还是不是小Y看起来很`,
  `高兴她说${gap(5)}她毕业以后还${gap(5)}去报社找过`,
  '我,不过那个时候我已经辞职了。这么多年以来，她一直觉',
  '得还欠我一声谢谢。',
  '',
  '我说不敢当。',
  '',
  `小Y坚持要请我吃饭。我本来不想去，她坚持说，只喝一杯咖啡`,
  `就走。我${gap(3)}突然觉得，这一天${gap(7)}或许早就该`,
  `来的，${gap(1)}只是我${gap(1)}误以为能躲得掉.${gap(1)}心里有${gap(2)}什么东西松开`,
  `了。${gap(1)}不是释然${gap(1)}，是绷了很久的${gap(2)}线终于${gap(2)}断了。我说，`,
  `我${gap(9)}知道一个不${gap(7)}错的咖啡馆，`,
  `离${gap(1)}这里不远，那里${gap(1)}的豆子听别${gap(2)}人说非${gap(2)}常新鲜，难`,
  '得回来明川一趟，我请你吧。她笑盈盈地说好呀。',
  '',
  `其实我并${gap(5)}不经常喝咖啡${gap(1)}。我弄${gap(1)}不懂人类为`,
  `什么会对${gap(1)}这种深褐色的、浓稠的${gap(1)}液体着${gap(1)}迷。超过`,
  `一千毫克${gap(1)}的咖啡因对人类来说就${gap(5)}可以致死`,
  `，而大家${gap(5)}每天却对微量${gap(1)}摄入这${gap(1)}种毒药甘之`,
  '如饴。如同现在的我一样。',
  '',
  `小Y就坐在我对面， 做了美甲的纤细手指握着汤匙轻轻搅动着`,
  `咖啡液，${gap(5)}发出悦耳的叮${gap(1)}咚声。我${gap(1)}盯着她指`,
  `甲上的${gap(1)}黑色花朵纹看了一会儿，${gap(1)}它在杯我${gap(1)}的眼前顺`,
  `时针旋${gap(1)}转，${gap(3)}转了很多圈，${gap(1)}没有停下${gap(1)}来的意`,
  `思。小${gap(1)}Y的声音${gap(1)}轻柔地响起：${gap(1)}“你什么${gap(1)}时候开始`,
  `知道是${gap(1)}我？”在${gap(1)}第一个女孩失${gap(1)}踪的时候${gap(1)}，我就`,
  `开始有${gap(6)}这种猜想。我${gap(6)}说。你不`,
  '该告诉我你为什么去清川公园。小Y纤长的睫毛微微颤动着。',
  '',
  '她自嘲地笑起来：“是，我不该说的。但那时候我太寂寞了。”',
  '',
  '我眼前好像又浮现出那日她躺在病床上的模样。鼻骨线性骨',
  '折，左七肋骨不完全性骨折，头面躯干及四肢多处皮下瘀血',
  `斑。这${gap(5)}些都可以被${gap(5)}解释为倒塌的房屋`,
  `所致。${gap(1)}而那几枚新鲜的、疑${gap(1)}似烟头烫伤的圆形瘢痕，就`,
  `被大家${gap(5)}选择性无视${gap(5)}了。搜救报告里没`,
  `有写，${gap(1)}医院记录里也没有写。我是在${gap(1)}一张我自己拍的照`,
  `片里发${gap(5)}现的。她的${gap(5)}手腕从担架边缘垂`,
  '下来，袖子往上滑了一截，那几个圆形的瘢痕落在衣袖刚好',
  '可以遮住的位置。',
  '',
  '“爸爸不许我往外说。 王静的爸爸是市里面的大领导，他惹不',
  `起，就主${gap(7)}动提出要私${gap(6)}下和解。`,
  `加上后面的失踪${gap(1)}事件，他也怕了连${gap(1)}高中都没${gap(1)}读完就把`,
  `我送出了国，生${gap(1)}怕有任何人可以联${gap(6)}系到我。`,
  `你爸爸现在也是${gap(1)}市教育局的大领导${gap(1)}了。我说。其实他一`,
  `直很讨厌我。作${gap(1)}为一个青少年心理${gap(6)}咨询专`,
  '家，他的女儿却是一个饱受抑郁和霸凌摧残的弱者，我的存',
  '在让他很丢脸。',
  '',
  '“但没关系，我也讨厌他，所以我连名带姓都改了。现在我跟',
  '妈妈姓。”',
  '',
  '她告诉我她的新名字。我重复了一遍，随后明白过来：“这是',
  '个字谜。”小Y笑眯眯地看着我：“是的，一个只有你知道的字',
  '谜。',
  '',
  '搅动的咖啡液逐渐冷却了，液面上映出她美丽的脸。我看着',
  `那张脸在${gap(5)}深褐色的液面上${gap(5)}微微晃动。`,
  `知道我真${gap(1)}名的人${gap(1)}，只剩下你一个${gap(1)}了。窗${gap(1)}外有人在浇花，`,
  `水管里的${gap(1)}水珠打${gap(1)}在叶片上，发出${gap(1)}细密的${gap(1)}声响。咖啡`,
  `馆里有人${gap(5)}推门进来，带进${gap(5)}一阵风，倒`,
  '映咖啡液里里的那张脸也跟着轻微地摇晃了一下。我感到一',
  '阵眩晕。',

  '',
  '“我会死吗？”我问。',

  '',
  '小Y没有正面回答我。她露出一丝苦笑，目光好像落在了很遥',
  `远的地方${gap(1)} "你和我一${gap(1)}样,每天都会梦到它，是不是？”她`,
  `说，“这${gap(1)}样的我们，${gap(1)}活着和死了，又有多大区别呢？”`,
  `小Y走了${gap(1)}窗外开始${gap(1)}下雨，玻璃上淌下细密的水痕，映`,
  `出我自己${gap(6)}的脸。疲惫、苍白，像一张被水泡`,
  `烂的旧照${gap(1)}片。我${gap(2)}看着那张脸看了很久，忽然注意到`,
  `一件事--${gap(1)}玻璃上${gap(2)}的倒影在笑。嘴角是往上拉的，很`,
  '轻微，轻微到我自己都感觉不到。',
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

  Array.from(line).forEach((character) => {
    if (character === fullSpace) {
      if (text) {
        fragments.push({ text, x: start });
        text = '';
      }

      cursor += 1;
      return;
    }

    if (!text) {
      start = cursor;
    }

    text += character;
    cursor += 1;
  });

  if (text) {
    fragments.push({ text, x: start });
  }

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
                        className="dy-note-fragment"
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
