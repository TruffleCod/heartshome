import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import PostInteractionPanel from '../components/PostInteractionPanel';
import VerificationModal from '../components/VerificationModal';
import { publicPath } from '../utils/publicPath';

const EMERGENCY_HELP_PATH = '/p/ad5f0c8b62';

const ruleSections = [
  {
    title: '1. 禁止歧视、嘲笑、攻击他人',
    paragraphs: [
      '禁止使用侮辱、嘲讽、贬低、人身攻击或仇恨性言论。不得针对用户的性别、年龄、地域、职业、心理状态、外貌、性取向等发表歧视或攻击性言论。争议扩大时，管理员可锁帖或限制评论，多次违规者禁言 3-30 天。',
    ],
  },
  {
    title: '2. 避免否定或批判对方的感受，尊重他人情绪',
    paragraphs: [
      '本区允许求助、记录、复盘、提问，鼓励大家发表内心感受，分享心路历程。请以理解而非评判的态度回应他人的痛苦。避免发表批判、说教、否定、贴标签等有害他人心理健康的言论。违者视情节禁言 3-30 天。',
    ],
  },
  {
    title: '3. 请勿泄露自己或他人的个人隐私',
    paragraphs: [
      '严禁公开他人真实姓名、身份证号、手机号、住址、工作单位等个人隐私信息。严禁通过人肉搜索、跨平台追查等方式获取并发布他人隐私。违规账号将被永久封禁。',
    ],
  },
  {
    title: '4. 社区内容不代表专业医学建议，请勿代替现实求助',
    paragraphs: [
      '本区内容仅代表用户个人经验，不构成诊断、治疗、咨询或用药建议。禁止在评论区发布未经证实的治疗方法，禁止贩卖国家限制流通的精神药品，或发布其他心理咨询师、医院、机构的广告。违规账号将被永久封禁。',
    ],
  },
  {
    title: '5. 禁止发布极端或有害内容',
    paragraphs: [
      '禁止发布、传播违背伦理的有害信息，如 PUA 技巧、情感挽回建议，或违背科学与常识的内容，如通灵、诅咒、宗教术法等封建迷信内容。禁止发布其他任何违反国家律法、对社会治安和网络信息安全有害的内容。违规账号将被永久封禁。',
    ],
  },
  {
    title: '6. 严禁发布包含自伤、自杀、伤人的内容',
    paragraphs: [
      '严禁发布教唆、鼓励或详细描述自伤、自杀、伤害他人的具体方法或计划。如果您或您认识的人有此类倾向，我们强烈建议并恳请您立即寻求专业危机干预。',
    ],
  },
  {
    title: '7. 请保护好自己的情绪，不要沉溺在他人的痛苦中',
    paragraphs: [
      '本区含较多情绪倾诉、家庭矛盾、校园压力、就医经历等内容。不建议长时间连续阅读高强度求助帖。当你感到不适时，请暂停浏览。旁观不是义务，共情也需要边界。',
    ],
  },
];

export default function ForumRulesPost() {
  const [showVerification, setShowVerification] = useState(false);
  const [likeCount, setLikeCount] = useState(1280);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open(publicPath('p/b12e8f40a6'), '_blank', 'noopener,noreferrer');
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
          boxSizing: 'border-box',
        }}
      >
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
            【置顶】【心之家社区】交流守则
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
            <span>ID：系统助手</span>
            <span>发帖时间：2021/04/18 08:00:00</span>
            <span>点赞数：{likeCount}</span>
            <span>评论数：0</span>
            <span>阅读量：10万+</span>
          </div>

          <p
            style={{
              margin: '0 0 22px',
              color: '#26313d',
              fontSize: 23,
              lineHeight: 1.9,
              fontWeight: 700,
            }}
          >
            ——愿这里成为你我可以安心停靠的心灵港湾
          </p>

          <p
            style={{
              margin: '0 0 56px',
              color: '#26313d',
              fontSize: 21,
              lineHeight: 1.95,
            }}
          >
            欢迎来到心之家社区！我们深知，每一份分享都源于信任，每一次倾诉都需要勇气。为守护这片难得的净土，进组前请先阅读本帖。进入社区，即视为已知悉并同意以下规则。违规内容管理员会视情况进行提醒、折叠、删除、禁言或封禁。
          </p>

          {ruleSections.map((section) => (
            <section key={section.title} style={{ marginTop: 44 }}>
              <h2
                style={{
                  margin: '0 0 16px',
                  color: '#26313d',
                  fontSize: 24,
                  fontWeight: 800,
                  lineHeight: 1.55,
                }}
              >
                {section.title}
              </h2>
              {section.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  style={{
                    margin: index === 0 ? 0 : '18px 0 0',
                    color: '#111827',
                    fontSize: 21,
                    lineHeight: 1.95,
                  }}
                >
                  {paragraph}
                  {section.title.startsWith('6.') ? (
                    <>
                      {' '}
                      （
                      <Link
                        to={EMERGENCY_HELP_PATH}
                        style={{ color: '#2d54ff', textDecoration: 'underline' }}
                      >
                        “紧急求助”
                      </Link>
                      ）
                    </>
                  ) : null}
                </p>
              ))}
            </section>
          ))}

          <div style={{ marginTop: 70 }}>
            <p
              style={{
                margin: '0 0 18px',
                color: '#26313d',
                fontSize: 28,
                lineHeight: 1.7,
                fontWeight: 800,
              }}
            >
              请记得，这里每一句对话，都值得被温暖照亮。
            </p>
            <p
              style={{
                margin: 0,
                color: '#26313d',
                fontSize: 21,
                lineHeight: 1.9,
              }}
            >
              让我们共同维护发言秩序，共建安全、温暖、专业的互助社区
              <br />
              心之家管理团队 敬上
            </p>
          </div>

          <PostInteractionPanel
            commentsDisabled
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
    </div>
  );
}
