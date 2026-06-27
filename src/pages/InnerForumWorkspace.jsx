import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import { hashWithPepper, normalizeInput } from '../utils/hash';
import { publicPath } from '../utils/publicPath';

const CORRUPTION_START_MS = 30000;
const CORRUPTION_STEP_MS = 5000;
const MOJIBAKE_FRAGMENTS = ['锟ソ', '鈻�', '銆å', '闂ѧ', '鍚�', '娑Ҫ', '鏂鐢', '妗悜', '锛½', '锝�','ç','æ','花','『鍒╁惎鍔�','眾鏍界浠'];

const MENU_ITEMS = [
  { key: 'appointment', label: '预约咨询' },
  { key: 'records', label: '咨询记录' },
  { key: 'messages', label: '站内私信' },
  { key: 'posts', label: '发帖记录' },
  { key: 'security', label: '账户安全' },
];

const CARD_STYLE = {
  background: '#fffdf8',
  border: '1px solid #ddd5c5',
  borderRadius: 10,
  padding: '16px 18px',
};

const COUNSELORS = [
  {
    id: 'yuan-zhixia',
    name: '袁知夏',
    color: '#5f9bb3',
    marker: 'square',
    offWeekdays: [],
    slots: ['09:30', '11:00', '13:30', '15:00'],
  },
  {
    id: 'chen-ji',
    name: '陈霁',
    color: '#c88ca6',
    marker: 'triangle',
    offWeekdays: [0],
    slots: ['10:00', '14:00', '16:30', '19:30'],
  },
  {
    id: 'gu-zhengqing',
    name: '顾正清',
    color: '#c4a251',
    marker: 'circle',
    offWeekdays: [1, 2, 3, 4, 5],
    slots: ['09:30', '13:00', '15:30', '18:30'],
  },
  {
    id: 'lu-xinyin',
    name: '陆心音',
    color: '#8daa7e',
    marker: 'star',
    offWeekdays: [4],
    slots: ['10:30', '13:30', '16:00', '20:00'],
  },
];

const WEEK_HEADERS = ['日', '一', '二', '三', '四', '五', '六'];
const BOOKING_START = '2026-06-15';
const BOOKING_END = '2026-06-30';
const RECORD_CODE_PEPPER = 'heart_home_record_key_v1::';
const RECORD_HASH_TO_PATH = {
  '5bbec09980046b1ebd6c3d7c69967350b0ef0de396a45b666b8b676d0a70aca8':
    '/p/e47a92c0d1',
  '80b9462d494619151bdb37e034c3438642309ccee32ee3ac48a069dc40e91e29':
    '/p/0f6b83d2a7',
  '0d6ba888e22ac8a6ad02b8c71a6e1b1e3f7b528ff355b0e0dcbaa239880e9e3d':
    '/p/c5a18f0e9d',
};

