import { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Balatro from '../components/Balatro';
import { hashWithPepper, normalizeInput } from '../utils/hash';

const RITUAL_ENTRY_PASSWORD_PEPPER = 'heart_home_ritual_entry_password_v1::';
const RITUAL_ENTRY_PASSWORD_HASH =
  '16f78f48203e0a4aed31383e36c5421948805adb5f6c10010908023c575a9924';

function pad2(value) {
  return String(value).padStart(2, '0');
}

function formatDateParts(date) {
  return {
    year: String(date.getFullYear()),
    month: pad2(date.getMonth() + 1),
    day: pad2(date.getDate()),
    hour: pad2(date.getHours()),
    minute: pad2(date.getMinutes()),
    second: pad2(date.getSeconds()),
  };
}

function canonicalizeRitualPassword(value) {
  return normalizeInput(value)
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, '')
    .toLowerCase();
}

export default function InternalForumRitualEntry() {
  const navigate = useNavigate();
  const [now, setNow] = useState(() => new Date());
  const [gardenerName, setGardenerName] = useState('');
  const [ritualPassword, setRitualPassword] = useState('');
  const [noticeText, setNoticeText] = useState('');

  useEffect(() => {
    const syncTick = () => setNow(new Date());
    syncTick();
    const timer = window.setInterval(syncTick, 250);
    return () => window.clearInterval(timer);
  }, []);

  const timeParts = useMemo(() => formatDateParts(now), [now]);

  const handleVerify = async (event) => {
    event.preventDefault();
    const normalized = gardenerName.trim().replace(/\s+/g, '');
    const normalizedPassword = canonicalizeRitualPassword(ritualPassword);
    if (normalized !== '顾意') {
      setNoticeText('身份校验失败');
      return;
    }

    if (!normalizedPassword) {
      setNoticeText('身份校验失败');
      return;
    }

    const passwordHash = await hashWithPepper(
      normalizedPassword,
      RITUAL_ENTRY_PASSWORD_PEPPER
    );

    if (passwordHash !== RITUAL_ENTRY_PASSWORD_HASH) {
      setNoticeText('身份校验失败');
      return;
    }

    setNoticeText('');
    window.localStorage.setItem('ritual-entry:garden001-verified', 'true');
    navigate('/p/d7e40a1c9b');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#eef2ef',
        boxSizing: 'border-box',
        fontFamily:
          '"Microsoft YaHei", "PingFang SC", "Noto Sans SC", "SimHei", Arial, sans-serif',
        fontWeight: 800,
        position: 'relative',
        overflow: 'hidden',
        background: '#050707',
      }}
    >
      <Balatro
        color1="#8b0502"
        color2="#21f2a4"
        color3="#101819"
        contrast={4.1}
        lighting={0.34}
        spinAmount={0.38}
        pixelFilter={820}
        isRotate={false}
        mouseInteraction
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
        }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1,
          pointerEvents: 'none',
          background:
            'radial-gradient(circle at 50% 22%, rgba(13, 19, 17, 0.38), rgba(0, 0, 0, 0.9) 70%), linear-gradient(180deg, rgba(0, 0, 0, 0.46) 0%, rgba(0, 0, 0, 0.18) 42%, rgba(0, 0, 0, 0.72) 100%)',
        }}
      />

      <main
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          width: 'min(1180px, 100%)',
          margin: '0 auto',
          padding: '12vh 24px 72px',
          boxSizing: 'border-box',
          display: 'grid',
          alignContent: 'start',
        }}
      >
        <section
          style={{
            width: '100%',
            display: 'grid',
            justifyItems: 'center',
            gap: 22,
          }}
        >
          <h1
            style={{
              margin: 0,
              color: '#ff1d25',
              fontSize: 'clamp(34px, 4.2vw, 58px)',
              lineHeight: 1.22,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textAlign: 'center',
              textShadow: '0 0 16px rgba(255, 0, 0, 0.32)',
            }}
          >
            第三十二届栽种仪式正在进行中……
          </h1>

          <div
            aria-hidden="true"
            style={{
              width: 'min(520px, 62vw)',
              display: 'grid',
              gridTemplateColumns: '1fr auto 1fr',
              alignItems: 'center',
              gap: 14,
              color: '#ff1d25',
            }}
          >
            <span style={{ height: 1, background: 'currentColor', opacity: 0.72 }} />
            <span
              style={{
                width: 34,
                height: 34,
                border: '1px solid currentColor',
                borderRadius: 999,
                display: 'grid',
                placeItems: 'center',
                fontSize: 20,
                lineHeight: 1,
              }}
            >
              ✿
            </span>
            <span style={{ height: 1, background: 'currentColor', opacity: 0.72 }} />
          </div>

          <div
            style={{
              color: 'rgba(238, 244, 240, 0.78)',
              fontSize: 'clamp(14px, 1.2vw, 18px)',
              letterSpacing: '0.1em',
              fontWeight: 800,
              textShadow: '0 0 12px rgba(0, 0, 0, 0.5)',
              marginTop: 2,
            }}
          >
            当前时间：{timeParts.year}/{timeParts.month}/{timeParts.day}
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: 'clamp(6px, 1vw, 18px)',
              width: '100%',
              marginTop: 6,
            }}
          >
            {[timeParts.hour, ':', timeParts.minute, ':', timeParts.second].map((item, index) => (
              <div
                key={`${item}-${index}`}
                style={{
                  flex: item === ':' ? '0 0 auto' : '1 1 0',
                  display: 'grid',
                  placeItems: 'center',
                  minHeight: 'clamp(160px, 18vw, 270px)',
                  border: item === ':' ? 'none' : '1px solid rgba(238, 244, 240, 0.14)',
                  borderRadius: item === ':' ? 0 : 8,
                  background: item === ':' ? 'transparent' : 'rgba(6, 9, 9, 0.14)',
                  boxShadow: 'none',
                  padding: item === ':' ? 0 : '20px 14px',
                }}
              >
                <div
                  style={{
                    fontSize:
                      item === ':'
                        ? 'clamp(82px, 11vw, 150px)'
                        : 'clamp(118px, 19vw, 250px)',
                    lineHeight: 0.88,
                    fontWeight: 900,
                    color: '#f7faf8',
                    letterSpacing: item === ':' ? 0 : 0,
                    textShadow: '0 0 28px rgba(238, 244, 240, 0.18)',
                    fontFamily:
                      '"Arial Black", "Bahnschrift SemiBold", "Impact", "Segoe UI", sans-serif',
                    transform: item === ':' ? 'translateY(-0.04em)' : 'none',
                  }}
                >
                  {item}
                </div>
              </div>
            ))}
          </div>

          <form
            onSubmit={handleVerify}
            style={{
              width: 'min(920px, calc(100vw - 48px))',
              display: 'grid',
              justifyItems: 'center',
              gap: 22,
              marginTop: 12,
              justifySelf: 'center',
              minWidth: 0,
            }}
          >
            <div
              style={{
                width: '100%',
                height: 38,
                position: 'relative',
              }}
            >
                <label
                  htmlFor="gardener-name"
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    lineHeight: 1.35,
                    color: '#f2f6f4',
                    fontSize: 'clamp(16px, 1.55vw, 26px)',
                    textAlign: 'center',
                    letterSpacing: '0.02em',
                    textShadow: '0 0 12px rgba(0, 0, 0, 0.55)',
                    whiteSpace: 'nowrap',
                    width: 'max-content',
                    maxWidth: 'calc(100vw - 48px)',
                  }}
                >
                  栽种期间仅<span style={{ color: '#ff1d25' }}>园丁001</span>可操作。如遇<span style={{ color: '#ff1d25' }}>紧急情况</span>需要中断仪式，请登陆<span style={{ color: '#ff1d25' }}>园丁001</span>的账号进行校验：
                </label>
            </div>
                <input
                  id="gardener-name"
                  type="text"
                  placeholder="请输入真实姓名"
                  value={gardenerName}
                  onChange={(event) => {
                    setGardenerName(event.target.value);
                    setNoticeText('');
                  }}
                  autoComplete="off"
                  style={{
                    width: '100%',
                    height: 74,
                    border: '2px solid rgba(22, 207, 107, 0.96)',
                    borderRadius: 6,
                    background: 'rgba(0, 0, 0, 0.36)',
                    padding: '0 26px',
                    fontSize: 'clamp(22px, 2vw, 30px)',
                    color: '#f4faf7',
                    fontWeight: 700,
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <input
                  id="ritual-password"
                  type="password"
                  placeholder="请输入密码"
                  value={ritualPassword}
                  onChange={(event) => {
                    setRitualPassword(event.target.value);
                    setNoticeText('');
                  }}
                  autoComplete="off"
                  style={{
                    width: '100%',
                    height: 74,
                    border: '2px solid rgba(255, 29, 37, 0.78)',
                    borderRadius: 6,
                    background: 'rgba(0, 0, 0, 0.36)',
                    padding: '0 26px',
                    fontSize: 'clamp(22px, 2vw, 30px)',
                    color: '#f4faf7',
                    fontWeight: 700,
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    width: 'min(500px, 82%)',
                    height: 82,
                    borderRadius: 6,
                    border: '2px solid #ff1d25',
                    background: 'rgba(0, 0, 0, 0.34)',
                    color: '#ff1d25',
                    fontSize: 'clamp(28px, 2.7vw, 42px)',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                    boxShadow: 'none',
                  }}
                >
                  提交验证
                </button>

                {noticeText ? (
                  <span style={{ color: '#ffb9b9', lineHeight: 1.8, textAlign: 'center' }}>{noticeText}</span>
                ) : null}
          </form>

          <nav
            aria-label="仪式入口导航"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 28,
              marginTop: 4,
              color: 'rgba(22, 207, 107, 0.9)',
              fontSize: 'clamp(20px, 1.8vw, 28px)',
              letterSpacing: '0.06em',
            }}
          >
            <Link
              to="/p/3e7b10a9c4"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              返回静室花园
            </Link>
            <span style={{ color: 'rgba(22, 207, 107, 0.42)' }}>|</span>
            <Link
              to="/p/a19de704c6"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              过往栽种记录
            </Link>
          </nav>
        </section>
      </main>
    </div>
  );
}
