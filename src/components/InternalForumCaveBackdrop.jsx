export default function InternalForumCaveBackdrop({ active }) {
  if (!active) {
    return null;
  }

  return (
    <>
      <style>
        {`
          @keyframes innerForumCaveBreath {
            0% {
              opacity: 0;
              filter: saturate(0.95) brightness(0) contrast(1.18);
              transform: scale(1);
            }
            50% {
              opacity: 0.46;
              filter: saturate(1.12) brightness(0.49) contrast(1.3);
              transform: scale(1.022);
            }
            100% {
              opacity: 0;
              filter: saturate(0.95) brightness(0) contrast(1.18);
              transform: scale(1);
            }
          }

          @keyframes innerForumCaveGlowBreath {
            0% { opacity: 0; transform: scale(0.96); }
            48% { opacity: 0.16; transform: scale(1.04); }
            100% { opacity: 0; transform: scale(0.96); }
          }
        `}
      </style>
      <div
        aria-hidden="true"
        style={{
          position: 'fixed',
          inset: 0,
          pointerEvents: 'none',
          zIndex: 0,
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: '-2%',
            backgroundImage: 'url("/images/blog/background.png")',
            backgroundPosition: 'center center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            animation: 'innerForumCaveBreath 9.5s ease-in-out infinite',
            transformOrigin: 'center center',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(circle at 50% 58%, rgba(90, 255, 156, 0.9) 0%, rgba(42, 189, 103, 0.35) 24%, rgba(4, 35, 18, 0.08) 52%, transparent 76%)',
            mixBlendMode: 'screen',
            animation: 'innerForumCaveGlowBreath 9.5s ease-in-out infinite',
            transformOrigin: '50% 58%',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at 50% 54%, rgba(0, 0, 0, 0.02) 0%, rgba(0, 0, 0, 0.12) 42%, rgba(0, 0, 0, 0.54) 78%, rgba(0, 0, 0, 0.82) 100%), linear-gradient(180deg, rgba(0, 0, 0, 0.42) 0%, rgba(0, 0, 0, 0.02) 34%, rgba(0, 0, 0, 0.5) 100%)',
          }}
        />
      </div>
    </>
  );
}
