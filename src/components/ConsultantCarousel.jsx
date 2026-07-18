import { useEffect, useMemo, useState } from 'react';

import guZhengqing from '../assets/consultants/gu-zhengqing.jpg';
import yuanZhixia from '../assets/consultants/yuan-zhixia.jpg';
import luXinyin from '../assets/consultants/lu-xinyin.jpg';
import chenJi from '../assets/consultants/chen-ji.jpg';

const slides = [
  {
    title: '顾正清 · 心之家创始人',
    avatar: guZhengqing,
    subtitle: '专业方向：青少年心理风险评估、危机干预、家校协作',
    content: `现任明川市教育局青少年心理健康负责人，长期从事儿童青少年心理发展、学校心理服务体系建设与危机干预相关工作，拥有三十余年青少年心理服务经验，曾参与多所中学、教育机构及社区心理服务项目，为学校及家长提供危机识别、个案评估、家校沟通与转介流程督导。

在心之家中，顾正清教授主要负责平台风险评估模型、咨询师督导、危机处理规范及青少年个案分级流程。他希望心之家能够成为学校、家庭与专业服务之间的补充通道。`,
  },
  {
    title: '袁知夏 · 签约咨询师',
    avatar: yuanZhixia,
    subtitle: '专业方向：情绪管理、人际关系压力、性少数群体支持',
    content: `袁知夏老师接受过系统的心理咨询基础训练，创伤知情照护、人际关系议题及线上文字咨询相关培训，持续接受个案督导与伦理培训。长期从事情绪困扰、人际关系压力、创伤后反应及长期压力下自我评价受损等方面的咨询工作，累计线上文字咨询经验超过 1200 小时。

不同于以评估和转介为主的支持岗位，袁知夏老师更重视来访者的具体叙述。她擅长在文字咨询中陪伴来访者梳理情绪经验，辨认情绪反应，并帮助其把零散、混乱、难以启齿的经历整理成可以被理解的表达。`,
  },
  {
    title: '陆心音 · 签约咨询师',
    avatar: luXinyin,
    subtitle: '专业方向：校园适应、人际边界、创伤后反应',
    content: `陆心音老师接受过青少年心理支持、家庭沟通及长期陪伴型咨询相关训练，持续参与学校心理辅导与个案研究工作。长期关注在人际关系中容易自我压抑、习惯性回避冲突，以及长期处于“懂事”“敏感”“害怕给别人添麻烦”状态下的青少年群体。

不同于强调快速分析与问题归因的咨询方式，陆心音老师更倾向于通过持续、稳定的交流，帮助来访者慢慢辨认自己的真实感受。她认为，很多人并不是“不痛苦”，而是已经习惯忍耐，以至于忘记了自己其实一直在难过。`,
  },
  {
    title: '陈霁 · 签约咨询师',
    avatar: chenJi,
    subtitle: '专业方向：正念减压疗法、压力管理、睡眠支持',
    content: `陈霁老师接受过正念减压疗法（MBSR）、压力管理、睡眠支持及身心放松训练相关系统培训，长期关注高压状态下的情绪耗竭、睡眠困扰、过度思考、职业倦怠与身体紧绷等议题，擅长将正念练习与现代心理咨询方法结合，帮助来访者建立更稳定的自我调节方式。

陈霁老师重视来访者对身体信号、情绪波动和思维模式的觉察。他擅长通过呼吸练习、身体扫描、正念行走、睡眠放松训练等方式，帮助来访者从持续紧绷和反复思考中暂时抽离，重新回到当下经验，学习以更温和、不评判的方式理解自己的状态。`,
  },
];

const animationDuration = 420;

