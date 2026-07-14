import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import InternalForumCaveBackdrop from '../components/InternalForumCaveBackdrop';
import InternalForumEyesBackground from '../components/InternalForumEyesBackground';
import VerificationModal from '../components/VerificationModal';
import { openVisitorForumOrVerify, openVisitorForumWindow } from '../utils/forumAccess';
import { publicPath } from '../utils/publicPath';
import {
  INTERNAL_FORUM_BLACK,
  INTERNAL_FORUM_GLOW,
  INTERNAL_FORUM_GLOW_STRONG,
  INTERNAL_FORUM_RED,
  INNER_FORUM_LIGHT_ACCENT,
  INNER_FORUM_LIGHT_BG,
  INNER_FORUM_LIGHT_BORDER,
  INNER_FORUM_LIGHT_MUTED,
  INNER_FORUM_LIGHT_TEXT,
} from '../constants/internalForumTheme';

export default function InternalForumRulesPost() {
  const [showVerification, setShowVerification] = useState(false);
  const [lightsOn, setLightsOn] = useState(true);
  const [showReturnBubble, setShowReturnBubble] = useState(false);

  const openForum = () => {
    openVisitorForumOrVerify(() => setShowVerification(true));
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    openVisitorForumWindow();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowReturnBubble(window.scrollY > 80);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'inner-forum-lights:/p/f2c96a10de',
      String(lightsOn)
    );
    window.dispatchEvent(
      new CustomEvent('inner-forum-theme-change', {
        detail: { path: '/p/f2c96a10de', lightsOn },
      })
    );
  }, [lightsOn]);

  const theme = lightsOn
    ? {
        bg: INNER_FORUM_LIGHT_BG,
        text: INNER_FORUM_LIGHT_TEXT,
        title: INNER_FORUM_LIGHT_ACCENT,
        accent: INNER_FORUM_LIGHT_ACCENT,
        meta: INNER_FORUM_LIGHT_MUTED,
        hidden: INNER_FORUM_LIGHT_TEXT,
        switchText: INNER_FORUM_LIGHT_TEXT,
        switchBorder: INNER_FORUM_LIGHT_BORDER,
      }
    : {
        bg: INTERNAL_FORUM_BLACK,
        text: INTERNAL_FORUM_RED,
        title: INTERNAL_FORUM_RED,
        accent: INTERNAL_FORUM_RED,
        meta: INTERNAL_FORUM_RED,
        hidden: INTERNAL_FORUM_BLACK,
        switchText: '#fff200',
        switchBorder: '#fff200',
        glow: INTERNAL_FORUM_GLOW,
        strongGlow: INTERNAL_FORUM_GLOW_STRONG,
      };

  const hiddenStyle = { color: theme.hidden, textShadow: 'none' };
  const keywordPattern = /(严禁|请勿|禁止|不|理解而非|避免)/g;
  const isMaskedKeyword = (part) =>
    part === '严禁' ||
    part === '请勿' ||
    part === '禁止' ||
    part === '不' ||
    part === '理解而非' ||
    part === '避免';
  const renderMaskedText = (text) => {
    if (lightsOn) return text;
    return String(text)
      .split(keywordPattern)
      .map((part) =>
        isMaskedKeyword(part) ? null : (
          part
        )
      );
  };
  const renderLightsOnOnly = (content) =>
    lightsOn ? <span style={hiddenStyle}>{content}</span> : null;

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
              {renderMaskedText('【置顶】【心之家社区】交流守则')}
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

          <div style={{ margin: '0 0 56px', color: theme.meta, display: 'flex', flexWrap: 'wrap', gap: '10px 18px', fontSize: 16, textShadow: lightsOn ? 'none' : theme.glow }}>
            <span>{renderMaskedText('系统助手')}</span>
            <span>{renderMaskedText('发帖时间：2021/04/18 08:00:00')}</span>
          </div>

          <p style={{ margin: '0 0 22px', color: theme.text, fontSize: 23, lineHeight: 1.9, fontWeight: 700, textShadow: lightsOn ? 'none' : theme.glow }}>
            {renderMaskedText('——愿这里成为你我可以安心停靠的心灵港湾')}
          </p>
          <p style={{ margin: '0 0 56px', color: theme.text, fontSize: 21, lineHeight: 1.95, textShadow: lightsOn ? 'none' : theme.glow }}>
            {renderMaskedText('欢迎来到心之家社区！我们深知，每一份分享都源于信任，每一次倾诉都需要勇气。为守护这片难得的净土，进组前请先阅读本帖。进入社区，即视为已知悉并同意以下规则。')}
            {renderLightsOnOnly('违规内容管理员会视情况进行提醒、折叠、删除、禁言或封禁。')}
          </p>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('1. 禁止'))}
              {renderMaskedText('歧视、嘲笑、攻击他人')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('禁止使用侮辱、嘲讽、贬低、人身攻击或仇恨性言论。不得针对用户的性别、年龄、地域、职业、心理状态、外貌、性取向等发表歧视或攻击性言论。')}
              {renderLightsOnOnly('争议扩大时，管理员可锁帖或限制评论，多次违规者禁言3-30天。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('2. 不要'))}
              {renderMaskedText('否定或批判对方的感受')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('本区允许求助、记录、复盘、提问，鼓励大家发表内心感受，分享心路历程。请以理解而非评判的态度回应他人的痛苦。避免发表批判、说教、否定、贴标签等有害他人心理健康的言论。')}
              {renderLightsOnOnly('违规者视情节禁言3-30天。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('3. 请勿'))}
              {renderMaskedText('泄露自己或他人的个人隐私：')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('严禁公开他人真实姓名、身份证号、手机号、住址、工作单位等个人隐私信息。严禁通过人肉搜索、跨平台追查等方式获取并发布他人隐私。')}
              {renderLightsOnOnly('违规账号将被永久封禁。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('4. '))}
              {renderMaskedText('社区内容不代表专业医学建议，请勿代替现实求助')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('本区内容仅代表用户个人经验，不构成诊断、治疗、咨询或用药建议。')}
              {renderLightsOnOnly('禁止在评论区发布未经证实的治疗方法，禁止贩卖国家限制流通的精神药品，或发布其他心理咨询师、医院、机构的广告。违规账号将被永久封禁。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('5. 禁止'))}
              {renderMaskedText('发布极端内容')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('禁止发布、传播违背伦理的有害信息，如PUA技巧、情感挽回建议，或违背科学与常识的内容，如通灵、诅咒、宗教术法等封建迷信内容。禁止发布其他任何违反国家律法、对社会治安和网络信息安全有害的内容。')}
              {renderLightsOnOnly('违规账号将被永久封禁。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('6. 严禁'))}
              {renderMaskedText('发布包含自伤、自杀、伤人的内容')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('严禁发布教唆、鼓励或详细描述自伤、自杀、伤害他人的具体方法或计划。如果您或您认识的人有此类倾向，我们强烈建议并恳请您立即寻求专业危机干预（')}
              <a
                href={publicPath('p/ad5f0c8b62')}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#2d54ff' }}
              >
                “紧急求助”
              </a>
              {renderMaskedText('）。')}
            </p>
          </section>

          <section style={{ marginTop: 44 }}>
            <h2 style={{ margin: '0 0 16px', color: theme.accent, fontSize: 24, fontWeight: 800 }}>
              {renderLightsOnOnly(renderMaskedText('7. 请'))}
              {renderMaskedText('保护好自己的情绪，不要沉溺在他人的痛苦中')}
            </h2>
            <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.95 }}>
              {renderMaskedText('本区含较多情绪倾诉、家庭矛盾、校园压力、就医经历等内容。不建议长时间连续阅读高强度求助帖。')}
              {renderLightsOnOnly('当你感到不适时，请暂停浏览。旁观不是义务，共情也需要边界。')}
            </p>
          </section>

          <div style={{ marginTop: 70 }}>
            {lightsOn ? (
              <>
                <p style={{ margin: '0 0 18px', color: theme.text, fontSize: 28, lineHeight: 1.7, fontWeight: 800 }}>
                  {renderMaskedText('请记得，这里每一句对话，都值得被温暖照亮。')}
                </p>
                <p style={{ margin: 0, color: theme.text, fontSize: 21, lineHeight: 1.9 }}>
                  {renderMaskedText('让我们共同维护发言秩序，共建安全、温暖、专业的互助社区')}
                  <br />
                  {renderMaskedText('心之家管理团队 敬上')}
                </p>
              </>
            ) : (
              <>
                <p style={{ margin: '0 0 18px', color: INTERNAL_FORUM_RED, fontSize: 28, lineHeight: 1.7, fontWeight: 800 }}>
                  请记得，这里每一种伤痛，都值得被公正审判。
                </p>
                <p style={{ margin: 0, color: INTERNAL_FORUM_RED, fontSize: 21, lineHeight: 1.9 }}>
                  让我们共同维护发言秩序，共建公平、正义、和谐的互助社区
                  <br />
                  心之家管理团队 敬上
                </p>
              </>
            )}
          </div>

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