const MESSAGE_THREADS = [
  {
    id: 'unknown-mail',
    name: '未知用户',
    messages: [
      {
        from: 'other',
        text: '亲爱的花匠，你好。你已成功预约线上文字咨询（临时）。\n咨询师：∞瑶< 坍浦琼鉴敬哐\n预约时间：慰撩涶摙く 漓浦ぐ妩：乏く\n预约编号：□□□□□-□□□□-□□□□□\n\n本站线上咨询内容滑ㄧ悸洪演稿，缃撤潆后仅本人和鍂メ 霄可在工作台中镻亍。\n注：本次临时咨询室由管理员手动确认。',
        time: '2026/05/28 20:34',
      },
    ],
  },
  {
    id: 'fm001',
    name: '未知用户',
    messages: [
      { from: 'other', text: '看看我发现了谁～', time: '2026/05/14 19:02' },
      {
        from: 'other',
        text: '你以为躲到这种地方发帖就没人能发现吗，烂菜叶～',
        time: '2026/05/14 19:03',
      },
      { from: 'other', image: '/bully-photo.png', time: '2026/05/14 19:03' },
      {
        from: 'other',
        text: '昨天的照片你好看吗？真后悔没把你的头发剪的更短一点啊哈哈哈',
        time: '2026/05/14 19:03',
      },
      {
        from: 'other',
        text: '你到网上发帖求助又能怎么样呢？你真以为这些弱智网友能帮到你？我有一百种方式可以让你过得更凄惨。',
        time: '2026/05/14 19:03',
      },
      { from: 'self', text: '闭嘴！闭嘴闭嘴闭嘴闭嘴闭嘴！！！！', time: '2026/05/16 23:46' },
      { from: 'self', text: '如果谁能让你消失就好了。', time: '2026/05/16 23:47' },
      { type: 'divider', text: '2026/05/24 19:02' },
      { from: 'other', text: '你去哪里了', time: '2026/05/24 19:02' },
      { from: 'other', text: '能看见的话回我一下', time: '2026/05/24 19:14' },
      { from: 'other', text: '我知道你还在看。', time: '2026/05/24 20:30' },
      {
        from: 'other',
        text: '我知道你还是很恨我，我不是来骂你的。我只是想跟你说，对不起。我真的知道错了。',
        time: '2026/05/24 20:30',
      },
      { from: 'other', text: '你是不是跟谁说了什么？求你了，放过我', time: '2026/05/24 20:31' },
      {
        from: 'other',
        text: '它在我身后。它在对我说话。\n\n你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手你是凶手',
        time: '2026/05/24 23:49',
      },
      { from: 'self', text: '对不起，我不知道事情会变成这样……对不起……', time: '2026/05/28 22:24' },
    ],
  },
  {
    id: 'system',
    name: '系统助手',
    messages: [
      {
        from: 'other',
        text: '亲爱的孤独四叶草，你好。\n你的咨询师由【袁知夏】转介成【陆心音】。\n与原咨询师的记录已封存。\n感谢你一如既往地支持心之家。',
        time: '2026/03/18 20:56',
      },
      {
        from: 'other',
        text: '亲爱的孤独四叶草，你好。你已成功预约正念练习（回访）。\n咨询师：陈霁\n预约时间：2026/04/21 21:00\n预约编号：GDSYC-0428-CJ\n\n本站线上咨询内容严格保密，结束后仅本人和咨询师可在工作台中查阅。',
        time: '2026/04/21 22:34',
      },
      {
        from: 'other',
        text: '亲爱的孤独四叶草，你好。你已成功预约线上文字咨询（临时）。\n咨询师：陆心音\n预约时间：2026/05/14 21:00\n预约编号：GDSYC-0514-LXY\n\n本站线上咨询内容严格保密，结束后仅本人和咨询师可在工作台中查阅。\n注：本次临时咨询室由管理员手动确认。',
        time: '2026/05/14 20:34',
      },
    ],
  },
  {
    id: 'lu-xinyin',
    name: '陆心音',
    messages: [
      { from: 'self', text: '陆老师，你在吗？', time: '2026/05/14 20:58:12' },
      {
        from: 'self',
        text: '我有急事，能立刻和你聊吗？我感觉我呼吸不上来了。',
        time: '2026/05/14 20:58:44',
      },
      { from: 'other', text: '我在。你先深呼吸，不着急', time: '2026/05/14 20:59:07' },
      {
        from: 'other',
        text: '今天没有我的session，我帮你申请开通一个临时咨询室，你进来慢慢说。',
        time: '2026/05/14 21:00:11',
      },
    ],
  },
  {
    id: 'yuan',
    name: '袁知夏',
    messages: [
      {
        from: 'self',
        text: '袁老师，是不是因为我说得太多了？\n我知道自己最近状态很差，也知道有些话别人听了会不舒服。\n如果你觉得为难的话，其实不用勉强。',
        time: '2026/03/06 21:31:09',
      },
      {
        from: 'other',
        text: '不是的。你说出来的那些内容，本来就应该被认真对待。让我担心的不是“你说得太多”，而是你已经习惯把很多事都说成“没关系”。\n\n这次转介只是为了让你得到更合适的支持，如果你同意，我今天晚上就提交申请。陆老师可能会在 24 小时内联系你。',
        time: '2026/03/06 21:36:27',
      },
      {
        from: 'other',
        text: '我会再说明一次：转介并不是因为你“太麻烦”，也不是因为我不想继续听你说话。恰恰相反，是因为你现在承受的东西已经不适合只靠普通情绪支持慢慢陪伴了。\n\n我这边主要负责校园适应、人际关系和长期情绪陪伴。你最近描述的一些经历，已经涉及比较明显的创伤反应和持续风险，需要由更熟悉危机干预和创伤知情支持的咨询师继续跟进。\n你已经很努力了。接下来不需要一个人撑着。',
        time: '2026/03/06 21:38:42',
      },
      { from: 'self', text: '好的。那麻烦你了QAQ。', time: '2026/03/06 21:42:58' },
    ],
  },
];

