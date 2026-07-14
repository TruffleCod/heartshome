import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import VerificationModal from '../components/VerificationModal';
import { openVisitorForumOrVerify, openVisitorForumWindow } from '../utils/forumAccess';
import { hashWithPepper, normalizeInput } from '../utils/hash';
import { preloadImage } from '../utils/preloadAssets';
import {
  INNER_FORUM_LIGHT_ACCENT,
  INNER_FORUM_LIGHT_BG,
  INNER_FORUM_LIGHT_BORDER,
  INNER_FORUM_LIGHT_BORDER_SOFT,
  INNER_FORUM_LIGHT_HEADER_TEXT,
  INNER_FORUM_LIGHT_MUTED,
  INNER_FORUM_LIGHT_SURFACE,
  INNER_FORUM_LIGHT_SURFACE_ALT,
  INNER_FORUM_LIGHT_TEXT,
} from '../constants/internalForumTheme';

const forumPosts = [
  {
    title: '【置顶】【心之家社区】交流守则',
    to: '/p/f2c96a10de',
    pinned: true,
  },
  {
    title: '感谢心之家，我终于能睡着了。',
    to: '/p/0b9e71d4ac',
  },
];

const INNER_FORUM_LOGIN_PEPPER = 'heart_home_inner_forum_login_v1::';
const INNER_FORUM_NAME_PEPPER = 'heart_home_inner_forum_name_v1::';
const INNER_FORUM_CURRENT_ID = '花匠338';
const INNER_FORUM_ACCOUNTS = {
  花匠338: {
    nameHashes: ['f0727bd98b8bf1c453c7cb8972483d8350540397cb402b22f4cf9b0e8a1fe216'],
    passwordHash:
      '40c4a567c95d4916b355687f3598bf52c71b7e29552a53797f904d6736964b7b',
    targetPath: '/p/94dc1b7e03',
  },
};

function canonicalizeInnerForumName(value) {
  return normalizeInput(value)
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '')
    .replace(/\s+/g, '')
    .replace(/陸/g, '陆');
}

function canonicalizeInnerForumPassword(value) {
  return normalizeInput(value)
    .normalize('NFKC')
    .replace(/[\u200B-\u200D\uFEFF]/g, '');
}

function matchesStoredHash(candidateHash, storedHashes) {
  const hashList = Array.isArray(storedHashes) ? storedHashes : [storedHashes];
  return hashList.includes(candidateHash);
}

function matchesAccountName(accountId, normalizedName, candidateHash, account) {
  if (matchesStoredHash(candidateHash, account.nameHashes)) {
    return true;
  }

  if (accountId === '花匠338') {
    return normalizedName === '叶诗遥';
  }

  return false;
}

function matchesAccountPassword(accountId, normalizedPassword, candidateHash, account) {
  if (candidateHash === account.passwordHash) {
    return true;
  }

  return false;
}

function isInnerForumLoggedIn() {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('heartHomeInnerForumLoggedIn') === 'true'
  );
}

