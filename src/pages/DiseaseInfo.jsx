import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import VerificationModal from '../components/VerificationModal';

const infoSections = [
  {
    title: '抑郁症',
    intro:
      '抑郁并不是短暂的情绪低落，而是一种持续、深入地影响心境和日常功能的状态。',
    paragraphs: [
      '它的核心在于持续至少两周的深度情绪低落，或对几乎所有活动失去兴趣与愉悦感。很多人会以为抑郁只是“想不开”或“太脆弱”，但它并不是简单的心情不好，而是一种会影响睡眠、食欲、精力、思考方式和自我评价的心理健康问题。',
      '患者可能会陷入无力、空虚和绝望的感受中，即使是最简单的日常事务也变得异常艰难。在精神上，他们可能被无价值感、过度内疚和死亡念头所困扰；在身体上，则可能出现睡眠障碍、食欲改变、行动迟缓、疲惫或长期疼痛。',
      '抑郁是一种复杂的疾病，涉及生物、心理与社会因素。它需要也值得被专业地对待。心理治疗、药物治疗以及稳定的社会支持，都可能帮助患者慢慢恢复情感的色彩和生活的力量。',
    ],
  },
  {
    title: '焦虑症',
    intro:
      '焦虑症是一种以过度、持续且不切实际的恐惧与忧虑为特征的心理疾患。',
    paragraphs: [
      '即使在没有明显威胁的情况下，焦虑感也可能持续存在，并严重干扰一个人的日常生活。它并不只是“想太多”，也不是简单的紧张，而是一种让身体和大脑长期处于警戒状态的压力反应。',
      '患者不仅会经历精神上的持续不安、担心、难以放松，还常伴随心率加快、手心出汗、肌肉紧张、呼吸困难、头晕、肠胃不适等身体反应。常见类型包括广泛性焦虑、惊恐障碍、社交焦虑、特定恐惧以及与创伤相关的强烈回避。',
      '重要的是，焦虑症并非性格软弱，而是一种真实、可治疗的心理健康问题。通过心理治疗、认知行为方法、放松训练及必要时的药物支持，大多数患者能够逐渐控制症状，重建生活中的平静与掌控感。',
    ],
  },
  {
    title: '创伤后应激反应',
    intro:
      '人在经历车祸、暴力、事故、霸凌或长期压迫之后，大脑有时会持续停留在“危险还没有结束”的状态。',
    paragraphs: [
      '你可能会反复想起某个场景，听到类似的话语就突然紧张，或者下意识回避某些地点、气味与话题。有些人会不断回想细节，有些人则会出现情绪麻木，仿佛什么都感觉不到。',
      '创伤不会总以“记忆”的形式存在。很多时候，它会变成身体的一部分。失眠、惊醒、心悸、呼吸急促、长期警觉、持续发抖、突然的愤怒与恐惧，都可能是大脑在提醒你：那件事其实从未真正过去。',
      '有些人会责怪自己为什么“不能早点忘掉”。但创伤并不是意志力薄弱，它只是说明，有些经历真的伤害过你。人的大脑会想办法保护自己，而那些反复出现的情绪和记忆，本质上也是一种求生反应。',
      '请不要因为自己的痛苦“看起来不够严重”，就否定它。很多伤口，并不会立刻流血。',
    ],
  },
  {
    title: '校园霸凌',
    intro:
      '霸凌未必总是明显的暴力。很多伤害，会以更隐蔽、更漫长的方式发生。',
    paragraphs: [
      '被孤立、被传播谣言、被嘲笑、被反复取外号、被迫做事、被排斥在群体之外，甚至长期处于玩笑、冷落与“只是闹着玩”的边缘，都可能让一个人逐渐失去安全感、归属感与表达自己的勇气。',
      '往往不是某一次冲突，而是那种持续存在的羞耻、恐惧与无处可逃的感觉，慢慢侵蚀一个人的内心。你可能开始怀疑自己：是不是自己太敏感了？是不是别人都觉得没什么？是不是只要再忍一忍就好了？',
      '但真正健康的关系，不应该让人长期感到害怕、压抑、自我否定，也不应该让一个人必须依靠沉默来维持所谓的平静。很多时候，伤害并不会因为“别人没有恶意”就自动消失。你的感受是真实存在的，即使没有人立刻理解它，它也依然值得被认真对待。',
    ],
  },
];

