import { useMemo, useState } from 'react';

export default function PostInteractionPanel({
  commentsDisabled = false,
  onLikeChange,
  comments = [],
  postAuthor = '',
}) {
  const [liked, setLiked] = useState(false);
  const [isPressing, setIsPressing] = useState(false);
  const [isCommentPressing, setIsCommentPressing] = useState(false);
  const [showFakeEditor, setShowFakeEditor] = useState(false);

  const handleLike = () => {
    const nextLiked = !liked;
    setLiked(nextLiked);
    onLikeChange?.(nextLiked ? 1 : -1);
    setIsPressing(true);
    window.setTimeout(() => setIsPressing(false), 140);
  };

  const handleCommentClick = () => {
    setShowFakeEditor((v) => !v);
    setIsCommentPressing(true);
    window.setTimeout(() => setIsCommentPressing(false), 140);
  };
  
  const officialCounselors = ['陈霁', '袁知夏', '陆心音', '顾正清'];
  const normalizedComments = useMemo(() => {
    return comments
      .map((comment, index) => {
        const role = comment.role || 'user';
        const author = String(comment.author || '').trim();
        const isPostAuthor = author === String(postAuthor || '').trim();
        const isSystemAssistant = author === '系统助手';

        const isOfficialCounselor = officialCounselors.includes(author);

        const isCounselor =
          role === 'official_counselor' ||
          comment.isOfficialCounselor === true ||
          isOfficialCounselor;

        return {
          ...comment,
          role,
          isPostAuthor,
          isSystemAssistant,
          isCounselor,
          _originalIndex: index,
        };
      })
      .sort((a, b) => {
        if (a.isSystemAssistant !== b.isSystemAssistant) {
          return a.isSystemAssistant ? -1 : 1;
        }
        if (a.isCounselor !== b.isCounselor) {
          return a.isCounselor ? -1 : 1;
        }
        return a._originalIndex - b._originalIndex;
      });
  }, [comments, postAuthor]);

  const hasComments = normalizedComments.length > 0;

  return (
    <section
      style={{
        marginTop: 56,
        paddingTop: 26,
        borderTop: '1px solid #dfe7e2',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <button
          type="button"
          onClick={handleLike}
          style={{
            border: liked ? '1px solid #1f4d33' : '1px solid #d7e3dc',
            borderRadius: 999,
            background: liked ? '#1f4d33' : '#ffffff',
            color: liked ? '#ffffff' : '#1f4d33',
            padding: '10px 18px',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 800,
            transform: isPressing ? 'translateY(2px) scale(0.96)' : 'translateY(0) scale(1)',
            boxShadow: isPressing
              ? 'inset 0 2px 5px rgba(0, 0, 0, 0.18)'
              : '0 6px 14px rgba(31, 77, 51, 0.08)',
            transition:
              'transform 120ms ease, box-shadow 120ms ease, background 120ms ease, color 120ms ease, border-color 120ms ease',
          }}
        >
          {liked ? '已点赞' : '点赞'}
        </button>

        <button
          type="button"
          onClick={handleCommentClick}
          onMouseDown={() => setIsCommentPressing(true)}
          onMouseUp={() => setIsCommentPressing(false)}
          onMouseLeave={() => setIsCommentPressing(false)}
          style={{
            border: showFakeEditor ? '1px solid #1f4d33' : '1px solid #d7e3dc',
            borderRadius: 999,
            background: showFakeEditor ? '#1f4d33' : '#ffffff',
            color: showFakeEditor ? '#ffffff' : '#1f4d33',
            padding: '10px 18px',
            cursor: 'pointer',
            fontSize: 15,
            fontWeight: 800,
            transform: isCommentPressing
              ? 'translateY(2px) scale(0.96)'
              : 'translateY(0) scale(1)',
            boxShadow: isCommentPressing
              ? 'inset 0 2px 5px rgba(0, 0, 0, 0.18)'
              : '0 6px 14px rgba(31, 77, 51, 0.08)',
            transition:
              'transform 120ms ease, box-shadow 120ms ease, background 120ms ease, color 120ms ease, border-color 120ms ease',
          }}
        >
          评论
        </button>
      </div>

      {showFakeEditor ? (
        <div
          style={{
            marginTop: 14,
            border: '1px solid #dfe7e2',
            borderRadius: 10,
            background: '#fbfdfb',
            padding: '12px 14px',
            color: '#6b7b71',
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          当前访客不支持评论功能
        </div>
      ) : null}

      <div
        style={{
          marginTop: 22,
          border: '1px solid #dfe7e2',
          borderRadius: 10,
          background: '#f7fbf7',
          padding: '18px 20px',
          color: '#66766c',
          fontSize: 15,
          lineHeight: 1.7,
        }}
      >
        {hasComments ? (
          <div style={{ display: 'grid', gap: 18 }}>
            {normalizedComments.map((comment, index) => (
              <article
                key={`${comment.author}-${comment.date}-${index}`}
                style={{
                  position: 'relative',
                  background: '#ffffff',
                  border: comment.isCounselor ? '1px solid #b8d8c3' : '1px solid #e3ece6',
                  borderRadius: 8,
                  padding: '14px 72px 14px 16px',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: 16,
                    top: 14,
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: '#e8f3ec',
                    color: '#1f5f3a',
                    border: '1px solid #bcd8c7',
                    fontSize: 14,
                    fontWeight: 800,
                    lineHeight: 1,
                  }}
                >
                  {String(index + 1).padStart(2, '0')}
                </div>

                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: '8px 10px',
                    marginBottom: 10,
                    color: '#334155',
                    fontSize: 14,
                    lineHeight: 1.7,
                    fontWeight: 700,
                  }}
                >
                  <span>{`ID：${comment.author}`}</span>
                  {comment.isSystemAssistant ? (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#eef2ff',
                        color: '#3346a5',
                        border: '1px solid #cfd8ff',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      置顶
                    </span>
                  ) : comment.isPostAuthor ? (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#fff6e8',
                        color: '#9a5a00',
                        border: '1px solid #f0d7ad',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      楼主
                    </span>
                  ) : comment.isCounselor ? (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#e8f5ed',
                        color: '#1f6f3a',
                        border: '1px solid #b8d8c3',
                        fontSize: 12,
                        fontWeight: 800,
                        letterSpacing: '0.02em',
                      }}
                    >
                      官方咨询师
                    </span>
                  ) : (
                    <span
                      style={{
                        display: 'inline-block',
                        padding: '2px 8px',
                        borderRadius: 999,
                        background: '#f2f4f7',
                        color: '#5f6b76',
                        border: '1px solid #d9e0e6',
                        fontSize: 12,
                        fontWeight: 700,
                      }}
                    >
                      普通用户
                    </span>
                  )}
                  {comment.date ? <span>{comment.date}</span> : null}
                </div>

                {comment.paragraphs?.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${index}-p-${paragraphIndex}`}
                    style={{
                      margin: paragraphIndex === comment.paragraphs.length - 1 ? '0' : '0 0 10px',
                      color: '#2f3a35',
                      fontSize: 15,
                      lineHeight: 1.9,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}

                {comment.bullets?.length ? (
                  <ul
                    style={{
                      margin: '10px 0 0',
                      paddingLeft: 22,
                      color: '#2f3a35',
                      fontSize: 15,
                      lineHeight: 1.85,
                    }}
                  >
                    {comment.bullets.map((item, bulletIndex) => (
                      <li key={`${index}-b-${bulletIndex}`}>{item}</li>
                    ))}
                  </ul>
                ) : null}

                {comment.trailingParagraphs?.map((paragraph, paragraphIndex) => (
                  <p
                    key={`${index}-tp-${paragraphIndex}`}
                    style={{
                      margin: '10px 0 0',
                      color: '#2f3a35',
                      fontSize: 15,
                      lineHeight: 1.9,
                      whiteSpace: 'pre-line',
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </article>
            ))}
          </div>
        ) : commentsDisabled ? (
          '已被管理员设置为禁止回复'
        ) : (
          '暂无评论。'
        )}
      </div>
    </section>
  );
}