export default function ConsultantCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trackIndex, setTrackIndex] = useState(1);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [selectedConsultant, setSelectedConsultant] = useState(null);

  const trackSlides = useMemo(() => {
    const firstSlide = slides[0];
    const lastSlide = slides[slides.length - 1];

    return [lastSlide, ...slides, firstSlide];
  }, []);

  const next = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionEnabled(true);
    setTrackIndex((value) => value + 1);
    setCurrentIndex((value) => (value + 1) % slides.length);
  };

  const prev = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setTransitionEnabled(true);
    setTrackIndex((value) => value - 1);
    setCurrentIndex((value) => (value - 1 + slides.length) % slides.length);
  };

  const handleTransitionEnd = () => {
    setIsTransitioning(false);

    if (trackIndex === slides.length + 1) {
      setTransitionEnabled(false);
      setTrackIndex(1);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }

    if (trackIndex === 0) {
      setTransitionEnabled(false);
      setTrackIndex(slides.length);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          setTransitionEnabled(true);
        });
      });
    }
  };

  useEffect(() => {
    if (isPaused || isTransitioning) return undefined;

    const timer = window.setInterval(() => {
      next();
    }, 7000);

    return () => window.clearInterval(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps -- The interval should use the current carousel state without resetting on every index change.
  }, [isPaused, isTransitioning]);

  useEffect(() => {
    if (!selectedConsultant) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setSelectedConsultant(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedConsultant]);

  return (
    <section
      id="consultants"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        background: '#ffffff',
        padding: '72px 0 96px',
        borderTop: '1px solid #edf0ed',
      }}
    >
      <div
        style={{
          maxWidth: 1180,
          margin: '0 auto',
          padding: '0 56px',
        }}
      >
        <div
          style={{
            marginBottom: 42,
            display: 'flex',
            alignItems: 'baseline',
            gap: 26,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 34,
              fontWeight: 600,
              color: '#263b30',
              letterSpacing: '0.04em',
            }}
          >
            咨询师团队
          </h2>

          <p
            style={{
              margin: 0,
              fontSize: 18,
              color: '#7f8f86',
              letterSpacing: '0.03em',
            }}
          >
            让每一次求助，都被认真听见
          </p>
        </div>

        <div
          style={{
            position: 'relative',
            padding: '0 50px',
          }}
        >
          <button
            type="button"
            aria-label="上一位咨询师"
            onClick={prev}
            style={{
              position: 'absolute',
              left: 0,
              top: '42%',
              width: 48,
              height: 88,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
              zIndex: 3,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 42,
                height: 42,
                borderLeft: '8px solid #d8dcdf',
                borderBottom: '8px solid #d8dcdf',
                transform: 'rotate(45deg)',
              }}
            />
          </button>

          <div style={{ overflow: 'hidden' }}>
            <div
              onTransitionEnd={handleTransitionEnd}
              style={{
                display: 'flex',
                width: `${trackSlides.length * 50}%`,
                transform: `translateX(-${trackIndex * (100 / trackSlides.length)}%)`,
                transition: transitionEnabled
                  ? `transform ${animationDuration}ms ease`
                  : 'none',
              }}
            >
              {trackSlides.map((consultant, index) => (
                <article
                  key={`${consultant.title}-${index}`}
                  style={{
                    flex: `0 0 ${100 / trackSlides.length}%`,
                    boxSizing: 'border-box',
                    padding: '0 38px',
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setSelectedConsultant(consultant)}
                    aria-label={`${consultant.title}头像大图预览`}
                    style={{
                      width: 168,
                      height: 168,
                      margin: '0 auto 28px',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      background: '#eef2ef',
                      border: 'none',
                      padding: 0,
                      cursor: 'zoom-in',
                      display: 'block',
                      boxShadow: '0 10px 28px rgba(31, 58, 48, 0.08)',
                    }}
                  >
                    <img
                      src={consultant.avatar}
                      alt={`${consultant.title}头像`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block',
                      }}
                    />
                  </button>

                  <h3
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      fontSize: 21,
                      fontWeight: 600,
                      lineHeight: 1.7,
                      color: '#202822',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {consultant.title}
                  </h3>

                  <div
                    style={{
                      marginTop: 24,
                      color: '#1f2a24',
                      fontSize: 16,
                      lineHeight: 1.9,
                      letterSpacing: '0.03em',
                      textAlign: 'left',
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontWeight: 600,
                        textAlign: 'center',
                      }}
                    >
                      {consultant.subtitle}
                    </p>

                    <p
                      style={{
                        margin: '22px 0 0',
                        whiteSpace: 'pre-line',
                      }}
                    >
                      {consultant.content}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <button
            type="button"
            aria-label="下一位咨询师"
            onClick={next}
            style={{
              position: 'absolute',
              right: 0,
              top: '42%',
              width: 48,
              height: 88,
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: 0,
              zIndex: 3,
            }}
          >
            <span
              style={{
                display: 'block',
                width: 42,
                height: 42,
                borderRight: '8px solid #d8dcdf',
                borderTop: '8px solid #d8dcdf',
                transform: 'rotate(45deg)',
              }}
            />
          </button>
        </div>

        <div
          style={{
            marginTop: 42,
            display: 'flex',
            justifyContent: 'center',
            gap: 10,
          }}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`从第 ${index + 1} 位咨询师开始查看`}
              onClick={() => {
                if (isTransitioning) return;
                setCurrentIndex(index);
                setTrackIndex(index + 1);
              }}
              style={{
                width: currentIndex === index ? 28 : 9,
                height: 9,
                borderRadius: 999,
                border: 'none',
                background: currentIndex === index ? '#2f7a4a' : '#cfd8d2',
                cursor: 'pointer',
                transition: 'all 180ms ease',
              }}
            />
          ))}
        </div>
      </div>

      {selectedConsultant && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedConsultant.title}头像大图`}
          onClick={() => setSelectedConsultant(null)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1200,
            background: 'rgba(27, 39, 33, 0.72)',
            backdropFilter: 'blur(6px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px 20px',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              position: 'relative',
              width: 'min(680px, 92vw)',
              borderRadius: 28,
              background: 'rgba(255, 255, 255, 0.98)',
              border: '1px solid rgba(209, 222, 214, 0.92)',
              boxShadow: '0 28px 72px rgba(16, 37, 29, 0.28)',
              padding: '22px 22px 28px',
            }}
          >
            <button
              type="button"
              onClick={() => setSelectedConsultant(null)}
              aria-label="关闭头像预览"
              style={{
                position: 'absolute',
                top: 18,
                right: 18,
                width: 42,
                height: 42,
                borderRadius: '50%',
                border: '1px solid #d9e2dc',
                background: '#ffffff',
                color: '#597065',
                fontSize: 22,
                lineHeight: 1,
                cursor: 'pointer',
              }}
            >
              ×
            </button>

            <div
              style={{
                overflow: 'hidden',
                borderRadius: 22,
                background: '#eef2ef',
              }}
            >
              <img
                src={selectedConsultant.avatar}
                alt={`${selectedConsultant.title}头像大图`}
                style={{
                  width: '100%',
                  maxHeight: '80vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
