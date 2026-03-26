"use client";
// src/components/ExploreLibraryBanner.jsx

import { useMemo } from "react";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* ── helpers ─────────────────────────────────────────────────────────
   Mirror the same splitValues logic from UseCaseLibrary.jsx
──────────────────────────────────────────────────────────────────── */
function splitValues(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}

/* Round DOWN to nearest 10, then append "+" */
function roundedStat(n) {
  return `${Math.floor(n / 10) * 10}+`;
}

export default function ExploreLibraryBanner({ initialData = [] }) {
  /* ── Derive stats from data — same source as UseCaseLibrary ── */
  const { useCaseCount, countryCount } = useMemo(() => {
    const total = initialData.length;

    // collect unique countries across all use cases
    const countrySet = new Set();
    initialData.forEach((uc) => {
      const countries = Array.isArray(uc.Country)
        ? uc.Country
        : splitValues(uc.Country);
      countries.forEach((c) => {
        if (c) countrySet.add(c.trim());
      });
    });

    return {
      useCaseCount: roundedStat(total),
      countryCount: countrySet.size,
    };
  }, [initialData]);

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           EXPLORE LIBRARY BANNER
           ─────────────────────────────────────────────────────────────
           Figma @ 1920px:
             Section  : 1920 × 408px  → 408/1920 = 21.25vw
             BG       : SVG image, cover
             Left pad : 121px → 6.30vw
             Title    : Albert Sans 700, 36px, #1B66D1, lh 100%
             Subtitle : Albert Sans 400, 18px, #2F3A45, lh 100%
             Stat num : Albert Sans 700, 36px, #1B66D1, center
             Stat lbl : Albert Sans 700, 28px, #1B66D1, center
             Divider  : 0.5px solid #2F3A45, height 80px
             Stats box: left 124px, top 2277px
                        each stat block: 161×80px
        ═══════════════════════════════════════════════════════════════ */

        .elb {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          min-height: clamp(240px, 21.25vw, 408px);
          overflow: hidden;
          display: flex;
          align-items: center;
          box-sizing: border-box;
        }

        /* ── Background image ── */
        .elb__bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 101%;
          top: -0.5%;
          object-fit: cover;
          object-position: center;
          display: block;
          z-index: 0;
        }

        /* ── Inner content ── */
        .elb__inner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          gap: clamp(12px, 1.25vw, 24px);
          padding: clamp(24px, 4.17vw, 80px) clamp(24px, 6.30vw, 121px);
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Title: 36px / 1920 = 1.875vw ── */
        .elb__title {
          margin: 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
        }

        /* ── Subtitle: 18px / 1920 = 0.9375vw ── */
        .elb__subtitle {
          margin: 0;
          font-family: ${FONT};
          font-weight: 400;
          font-size: clamp(13px, 0.9375vw, 18px);
          line-height: 1;
          letter-spacing: 0;
          color: #2f3a45;
        }

        /* ── Stats row ── */
        .elb__stats {
          display: flex;
          align-items: center;
          gap: 0;
          margin-top: clamp(4px, 0.52vw, 10px);
        }

        /* Each stat block: 161×80px from Figma */
        .elb__stat {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: clamp(100px, 8.39vw, 161px);   /* 161/1920 */
          min-height: clamp(60px, 4.17vw, 80px); /* 80/1920 */
          gap: clamp(2px, 0.26vw, 5px);
        }

        /* Stat number: 36px bold */
        .elb__stat-num {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
          text-align: center;
        }

        /* Stat label: 28px bold */
        .elb__stat-label {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(16px, 1.46vw, 28px);
          line-height: 1;
          letter-spacing: 0;
          color: #2F3A45;
          text-align: center;
        }

        /* Divider between the two stat blocks */
        .elb__divider {
          width: 0.5px;
          height: clamp(48px, 4.17vw, 80px);
          background: #2F3A45;
          margin: 0 clamp(16px, 1.25vw, 24px);
          flex-shrink: 0;
        }

        /* ════════════════════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════════════════════ */

        @media (max-width: 1024px) {
          .elb__title   { font-size: clamp(20px, 2.8vw, 30px); }
          .elb__subtitle{ font-size: clamp(13px, 1.6vw, 16px); }
          .elb__stat-num{ font-size: clamp(20px, 2.8vw, 30px); }
          .elb__stat-label { font-size: clamp(14px, 2vw, 22px); }
        }

        @media (max-width: 768px) {
          .elb {
            min-height: 0;
            align-items: flex-start;
          }
          .elb__inner {
            padding: 8vw 6vw;
            gap: clamp(10px, 2vw, 18px);
          }
          .elb__title   { font-size: clamp(20px, 4vw, 28px); }
          .elb__subtitle{ font-size: clamp(13px, 2.2vw, 16px); }
          .elb__stat-num{ font-size: clamp(20px, 4vw, 28px); }
          .elb__stat-label { font-size: clamp(14px, 3vw, 20px); }
          .elb__stat    { width: auto; min-height: 0; }
          .elb__divider { height: clamp(40px, 8vw, 60px); }
        }

        @media (max-width: 480px) {
          .elb__inner   { padding: 10vw 5vw; }
          .elb__title   { font-size: clamp(20px, 6vw, 26px); }
          .elb__subtitle{ font-size: 14px; }
          .elb__stat-num{ font-size: clamp(20px, 6vw, 26px); }
          .elb__stat-label { font-size: clamp(14px, 4.5vw, 18px); }
        }
      `}</style>

      <section className="elb" aria-label="Explore digital ID use case library">
        {/* ── Background SVG — swap filename here ── */}
        <img
          src="/home/explore-library-bg.svg"
          alt=""
          aria-hidden="true"
          className="elb__bg"
        />

        <div className="elb__inner">
          {/* Title */}
          <h2 className="elb__title">Explore digital ID use case library</h2>

          {/* Subtitle */}
          <p className="elb__subtitle">
            Explore and learn about active and planned use cases of national
            digital ID across various sectors and countries.
          </p>

          {/* Stats */}
          <div className="elb__stats" aria-label="Library statistics">
            <div className="elb__stat">
              <span className="elb__stat-num">{useCaseCount}</span>
              <span className="elb__stat-label">use case</span>
            </div>

            <div className="elb__divider" aria-hidden="true" />

            <div className="elb__stat">
              <span className="elb__stat-num">{countryCount}</span>
              <span className="elb__stat-label">countries</span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
