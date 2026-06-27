import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { publicPath } from '../utils/publicPath';

const NEWS_RED = '#8b0000';
const INK = '#141414';
const PAPER = '#ffffff';
const SOFT_GRAY = '#f3f3f3';

const ADS = [
  {
    layout: 'split',
    image: '/images/news/mingchuan-ad-0.png',
    eyebrow: '限时开放',
    brand: 'NAME FORTUNE',
    title: '姓名测试小工具',
    offer: '免费查看你的本周运势',
    body: '输入姓名，即刻查看本周运势、贵人方位与旧友重逢概率。',
    placeholder: '请输入姓名',
    button: '开始测试',
  },
  {
    layout: 'banner',
    image: '/images/news/mingchuan-ad-1.png',
    eyebrow: '校友系统推荐',
    brand: 'CLASSMATE FINDER',
    title: '寻找多年未见的同学',
    offer: '输入姓名，匹配公开校友信息',
    body: '系统将尝试匹配明川市历年公开校友资料与旧同学录记录。',
    placeholder: '输入本人或同学姓名',
    button: '立即寻找',
  },
  {
    layout: 'poster',
    image: '/images/news/mingchuan-ad-2.png',
    eyebrow: '今日体验名额',
    brand: 'GROWTH ARCHIVE',
    title: '青少年成长档案生成',
    offer: '生成一份只属于你的轨迹报告',
    body: '填写姓名后，系统将生成成长关键词、阶段记录和隐藏标签。',
    placeholder: '请输入档案姓名',
    button: '生成档案',
  },
  {
    layout: 'notice',
    image: '/images/news/mingchuan-ad-3.png',
    eyebrow: '明川旧闻订阅',
    brand: 'PUBLIC RECORD',
    title: '有人正在搜索你的名字',
    offer: '查看公开报道中是否出现过你',
    body: '留下姓名，查看本站公开报道中是否存在相近记录。',
    placeholder: '请输入检索姓名',
    button: '查看记录',
  },
  {
    layout: 'soft',
    image: '/images/news/mingchuan-ad-4.png',
    eyebrow: '公益测试',
    brand: 'FLOWER REPORT',
    title: '你的名字适合哪种花？',
    offer: '领取免费的明川花语性格小报告',
    body: '输入姓名，生成一份花语、性格、睡眠倾向与今日提醒。',
    placeholder: '请输入姓名领取',
    button: '免费领取',
  },
];

function pickRandomAd() {
  return ADS[Math.floor(Math.random() * ADS.length)];
}

function looksLikeName(value) {
  const normalized = value.trim();

  if (!normalized) {
    return false;
  }

  // Accept common Chinese names and a small set of minority name separators.
  if (/^[\u4e00-\u9fff]{2,5}$/.test(normalized)) {
    return true;
  }

  if (/^[\u4e00-\u9fff]{1,4}[·•][\u4e00-\u9fff]{1,6}$/.test(normalized)) {
    return true;
  }

  return false;
}

function CloseButton({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="关闭广告"
      style={{
        position: 'absolute',
        top: 16,
        right: 16,
        width: 38,
        height: 38,
        border: '1px solid #cfcfcf',
        background: PAPER,
        color: INK,
        cursor: 'pointer',
        fontSize: 28,
        lineHeight: '28px',
        fontWeight: 300,
        zIndex: 3,
      }}
    >
      ×
    </button>
  );
}

function ImageBox({ ad, height = '100%', fit = 'cover' }) {
  return (
    <div
      style={{
        height,
        minHeight: 0,
        overflow: 'hidden',
        background: SOFT_GRAY,
      }}
    >
      <img
        src={publicPath(ad.image)}
        alt=""
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          objectFit: fit,
        }}
      />
    </div>
  );
}

