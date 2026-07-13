import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import HeartHomeHeader from '../components/HeartHomeHeader';
import HeartHomeFooter from '../components/HeartHomeFooter';
import posts from '../data/posts.json';
import { hashWithPepper, normalizeInput } from '../utils/hash';
import { publicPath } from '../utils/publicPath';

const MENU_ITEMS = [
  { key: 'appointment', label: '预约咨询' },
  { key: 'records', label: '咨询记录' },
  { key: 'messages', label: '站内私信' },
  { key: 'posts', label: '发帖记录' },
  { key: 'security', label: '账户安全' },
];

const CARD_STYLE = {
  background: '#ffffff',
  border: '1px solid #d9e5de',
  borderRadius: 10,
  padding: '16px 18px',
};

const COUNSELORS = [
  {
    id: 'yuan-zhixia',
    name: '袁知夏',
    color: '#2d9fd4',
    marker: 'square',
    offWeekdays: [],
    slots: ['09:30', '11:00', '13:30', '15:00'],
  },
  {
    id: 'chen-ji',
    name: '陈霁',
    color: '#f28db7',
    marker: 'triangle',
    offWeekdays: [0],
    slots: ['10:00', '14:00', '16:30', '19:30'],
  },
  {
    id: 'gu-zhengqing',
    name: '顾正清',
    color: '#d9a51f',
    marker: 'circle',
    offWeekdays: [1, 2, 3, 4, 5],
    slots: ['09:30', '13:00', '15:30', '18:30'],
  },
  {
    id: 'lu-xinyin',
    name: '陆心音',
    color: '#7bc27d',
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
    id: 'fm001',
    name: '未知用户',
    preview: '看看我发现了谁～',
    messages: [
      { from: 'other', text: '看看我发现了谁～', time: '2026/05/14 00:02' },
      {
        from: 'other',
        text: '你以为躲到这种地方发帖就没人能发现吗，烂菜叶～',
        time: '2026/05/14 00:03',
      },
      { from: 'other', image: '/bully-photo.jpg', time: '2026/05/14 00:03' },
      {
        from: 'other',
        text: '照片里你好看吗？真后悔没把你的头发剪的更短一点啊哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈',
        time: '2026/05/14 00:03',
      },
      {
        from: 'other',
        text: '你到网上发帖求助又能怎么样呢？你真以为这些弱智网友能帮到你？我有一百种方式可以让你过得更凄惨。',
        time: '2026/05/14 00:03',
      },
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
        text: '它在我身后。它在对我说话。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n',
        time: '2026/05/24 23:49',
      },
      {
        from: 'other',
        text: '花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n花。\n',
        time: '2026/05/24 23:49',
      },
       {
        from: 'other',
        text: '。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n',
        time: '2026/05/24 23:49',
      },
      { from: 'self', text: '对不起，我不知道事情会变成这样……对不起……', time: '2026/05/28 22:24' },
      {
        from: 'other',
        text: '。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n。\n',
        time: '2026/05/28 23:24',
      },
      {
        from: 'other',
        text: '都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的都是你害的',
        time: '2026/05/28 22:28',
      },
    ],
  },
  {
    id: 'system',
    name: '系统助手',
    preview: '你的咨询师已变更，请查看详情。',
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
    preview: '今天没有我的session，我帮你申请开通一个临时咨询室…',
    messages: [
      {
        from: 'self',
        text: '陆老师，你在吗？',
        time: '2026/05/14 00:58:12',
      },
      {
        from: 'self',
        text: '我有急事，能立刻和你聊吗？我感觉我呼吸不上来了。',
        time: '2026/05/14 00:58:44',
      },
      {
        from: 'other',
        text: '我在：）你先深呼吸，不着急',
        time: '2026/05/14 00:59:07',
      },
      {
        from: 'other',
        text: '现在不是常规的咨询时间，但我可以帮你申请开通一个临时咨询室，你进来慢慢说。',
        time: '2026/05/14 01:00:11',
      },
    ],
  },
  {
    id: 'yuan',
    name: '袁知夏',
    preview: '如果焦虑感加重，请及时留言。',
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
      {
        from: 'self',
        text: '好的。那麻烦你了QAQ。',
        time: '2026/03/06 21:42:58',
      },
    ],
  },
];

