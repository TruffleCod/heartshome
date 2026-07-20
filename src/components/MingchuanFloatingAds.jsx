import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { MINGCHUAN_ADS } from '../data/mingchuanAds';
import { publicPath } from '../utils/publicPath';

const PAPER = '#ffffff';
const ORDINARY_NOT_FOUND_PATH = '/404-page-not-found';
const GHOST_CACHE_PATH = '/p/e08c72fa9d';
const UNIFORM_AD_WIDTH = 990;
const UNIFORM_AD_HEIGHT = 680;
const UNIFORM_AD_SCALE = 0.7;

function pickRandomAd() {
  return MINGCHUAN_ADS[Math.floor(Math.random() * MINGCHUAN_ADS.length)];
}

function getAdById(adId) {
  return MINGCHUAN_ADS.find((item) => item.id === adId) || pickRandomAd();
}

function baseCardStyle(width, height, background = PAPER) {
  return {
    position: 'absolute',
    right: 28,
    bottom: 28,
    width: `min(${width}px, calc(100vw - 56px))`,
    height,
    pointerEvents: 'auto',
    background,
    border: '1px solid #d0d0d0',
    boxShadow: 'none',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };
}

function uniformAdCardStyle(background = PAPER, placement = 'right') {
  return {
    ...baseCardStyle(UNIFORM_AD_WIDTH, UNIFORM_AD_HEIGHT, background),
    right: placement === 'right' ? 18 : 'auto',
    left: placement === 'left' ? 18 : 'auto',
    bottom: 18,
    transform: `scale(${UNIFORM_AD_SCALE})`,
    transformOrigin: placement === 'left' ? 'left bottom' : 'right bottom',
  };
}

function QuizAd({ close, onComplete, placement }) {
  const questions = [
    {
      id: 'one-plus-one',
      title: '1. “一加一”的谜底是？',
      options: [
        ['a', '王'],
        ['b', '田'],
        ['c', '丰'],
        ['d', '主'],
      ],
      answer: 'a',
    },
    {
      id: 'gatekeeper',
      title: '2. “守门员”的谜底是？',
      options: [
        ['a', '闲'],
        ['b', '问'],
        ['c', '闪'],
        ['d', '闭'],
      ],
      answer: 'c',
    },
    {
      id: 'heart-autumn',
      title: '3. “心上秋”的谜底是？',
      options: [
        ['a', '愁'],
        ['b', '恩'],
        ['c', '想'],
        ['d', '忐'],
      ],
      answer: 'a',
    },
  ];
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');

  const submit = (event) => {
    event.preventDefault();
    if (questions.some((question) => !answers[question.id])) {
      setMessage('请先答完三题。');
      return;
    }

    if (!questions.every((question) => answers[question.id] === question.answer)) {
      setMessage('答案不正确');
      return;
    }

    setMessage('恭喜！三题全对，正在进入抽奖名单……');
    onComplete();
  };

  return (
    <aside
      style={{
        ...uniformAdCardStyle('#140014', placement),
        border: '4px solid #ffcf35',
        boxShadow: '0 0 0 2px #790000, 0 0 0 5px rgba(255, 174, 0, 0.38) inset',
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="关闭广告"
        style={{
          position: 'absolute',
          top: 9,
          right: 9,
          width: 36,
          height: 36,
          border: '3px solid #111',
          background: '#f6f0d5',
          color: '#111',
          cursor: 'pointer',
          fontSize: 24,
          lineHeight: '22px',
          fontWeight: 900,
          zIndex: 6,
        }}
      >
        ×
      </button>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${publicPath('/images/news/puzzle.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: 55,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(90deg, #4e006b, #9b0ab5 48%, #4e006b)',
          color: '#ffea49',
          fontSize: 27,
          fontWeight: 900,
          letterSpacing: '0.08em',
          textShadow: '0 3px 0 #4b001f, 0 0 8px rgba(255,255,255,0.55)',
          borderBottom: '3px solid #ffcf35',
        }}
      >
        每日答题抽奖 - 答对就有机会赢取大奖！
      </div>

      <form onSubmit={submit} style={{ position: 'relative', zIndex: 2, padding: '14px 28px 22px' }}>
        <h3
          style={{
            margin: 0,
            textAlign: 'center',
            color: '#ffd84a',
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '0.08em',
            WebkitTextStroke: '2px #9f4900',
            textShadow: '0 4px 0 #ff9c00, 0 8px 0 #611200, 0 0 12px rgba(255,255,255,0.45)',
          }}
        >
          每日答题抽奖
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '400px minmax(0, 1fr)', gap: 28, marginTop: 52 }}>
          <section
            style={{
              borderRadius: 16,
              border: '5px solid #ffdf5b',
              background: 'linear-gradient(#8f00a9, #5a0076)',
              padding: 13,
              boxShadow: 'inset 0 0 0 4px #ff9b00, 0 10px 20px rgba(0,0,0,0.28)',
            }}
          >
            <div
              style={{
                color: '#fff',
                fontSize: 29,
                fontWeight: 900,
                textAlign: 'center',
                textShadow: '0 3px 0 #1d001d',
                marginBottom: 12,
              }}
            >
              离合体字谜说明
            </div>
            <div
              style={{
                minHeight: 244,
                borderRadius: 10,
                background: 'linear-gradient(#fff3c6, #ffd773)',
                color: '#161616',
                padding: '22px 30px',
                fontSize: 28,
                lineHeight: 1.55,
                fontWeight: 900,
                boxShadow: 'inset 0 0 0 2px #fff8cf',
              }}
            >
              离合体是一种拆字谜：把汉字拆开、拼合，或增减偏旁笔画，重新组合后猜出另一个字。
            </div>
            <div
              style={{
                marginTop: 13,
                borderRadius: 10,
                background: 'linear-gradient(#a000be, #65007f)',
                color: '#fff45f',
                height: 60,
                display: 'grid',
                placeItems: 'center',
                fontSize: 28,
                fontWeight: 900,
                textShadow: '0 3px 0 #2a001e',
              }}
            >
              答对三题即可参与抽奖！
            </div>
          </section>

          <section>
            <div
              style={{
                borderRadius: 14,
                border: '4px solid #ffdf5b',
                background: 'linear-gradient(#fffdf2, #fff0c8)',
                padding: '17px 26px',
                boxShadow: 'inset 0 0 0 2px #fff9cb, 0 8px 18px rgba(0,0,0,0.24)',
              }}
            >
              {questions.map((question, questionIndex) => (
                <fieldset
                  key={question.id}
                  style={{
                    border: 0,
                    borderBottom: questionIndex === questions.length - 1 ? 0 : '2px dashed #d7b784',
                    margin: 0,
                    padding: questionIndex === questions.length - 1 ? '0 0 2px' : '0 0 15px',
                  }}
                >
                  <legend
                    style={{
                      marginBottom: 10,
                      color: '#202794',
                      fontSize: 25,
                      lineHeight: 1.2,
                      fontWeight: 900,
                    }}
                  >
                    {question.title}
                  </legend>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10 }}>
                    {question.options.map(([value, label]) => (
                      <label
                        key={value}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 7,
                          color: '#222',
                          fontSize: 23,
                          lineHeight: 1,
                          fontWeight: 800,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        <input
                          type="radio"
                          name={`quiz-ad-${question.id}`}
                          value={value}
                          checked={answers[question.id] === value}
                          onChange={() => {
                            setAnswers((current) => ({ ...current, [question.id]: value }));
                            setMessage('');
                          }}
                          style={{ width: 20, height: 20, accentColor: '#1d2388' }}
                        />
                        {value.toUpperCase()}. {label}
                      </label>
                    ))}
                  </div>
                </fieldset>
              ))}
            </div>

            <button
              type="submit"
              style={{
                display: 'block',
                width: 430,
                height: 90,
                margin: '26px auto 0',
                border: '5px solid #ffdf5b',
                borderRadius: 14,
                background: 'linear-gradient(#ff2b20, #a60000)',
                color: '#fff',
                cursor: 'pointer',
                fontSize: 46,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '0.12em',
                WebkitTextStroke: '1px #4d0000',
                textShadow: '0 3px 0 #111, 0 0 8px rgba(255,255,255,0.45)',
                boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.24), 0 6px 0 #5f0000',
              }}
            >
              · 提交答案 ·
            </button>
            {message ? (
              <p
                style={{
                  margin: '14px 0 0',
                  color: '#fff45f',
                  fontSize: 20,
                  lineHeight: 1.2,
                  fontWeight: 900,
                  textAlign: 'center',
                  textShadow: '0 2px 0 #5a0000',
                }}
              >
                {message}
              </p>
            ) : null}
          </section>
        </div>
      </form>
    </aside>
  );
}