const INNER_POSTS = [
  {
    id: 'bullied-help',
    title: '【求助】被80了怎么办',
    to: '/p/b80a4e6c1f',
  },
  {
    id: 'reply-holiday-flower',
    title: '回复：【置顶】【节日活动】发现你的专属「心灵之花」',
    to: '/p/7c1e4a9f08',
  },
  {
    id: 'reply-moral-kidnapping-rant',
    title: '回复：【吐槽】天天拿抑郁症道德绑架真的很烦',
    to: '/p/8a04e6d3f2',
  },
  {
    id: 'reply-planting-ceremony',
    title: '回复：【公告】第三十一届栽种仪式顺利完成',
    to: '/p/5a1f90d7c3',
  },
];

function formatDateKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isInBookingRange(dateKey) {
  return dateKey >= BOOKING_START && dateKey <= BOOKING_END;
}

function getAvailableCounselorsByDate(dateKey) {
  if (!isInBookingRange(dateKey)) {
    return [];
  }

  const date = new Date(`${dateKey}T00:00:00`);
  const weekday = date.getDay();

  return COUNSELORS.filter((counselor) => !counselor.offWeekdays.includes(weekday));
}

function MarkerIcon({ shape, color }) {
  const wrapperStyle = {
    width: 10,
    height: 10,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    flex: '0 0 10px',
  };

  if (shape === 'triangle') {
    return (
      <span style={wrapperStyle}>
        <span
          style={{
            width: 0,
            height: 0,
            borderLeft: '4px solid transparent',
            borderRight: '4px solid transparent',
            borderBottom: `7px solid ${color}`,
          }}
        />
      </span>
    );
  }

  if (shape === 'star') {
    return (
      <span style={wrapperStyle}>
        <svg width="9" height="9" viewBox="0 0 24 24" aria-hidden="true">
          <path
            d="M12 2.2L14.9 8.1L21.4 9L16.7 13.5L17.9 20L12 16.9L6.1 20L7.3 13.5L2.6 9L9.1 8.1L12 2.2Z"
            fill={color}
          />
        </svg>
      </span>
    );
  }

  return (
    <span style={wrapperStyle}>
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: shape === 'circle' ? 999 : 1,
          background: color,
        }}
      />
    </span>
  );
}

function getThreadPreview(thread) {
  const lastMessage = [...thread.messages].reverse().find((item) => item.type !== 'divider');
  if (!lastMessage) {
    return '';
  }
  if (lastMessage.image) {
    return '[图片]';
  }
  return (lastMessage.text || '').replace(/\s+/g, ' ').trim();
}

function createSeededRandom(seed) {
  let value = seed >>> 0;
  return () => {
    value += 0x6d2b79f5;
    let next = value;
    next = Math.imul(next ^ (next >>> 15), next | 1);
    next ^= next + Math.imul(next ^ (next >>> 7), next | 61);
    return ((next ^ (next >>> 14)) >>> 0) / 4294967296;
  };
}

