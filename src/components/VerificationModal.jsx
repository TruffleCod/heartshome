import { useState } from 'react';
import { Link } from 'react-router-dom';

const CORRECT_ANSWERS = ['温暖照亮'];

export default function VerificationModal({ onClose, onSuccess }) {
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState('');

  const normalizeAnswer = (value) => {
    return value.replace(/\s/g, '').replace(/[，。、“”‘’?']/g, '').trim();
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalized = normalizeAnswer(answer);

    if (!normalized) {
      setError('请先输入内容。');
      return;
    }

    const isCorrect = CORRECT_ANSWERS.some((item) => {
      return normalizeAnswer(item) === normalized;
    });

    if (!isCorrect) {
      setError('输入内容不正确。请先阅读社区交流守则。');
      return;
    }

    setError('');
    localStorage.setItem('heartHomeForumVerified', 'true');
    onSuccess();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="verification-title"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        background: 'rgba(30, 42, 36, 0.42)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '32px',
        backdropFilter: 'blur(3px)',
      }}
    >
      <div
        style={{
          width: 'min(860px, 92vw)',
          background: 'rgba(255, 255, 255, 0.96)',
          borderRadius: 18,
          boxShadow: '0 26px 80px rgba(21, 48, 32, 0.2)',
          border: '1px solid rgba(207, 222, 211, 0.9)',
          overflow: 'hidden',
          color: '#1f2f28',
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Segoe UI", "Microsoft YaHei", "PingFang SC", "Noto Sans SC", sans-serif',
        }}
      >
        <div
          style={{
            height: 10,
            background:
              'linear-gradient(90deg, #2f7a4a 0%, #6fa77b 52%, #d7e7d7 100%)',
          }}
        />

        <form onSubmit={handleSubmit} style={{ padding: '42px 56px 46px' }}>
          <div style={{ marginBottom: 32 }}>
            <p
              id="verification-title"
              style={{
                margin: 0,
                color: '#214932',
                fontSize: 22,
                fontWeight: 700,
                letterSpacing: '0.04em',
              }}
            >
              嗨，这里是心之家的温暖角落
            </p>

            <p
              style={{
                margin: '18px 0 0',
                color: '#53635b',
                fontSize: 16,
                lineHeight: 1.95,
                letterSpacing: '0.02em',
              }}
            >
              为保障每一位家人的隐私与安心，这个小小的“秘密花园”仅对注册成员开放。
            </p>

            <p
              style={{
                margin: '10px 0 0',
                color: '#53635b',
                fontSize: 16,
                lineHeight: 1.95,
                letterSpacing: '0.02em',
              }}
            >
              游客可阅读部分公开内容。若您希望进入访客区，请先阅读
              <Link
                to="/p/d3a90b7c2e"
                style={{
                  color: '#2f7a4a',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(47, 122, 74, 0.45)',
                  paddingBottom: 2,
                  margin: '0 4px',
                  fontWeight: 600,
                }}
              >
                《心之家社区交流守则》
              </Link>
              ，并输入我们共同的承诺。
            </p>
          </div>

          <div
            style={{
              margin: '36px 0 0',
              padding: '28px 30px',
              borderRadius: 16,
              background: '#f6faf6',
              border: error ? '1px solid #d8aaa3' : '1px solid #dce9de',
            }}
          >
            <label
              htmlFor="forum-verification-answer"
              style={{
                display: 'flex',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '10px 12px',
                color: '#63716a',
                fontSize: 22,
                lineHeight: 1.9,
                letterSpacing: '0.04em',
              }}
            >
              <span>我承诺，这里每一句对话，都值得被</span>

              <input
                id="forum-verification-answer"
                type="text"
                value={answer}
                onChange={(event) => {
                  setAnswer(event.target.value);
                  setError('');
                }}
                autoComplete="off"
                aria-label="请输入承诺内容"
                style={{
                  width: 180,
                  border: 'none',
                  borderBottom: error
                    ? '2px solid #b65b52'
                    : '2px solid #8da79a',
                  outline: 'none',
                  background: 'transparent',
                  color: '#214932',
                  fontSize: 22,
                  textAlign: 'center',
                  fontWeight: 600,
                  fontFamily: 'inherit',
                  letterSpacing: '0.06em',
                  padding: '2px 4px',
                }}
              />
            </label>

            {error && (
              <p
                style={{
                  margin: '12px 0 0',
                  color: '#a24b43',
                  fontSize: 14,
                  lineHeight: 1.7,
                }}
              >
                {error}
              </p>
            )}
          </div>

          <div
            style={{
              marginTop: 32,
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 14,
            }}
          >
            <button
              type="button"
              onClick={onClose}
              style={{
                minWidth: 112,
                border: '1px solid #d5ddd8',
                background: '#ffffff',
                color: '#66726c',
                borderRadius: 999,
                padding: '11px 24px',
                cursor: 'pointer',
                fontSize: 15,
                fontFamily: 'inherit',
              }}
            >
              暂不进入
            </button>

            <button
              type="submit"
              style={{
                minWidth: 122,
                border: '1px solid #2f7a4a',
                background: '#2f7a4a',
                color: '#ffffff',
                borderRadius: 999,
                padding: '11px 26px',
                cursor: 'pointer',
                fontSize: 15,
                fontWeight: 600,
                fontFamily: 'inherit',
                boxShadow: '0 8px 18px rgba(47, 122, 74, 0.18)',
              }}
            >
              确认承诺
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
