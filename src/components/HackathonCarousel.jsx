"use client";
// src/components/HackathonCarousel.jsx

import { useEffect, useRef, useState, useCallback } from "react";
import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function getPartnerLogoSrc(partnerName) {
  if (!partnerName) return null;
  const filename = partnerName.replace(/\s+/g, "_").toLowerCase();
  return `${BASE_PATH}/home/partner/${filename}.svg`;
}

const STATUS_CONFIG = {
  Live: { label: "LIVE", isLive: true },
  Completed: { label: "COMPLETED", isLive: false },
};

const AUTOPLAY_MS = 3000;

export default function HackathonCarousel({ items }) {
  const data = items || [];
  const total = data.length;

  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef(null);

  const go = useCallback((next) => setActive((next + total) % total), [total]);

  const prev = () => {
    clearInterval(timerRef.current);
    go(active - 1);
  };
  const next = useCallback(() => {
    clearInterval(timerRef.current);
    go(active + 1);
  }, [active, go]);

  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(next, AUTOPLAY_MS);
    return () => clearInterval(timerRef.current);
  }, [active, paused, next]);

  const leftIdx = (active - 1 + total) % total;
  const rightIdx = (active + 1) % total;

  return (
    <>
      <style>{`
        /* ── Section ── */
        .hc-section {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #eef1fb;
          padding: clamp(24px, 3vw, 48px) 0 clamp(24px, 3vw, 44px);
          box-sizing: border-box;
          font-family: ${FONT};
        }

        /* ── Inner wrapper ── */
        .hc-inner {
          width: 100%;
          margin: 0;
          padding: 0 clamp(24px, 6.30vw, 121px);
          box-sizing: border-box;
        }

        /* ── Stage clip ── */
        .hc-stage-clip {
          overflow: hidden;
          margin: 0 calc(-1 * clamp(24px, 6.30vw, 121px));
          padding: clamp(12px, 1.25vw, 20px) clamp(24px, 6.30vw, 121px);
        }

        /* ── Heading ── */
        .hc-header {
          margin-bottom: clamp(14px, 1.5vw, 24px);
          width: 100%;
        }
        .hc-heading {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(18px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: -0.015em;
          color: #1b66d1;
          margin: 0;
          padding: 0;
          text-align: center;
          display: block;
        }

        /* ── Stage ── */
        .hc-stage {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: clamp(260px, 30vw, 460px);
          padding: clamp(8px, 1vw, 16px) 0;
        }

        /* ── Slots ── */
        .hc-slot {
          position: absolute;
          transition:
            transform  600ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity    500ms cubic-bezier(0.16, 1, 0.3, 1),
            filter     500ms cubic-bezier(0.16, 1, 0.3, 1),
            scale      600ms cubic-bezier(0.16, 1, 0.3, 1);
          will-change: transform, opacity, filter;
        }

        .hc-slot.hc-center {
          position: relative;
          width: clamp(280px, 37.5vw, 720px);
          opacity: 1;
          transform: translateX(0) scale(1);
          z-index: 10;
          filter: none;
          cursor: default;
          border-radius: 20px;
        }

        .hc-slot.hc-side {
          width: clamp(210px, 27.5vw, 530px);
          opacity: 0.55;
          z-index: 5;
          filter: blur(1.5px);
          cursor: pointer;
          border-radius: 20px;
          transition:
            transform  600ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity    400ms cubic-bezier(0.16, 1, 0.3, 1),
            filter     400ms cubic-bezier(0.16, 1, 0.3, 1),
            scale      600ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-slot.hc-side:hover {
          opacity: 0.82;
          filter: blur(0px);
          transition:
            transform  600ms cubic-bezier(0.16, 1, 0.3, 1),
            opacity    200ms ease-out,
            filter     200ms ease-out,
            scale      600ms cubic-bezier(0.16, 1, 0.3, 1);
        }

        .hc-slot.hc-left  { transform: translateX(clamp(-400px, -36vw, -220px)) scale(0.88); }
        .hc-slot.hc-right { transform: translateX(clamp(220px,  36vw,  400px))  scale(0.88); }

        /* ── Card — gap:0, controlled per-child via margin ── */
        .hc-card {
          width: 100%;
          box-sizing: border-box;
          border-radius: 20px;
          padding: clamp(1rem, 1.46vw, 1.75rem) clamp(1rem, 1.46vw, 1.75rem) clamp(0.875rem, 1.25vw, 1.5rem);
          min-height: clamp(220px, 22vw, 400px);
          display: flex;
          flex-direction: column;
          gap: 0;
          position: relative;
          overflow: hidden;
        }

        /* Per-child spacing — tight and consistent */
        .hc-card .hc-badge   { margin-bottom: clamp(0.5rem, 0.63vw, 0.75rem); }
        .hc-card .hc-title   { margin-bottom: clamp(0.25rem, 0.31vw, 0.375rem); }
        .hc-card .hc-desc    { margin-bottom: clamp(0.5rem, 0.63vw, 0.75rem); flex: .5; }
        .hc-card .hc-meta    { margin-bottom: clamp(0.5rem, 0.63vw, 0.75rem); flex: .5; }
        .hc-card .hc-partner { margin-bottom: clamp(0.375rem, 0.52vw, 0.625rem); }

        /* Fade in center card content */
        .hc-slot.hc-center .hc-card {
          animation: hc-content-in 480ms cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes hc-content-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0);   }
        }

        /* COMPLETED */
        .hc-card.hc-completed {
          background: #ffffff;
          border: 1.5px solid #c7c7f0;
          border-radius: 20px;
        }

        /* LIVE */
        .hc-card.hc-live {
          background-image: url('${BASE_PATH}/home/hackathon_background.svg');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          border: 2px solid transparent;
          background-clip: padding-box;
          border-radius: 20px;
        }
        .hc-live-wrap {
          border-radius: 20px;
          padding: 2px;
          background: linear-gradient(135deg, #6FA8FF 0%, #C77CFF 100%);
          box-sizing: border-box;
          width: 100%;
        }
        .hc-live-wrap .hc-card.hc-live {
          border: none;
          background-clip: border-box;
          border-radius: 18px;
        }

        .hc-completed-wrap {
          border-radius: 20px;
          box-sizing: border-box;
          width: 100%;
        }

        /* ── Badge ── */
        .hc-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border-radius: 20px;
          padding: 5px 16px;
          font-size: clamp(10px, 0.625vw, 12px);
          font-weight: 700;
          letter-spacing: 0.06em;
          text-transform: uppercase;
          width: fit-content;
        }
        .hc-badge-live { background: #8A6CFF; color: #fff; }
        .hc-badge-live::before {
          content: "";
          display: inline-block;
          width: 7px; height: 7px;
          border-radius: 50%;
          background: #fff;
          animation: hc-blink 1.2s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes hc-blink {
          0%, 100% { opacity: 1;   }
          50%       { opacity: 0.2; }
        }
        .hc-badge-completed {
          background: transparent;
          color: #475569;
          border: 0.5px solid #1F3A6D;
          font-weight: 500;
        }

        /* ── Title ── */
        .hc-title {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(16px, 1.77vw, 34px);
          color: #1B66D1;
          line-height: 1.2;
          margin: 0;
        }

        /* ── Desc ── */
        .hc-desc {
          font-size: clamp(12px, 0.9375vw, 18px);
          color: #2F3A45;
          line-height: 1.65;
          margin: 0;
          font-weight: 500;
        }

        /* ── Meta ── */
        .hc-meta { display: flex; gap: clamp(16px, 2.08vw, 40px); }
        .hc-meta-item { display: flex; flex-direction: column; gap: 3px; }
        .hc-meta-label {
          font-size: clamp(11px, 0.9375vw, 18px);
          font-weight: 600;
          color: #1F3A6D;
          letter-spacing: 0.04em;
        }
        .hc-meta-value {
          font-size: clamp(11px, 0.9375vw, 18px);
          font-weight: 600;
          color: #2F3A45;
        }

        /* ── Divider ── */
        .hc-divider { border: none; border-top: 1px solid #e2e8f0; }

        /* ── Partner ── */
        .hc-partner { display: flex; align-items: center; gap: 12px; }
        .hc-partner-label {
          font-size: clamp(11px, 0.9375vw, 18px);
          font-weight: 600;
          color: #1F3A6D;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .hc-partner-logo {
          height: clamp(28px, 2.92vw, 56px);
          max-width: clamp(100px, 11vw, 210px);
          object-fit: contain;
        }
        .hc-partner-name { font-size: clamp(11px, 0.68vw, 13px); color: #2F3A45; font-weight: 500; }

        /* ── Button ── */
        .hc-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: clamp(8px, 0.57vw, 11px) clamp(16px, 1.35vw, 26px);
          border-radius: 999px;
          background: #1F3A6D;
          color: #fff;
          font-size: clamp(12px, 0.73vw, 14px);
          font-weight: 600;
          font-family: ${FONT};
          text-decoration: none;
          border: none;
          cursor: pointer;
          width: fit-content;
          transition: background 240ms ease-out, transform 240ms cubic-bezier(0.16, 1, 0.3, 1);
        }
        .hc-btn:hover { background: #1B66D1; transform: translateY(-2px); }
        .hc-btn:active { transform: translateY(0); transition-duration: 80ms; }
        .hc-btn:disabled { opacity: 0.5; cursor: default; transform: none; }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hc-slot,
          .hc-slot.hc-side,
          .hc-slot.hc-side:hover,
          .hc-btn {
            transition-duration: 0ms !important;
            animation: none !important;
          }
          .hc-slot.hc-center .hc-card {
            animation: none !important;
          }
        }

        /* ── Nav ── */
        .hc-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 12px;
          margin-top: clamp(12px, 1.25vw, 24px);
        }
        .hc-arrow {
          width: clamp(32px, 2.29vw, 44px);
          height: clamp(32px, 2.29vw, 44px);
          border-radius: 50%;
          border: 1.5px;
          background: #fff;
          color: #1F3A6D;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: clamp(16px, 1.04vw, 20px);
          line-height: 1;
          transition: background 0.2s, border-color 0.2s, transform 0.15s, color 0.2s;
          flex-shrink: 0;
        }
        .hc-arrow:hover {
          background: #1B66D1; border-color: #1B66D1;
          color: #fff; transform: scale(1.08);
        }

        /* ── Dots ── */
        .hc-dots { display: flex; gap: 8px; align-items: center; }
        .hc-dot {
          height: clamp(6px, 0.42vw, 8px);
          width: clamp(6px, 0.42vw, 8px);
          border-radius: 4px;
          background: #c7d4f0;
          border: none;
          padding: 0;
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .hc-dot.hc-dot-active {
          background: #1B66D1;
          width: clamp(16px, 1.25vw, 24px);
        }

        /* ── Mobile (≤ 480px) ── */
        @media (max-width: 480px) {
          .hc-slot.hc-side { display: none; }

          .hc-section {
            padding: clamp(16px, 4vw, 24px) 0 clamp(16px, 4vw, 22px);
          }
          .hc-inner {
            padding: 0 clamp(16px, 5vw, 24px);
          }
          .hc-stage-clip {
            margin: 0 calc(-1 * clamp(16px, 5vw, 24px));
            padding: 8px clamp(16px, 5vw, 24px);
          }

          .hc-heading { font-size: clamp(15px, 5vw, 18px); }
          .hc-header  { margin-bottom: clamp(10px, 2.5vw, 14px); }

          .hc-slot.hc-center {
            position: relative;
            width: min(92vw, 380px);
          }
          .hc-stage { min-height: 0; padding: 6px 0; }

          .hc-card {
            padding: 0.875rem 0.875rem 0.75rem;
            min-height: 0;
          }
          .hc-card .hc-badge   { margin-bottom: 0.375rem; }
          .hc-card .hc-title   { margin-bottom: 0.25rem; }
          .hc-card .hc-desc    { margin-bottom: 0.5rem; }
          .hc-card .hc-meta    { margin-bottom: 0.375rem; }
          .hc-card .hc-partner { margin-bottom: 0.375rem; }

          .hc-title       { font-size: clamp(14px, 4vw, 17px); }
          .hc-desc        { font-size: 12px; line-height: 1.55; }
          .hc-meta        { gap: 14px; }
          .hc-meta-label,
          .hc-meta-value,
          .hc-partner-label { font-size: 12px; }
          .hc-badge       { font-size: 10px; padding: 3px 9px; }
          .hc-partner-logo  { height: 24px; max-width: 100px; }
          .hc-btn           { font-size: 12px; padding: 7px 14px; }
          .hc-nav           { margin-top: 12px; gap: 8px; }
          .hc-arrow         { width: 28px; height: 28px; font-size: 13px; }
          .hc-dot           { width: 6px; height: 6px; }
          .hc-dot.hc-dot-active { width: 16px; }
        }
      `}</style>

      <section id="hackathon-carousel" className="hc-section">
        <div className="hc-inner">
          {/* ── Header ── */}
          <div className="hc-header">
            <h2 className="hc-heading">
              Explore current and past digital ID hackathons
            </h2>
          </div>

          {/* ── Stage ── */}
          <div className="hc-stage-clip">
            <div className="hc-stage">
              <div
                className="hc-slot hc-side hc-left"
                onClick={prev}
                aria-hidden="true"
              >
                <CardInner item={data[leftIdx]} />
              </div>
              <div className="hc-slot hc-center">
                <CardInner item={data[active]} isActive />
              </div>
              <div
                className="hc-slot hc-side hc-right"
                onClick={next}
                aria-hidden="true"
              >
                <CardInner item={data[rightIdx]} />
              </div>
            </div>
          </div>

          {/* ── Controls ── */}
          <nav className="hc-nav" aria-label="Carousel navigation">
            <button className="hc-arrow" onClick={prev} aria-label="Previous">
              ‹
            </button>
            <div className="hc-dots" role="tablist">
              {data.map((_, i) => (
                <button
                  key={i}
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`hc-dot${i === active ? " hc-dot-active" : ""}`}
                  onClick={() => go(i)}
                />
              ))}
            </div>
            <button className="hc-arrow" onClick={next} aria-label="Next">
              ›
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

