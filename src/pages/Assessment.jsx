import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import VerificationModal from '../components/VerificationModal';

const questions = [
  {
    id: 'q1',
    title: '第 1 题',
    text: '最近一周，你更常出现哪种状态？',
    options: [
      { value: 'A', text: '情绪整体稳定，偶尔感到疲惫' },
      { value: 'B', text: '容易紧张或烦躁，但还能自行调整' },
      { value: 'C', text: '经常反复想起某些事，很难真正放松' },
      { value: 'D', text: '大部分时间都像被困在同一个念头里' },
    ],
  },
  {
    id: 'q2',
    title: '第 2 题',
    text: '当你感到难受时，你通常会怎么做？',
    options: [
      { value: 'A', text: '找熟悉的人聊聊' },
      { value: 'B', text: '先自己待一会儿，等情绪过去' },
      { value: 'C', text: '写下来，整理自己到底为什么难受' },
      { value: 'D', text: '什么都不想做，只想把所有声音关掉' },
    ],
  },
  {
    id: 'q3',
    title: '第 3 题',
    text: '当你尝试讲述一件痛苦的事时，你更希望对方怎么回应？',
    options: [
      { value: 'A', text: '先听我说完，不急着评价' },
      { value: 'B', text: '帮我分析这件事还能怎么处理' },
      { value: 'C', text: '不要反复追问我已经说过的细节' },
      { value: 'D', text: '提醒我先休息，等情绪稳定后再说' },
    ],
  },
  {
    id: 'q4',
    title: '第 4 题',
    text: '当一件事让你很受伤，但别人觉得“没那么严重”时，你更希望得到什么？',
    options: [
      { value: 'A', text: '帮我判断是不是我想得太多' },
      { value: 'B', text: '承认那件事发生过，也承认我受到了伤害' },
      { value: 'C', text: '告诉我这件事已经过去了' },
      { value: 'D', text: '帮我把注意力转移到别的事情上' },
    ],
  },
  {
    id: 'q5',
    title: '第 5 题',
    text: '当你暂时不想继续向别人解释时，你更需要什么？',
    options: [
      { value: 'A', text: '一个能立刻给我建议的人' },
      { value: 'B', text: '一段时间不再讨论这件事' },
      { value: 'C', text: '一个可以安静整理的空间' },
      { value: 'D', text: '有人告诉我应该尽快放下' },
    ],
  },
  {
    id: 'q6',
    title: '第 6 题',
    text: '最近一周，当你想到自己正在承受的压力时，哪种想法更常出现？',
    options: [
      { value: 'A', text: '我可能需要更多时间慢慢恢复' },
      { value: 'B', text: '为什么只有我一个人在痛苦，这很不公平' },
      { value: 'C', text: '我应该试着把注意力放回日常生活' },
      { value: 'D', text: '也许换个环境会让我好一点' },
    ],
  },
  {
    id: 'q7',
    title: '第 7 题',
    text: '最近一周，当你想到那些让你难以释怀的人或事时，哪种想法最强烈？',
    options: [
      { value: 'A', text: '我想知道自己为什么一直放不下' },
      { value: 'B', text: '我想知道别人为什么不能理解我' },
      { value: 'C', text: '我想知道自己还能不能回到以前的状态' },
      { value: 'D', text: '我想知道做错事的人会不会付出代价' },
    ],
  },
];

const scoreMap = {
  A: 0,
  B: 1,
  C: 2,
  D: 3,
};

const displayLabels = ['A', 'B', 'C', 'D'];

const resultCopy = {
  stable: {
    title: '当前状态较为平稳',
    range: '触发范围：0～7 分',
    body: '你的回答显示，近期情绪负荷整体处于可调节范围内。你可能偶尔感到疲惫、烦躁或反复思考，但仍能通过休息、交流或自我整理恢复平衡。\n\n建议继续保持规律作息，关注睡眠、饮食和日常节奏。如后续压力增加，可以再次进行评估。',
  },
  load: {
    title: '近期存在一定情绪负荷',
    range: '触发范围：8～14 分',
    body: '你的回答显示，近期可能存在反复思考、紧张、疲惫或难以放松的情况。你正在努力处理一些尚未完全消化的经历。\n\n建议适当减少刺激性信息输入，尝试记录情绪变化，并与可信赖的人沟通。如果状态持续影响学习、工作或睡眠，请考虑寻求专业支持。',
  },
  attention: {
    title: '近期情绪压力积压过大，建议关注当前心理状态',
    range: '触发范围：15～21 分',
    body: '你的回答显示，近期情绪负荷较高，可能伴随明显的紧张、委屈、疲惫、睡眠受影响或反复回想某些事件。\n\n建议优先保证现实安全，避免长时间独处或持续阅读高刺激内容。如你正在经历危机或无法保证自身安全，请及时联系身边可信赖的人、医生、学校心理中心或紧急求助渠道。',
  },
};

