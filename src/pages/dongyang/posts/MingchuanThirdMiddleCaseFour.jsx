import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DongyangOldStoriesLayout } from '../../DongyangOldStoriesBlog';
import { publicPath } from '../../../utils/publicPath';
import { INPUT_MODES, readInputMode } from '../../../utils/inputMode';

const paragraphs = [
  '5月20日，阴',
  '刘欣怡失踪了。',
  '我在傍晚时分赶到了学校。家属们还在那里，零零星星地围坐着。经过一天的拉锯，他们看起来已经失去了力气和信心，眼里只有麻木和恐惧。校方派了顾正清陪着他们。他看见我来，强装热情地打了个招呼，嘴唇动了几下，大概是在问案件进展。我没有理他。',
  '我在体育馆器材室里找到了小Y，她果然躲在那里哭。我叫她的时候，她红着眼睛抬起头，胡乱地擦着脸上的泪水：“宏宇哥。”',
  '器材室里有一股潮湿的气味。软垫、麻绳、旧羽毛球拍，所有东西都蒙着一层薄薄的水汽。墙角放着几盆花，种在棕色的塑料盆里，每一朵都是那种很深很深的红，红到发黑。我盯着它们看了几秒，把那些花挡在背后。',
  '“监控里并没有拍到任何东西。”我听见自己在说话，像是播放一段预制好的录音。“这个人就好像人间蒸发了。”',
  '听到我的话，小Y露出惶恐的神色。但她并不惊讶。',
  '其实监控拍到了一些东西，但警方现在无法公开。因为那段影像的内容无法用人类的常识解释。',
  '刘欣怡最后出现在画面里，是前天晚上十一点。',
  '她的身上没有穿着任何衣物，赤身裸体地，沿着通往校门的水泥路爬行，双手的关节反折成一个扭曲的角度，胸腔病态地向前迭出，像是正在被什么东西拖拽一样。正常人做出这个姿势至少也是四肢骨折，但刘欣怡却在以一个很快的速度移动，最后她到达了学校门口的花圃当中。',
  '她在那里停留了好一会儿，随后脖子一寸一寸地扭动一起来，逐渐转向天空的方向。隔着老旧监控跳动的雪花，我依然能感受她脸上流露的绝望和惊恐。我希望这个时候她已经死去了，这样至少她就不必经受接下来我看到的一切——',
  '她的胸口突然裂开了。有什么东西从她的胸腔深处钻了出来，把她的脏器和肋骨像豆腐一样从内向外地剥开，我甚至能看到她尚在顽强搏动的心脏，被紫黑色的动脉血管包裹着，从这些纵横交错的血管上方，一朵黑色的莲花在她跳动的心上以肉眼可见的速度在生长着。',
  '就在花蕊完全盛放的那一瞬间，刘欣怡的整个身体像是一片被火焰灼烧过的花叶，迅速地卷曲、崩塌、融化、折叠，最后变成了一滩黑色的液体，完全渗入了泥土当中。',
  '警方正在尝试排除这段监控被篡改的可能，但我相信自己的眼睛所看到的。我不敢对小Y说出我看到的这些。我不敢对任何人说。',
  '小Y问我：“那她们……还会回来吗？”',
  '我说，大概率不会了吧。',
  '小Y拉着我的衣角，泪眼婆娑地说：“宏宇哥，我害怕。',
  '我垂眼看着她。手腕上的淤青还没有完全消退，青紫色的斑块边缘已经开始泛黄。那是在废墟下被压在石缝里留下的。那只手里握过的东西，一部分从废墟里被挖出来，收进了档案馆的残卷夹，又被我偷出来锁在了我书桌最下面那层抽屉里。',
  '嘴里仿佛又尝到了那种甜得令人作呕的味道。',
  '这个世界上，也许只有我一个人知道她和这件事的关系。连她的爸爸也不知道。',
  '但我决定什么也不说。',
  '我不记得自己是怎么走出器材室的。等我再有记忆的时候，我已经站在了操场边上。雨不知道什么时候开始下了，水洼里映着教学楼零星的灯火，我站在水洼边缘，低头看自己的倒影，感觉像在看一个陌生人。',
  '明天我就会去报社辞职。我的记者生涯，和我写下的这些调查笔记一样，就到此为止。',
  '如果我没有写下这些文字就好了。',
  '一个键一个键地按回去。刘欣怡回到宿舍床上。盒子回到洞口的泥地里。纸条上的名字回到墨水瓶里。废庙重新站起来。',
  '如果我能删掉这些文字，就能删掉我做的那些梦，嘴里的甜味就会消失。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。我能删掉它。',
];

