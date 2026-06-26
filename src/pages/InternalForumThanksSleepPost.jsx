import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import InternalForumCaveBackdrop from '../components/InternalForumCaveBackdrop';
import InternalForumEyesBackground from '../components/InternalForumEyesBackground';
import VerificationModal from '../components/VerificationModal';
import {
  INTERNAL_FORUM_BLACK,
  INTERNAL_FORUM_DARK_SURFACE,
  INTERNAL_FORUM_DARK_SURFACE_ALT,
  INTERNAL_FORUM_GLOW,
  INTERNAL_FORUM_GLOW_STRONG,
  INTERNAL_FORUM_RED,
  INNER_FORUM_LIGHT_ACCENT,
  INNER_FORUM_LIGHT_BG,
  INNER_FORUM_LIGHT_BORDER,
  INNER_FORUM_LIGHT_MUTED,
  INNER_FORUM_LIGHT_SURFACE_ALT,
  INNER_FORUM_LIGHT_TEXT,
} from '../constants/internalForumTheme';

const comments = [
  {
    author: '花匠233',
    role: 'normal_user',
    date: '2026/06/12 11:18:05',
    paragraphs: ['恶人就应该有恶报。'],
  },
  {
    author: '花匠165',
    role: 'normal_user',
    date: '2026/06/12 11:31:47',
    paragraphs: [
      '我懂你兄弟。我以前打工也是整天被老板欺负，动不动就找理由克扣我工资，多亏圣君把这狗东西给解决了。',
      '他妈的，让你们知道老实人也不是好欺负的。',
    ],
  },
  {
    author: '花匠087',
    role: 'normal_user',
    date: '2026/06/12 11:36:12',
    paragraphs: ['恭喜。欢迎回来。'],
  },
  {
    author: '花匠042',
    role: 'normal_user',
    date: '2026/06/12 11:38:49',
    paragraphs: ['说真的，这种人活着本来就是浪费空气。'],
  },
  {
    author: '花匠278',
    role: 'normal_user',
    date: '2026/06/12 11:41:03',
    paragraphs: ['你应该感谢那个敢于反抗的自己'],
  },
  {
    author: '花匠358',
    role: 'normal_user',
    date: '2026/06/12 11:44:27',
    paragraphs: ['这种领导一般都有老婆孩子吧？不知道他们现在睡得怎么样。'],
  },
  {
    author: '花匠204',
    role: 'normal_user',
    date: '2026/06/12 11:47:18',
    paragraphs: ['关我们什么事。当初他折磨别人的时候，怎么没人关心别人睡不睡得着。'],
  },
  {
    author: '花匠297',
    role: 'normal_user',
    date: '2026/06/12 11:50:36',
    paragraphs: ['有些人总觉得坏人也该被温柔对待。真可笑。'],
  },
  {
    author: '花匠109',
    role: 'normal_user',
    date: '2026/06/12 11:54:02',
    paragraphs: ['圣君已经很仁慈，只是让他消失。换成我，我肯定还要狠狠折磨和报复他。'],
  },
];