/* ─── CardInner ─────────────────────────────────────────────── */
function CardInner({ item, isActive }) {
  const [logoError, setLogoError] = useState(false);

  if (!item) return null;

  const status = item.Status || "Completed";
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG["Completed"];
  const isLive = cfg.isLive;
  const logoSrc = getPartnerLogoSrc(item.Partner);

  const cardContent = (
    <div className={`hc-card ${isLive ? "hc-live" : "hc-completed"}`}>
      <span
        className={`hc-badge ${isLive ? "hc-badge-live" : "hc-badge-completed"}`}
      >
        {cfg.label}
      </span>

      <h3 className="hc-title">{item.Title}</h3>
      <p className="hc-desc">{item.Description}</p>

      <div className="hc-meta">
        {item.Region && (
          <div className="hc-meta-item">
            <span className="hc-meta-label">Region</span>
            <span className="hc-meta-value">{item.Region}</span>
          </div>
        )}
        {item.Timeline && (
          <div className="hc-meta-item">
            <span className="hc-meta-label">Timeline</span>
            <span className="hc-meta-value">{item.Timeline}</span>
          </div>
        )}
      </div>

      {item.Partner && (
        <div className="hc-partner">
          <span className="hc-partner-label">Partner</span>
          {!logoError ? (
            <img
              src={logoSrc}
              alt={item.Partner}
              className="hc-partner-logo"
              onError={() => setLogoError(true)}
            />
          ) : (
            <span className="hc-partner-name">{item.Partner}</span>
          )}
        </div>
      )}

      {isActive && item.URL && (
        <a
          href={item.URL}
          target="_blank"
          rel="noopener noreferrer"
          className="hc-btn"
        >
          Learn more →
        </a>
      )}
      {isActive && !item.URL && (
        <button className="hc-btn" disabled>
          Learn more →
        </button>
      )}
    </div>
  );

  if (isLive) {
    return <div className="hc-live-wrap">{cardContent}</div>;
  }

  return <div className="hc-completed-wrap">{cardContent}</div>;
}
