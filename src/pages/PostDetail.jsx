import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import PostInteractionPanel from '../components/PostInteractionPanel';
import VerificationModal from '../components/VerificationModal';
import posts from '../data/posts.json';
import baiheImage from '../assets/flowers/baihe.png';
import lianhuaImage from '../assets/flowers/lianhua.png';
import meiguiImage from '../assets/flowers/meigui.png';
import pugongyingImage from '../assets/flowers/pugongying.png';
import sansejinImage from '../assets/flowers/sansejin.png';
import xiangrikuiImage from '../assets/flowers/xiangrikui.png';
import xianrenzhangImage from '../assets/flowers/xianrenzhang.png';
import yuanweihuaImage from '../assets/flowers/yuanweihua.png';
import yueguanghuaImage from '../assets/flowers/yueguanghua.png';
import ziluolanImage from '../assets/flowers/ziluolan.png';

const lifeFlowerMap = {
  0: {
    flower: '百合',
    title: '纯洁与灵性的守护者',
    description:
      '你内心宁静，追求精神上的和谐与完整。拥有一种超越世俗的优雅和强大的直觉力，能在混乱中为你和他人带来平静与治愈。',
  },
  1: {
    flower: '向日葵',
    title: '阳光与创造的先驱',
    description:
      '你天生具有领导力和明确的自我意识，像向日葵追寻太阳一样，永远朝着自己的目标与理想生长。你的存在本身就是信心与活力的象征。',
  },
  2: {
    flower: '月光花',
    title: '合作与敏感的桥梁',
    description:
      '你温柔、细腻、富有同理心，是天生的合作者。如同在月光下静静绽放，你善于倾听与调和，能在关系中建立深刻的信任与和谐。',
  },
  3: {
    flower: '三色堇',
    title: '快乐与表达的精灵',
    description:
      '你充满创意、幽默感和好奇心，拥有将快乐传播给周围每个人的天赋。你的思维活跃，表达方式丰富多彩，是人群中的灵感源泉。',
  },
  4: {
    flower: '仙人掌',
    title: '坚韧与实际的筑梦家',
    description:
      '你务实、可靠，拥有强大的生命力和清晰的边界感。你懂得在现实中稳步扎根，积蓄能量。你的花朵虽不常开，但一旦绽放，便惊艳而持久。',
  },
  5: {
    flower: '鸢尾花',
    title: '孤傲与深邃的追梦人',
    description:
      '你带着一种与生俱来的神秘与疏离感，如同月光下的蓝色鸢尾。你的独立并非冷漠，而是源于丰富的精神世界和对自由的极致追求。你享受独处的深度，在静默中积蓄着穿透一切的力量。',
  },
  6: {
    flower: '玫瑰',
    title: '爱与责任的守护者',
    description:
      '你充满爱心，重视家庭与责任，渴望建立深厚的情感联结。你懂得平衡付出与收获，像玫瑰一样，既美丽温柔，又有保护自己的锋芒。',
  },
  7: {
    flower: '紫罗兰',
    title: '真理与内省的哲人',
    description:
      '你沉稳、内敛，拥有深刻的洞察力和强大的思考能力。你喜欢探索事物背后的真相，在独处中获得力量，是智慧的追寻者和守护者。',
  },
  8: {
    flower: '莲花',
    title: '力量与再生的象征',
    description:
      '你拥有强大的内在力量和精神韧性。如同莲花出淤泥而不染，你能够挑战转化为成长的养分，在经历蜕变后，展现出惊人的潜力和成就。',
  },
  9: {
    flower: '蒲公英',
    title: '自由与变化的旅人',
    description:
      '你的灵魂热爱自由，渴望经历生命的丰富多彩。你适应力极强，敢于冒险，能将希望的种子随风播撒到任何地方，落地生根。',
  },
};

const lifeFlowerImageMap = {
  0: baiheImage,
  1: xiangrikuiImage,
  2: yueguanghuaImage,
  3: sansejinImage,
  4: xianrenzhangImage,
  5: yuanweihuaImage,
  6: meiguiImage,
  7: ziluolanImage,
  8: lianhuaImage,
  9: pugongyingImage,
};

