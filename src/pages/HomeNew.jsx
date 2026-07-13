import { useState } from 'react';
import { Link } from 'react-router-dom';
import VerificationModal from '../components/VerificationModal';
import LogoPng from '../assets/logo.png';
import ConsultantCarousel from '../components/ConsultantCarousel';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import { publicPath } from '../utils/publicPath';

export default function HomeNew() {
  const [showVerification, setShowVerification] = useState(false);

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
        color: '#1f2937',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <HeartHomeHeader />

      <main style={{ flex: 1 }}>
        <section
          style={{
            textAlign: 'center',
            maxWidth: 1120,
            minHeight: '54vh',
            margin: '0 auto',
            padding: '92px 24px 88px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 26,
              flexWrap: 'wrap',
            }}
          >
            <img
              src={LogoPng}
              alt="心之家"
              style={{
                width: 126,
                height: 126,
                objectFit: 'contain',
              }}
            />

            <h1
              style={{
                fontSize: 60,
                margin: 0,
                fontWeight: 800,
                color: '#08341f',
                lineHeight: 1.05,
                letterSpacing: '0.02em',
              }}
            >
              欢迎来到 <span style={{ color: '#2d8f4b' }}>心之家</span>
            </h1>
          </div>

          <p
            style={{
              marginTop: 22,
              fontSize: 18,
              color: '#35644a',
              letterSpacing: '0.02em',
            }}
          >
            在忙碌与喧嚣的日常中，我们都需要一个安心停泊的港湾。
          </p>

          <p
            style={{
              marginTop: 22,
              fontSize: 13,
              color: '#6b7280',
              maxWidth: 720,
              marginLeft: 'auto',
              marginRight: 'auto',
              lineHeight: 1.8,
              letterSpacing: '0.04em',
            }}
          >
            A QUIET PLACE FOR LISTENING, REFLECTION, AND EMOTIONAL SUPPORT.
          </p>

          <div
            style={{
              marginTop: 42,
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Link
              to="/p/4d9e2b7a10"
              style={{
                padding: '14px 38px',
                background: '#ffffff',
                color: '#1f6f3a',
                borderRadius: 10,
                textDecoration: 'none',
                border: '2px solid #dff3e6',
                boxShadow: 'inset 0 0 0 1px rgba(31,111,58,0.06)',
                fontWeight: 700,
                fontSize: 16,
              }}
            >
              了解自己
            </Link>

            <button
              type="button"
              onClick={openForum}
              style={{
                padding: '14px 38px',
                background: '#1f6f3a',
                color: '#ffffff',
                border: 'none',
                borderRadius: 10,
                cursor: 'pointer',
                fontWeight: 700,
                fontSize: 16,
                boxShadow: '0 10px 24px rgba(31, 111, 58, 0.16)',
              }}
            >
              倾听他人
            </button>
          </div>
        </section>

        <section
          id="about-heart-home"
          style={{
            background: '#f4f7f5',
            borderTop: '1px solid #e8f0eb',
            borderBottom: '1px solid #e1ebe5',
            minHeight: '520px',
            display: 'flex',
            alignItems: 'center',
            padding: '92px 0',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
         

          <div
            style={{
              maxWidth: 1180,
              width: '100%',
              margin: '0 auto',
              padding: '0 56px',
              boxSizing: 'border-box',
              display: 'grid',
              gridTemplateColumns: '300px minmax(0, 1fr)',
              gap: 72,
              alignItems: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <div
              style={{
                position: 'relative',
                minHeight: 150,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: -8,
                  top: '50%',
                  transform: 'translateY(-44%)',
                  color: 'rgba(255, 255, 255, 0.82)',
                  fontSize: 96,
                  fontWeight: 900,
                  lineHeight: 0.82,
                  letterSpacing: '-0.04em',
                  userSelect: 'none',
                  pointerEvents: 'none',
                  whiteSpace: 'pre-line',
                  zIndex: 0,
                }}
              >
                ABOUT
                {'\n'}
                US
              </div>

              <h2
                style={{
                  position: 'relative',
                  zIndex: 1,
                  margin: 0,
                  color: '#173b28',
                  fontSize: 34,
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                关于我们
              </h2>
            </div>

            <div>
              <p
                style={{
                  margin: 0,
                  color: '#2e3f36',
                  fontSize: 20,
                  lineHeight: 2.05,
                  letterSpacing: '0.04em',
                }}
              >
                自2016年起持续关注青少年心理健康，联合学校、家庭与专业咨询力量，
                为您提供稳定、可信赖的心理支持服务。
              </p>
            </div>
          </div>
        </section>

        <ConsultantCarousel />

        <section
          id="recent-news"
          style={{
            background: '#f7fbf7',
            borderTop: '1px solid #e6f1e8',
            padding: '72px 20px 82px',
          }}
        >
          <div
            style={{
              maxWidth: 980,
              margin: '0 auto',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 22,
                marginBottom: 28,
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: '#214932',
                  fontSize: 32,
                  fontWeight: 700,
                  letterSpacing: '0.04em',
                }}
              >
                近期动态
              </h2>

              <p
                style={{
                  margin: 0,
                  fontSize: 18,
                  color: '#7f8f86',
                  letterSpacing: '0.03em',
                }}
              >
                了解心之家正在发生的事
              </p>
            </div>

            <Link
              to="/p/86f1c4b0ed"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                background: '#ffffff',
                border: '1px solid #dce9de',
                borderRadius: 18,
                padding: '30px 34px',
                textDecoration: 'none',
                boxShadow: '0 16px 36px rgba(21, 71, 42, 0.06)',
              }}
            >
              <p
                style={{
                  margin: '0 0 12px',
                  color: '#6b7b71',
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  fontWeight: 700,
                }}
              >
                NEWS
              </p>

              <h3
                style={{
                  margin: 0,
                  color: '#1f3f2d',
                  fontSize: 22,
                  lineHeight: 1.7,
                  fontWeight: 700,
                }}
              >
                从“危机干预”到长期陪伴：心理支持平台“心之家”上线十周年
              </h3>

              <p
                style={{
                  margin: '16px 0 0',
                  color: '#6b7b71',
                  fontSize: 15,
                  lineHeight: 1.8,
                }}
              >
                十年来，心之家持续完善青少年心理支持、在线倾听与长期陪伴服务，
                试图让更多人的求助被及时看见。
              </p>

              <p
                style={{
                  margin: '20px 0 0',
                  color: '#2f7a4a',
                  fontSize: 15,
                  fontWeight: 700,
                }}
              >
                阅读全文 〉
              </p>
            </Link>
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
