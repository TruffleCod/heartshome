import Balatro from '../components/Balatro';

const plantingRecords = [
  ['1分钟以前', '游*明'],
  ['9分钟以前', '王*'],
  ['15分钟以前', '顾*'],
  ['21分钟以前', '林*福'],
  ['27分钟以前', '王*胜'],
  ['32分钟以前', '朱*莉'],
  ['38分钟以前', '王*师'],
  ['43分钟以前', '欧*雪'],
  ['49分钟以前', '叶*遥'],
  ['54分钟以前', '罗*华'],
  ['59分钟以前', '郭*梅'],
  ['68分钟以前', '马*琳'],
  ['74分钟以前', '周*'],
  ['79分钟以前', '徐*慧'],
  ['85分钟以前', '李*'],
  ['87分钟以前', '张*欣'],
];

const recordRows = Array.from({ length: Math.ceil(plantingRecords.length / 4) }, (_, index) =>
  plantingRecords.slice(index * 4, index * 4 + 4)
);
const latestRecordIndex = 0;

export default function InternalForumPlantingRecords() {
  return (
    <div
      style={{
        minHeight: '100vh',
        color: '#e4ebe6',
        boxSizing: 'border-box',
        fontFamily:
          '"Noto Sans SC", "Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", Arial, sans-serif',
        position: 'relative',
        overflow: 'hidden',
        background: '#030606',
      }}
    >
      <Balatro
        color1="#8b0502"
        color2="#21f2a4"
        color3="#101819"
        contrast={4.1}
        lighting={0.34}
        spinAmount={0.38}
        pixelFilter={820}
        mouseInteraction
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          minHeight: '100vh',
          padding: 'clamp(28px, 6vh, 86px) 24px 54px',
          background:
            'radial-gradient(circle at 50% 22%, rgba(13, 19, 17, 0.38), rgba(0, 0, 0, 0.9) 70%), linear-gradient(180deg, rgba(0, 0, 0, 0.46) 0%, rgba(0, 0, 0, 0.18) 42%, rgba(0, 0, 0, 0.72) 100%)',
          boxSizing: 'border-box',
        }}
      >
        <main
          style={{
            width: 'min(1480px, 100%)',
            margin: '0 auto',
            boxSizing: 'border-box',
            textAlign: 'center',
            textShadow: '0 0 18px rgba(0, 0, 0, 0.65)',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              margin: '0 0 26px',
              color: '#ff333f',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 'clamp(42px, 5vw, 58px)',
                height: 'clamp(42px, 5vw, 58px)',
                borderRadius: 13,
                background: 'linear-gradient(180deg, #ff4a52 0%, #ef232f 100%)',
                color: '#140606',
                fontSize: 'clamp(28px, 3.8vw, 42px)',
                fontWeight: 900,
                lineHeight: 1,
                boxShadow: '0 0 28px rgba(255, 42, 50, 0.34)',
                clipPath: 'polygon(50% 3%, 98% 91%, 2% 91%)',
                paddingTop: 10,
                boxSizing: 'border-box',
              }}
            >
              !
            </span>

            <h1
              style={{
                margin: 0,
                color: '#ff333f',
                fontSize: 'clamp(36px, 5.6vw, 66px)',
                lineHeight: 1.08,
                fontWeight: 900,
                letterSpacing: '0.08em',
              }}
            >
              栽种系统统计
            </h1>
          </div>

          <p
            style={{
              margin: '0 0 20px',
              color: 'rgba(156, 197, 182, 0.72)',
              fontSize: 'clamp(24px, 3.1vw, 38px)',
              lineHeight: 1.2,
              letterSpacing: '0.12em',
              fontWeight: 700,
            }}
          >
            当前已栽种人数
          </p>

          <div
            style={{
              margin: '0 0 24px',
              color: '#e7222c',
              fontFamily: '"Arial Black", Impact, "Microsoft YaHei", sans-serif',
              fontSize: 'clamp(72px, 14vw, 160px)',
              fontWeight: 900,
              lineHeight: 0.95,
              letterSpacing: '0.04em',
              textShadow:
                '0 0 26px rgba(231, 34, 44, 0.24), 3px 0 0 rgba(0, 255, 190, 0.08), -3px 0 0 rgba(255, 0, 0, 0.12)',
            }}
          >
            2,843
          </div>

          <div
            style={{
              width: 'min(700px, 100%)',
              margin: '0 auto 34px',
              border: '1px solid rgba(28, 213, 156, 0.5)',
              borderRightColor: 'rgba(255, 43, 50, 0.4)',
              color: 'rgba(174, 202, 191, 0.72)',
              background: 'rgba(0, 0, 0, 0.18)',
              boxShadow: '0 0 22px rgba(8, 175, 132, 0.1)',
              padding: '18px 24px',
              fontSize: 'clamp(24px, 3.2vw, 38px)',
              lineHeight: 1.25,
              letterSpacing: '0.16em',
              fontWeight: 700,
              boxSizing: 'border-box',
            }}
          >
            所有花朵终将归于同一片土壤
          </div>

          <section
            style={{
              borderTop: '1px solid rgba(35, 185, 145, 0.26)',
              color: '#19c996',
              fontFamily: '"Consolas", "Microsoft YaHei", monospace',
              fontSize: 'clamp(15px, 1.35vw, 20px)',
              fontWeight: 700,
              textAlign: 'left',
              overflowX: 'auto',
            }}
          >
            {recordRows.map((row, rowIndex) => (
              <div
                key={row.map(([time]) => time).join('-')}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, minmax(300px, 1fr))',
                  borderBottom: '1px solid rgba(35, 185, 145, 0.22)',
                  minHeight: 84,
                  minWidth: 1200,
                }}
              >
                {row.map(([time, name], itemIndex) => {
                  const isLatestRecord = rowIndex * 4 + itemIndex === latestRecordIndex;

                  return (
                    <div
                      key={`${time}-${name}`}
                      style={{
                        display: 'grid',
                        gridTemplateColumns: 'auto minmax(max-content, 1fr) auto auto',
                        alignItems: 'center',
                        gap: 12,
                        minWidth: 0,
                        padding: '22px 18px',
                        color: isLatestRecord ? '#ff3945' : '#1bc99a',
                        textShadow: isLatestRecord
                          ? '0 0 16px rgba(255, 57, 69, 0.28)'
                          : '0 0 14px rgba(27, 201, 154, 0.22)',
                        boxSizing: 'border-box',
                      }}
                    >
                      <span>[{time}]</span>
                      <span
                        style={{
                          minWidth: 0,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {name}
                      </span>
                      <span>已栽种</span>
                      {!isLatestRecord && (
                        <span
                          aria-hidden="true"
                          style={{
                            color: 'rgba(44, 218, 171, 0.72)',
                            transform: 'translateY(1px)',
                          }}
                        >
                          ▶
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ))}
          </section>
        </main>
      </div>
    </div>
  );
}
