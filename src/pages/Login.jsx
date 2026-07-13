import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import { hashWithPepper, normalizeInput } from '../utils/hash';

const CORRECT_USERNAME = '孤独四叶草';
const LOGIN_PASSWORD_PEPPER = 'heart_home_login_v1::';

const CORRECT_PASSWORD_HASH =
  'e90c93253c64f9855ea6449f9ef18d6d32ecb60cc33d7e2fc10ace6eb684b5c9';

export default function Login() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const successTimerRef = useRef(null);

  useEffect(() => {
    return () => {
      if (successTimerRef.current) {
        window.clearTimeout(successTimerRef.current);
      }
    };
  }, []);

  const handleLogin = async () => {
    const normalizedUsername = normalizeInput(username);
    const normalizedPassword = normalizeInput(password);

    if (!normalizedUsername || !normalizedPassword) {
      setLoginMessage('请输入账号和密码。');
      return;
    }

    setIsChecking(true);

    try {
      const passwordHash = await hashWithPepper(normalizedPassword, LOGIN_PASSWORD_PEPPER);

      if (
        normalizedUsername === CORRECT_USERNAME &&
        passwordHash === CORRECT_PASSWORD_HASH
      ) {
        setLoginMessage('');
        localStorage.setItem('heartHomeLoggedIn', 'true');
        localStorage.setItem('heartHomeCurrentUser', CORRECT_USERNAME);
        setShowSuccessModal(true);
        successTimerRef.current = window.setTimeout(() => {
          navigate('/p/1b9c60e4fa');
        }, 2000);
        return;
      }

      setLoginMessage('账号或密码不正确。');
    } catch {
      setLoginMessage('登录验证失败，请稍后再试。');
    } finally {
      setIsChecking(false);
    }
  };

  const handleRegisterClick = () => {
    setRegisterMessage('当前暂停新用户注册，对此造成的不便，敬请谅解。');
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleLogin();
    }
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
            maxWidth: 860,
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
              gridTemplateColumns: 'minmax(0, 1fr) 300px',
            }}
          >
            <div
              style={{
                padding: '38px 38px 42px',
                borderRight: '1px solid #e3ece7',
              }}
            >
              <h1
                style={{
                  margin: '0 0 28px',
                  fontSize: 26,
                  color: '#1f3f2d',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                用户登录
              </h1>

              <div style={{ display: 'grid', gap: 18 }}>
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
                    value={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                      setLoginMessage('');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="请输入ID"
                    autoComplete="username"
                    style={{
                      height: 42,
                      border: loginMessage
                        ? '1px solid #c9857e'
                        : '1px solid #c6d6ce',
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

                <label
                  style={{
                    display: 'grid',
                    gap: 8,
                    fontSize: 14,
                    color: '#34483f',
                    fontWeight: 700,
                  }}
                >
                  密码
                  <input
                    type="password"
                    value={password}
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setLoginMessage('');
                    }}
                    onKeyDown={handleKeyDown}
                    placeholder="请输入密码"
                    autoComplete="current-password"
                    style={{
                      height: 42,
                      border: loginMessage
                        ? '1px solid #c9857e'
                        : '1px solid #c6d6ce',
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

                {loginMessage && (
                  <div
                    style={{
                      padding: '12px 14px',
                      borderRadius: 10,
                      background: '#fff7f6',
                      border: '1px solid #e4bbb6',
                      color: '#9b3f37',
                      fontSize: 14,
                      lineHeight: 1.7,
                    }}
                  >
                    {loginMessage}
                  </div>
                )}

                <div
                  style={{
                    display: 'flex',
                    gap: 14,
                    alignItems: 'center',
                    marginTop: 6,
                    flexWrap: 'wrap',
                  }}
                >
                  <button
                    type="button"
                    onClick={handleLogin}
                    disabled={isChecking}
                    style={{
                      height: 42,
                      minWidth: 116,
                      border: '1px solid #1f6f3a',
                      borderRadius: 999,
                      background: isChecking ? '#8eb49b' : '#1f6f3a',
                      color: '#ffffff',
                      fontWeight: 800,
                      cursor: isChecking ? 'not-allowed' : 'pointer',
                      fontSize: 15,
                      boxShadow: '0 10px 22px rgba(31, 111, 58, 0.16)',
                    }}
                  >
                    {isChecking ? '验证中' : '登录'}
                  </button>

                  <Link
                    to="/p/fa02d7c8e3"
                    style={{
                      fontSize: 14,
                      color: '#3f6f5a',
                      textDecoration: 'none',
                      borderBottom: '1px solid rgba(63, 111, 90, 0.35)',
                      paddingBottom: 2,
                    }}
                  >
                    忘记密码？
                  </Link>
                </div>
              </div>
            </div>

            <aside
              style={{
                padding: '38px 30px 42px',
                background: '#f9fcfa',
              }}
            >
              <h2
                style={{
                  margin: '0 0 12px',
                  fontSize: 21,
                  color: '#1f3f2d',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                }}
              >
                新用户注册
              </h2>

              <p
                style={{
                  margin: 0,
                  color: '#647c74',
                  lineHeight: 1.85,
                  fontSize: 14,
                }}
              >
                第一次来到心之家？
              </p>

              <button
                type="button"
                onClick={handleRegisterClick}
                style={{
                  marginTop: 22,
                  height: 42,
                  width: '100%',
                  border: '1px solid #dce9de',
                  borderRadius: 999,
                  background: '#ffffff',
                  color: '#1f6f3a',
                  fontWeight: 800,
                  cursor: 'pointer',
                  fontSize: 15,
                }}
              >
                注册账号
              </button>

              {registerMessage && (
                <div
                  style={{
                    marginTop: 18,
                    padding: '14px 16px',
                    borderRadius: 12,
                    background: '#ffffff',
                    border: '1px solid #dce9de',
                    color: '#6a7a72',
                    fontSize: 14,
                    lineHeight: 1.8,
                  }}
                >
                  {registerMessage}
                </div>
              )}
            </aside>
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







