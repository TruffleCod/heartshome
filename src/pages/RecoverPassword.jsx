import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import posts from '../data/posts.json';
import { hashWithPepper, normalizeInput } from '../utils/hash';

const FORUM_ACCOUNT_IDS = Array.from(
  new Set(
    posts.flatMap((post) => [
      post.author,
      ...(post.comments || []).map((comment) => comment.author),
    ]),
  ),
).filter(Boolean);

const SPECIAL_ACCOUNT_ID = '孤独四叶草';
const RECOVER_SECURITY_PEPPER = 'heart_home_recover_v1::';

const SPECIAL_SECURITY_QUESTIONS = [
  {
    key: 'q1',
    label: '安全提示问题1：我最喜欢的花是什么？',
    answerHash: 'ab823788ea26f2f527c6c628fb43943a2c8b72ebd5caac7e2248f0a83f3a07ce',
  },
  {
    key: 'q2',
    label: '安全提示问题2：我的小学班主任叫什么名字？',
    answerHash: 'f6f1090b5916cb8c429d2818e47c6db4e76cd37e665498e60d8e4a7734c83eb0',
  },
  {
    key: 'q3',
    label: '安全提示问题3：我的第一只宠物的名字？',
    answerHash: 'a0d9e1e4e2d886a3a9448ed1f8c50922f24288e5162ee4b3529b45bf5ee5c3ff',
  },
];

const COMMON_SECURITY_QUESTION_POOL = [
  '你第一次独自旅行的城市是哪里？',
  '你最喜欢的一本书名是什么？',
  '你儿时最常去的一家小店叫什么？',
  '你最喜欢的电影角色是谁？',
  '你小时候最想养的宠物是什么？',
  '你小学时最喜欢的科目是什么？',
  '你印象最深的一次生日礼物是什么？',
  '你最常用的网名灵感来自哪里？',
  '你最喜欢的季节是什么？',
  '你最喜欢的一道家常菜是什么？',
];

function buildCommonQuestionsForAccount(account) {
  const base =
    Array.from(account).reduce((sum, ch) => sum + ch.charCodeAt(0), 0) %
    COMMON_SECURITY_QUESTION_POOL.length;

  return [0, 3, 6].map((offset, index) => {
    const poolIndex = (base + offset) % COMMON_SECURITY_QUESTION_POOL.length;
    return {
      key: `common-${index + 1}`,
      label: `安全提示问题${index + 1}：${COMMON_SECURITY_QUESTION_POOL[poolIndex]}`,
      answerHash: '',
    };
  });
}

