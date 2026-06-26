import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import PostInteractionPanel from '../components/PostInteractionPanel';
import VerificationModal from '../components/VerificationModal';
import { publicPath } from '../utils/publicPath';
import {
  INNER_FORUM_LIGHT_ACCENT,
  INNER_FORUM_LIGHT_BG,
  INNER_FORUM_LIGHT_BORDER,
  INNER_FORUM_LIGHT_MUTED,
  INNER_FORUM_LIGHT_SURFACE_ALT,
  INNER_FORUM_LIGHT_TEXT,
} from '../constants/internalForumTheme';

const comments = [
  {
    author: '曾经的海',
    date: '2026/02/08 22:06:14',
    paragraphs: [
      '这不是你矫情，这就是霸凌！！！她们是在给你贴标签，而且一直让你怀疑自己。很多关系霸凌就是这样的，不一定有很大的事件，但会持续消耗你。',
    ],
  },
  {
    author: '北极星',
    date: '2026/02/08 22:11:33',
    paragraphs: ['“你太敏感”“受害者意识”这种话很常见，就是把问题推回你身上。'],
  },
  {
    author: '向阳而生',
    date: '2026/02/08 22:19:48',
    paragraphs: [
      '你已经开始因为她们改变穿着、发言和行动路线了，这说明它已经影响到你了。不要等到更严重才求助。可以找学校心理老师，或者再跟父母说一次，重点说“我已经不敢正常上学了”，这样他们才会重视起来。',
    ],
  },
];

export default function InternalForumBulliedHelpPost() {
  const [showVerification, setShowVerification] = useState(false);
  const [likeCount, setLikeCount] = useState(128);
  const [showReturnBubble, setShowReturnBubble] = useState(false);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open(publicPath('p/b12e8f40a6'), '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowReturnBubble(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      style={{
        minHeight: '100vh',
        background: INNER_FORUM_LIGHT_BG,
        color: INNER_FORUM_LIGHT_TEXT,
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader variant="innerLight" />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 980,
          margin: '0 auto',
          padding: '64px 42px 92px',
          position: 'relative',
          boxSizing: 'border-box',
        }}
      >
        <Link
          to="/p/b12e8f40a6"
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
            background: INNER_FORUM_LIGHT_ACCENT,
            color: '#ffffff',
            border: `1px solid ${INNER_FORUM_LIGHT_ACCENT}`,
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
          <h1
            style={{
              margin: '0 0 46px',
              color: INNER_FORUM_LIGHT_ACCENT,
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.35,
              textAlign: 'left',
            }}
          >
            【求助】被80了怎么办
          </h1>

          <div
            style={{
              margin: '0 0 56px',
              color: INNER_FORUM_LIGHT_MUTED,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 18px',
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            <span>ID: 孤独四叶草</span>
            <span>发帖时间: 2026/02/08 21:58:02</span>
            <span>点赞数：{likeCount}</span>
            <span>评论数：{comments.length}</span>
            <span>阅读量：1482</span>
          </div>

          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              margin: '0 0 30px',
              padding: '10px 16px',
              borderRadius: 999,
              background: INNER_FORUM_LIGHT_SURFACE_ALT,
              border: `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
              color: INNER_FORUM_LIGHT_MUTED,
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.6,
            }}
          >
            该贴子被锁定中，无法公开
          </div>

          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            对不起有些标题党了，打这篇帖子之前我删了很多遍，因为我也不知道这算不算霸凌。可能只是我太敏感，或者我本来就是那种很容易把小事想得很严重的人。
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            我是一个高二女生。这学期开学，班里有几个女生一直说我“装”。一开始只是很小的事，比如我回答问题的时候，她们会在下面小声笑。我听不清完整的话，但能听到“又来了”“好会表现”之类的话。有一次老师夸我作文写得好，下课以后她们就在后面说：“有些人真的很会立人设。”
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            我以前偶尔会穿裙子去学校，也会别一些小发卡什么的，现在我不太敢了。那几个人会说：“上个学而已，这么漂亮打扮给谁看啊。”如果我正好和男生说话了，她们就起哄说“小公主来了！”但如果我不说话，她们又说我在装清高。
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            最近班级群现在有人会用“👸”这个表情来指代我。她们不会直接叫我的名字，也不会当着老师的面说什么很难听的话。她们只是在群里发👸的表情，或者说“某些公主又开始飘了”如果我问，她们就会说：“你怎么什么都往自己身上套啊？”或者说：“我们又没说你，你这么急干嘛？”
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            我试过告诉班主任，但他听完以后说，青春期女生之间讲话，有时候确实是会比较没有轻重，让我不要太在意。还说“你把心思多放在学习上，好好提升自己，不要把同学对你的评价放在心上”。听完以后我更难受了。
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            后来她们好像知道我跟老师说过了，就更不跟我说话了，我路过的时候大家都会突然变得安静，或者互相看一眼，然后故意说：“别说了，等下人家又觉得我们欺负她”。有一次我只是请同桌帮我递一下作业，她们就在后面笑，说：“小公主又需要人伺候了。”
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            现在我每天都在想自己是不是哪里不对。是不是我真的很装？
          </p>
          <p style={{ margin: '0 0 22px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            我不举手回答问题，也不穿喜欢的裙子去上学，走路也尽量不经过她们那边，但她们还是能找到新的话来说我。
            <br />
            我现在只要听见后面有人笑，就会觉得是在笑我。群里有人发一个表情，我会反复想是不是在影射我。我知道这样很累，也很可笑，可是我控制不住。
          </p>
          <p style={{ margin: '0 0 22px', color: '#26313d', fontSize: 21, lineHeight: 1.95 }}>
            对不起，我写到这里还是觉得自己很矫情。明明没有人打我，也没有发生什么特别严重的事。
          </p>
          <p style={{ margin: '0 0 56px', color: INNER_FORUM_LIGHT_TEXT, fontSize: 21, lineHeight: 1.95 }}>
            但我真的每天都很难受。
          </p>

          <PostInteractionPanel
            commentsDisabled={false}
            comments={comments}
            postAuthor="孤独四叶草"
            onLikeChange={(delta) => setLikeCount((current) => current + delta)}
          />
        </article>
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={980}
        outerHorizontalPadding={0}
        innerHorizontalPadding={42}
        variant="innerLight"
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