function FortuneAd({ close, placement }) {
  const hiddenNames = ['李宏宇', '叶诗遥', '王静', '刘欣怡', '张婷', '赵兰子'];
  const fortuneResults = [
    {
      key: 'lucky',
      title: '大吉',
      shortTitle: '大吉',
      emoji: '⭐',
      color: '#a70f0f',
      luckyColor: '红色',
      number: 9,
      text: ['云开见日，所求皆顺。'],
      explain: ['好运正旺，诸事可期，宜把握时机，顺势而行。'],
      good: '行动、见面、推进计划',
      bad: '犹豫、拖延、错失良机',
    },
    {
      key: 'middle',
      title: '中平',
      shortTitle: '中平',
      emoji: '😐',
      color: '#6c2a85',
      luckyColor: '紫色',
      number: 8,
      text: ['事缓则圆，心定则明。'],
      explain: ['眼前吉凶参半，不宜急进，静候时机。'],
      good: '静思、等待、整理旧事',
      bad: '冲动、争执、仓促决定',
    },
    {
      key: 'small-bad',
      title: '小凶',
      shortTitle: '小凶',
      emoji: '☹️',
      color: '#12346c',
      luckyColor: '灰蓝',
      number: 2,
      text: ['风急浪高，宜缓不宜争。'],
      explain: ['眼前多扰，情势未稳，不宜冒进，先守后动。'],
      good: '谨慎、复查、减少冲突',
      bad: '逞强、冲动、仓促决定',
    },
  ];
  const hiddenFortune = {
    key: 'hidden-bad',
    title: '大凶',
    shortTitle: '大凶',
    emoji: '☁',
    color: '#7a0b0b',
    luckyColor: '黑色',
    number: 32,
    text: ['花开无结果，谋事两头空。', '若问前程路，只在梦魇中。'],
    explain: ['运势极弱，万事难成，宜守不宜进，静待时运。'],
    good: '收敛、静思、避险、安身',
    bad: '冲动、妄动、投资、远行',
  };
  const [name, setName] = useState('');
  const [fortune, setFortune] = useState(null);
  const [message, setMessage] = useState('');

  const drawFortune = (event) => {
    event.preventDefault();
    const normalizedName = name.trim();

    if (!normalizedName) {
      setMessage('请输入姓名后再抽取今日运势。');
      return;
    }

    if (!/^[\u4e00-\u9fff]{2,5}$/.test(normalizedName) && !/^[\u4e00-\u9fff]{1,4}[·•][\u4e00-\u9fff]{1,6}$/.test(normalizedName)) {
      setMessage('请输入合法姓名。');
      return;
    }

    if (hiddenNames.includes(normalizedName)) {
      setFortune(hiddenFortune);
      setMessage('');
      return;
    }

    setFortune(fortuneResults[Math.floor(Math.random() * fortuneResults.length)]);
    setMessage('');
  };

  const downloadFortune = () => {
    if (!fortune) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 850;
    const context = canvas.getContext('2d');

    context.fillStyle = '#f6dfaa';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.strokeStyle = '#9b4c16';
    context.lineWidth = 18;
    context.strokeRect(34, 34, canvas.width - 68, canvas.height - 68);
    context.strokeStyle = '#d29a45';
    context.lineWidth = 5;
    context.strokeRect(62, 62, canvas.width - 124, canvas.height - 124);

    context.fillStyle = '#8b0000';
    context.font = '900 54px Microsoft YaHei, SimHei, sans-serif';
    context.textAlign = 'center';
    context.fillText('签文结果', canvas.width / 2, 132);

    context.fillStyle = fortune.color;
    context.font = '900 92px Microsoft YaHei, SimHei, sans-serif';
    context.fillText(fortune.title, canvas.width / 2, 245);

    context.fillStyle = '#2b1607';
    context.font = '900 42px Microsoft YaHei, SimHei, sans-serif';
    context.textAlign = 'left';
    const lines = [
      `姓名：${name.trim()}`,
      `签文：${fortune.text.join(' ')}`,
      `解签：${fortune.explain.join(' ')}`,
      `宜：${fortune.good}`,
      `忌：${fortune.bad}`,
      `今日幸运色：${fortune.luckyColor}`,
      `今日幸运数字：${fortune.number}`,
    ];
    lines.forEach((line, index) => {
      context.fillText(line, 120, 350 + index * 64);
    });

    const link = document.createElement('a');
    link.download = `今日运势-${name.trim()}-${fortune.title}.jpg`;
    link.href = canvas.toDataURL('image/jpeg', 0.92);
    link.click();
  };

  const renderCrystalBall = (size = 286) => (
    <div
      aria-hidden="true"
      style={{
        width: size,
        height: size,
        margin: '0 auto',
        backgroundImage: `url(${publicPath('/images/news/fortune-crystal-ball.png')})`,
        backgroundSize: 'contain',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        filter: 'drop-shadow(0 16px 13px rgba(0,0,0,0.45)) drop-shadow(0 0 12px rgba(255,222,66,0.45))',
      }}
    />
  );

  return (
    <aside
      style={{
        ...uniformAdCardStyle('#9a0000', placement),
        border: '4px solid #ffcb39',
        boxShadow: '0 0 0 2px #7d0000, 0 0 0 5px #ff9b00 inset',
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="关闭广告"
        style={{
          position: 'absolute',
          top: 9,
          right: 9,
          width: 38,
          height: 38,
          border: '3px solid #111',
          background: '#ddd',
          color: '#111',
          cursor: 'pointer',
          fontSize: 27,
          lineHeight: '24px',
          fontWeight: 900,
          zIndex: 6,
        }}
      >
        ×
      </button>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 12% 16%, rgba(255,255,255,0.9) 0 2px, transparent 3px), radial-gradient(circle at 84% 24%, rgba(255,255,255,0.85) 0 2px, transparent 3px), radial-gradient(circle at 50% 50%, rgba(255,190,0,0.25), transparent 40%), linear-gradient(135deg, #df0000 0%, #620026 48%, #001549 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          height: 54,
          display: 'grid',
          placeItems: 'center',
          background: 'linear-gradient(90deg, #39005b, #7b009a 48%, #39005b)',
          color: '#ffea49',
          fontSize: 28,
          fontWeight: 900,
          letterSpacing: '0.12em',
          textShadow: '0 3px 0 #3a001d',
          borderBottom: '3px solid #ffcf35',
        }}
      >
        每日一签，好运相随，抽取今日运势，掌握先机！
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: '12px 26px 0' }}>
        <h3
          style={{
            margin: 0,
            textAlign: 'center',
            color: '#ffe15c',
            fontSize: 66,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '0.08em',
            WebkitTextStroke: '2px #9b3100',
            textShadow: '0 4px 0 #ff8a00, 0 8px 0 #5a1100, 0 0 14px rgba(255,255,255,0.65)',
          }}
        >
          抽取今日运势
        </h3>

        {fortune ? (
          <div style={{ position: 'relative', display: 'grid', gridTemplateColumns: '580px minmax(0, 1fr)', gap: 26, marginTop: 14 }}>
            <section
              style={{
                height: 480,
                padding: '20px 34px',
                background: 'linear-gradient(#fff3ce, #f2d49a)',
                border: '6px solid #c47a19',
                borderRadius: 8,
                color: '#2b1607',
                boxShadow: 'inset 0 0 0 3px #fff7d6, 0 7px 0 #713200',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  width: 230,
                  height: 50,
                  margin: '0 auto 16px',
                  display: 'grid',
                  placeItems: 'center',
                  borderRadius: 10,
                  background: 'linear-gradient(#a90000, #610000)',
                  border: '4px solid #d69a35',
                  color: '#fff1a0',
                  fontSize: 28,
                  fontWeight: 900,
                  textShadow: '0 3px 0 #2b0000',
                }}
              >
                签文结果
              </div>
              <h4
                style={{
                  margin: '0 auto',
                  color: fortune.color,
                  fontSize: 52,
                  lineHeight: 1.1,
                  fontWeight: 900,
                  textAlign: 'center',
                }}
              >
                {fortune.title}
              </h4>
              <div style={{ marginTop: 13, borderTop: '2px solid #b98042' }}>
                {[
                  ['签文', fortune.text],
                  ['解曰', fortune.explain],
                  ['宜', [fortune.good]],
                  ['忌', [fortune.bad]],
                ].map(([label, lines]) => (
                  <div
                    key={label}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '88px 1fr',
                      gap: 10,
                      padding: '9px 0',
                      borderBottom: '2px solid #b98042',
                      fontSize: 24,
                      lineHeight: 1.36,
                      fontWeight: 900,
                    }}
                  >
                    <span>{label}：</span>
                    <span>{lines.join(' ')}</span>
                  </div>
                ))}
              </div>
            </section>

            <section style={{ position: 'relative', height: 480 }}>
              <div style={{ position: 'absolute', left: '50%', top: -8, transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none' }}>
                {renderCrystalBall(258)}
              </div>
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 2,
                  border: '5px solid #d69a35',
                  borderRadius: 12,
                  overflow: 'hidden',
                  background: '#fff0cf',
                  boxShadow: '0 7px 0 #5e1900',
                }}
              >
                <div
                  style={{
                    height: 54,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(#6b007f, #35004f)',
                    color: '#fff15f',
                    fontSize: 29,
                    fontWeight: 900,
                    textShadow: '0 3px 0 #19001f',
                  }}
                >
                  今日运势结果
                </div>
                <div style={{ padding: '13px 24px', color: '#801414', fontSize: 36, fontWeight: 900, textAlign: 'center' }}>
                  {fortune.shortTitle} <span style={{ fontSize: 42 }}>{fortune.emoji}</span>
                </div>
                <div
                  style={{
                    borderTop: '2px solid #8a4b1b',
                    padding: '10px 24px 12px',
                    color: '#7b1414',
                    fontSize: 23,
                    lineHeight: 1.55,
                    fontWeight: 900,
                  }}
                >
                  <div>
                    今日幸运色：<strong style={{ color: fortune.color }}>{fortune.luckyColor}</strong>
                  </div>
                  <div>
                    今日幸运数字：<strong style={{ color: '#1f2b88' }}>{fortune.number}</strong>
                  </div>
                </div>
              </div>
            </section>
            <button
              type="button"
              onClick={downloadFortune}
              style={{
                position: 'absolute',
                left: '50%',
                bottom: -10,
                zIndex: 5,
                transform: 'translateX(-50%)',
                display: 'block',
                width: 240,
                height: 54,
                border: '4px solid #f0b83a',
                borderRadius: '20px 8px 20px 8px',
                background: 'linear-gradient(#5f006f 0%, #9a006a 48%, #4d004d 100%)',
                color: '#ffe95a',
                cursor: 'pointer',
                fontSize: 28,
                fontWeight: 900,
                textShadow: '0 3px 0 #2a001d, 0 0 8px rgba(255,255,255,0.35)',
                boxShadow: '0 5px 0 #4d1600, inset 0 0 0 2px rgba(255,255,255,0.2), inset 0 0 14px rgba(255,207,63,0.28)',
                clipPath: 'polygon(8% 0, 92% 0, 100% 50%, 92% 100%, 8% 100%, 0 50%)',
              }}
            >
              收下签文
            </button>
          </div>
        ) : (
          <form onSubmit={drawFortune} style={{ display: 'grid', gridTemplateColumns: '268px 300px minmax(0, 1fr)', gap: 18, marginTop: 24 }}>
            <section
              style={{
                position: 'relative',
                height: 446,
                border: '4px solid #d69a35',
                borderRadius: 8,
                background:
                  'radial-gradient(circle at 20% 22%, rgba(255,255,255,0.12) 0 2px, transparent 3px), radial-gradient(circle at 82% 82%, rgba(255,203,57,0.16), transparent 34%), linear-gradient(#6a007c, #26003d)',
                color: '#fff',
                padding: '22px 24px',
                boxShadow: 'inset 0 0 0 3px #8b1aa2, inset 0 0 32px rgba(255,195,53,0.18)',
                boxSizing: 'border-box',
              }}
            >
              {['✦', '✦', '✦', '✦'].map((mark, index) => (
                <span
                  key={mark}
                  style={{
                    position: 'absolute',
                    left: index === 0 || index === 2 ? 10 : 'auto',
                    right: index === 1 || index === 3 ? 10 : 'auto',
                    top: index < 2 ? 8 : 'auto',
                    bottom: index > 1 ? 8 : 'auto',
                    color: '#d69a35',
                    fontSize: 36,
                    lineHeight: 1,
                    fontWeight: 900,
                  }}
                >
                  {mark}
                </span>
              ))}
              <div
                style={{
                  height: 24,
                  margin: '0 36px 18px',
                  borderTop: '3px solid #d69a35',
                  borderBottom: '3px solid #d69a35',
                  color: '#d69a35',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 18,
                  lineHeight: 1,
                }}
              >
                ◇◇
              </div>
              <h4 style={{ margin: 0, color: '#fff15f', fontSize: 32, lineHeight: 1.2, fontWeight: 900, textAlign: 'center', whiteSpace: 'nowrap' }}>
                请输入您的姓名
              </h4>
              <p style={{ margin: '22px 0 22px', fontSize: 19, lineHeight: 1.2, fontWeight: 900, textAlign: 'center', whiteSpace: 'nowrap' }}>
                即可抽取今日运势
              </p>
              <input
                type="text"
                value={name}
                onChange={(event) => {
                  setName(event.target.value);
                  setMessage('');
                }}
                style={{
                  boxSizing: 'border-box',
                  width: '100%',
                  height: 58,
                  border: '4px solid #d69a35',
                  background: '#fff',
                  color: '#111',
                  fontSize: 24,
                  fontWeight: 900,
                  padding: '0 12px',
                  outline: 'none',
                }}
              />
              <div
                style={{
                  height: 28,
                  margin: '24px 12px 20px',
                  borderTop: '3px solid #d69a35',
                  borderBottom: '3px solid #d69a35',
                  color: '#d69a35',
                  display: 'grid',
                  placeItems: 'center',
                  fontSize: 16,
                  lineHeight: 1,
                }}
              >
                ✦◇✦
              </div>
              <p style={{ margin: 0, color: '#fff15f', fontSize: 20, fontWeight: 900, textAlign: 'center', whiteSpace: 'nowrap' }}>
                ☁ 每日一签，仅供娱乐 ☁
              </p>
              {message ? (
                <p style={{ margin: '14px 0 0', color: '#ffdf66', fontSize: 17, lineHeight: 1.2, fontWeight: 900, textAlign: 'center' }}>
                  {message}
                </p>
              ) : null}
            </section>

            <section style={{ position: 'relative', height: 446 }}>
              <div style={{ position: 'absolute', left: '50%', top: -28, transform: 'translateX(-50%)', zIndex: 0, pointerEvents: 'none' }}>
                {renderCrystalBall(450)}
              </div>
              <button
                type="submit"
                style={{
                  position: 'absolute',
                  left: '50%',
                  bottom: 0,
                  zIndex: 1,
                  display: 'block',
                  width: 322,
                  height: 120,
                  margin: 0,
                  transform: 'translateX(-50%)',
                  border: '5px solid #ffdf56',
                  borderRadius: 999,
                  background: 'linear-gradient(#ff372a, #b50000 55%, #810000)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 43,
                  lineHeight: 1.1,
                  fontWeight: 900,
                  WebkitTextStroke: '1px #4d0000',
                  textShadow: '0 3px 0 #111, 0 0 9px rgba(255,255,255,0.5)',
                  boxShadow: 'inset 0 0 0 4px rgba(255,255,255,0.22), 0 6px 0 #5e0000, 0 0 14px rgba(255,210,72,0.45)',
                }}
              >
                点击抽取
                <br />
                今日运势
              </button>
            </section>

            <section>
              <div
                style={{
                  border: '4px solid #d69a35',
                  borderRadius: 8,
                  overflow: 'hidden',
                  background: '#fff0cf',
                  boxShadow: '0 6px 0 #5e1900',
                }}
              >
                <div
                  style={{
                    height: 58,
                    display: 'grid',
                    placeItems: 'center',
                    background: 'linear-gradient(#6b007f, #35004f)',
                    color: '#fff15f',
                    fontSize: 28,
                    fontWeight: 900,
                  }}
                >
                  今日运势结果
                </div>
                {fortuneResults.map((item) => (
                  <div
                    key={item.key}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: '76px 62px minmax(0, 1fr)',
                      alignItems: 'center',
                      gap: 6,
                      height: 78,
                      padding: '0 12px',
                      borderTop: '2px solid #8a4b1b',
                      color: item.color,
                      fontSize: 34,
                      fontWeight: 900,
                      background: '#fff8e7',
                    }}
                  >
                    <span style={{ whiteSpace: 'nowrap' }}>{item.shortTitle}</span>
                    <span
                      style={{
                        position: 'relative',
                        width: 52,
                        height: 52,
                        borderRadius: item.key === 'lucky' ? 0 : '50%',
                        display: item.key === 'lucky' ? 'block' : 'grid',
                        placeItems: item.key === 'lucky' ? undefined : 'center',
                        justifySelf: 'start',
                        color: item.key === 'lucky' ? '#9a2b00' : 'transparent',
                        background:
                          item.key === 'lucky'
                            ? 'linear-gradient(#fff16c, #f5b322 62%, #d47c00)'
                            : item.key === 'middle'
                              ? 'linear-gradient(#ffe0c9, #f1a98c)'
                              : 'linear-gradient(#a9d5ff, #6396db)',
                        clipPath:
                          item.key === 'lucky'
                            ? 'polygon(50% 4%, 61% 36%, 95% 36%, 68% 56%, 79% 90%, 50% 69%, 21% 90%, 32% 56%, 5% 36%, 39% 36%)'
                            : undefined,
                        border: item.key === 'lucky' ? '2px solid #9d5200' : '2px solid rgba(0,0,0,0.25)',
                        fontSize: item.key === 'lucky' ? 0 : 26,
                        lineHeight: 1,
                        fontWeight: 900,
                        boxShadow:
                          item.key === 'lucky'
                            ? 'inset 0 2px 4px rgba(255,255,255,0.8), 0 2px 0 #7c3f00'
                            : 'inset 0 2px 5px rgba(255,255,255,0.85), 0 2px 0 rgba(0,0,0,0.2)',
                      }}
                    >
                      {item.key !== 'lucky' ? (
                        <>
                          <span
                            style={{
                              position: 'absolute',
                              left: 14,
                              top: 16,
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: item.key === 'middle' ? '#5f564d' : '#173b70',
                            }}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              right: 14,
                              top: 16,
                              width: 5,
                              height: 5,
                              borderRadius: '50%',
                              background: item.key === 'middle' ? '#5f564d' : '#173b70',
                            }}
                          />
                          <span
                            style={{
                              position: 'absolute',
                              left: item.key === 'middle' ? 18 : 17,
                              top: item.key === 'middle' ? 30 : 27,
                              width: item.key === 'middle' ? 16 : 18,
                              height: item.key === 'middle' ? 2 : 11,
                              borderTop: item.key === 'middle' ? 0 : '3px solid #173b70',
                              borderRadius: item.key === 'middle' ? 0 : '50% 50% 0 0',
                              background: item.key === 'middle' ? '#5f564d' : 'transparent',
                            }}
                          />
                        </>
                      ) : null}
                    </span>
                    <span style={{ color: '#333', fontSize: 15, lineHeight: 1.15, fontWeight: 900, whiteSpace: 'nowrap' }}>
                      {item.key === 'lucky'
                        ? '万事如意，好运连连！'
                        : item.key === 'middle'
                          ? '平稳发展，守成方佳。'
                          : '谨慎行事，避免冲动。'}
                    </span>
                  </div>
                ))}
              </div>
              <div
                style={{
                  height: 132,
                  marginTop: 12,
                  border: '4px solid #d69a35',
                  borderRadius: 8,
                  background: '#ffe29f',
                  color: '#8b1b12',
                  padding: '18px 20px',
                  boxSizing: 'border-box',
                  fontSize: 25,
                  lineHeight: 1.55,
                  fontWeight: 900,
                  boxShadow: 'inset 0 0 0 2px #fff4be',
                }}
              >
                <div>今日幸运色：紫色</div>
                <div>今日幸运数字：</div>
              </div>
            </section>
          </form>
        )}
      </div>

      <div
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 2,
          height: 38,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 44px',
          background: 'linear-gradient(90deg, #3b004f, #5b006e, #3b004f)',
          color: '#fff',
          fontSize: 20,
          fontWeight: 900,
          boxSizing: 'border-box',
        }}
      >
        <span style={{ color: '#fff15f' }}>已有 1358842 人抽取今日运势</span>
        <span>· 本活动最终解释权归本站所有</span>
      </div>
    </aside>
  );
}