function NameForm({
  ad,
  name,
  setName,
  message,
  setMessage,
  onSubmitName,
  compact = false,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim()) {
      setMessage('请先输入文字。');
      return;
    }

    if (!looksLikeName(name)) {
      setMessage('姓名格式不正确。');
      return;
    }

    setMessage('正在连接服务器……请稍候。');
    onSubmitName(name.trim());
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          setMessage('');
        }}
        placeholder={ad.placeholder}
        style={{
          boxSizing: 'border-box',
          width: '100%',
          marginTop: compact ? 14 : 22,
          padding: compact ? '12px 14px' : '15px 16px',
          border: '1px solid #bdbdbd',
          background: PAPER,
          color: INK,
          fontSize: compact ? 15 : 17,
          outline: 'none',
        }}
      />

      <button
        type="submit"
        style={{
          width: '100%',
          marginTop: 12,
          padding: compact ? '12px 14px' : '15px 16px',
          border: `1px solid ${NEWS_RED}`,
          background: NEWS_RED,
          color: '#fff',
          cursor: 'pointer',
          fontSize: compact ? 15 : 16,
          fontWeight: 900,
          letterSpacing: '0.05em',
        }}
      >
        {ad.button}
      </button>

      {message ? (
        <p
          style={{
            margin: '10px 0 0',
            color: NEWS_RED,
            fontSize: 13,
            lineHeight: 1.5,
            fontWeight: 800,
          }}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}

function TextBlock({ ad, align = 'left', light = false }) {
  return (
    <>
      <p
        style={{
          margin: 0,
          color: light ? 'rgba(255,255,255,0.82)' : NEWS_RED,
          fontSize: 13,
          lineHeight: 1.4,
          fontWeight: 900,
          letterSpacing: '0.12em',
          textAlign: align,
        }}
      >
        {ad.eyebrow}
      </p>

      <h3
        style={{
          margin: '8px 0 0',
          color: light ? '#fff' : INK,
          fontSize: align === 'center' ? 40 : 37,
          lineHeight: 1.1,
          fontWeight: 900,
          textAlign: align,
        }}
      >
        {ad.title}
      </h3>

      <p
        style={{
          margin: '12px 0 0',
          color: light ? 'rgba(255,255,255,0.9)' : '#222',
          fontSize: 18,
          lineHeight: 1.45,
          fontWeight: 800,
          textAlign: align,
        }}
      >
        {ad.offer}
      </p>

      <p
        style={{
          margin: '10px 0 0',
          color: light ? 'rgba(255,255,255,0.78)' : '#555',
          fontSize: 14,
          lineHeight: 1.75,
          textAlign: align,
        }}
      >
        {ad.body}
      </p>
    </>
  );
}

function baseCardStyle(width, minHeight, background = PAPER) {
  return {
    position: 'absolute',
    right: 28,
    bottom: 28,
    width: `min(${width}px, calc(100vw - 56px))`,
    minHeight,
    pointerEvents: 'auto',
    background,
    border: '1px solid #d0d0d0',
    boxShadow: '0 30px 90px rgba(0, 0, 0, 0.34)',
    overflow: 'hidden',
    boxSizing: 'border-box',
  };
}

function SplitAd({ ad, close, formProps }) {
  return (
    <aside style={baseCardStyle(720, 390)}>
      <CloseButton onClick={close} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '300px minmax(0, 1fr)',
          minHeight: 390,
        }}
      >
        <ImageBox ad={ad} />
        <div style={{ padding: '42px 38px 34px' }}>
          <TextBlock ad={ad} />
          <NameForm ad={ad} {...formProps} />
        </div>
      </div>
    </aside>
  );
}

function BannerAd({ ad, close, formProps }) {
  return (
    <aside style={baseCardStyle(760, 410)}>
      <CloseButton onClick={close} />
      <ImageBox ad={ad} height={170} />
      <div style={{ padding: '24px 42px 34px', background: '#fafafa' }}>
        <TextBlock ad={ad} align="center" />
        <NameForm ad={ad} {...formProps} compact />
      </div>
    </aside>
  );
}

function PosterAd({ ad, close, formProps }) {
  return (
    <aside style={baseCardStyle(660, 460, '#111')}>
      <ImageBox ad={ad} height={460} />
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(0,0,0,0.78), rgba(0,0,0,0.32))',
        }}
      />
      <CloseButton onClick={close} />
      <div style={{ position: 'absolute', zIndex: 1, left: 42, top: 46, width: 370 }}>
        <p
          style={{
            margin: 0,
            color: 'rgba(255,255,255,0.82)',
            fontSize: 13,
            lineHeight: 1.4,
            fontWeight: 900,
            letterSpacing: '0.12em',
          }}
        >
          {ad.brand}
        </p>
        <TextBlock ad={ad} light />
        <NameForm ad={ad} {...formProps} />
      </div>
    </aside>
  );
}

function NoticeAd({ ad, close, formProps }) {
  return (
    <aside style={baseCardStyle(700, 370)}>
      <CloseButton onClick={close} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 260px',
          minHeight: 370,
        }}
      >
        <div style={{ padding: '42px 38px 34px', borderTop: `8px solid ${NEWS_RED}` }}>
          <TextBlock ad={ad} />
          <NameForm ad={ad} {...formProps} compact />
        </div>
        <ImageBox ad={ad} />
      </div>
    </aside>
  );
}

function SoftAd({ ad, close, formProps }) {
  return (
    <aside style={baseCardStyle(650, 430)}>
      <CloseButton onClick={close} />
      <div style={{ padding: '34px 42px 36px' }}>
        <ImageBox ad={ad} height={128} />
        <div style={{ marginTop: 26 }}>
          <TextBlock ad={ad} align="center" />
          <NameForm ad={ad} {...formProps} compact />
        </div>
      </div>
    </aside>
  );
}

function renderAdLayout(ad, close, formProps) {
  if (ad.layout === 'banner') {
    return <BannerAd ad={ad} close={close} formProps={formProps} />;
  }

  if (ad.layout === 'poster') {
    return <PosterAd ad={ad} close={close} formProps={formProps} />;
  }

  if (ad.layout === 'notice') {
    return <NoticeAd ad={ad} close={close} formProps={formProps} />;
  }

  if (ad.layout === 'soft') {
    return <SoftAd ad={ad} close={close} formProps={formProps} />;
  }

  return <SplitAd ad={ad} close={close} formProps={formProps} />;
}

export default function MingchuanFloatingAds() {
  const navigate = useNavigate();
  const [ad] = useState(() => pickRandomAd());
  const [isClosed, setIsClosed] = useState(false);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmitName = () => {
    window.setTimeout(() => {
      navigate('/p/e08c72fa9d');
    }, 3000);
  };

  if (isClosed) {
    return null;
  }

  return (
    <div
      aria-label="明川新闻网广告"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 900,
        pointerEvents: 'none',
        background: 'rgba(0, 0, 0, 0.22)',
        fontFamily: '"Microsoft YaHei", Arial, sans-serif',
      }}
    >
      {renderAdLayout(ad, () => setIsClosed(true), {
        name,
        setName,
        message,
        setMessage,
        onSubmitName: handleSubmitName,
      })}
    </div>
  );
}