function collectCorruptibleTextNodes(root) {
  if (!root) {
    return [];
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      const text = node.textContent || '';

      if (!parent || !text.trim()) {
        return NodeFilter.FILTER_REJECT;
      }

      if (parent.closest('script, style, textarea, input')) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  const nodes = [];
  let currentNode = walker.nextNode();

  while (currentNode) {
    nodes.push(currentNode);
    currentNode = walker.nextNode();
  }

  return nodes;
}

function applyWorkspaceCorruption(root, level, seed) {
  const textNodes = collectCorruptibleTextNodes(root);
  const slots = [];

  textNodes.forEach((node) => {
    const originalText = node.__hhOriginalText ?? node.textContent ?? '';
    node.__hhOriginalText = originalText;
    node.textContent = originalText;

    Array.from(originalText).forEach((char, index) => {
      if (/\S/.test(char)) {
        slots.push({ node, index });
      }
    });
  });

  if (!slots.length || level <= 0) {
    return;
  }

  const rng = createSeededRandom(seed);
  const shuffledSlots = [...slots];

  for (let index = shuffledSlots.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(rng() * (index + 1));
    [shuffledSlots[index], shuffledSlots[swapIndex]] = [shuffledSlots[swapIndex], shuffledSlots[index]];
  }

  const mutatedByNode = new Map();
  const appliedCount = Math.min(level, shuffledSlots.length);

  for (let index = 0; index < appliedCount; index += 1) {
    const { node, index: charIndex } = shuffledSlots[index];
    const originalText = node.__hhOriginalText ?? '';
    const chars = mutatedByNode.get(node) ?? Array.from(originalText);
    const fragment = MOJIBAKE_FRAGMENTS[Math.floor(rng() * MOJIBAKE_FRAGMENTS.length)];

    chars[charIndex] = fragment;
    mutatedByNode.set(node, chars);
  }

  mutatedByNode.forEach((chars, node) => {
    node.textContent = chars.join('');
  });
}

export default function InnerForumWorkspace() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('appointment');
  const [selectedDate, setSelectedDate] = useState('2026-06-15');
  const [selectedCounselorId, setSelectedCounselorId] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [selectedThreadId, setSelectedThreadId] = useState(MESSAGE_THREADS[0].id);
  const [previewImageUrl, setPreviewImageUrl] = useState('');
  const [showAppointmentBlockedModal, setShowAppointmentBlockedModal] = useState(false);
  const [noticeModalText, setNoticeModalText] = useState('');
  const [visibleYear, setVisibleYear] = useState(2026);
  const [visibleMonth, setVisibleMonth] = useState(5);
  const [recordCodeInput, setRecordCodeInput] = useState('');
  const [isDraggingChat, setIsDraggingChat] = useState(false);
  const [corruptionLevel, setCorruptionLevel] = useState(0);
  const chatBodyRef = useRef(null);
  const chatDragRef = useRef({ startY: 0, startScrollTop: 0 });
  const workspaceRootRef = useRef(null);
  const corruptionSeedRef = useRef(Math.floor(Math.random() * 0xffffffff));
  const currentIdentity = localStorage.getItem('heartHomeInnerForumIdentity') || '花匠338';

  useEffect(() => {
    const mountedAt = Date.now();

    const syncCorruptionLevel = () => {
      const elapsed = Date.now() - mountedAt;
      const nextLevel =
        elapsed <= CORRUPTION_START_MS
          ? 0
          : Math.floor((elapsed - CORRUPTION_START_MS - 1) / CORRUPTION_STEP_MS) + 1;

      setCorruptionLevel((previousLevel) =>
        previousLevel === nextLevel ? previousLevel : nextLevel,
      );
    };

    syncCorruptionLevel();
    const timer = window.setInterval(syncCorruptionLevel, 1000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const frameId = window.requestAnimationFrame(() => {
      applyWorkspaceCorruption(workspaceRootRef.current, corruptionLevel, corruptionSeedRef.current);
    });

    return () => window.cancelAnimationFrame(frameId);
  });

  const counselorsOnSelectedDate = useMemo(
    () => getAvailableCounselorsByDate(selectedDate),
    [selectedDate],
  );

  const selectedCounselor = useMemo(() => {
    const matched = counselorsOnSelectedDate.find((item) => item.id === selectedCounselorId);
    return matched || counselorsOnSelectedDate[0] || null;
  }, [counselorsOnSelectedDate, selectedCounselorId]);

  const daySlots = selectedCounselor?.slots || [];
  const activeThread = useMemo(
    () => MESSAGE_THREADS.find((thread) => thread.id === selectedThreadId) || MESSAGE_THREADS[0],
    [selectedThreadId],
  );

  const handleSlotClick = () => {
    setShowAppointmentBlockedModal(true);
  };

  const handleChatDragStart = (event) => {
    if (!chatBodyRef.current) {
      return;
    }
    const target = event.target;
    if (
      target instanceof HTMLElement &&
      target.closest('p, span, button, img, a, input, textarea, label, strong, em')
    ) {
      return;
    }
    event.preventDefault();
    setIsDraggingChat(true);
    chatDragRef.current = {
      startY: event.clientY,
      startScrollTop: chatBodyRef.current.scrollTop,
    };
  };

  const handleChatDragMove = (event) => {
    if (!isDraggingChat || !chatBodyRef.current) {
      return;
    }
    event.preventDefault();
    const deltaY = event.clientY - chatDragRef.current.startY;
    chatBodyRef.current.scrollTop = chatDragRef.current.startScrollTop - deltaY;
  };

  const handleChatDragEnd = () => {
    setIsDraggingChat(false);
  };

  const handleChatWheel = (event) => {
    if (!chatBodyRef.current) {
      return;
    }

    event.preventDefault();
    chatBodyRef.current.scrollTop += event.deltaY;
  };

  const handleOpenRecord = (path) => {
    window.open(publicPath(path), '_blank', 'noopener,noreferrer');
  };

  const handleQueryRecordByInput = async () => {
    const normalized = normalizeInput(recordCodeInput).toUpperCase();
    if (!normalized) {
      setNoticeModalText('请输入预约编号。');
      return;
    }

    const hash = await hashWithPepper(normalized, RECORD_CODE_PEPPER);
    const matchedPath = RECORD_HASH_TO_PATH[hash];
    if (!matchedPath) {
      setNoticeModalText('未找到对应咨询记录编号。');
      return;
    }
    handleOpenRecord(matchedPath);
  };

  const monthLabel = `${visibleYear}年${visibleMonth + 1}月`;
  const firstDayOffset = new Date(visibleYear, visibleMonth, 1).getDay();
  const daysInMonth = new Date(visibleYear, visibleMonth + 1, 0).getDate();
  const cells = [
    ...Array.from({ length: firstDayOffset }).map(() => null),
    ...Array.from({ length: daysInMonth }).map((_, index) => index + 1),
  ];

  const renderContent = () => {
    if (activeKey === 'appointment') {
      return (
        <div style={{ ...CARD_STYLE, padding: 18 }}>
          <h2 style={{ margin: '0 0 14px', fontSize: 22, color: '#2f372b' }}>预约咨询</h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1.45fr 1fr', gap: 16 }}>
            <div>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '44px 1fr 44px',
                  border: '1px solid #e0e9e4',
                  borderRadius: 8,
                  overflow: 'hidden',
                  marginBottom: 10,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    const prevMonth = visibleMonth - 1;
                    if (prevMonth < 0) {
                      setVisibleYear((year) => year - 1);
                      setVisibleMonth(11);
                      return;
                    }
                    setVisibleMonth(prevMonth);
                  }}
                  style={{ border: 0, background: '#f4efe5', color: '#6f7463', cursor: 'pointer' }}
                >
                  {'<'}
                </button>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#2a4539' }}>{monthLabel}</div>
                <button
                  type="button"
                  onClick={() => {
                    const nextMonth = visibleMonth + 1;
                    if (nextMonth > 11) {
                      setVisibleYear((year) => year + 1);
                      setVisibleMonth(0);
                      return;
                    }
                    setVisibleMonth(nextMonth);
                  }}
                  style={{ border: 0, background: '#f4efe5', color: '#6f7463', cursor: 'pointer' }}
                >
                  {'>'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8, marginBottom: 8 }}>
                {WEEK_HEADERS.map((item) => (
                  <div key={item} style={{ textAlign: 'center', color: '#807c6b', fontSize: 13 }}>
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: 8 }}>
                {cells.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} style={{ minHeight: 62, background: '#f7f1e8', borderRadius: 8 }} />;
                  }

                  const dateKey = formatDateKey(visibleYear, visibleMonth, day);
                  const availableCounselors = getAvailableCounselorsByDate(dateKey);
                  const canBook = availableCounselors.length > 0;
                  const active = selectedDate === dateKey;

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={!canBook}
                      onClick={() => {
                        setSelectedDate(dateKey);
                        setSelectedCounselorId('');
                        setSelectedSlot('');
                      }}
                      style={{
                        minHeight: 62,
                        borderRadius: 8,
                        border: active ? '1px solid #4b5342' : '1px solid #e0e9e4',
                        background: active ? '#2f372b' : '#fff',
                        color: active ? '#fff' : canBook ? '#3c4436' : '#b3c2ba',
                        cursor: canBook ? 'pointer' : 'not-allowed',
                        fontWeight: active ? 700 : 500,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 6,
                        padding: '4px 0',
                      }}
                    >
                      <div style={{ display: 'flex', gap: 4, minHeight: 8 }}>
                        {availableCounselors.map((counselor) => (
                          <span key={counselor.id} style={{ opacity: active ? 0.95 : 1 }}>
                            <MarkerIcon shape={counselor.marker} color={counselor.color} />
                          </span>
                        ))}
                      </div>
                      <span>{day}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ background: '#4b5342', color: '#fff', borderRadius: 8, padding: '12px 14px', fontWeight: 700, marginBottom: 10 }}>
                {selectedDate || '未选择日期'}
              </div>

              <p style={{ margin: '0 0 10px', color: '#797663', fontSize: 13 }}>当日可预约咨询师</p>

              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 12 }}>
                {counselorsOnSelectedDate.length > 0 ? (
                  counselorsOnSelectedDate.map((counselor) => {
                    const active = selectedCounselor?.id === counselor.id;
                    return (
                      <button
                        key={counselor.id}
                        type="button"
                        onClick={() => {
                          setSelectedCounselorId(counselor.id);
                          setSelectedSlot('');
                        }}
                        style={{
                          border: active ? `1px solid ${counselor.color}` : '1px solid #ddd5c5',
                          background: active ? '#ebe2d2' : '#fff',
                          color: active ? '#4b5342' : '#666d5c',
                          borderRadius: 999,
                          padding: '6px 12px',
                          fontSize: 13,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <MarkerIcon shape={counselor.marker} color={counselor.color} />
                        {counselor.name}
                      </button>
                    );
                  })
                ) : (
                  <p style={{ margin: 0, color: '#807c6b' }}>该日期暂无可预约咨询师。</p>
                )}
              </div>

              <p style={{ margin: '0 0 10px', color: '#797663', fontSize: 13 }}>可预约时间段</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                {daySlots.length > 0 ? (
                  daySlots.map((slot) => {
                    const active = selectedSlot === slot;
                    return (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => {
                          setSelectedSlot(slot);
                          handleSlotClick();
                        }}
                        style={{
                          height: 44,
                          border: active ? '1px solid #4b5342' : '1px solid #8fd0a6',
                          background: active ? '#4b5342' : '#8a957f',
                          color: '#fff',
                          borderRadius: 8,
                          fontSize: 18,
                          fontWeight: 700,
                          cursor: 'pointer',
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })
                ) : (
                  <p style={{ margin: 0, color: '#807c6b', gridColumn: '1 / -1' }}>该日期暂无可预约时段。</p>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (activeKey === 'records') {
      return (
        <div style={CARD_STYLE}>
          <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#2f372b' }}>咨询记录</h2>
          <p style={{ margin: '0 0 12px', color: '#6b705e', lineHeight: 1.8 }}>
            该账户已被管理员封存。请使用预约编号查询咨询记录
          </p>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14, flexWrap: 'wrap' }}>
            <input
              type="text"
              value={recordCodeInput}
              onChange={(event) => setRecordCodeInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  void handleQueryRecordByInput();
                }
              }}
              placeholder="请输入预约编号"
              style={{
                width: 280,
                height: 36,
                border: '1px solid #ddd5c5',
                borderRadius: 8,
                padding: '0 10px',
                fontSize: 14,
                color: '#3e4637',
                background: '#fffdf8',
              }}
            />
            <button
              type="button"
              onClick={() => {
                void handleQueryRecordByInput();
              }}
              style={{
                height: 36,
                border: '1px solid #4b5342',
                borderRadius: 8,
                background: '#fffdf8',
                color: '#4b5342',
                padding: '0 12px',
                cursor: 'pointer',
                fontWeight: 700,
              }}
            >
              查询
            </button>
          </div>
        </div>
      );
    }

    if (activeKey === 'messages') {
      return (
        <div style={{ ...CARD_STYLE, padding: 0, overflow: 'hidden' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '280px minmax(0, 1fr)', height: 690 }}>
            <aside style={{ borderRight: '1px solid #ddd5c5', background: '#fffdf8' }}>
              <h2 style={{ margin: 0, padding: '14px 14px 10px', fontSize: 20, color: '#2f372b' }}>站内私信</h2>
              <div style={{ display: 'grid' }}>
                {MESSAGE_THREADS.map((thread) => {
                  const active = thread.id === activeThread.id;
                  return (
                    <button
                      key={thread.id}
                      type="button"
                      onClick={() => setSelectedThreadId(thread.id)}
                      style={{
                        width: '100%',
                        minWidth: 0,
                        textAlign: 'left',
                        border: 0,
                        borderTop: '1px solid #e8e0d1',
                        padding: '12px 14px',
                        background: '#fffdf8',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      <p style={{ margin: '0 0 4px', color: '#3d4536', fontWeight: 700, fontSize: 15 }}>{thread.name}</p>
                      <p
                        style={{
                          display: 'block',
                          width: '100%',
                          minWidth: 0,
                          margin: 0,
                          color: '#797564',
                          fontSize: 13,
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {getThreadPreview(thread)}
                      </p>
                    </button>
                  );
                })}
              </div>
            </aside>

            <section style={{ background: '#fffdf8', display: 'grid', gridTemplateRows: '56px minmax(0,1fr) 56px', height: 690, overflow: 'hidden' }}>
              <header style={{ borderBottom: '1px solid #e8e0d1', display: 'flex', alignItems: 'center', padding: '0 16px', color: '#3d4536', fontWeight: 700 }}>
                与 {activeThread.name} 的对话
              </header>

              <div
                ref={chatBodyRef}
                onMouseDown={handleChatDragStart}
                onMouseMove={handleChatDragMove}
                onMouseUp={handleChatDragEnd}
                onMouseLeave={handleChatDragEnd}
                onWheel={handleChatWheel}
                style={{
                  padding: '14px 16px',
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  display: 'grid',
                  gap: 10,
                  alignContent: 'start',
                  cursor: isDraggingChat ? 'grabbing' : 'grab',
                  userSelect: isDraggingChat ? 'none' : 'auto',
                  overscrollBehavior: 'contain',
                  minHeight: 0,
                }}
              >
                {activeThread.messages.map((message, index) => {
                  if (message.type === 'divider') {
                    return (
                      <div
                        key={`${activeThread.id}-divider-${index}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                          margin: '6px 0 2px',
                        }}
                      >
                        <div style={{ height: 1, background: '#ddd8cb', flex: 1 }} />
                        <span style={{ color: '#8a8575', fontSize: 12 }}>{message.text}</span>
                        <div style={{ height: 1, background: '#ddd8cb', flex: 1 }} />
                      </div>
                    );
                  }

                  const isSelf = message.from === 'self';
                  return (
                    <div
                      key={`${activeThread.id}-${index}`}
                      style={{
                        display: 'flex',
                        justifyContent: isSelf ? 'flex-end' : 'flex-start',
                      }}
                    >
                      <div
                        style={{
                          maxWidth: 'calc(68% + 2em)',
                          background: isSelf ? '#dff3e6' : '#f2f6f4',
                          border: '1px solid #d3e4db',
                          borderRadius: 10,
                          padding: '8px 10px',
                          color: '#3a4335',
                          fontSize: 14,
                          lineHeight: 1.7,
                        }}
                      >
                        {message.image ? (
                          <button
                            type="button"
                            onClick={() => setPreviewImageUrl(publicPath(message.image))}
                            style={{
                              border: 0,
                              background: 'transparent',
                              padding: 0,
                              cursor: 'zoom-in',
                              display: 'block',
                            }}
                          >
                            <img
                              src={publicPath(message.image)}
                              alt="聊天图片"
                              style={{
                                display: 'block',
                                width: '100%',
                                maxWidth: 340,
                                borderRadius: 8,
                                border: '1px solid #d1dfd8',
                              }}
                            />
                          </button>
                        ) : (
                          <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{message.text}</p>
                        )}
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#807c6b', textAlign: isSelf ? 'right' : 'left' }}>{message.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <footer style={{ borderTop: '1px solid #e8e0d1', display: 'flex', alignItems: 'center', padding: '0 12px', color: '#8a8575', fontSize: 13 }}>
                账户功能异常：当前仅支持查看历史私信，不支持发送新消息。
              </footer>
            </section>
          </div>
        </div>
      );
    }

    if (activeKey === 'posts') {
      return (
        <div style={{ display: 'grid', gap: 12 }}>
          <div style={CARD_STYLE}>
            <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#2f372b' }}>发帖记录</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {INNER_POSTS.map((post) => (
                <a
                  key={post.id}
                  href={publicPath(post.to)}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    border: '1px solid #ddd5c5',
                    borderRadius: 8,
                    padding: '12px 14px',
                    textDecoration: 'none',
                    color: '#394133',
                    fontSize: 16,
                    fontWeight: 700,
                  }}
                >
                  {post.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={CARD_STYLE}>
          <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#2f372b' }}>账户安全</h2>
          <div style={{ display: 'grid', gap: 8, color: '#6b705e', lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>当前登陆身份：{currentIdentity}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      ref={workspaceRootRef}
      style={{
        minHeight: '100vh',
        background: '#f4efe2',
        color: '#2f3629',
        display: 'flex',
        flexDirection: 'column',
        fontFamily:
          'Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Microsoft YaHei", sans-serif',
      }}
    >
      <HeartHomeHeader variant="innerWorkspace" />

      <main style={{ flex: 1, padding: '48px 20px 64px' }}>
        <section
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: '#fffdf8',
            border: '1px solid #ddd5c5',
            borderRadius: 14,
            overflow: 'hidden',
            minHeight: 'calc(100vh - 80px - 112px - 64px)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)' }}>
            <aside
              style={{
                background: '#fffdf8',
                borderRight: '1px solid #e8e0d1',
                padding: 16,
                minHeight: '100%',
              }}
            >
              <h1
                style={{
                  margin: '6px 8px 14px',
                  fontSize: 22,
                  color: '#2f372b',
                  fontWeight: 800,
                }}
              >
                工作台
              </h1>
              <div style={{ display: 'grid', gap: 6 }}>
                {MENU_ITEMS.map((item) => {
                  const active = activeKey === item.key;
                  return (
                    <button
                      key={item.key}
                      type="button"
                      onClick={() => setActiveKey(item.key)}
                      style={{
                        textAlign: 'left',
                        border: active ? '1px solid #4b5342' : '1px solid #ddd5c5',
                        borderRadius: 8,
                        padding: '10px 12px',
                        background: '#fffdf8',
                        color: active ? '#4b5342' : '#4d5446',
                        fontWeight: active ? 700 : 500,
                        cursor: 'pointer',
                      }}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </aside>

            <div style={{ padding: 24, minHeight: '100%' }}>{renderContent()}</div>
          </div>
        </section>
      </main>

      <HeartHomeFooter
        onOpenForum={() => {
          navigate('/p/3e7b10a9c4');
        }}
        variant="innerWorkspace"
      />

      {showAppointmentBlockedModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(34, 37, 28, 0.34)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            padding: 20,
          }}
        >
          <div
            style={{
              width: 'min(460px, 100%)',
              background: '#fffdf8',
              border: '1px solid #d7e4dd',
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(52, 48, 34, 0.18)',
              padding: '24px 22px 18px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#3e4637',
                fontSize: 16,
                lineHeight: 1.8,
                fontWeight: 600,
              }}
            >
              上一次临时咨询未由YD001确认完成，当前无法预约。
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setShowAppointmentBlockedModal(false)}
                style={{
                  height: 34,
                  minWidth: 84,
                  border: '1px solid #4b5342',
                  borderRadius: 8,
                  background: '#fffdf8',
                  color: '#4b5342',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {noticeModalText && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(34, 37, 28, 0.34)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1200,
            padding: 20,
          }}
        >
          <div
            style={{
              width: 'min(460px, 100%)',
              background: '#fffdf8',
              border: '1px solid #d7e4dd',
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(52, 48, 34, 0.18)',
              padding: '24px 22px 18px',
            }}
          >
            <p
              style={{
                margin: 0,
                color: '#3e4637',
                fontSize: 16,
                lineHeight: 1.8,
                fontWeight: 600,
              }}
            >
              {noticeModalText}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setNoticeModalText('')}
                style={{
                  height: 34,
                  minWidth: 84,
                  border: '1px solid #4b5342',
                  borderRadius: 8,
                  background: '#fffdf8',
                  color: '#4b5342',
                  cursor: 'pointer',
                  fontWeight: 700,
                }}
              >
                知道了
              </button>
            </div>
          </div>
        </div>
      )}

      {previewImageUrl && (
        <div
          onClick={() => setPreviewImageUrl('')}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(18, 20, 14, 0.82)',
            zIndex: 1300,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24,
            cursor: 'zoom-out',
          }}
        >
          <img
            src={previewImageUrl}
            alt="放大预览"
            onClick={(event) => event.stopPropagation()}
            style={{
              maxWidth: 'min(1200px, 95vw)',
              maxHeight: '92vh',
              borderRadius: 10,
              boxShadow: '0 20px 60px rgba(0,0,0,0.55)',
            }}
          />
        </div>
      )}
    </div>
  );
}