function DatingAd({ close, onComplete, placement }) {
  const [message, setMessage] = useState('');
  const profiles = [
    { name: '小雨点', age: 23, height: '162cm', job: '文员', image: '/images/news/dating-profile-1.jpg', position: 'center 26%' },
    { name: '可可', age: 25, height: '165cm', job: '教师', image: '/images/news/dating-profile-2.jpg', position: 'center 24%' },
    { name: '阳光MM', age: 24, height: '158cm', job: '客服', image: '/images/news/dating-profile-3.jpg', position: 'center 22%' },
    { name: '雪儿', age: 22, height: '160cm', job: '学生', image: '/images/news/dating-profile-4.jpg', position: 'center 24%' },
  ];

  const enterDatingSite = (label) => {
    setMessage(`${label}成功，正在为你匹配附近在线用户……`);
    onComplete();
  };

  return (
    <aside
      style={{
        ...uniformAdCardStyle('#ff4aa0', placement),
        border: '3px solid #ff84c4',
        boxShadow: '0 0 0 2px #b80056',
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="关闭广告"
        style={{
          position: 'absolute',
          top: 7,
          right: 8,
          width: 42,
          height: 42,
          border: '4px solid #111',
          background: '#ffc2dd',
          color: '#111',
          cursor: 'pointer',
          fontSize: 32,
          lineHeight: '28px',
          fontWeight: 900,
          zIndex: 5,
        }}
      >
        ×
      </button>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 10% 13%, rgba(255,255,255,0.85) 0 2px, transparent 3px), radial-gradient(circle at 95% 42%, rgba(255,255,255,0.9) 0 2px, transparent 3px), radial-gradient(circle at 82% 76%, rgba(255,255,255,0.8) 0 2px, transparent 3px), linear-gradient(135deg, #ffe4ef 0%, #ff91c4 42%, #ec1d80 100%)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          height: 52,
          display: 'grid',
          placeItems: 'center',
          borderBottom: '3px solid #1b0010',
          background: 'linear-gradient(#ff2f92, #cf0066)',
          color: '#fff',
          fontSize: 29,
          fontWeight: 900,
          letterSpacing: '0.12em',
          textShadow: '0 3px 0 #7a003d, 0 0 8px rgba(255,255,255,0.75)',
        }}
      >
        同城交友 真诚征友 找到你的另一半！
      </div>

      {[
        ['♡', 22, 86, 78],
        ['♡', 826, 82, 92],
        ['♡', 820, 330, 36],
        ['★', 895, 238, 58],
        ['★', 922, 438, 42],
      ].map(([shape, left, top, size], index) => (
        <span
          key={index}
          style={{
            position: 'absolute',
            left,
            top,
            zIndex: 1,
            color: '#fff',
            fontSize: size,
            lineHeight: 1,
            fontWeight: 900,
            textShadow: '0 0 9px rgba(255,255,255,0.95), 0 4px 0 rgba(219,0,100,0.35)',
          }}
        >
          {shape}
        </span>
      ))}

      <div style={{ position: 'relative', zIndex: 2, padding: '24px 24px 18px' }}>
        <h3
          style={{
            margin: 0,
            textAlign: 'center',
            color: '#ff0b76',
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '0.16em',
            WebkitTextStroke: '2px #8b003e',
            textShadow: '0 3px 0 #fff36c, 0 6px 0 #7a0038, 0 0 12px rgba(255,255,255,0.8)',
          }}
        >
          美女交友网站
        </h3>
        <div
          style={{
            marginTop: 12,
            textAlign: 'center',
            color: '#ec006f',
            fontSize: 28,
            fontWeight: 900,
            letterSpacing: '0.16em',
            textShadow: '0 2px 0 #fff',
          }}
        >
          ♥ 单身男女的乐园 真实资料 真诚交友 ♥
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '420px minmax(0, 1fr)',
            gap: 22,
            marginTop: 18,
          }}
        >
          <section
            style={{
              border: '2px solid #ef5f9d',
              borderRadius: 14,
              background: 'linear-gradient(#fff7fb, #ffe4ef)',
              padding: '12px 14px 14px',
              boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.75)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto 1fr',
                alignItems: 'center',
                gap: 14,
                color: '#e40068',
                fontSize: 28,
                fontWeight: 900,
                letterSpacing: '0.14em',
                textAlign: 'center',
              }}
            >
              <span style={{ height: 2, background: '#ef5f9d' }} />
              今日推荐
              <span style={{ height: 2, background: '#ef5f9d' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 14, marginTop: 12 }}>
              {profiles.map((profile) => (
                <article
                  key={profile.name}
                  style={{
                    overflow: 'hidden',
                    border: '2px solid #b77c83',
                    borderRadius: 8,
                    background: '#fff9fb',
                    boxShadow: '0 2px 0 rgba(255,255,255,0.9) inset',
                  }}
                >
                  <div
                    style={{
                      height: 98,
                      backgroundImage: `url(${publicPath(profile.image)})`,
                      backgroundSize: 'cover',
                      backgroundPosition: profile.position,
                      filter: 'saturate(1.08) contrast(1.05)',
                    }}
                  />
                  <div style={{ padding: '7px 10px 9px', color: '#151515', fontSize: 18, lineHeight: 1.32, fontWeight: 900 }}>
                    <div style={{ color: '#c70032', marginBottom: 4 }}>
                      {profile.name} {profile.age}岁
                    </div>
                    <div>身高：{profile.height}</div>
                    <div>职业：{profile.job}</div>
                  </div>
                </article>
              ))}
            </div>

            <div
              style={{
                marginTop: 12,
                color: '#e40068',
                fontSize: 22,
                lineHeight: 1.2,
                fontWeight: 900,
                textAlign: 'center',
                letterSpacing: '0.08em',
              }}
            >
              资料真实，人工审核，安全可靠！
            </div>
          </section>

          <section>
            <div
              style={{
                minHeight: 280,
                borderRadius: 13,
                background: 'linear-gradient(135deg, rgba(240,0,116,0.88), rgba(255,69,153,0.88))',
                color: '#fff',
                padding: '26px 42px',
                boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.35), 0 6px 16px rgba(166,0,75,0.25)',
              }}
            >
              <div
                style={{
                  color: '#fff24a',
                  fontSize: 43,
                  lineHeight: 1.15,
                  fontWeight: 900,
                  textShadow: '0 3px 0 #8a003e, 0 0 8px rgba(255,255,255,0.45)',
                  marginBottom: 26,
                }}
              >
                今晚有人等你聊天...
              </div>
              {['同城交友　快速约会', '免费聊天　找到真爱', '视频互动　缘分速配'].map((item) => (
                <div
                  key={item}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '54px 1fr',
                    alignItems: 'center',
                    color: '#fff',
                    fontSize: 32,
                    lineHeight: 1.35,
                    fontWeight: 900,
                    letterSpacing: '0.05em',
                    textShadow: '0 3px 0 #8b0044',
                    marginTop: 12,
                  }}
                >
                  <span style={{ color: '#fff', fontSize: 34, textShadow: '0 0 8px rgba(255,255,255,0.9)' }}>♥</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18, marginTop: 18 }}>
              <button
                type="button"
                onClick={() => enterDatingSite('进入')}
                style={{
                  height: 84,
                  border: '4px solid #0f64b2',
                  borderRadius: 18,
                  background: 'linear-gradient(#52d8ff, #0077e7)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 35,
                  fontWeight: 900,
                  textShadow: '0 3px 0 #004984',
                  boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.35), 0 5px 0 #004c91',
                }}
              >
                ♥ 立即进入
              </button>
              <button
                type="button"
                onClick={() => enterDatingSite('注册')}
                style={{
                  height: 84,
                  border: '4px solid #c00067',
                  borderRadius: 18,
                  background: 'linear-gradient(#ff64ac, #e00076)',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: 35,
                  fontWeight: 900,
                  textShadow: '0 3px 0 #850043',
                  boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.35), 0 5px 0 #92004c',
                }}
              >
                ♥ 免费注册
              </button>
            </div>

            <div
              style={{
                height: 42,
                marginTop: 18,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 8,
                background: 'linear-gradient(90deg, #b80063, #e80082, #b80063)',
                color: '#fff',
                fontSize: 16,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: '0.03em',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.22)',
              }}
            >
              {message || (
                <span style={{ display: 'inline-flex', alignItems: 'baseline', justifyContent: 'center', whiteSpace: 'nowrap' }}>
                  已有 <strong style={{ color: '#fff24a', margin: '0 6px', fontSize: 20, lineHeight: 1 }}>1587526</strong> 人成功找到朋友
                </span>
              )}
            </div>
          </section>
        </div>
      </div>
    </aside>
  );
}