function formatDateKey(year, monthIndex, day) {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

function isInBookingRange(dateKey) {
  return dateKey >= BOOKING_START && dateKey <= BOOKING_END;
}

function getAvailableCounselorsByDate(dateKey) {
  const date = new Date(`${dateKey}T00:00:00`);
  const weekday = date.getDay();

  return COUNSELORS.filter((counselor) => !counselor.offWeekdays.includes(weekday));
}

function CounselorColorBar({ color, active, stretch = false }) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: stretch ? '100%' : 18,
        maxWidth: '100%',
        height: 4,
        flex: stretch ? '0 1 auto' : '0 0 18px',
        borderRadius: 999,
        background: color,
        boxShadow: active ? '0 0 0 1px rgba(255,255,255,0.24)' : 'none',
      }}
    />
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

export default function Workspace() {
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState('appointment');
  const [showPassword, setShowPassword] = useState(false);
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
  const chatBodyRef = useRef(null);
  const chatDragRef = useRef({ startY: 0, startScrollTop: 0 });

  const myPosts = useMemo(
    () => posts.filter((post) => post.author === '孤独四叶草'),
    [],
  );

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
          <h2 style={{ margin: '0 0 14px', fontSize: 22, color: '#1f3f2d' }}>预约咨询</h2>

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
                  style={{ border: 0, background: '#f2f6f3', color: '#5c7269', cursor: 'pointer' }}
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
                  style={{ border: 0, background: '#f2f6f3', color: '#5c7269', cursor: 'pointer' }}
                >
                  {'>'}
                </button>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 10, marginBottom: 10 }}>
                {WEEK_HEADERS.map((item) => (
                  <div key={item} style={{ textAlign: 'center', color: '#6f837a', fontSize: 16, lineHeight: 1.8 }}>
                    {item}
                  </div>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, minmax(0, 1fr))', gap: 10 }}>
                {cells.map((day, index) => {
                  if (!day) {
                    return <div key={`empty-${index}`} style={{ width: '100%', minWidth: 0, aspectRatio: '1 / 1', background: '#f6f8f7', borderRadius: 10 }} />;
                  }

                  const dateKey = formatDateKey(visibleYear, visibleMonth, day);
                  const availableCounselors = getAvailableCounselorsByDate(dateKey);
                  const hasSchedule = availableCounselors.length > 0;
                  const canBook = isInBookingRange(dateKey);
                  const active = selectedDate === dateKey;
                  const calendarCellBackground = active
                    ? '#1f3f2d'
                    : canBook
                      ? '#fff'
                      : hasSchedule
                        ? '#f1f6f3'
                        : '#f6f8f7';
                  const calendarCellBorder = active
                    ? '2px solid #111f18'
                    : canBook
                      ? '1px solid #d7e6dc'
                      : '1px solid #e7eee9';

                  return (
                    <button
                      key={dateKey}
                      type="button"
                      disabled={!hasSchedule}
                      onClick={() => {
                        setSelectedDate(dateKey);
                        setSelectedCounselorId('');
                        setSelectedSlot('');
                      }}
                      style={{
                        aspectRatio: '1 / 1',
                        width: '100%',
                        minWidth: 0,
                        borderRadius: 10,
                        border: calendarCellBorder,
                        background: calendarCellBackground,
                        color: active ? '#fff' : canBook ? '#2e463d' : hasSchedule ? '#6f837a' : '#b3c2ba',
                        cursor: hasSchedule ? 'pointer' : 'not-allowed',
                        fontWeight: active ? 800 : 500,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 6,
                        padding: '12px 8px 10px',
                        boxShadow: active ? '0 8px 18px rgba(31, 63, 45, 0.2)' : '0 2px 8px rgba(31, 63, 45, 0.04)',
                      }}
                    >
                      <div
                        style={{
                          display: 'grid',
                          gridTemplateColumns: `repeat(${Math.max(availableCounselors.length, 1)}, minmax(0, 1fr))`,
                          gap: 3,
                          minHeight: 8,
                          justifyContent: 'center',
                          width: '100%',
                          maxWidth: 76,
                          overflow: 'hidden',
                          opacity: canBook || active ? 1 : 0.72,
                        }}
                      >
                        {availableCounselors.map((counselor) => (
                          <span key={counselor.id} style={{ opacity: active ? 0.95 : 1, minWidth: 0 }}>
                            <CounselorColorBar color={counselor.color} active={active} stretch />
                          </span>
                        ))}
                      </div>
                      <span style={{ fontSize: 18, lineHeight: 1 }}>{day}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div style={{ background: '#44554f', color: '#fff', borderRadius: 8, padding: '12px 14px', fontWeight: 700, marginBottom: 10 }}>
                {selectedDate || '未选择日期'}
              </div>

              <p style={{ margin: '0 0 10px', color: '#6a7e75', fontSize: 13 }}>当日可预约咨询师</p>

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
                          border: active ? `1px solid ${counselor.color}` : '1px solid #d9e5de',
                          background: active ? '#eaf6ef' : '#fff',
                          color: active ? '#1f6f3a' : '#4a5f56',
                          borderRadius: 999,
                          padding: '6px 12px',
                          fontSize: 13,
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                        }}
                      >
                        <CounselorColorBar color={counselor.color} active={active} />
                        {counselor.name}
                      </button>
                    );
                  })
                ) : (
                  <p style={{ margin: 0, color: '#6f837a' }}>该日期暂无可预约咨询师。</p>
                )}
              </div>

              <p style={{ margin: '0 0 10px', color: '#6a7e75', fontSize: 13 }}>可预约时间段</p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: 10 }}>
                {daySlots.length > 0 ? (
                  daySlots.map((slot) => {
                    const active = selectedSlot === slot;
                    const canBookSelectedDate = isInBookingRange(selectedDate);
                    return (
                      <button
                        key={slot}
                        type="button"
                        disabled={!canBookSelectedDate}
                        onClick={() => {
                          if (!canBookSelectedDate) {
                            return;
                          }
                          setSelectedSlot(slot);
                          handleSlotClick();
                        }}
                        style={{
                          height: 44,
                          border: active ? '1px solid #2f7a4a' : '1px solid #8fd0a6',
                          background: canBookSelectedDate
                            ? active
                              ? '#2f7a4a'
                              : '#58b778'
                            : '#d9e5de',
                          color: '#fff',
                          borderRadius: 8,
                          fontSize: 18,
                          fontWeight: 700,
                          cursor: canBookSelectedDate ? 'pointer' : 'not-allowed',
                          opacity: canBookSelectedDate ? 1 : 0.72,
                        }}
                      >
                        {slot}
                      </button>
                    );
                  })
                ) : (
                  <p style={{ margin: 0, color: '#6f837a', gridColumn: '1 / -1' }}>该日期暂无可预约时段。</p>
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
          <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#1f3f2d' }}>咨询记录</h2>
          <p style={{ margin: '0 0 12px', color: '#5e756d', lineHeight: 1.8 }}>
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
                border: '1px solid #d9e5de',
                borderRadius: 8,
                padding: '0 10px',
                fontSize: 14,
                color: '#2d4740',
                background: '#ffffff',
              }}
            />
            <button
              type="button"
              onClick={() => {
                void handleQueryRecordByInput();
              }}
              style={{
                height: 36,
                border: '1px solid #2f7a4a',
                borderRadius: 8,
                background: '#ffffff',
                color: '#1f6f3a',
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
            <aside style={{ borderRight: '1px solid #d9e5de', background: '#f9fcfa' }}>
              <h2 style={{ margin: 0, padding: '14px 14px 10px', fontSize: 20, color: '#1f3f2d' }}>站内私信</h2>
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
                        borderTop: '1px solid #e6efea',
                        padding: '12px 14px',
                        background: active ? '#eaf6ef' : '#f9fcfa',
                        cursor: 'pointer',
                        overflow: 'hidden',
                      }}
                    >
                      <p style={{ margin: '0 0 4px', color: '#234337', fontWeight: 700, fontSize: 15 }}>{thread.name}</p>
                      <p
                        style={{
                          display: 'block',
                          width: '100%',
                          minWidth: 0,
                          margin: 0,
                          color: '#678078',
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

            <section style={{ background: '#ffffff', display: 'grid', gridTemplateRows: '56px minmax(0,1fr) 56px', height: 690, overflow: 'hidden' }}>
              <header style={{ borderBottom: '1px solid #e6efea', display: 'flex', alignItems: 'center', padding: '0 16px', color: '#234337', fontWeight: 700 }}>
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
                        <div style={{ height: 1, background: '#dbe6e0', flex: 1 }} />
                        <span style={{ color: '#7a8f86', fontSize: 12 }}>{message.text}</span>
                        <div style={{ height: 1, background: '#dbe6e0', flex: 1 }} />
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
                          color: '#2e4a40',
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
                        <p style={{ margin: '4px 0 0', fontSize: 12, color: '#6f857c', textAlign: isSelf ? 'right' : 'left' }}>{message.time}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <footer style={{ borderTop: '1px solid #e6efea', display: 'flex', alignItems: 'center', padding: '0 12px', color: '#7a8f86', fontSize: 13 }}>
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
            <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#1f3f2d' }}>发帖记录</h2>
            {myPosts.length === 0 ? (
              <p style={{ margin: 0, color: '#5e756d', lineHeight: 1.8 }}>因疑似违禁发言，账号锁定中，暂时无法查看发帖记录。</p>
            ) : (
              <div style={{ display: 'grid', gap: 12 }}>
                {myPosts.map((post) => (
                  <div key={post.id} style={{ border: '1px solid #d9e5de', borderRadius: 8, padding: '12px 14px' }}>
                    <p style={{ margin: '0 0 6px', color: '#224534', fontSize: 16, fontWeight: 700 }}>
                      {post.title}
                    </p>
                    <p style={{ margin: 0, color: '#6b8179', fontSize: 13 }}>{post.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      );
    }

    return (
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={CARD_STYLE}>
          <h2 style={{ margin: '0 0 10px', fontSize: 20, color: '#1f3f2d' }}>账户安全</h2>
          <div style={{ display: 'grid', gap: 8, color: '#5e756d', lineHeight: 1.8 }}>
            <p style={{ margin: 0 }}>账户ID：孤独四叶草</p>
            <p style={{ margin: 0 }}>绑定邮箱：未验证</p>
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 8 }}>
              密码：{showPassword ? 'LoveIris0615' : '••••••••'}
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                aria-label={showPassword ? '隐藏密码' : '显示密码'}
                style={{
                  border: '1px solid #d9e5de',
                  background: '#ffffff',
                  borderRadius: 6,
                  width: 24,
                  height: 24,
                  cursor: 'pointer',
                  fontSize: 13,
                  color: '#3b4f46',
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  {showPassword ? (
                    <>
                      <path
                        d="M3 3L21 21"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                      <path
                        d="M9.9 5.2C10.6 5.07 11.29 5 12 5C17.2 5 21 9 22 12C21.63 13.1 21.02 14.28 20.15 15.35M14.1 14.1C13.56 14.65 12.81 15 12 15C10.34 15 9 13.66 9 12C9 11.19 9.35 10.44 9.9 9.9M6.27 6.26C4.2 7.68 2.76 9.86 2 12C3 15 6.8 19 12 19C13.95 19 15.67 18.44 17.14 17.56"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </>
                  ) : (
                    <>
                      <path
                        d="M2 12C3 9 6.8 5 12 5C17.2 5 21 9 22 12C21 15 17.2 19 12 19C6.8 19 3 15 2 12Z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        r="3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </>
                  )}
                </svg>
              </button>
            </p>
            <p style={{ margin: 0 }}>注册时间：2025-11-14</p>
            <p style={{ margin: 0 }}>上次登录：2026-06-15</p>
            <p style={{ margin: 0 }}>安全提示问题1：我最喜欢的花是什么？</p>
            <label style={{ margin: 0, display: 'grid', gap: 4 }}>
              <span>安全提示答案：</span>
              <input
                type="text"
                value="鸢尾花"
                readOnly
                disabled
                style={{
                  width: 220,
                  height: 30,
                  border: '1px solid #d9e5de',
                  borderRadius: 6,
                  padding: '0 10px',
                  background: '#f5f7f6',
                  color: '#6a7c74',
                  fontSize: 14,
                }}
              />
            </label>
            <p style={{ margin: 0 }}>安全提示问题2：我的小学班主任叫什么名字？</p>
            <label style={{ margin: 0, display: 'grid', gap: 4 }}>
              <span>安全提示答案：</span>
              <input
                type="text"
                value="张建芳"
                readOnly
                disabled
                style={{
                  width: 220,
                  height: 30,
                  border: '1px solid #d9e5de',
                  borderRadius: 6,
                  padding: '0 10px',
                  background: '#f5f7f6',
                  color: '#6a7c74',
                  fontSize: 14,
                }}
              />
            </label>
            <p style={{ margin: 0 }}>安全提示问题3：我的第一只宠物的名字？</p>
            <label style={{ margin: 0, display: 'grid', gap: 4 }}>
              <span>安全提示答案：</span>
              <input
                type="text"
                value="塔塔"
                readOnly
                disabled
                style={{
                  width: 220,
                  height: 30,
                  border: '1px solid #d9e5de',
                  borderRadius: 6,
                  padding: '0 10px',
                  background: '#f5f7f6',
                  color: '#6a7c74',
                  fontSize: 14,
                }}
              />
            </label>
            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 12,
                textDecoration: 'underline',
                color: '#6f827a',
              }}
            >
              账号锁定中，暂时不支持修改ID、密码和密保问题。
            </p>
          </div>
        </div>
      </div>
    );
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

      <main style={{ flex: 1, padding: '48px 20px 64px' }}>
        <section
          style={{
            maxWidth: 1100,
            margin: '0 auto',
            background: '#ffffff',
            border: '1px solid #d9e5de',
            borderRadius: 14,
            overflow: 'hidden',
            minHeight: 'calc(100vh - 80px - 112px - 64px)',
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '220px minmax(0, 1fr)' }}>
            <aside
              style={{
                background: '#f8fbf9',
                borderRight: '1px solid #e3ece7',
                padding: 16,
                minHeight: '100%',
              }}
            >
              <h1
                style={{
                  margin: '6px 8px 14px',
                  fontSize: 22,
                  color: '#1f3f2d',
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
                        border: active ? '1px solid #2f7a4a' : '1px solid #d9e5de',
                        borderRadius: 8,
                        padding: '10px 12px',
                        background: active ? '#eaf6ef' : '#ffffff',
                        color: active ? '#1f6f3a' : '#3b4f46',
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
          navigate('/p/b12e8f40a6');
        }}
      />

      {showAppointmentBlockedModal && (
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
              width: 'min(460px, 100%)',
              background: '#ffffff',
              border: '1px solid #d7e4dd',
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(15, 44, 31, 0.22)',
              padding: '24px 22px 18px',
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
              上一次临时咨询未由YD001确认完成，当前无法预约。
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setShowAppointmentBlockedModal(false)}
                style={{
                  height: 34,
                  minWidth: 84,
                  border: '1px solid #2f7a4a',
                  borderRadius: 8,
                  background: '#ffffff',
                  color: '#1f6f3a',
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
              width: 'min(460px, 100%)',
              background: '#ffffff',
              border: '1px solid #d7e4dd',
              borderRadius: 12,
              boxShadow: '0 18px 48px rgba(15, 44, 31, 0.22)',
              padding: '24px 22px 18px',
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
              {noticeModalText}
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
              <button
                type="button"
                onClick={() => setNoticeModalText('')}
                style={{
                  height: 34,
                  minWidth: 84,
                  border: '1px solid #2f7a4a',
                  borderRadius: 8,
                  background: '#ffffff',
                  color: '#1f6f3a',
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
            background: 'rgba(8, 20, 17, 0.82)',
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