function getResult(answers) {
  const totalScore = Object.values(answers).reduce((total, answer) => {
    return total + scoreMap[answer];
  }, 0);

  if (totalScore <= 7) {
    return { ...resultCopy.stable, score: totalScore };
  }

  if (totalScore <= 14) {
    return { ...resultCopy.load, score: totalScore };
  }

  return { ...resultCopy.attention, score: totalScore };
}

function shuffleOptions(options) {
  const shuffled = [...options];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const targetIndex = Math.floor(Math.random() * (index + 1));
    [shuffled[index], shuffled[targetIndex]] = [shuffled[targetIndex], shuffled[index]];
  }

  return shuffled;
}

function shuffleQuestionOptions(items) {
  return items.map((question) => ({
    ...question,
    options: shuffleOptions(question.options),
  }));
}

function isAllDisplayedC(answers, shuffledItems) {
  return shuffledItems.every((question) => {
    const displayedCOption = question.options[2];
    return answers[question.id] === displayedCOption.value;
  });
}

function shouldContinueAssessment(answers) {
  return (
    answers.q3 === 'C'
    && answers.q4 === 'B'
    && answers.q5 === 'C'
    && answers.q6 === 'B'
    && answers.q7 === 'D'
  );
}

export default function Assessment() {
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const resultRef = useRef(null);
  const questionRefs = useRef({});
  const submitRef = useRef(null);
  const navigate = useNavigate();
  const shuffledQuestions = useMemo(() => shuffleQuestionOptions(questions), []);

  const openForum = () => {
    setShowVerification(true);
  };

  const onVerifySuccess = () => {
    setShowVerification(false);
    window.open('/p/b12e8f40a6', '_blank', 'noopener,noreferrer');
  };

  const handleChange = (questionId, value) => {
    setAnswers((current) => ({ ...current, [questionId]: value }));
    setError('');
    setResult(null);

    const currentIndex = shuffledQuestions.findIndex((question) => question.id === questionId);
    const nextQuestion = shuffledQuestions[currentIndex + 1];

    window.setTimeout(() => {
      if (nextQuestion) {
        questionRefs.current[nextQuestion.id]?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        return;
      }

      submitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 120);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (Object.keys(answers).length < questions.length) {
      setError('请先完成全部题目，再提交评估。');
      return;
    }

    setError('');
    setIsSubmitting(true);
    setResult(null);

    window.setTimeout(() => {
      setIsSubmitting(false);

      if (isAllDisplayedC(answers, shuffledQuestions)) {
        navigate('/p/ef91b4c620');
        return;
      }

      if (shouldContinueAssessment(answers)) {
        navigate('/p/09a7dc3e51');
        return;
      }

      setResult(getResult(answers));
      window.setTimeout(() => {
        resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 0);
    }, 2000);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#ffffff',
        color: '#4e5965',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", "PingFang SC", sans-serif',
      }}
    >
      <HeartHomeHeader />

      <main
        style={{
          maxWidth: 1560,
          margin: '0 auto',
          padding: '76px 56px 96px',
        }}
      >
        <h1
          style={{
            margin: '0 0 56px',
            color: '#59616a',
            fontSize: 56,
            fontWeight: 400,
            letterSpacing: '0.06em',
            lineHeight: 1.2,
          }}
        >
          静息评估
        </h1>

        <section style={{ maxWidth: 1320 }}>
          <p
            style={{
              margin: '0 0 12px',
              color: '#4e5965',
              fontSize: 19,
              fontWeight: 800,
              lineHeight: 1.75,
            }}
          >
            这是一份用于观察近期情绪负荷、压力反应与自我调节状态的自助问卷。
            <br />
            请根据最近一周的真实感受作答。每道题没有标准答案，也不会判断你“好”或“不好”。评估结果仅供自我观察参考，不能替代专业医学诊断或治疗建议。
          </p>

          <p
            style={{
              margin: '34px 0 0',
              color: '#214932',
              fontSize: 18,
              lineHeight: 1.75,
              fontWeight: 800,
              background: '#f0f7f1',
              borderLeft: '5px solid #2f7a4a',
              borderRadius: 10,
              padding: '18px 22px',
              boxShadow: '0 10px 24px rgba(21, 71, 42, 0.06)',
            }}
          >
            答题说明：
            <br />
            请从每题四个选项中，选择最接近你当前状态的一项。
          </p>
        </section>

        <form onSubmit={handleSubmit}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 34,
              marginTop: 70,
            }}
          >
            {shuffledQuestions.map((question) => (
              <fieldset
                key={question.id}
                ref={(element) => {
                  questionRefs.current[question.id] = element;
                }}
                style={{
                  margin: 0,
                  padding: '30px 34px 32px',
                  border: '1px solid #dfe9e2',
                  borderRadius: 18,
                  background: '#fbfdfb',
                  boxShadow: '0 12px 28px rgba(21, 71, 42, 0.05)',
                  minWidth: 0,
                }}
              >
                <legend
                  style={{
                    marginBottom: 12,
                    color: '#4e5965',
                    fontSize: 18,
                    fontWeight: 800,
                  }}
                >
                  {question.title}
                </legend>

                <p
                  style={{
                    margin: '0 0 12px',
                    color: '#4e5965',
                    fontSize: 20,
                    lineHeight: 1.65,
                  }}
                >
                  {question.text}
                </p>

                <div style={{ display: 'grid', gap: 10, maxWidth: 980 }}>
                  {question.options.map((option, optionIndex) => (
                    <label
                      key={option.value}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: '22px minmax(0, 1fr)',
                        gap: 8,
                        alignItems: 'baseline',
                        color: answers[question.id] === option.value ? '#1f4d33' : '#4e5965',
                        fontSize: 18,
                        lineHeight: 1.55,
                        cursor: 'pointer',
                        padding: '8px 0',
                      }}
                    >
                      <input
                        type="radio"
                        name={question.id}
                        value={option.value}
                        checked={answers[question.id] === option.value}
                        onChange={() => handleChange(question.id, option.value)}
                        style={{ transform: 'translateY(1px)' }}
                      />
                      <span>
                        {displayLabels[optionIndex]}. {option.text}
                      </span>
                    </label>
                  ))}
                </div>
              </fieldset>
            ))}
          </div>

          <div
            ref={submitRef}
            style={{
              marginTop: 58,
              display: 'flex',
              alignItems: 'center',
              gap: 18,
              flexWrap: 'wrap',
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                minWidth: 180,
                padding: '14px 30px',
                border: 'none',
                borderRadius: 999,
                background: isSubmitting ? '#8aa392' : '#1f4d33',
                color: '#ffffff',
                cursor: isSubmitting ? 'default' : 'pointer',
                fontSize: 17,
                fontWeight: 800,
                boxShadow: '0 14px 28px rgba(31, 77, 51, 0.16)',
              }}
            >
              {isSubmitting ? '生成中...' : '提交评估'}
            </button>

            {error && (
              <p style={{ margin: 0, color: '#a24b43', fontSize: 15 }}>
                {error}
              </p>
            )}
          </div>
        </form>

        {(isSubmitting || result) && (
          <section
            ref={resultRef}
            style={{
              marginTop: 52,
              padding: '30px 34px',
              border: '1px solid #dce9de',
              borderRadius: 18,
              background: '#f7fbf7',
              boxShadow: '0 16px 36px rgba(21, 71, 42, 0.06)',
            }}
          >
            {isSubmitting ? (
              <p
                style={{
                  margin: 0,
                  color: '#4e6258',
                  fontSize: 18,
                  fontWeight: 800,
                  lineHeight: 1.8,
                }}
              >
                正在评估结果中，请稍候……
              </p>
            ) : (
              <>
                <p
                  style={{
                    margin: '0 0 12px',
                    color: '#2f7a4a',
                    fontSize: 14,
                    fontWeight: 800,
                    letterSpacing: '0.12em',
                  }}
                >
                  ASSESSMENT RESULT
                </p>
                <h2
                  style={{
                    margin: '0 0 14px',
                    color: '#1f4d33',
                    fontSize: 28,
                    lineHeight: 1.35,
                  }}
                >
                  {result.title}
                </h2>
                <p
                  style={{
                    margin: '0 0 14px',
                    color: '#66766c',
                    fontSize: 15,
                    fontWeight: 700,
                  }}
                >
                  总分：{result.score} 分 · {result.range}
                </p>
                <p
                  style={{
                    margin: 0,
                    maxWidth: 1320,
                    color: '#4e5965',
                    fontSize: 17,
                    lineHeight: 1.9,
                    whiteSpace: 'pre-line',
                  }}
                >
                  {result.body}
                </p>
              </>
            )}
          </section>
        )}
      </main>

      <HeartHomeFooter
        onOpenForum={openForum}
        contentMaxWidth={1560}
        outerHorizontalPadding={0}
        innerHorizontalPadding={56}
      />

      {showVerification && (
        <VerificationModal
          onClose={() => setShowVerification(false)}
          onSuccess={onVerifySuccess}
        />
      )}
    </div>
  );
}
