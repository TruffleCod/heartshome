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
      className="planting-records-page"
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
      <style>{`
        .hh-input-mode-touch .planting-records-page {
          overflow-x: hidden !important;
        }

        .hh-input-mode-touch .planting-records-main {
          max-width: 100% !important;
          overflow-x: hidden !important;
        }

        .hh-input-mode-touch .planting-records-list {
          overflow-x: visible !important;
          width: 100% !important;
          max-width: 100% !important;
          box-sizing: border-box !important;
        }

        .hh-input-mode-touch .planting-records-row {
          min-width: 0 !important;
          width: 100% !important;
          max-width: 100% !important;
          grid-template-columns: repeat(4, minmax(0, 1fr)) !important;
        }

        .hh-input-mode-touch .planting-records-item {
          min-width: 0 !important;
          grid-template-columns: auto auto !important;
          justify-content: start !important;
          align-content: center !important;
          gap: 6px 12px !important;
          padding: 16px 12px !important;
          font-size: clamp(12px, 1.2vw, 15px) !important;
        }

        .hh-input-mode-touch .planting-records-item span {
          min-width: 0 !important;
          white-space: nowrap !important;
          overflow-wrap: normal !important;
          word-break: keep-all !important;
        }

        .hh-input-mode-touch .planting-records-time {
          grid-column: 1 / 2 !important;
        }

        .hh-input-mode-touch .planting-records-name {
          grid-column: 1 / 2 !important;
          opacity: 0.94 !important;
        }

        .hh-input-mode-touch .planting-records-status {
          grid-column: 2 / 3 !important;
          grid-row: 1 / 3 !important;
          align-self: center !important;
          white-space: nowrap !important;
        }

        .hh-input-mode-touch .planting-records-arrow {
          display: none !important;
        }

        @media (max-width: 820px) {
          .hh-input-mode-touch .planting-records-shell,
          .planting-records-page .planting-records-shell { padding: 26px 16px 42px !important; }
          .hh-input-mode-touch .planting-records-main,
          .planting-records-page .planting-records-main { width: 100% !important; }
          .planting-records-heading { gap: 10px !important; margin-bottom: 16px !important; }
          .planting-records-alert {
            width: clamp(28px, 8vw, 38px) !important;
            height: clamp(28px, 8vw, 38px) !important;
            border-radius: 9px !important;
            font-size: clamp(20px, 5.8vw, 28px) !important;
            padding-top: 6px !important;
          }
          .planting-records-title {
            font-size: clamp(21px, 6vw, 28px) !important;
            line-height: 1.16 !important;
            letter-spacing: 0.03em !important;
            white-space: nowrap !important;
          }
          .planting-records-label {
            margin-bottom: 10px !important;
            font-size: clamp(15px, 4.4vw, 20px) !important;
            line-height: 1.25 !important;
            letter-spacing: 0.04em !important;
          }
          .planting-records-total {
            margin-bottom: 16px !important;
            font-size: clamp(48px, 17vw, 78px) !important;
            line-height: 0.95 !important;
            letter-spacing: 0.02em !important;
          }
          .planting-records-slogan {
            width: 100% !important;
            margin-bottom: 24px !important;
            padding: 14px 16px !important;
            font-size: clamp(17px, 5vw, 22px) !important;
            line-height: 1.35 !important;
            letter-spacing: 0.06em !important;
          }
          .hh-input-mode-touch .planting-records-list,
          .planting-records-page .planting-records-list {
            overflow-x: visible !important;
            font-size: clamp(12px, 3.45vw, 14px) !important;
          }
          .hh-input-mode-touch .planting-records-row,
          .planting-records-page .planting-records-row {
            display: grid !important;
            grid-template-columns: 1fr !important;
            min-width: 0 !important;
            min-height: 0 !important;
            border-bottom: 0 !important;
          }
          .hh-input-mode-touch .planting-records-item,
          .planting-records-page .planting-records-item {
            grid-template-columns: minmax(0, 1fr) auto !important;
            justify-content: stretch !important;
            gap: 8px 10px !important;
            min-width: 0 !important;
            padding: 12px 0 !important;
            border-bottom: 1px solid rgba(35, 185, 145, 0.22) !important;
          }
          .hh-input-mode-touch .planting-records-item span,
          .planting-records-page .planting-records-item span {
            min-width: 0 !important;
            overflow-wrap: anywhere !important;
            white-space: normal !important;
          }
          .hh-input-mode-touch .planting-records-time,
          .planting-records-page .planting-records-time { grid-column: 1 / 2 !important; }
          .hh-input-mode-touch .planting-records-status,
          .planting-records-page .planting-records-status {
            grid-column: 2 / 3 !important;
            grid-row: 1 / 3 !important;
            align-self: center !important;
            white-space: nowrap !important;
          }
          .hh-input-mode-touch .planting-records-name,
          .planting-records-page .planting-records-name {
            grid-column: 1 / 2 !important;
            font-size: 0.95em !important;
            opacity: 0.92 !important;
          }
          .hh-input-mode-touch .planting-records-arrow,
          .planting-records-page .planting-records-arrow { display: none !important; }
        }
      `}</style>

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
        className="planting-records-shell"
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
          className="planting-records-main"
          style={{
            width: 'min(1480px, 100%)',
            margin: '0 auto',
            boxSizing: 'border-box',
            textAlign: 'center',
            textShadow: '0 0 18px rgba(0, 0, 0, 0.65)',
          }}
        >
          <div
            className="planting-records-heading"
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
              className="planting-records-alert"
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
              className="planting-records-title"
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
            className="planting-records-label"
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
            className="planting-records-total"
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
            className="planting-records-slogan"
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
            className="planting-records-list"
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
                className="planting-records-row"
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
                      className="planting-records-item"
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
                      <span className="planting-records-time">[{time}]</span>
                      <span
                        className="planting-records-name"
                        style={{
                          minWidth: 0,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {name}
                      </span>
                      <span className="planting-records-status">已栽种</span>
                      {!isLatestRecord && (
                        <span
                          className="planting-records-arrow"
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