function WheelAd({ close, onComplete, onSecretComplete, placement }) {
  const segments = [
    { label: '神秘大奖', icon: '♥', points: 0, color: '#ffc83f', jump: true },
    { label: '谢谢参与', icon: '★', points: 0, color: '#26a9f0' },
    { label: '谢谢参与', icon: '★', points: 0, color: '#46bd3f' },
    { label: '三等奖', icon: '🎁', points: 2, color: '#8a13b9' },
    { label: '三等奖', icon: '🎁', points: 2, color: '#0c74c9' },
    { label: '二等奖', icon: '💰', points: 5, color: '#45c53b' },
    { label: '一等奖', icon: '🏆', points: 10, color: '#df151b' },
    { label: '谢谢参与', icon: '★', points: 0, color: '#2e91df' },
  ];
  const [points, setPoints] = useState(20);
  const [rotation, setRotation] = useState(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [result, setResult] = useState('');
  const [, setGiftClicks] = useState(0);
  const segmentAngle = 360 / segments.length;
  const wheelColorGradient = `conic-gradient(${segments
    .map((segment, index) => `${segment.color} ${index * segmentAngle}deg ${(index + 1) * segmentAngle}deg`)
    .join(', ')})`;
  const wheelDividerGradient = `repeating-conic-gradient(transparent 0deg ${segmentAngle - 1.2}deg, #ffdf66 ${segmentAngle - 1.2}deg ${segmentAngle - 0.35}deg, #7a2a00 ${segmentAngle - 0.35}deg ${segmentAngle}deg)`;

  const spin = () => {
    if (isSpinning) {
      return;
    }

    if (points < 5) {
      setResult('积分不足，无法继续抽奖。');
      return;
    }

    const prizeIndex = Math.floor(Math.random() * segments.length);
    const prize = segments[prizeIndex];
    const currentAngle = ((rotation % 360) + 360) % 360;
    const prizeCenterAngle = prizeIndex * segmentAngle + segmentAngle / 2;
    const targetAngle = (360 - prizeCenterAngle + 360) % 360;
    const deltaToTarget = (targetAngle - currentAngle + 360) % 360;
    const extraRounds = 5 + Math.floor(Math.random() * 3);
    const nextRotation = rotation + extraRounds * 360 + deltaToTarget;

    setIsSpinning(true);
    setPoints((current) => current - 5);
    setResult('转盘正在转动，请稍候……');
    setRotation(nextRotation);

    window.setTimeout(() => {
      setIsSpinning(false);

      if (prize.jump) {
        setResult('抽中神秘大奖！正在打开领奖页面……');
        onComplete();
        return;
      }

      if (prize.points > 0) {
        setPoints((current) => current + prize.points);
        setResult(`抽中${prize.label}，奖励 ${prize.points} 积分，可继续抽奖。`);
        return;
      }

      setResult('谢谢参与，本次没有获得积分。');
    }, 4300);
  };

  const pressBackgroundGift = () => {
    setGiftClicks((current) => {
      const next = current + 1;

      if (next >= 5) {
        setResult('隐藏礼物已开启……');
        onSecretComplete();
        return 0;
      }

      return next;
    });
  };

  return (
    <aside
      style={{
        ...uniformAdCardStyle('#8a004c', placement),
        border: '4px solid #ffcb39',
        borderRadius: 18,
        boxShadow: '0 0 0 2px #7d0000, 0 0 0 5px #ff9b00 inset',
      }}
    >
      <button
        type="button"
        onClick={close}
        aria-label="关闭广告"
        style={{
          position: 'absolute',
          top: 11,
          right: 12,
          width: 38,
          height: 38,
          border: '3px solid #111',
          background: '#ddd',
          color: '#111',
          cursor: 'pointer',
          fontSize: 27,
          lineHeight: '24px',
          fontWeight: 900,
          zIndex: 7,
        }}
      >
        ×
      </button>

      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${publicPath('/images/news/lucky-wheel-bg.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      <button
        type="button"
        aria-label="背景礼物"
        onClick={pressBackgroundGift}
        style={{
          position: 'absolute',
          right: 22,
          bottom: 44,
          zIndex: 5,
          width: 160,
          height: 132,
          border: 0,
          padding: 0,
          background: 'transparent',
          cursor: 'default',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          padding: '22px 22px 0',
        }}
      >
        <h3
          style={{
            margin: 0,
            textAlign: 'center',
            color: '#ffe15c',
            fontSize: 76,
            lineHeight: 1,
            fontWeight: 900,
            letterSpacing: '0.05em',
            WebkitTextStroke: '2px #9b3100',
            textShadow: '0 4px 0 #ff8a00, 0 8px 0 #5a1100, 0 0 14px rgba(255,255,255,0.65)',
          }}
        >
          幸运抽奖转盘
        </h3>

        {[
          ['★', 40, 125, 50],
          ['★', 895, 130, 50],
          ['★', 74, 300, 44],
          ['★', 892, 310, 42],
          ['★', 74, 548, 40],
          ['★', 875, 552, 40],
        ].map(([shape, left, top, size], index) => (
          <span
            key={index}
            style={{
              position: 'absolute',
              left,
              top,
              color: '#ffe245',
              fontSize: size,
              lineHeight: 1,
              textShadow: '0 3px 0 #a24e00, 0 0 10px rgba(255,255,255,0.8)',
            }}
          >
            {shape}
          </span>
        ))}

        <div style={{ position: 'relative', width: 430, height: 430, margin: '18px auto 0' }}>
          <div
            style={{
              position: 'absolute',
              inset: -20,
              borderRadius: '50%',
              border: '11px solid #d48100',
              background:
                'radial-gradient(circle at center, transparent 61%, #ffef7c 62%, #a64600 69%, transparent 70%)',
              boxShadow: '0 0 0 5px #ffcd45, inset 0 0 0 4px #ffeb89',
            }}
          />

          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: -4,
              width: 0,
              height: 0,
              borderLeft: '18px solid transparent',
              borderRight: '18px solid transparent',
              borderTop: '72px solid #fff3b1',
              transform: 'translateX(-50%)',
              filter: 'drop-shadow(0 3px 0 #8d3d00)',
              zIndex: 5,
            }}
          />

          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              overflow: 'hidden',
              background: `${wheelDividerGradient}, ${wheelColorGradient}`,
              transform: `rotate(${rotation}deg)`,
              transition: isSpinning ? 'transform 4.2s cubic-bezier(0.08, 0.72, 0.08, 1)' : 'none',
              border: '6px solid #6f2000',
              boxShadow: 'inset 0 0 0 4px #ffcf45, 0 8px 18px rgba(0,0,0,0.32)',
            }}
          >
            {segments.map((segment, index) => {
              const angle = index * segmentAngle + segmentAngle / 2;
              const readableRotation = angle > 90 && angle < 270 ? angle - 90 : angle + 90;
              return (
                <div
                  key={`${segment.label}-${index}`}
                  style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    width: 132,
                    height: 78,
                    marginLeft: -66,
                    marginTop: -39,
                    transform: `rotate(${angle}deg) translateY(-136px)`,
                    textAlign: 'center',
                    color: '#fff',
                    fontSize: 20,
                    lineHeight: 1.18,
                    fontWeight: 900,
                    textShadow: '0 3px 0 rgba(0,0,0,0.58)',
                  }}
                >
                  <div
                    style={{
                      transform: `rotate(${readableRotation - angle}deg)`,
                      transformOrigin: 'center',
                    }}
                  >
                    <div>{segment.label}</div>
                    {segment.points ? <div>{segment.points}积分</div> : null}
                    <div style={{ marginTop: 4, fontSize: 30 }}>{segment.icon}</div>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="button"
            onClick={spin}
            disabled={isSpinning}
            style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: 150,
              height: 150,
              borderRadius: '50%',
              border: '8px solid #ffdf56',
              background: isSpinning ? 'linear-gradient(#b90000, #750000)' : 'linear-gradient(#ff2b20, #b50000)',
              color: '#ffe96b',
              cursor: isSpinning ? 'default' : 'pointer',
              fontSize: 38,
              lineHeight: 1.15,
              fontWeight: 900,
              WebkitTextStroke: '1px #5d0000',
              textShadow: '0 3px 0 #3a0000',
              boxShadow: 'inset 0 0 0 5px #9b0000, 0 0 0 5px #c37600',
              zIndex: 6,
            }}
          >
            开始
            <br />
            抽奖
          </button>
        </div>

        <div
          style={{
            position: 'relative',
            width: 710,
            height: 64,
            margin: '12px auto 0',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            placeItems: 'center',
            border: '5px solid #ffdf56',
            borderRadius: 16,
            background: 'linear-gradient(#9f0000, #5b0000)',
            color: '#fff1a4',
            fontSize: 28,
            fontWeight: 900,
            textShadow: '0 3px 0 #2a0000',
            boxShadow: 'inset 0 0 0 3px rgba(255,255,255,0.18)',
          }}
        >
          <span>
            当前积分：<strong style={{ color: '#fff', fontSize: 34 }}>{points}</strong>
          </span>
          <span>
            每次抽奖消耗：<strong style={{ color: '#fff', fontSize: 34 }}>5</strong>积分
          </span>
        </div>

        {result ? (
          <p
            style={{
              margin: '8px 0 0',
              color: '#fff1a4',
              fontSize: 18,
              lineHeight: 1.2,
              fontWeight: 900,
              textAlign: 'center',
              textShadow: '0 2px 0 #5d0000',
            }}
          >
            {result}
          </p>
        ) : null}
      </div>
    </aside>
  );
}