export default function DiseaseInfo() {
  const [showVerification, setShowVerification] = useState(false);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open('/p/b12e8f40a6', '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, #fbfdfb 0%, #ffffff 40%, #f7fbf7 100%)',
        color: '#1f2f28',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HeartHomeHeader />

      <main style={{ flex: 1 }}>
        <section
          style={{
            maxWidth: 1480,
            margin: '0 auto',
            padding: '76px 56px 96px',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 28,
              flexWrap: 'wrap',
              marginBottom: 24,
            }}
          >
            <h1
              style={{
                margin: 0,
                color: '#4e6258',
                fontSize: 44,
                fontWeight: 600,
                letterSpacing: '0.04em',
                lineHeight: 1.3,
              }}
            >
              心理知识与自助测评
            </h1>

            
          </div>

          <p
            style={{
              maxWidth: 820,
              margin: 0,
              color: '#68776f',
              fontSize: 17,
              lineHeight: 1.9,
              letterSpacing: '0.03em',
            }}
          >
            以下内容仅作为心理健康科普与自我观察参考。它不能替代专业医学诊断，
            但可以帮助你用更清楚的语言理解自己的状态，也帮助你在需要时更早寻求支持。
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) 360px',
              gap: 64,
              alignItems: 'start',
              marginTop: 60,
            }}
          >
            <section>
              {infoSections.map((section, index) => (
                <article
                  key={section.title}
                  style={{
                    padding: index === 0 ? '0 0 56px' : '56px 0',
                    borderTop: index === 0 ? 'none' : '1px solid #e7eee9',
                  }}
                >
                  <h2
                    style={{
                      margin: '0 0 18px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 14,
                      color: '#4e6258',
                      fontSize: 31,
                      fontWeight: 500,
                      letterSpacing: '0.06em',
                      lineHeight: 1.35,
                    }}
                  >
                    <span
                      style={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: '#5f6b68',
                        flex: '0 0 auto',
                      }}
                    />
                    {section.title}
                  </h2>

                  <p
                    style={{
                      margin: '0 0 22px',
                      color: '#214932',
                      fontSize: 19,
                      fontWeight: 700,
                      lineHeight: 1.85,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {section.intro}
                  </p>

                  <div
                    style={{
                      color: '#2f3935',
                      fontSize: 16,
                      lineHeight: 1.95,
                      letterSpacing: '0.03em',
                    }}
                  >
                    {section.paragraphs.map((paragraph) => (
                      <p
                        key={paragraph.slice(0, 24)}
                        style={{
                          margin: '0 0 16px',
                        }}
                      >
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </article>
              ))}
            </section>

            <aside
              style={{
                position: 'sticky',
                top: 112,
                alignSelf: 'start',
                background: '#1f4d33',
                color: '#eef8f0',
                borderRadius: 24,
                padding: '34px 32px 36px',
                boxShadow: '0 20px 52px rgba(21, 71, 42, 0.16)',
              }}
            >
              <p
                style={{
                  margin: '0 0 14px',
                  color: 'rgba(238, 248, 240, 0.72)',
                  fontSize: 13,
                  fontWeight: 800,
                  letterSpacing: '0.14em',
                }}
              >
                SELF CHECK
              </p>

              <h2
                style={{
                  margin: 0,
                  fontSize: 30,
                  lineHeight: 1.45,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                静息评估
              </h2>

              <p
                style={{
                  margin: '20px 0 0',
                  color: 'rgba(238, 248, 240, 0.84)',
                  fontSize: 16,
                  lineHeight: 1.9,
                  letterSpacing: '0.03em',
                }}
              >
                这是一份用于观察近期情绪负荷与压力反应的自助问卷。
                当你感到疲惫、失眠、反复思考，或很难从某些事件中平静下来时，
                可以通过本评估了解自己的当前心理状态。
              </p>

              <p
                style={{
                  margin: '18px 0 0',
                  color: 'rgba(238, 248, 240, 0.72)',
                  fontSize: 14,
                  lineHeight: 1.8,
                }}
              >
                完成问卷约需 3 分钟。结果仅供自我观察参考，不能替代专业医学诊断。
              </p>

              <Link
                to="/p/c70a5e1d92"
                style={{
                  marginTop: 28,
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: '14px 22px',
                  borderRadius: 999,
                  background: '#ffffff',
                  color: '#1f4d33',
                  textDecoration: 'none',
                  fontSize: 16,
                  fontWeight: 800,
                  boxShadow: '0 12px 26px rgba(0, 0, 0, 0.14)',
                  boxSizing: 'border-box',
                }}
              >
                开始评估
              </Link>
            </aside>
          </div>
        </section>
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={1480}
        outerHorizontalPadding={0}
        innerHorizontalPadding={56}
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