export default function InternalForum() {
  const navigate = useNavigate();
  const [showVerification, setShowVerification] = useState(false);
  const [showInnerLoginModal, setShowInnerLoginModal] = useState(false);
  const [innerForumName, setInnerForumName] = useState('');
  const [innerForumPassword, setInnerForumPassword] = useState('');
  const [innerForumMessage, setInnerForumMessage] = useState('');
  const [isCheckingInnerForumPassword, setIsCheckingInnerForumPassword] =
    useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    preloadImage('images/blog/background.jpg');
  }, []);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const openForum = () => {
    openVisitorForumOrVerify(() => setShowVerification(true));
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    openVisitorForumWindow();
  };

  const closeInnerLoginModal = () => {
    setShowInnerLoginModal(false);
    setInnerForumName('');
    setInnerForumPassword('');
    setInnerForumMessage('');
    setIsCheckingInnerForumPassword(false);
  };

  const openInnerLoginOrWorkspace = () => {
    if (isInnerForumLoggedIn()) {
      navigate(INNER_FORUM_ACCOUNTS[INNER_FORUM_CURRENT_ID].targetPath);
      return;
    }

    setShowInnerLoginModal(true);
  };

  const handleInnerForumLoginSuccess = (
    identity = INNER_FORUM_CURRENT_ID,
    targetPath = '/p/94dc1b7e03'
  ) => {
    localStorage.setItem('heartHomeInnerForumLoggedIn', 'true');
    localStorage.setItem('heartHomeInnerForumIdentity', identity);
    closeInnerLoginModal();
    setShowSuccessModal(true);
    successTimerRef.current = window.setTimeout(() => {
      navigate(targetPath);
    }, 3000);
  };

  const handleInnerForumLogin = async () => {
    if (isInnerForumLoggedIn()) {
      navigate(INNER_FORUM_ACCOUNTS[INNER_FORUM_CURRENT_ID].targetPath);
      return;
    }

    const normalizedName = canonicalizeInnerForumName(innerForumName);
    const normalizedPassword = canonicalizeInnerForumPassword(innerForumPassword);

    if (!normalizedName || !normalizedPassword) {
      setInnerForumMessage('请输入你的姓名和密码。');
      return;
    }

    setIsCheckingInnerForumPassword(true);

    try {
      const nameHash = await hashWithPepper(normalizedName, INNER_FORUM_NAME_PEPPER);
      const passwordHash = await hashWithPepper(
        normalizedPassword,
        INNER_FORUM_LOGIN_PEPPER
      );
      const currentAccount = INNER_FORUM_ACCOUNTS[INNER_FORUM_CURRENT_ID];
      if (
        !matchesAccountName(
          INNER_FORUM_CURRENT_ID,
          normalizedName,
          nameHash,
          currentAccount
        )
      ) {
        setInnerForumMessage('姓名或密码错误。');
        return;
      }

      if (
        !matchesAccountPassword(
          INNER_FORUM_CURRENT_ID,
          normalizedPassword,
          passwordHash,
          currentAccount
        )
      ) {
        setInnerForumMessage('姓名或密码错误。');
        return;
      }

      if (
        matchesAccountName(
          INNER_FORUM_CURRENT_ID,
          normalizedName,
          nameHash,
          currentAccount
        ) &&
        matchesAccountPassword(
          INNER_FORUM_CURRENT_ID,
          normalizedPassword,
          passwordHash,
          currentAccount
        )
      ) {
        handleInnerForumLoginSuccess(
          INNER_FORUM_CURRENT_ID,
          currentAccount.targetPath
        );
        return;
      }

      setInnerForumMessage('姓名或密码错误。');
    } catch {
      setInnerForumMessage('登录验证失败，请稍后再试。');
    } finally {
      setIsCheckingInnerForumPassword(false);
    }
  };

  const handleInnerForumKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleInnerForumLogin();
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: INNER_FORUM_LIGHT_BG,
        color: INNER_FORUM_LIGHT_TEXT,
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader variant="innerLight" />

      <main
        style={{
          flex: 1,
          width: '100%',
          maxWidth: 1100,
          margin: '0 auto',
          padding: '56px 28px 88px',
          boxSizing: 'border-box',
        }}
      >
        <section
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            gap: 28,
            alignItems: 'flex-start',
            marginBottom: 42,
          }}
        >
          <div>
            <p
              style={{
                margin: '0 0 10px',
                color: INNER_FORUM_LIGHT_HEADER_TEXT,
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: '0.12em',
              }}
            >
              心之家社区
            </p>
            <h1
              style={{
                margin: '0 0 16px',
                color: INNER_FORUM_LIGHT_ACCENT,
                fontSize: 42,
                lineHeight: 1.25,
              }}
            >
              静室花园
            </h1>
            <p
              style={{
                margin: 0,
                color: INNER_FORUM_LIGHT_MUTED,
                fontSize: 17,
                lineHeight: 1.8,
              }}
            >
              在这里记录名字，说出他人。请记得，你并不孤独。
            </p>
          </div>
        </section>

        <nav
          aria-label="论坛帖子"
          style={{
            display: 'grid',
            gap: 14,
          }}
        >
          {forumPosts.map((post) => (
            <Link
              key={post.title}
              to={post.to}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block',
                border: `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
                borderRadius: 8,
                background: INNER_FORUM_LIGHT_SURFACE,
                color: post.pinned ? INNER_FORUM_LIGHT_ACCENT : INNER_FORUM_LIGHT_TEXT,
                padding: '20px 24px',
                textDecoration: 'none',
                fontSize: 20,
                fontWeight: post.pinned ? 800 : 700,
                lineHeight: 1.55,
                boxShadow: '0 10px 24px rgba(56, 54, 39, 0.06)',
              }}
            >
              {post.title}
            </Link>
          ))}
        </nav>

        <section
          style={{
            marginTop: 20,
            color: INNER_FORUM_LIGHT_MUTED,
            fontSize: 13,
            lineHeight: 1.75,
          }}
        >
          <p style={{ margin: 0 }}>
            为了保护各位花匠的隐私，本论坛默认只显示最新1条帖文。
          </p>
          <p style={{ margin: 0 }}>
          花匠可
            <button
              type="button"
              onClick={openInnerLoginOrWorkspace}
              style={{
                border: 'none',
                background: 'transparent',
                color: INNER_FORUM_LIGHT_ACCENT,
                textDecoration: 'underline',
                cursor: 'pointer',
                font: 'inherit',
                padding: 0,
                margin: '0 2px',
              }}
            >
              登陆
            </button>
            查看更多发帖内容。
          </p>
        </section>
      </main>

      <HeartHomeFooter onOpenForum={openForum} variant="innerLight" />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}

      {showInnerLoginModal ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(32, 35, 27, 0.34)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            backdropFilter: 'blur(3px)',
          }}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(720px, 92vw)',
              background: 'rgba(255, 253, 248, 0.97)',
              color: INNER_FORUM_LIGHT_TEXT,
              borderRadius: 18,
              border: '1px solid rgba(207, 222, 211, 0.9)',
              boxShadow: '0 26px 80px rgba(21, 48, 32, 0.2)',
              overflow: 'hidden',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                height: 10,
                background:
                  'linear-gradient(90deg, #3f4737 0%, #6c7560 52%, #d9d2c3 100%)',
              }}
            />

            <div style={{ padding: '34px 40px 36px' }}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  gap: 16,
                  marginBottom: 24,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: INNER_FORUM_LIGHT_ACCENT,
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: '0.02em',
                  }}
                >
                  当前登陆身份：{INNER_FORUM_CURRENT_ID}
                </p>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <label
                  htmlFor="inner-forum-name"
                  style={{
                    color: INNER_FORUM_LIGHT_ACCENT,
                    fontSize: 18,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  真实姓名：
                </label>
                <input
                  id="inner-forum-name"
                  type="text"
                  value={innerForumName}
                  onChange={(event) => {
                    setInnerForumName(event.target.value);
                    setInnerForumMessage('');
                  }}
                  onKeyDown={handleInnerForumKeyDown}
                  autoComplete="off"
                  style={{
                    flex: 1,
                    height: 52,
                    border: innerForumMessage
                      ? '1px solid #c9857e'
                      : `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
                    borderRadius: 10,
                    background: INNER_FORUM_LIGHT_SURFACE,
                    color: INNER_FORUM_LIGHT_TEXT,
                    fontSize: 18,
                    padding: '0 14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 14,
                  marginBottom: 14,
                }}
              >
                <label
                  htmlFor="inner-forum-password"
                  style={{
                    color: INNER_FORUM_LIGHT_ACCENT,
                    fontSize: 18,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  密码：
                </label>
                <input
                  id="inner-forum-password"
                  type="password"
                  value={innerForumPassword}
                  onChange={(event) => {
                    setInnerForumPassword(event.target.value);
                    setInnerForumMessage('');
                  }}
                  onKeyDown={handleInnerForumKeyDown}
                  autoComplete="current-password"
                  style={{
                    flex: 1,
                    height: 52,
                    border: innerForumMessage
                      ? '1px solid #c9857e'
                      : `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
                    borderRadius: 10,
                    background: INNER_FORUM_LIGHT_SURFACE,
                    color: INNER_FORUM_LIGHT_TEXT,
                    fontSize: 18,
                    padding: '0 14px',
                    boxSizing: 'border-box',
                    outline: 'none',
                  }}
                />
              </div>

              <p
                style={{
                  margin: 0,
                  color: INNER_FORUM_LIGHT_MUTED,
                  fontSize: 14,
                  lineHeight: 1.8,
                  letterSpacing: '0.01em',
                }}
              >
                注：本站账号密码默认与心之家主站同步。
              </p>

              {innerForumMessage && (
                <div
                  style={{
                    marginTop: 16,
                    padding: '12px 14px',
                    borderRadius: 10,
                    background: INNER_FORUM_LIGHT_SURFACE_ALT,
                    border: `1px solid ${INNER_FORUM_LIGHT_BORDER_SOFT}`,
                    color: '#9b3f37',
                    fontSize: 14,
                    lineHeight: 1.7,
                  }}
                >
                  {innerForumMessage}
                </div>
              )}

              <div
                style={{
                  marginTop: 24,
                  display: 'flex',
                  justifyContent: 'flex-end',
                  gap: 12,
                }}
              >
                <button
                  type="button"
                  onClick={closeInnerLoginModal}
                  style={{
                    minWidth: 94,
                    border: `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
                    background: INNER_FORUM_LIGHT_SURFACE,
                    color: INNER_FORUM_LIGHT_MUTED,
                    borderRadius: 999,
                    padding: '11px 18px',
                    cursor: 'pointer',
                    fontSize: 14,
                    fontFamily: 'inherit',
                  }}
                >
                  取消
                </button>

                <button
                  type="button"
                  onClick={handleInnerForumLogin}
                  disabled={isCheckingInnerForumPassword}
                  style={{
                    minWidth: 108,
                    border: `1px solid ${INNER_FORUM_LIGHT_ACCENT}`,
                    background: isCheckingInnerForumPassword
                      ? '#7f8a73'
                      : INNER_FORUM_LIGHT_ACCENT,
                    color: INNER_FORUM_LIGHT_HEADER_TEXT,
                    borderRadius: 999,
                    padding: '11px 20px',
                    cursor: isCheckingInnerForumPassword
                      ? 'not-allowed'
                      : 'pointer',
                    fontSize: 14,
                    fontWeight: 600,
                    fontFamily: 'inherit',
                    boxShadow: '0 8px 18px rgba(63, 71, 55, 0.18)',
                  }}
                >
                  {isCheckingInnerForumPassword ? '验证中...' : '登陆'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {showSuccessModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(32, 35, 27, 0.34)',
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
              background: INNER_FORUM_LIGHT_SURFACE,
              border: `1px solid ${INNER_FORUM_LIGHT_BORDER}`,
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(15, 44, 31, 0.22)',
              padding: '24px 22px',
              textAlign: 'center',
            }}
          >
            <p
              style={{
                margin: 0,
                color: INNER_FORUM_LIGHT_ACCENT,
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