function EmojiSlotAd({ close, onComplete, placement }) {
  const reelSymbols = useMemo(
    () => [
      ['💖', '🍒', '🍋', '🍉', '🍇', '🍓', '🍑', '🍎', '🍍'],
      ['🆙', '🍊', '🍒', '🍋', '🍉', '🍇', '🍓', '🍑', '🥝'],
      ['🎵', '🍉', '🍇', '🍒', '🍋', '🍓', '🍑', '🍎', '🍍'],
    ],
    []
  );
  const timersRef = useRef([]);
  const [reelIndexes, setReelIndexes] = useState([1, 2, 3]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [message, setMessage] = useState('系统正在为您分配幸运号码...');
  const [hasResult, setHasResult] = useState(false);
  const [resultStatus, setResultStatus] = useState('idle');

  const createFinalIndexes = () => {
    const shouldWin = Math.random() < 1 / 3;
    if (shouldWin) {
      return [0, 0, 0];
    }

    let nextIndexes = reelSymbols.map((symbols) => Math.floor(Math.random() * symbols.length));
    while (nextIndexes.every((value) => value === 0)) {
      nextIndexes = reelSymbols.map((symbols) => Math.floor(Math.random() * symbols.length));
    }
    return nextIndexes;
  };

  useEffect(() => {
    return () => {
      timersRef.current.forEach((timer) => window.clearTimeout(timer));
      timersRef.current = [];
    };
  }, []);

  const clearTimers = () => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
  };

  const startSpin = () => {
    if (isSpinning) {
      return;
    }

    clearTimers();
    setIsSpinning(true);
    setHasResult(false);
    setResultStatus('idle');
    setMessage('转盘加速中，请不要关闭页面...');

    const finalIndexes = createFinalIndexes();
    const startedAt = Date.now();
    const spinStep = () => {
      const elapsed = Date.now() - startedAt;
      setReelIndexes((current) =>
        current.map((value, index) => {
          const shouldStop = elapsed >= 1050 + index * 520;
          if (shouldStop) {
            return finalIndexes[index];
          }
          return (value + 1 + index) % reelSymbols[index].length;
        })
      );

      if (elapsed < 2300) {
        timersRef.current.push(window.setTimeout(spinStep, Math.max(54, 96 - elapsed / 48)));
        return;
      }

      const isPrize = finalIndexes.every((value) => value === 0);
      setReelIndexes(finalIndexes);
      setIsSpinning(false);
      setHasResult(true);
      setResultStatus(isPrize ? 'win' : 'miss');
      setMessage(isPrize ? '💖 🆙 🎵  幸运号码已锁定！' : '本次号码未命中，请再试一次。');
    };

    spinStep();
  };

  const claimPrize = () => {
    setMessage(hasResult ? '资格核验中，请稍候...' : '请先开始抽奖，等待幸运号码停止。');
    if (hasResult) {
      onComplete();
    }
  };

  const bulbPositions = [
    ['top', 11], ['top', 48], ['top', 85], ['top', 122], ['top', 159], ['top', 196], ['top', 233], ['top', 270],
    ['top', 307], ['top', 344], ['top', 381], ['top', 418], ['top', 455], ['top', 492], ['top', 529], ['top', 566],
    ['top', 603], ['top', 640], ['top', 677], ['top', 714], ['top', 751], ['top', 788], ['top', 825], ['top', 862],
    ['top', 899], ['top', 936], ['top', 973],
    ['bottom', 11], ['bottom', 48], ['bottom', 85], ['bottom', 122], ['bottom', 159], ['bottom', 196], ['bottom', 233],
    ['bottom', 270], ['bottom', 307], ['bottom', 344], ['bottom', 381], ['bottom', 418], ['bottom', 455], ['bottom', 492],
    ['bottom', 529], ['bottom', 566], ['bottom', 603], ['bottom', 640], ['bottom', 677], ['bottom', 714], ['bottom', 751],
    ['bottom', 788], ['bottom', 825], ['bottom', 862], ['bottom', 899], ['bottom', 936], ['bottom', 973],
    ['left', 16], ['left', 54], ['left', 92], ['left', 130], ['left', 168], ['left', 206], ['left', 244], ['left', 282],
    ['left', 320], ['left', 358], ['left', 396], ['left', 434], ['left', 472], ['left', 510], ['left', 548], ['left', 586],
    ['left', 624],
    ['right', 16], ['right', 54], ['right', 92], ['right', 130], ['right', 168], ['right', 206], ['right', 244], ['right', 282],
    ['right', 320], ['right', 358], ['right', 396], ['right', 434], ['right', 472], ['right', 510], ['right', 548], ['right', 586],
    ['right', 624],
  ];

  const prizeLines = ['今日大奖', '8888元', '现金红包'];
  const stars = [
    [70, 46, 56], [132, 95, 50], [196, 36, 44], [844, 56, 42], [894, 96, 58],
    [744, 32, 44], [908, 372, 30], [864, 476, 42], [64, 454, 30], [918, 540, 72],
  ];

  return (
    <aside
      style={{
        ...uniformAdCardStyle('#b80000', placement),
        border: '4px solid #ffcc31',
        borderRadius: 12,
        boxShadow: '0 0 0 2px #8a0000, inset 0 0 0 5px rgba(255, 197, 38, 0.85), 0 0 24px rgba(255, 196, 0, 0.45)',
      }}
    >
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 10% 18%, rgba(255,255,255,0.75) 0 2px, transparent 3px), radial-gradient(circle at 82% 24%, rgba(255,255,255,0.72) 0 2px, transparent 3px), radial-gradient(circle at 91% 70%, rgba(255,255,255,0.88) 0 2px, transparent 3px), repeating-radial-gradient(circle at 50% 50%, rgba(255,255,255,0.08) 0 2px, transparent 3px 24px), linear-gradient(135deg, #e90000 0%, #950000 45%, #d30000 100%)',
        }}
      />

      {bulbPositions.map(([edge, offset], index) => (
        <span
          key={`${edge}-${offset}-${index}`}
          aria-hidden="true"
          style={{
            position: 'absolute',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: 'radial-gradient(circle, #fff 0 20%, #fff36c 36%, #ff9d00 72%, #8f4b00 100%)',
            boxShadow: '0 0 8px #fff275, 0 0 16px #ffb000',
            zIndex: 2,
            ...(edge === 'top' ? { top: 4, left: offset } : {}),
            ...(edge === 'bottom' ? { bottom: 4, left: offset } : {}),
            ...(edge === 'left' ? { left: 4, top: offset } : {}),
            ...(edge === 'right' ? { right: 4, top: offset } : {}),
          }}
        />
      ))}

      <button
        type="button"
        onClick={close}
        aria-label="关闭广告"
        style={{
          position: 'absolute',
          top: 16,
          right: 14,
          width: 38,
          height: 38,
          border: '3px solid #111',
          background: '#dedede',
          color: '#111',
          cursor: 'pointer',
          fontSize: 32,
          lineHeight: '28px',
          fontWeight: 900,
          zIndex: 8,
        }}
      >
        ×
      </button>

      {stars.map(([left, top, size], index) => (
        <span
          key={index}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left,
            top,
            color: '#ffe138',
            fontSize: size,
            lineHeight: 1,
            textShadow: '0 3px 0 #b76400, 0 0 12px rgba(255,255,255,0.8)',
            zIndex: 1,
          }}
        >
          ★
        </span>
      ))}

      <h3
        style={{
          position: 'relative',
          zIndex: 3,
          margin: '30px 58px 0',
          textAlign: 'center',
          color: '#ffd64b',
          fontSize: 84,
          lineHeight: 1,
          fontWeight: 900,
          letterSpacing: 0,
          WebkitTextStroke: '3px #9f4300',
          textShadow: '0 3px 0 #fff2a2, 0 7px 0 #c25b00, 0 12px 0 #4d0800, 0 0 16px rgba(255,255,255,0.65)',
        }}
      >
        幸运老虎机
      </h3>

      <div
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'grid',
          gridTemplateColumns: '258px minmax(0, 1fr)',
          gap: 22,
          alignItems: 'start',
          padding: '18px 30px 0',
        }}
      >
        <section
          style={{
            height: 506,
            borderRadius: 22,
            border: '5px solid #ffc638',
            background: 'linear-gradient(#b00000, #df0000 52%, #a90000)',
            boxShadow: 'inset 0 0 0 5px #ff8d13, 0 10px 20px rgba(0,0,0,0.35)',
            padding: '40px 24px 24px',
            boxSizing: 'border-box',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 8,
              borderRadius: 16,
              background: 'radial-gradient(circle at 10px 10px, #fff7a3 0 5px, #ffc700 6px 9px, transparent 10px)',
              backgroundSize: '24px 24px',
              opacity: 0.38,
            }}
          />
          <div style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
            <div
              style={{
                color: '#fff16a',
                fontSize: 38,
                lineHeight: 1.18,
                fontWeight: 900,
                letterSpacing: 0,
                textShadow: '0 3px 0 #740000, 0 0 5px rgba(80,0,0,0.55)',
              }}
            >
              {prizeLines[0]}
            </div>
            <div
              style={{
                margin: '34px auto 0',
                width: '94%',
                borderRadius: 8,
                background: 'linear-gradient(#ffe987, #ffc949)',
                boxShadow: 'inset 0 0 0 3px #fff5b5, 0 5px 12px rgba(80,0,0,0.32)',
                padding: '22px 8px 18px',
                boxSizing: 'border-box',
              }}
            >
              <div
                style={{
                  color: '#b40000',
                  fontSize: 40,
                  lineHeight: 1,
                  fontWeight: 900,
                  letterSpacing: 0,
                  textShadow: '0 2px 0 #fff7b5',
                  whiteSpace: 'nowrap',
                }}
              >
                8888元
              </div>
              <div
                style={{
                  marginTop: 26,
                  color: '#b40000',
                  fontSize: 34,
                  lineHeight: 1.12,
                  fontWeight: 900,
                  letterSpacing: 0,
                  textShadow: '0 2px 0 #fff0a1',
                }}
              >
                {prizeLines[2]}
              </div>
            </div>
            <div
              style={{
                margin: '18px auto 0',
                width: '94%',
                borderRadius: 7,
                background: 'linear-gradient(#ffe36c, #ffc847)',
                color: '#5b1300',
                padding: '16px 10px',
                boxSizing: 'border-box',
                fontSize: 22,
                lineHeight: 1.65,
                fontWeight: 900,
                boxShadow: 'inset 0 0 0 2px #fff6a8',
              }}
            >
              <div>- 正在等待开奖 -</div>
              <div style={{ color: '#b40000', fontSize: 20 }}>━━ ★ ★ ★ ━━</div>
            </div>
          </div>
        </section>

        <section style={{ position: 'relative' }}>
          <div
            style={{
              position: 'relative',
              borderRadius: 22,
              border: '8px solid #f4cd54',
              background: 'linear-gradient(#816024, #17120b 18%, #030303)',
              boxShadow: 'inset 0 0 0 4px #fff2a8, 0 12px 20px rgba(0,0,0,0.46)',
              padding: '18px 16px 14px',
            }}
          >
            <div
              style={{
                height: 266,
                display: 'grid',
                gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
                overflow: 'hidden',
                borderRadius: 12,
                border: '6px solid #151515',
                background: '#f4f0e6',
                boxShadow: 'inset 0 22px 28px rgba(0,0,0,0.28), inset 0 -22px 28px rgba(0,0,0,0.28)',
              }}
            >
              {[0, 1, 2].map((reel) => (
                <div
                  key={reel}
                  style={{
                    position: 'relative',
                    display: 'grid',
                    gridTemplateRows: '74px 118px 74px',
                    alignItems: 'center',
                    justifyItems: 'center',
                    borderLeft: reel === 0 ? 0 : '3px solid #202020',
                    background: 'linear-gradient(90deg, #d1d1d1 0%, #fff 17%, #f7f4ee 52%, #dadada 84%, #9d9d9d 100%)',
                    boxShadow: 'inset -12px 0 20px rgba(0,0,0,0.16), inset 12px 0 20px rgba(255,255,255,0.28)',
                  }}
                >
                  <span style={{ fontSize: 46, opacity: 0.62 }}>
                    {reelSymbols[reel][(reelIndexes[reel] + reelSymbols[reel].length - 1) % reelSymbols[reel].length]}
                  </span>
                  <span
                    style={{
                      fontSize: reelIndexes[reel] === 0 ? 74 : 78,
                      lineHeight: 1,
                      filter: 'drop-shadow(0 4px 1px rgba(0,0,0,0.24))',
                      transform: isSpinning ? 'scale(1.03)' : 'scale(1)',
                      transition: 'transform 80ms linear',
                    }}
                  >
                    {reelSymbols[reel][reelIndexes[reel]]}
                  </span>
                  <span style={{ fontSize: 46, opacity: 0.62 }}>
                    {reelSymbols[reel][(reelIndexes[reel] + 1) % reelSymbols[reel].length]}
                  </span>
                  <span
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.23), transparent 23%, transparent 72%, rgba(0,0,0,0.25))',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                marginTop: 14,
                height: 58,
                display: 'grid',
                placeItems: 'center',
                borderRadius: 8,
                border: '3px solid #d8b24a',
                background: '#050505',
                color: hasResult ? '#fff14f' : '#38ff2e',
                fontSize: hasResult ? 29 : 28,
                lineHeight: 1,
                fontWeight: 900,
                letterSpacing: 0,
                textShadow: hasResult ? '0 0 12px rgba(255,241,79,0.75)' : '0 0 10px rgba(56,255,46,0.65)',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                padding: '0 12px',
                boxSizing: 'border-box',
              }}
            >
              {message}
            </div>
          </div>

          <button
            type="button"
            onClick={hasResult && resultStatus === 'miss' ? startSpin : hasResult ? claimPrize : startSpin}
            disabled={isSpinning}
            style={{
              display: 'block',
              width: 540,
              maxWidth: '100%',
              height: 102,
              margin: '18px auto 0',
              border: '6px solid #ffd55b',
              borderRadius: 24,
              background: isSpinning ? 'linear-gradient(#d76cff, #5d008a)' : 'linear-gradient(#f02cff 0%, #7f00c8 58%, #3e007e 100%)',
              color: '#ffe86a',
              cursor: isSpinning ? 'wait' : 'pointer',
              fontSize: 64,
              lineHeight: 1,
              fontWeight: 900,
              letterSpacing: 0,
              WebkitTextStroke: '2px #6a2600',
              textShadow: '0 4px 0 #27001e, 0 0 10px rgba(255,255,255,0.55)',
              boxShadow: 'inset 0 0 0 4px #c200f0, 0 8px 12px rgba(0,0,0,0.45)',
            }}
          >
            {hasResult ? (resultStatus === 'win' ? '点击领取' : '再抽一次') : isSpinning ? '开奖中' : '开始抽奖'}
          </button>
        </section>

      </div>
    </aside>
  );
}