function calcLifeNumber(input) {
  const digits = String(input).replace(/\D/g, '');
  if (!digits) return null;
  let sum = digits.split('').reduce((acc, d) => acc + Number(d), 0);
  while (sum >= 10) {
    sum = String(sum)
      .split('')
      .reduce((acc, d) => acc + Number(d), 0);
  }
  return sum;
}

function formatBirthdayInput(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 4) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 4)}/${digits.slice(4)}`;
  return `${digits.slice(0, 4)}/${digits.slice(4, 6)}/${digits.slice(6)}`;
}

function isValidBirthdayInput(value) {
  const digits = String(value).replace(/\D/g, '').slice(0, 8);
  if (digits.length !== 8) return false;

  const year = Number(digits.slice(0, 4));
  const month = Number(digits.slice(4, 6));
  const day = Number(digits.slice(6, 8));

  if (year < 1900 || year > 2100) return false;
  if (month < 1 || month > 12) return false;
  if (day < 1 || day > 31) return false;

  const date = new Date(year, month - 1, day);
  return (
    date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
  );
}

export default function PostDetail({ postId: routedPostId }) {
  const { postId: paramPostId } = useParams();
  const postId = routedPostId || paramPostId;
  const post = posts.find((item) => String(item.id) === postId);
  const [showVerification, setShowVerification] = useState(false);
  const [likeCount, setLikeCount] = useState(Number(post?.likeCount || 0));
  const [showReturnBubble, setShowReturnBubble] = useState(false);
  const [birthdayDigits, setBirthdayDigits] = useState('');
  const [lifeNumberResult, setLifeNumberResult] = useState(null);
  const [showLifeModal, setShowLifeModal] = useState(false);
  const [birthInputError, setBirthInputError] = useState('');

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open('/p/b12e8f40a6', '_blank', 'noopener,noreferrer');
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowReturnBubble(window.scrollY > 80);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#ffffff' }}>
        <HeartHomeHeader />
        <main style={{ maxWidth: 980, margin: '0 auto', padding: '64px 42px 92px' }}>
          <h1>帖子不存在或被隐藏</h1>
          <p>没有找到对应的帖子，请返回论坛重新选择。</p>
          <Link to="/p/b12e8f40a6">返回论坛</Link>
        </main>
      </div>
    );
  }

  const contentParagraphs = post.contentParagraphs || [post.content];
  const commentCount = Number(post.commentCount ?? post.replies ?? 0);
  const viewCount = Number(post.viewCount ?? 0);
  const comments = Array.isArray(post.comments)
    ? post.comments
    : post.counselor
      ? [
          {
            author: `${post.counselor.name}`,
            role: 'official_counselor',
            date: post.counselor.date,
            paragraphs: post.counselor.paragraphs || [],
            bullets: post.counselor.bullets || [],
          },
        ]
      : [];

  const onSubmitBirthday = () => {
    if (!isValidBirthdayInput(birthdayDigits)) {
      setBirthInputError('请输入有效生日，例如 1995/03/08');
      return;
    }

    const num = calcLifeNumber(birthdayDigits);
    if (num === null) {
      setBirthInputError('请输入有效生日，例如 1995/03/08');
      return;
    }

    setBirthInputError('');
    setLifeNumberResult(num);
    setShowLifeModal(true);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        color: '#26313d',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader />

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
            background: '#1f4d33',
            color: '#ffffff',
            border: '1px solid #1a412b',
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
              color: '#243142',
              fontSize: 34,
              fontWeight: 800,
              lineHeight: 1.35,
              textAlign: 'left',
            }}
          >
            {post.title}
          </h1>

          <div
            style={{
              margin: '0 0 56px',
              color: '#334155',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '10px 18px',
              fontSize: 16,
              lineHeight: 1.8,
            }}
          >
            <span>ID: {post.author}</span>
            <span>发帖时间: {post.date}</span>
            <span>点赞数：{likeCount}</span>
            <span>评论数：{commentCount}</span>
            <span>阅读量：{viewCount}</span>
          </div>

          {contentParagraphs.map((paragraph, index) => (
            <p
              key={`content-${index}`}
              style={{
                margin:
                  post.id === 'holiday-flower' && String(paragraph).includes('输入生日，生成你的心灵之花。')
                    ? '0 0 8px'
                    : index === contentParagraphs.length - 1
                      ? '0 0 56px'
                      : '0 0 22px',
                color: '#26313d',
                fontSize: 21,
                lineHeight: 1.95,
                fontWeight:
                  post.id === 'holiday-flower' && String(paragraph).includes('你的生命数字，藏着怎样的芬芳？')
                    ? 700
                    : 400,
              }}
            >
              {post.id === 'moral-kidnapping-rant' &&
              String(paragraph).includes('（该帖子已被隐藏）') ? (
                <>
                  最离谱的是，我今天才发现，她居然还在心之家上发帖挂我们：
                  <Link
                    to="/p/b80a4e6c1f"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: '#1f5f3a',
                      textDecoration: 'underline',
                      fontWeight: 700,
                      marginLeft: 6,
                    }}
                  >
                    【求助】被80了怎么办
                  </Link>
                </>
              ) : (
                paragraph
              )}
            </p>
          ))}

          {post.id === 'holiday-flower' ? (
            <section
              style={{
                margin: '0 0 56px',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                flexWrap: 'wrap',
              }}
            >
              <input
                type="text"
                placeholder="YYYY/MM/DD"
                value={formatBirthdayInput(birthdayDigits)}
                onChange={(event) =>
                  setBirthdayDigits(String(event.target.value).replace(/\D/g, '').slice(0, 8))
                }
                inputMode="numeric"
                maxLength={10}
                autoComplete="off"
                style={{
                  width: 180,
                  height: 38,
                  borderRadius: 8,
                  border: '1px solid #cfe0d5',
                  padding: '0 10px',
                  fontSize: 15,
                  color: '#243142',
                  boxSizing: 'border-box',
                }}
              />
              <button
                type="button"
                onClick={onSubmitBirthday}
                style={{
                  height: 38,
                  padding: '0 16px',
                  borderRadius: 8,
                  border: '1px solid #1a412b',
                  background: '#1f4d33',
                  color: '#ffffff',
                  fontSize: 14,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                提交
              </button>
              {birthInputError ? (
                <p style={{ margin: '4px 0 0', width: '100%', color: '#b42318', fontSize: 13 }}>
                  {birthInputError}
                </p>
              ) : null}
            </section>
          ) : null}

          <PostInteractionPanel
            commentsDisabled={false}
            comments={comments}
            postAuthor={post.author}
            onLikeChange={(delta) => setLikeCount((current) => current + delta)}
          />
        </article>
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={980}
        outerHorizontalPadding={0}
        innerHorizontalPadding={42}
      />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}

      {showLifeModal && lifeNumberResult !== null ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(15, 23, 42, 0.36)',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            style={{
              width: 'min(420px, 92vw)',
              aspectRatio: '3 / 4',
              background: '#ffffff',
              borderRadius: 16,
              border: '1px solid #d4e3d9',
              boxShadow: '0 24px 50px rgba(0, 0, 0, 0.2)',
              overflow: 'hidden',
              display: 'grid',
              gridTemplateRows: '47% 53%',
            }}
          >
            <div
              style={{
                background: '#eaf2ec',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                padding: 0,
                borderBottom: '1px solid #d4e3d9',
                overflow: 'hidden',
              }}
            >
              <img
                src={lifeFlowerImageMap[lifeNumberResult] || baiheImage}
                alt={lifeFlowerMap[lifeNumberResult].flower}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>

            <div style={{ padding: '18px 18px 14px', display: 'flex', flexDirection: 'column' }}>
              <h2 style={{ margin: '0 0 6px', color: '#173b28', fontSize: 22, lineHeight: 1.3 }}>
                {lifeFlowerMap[lifeNumberResult].flower}
              </h2>
              <p style={{ margin: '0 0 10px', color: '#2f5f45', fontSize: 15, fontWeight: 700 }}>
                {lifeFlowerMap[lifeNumberResult].title}
              </p>
              <p style={{ margin: 0, color: '#2f3a35', fontSize: 14, lineHeight: 1.8, flex: 1 }}>
                {lifeFlowerMap[lifeNumberResult].description}
              </p>

              <div style={{ marginTop: 12, display: 'flex', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={() => setShowLifeModal(false)}
                  style={{
                    border: '1px solid #cfe0d5',
                    background: '#ffffff',
                    color: '#1f4d33',
                    borderRadius: 8,
                    height: 34,
                    padding: '0 14px',
                    fontSize: 13,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  关闭
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

