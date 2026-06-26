import { useState } from 'react';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import VerificationModal from '../components/VerificationModal';

const hotlineResources = [
  {
    name: '全国统一心理援助热线',
    value: '12356',
    note: '由国家卫生健康委设立的全国性公益热线，全年无休，24小时在线',
  },
  {
    name: '希望24热线',
    value: '400-161-9995',
    note: '专业志愿者团队运营的24小时免费心理危机干预与生命援助热线',
  },
  {
    name: '全国青少年心理咨询热线',
    value: '12355',
    note: '由共青团运营，主要面向青少年群体，提供法律咨询与心理援助',
  },
];

const counselingPlatforms = [
  {
    name: '壹心理',
    url: 'https://www.xinli001.com',
    label: 'www.xinli001.com',
  },
  {
    name: '简单心理',
    url: 'https://www.jiandanxinli.com',
    label: 'www.jiandanxinli.com',
  },
  {
    name: 'KnowYourself知我心理',
    url: 'http://www.zhiwotansuo.cn/',
    label: 'http://www.zhiwotansuo.cn/',
  },
];

export default function EmergencyHelp() {
  const [showVerification, setShowVerification] = useState(false);
  const titleSize = 44;
  const bodySize = 18;

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
        background: 'linear-gradient(180deg, #fbfdfb 0%, #ffffff 42%, #f5faf6 100%)',
        color: '#253239',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader />

      <main style={{ flex: 1 }}>
        <section
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '76px 56px 96px',
            boxSizing: 'border-box',
          }}
        >
          <div
            style={{
              maxWidth: 1040,
              margin: '0 auto',
            }}
          >
            <p
              style={{
                margin: '0 0 12px',
                color: '#6d7b83',
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: '0.14em',
              }}
            >
              REAL-WORLD SUPPORT
            </p>
            <h1
              style={{
                margin: '0 0 24px',
                color: '#4e6258',
                fontSize: titleSize,
                fontWeight: 600,
                lineHeight: 1.3,
                letterSpacing: '0.04em',
              }}
            >
              紧急求助
            </h1>

            <div
              style={{
                display: 'grid',
                gap: 28,
              }}
            >
              <section
                style={{
                  padding: '32px 36px',
                  borderRadius: 26,
                  background: '#ffffff',
                  border: '1px solid #dce7df',
                  boxShadow: '0 18px 42px rgba(31, 77, 51, 0.08)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 22px',
                    color: '#55616c',
                    fontSize: bodySize,
                    lineHeight: 1.9,
                  }}
                >
                  • “心之家”只是个虚拟游戏，但如果现实里的你真的需要帮助，以下是你可以信任的方式：
                </p>

                <div style={{ display: 'grid', gap: 22, paddingLeft: 40 }}>
                  {hotlineResources.map((item) => (
                    <p
                      key={item.name}
                      style={{
                        margin: 0,
                        color: '#4b5963',
                        fontSize: bodySize,
                        lineHeight: 2,
                      }}
                    >
                      • {item.name}：{' '}
                      <span
                        style={{
                          color: '#41566b',
                          fontSize: bodySize,
                          fontWeight: 700,
                          letterSpacing: '0.02em',
                        }}
                      >
                        {item.value}
                      </span>
                      {' '}（{item.note}）
                    </p>
                  ))}
                </div>
              </section>

              <section
                style={{
                  padding: '32px 36px',
                  borderRadius: 26,
                  background: '#f8fbf8',
                  border: '1px solid #dce7df',
                  boxShadow: '0 18px 42px rgba(31, 77, 51, 0.06)',
                }}
              >
                <p
                  style={{
                    margin: '0 0 22px',
                    color: '#55616c',
                    fontSize: bodySize,
                    lineHeight: 1.9,
                  }}
                >
                  • 以下是几个真实的全国性心理咨询平台，提供常规的、付费的、预约制的心理咨询服务
                </p>

                <div style={{ display: 'grid', gap: 22, paddingLeft: 40 }}>
                  {counselingPlatforms.map((item) => (
                    <p
                      key={item.name}
                      style={{
                        margin: 0,
                        color: '#4b5963',
                        fontSize: bodySize,
                        lineHeight: 2,
                      }}
                    >
                      • {item.name}：{' '}
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: '#41566b',
                          fontSize: bodySize,
                          fontWeight: 700,
                          textDecoration: 'underline',
                          wordBreak: 'break-all',
                        }}
                      >
                        {item.label}
                      </a>
                    </p>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </section>
      </main>

      <HeartHomeFooter onOpenForum={openForum} />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}
    </div>
  );
}
