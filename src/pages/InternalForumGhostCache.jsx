import { useEffect, useRef, useState } from 'react';

import { publicPath } from '../utils/publicPath';
import { preloadImages } from '../utils/preloadAssets';

const RUNNER_WIDTH = 126;
const RUNNER_HEIGHT = 126;
const RUNNER_X = 72;
const GROUND_HEIGHT = 50;
const GAME_HEIGHT = 220;
const JUMP_VELOCITY = 770;
const GRAVITY = 2150;
const GAME_SPEED = 335;
const SCORE_TARGET = 31;
const CLOUD_SPEED = GAME_SPEED;
const ANIMATION_INTERVAL_MS = 180;
const LETTER_SEQUENCE = ['U', 'R', 'N', 'E', 'Z', 'L', 'U', 'R', 'N', 'E', 'G'];
const FLOWER_SOURCES = [
  '/images/followup/flower-1.png',
  '/images/followup/flower-2.png',
  '/images/followup/flower-3.png',
];
const GAME_IMAGE_SOURCES = [
  '/images/followup/dino-1.png',
  '/images/followup/dino-2.png',
  '/images/followup/dino-3.png',
  '/images/followup/human-1.png',
  '/images/followup/human-2.png',
  '/images/followup/heart.png',
  ...FLOWER_SOURCES,
];

const GROUND_LIBRARY = [
  {
    type: 'flower',
    kind: 'hazard',
    score: 1,
    collisionInsetX: 24,
    collisionInsetY: 26,
    createVariant: () => {
      const width = 64;
      const height = 64;
      const src = FLOWER_SOURCES[Math.floor(Math.random() * FLOWER_SOURCES.length)];
      return {
        width,
        height,
        baseY: -1,
        render: () => (
          <img
            src={publicPath(src)}
            alt=""
            aria-hidden="true"
            style={{
              display: 'block',
              width: `${width}px`,
              height: `${height}px`,
              objectFit: 'contain',
              imageRendering: 'pixelated',
            }}
          />
        ),
      };
    },
  },
  {
    type: 'human',
    kind: 'hazard',
    score: 1,
    collisionInsetX: 22,
    collisionInsetY: 24,
    createVariant: () => {
      const width = 52;
      const height = 72;
      return {
        width,
        height,
        baseY: -1,
        render: (animationFrame = 0) => (
          <img
            src={publicPath(animationFrame % 2 === 0 ? '/images/followup/human-1.png' : '/images/followup/human-2.png')}
            alt=""
            aria-hidden="true"
            style={{
              display: 'block',
              width: `${width}px`,
              height: `${height}px`,
              objectFit: 'contain',
              imageRendering: 'pixelated',
            }}
          />
        ),
      };
    },
  },
];

const BONUS_LIBRARY = [
  {
    type: 'heart',
    kind: 'bonus',
    score: 2,
    width: 42,
    height: 42,
    collisionInsetX: 8,
    collisionInsetY: 8,
    render: () => (
      <img
        src={publicPath('images/followup/heart.png')}
        alt=""
        aria-hidden="true"
        style={{
          display: 'block',
          width: '42px',
          height: '42px',
          objectFit: 'contain',
          imageRendering: 'pixelated',
        }}
      />
    ),
  },
];

function renderRunner(phase, animationFrame) {
  const runnerSrc =
    phase === 'running'
      ? animationFrame % 2 === 0
        ? '/images/followup/dino-2.png'
        : '/images/followup/dino-3.png'
      : '/images/followup/dino-1.png';

  return (
    <img
      src={publicPath(runnerSrc)}
      alt=""
      aria-hidden="true"
      style={{
        display: 'block',
        width: `${RUNNER_WIDTH}px`,
        height: `${RUNNER_HEIGHT}px`,
        objectFit: 'contain',
        imageRendering: 'pixelated',
      }}
    />
  );
}

