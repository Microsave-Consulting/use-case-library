"use client";
// src/components/WhoIsThisPlatformFor.jsx

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const ITEMS = [
  // Left column
  [
    "Startups and innovators working on DPI-led innovations",
    "Policymakers designing national digital ID systems",
    "Researchers studying Digital Public Infrastructure",
  ],
  // Right column
  [
    "Developers building digital identity–enabled applications",
    "Students exploring Digital ID innovation",
    "Organizations implementing digital services",
  ],
];

/* Gradient chevron SVG — #6FA8FF → #C77CFF, matches Figma 11.49×20px */
function GradientArrow() {
  return (
    <svg
      width="12"
      height="20"
      viewBox="0 0 12 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <defs>
        <linearGradient id="witp-arrow-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6FA8FF" />
          <stop offset="100%" stopColor="#C77CFF" />
        </linearGradient>
      </defs>
      <path
        d="M2 2L10 10L2 18"
        stroke="url(#witp-arrow-grad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function WhoIsThisPlatformFor() {
  return (
    <>
      <style>{`
        /* ── Section — full-width, white bg ── */
        .witp-section {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          padding: clamp(40px, 4.17vw, 80px) 0;
          box-sizing: border-box;
          font-family: ${FONT};
        }

        /* ── Inner — left: 121px at 1920px ── */
        .witp-inner {
          width: 100%;
         
          
          padding: 0 clamp(24px, 6.3vw, 121px);
          box-sizing: border-box;
        }

        /* ── Title — Albert Sans 700, 36px, #1B66D1 ── */
        .witp-title {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
          margin: 0 0 clamp(24px, 2.5vw, 48px) 0;
          padding: 0;
          text-align: left;
          display: block;
        }

        /* ── Two-column grid ── */
        .witp-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: clamp(12px, 1.5vw, 24px) clamp(32px, 4vw, 150px);
        }

        /* ── Each list item row ── */
        .witp-item {
          display: flex;
          align-items: center;
          gap: clamp(10px, 0.83vw, 16px);
          padding: clamp(8px, 0.83vw, 16px) 0;
        }

        /* ── Item text — Albert Sans 400, 20px, #2F3A45 ── */
        .witp-item-text {
          font-family: ${FONT};
          font-weight: 400;
          font-size: clamp(13px, 1.04vw, 20px);
          line-height: 1;
          letter-spacing: 0;
          color: #2f3a45;
          margin: 0;
        }

        /* ── Responsive ── */
        @media (max-width: 1024px) {
          .witp-title { font-size: clamp(20px, 2.8vw, 30px); }
          .witp-item-text { font-size: clamp(13px, 1.6vw, 18px); }
        }

        @media (max-width: 768px) {
          .witp-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .witp-title { font-size: clamp(20px, 4vw, 28px); }
          .witp-item-text { font-size: clamp(13px, 2.2vw, 16px); }
        }

        @media (max-width: 480px) {
          .witp-title { font-size: clamp(18px, 6vw, 24px); }
          .witp-item-text { font-size: 14px; }
        }
      `}</style>

      <section className="witp-section" aria-labelledby="witp-title">
        <div className="witp-inner">
          {/* Title */}
          <h2 className="witp-title" id="witp-title">
            Who is this platform for?
          </h2>

          {/* Two-column grid */}
          <div className="witp-grid">
            {ITEMS.map((col, ci) => (
              <div key={ci}>
                {col.map((text, ri) => (
                  <div className="witp-item" key={ri}>
                    <GradientArrow />
                    <p className="witp-item-text">{text}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