const protectedTokens = ['顾正清', '是', '小Y', '的', '爸爸'];
const TOUCH_INPUT_PHRASE = '\u6211\u80fd\u5220\u6389\u5b83\u3002';
const TOUCH_INPUT_SENTINEL = 'x'.repeat(2048);
const protectedTokenPositions = [0.12, 0.32, 0.52, 0.72, 0.9];

export default function MingchuanThirdMiddleCaseFour() {
  const navigate = useNavigate();
  const backspaceStartedAt = useRef(null);
  const articleRef = useRef(null);
  const touchInputRef = useRef(null);
  const touchInputLengthRef = useRef(TOUCH_INPUT_SENTINEL.length);
  const touchComposingRef = useRef(false);
  const touchCompositionStartLengthRef = useRef(TOUCH_INPUT_SENTINEL.length);
  const touchRepeatCountRef = useRef(0);
  const touchDeleteStartedAt = useRef(null);
  const touchDeleteLastSignalAt = useRef(0);
  const touchDeleteSignalCount = useRef(0);
  const touchDeleteTimer = useRef(null);
  const [inputMode, setInputMode] = useState(readInputMode);
  const [touchRepeatCount, setTouchRepeatCount] = useState(0);
  const isTouchMode = inputMode === INPUT_MODES.TOUCH;
  const characterRows = useMemo(() => {
    const allText = paragraphs.join('');
    const protectedIndexes = new Set();
    let searchStart = 0;

    protectedTokens.forEach((token, tokenIndex) => {
      const targetIndex = Math.floor(allText.length * protectedTokenPositions[tokenIndex]);
      let bestTokenStart = allText.indexOf(token, searchStart);
      let nextTokenStart = bestTokenStart;

      while (nextTokenStart !== -1) {
        if (
          bestTokenStart === -1 ||
          Math.abs(nextTokenStart - targetIndex) < Math.abs(bestTokenStart - targetIndex)
        ) {
          bestTokenStart = nextTokenStart;
        }

        nextTokenStart = allText.indexOf(token, nextTokenStart + token.length);
      }

      if (bestTokenStart === -1) {
        return;
      }

      Array.from(token).forEach((_, index) => {
        protectedIndexes.add(bestTokenStart + index);
      });
      searchStart = bestTokenStart + token.length;
    });

    let globalIndex = 0;
    let deletableIndex = 0;

    return paragraphs.map((paragraph) =>
      Array.from(paragraph).map((character) => {
        const isProtected = protectedIndexes.has(globalIndex);
        const row = {
          character,
          isProtected,
          deletableIndex: isProtected ? null : deletableIndex,
        };

        if (!isProtected) {
          deletableIndex += 1;
        }

        globalIndex += 1;
        return row;
      })
    );
  }, []);
  const totalDeletableLength = useMemo(
    () =>
      characterRows.reduce(
        (sum, row) => sum + row.filter((item) => !item.isProtected).length,
        0
      ),
    [characterRows]
  );
  const [remainingLength, setRemainingLength] = useState(totalDeletableLength);
  const protocolVisible = remainingLength === 0;

  const visibleParagraphs = useMemo(() => {
    if (remainingLength === 0) {
      return [protectedTokens.join('')];
    }

    return characterRows
      .map((row) =>
        row
          .filter(
            (item) =>
              item.isProtected ||
              (item.deletableIndex !== null && item.deletableIndex < remainingLength)
          )
          .map((item) => item.character)
          .join('')
      )
      .filter(Boolean);
  }, [characterRows, remainingLength]);

  useEffect(() => {
    articleRef.current?.focus();
  }, []);

  useEffect(() => {
    const updateMode = (event) => {
      setInputMode(event.detail?.mode || readInputMode());
    };

    window.addEventListener('heart-home:input-mode-change', updateMode);
    window.addEventListener('storage', updateMode);
    return () => {
      window.removeEventListener('heart-home:input-mode-change', updateMode);
      window.removeEventListener('storage', updateMode);
    };
  }, []);


  const resetTouchInput = () => {
    const input = touchInputRef.current;

    if (!input) {
      return;
    }

    input.value = TOUCH_INPUT_SENTINEL;
    touchInputLengthRef.current = TOUCH_INPUT_SENTINEL.length;
    window.requestAnimationFrame(() => {
      if (document.activeElement !== input) {
        return;
      }

      input.setSelectionRange?.(input.value.length, input.value.length);
    });
  };

  const focusTouchInput = () => {
    if (!isTouchMode || remainingLength === 0) {
      return;
    }

    const input = touchInputRef.current;

    if (!input) {
      return;
    }

    resetTouchInput();
    input.focus();
    input.setSelectionRange?.(input.value.length, input.value.length);
  };

  const deleteCharacters = (amount) => {
    let deleteAmount = Math.max(1, amount);
    const echoDeleteAmount = Math.min(touchRepeatCountRef.current, deleteAmount);

    if (echoDeleteAmount > 0) {
      touchRepeatCountRef.current -= echoDeleteAmount;
      setTouchRepeatCount(touchRepeatCountRef.current);
      deleteAmount -= echoDeleteAmount;
    }

    if (deleteAmount > 0) {
      setRemainingLength((current) => Math.max(0, current - deleteAmount));
    }
  };

  const stopTouchDeleteLoop = () => {
    if (touchDeleteTimer.current) {
      window.clearTimeout(touchDeleteTimer.current);
      touchDeleteTimer.current = null;
    }

    touchDeleteStartedAt.current = null;
    touchDeleteSignalCount.current = 0;
  };

  const getTouchDeleteStep = () => {
    if (touchDeleteStartedAt.current === null) {
      return 1;
    }

    const heldTime = Date.now() - touchDeleteStartedAt.current;

    if (heldTime >= 5000) {
      return 10;
    }

    if (heldTime >= 2500) {
      return 2;
    }

    return 1;
  };

  const runTouchDeleteLoop = () => {
    if (Date.now() - touchDeleteLastSignalAt.current > 900) {
      stopTouchDeleteLoop();
      return;
    }

    deleteCharacters(getTouchDeleteStep());
    touchDeleteTimer.current = window.setTimeout(runTouchDeleteLoop, 90);
  };

  const signalTouchDelete = () => {
    const now = Date.now();
    touchDeleteLastSignalAt.current = now;

    if (touchDeleteStartedAt.current === null) {
      touchDeleteStartedAt.current = now;
      touchDeleteSignalCount.current = 1;
      deleteCharacters(1);
      return;
    }

    touchDeleteSignalCount.current += 1;

    if (!touchDeleteTimer.current && touchDeleteSignalCount.current >= 2) {
      touchDeleteTimer.current = window.setTimeout(runTouchDeleteLoop, 120);
    }
  };

  const addTouchEchoCharacters = (amount) => {
    touchRepeatCountRef.current = Math.min(160, touchRepeatCountRef.current + Math.max(1, amount));
    setTouchRepeatCount(touchRepeatCountRef.current);
  };

  const countCommittedTouchInput = (text) => {
    if (typeof text !== 'string' || text.length === 0) {
      return 0;
    }

    const characters = Array.from(text);
    const hasOnlyPinyinPreedit = characters.every((character) => /^[a-zA-Z' ]$/.test(character));
    return hasOnlyPinyinPreedit ? 0 : characters.length;
  };

  const handleTouchCompositionStart = (event) => {
    if (!isTouchMode) {
      return;
    }

    touchComposingRef.current = true;
    touchCompositionStartLengthRef.current = event.currentTarget.value.length;
  };

  const handleTouchCompositionEnd = (event) => {
    if (!isTouchMode) {
      return;
    }

    touchComposingRef.current = false;

    const nativeEvent = event.nativeEvent;
    const nextValue = event.currentTarget.value;
    const compositionStartLength = touchCompositionStartLengthRef.current;
    const committedText =
      typeof nativeEvent?.data === 'string' && nativeEvent.data.length > 0
        ? nativeEvent.data
        : nextValue.slice(compositionStartLength);
    const committedCount = countCommittedTouchInput(committedText);

    if (committedCount > 0) {
      addTouchEchoCharacters(committedCount);
    }

    resetTouchInput();
  };

  const handleTouchTextInput = (event) => {
    if (!isTouchMode) {
      return;
    }

    const nativeEvent = event.nativeEvent;
    const inputType = nativeEvent?.inputType || '';

    if (touchComposingRef.current || nativeEvent?.isComposing || inputType === 'insertCompositionText') {
      return;
    }

    const nextValue = event.currentTarget.value;
    const previousLength = touchInputLengthRef.current;
    const nextLength = nextValue.length;

    if (inputType.startsWith('delete')) {
      if (nextLength >= TOUCH_INPUT_SENTINEL.length) {
        touchInputLengthRef.current = nextLength;
        return;
      }

      signalTouchDelete();
      touchInputLengthRef.current = nextLength;

      if (nextLength < 64) {
        resetTouchInput();
      }
      return;
    }

    if (nextLength !== previousLength) {
      const insertedText = typeof nativeEvent?.data === 'string' ? nativeEvent.data : '';
      const insertedCount = countCommittedTouchInput(insertedText);

      if (insertedCount > 0) {
        addTouchEchoCharacters(insertedCount);
        resetTouchInput();
        return;
      }

      touchInputLengthRef.current = nextLength;
    }
  };

  const handleTouchTextKeyDown = (event) => {
    if (!isTouchMode || event.key !== 'Backspace') {
      return;
    }

    if (event.currentTarget.value.length > 0) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();
    signalTouchDelete();
    resetTouchInput();
  };

  useEffect(() => {
    const isBackspace = (event) =>
      event.key === 'Backspace' || event.code === 'Backspace' || event.keyCode === 8;

    const handleKeyDown = (event) => {
      if (event.target?.classList?.contains('dy-touch-delete-input')) {
        return;
      }
      const editableTarget = event.target?.closest?.('input, textarea, select, [contenteditable="true"]');

      if (editableTarget) {
        return;
      }


      if (!isBackspace(event)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();

      if (backspaceStartedAt.current === null) {
        backspaceStartedAt.current = Date.now();
      }

      const heldTime = Date.now() - backspaceStartedAt.current;
      const deleteStep = heldTime >= 5000 ? 10 : 1;
      setRemainingLength((current) => Math.max(0, current - deleteStep));
    };

    const handleKeyUp = (event) => {
      if (isBackspace(event)) {
        backspaceStartedAt.current = null;
      }
    };

    const handleBlur = () => {
      backspaceStartedAt.current = null;
    };

    document.addEventListener('keydown', handleKeyDown, true);
    document.addEventListener('keyup', handleKeyUp, true);
    window.addEventListener('blur', handleBlur);

    return () => {
      document.removeEventListener('keydown', handleKeyDown, true);
      document.removeEventListener('keyup', handleKeyUp, true);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  const touchPhraseCharacters = Array.from(TOUCH_INPUT_PHRASE);
  const touchInputEcho = Array.from({ length: touchRepeatCount }, (_, index) => touchPhraseCharacters[index % touchPhraseCharacters.length]).join('');

  return (
    <DongyangOldStoriesLayout>
      <article className="dy-card">
        <div className="dy-card-body" ref={articleRef} tabIndex={-1}>
          <style>{`
            .dy-card-body:focus {
              outline: none;
            }

            .dy-delete-cursor {
              display: inline-block;
              width: 0.62em;
              height: 1.22em;
              margin-left: 2px;
              transform: translateY(0.18em);
              background: #4a241d;
              animation: dyDeleteCursorBlink 1s steps(1, end) infinite;
            }

            .dy-delete-cursor.touchable {
              cursor: pointer;
            }

            .dy-touch-delete-input {
              position: fixed;
              left: 0;
              bottom: 0;
              width: 120px;
              height: 44px;
              opacity: 0;
              border: 0;
              padding: 0;
              resize: none;
              color: transparent;
              background: transparent;
            }

            .dy-touch-input-echo {
              color: inherit;
            }

            @keyframes dyDeleteCursorBlink {
              0%, 45% { opacity: 1; }
              46%, 100% { opacity: 0; }
            }

            .dy-protocol-backdrop {
              position: fixed;
              inset: 0;
              z-index: 80;
              background: rgba(60, 37, 14, 0.08);
              pointer-events: none;
            }

            .dy-protocol-dialog {
              position: fixed;
              left: 50%;
              top: 58vh;
              transform: translate(-50%, -50%);
              width: min(360px, calc(100vw - 36px));
              padding: 12px 14px;
              background:
                repeating-linear-gradient(90deg, rgba(106, 22, 19, 0.04) 0 1px, transparent 1px 34px),
                rgba(255, 234, 160, 0.96);
              border: 1px solid rgba(106, 22, 19, 0.38);
              box-shadow: 4px 6px 0 rgba(106, 22, 19, 0.16);
              color: #4a241d;
              font-family: Arial, "Microsoft YaHei", sans-serif;
              pointer-events: auto;
            }

            .dy-protocol-dialog p {
              margin: 0 0 10px;
              font-size: 12px;
              line-height: 1.55;
            }

            .dy-protocol-dialog button {
              min-height: 28px;
              padding: 0 10px;
              border: 1px solid rgba(106, 22, 19, 0.48);
              background: #fff2bd;
              color: #6a1613;
              font-family: Arial, "Microsoft YaHei", sans-serif;
              font-size: 12px;
              cursor: pointer;
            }

            .dy-protocol-dialog button:hover {
              background: #6a1613;
              color: #ffeaa0;
            }

            @media (min-width: 821px) {
              .hh-input-mode-touch .dy-protocol-dialog {
                left: calc((100vw - min(100vw, 1180px)) / 2 + 408px);
                top: 58vh;
              }
            }
          `}</style>
          <h1>明川三中少女失踪案调查笔记 其四</h1>
          <div className="dy-post-time">2005-05-25 22:04</div>
          <img
            className="dy-signature"
            src={publicPath('images/blog/lihongyu-sign.jpg')}
            alt="李宏宇签名"
          />
          {visibleParagraphs.map((paragraph, index) => (
            <p key={`case-four-paragraph-${index}`}>
              {paragraph}
              {index === visibleParagraphs.length - 1 && remainingLength > 0 ? (
                <>
                  {isTouchMode && touchInputEcho ? (
                    <span className="dy-touch-input-echo">{touchInputEcho}</span>
                  ) : null}
                  <span
                    className={`dy-delete-cursor${isTouchMode ? ' touchable' : ''}`}
                    aria-hidden={!isTouchMode}
                    role={isTouchMode ? 'button' : undefined}
                    tabIndex={isTouchMode ? 0 : undefined}
                    onPointerDown={focusTouchInput}
                    onTouchStart={focusTouchInput}
                    onClick={focusTouchInput}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        focusTouchInput();
                      }
                    }}
                  />
                </>
              ) : null}
            </p>
          ))}
          {isTouchMode && remainingLength > 0 ? (
            <textarea
              ref={touchInputRef}
              className="dy-touch-delete-input"
              data-touch-delete-root="true"
              aria-label="touch deletion input"
              defaultValue={TOUCH_INPUT_SENTINEL}
              autoCapitalize="off"
              autoCorrect="off"
              spellCheck="false"
              onCompositionStart={handleTouchCompositionStart}
              onCompositionEnd={handleTouchCompositionEnd}
              onInput={handleTouchTextInput}
              onKeyDown={handleTouchTextKeyDown}
            />
          ) : null}
        </div>
      </article>
      {protocolVisible && (
        <div className="dy-protocol-backdrop" role="dialog" aria-modal="true">
          <div className="dy-protocol-dialog">
            <p>
              接下来你看到的将不是我的公开笔记。如果你执意往下调查，那么系统将视作你已同意了安全协议。
            </p>
            <button
              type="button"
              onClick={() => navigate('/p/4b0e72f6a9')}
            >
              了解更多
            </button>
          </div>
        </div>
      )}
    </DongyangOldStoriesLayout>
  );
}