function renderAdLayout(ad, close, onComplete, onSecretComplete, placement = 'right') {
  if (ad.id === 'quiz') {
    return <QuizAd ad={ad} close={close} onComplete={onComplete} placement={placement} />;
  }

  if (ad.id === 'fortune') {
    return <FortuneAd ad={ad} close={close} onComplete={onComplete} placement={placement} />;
  }

  if (ad.id === 'dating') {
    return <DatingAd ad={ad} close={close} onComplete={onComplete} placement={placement} />;
  }

  if (ad.id === 'wheel') {
    return <WheelAd ad={ad} close={close} onComplete={onComplete} onSecretComplete={onSecretComplete} placement={placement} />;
  }

  return <EmojiSlotAd ad={ad} close={close} onComplete={onComplete} placement={placement} />;
}

export default function MingchuanFloatingAds({
  adId,
  debug = false,
  onDebugComplete,
}) {
  const navigate = useNavigate();
  const ad = useMemo(() => getAdById(adId), [adId]);
  const [isClosed, setIsClosed] = useState(false);

  const handleComplete = (completedAdId) => {
    if (debug) {
      onDebugComplete?.(completedAdId);
      return;
    }

    window.setTimeout(() => {
      navigate(ORDINARY_NOT_FOUND_PATH);
    }, 1600);
  };

  const handleSecretComplete = () => {
    if (debug) {
      onDebugComplete?.('wheel-secret-gift');
      return;
    }

    window.setTimeout(() => {
      navigate(GHOST_CACHE_PATH);
    }, 500);
  };

  if (isClosed) {
    return null;
  }

  const adLayer = (
    <div
      aria-label="明川新闻网广告"
      style={{
        all: 'initial',
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        pointerEvents: 'none',
        background: 'transparent',
        display: 'block',
        fontFamily: '"Microsoft YaHei", Arial, sans-serif',
        fontSize: 16,
        lineHeight: 1,
        letterSpacing: 0,
        textAlign: 'initial',
        direction: 'ltr',
        isolation: 'isolate',
        WebkitTextSizeAdjust: '100%',
        textSizeAdjust: '100%',
      }}
    >
      {renderAdLayout(ad, () => setIsClosed(true), () => handleComplete(ad.id), handleSecretComplete)}
    </div>
  );

  return createPortal(adLayer, document.body);
}
