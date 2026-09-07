import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const substitutions = new Map([
  ['浭', '更'], ['哆', '多'], ['粢', '资'], ['卂', '讯'],
  ['溲', '搜'], ['鎍', '索'], ['遊', '游'], ['戱', '戏'],
  ['洺', '名'], ['稱', '称'], ['垉', '泡'], ['漟', '堂'],
]);

function convertMarsText(value) {
  return Array.from(value, (character) => substitutions.get(character) || character).join('');
}

export default function MarsTextConverter() {
  const [source, setSource] = useState('');
  const result = useMemo(() => convertMarsText(source), [source]);

  return (
    <main style={{ minHeight: '100vh', padding: 'clamp(24px, 7vw, 72px) 20px', boxSizing: 'border-box', background: '#f2f2ed', color: '#272727', fontFamily: '"Microsoft YaHei", system-ui, sans-serif' }}>
      <section style={{ width: 'min(720px, 100%)', margin: '0 auto', padding: 'clamp(22px, 5vw, 42px)', boxSizing: 'border-box', background: '#fff', border: '1px solid #c8c8c0', boxShadow: '0 10px 30px rgba(0,0,0,.08)' }}>
        <p style={{ margin: '0 0 8px', color: '#777', fontSize: 13, letterSpacing: '.12em' }}>MINGCHUAN LOCAL TOOL</p>
        <h1 style={{ margin: '0 0 12px', fontSize: 'clamp(26px, 6vw, 38px)' }}>火星文转换器</h1>
        <p style={{ margin: '0 0 24px', color: '#666', lineHeight: 1.8 }}>把需要辨认的文字粘贴到下面。此工具完全在本地运行，不会连接外部网站。</p>
        <label htmlFor="mars-source" style={{ display: 'block', marginBottom: 8, fontWeight: 700 }}>待转换文字</label>
        <textarea id="mars-source" value={source} onChange={(event) => setSource(event.target.value)} placeholder="粘贴火星文……" rows={6} style={{ width: '100%', padding: 14, boxSizing: 'border-box', resize: 'vertical', border: '1px solid #aaa', borderRadius: 4, font: 'inherit', lineHeight: 1.7 }} />
        <div aria-live="polite" style={{ minHeight: 72, marginTop: 20, padding: 16, background: '#f6f6f2', borderLeft: '4px solid #8b0000', lineHeight: 1.8, wordBreak: 'break-word' }}>
          {result || '转换结果会显示在这里。'}
        </div>
        <Link to="/p/50a8f6c3d1" style={{ display: 'inline-block', marginTop: 24, color: '#8b0000', fontWeight: 700 }}>← 返回新闻</Link>
      </section>
    </main>
  );
}