export default function RecoverPassword() {
  const navigate = useNavigate();

  const [accountId, setAccountId] = useState('');
  const [accountChecked, setAccountChecked] = useState(false);
  const [accountFound, setAccountFound] = useState(false);
  const [selectedQuestionKey, setSelectedQuestionKey] = useState('');
  const [securityAnswer, setSecurityAnswer] = useState('');
  const [message, setMessage] = useState('');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const normalizedAccountId = normalizeInput(accountId);
  const activeQuestions = useMemo(
    () =>
      normalizedAccountId === SPECIAL_ACCOUNT_ID
        ? SPECIAL_SECURITY_QUESTIONS
        : buildCommonQuestionsForAccount(normalizedAccountId),
    [normalizedAccountId],
  );
  const selectedQuestion = useMemo(
    () => activeQuestions.find((item) => item.key === selectedQuestionKey),
    [activeQuestions, selectedQuestionKey],
  );

  const handleCheckAccount = () => {
    const normalizedId = normalizeInput(accountId);

    if (!normalizedId) {
      setAccountChecked(true);
      setAccountFound(false);
      setMessage('请输入账户ID。');
      return;
    }

    const found = FORUM_ACCOUNT_IDS.includes(normalizedId);
    setAccountChecked(true);
    setAccountFound(found);
    setSelectedQuestionKey('');
    setSecurityAnswer('');

    if (found) {
      setMessage('账户已找到，请选择一条安全提示问题并输入答案。');
      return;
    }

    setMessage('未找到对应账户ID，请检查后重试。');
  };

  const handleVerifySecurityAnswer = async () => {
    if (!selectedQuestion) {
      setMessage('请先选择一个安全提示问题。');
      return;
    }

    const normalizedAnswer = normalizeInput(securityAnswer);

    if (!normalizedAnswer) {
      setMessage('请输入安全提示答案。');
      return;
    }

    if (normalizedAccountId === SPECIAL_ACCOUNT_ID) {
      const answerHash = await hashWithPepper(normalizedAnswer, RECOVER_SECURITY_PEPPER);
      if (answerHash === selectedQuestion.answerHash) {
        setShowSuccessModal(true);
        successTimerRef.current = window.setTimeout(() => {
          navigate('/p/1b9c60e4fa');
        }, 2000);
        return;
      }
      setMessage('安全提示答案不正确。');
      return;
    }

    if (FORUM_ACCOUNT_IDS.includes(normalizedAccountId)) {
      setMessage('安全提示答案不正确。');
      return;
    }

    setMessage('安全提示答案不正确。');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f7f6',
        color: '#25383a',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif',
      }}
    >
      <HeartHomeHeader />

      <main
        style={{
          flex: 1,
          padding: '68px 20px 76px',
        }}
      >
        <section
          style={{
            maxWidth: 720,
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid #d9e5de',
            borderRadius: 14,
            overflow: 'hidden',
            boxShadow: '0 18px 42px rgba(21, 71, 42, 0.06)',
          }}
        >
          <div
            style={{
              display: 'grid',
            }}
          >
            <div
              style={{
                padding: '38px 38px 42px',
              }}
            >
              <h1
                style={{
                  margin: '0 0 10px',
                  fontSize: 26,
                  color: '#1f3f2d',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                找回密码
              </h1>

              <p
                style={{
                  margin: '0 0 26px',
                  color: '#667f76',
                  fontSize: 14,
                  lineHeight: 1.75,
                }}
              >
                请输入账户ID。找到对应账户后，系统会要求你回答一条安全提示问题。
              </p>

              <div style={{ display: 'grid', gap: 16 }}>
                <label
                  style={{
                    display: 'grid',
                    gap: 8,
                    fontSize: 14,
                    color: '#34483f',
                    fontWeight: 700,
                  }}
                >
                  账户ID
                  <input
                    type="text"
                    value={accountId}
                    onChange={(event) => {
                      setAccountId(event.target.value);
                      setMessage('');
                      setAccountChecked(false);
                    }}
                    placeholder="请输入账户ID"
                    autoComplete="username"
                    style={{
                      height: 42,
                      border: '1px solid #c6d6ce',
                      borderRadius: 8,
                      background: '#fcfefd',
                      padding: '0 12px',
                      fontSize: 15,
                      outline: 'none',
                      color: '#1f2f28',
                      boxSizing: 'border-box',
                    }}
                  />
                </label>

                <div>
                  <button
                    type="button"
                    onClick={handleCheckAccount}
                    style={{
                      height: 42,
                      minWidth: 116,
                      border: '1px solid #1f6f3a',
                      borderRadius: 999,
                      background: '#1f6f3a',
                      color: '#ffffff',
                      fontWeight: 800,
                      cursor: 'pointer',
                      fontSize: 15,
                    }}
                  >
                    查找账户
                  </button>
                </div>

                {accountChecked && accountFound && (
                  <div style={{ display: 'grid', gap: 12, marginTop: 4 }}>
                    <label
                      style={{
                        display: 'grid',
                        gap: 8,
                        fontSize: 14,
                        color: '#34483f',
                        fontWeight: 700,
                      }}
                    >
                      选择安全提示问题（三选一）
                      <select
                        value={selectedQuestionKey}
                        onChange={(event) => {
                          setSelectedQuestionKey(event.target.value);
                          setMessage('');
                        }}
                        style={{
                          height: 42,
                          border: '1px solid #c6d6ce',
                          borderRadius: 8,
                          background: '#fcfefd',
                          padding: '0 12px',
                          fontSize: 14,
                          outline: 'none',
                          color: '#1f2f28',
                        }}
                      >
                        <option value="">请选择问题</option>
                        {activeQuestions.map((item) => (
                          <option key={item.key} value={item.key}>
                            {item.label}
                          </option>
                        ))}
                      </select>
                    </label>

                    <label
                      style={{
                        display: 'grid',
                        gap: 8,
                        fontSize: 14,
                        color: '#34483f',
                        fontWeight: 700,
                      }}
                    >
                      安全提示答案
                      <input
                        type="text"
                        value={securityAnswer}
                        onChange={(event) => {
                          setSecurityAnswer(event.target.value);
                          setMessage('');
                        }}
                        placeholder="请输入答案"
                        style={{
                          height: 42,
                          border: '1px solid #c6d6ce',
                          borderRadius: 8,
                          background: '#fcfefd',
                          padding: '0 12px',
                          fontSize: 15,
                          outline: 'none',
                          color: '#1f2f28',
                          boxSizing: 'border-box',
                        }}
                      />
                    </label>

                    <div>
                      <button
                        type="button"
                        onClick={handleVerifySecurityAnswer}
                        style={{
                          height: 42,
                          minWidth: 116,
                          border: '1px solid #1f6f3a',
                          borderRadius: 999,
                          background: '#ffffff',
                          color: '#1f6f3a',
                          fontWeight: 800,
                          cursor: 'pointer',
                          fontSize: 15,
                        }}
                      >
                        验证答案
                      </button>
                    </div>
                  </div>
                )}

                {message && (
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#f7fbf8',
                      border: '1px solid #d9e5de',
                      color: '#4f685f',
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {message}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      <HeartHomeFooter
        onOpenForum={() => {
          navigate('/p/b12e8f40a6');
        }}
      />

      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(20, 40, 32, 0.38)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            padding: 20,
          }}
        >
          <div
            style={{
              width: 'min(420px, 100%)',
              background: '#ffffff',
              border: '1px solid #d7e4dd',
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(15, 44, 31, 0.22)',
              padding: '24px 22px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#2d4740',
                fontSize: 16,
                lineHeight: 1.8,
                fontWeight: 600,
              }}
            >
              登陆成功！正在跳转中
            </p>
          </div>
        </div>
      )}
    </div>
  );
}





