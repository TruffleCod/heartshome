import { useState } from 'react';
import { Link } from 'react-router-dom';
import HeartHomeFooter from '../components/HeartHomeFooter';
import HeartHomeHeader from '../components/HeartHomeHeader';
import VerificationModal from '../components/VerificationModal';
import {
  getHeartHomeWorkspacePath,
  openVisitorForumOrVerify,
  openVisitorForumWindow,
} from '../utils/forumAccess';
import { publicPath } from '../utils/publicPath';

const forumPosts = [
  {
    title: '【置顶】【心之家社区】交流守则',
    to: '/p/d3a90b7c2e',
    pinned: true,
  },
  {
    title: '【置顶】【节日活动】发现你的专属「心灵之花」',
    to: '/p/7c1e4a9f08',
    pinned: true,
  },
  {
    title: '【求助】30岁，年薪不错但毫无意义，我该辞职吗？',
    to: '/p/91b7c2e0a4',
  },
  {
    title: '【抑郁自救】最近记忆力下降得厉害，该停药吗？',
    to: '/p/2f8d6c0b91',
  },
  {
    title: '【吐槽】天天拿抑郁症道德绑架别人真的很烦。',
    to: '/p/8a04e6d3f2',
  },
];

function isForumLoggedIn() {
  return (
    typeof window !== 'undefined' &&
    window.localStorage.getItem('heartHomeLoggedIn') === 'true'
  );
}

export default function Forum() {
  const [showVerification, setShowVerification] = useState(false);
  const loginTargetPath = isForumLoggedIn()
    ? getHeartHomeWorkspacePath()
    : '/p/6e58c2b9a1';

  const handleLoginLinkClick = (event) => {
    const currentTargetPath = isForumLoggedIn()
      ? getHeartHomeWorkspacePath()
      : '/p/6e58c2b9a1';

    if (currentTargetPath !== loginTargetPath) {
      event.preventDefault();
      window.open(
        publicPath(currentTargetPath),
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  const openForum = () => {
    openVisitorForumOrVerify(() => setShowVerification(true));
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    openVisitorForumWindow();
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f7fbf7',
        color: '#1f2f28',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader />

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
                color: '#2f7a4a',
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
                color: '#1f3f2d',
                fontSize: 42,
                lineHeight: 1.25,
              }}
            >
              秘密花园-访客试读区
            </h1>
            <p
              style={{
                margin: 0,
                color: '#66766c',
                fontSize: 17,
                lineHeight: 1.8,
              }}
            >
              在这里记录心事，听见他人。请记得，你并不孤独。
            </p>
          </div>

          <Link
            to={loginTargetPath}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleLoginLinkClick}
            style={{
              flex: '0 0 auto',
              color: '#1f4d33',
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 800,
              border: '1px solid #cfe0d5',
              borderRadius: 999,
              background: '#ffffff',
              padding: '10px 18px',
              boxShadow: '0 8px 18px rgba(21, 71, 42, 0.08)',
            }}
          >
            登录/注册
          </Link>
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
                border: '1px solid #dce9de',
                borderRadius: 8,
                background: '#ffffff',
                color: post.pinned ? '#b82717' : '#1f2f28',
                padding: '20px 24px',
                textDecoration: 'none',
                fontSize: 20,
                fontWeight: post.pinned ? 800 : 700,
                lineHeight: 1.55,
                boxShadow: '0 10px 24px rgba(21, 71, 42, 0.06)',
              }}
            >
              {post.title}
            </Link>
          ))}
        </nav>
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
