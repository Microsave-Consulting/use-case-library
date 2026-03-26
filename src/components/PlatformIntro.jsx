"use client";
// src/components/PlatformIntro.jsx

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export default function PlatformIntro() {
  return (
    <>
      <style>{`
        .platform-intro {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          overflow: hidden;

          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3.5vw 12.76vw; /* ← CHANGED: was 2.08vw */
        }

        .platform-intro__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          display: block;
          z-index: 0;
        }

        .platform-intro__text {
          position: relative;
          z-index: 1;
          margin: 0;
          font-family: ${FONT};
          font-weight: 500;
          font-size: clamp(14px, 1.04vw, 20px);
          line-height: 1.4;
          letter-spacing: 0;
          color: #2f3a45;
          text-align: center;
          width: 74.32vw;
          max-width: 74.32vw;
        }

        @media (max-width: 1024px) {
          .platform-intro {
            padding: 4.5vw 8vw; /* ← CHANGED: was 3vw */
          }
          .platform-intro__text {
            font-size: clamp(14px, 1.6vw, 18px);
            width: 85vw;
            max-width: 85vw;
          }
        }

        @media (max-width: 768px) {
          .platform-intro {
            padding: 6.5vw 6vw; /* ← CHANGED: was 5vw */
          }
          .platform-intro__text {
            font-size: clamp(13px, 2.2vw, 16px);
            width: 100%;
            max-width: 100%;
          }
        }

        @media (max-width: 480px) {
          .platform-intro {
            padding: 7.5vw 5vw; /* ← CHANGED: was 6vw */
          }
          .platform-intro__text {
            font-size: clamp(13px, 3.2vw, 15px);
            line-height: 1.5;
          }
        }
      `}</style>

      <section className="platform-intro" aria-label="Platform introduction">
        <img
          src="/home/platform-intro.svg"
          alt=""
          aria-hidden="true"
          className="platform-intro__bg"
        />

        <p className="platform-intro__text">
          This platform showcases how digital identity systems can and are being
          used across various sectors, countries, and regions. It also supports
          innovation through hackathons that bring together young innovators,
          start-ups, the private sector, academia and the governments to design
          new Digital ID use cases.
        </p>
      </section>
    </>
  );
}