function renderCloud(width = 96) {
  return (
    <svg width={width} height="24" viewBox="0 0 74 24" aria-hidden="true">
      <path
        d="M16 19H56C61 19 65 16 65 12C65 8 61 5 56 5C54 2 50 1 46 1C40 1 36 4 34 8C33 7 31 7 29 7C24 7 20 10 20 14C18 14 16 16 16 19Z"
        fill="none"
        stroke="#d0d2d8"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function createObstacle(id, width) {
  const spawnHeart = Math.random() < 0.24;

  if (spawnHeart) {
    const model = BONUS_LIBRARY[0];
    return {
      id,
      type: model.type,
      kind: model.kind,
      x: width + 24,
      width: model.width,
      height: model.height,
      baseY: 82,
      scored: false,
      render: model.render,
      score: model.score,
      collisionInsetX: model.collisionInsetX,
      collisionInsetY: model.collisionInsetY,
    };
  }

  const model = GROUND_LIBRARY[Math.floor(Math.random() * GROUND_LIBRARY.length)];
  const variant = model.createVariant();
  return {
    id,
    type: model.type,
    kind: model.kind,
    width: variant.width,
    height: variant.height,
    baseY: variant.baseY,
    x: width + 24,
    scored: false,
    render: variant.render,
    score: model.score,
    collisionInsetX: model.collisionInsetX,
    collisionInsetY: model.collisionInsetY,
  };
}

export default function InternalForumGhostCache() {
  const gameShellRef = useRef(null);
  const frameRef = useRef(null);
  const spawnTimeoutRef = useRef(0);
  const obstacleIdRef = useRef(0);
  const gameStateRef = useRef({
    phase: 'idle',
    runnerY: 0,
    velocityY: 0,
    obstacles: [],
    score: 0,
    width: 880,
    locked: false,
    hasStarted: false,
    cloudOffset: 0,
    animationFrame: 0,
    backgroundTravel: 0,
  });

  const [gameState, setGameState] = useState(gameStateRef.current);

  useEffect(() => {
    preloadImages(GAME_IMAGE_SOURCES);
  }, []);

  const handleCloseTab = () => {
    window.close();
    window.open('', '_self');
    window.close();
  };

  useEffect(() => {
    const syncWidth = () => {
      if (!gameShellRef.current) {
        return;
      }
      const nextWidth = Math.max(540, Math.min(980, Math.floor(gameShellRef.current.clientWidth)));
      gameStateRef.current = {
        ...gameStateRef.current,
        width: nextWidth,
      };
      setGameState(gameStateRef.current);
    };

    syncWidth();
    window.addEventListener('resize', syncWidth);
    return () => window.removeEventListener('resize', syncWidth);
  }, []);

  useEffect(() => {
    const startRun = () => {
      window.clearTimeout(spawnTimeoutRef.current);
      obstacleIdRef.current = 0;
      const nextState = {
        phase: 'running',
        runnerY: 0,
        velocityY: 0,
        obstacles: [],
        score: 0,
        width: gameStateRef.current.width,
        locked: false,
        hasStarted: true,
        cloudOffset: 0,
        animationFrame: 0,
        backgroundTravel: 0,
      };
      gameStateRef.current = nextState;
      setGameState(nextState);
      scheduleSpawn();
    };

    const triggerJump = () => {
      const current = gameStateRef.current;
      if (current.phase === 'idle' || current.phase === 'gameover') {
        startRun();
        return;
      }

      if (current.phase !== 'running' || current.locked) {
        return;
      }

      if (current.runnerY === 0) {
        gameStateRef.current = {
          ...current,
          velocityY: JUMP_VELOCITY,
        };
      }
    };

    const handleKeyDown = (event) => {
      if (event.code !== 'Space') {
        return;
      }
      event.preventDefault();
      triggerJump();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    let lastFrame = performance.now();

    const tick = (now) => {
      const elapsed = Math.min((now - lastFrame) / 1000, 0.03);
      lastFrame = now;

      const current = gameStateRef.current;
      if (current.phase === 'running') {
        let runnerY = current.runnerY;
        let velocityY = current.velocityY;

        if (runnerY > 0 || velocityY > 0) {
          runnerY += velocityY * elapsed;
          velocityY -= GRAVITY * elapsed;
          if (runnerY <= 0) {
            runnerY = 0;
            velocityY = 0;
          }
        }

        const obstacles = current.obstacles
          .map((obstacle) => ({
            ...obstacle,
            x: obstacle.x - GAME_SPEED * elapsed,
          }))
          .filter((obstacle) => obstacle.x + obstacle.width > -12);

        let score = current.score;
        const cloudOffset = (current.cloudOffset + CLOUD_SPEED * elapsed) % (current.width + 180);
        const animationFrame = Math.floor(now / ANIMATION_INTERVAL_MS) % 2;
        const backgroundTravel = current.backgroundTravel + GAME_SPEED * elapsed;
        const letterSpan = current.width + 220;
        const lettersRevealed = Math.min(
          LETTER_SEQUENCE.length,
          Math.floor(backgroundTravel / letterSpan) + 1
        );
        obstacles.forEach((obstacle) => {
          if (
            obstacle.kind === 'hazard' &&
            !obstacle.scored &&
            obstacle.x + obstacle.width < RUNNER_X
          ) {
            obstacle.scored = true;
            score += obstacle.score;
          }
        });

        const groundY = GAME_HEIGHT - GROUND_HEIGHT;
        const runnerTop = groundY - runnerY - RUNNER_HEIGHT + 34;
        const runnerBottom = groundY - runnerY - 22;
        const runnerLeft = RUNNER_X + 28;
        const runnerRight = RUNNER_X + RUNNER_WIDTH - 44;

        const hitObstacle = obstacles.some((obstacle) => {
          if (obstacle.kind !== 'hazard') {
            return false;
          }
          const obstacleTop = groundY - obstacle.height + obstacle.baseY;
          const obstacleBottom = groundY + obstacle.baseY;
          const obstacleLeft = obstacle.x + obstacle.collisionInsetX;
          const obstacleRight = obstacle.x + obstacle.width - obstacle.collisionInsetX;
          const adjustedTop = obstacleTop + obstacle.collisionInsetY;
          const adjustedBottom = obstacleBottom - obstacle.collisionInsetY;

          return (
            runnerRight > obstacleLeft &&
            runnerLeft < obstacleRight &&
            runnerBottom > adjustedTop &&
            runnerTop < adjustedBottom
          );
        });

        const remainingObstacles = [];
        obstacles.forEach((obstacle) => {
          if (obstacle.kind !== 'bonus') {
            remainingObstacles.push(obstacle);
            return;
          }

          const obstacleTop = groundY - obstacle.baseY - obstacle.height;
          const obstacleBottom = groundY - obstacle.baseY;
          const obstacleLeft = obstacle.x + obstacle.collisionInsetX;
          const obstacleRight = obstacle.x + obstacle.width - obstacle.collisionInsetX;
          const adjustedTop = obstacleTop + obstacle.collisionInsetY;
          const adjustedBottom = obstacleBottom - obstacle.collisionInsetY;
          const collected =
            runnerRight > obstacleLeft &&
            runnerLeft < obstacleRight &&
            runnerBottom > adjustedTop &&
            runnerTop < adjustedBottom;

          if (collected) {
            score += obstacle.score;
            return;
          }

          remainingObstacles.push(obstacle);
        });

        if (lettersRevealed < LETTER_SEQUENCE.length) {
          score = Math.min(score, SCORE_TARGET - 1);
        }

        let nextPhase = current.phase;
        let locked = current.locked;

        if (score >= SCORE_TARGET && !current.locked) {
          nextPhase = 'success';
          locked = true;
          window.clearTimeout(spawnTimeoutRef.current);
        } else if (hitObstacle) {
          nextPhase = 'gameover';
          window.clearTimeout(spawnTimeoutRef.current);
        }

        const nextState = {
          ...current,
          phase: nextPhase,
          runnerY,
          velocityY,
          obstacles: remainingObstacles,
          score,
          locked,
          hasStarted: current.hasStarted,
          cloudOffset,
          animationFrame,
          backgroundTravel,
        };

        gameStateRef.current = nextState;
        setGameState(nextState);
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current) {
        window.cancelAnimationFrame(frameRef.current);
      }
      window.clearTimeout(spawnTimeoutRef.current);
    };
  }, []);

  const scheduleSpawn = () => {
    const delay = 520 + Math.random() * 1560 + (Math.random() < 0.32 ? 420 : 0);
    spawnTimeoutRef.current = window.setTimeout(() => {
      const current = gameStateRef.current;
      if (current.phase !== 'running') {
        return;
      }

      const nextObstacle = createObstacle(obstacleIdRef.current + 1, current.width);
      obstacleIdRef.current += 1;
      const nextState = {
        ...current,
        obstacles: [...current.obstacles, nextObstacle],
      };
      gameStateRef.current = nextState;
      setGameState(nextState);
      scheduleSpawn();
    }, delay);
  };

  const isIdle = gameState.phase === 'idle';
  const isGameOver = gameState.phase === 'gameover';
  const isSuccess = gameState.phase === 'success';
  const showScore = gameState.hasStarted;
  const cloudSpan = gameState.width + 180;
  const cloudOneX = ((gameState.width * 0.1 - gameState.cloudOffset) % cloudSpan + cloudSpan) % cloudSpan - 90;
  const cloudTwoX =
    ((gameState.width * 0.62 - gameState.cloudOffset * 0.7) % cloudSpan + cloudSpan) % cloudSpan - 90;
  const letterSpan = gameState.width + 220;
  const rawLetterIndex = Math.floor(gameState.backgroundTravel / letterSpan);
  const clampedLetterIndex = Math.min(rawLetterIndex, LETTER_SEQUENCE.length);
  const letterProgress = gameState.backgroundTravel - clampedLetterIndex * letterSpan;
  const showLetter = clampedLetterIndex < LETTER_SEQUENCE.length;
  const letterX = gameState.width - letterProgress + 96;
  const currentLetter = showLetter ? LETTER_SEQUENCE[clampedLetterIndex] : '';

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#fbfbfc',
        color: '#575d67',
        padding: '0 24px 10px',
        boxSizing: 'border-box',
        fontFamily:
          '"PingFang SC", "Microsoft YaHei", "Segoe UI", Arial, sans-serif',
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px 0 54px',
          boxSizing: 'border-box',
        }}
      >
        <div
          ref={gameShellRef}
          style={{
            width: 'min(980px, 100%)',
            textAlign: 'center',
            position: 'relative',
          }}
        >
          <div
            style={{
              opacity: isSuccess ? 0.08 : 1,
              transition: 'opacity 180ms ease',
            }}
          >
          <div
            style={{
              width: 'min(860px, 100%)',
              margin: '0 auto 18px',
              height: GAME_HEIGHT,
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: cloudOneX,
                top: 28,
                opacity: 0.8,
              }}
            >
              {renderCloud(70)}
            </div>
            <div
              style={{
                position: 'absolute',
                left: cloudTwoX,
                top: 48,
                opacity: 0.85,
              }}
            >
              {renderCloud(82)}
            </div>
            {showLetter && (
              <div
                style={{
                  position: 'absolute',
                  left: letterX,
                  top: 14,
                  width: 32,
                  textAlign: 'center',
                  color: 'rgba(110, 114, 122, 0.4)',
                  fontSize: 28,
                  fontWeight: 700,
                  lineHeight: 1,
                  letterSpacing: '0.04em',
                  userSelect: 'none',
                  zIndex: 2,
                }}
              >
                {currentLetter}
              </div>
            )}

            <div
              style={{
                position: 'absolute',
                left: RUNNER_X,
                bottom: GROUND_HEIGHT + gameState.runnerY,
                width: RUNNER_WIDTH,
                height: RUNNER_HEIGHT,
                transform: gameState.phase === 'running' ? 'translateY(0)' : 'translateY(1px)',
                zIndex: 3,
              }}
            >
              {renderRunner(gameState.phase, gameState.animationFrame)}
            </div>

            {gameState.obstacles.map((obstacle) => (
              <div
                key={obstacle.id}
                style={{
                  position: 'absolute',
                  left: obstacle.x,
                  bottom:
                    obstacle.kind === 'bonus'
                      ? GROUND_HEIGHT + obstacle.baseY
                      : GROUND_HEIGHT + obstacle.baseY,
                  width: obstacle.width,
                  height: obstacle.height,
                  zIndex: 1,
                }}
              >
                {obstacle.render(gameState.animationFrame)}
              </div>
            ))}

            <div
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: GROUND_HEIGHT - 2,
                borderTop: '2px solid #7c8088',
              }}
            />

            {showScore && (
              <div
                style={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: '#696e77',
                  fontSize: 18,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                }}
              >
                {String(gameState.score).padStart(2, '0')}
              </div>
            )}
          </div>

          <div style={{ marginTop: 20 }}>
            <h1
              style={{
                margin: 0,
                color: '#585d67',
                fontSize: 'clamp(46px, 7vw, 62px)',
                fontWeight: 700,
                lineHeight: 1.12,
                letterSpacing: 0,
              }}
            >
              抱歉，页面无法访问…
            </h1>
            <p
              style={{
                margin: '18px 0 0',
                color: '#757b84',
                fontSize: 'clamp(22px, 3.6vw, 32px)',
                lineHeight: 1.5,
              }}
            >
              网址已失效：可能页面已删除，地址变更等
            </p>
            <p
              style={{
                margin: '56px 0 0',
                color: '#666b74',
                fontSize: 'clamp(22px, 3vw, 18px)',
                lineHeight: 1.6,
              }}
            >
              Oops, this page does not exist. Press space to start over.
            </p>
          </div>

          {isGameOver && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  marginTop: 108,
                  padding: '10px 18px',
                  borderRadius: 999,
                  background: 'rgba(255, 255, 255, 0.84)',
                  color: '#656a73',
                  fontSize: 14,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                Press space to restart
              </div>
            </div>
          )}
          </div>

          {isSuccess && (
            <div
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(248, 248, 249, 0.92)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 24,
              }}
            >
              <div
                style={{
                  width: 'min(520px, 100%)',
                  border: '1px solid #d6d8dd',
                  background: '#ffffff',
                  boxShadow: '0 22px 60px rgba(40, 42, 46, 0.16)',
                  padding: '34px 30px',
                  textAlign: 'center',
                }}
              >
                <div
                  style={{
                    color: '#a10000',
                    fontSize: 16,
                    fontWeight: 700,
                    letterSpacing: '0.12em',
                    marginBottom: 14,
                  }}
                >
                  INVESTIGATOR REWARD
                </div>
                <div
                  style={{
                    color: '#3f444d',
                    fontSize: 28,
                    fontWeight: 700,
                    lineHeight: 1.45,
                  }}
                >
                  <div>恭喜您通关！</div>
                  <div style={{ marginTop: 10 }}>password hint：ROT13</div>
                </div>
                <button
                  type="button"
                  onClick={handleCloseTab}
                  style={{
                    marginTop: 22,
                    minWidth: 128,
                    padding: '12px 20px',
                    border: '1px solid #d6d8dd',
                    background: '#ffffff',
                    color: '#4f5560',
                    fontSize: 15,
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  退出
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          marginBottom: 8,
          padding: '12px 20px 10px',
          textAlign: 'center',
          color: '#ffffff',
          fontSize: 15,
          fontWeight: 700,
          letterSpacing: '0.01em',
          userSelect: 'none',
          textShadow: '0 1px 2px rgba(120, 126, 136, 0.45)',
          opacity: 0.96,
        }}
      >
        © 心之家 Project 当前页面收集进度 43/46
      </div>
    </div>
  );
}