export default function InternalForumThanksSleepPost() {
  const [showVerification, setShowVerification] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [showReturnBubble, setShowReturnBubble] = useState(false);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open('/p/b12e8f40a6', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => setShowReturnBubble(window.scrollY > 80);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'inner-forum-lights:/p/0b9e71d4ac',
      String(lightsOn)
    );
    window.dispatchEvent(
      new CustomEvent('inner-forum-theme-change', {
        detail: { path: '/p/0b9e71d4ac', lightsOn },
      })
    );
  }, [lightsOn]);

  const theme = lightsOn
    ? {
        bg: INNER_FORUM_LIGHT_BG,
        text: INNER_FORUM_LIGHT_TEXT,
        title: INNER_FORUM_LIGHT_ACCENT,
        meta: INNER_FORUM_LIGHT_MUTED,
        switchText: INNER_FORUM_LIGHT_TEXT,
        switchBorder: INNER_FORUM_LIGHT_BORDER,
      }
    : {
        bg: INTERNAL_FORUM_BLACK,
        text: INTERNAL_FORUM_RED,
        title: INTERNAL_FORUM_RED,
        meta: INTERNAL_FORUM_RED,
        switchText: '#fff200',
        switchBorder: '#fff200',
        glow: INTERNAL_FORUM_GLOW,
        strongGlow: INTERNAL_FORUM_GLOW_STRONG,
      };

  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundColor: lightsOn ? INNER_FORUM_LIGHT_BG : INTERNAL_FORUM_BLACK,
        background: theme.bg,
        color: theme.text,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <InternalForumCaveBackdrop active={!lightsOn} />
      <InternalForumEyesBackground active={!lightsOn} />

      <HeartHomeHeader dark={!lightsOn} variant={lightsOn ? 'innerLight' : 'innerDark'} />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 980,
          margin: '0 auto',
          padding: '64px 42px 92px',
          position: 'relative',
          zIndex: 1,
          boxSizing: 'border-box',
        }}
      >
        <Link
          to="/p/3e7b10a9c4"
          style={{
            position: 'sticky',
            top: 'calc(100vh - 92px)',
            marginLeft: 'calc(100% + 4px)',
            zIndex: 20,
            width: 32,
            height: 84,
            borderRadius: 8,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: lightsOn ? INNER_FORUM_LIGHT_ACCENT : INTERNAL_FORUM_RED,
            color: '#ffffff',
            border: lightsOn ? `1px solid ${INNER_FORUM_LIGHT_ACCENT}` : `1px solid ${INTERNAL_FORUM_RED}`,
            textDecoration: 'none',
            fontSize: 14,
            fontWeight: 800,
            letterSpacing: '0.01em',
            lineHeight: 1.15,
            textAlign: 'center',
            whiteSpace: 'pre-line',
            boxSizing: 'border-box',
            opacity: showReturnBubble ? 1 : 0,
            visibility: showReturnBubble ? 'visible' : 'hidden',
            transform: showReturnBubble ? 'translateY(0)' : 'translateY(8px)',
            pointerEvents: showReturnBubble ? 'auto' : 'none',
            transition: 'opacity 220ms ease, transform 220ms ease, visibility 220ms ease',
          }}
          title="返回论坛"
          aria-label="返回论坛"
        >
          {'返\n回\n论\n坛'}
        </Link>

        <article>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              gap: 16,
              marginBottom: 46,
            }}
          >
            <h1 style={{ margin: 0, color: theme.title, fontSize: 34, fontWeight: 800, lineHeight: 1.35, textShadow: lightsOn ? 'none' : theme.strongGlow }}>
              写下来以后，我终于睡着了
            </h1>
            <button
              type="button"
              onClick={() => setLightsOn((prev) => !prev)}
              style={{
                width: 42,
                height: 42,
                borderRadius: 999,
                border: `1px solid ${theme.switchBorder}`,
                background: 'transparent',
                color: theme.switchText,
                fontSize: 20,
                fontWeight: 700,
                padding: 0,
                cursor: 'pointer',
                display: 'grid',
                placeItems: 'center',
                flex: '0 0 auto',
              }}
              aria-label={lightsOn ? '关灯' : '开灯'}
              title={lightsOn ? '关灯' : '开灯'}
            >
              {lightsOn ? '💡' : '◌'}
            </button>
          </div>

          <div
            style={{
              margin: '0 0 56px',
              color: theme.meta,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 18px',
              fontSize: 16,
              lineHeight: 1.8,
              textShadow: lightsOn ? 'none' : theme.glow,
            }}
          >
            <span>ID: 花匠356</span>
            <span>发帖时间: 2026/06/12 11:11:13</span>
            <span>点赞数: 86</span>
            <span>评论数: {comments.length}</span>
            <span>阅读量: 724</span>
          </div>

          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            我已经很久没有完整睡过觉了。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            连续两年，我每天最害怕的事情就是打开工作群。
            <br />
            只要看到他的名字，我就会开始心慌。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            他会在会议上故意点我发言，反复改已经确认过的方案，在所有人面前说“这种水平到底怎么进公司的”，然后晚上再单独发消息，说我情绪太敏感、抗压能力太差。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            后来我开始失眠。半夜会突然惊醒，梦见手机一直在震。有时候明明已经下班了，我还是不敢看消息提示。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            我试过去医院，试过请假，也试过辞职。可是那种感觉没有停下来。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            直到我进了花园。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            献上名字的那天晚上，我做了一个梦。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            梦里我站在一个漆黑的洞窟里，四周都是湿的。我的脚踝陷在淤泥里，带着一种令人恶心的温热触感，像是有不知名的生物在舔舐、吮吸着我，必须用很大的力气才能站稳。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            但不知为何，我感到很平静。洞内没有任何光源，但我的视野很清楚，我看到密密麻麻的名字就刻在洞壁上。除了他的，还有很多人的。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            这些名字不是凿上去的，是像直接从洞壁内部长出来的一样。笔画歪歪扭扭，有些还在一鼓一鼓地搏动，像皮下的血管。我试着去读，发现每一笔都在动——当我盯住某个字时，它就会慢慢变形，从一个汉字变成一个我不认识的东西，再从那个东西变回汉字。变回来的时候，字已经不是原来的字了。我不再能确定它们原本是什么。地上层层叠叠开着很多黑色的花，黑色的花瓣一片一片叠在一起，像已经结痂了的干枯的大地伤口。每一片花叶都在轻微地蠕动，彼此摩擦时发出沙沙的声音，花心是一张很小很小的嘴，从这些嘴里正往外淌着一种黏稠的液体，像是某种血与唾液的混合物，正是这种液体保持着洞穴的湿润。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            每一朵花都在说话，低低地念着什么。一开始我听不清，那些呻吟很低很低，低到几乎和洞穴的呼吸混在一起。它们念的是同一个名字。那个名字我很熟悉，但我不能确定——它属于那个人？还是属于我自己？无论如何，我听得入了迷，等我意识到的时候，我已经把头伸进了花蕊的中心。湿润的嘴唇包裹着我，像是浸泡在子宫的羊水中，让我的心中充满平静的喜悦。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            在祥和的黑暗中，花心的裂缝张开了。在层层叠叠的尖刺中央，是一颗拇指大小心脏。那颗心脏的表面布满了极细的青色血管，像一张网一样勒住肌肉，一缩，一张，再一缩，每一次搏动，都发出一声极低极低的呻吟，带出一些粘稠的液体。它们不断地在重复，声母和韵母一块一块地剥落，声调开始胡乱的扭曲，每个音节都像是在被打碎之后又勉强粘回去的。重复到那个名字不再像名字，而是变成了一滩被嚼烂又被吐出来的东西。没有形状，没有意义，被碾碎的，没有生气的死肉。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            第二天早上，我在黑暗中睁开眼睛。所有的烦恼和恐惧从我的身体中消失了。我发现自己终于敢把手机声音打开了。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
            我不知道是不是巧合。但从那之后，他再也没有出现在公司群里。我没有问他去了哪里。不知道为什么，我突然不在意了。
          </p>
          <p style={{ margin: '0 0 16px', color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
            谢谢静室，也谢谢大家。
          </p>
          <p style={{ margin: '0 0 56px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            至少现在，我终于能睡个好觉了。
          </p>

          {!lightsOn ? (
            <section
              style={{
                border: `1px solid ${INTERNAL_FORUM_RED}`,
                background: INTERNAL_FORUM_BLACK,
                borderRadius: 14,
                padding: 18,
                display: 'grid',
                gap: 14,
              }}
            >
              {comments.map((comment, index) => (
                <article
                  key={`${comment.author}-${comment.date}`}
                  style={{
                    border: `1px solid ${INTERNAL_FORUM_RED}`,
                    background: INTERNAL_FORUM_DARK_SURFACE,
                    borderRadius: 12,
                    padding: '14px 16px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      marginBottom: 10,
                      color: INTERNAL_FORUM_RED,
                      fontSize: 16,
                      fontWeight: 700,
                    }}
                  >
                    <span>ID: {comment.author}</span>
                    <span
                      style={{
                        border: `1px solid ${INTERNAL_FORUM_RED}`,
                        color: INTERNAL_FORUM_RED,
                        background: INTERNAL_FORUM_DARK_SURFACE_ALT,
                        borderRadius: 999,
                        padding: '2px 10px',
                        fontSize: 14,
                      }}
                    >
                      花匠
                    </span>
                    <span style={{ color: INTERNAL_FORUM_RED, fontWeight: 600 }}>{comment.date}</span>
                    <span
                      style={{
                        marginLeft: 'auto',
                        width: 40,
                        height: 40,
                        borderRadius: 999,
                        display: 'grid',
                        placeItems: 'center',
                        border: `1px solid ${INTERNAL_FORUM_RED}`,
                        color: INTERNAL_FORUM_RED,
                        background: INTERNAL_FORUM_DARK_SURFACE_ALT,
                        fontWeight: 800,
                      }}
                    >
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                  </div>
                  {comment.paragraphs.map((paragraph) => (
                    <p
                      key={paragraph}
                      style={{
                        margin: '0 0 10px',
                        color: INTERNAL_FORUM_RED,
                        fontSize: 18,
                        lineHeight: 1.8,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                </article>
              ))}
            </section>
          ) : null}
        </article>
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={980}
        outerHorizontalPadding={0}
        innerHorizontalPadding={42}
        dark={!lightsOn}
        variant={lightsOn ? 'innerLight' : 'innerDark'}
      />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}
    </div>
  );
}
