"use client";
// src/components/HackathonCarousel.jsx

import { useEffect, useRef, useState, useCallback } from "react";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function getPartnerLogoSrc(partnerName) {
  if (!partnerName) return null;
  const filename = partnerName.replace(/\s+/g, "_");
  return `/home/partner/${filename}.svg`;
}

const STATUS_CONFIG = {
  Live: { label: "LIVE", isLive: true },
  Completed: { label: "COMPLETED", isLive: false },
};

const AUTOPLAY_MS = 2000;

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
          padding: clamp(40px, 5vw, 72px) 0 clamp(40px, 5vw, 64px);
          box-sizing: border-box;
          font-family: ${FONT};
        }

        /* ── Inner wrapper ── */
        .hc-inner {
          width: 100%;
          margin: 0;
          padding: 0 clamp(24px, 6.3vw, 121px);
          box-sizing: border-box;
        }

        /* ── Stage clip ── */
        .hc-stage-clip {
          overflow: hidden;
          margin: 0 calc(-1 * clamp(24px, 6.3vw, 121px));
          padding: 28px clamp(24px, 6.3vw, 121px);
        }

        /* ── Heading ── */
        .hc-header {
          margin-bottom: clamp(24px, 2.5vw, 40px);
          width: 100%;
        }
        .hc-heading {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(20px, 2.2vw, 36px);
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
          min-height: 500px;
          padding: 20px 24px 20px;
        }

        /* ── Slots ── */
        .hc-slot {
          position: absolute;
          transition:
            transform  0.6s cubic-bezier(0.4, 0, 0.2, 1),
            opacity    0.6s cubic-bezier(0.4, 0, 0.2, 1),
            filter     0.6s cubic-bezier(0.4, 0, 0.2, 1),
            box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          will-change: transform, opacity;
        }

        /* CENTER card */
        .hc-slot.hc-center {
          position: relative;
          width: clamp(400px, 52vw, 720px);
          opacity: 1;
          transform: scale(1);
          z-index: 10;
          filter: none;
          box-shadow: 0 24px 64px rgba(27, 102, 209, 0.14);
          cursor: default;
          border-radius: 20px;
        }

        /* SIDE cards */
        .hc-slot.hc-side {
          width: clamp(320px, 38vw, 560px);
          opacity: 0.60;
          z-index: 5;
          filter: blur(0.8px);
          cursor: pointer;
          border-radius: 20px;
        }
        .hc-slot.hc-side:hover { opacity: 0.78; filter: blur(0px); }

        .hc-slot.hc-left  { transform: translateX(clamp(-520px, -42vw, -320px)) scale(0.88); }
        .hc-slot.hc-right { transform: translateX(clamp(320px,  42vw,  520px))  scale(0.88); }

        /* ── Card ── */
        .hc-card {
          width: 100%;
          box-sizing: border-box;
          border-radius: 20px;
          padding: 32px 32px 28px;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          overflow: hidden;
        }

        /* COMPLETED */
        .hc-card.hc-completed {
          background: #ffffff;
          border: 1.5px solid #c7c7f0;
          border-radius: 20px;
        }

        /* LIVE */
        .hc-card.hc-live {
          background-image: url('/home/hackathon_background.svg');
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
          font-size: 12px;
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
          font-size: clamp(22px, 1.875vw, 34px);
          color: #1B66D1;
          line-height: 1.2;
          margin: 0;
        }

        /* ── Desc ── */
        .hc-desc {
          font-size: clamp(13px, 0.9375vw, 18px);
          color: #2F3A45;
          line-height: 1.65;
          margin: 0;
          flex: 1;
          font-weight: 500;
        }

        /* ── Meta ── */
        .hc-meta { display: flex; gap: 40px; }
        .hc-meta-item { display: flex; flex-direction: column; gap: 3px; }
        .hc-meta-label {
          font-size: clamp(13px, 0.9375vw, 18px);
          font-weight: 600;
          color: #1F3A6D;
          letter-spacing: 0.04em;
        }
        .hc-meta-value {
          font-size: clamp(13px, 0.9375vw, 18px);
          font-weight: 600;
          color: #2F3A45;
        }

        /* ── Divider ── */
        .hc-divider { border: none; border-top: 1px solid #e2e8f0; margin: 2px 0; }

        /* ── Partner ── */
        .hc-partner { display: flex; align-items: center; gap: 12px; }
        .hc-partner-label {
          font-size: clamp(13px, 0.9375vw, 18px);
          font-weight: 600;
          color: #1F3A6D;
          letter-spacing: 0.04em;
          white-space: nowrap;
        }
        .hc-partner-logo { height: 36px; max-width: 150px; object-fit: contain; }
        .hc-partner-name { font-size: 13px; color: #2F3A45; font-weight: 500; }

        /* ── Button ── */
        .hc-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 6px;
          padding: 11px 26px;
          border-radius: 999px;
          background: #1F3A6D;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          font-family: ${FONT};
          text-decoration: none;
          border: none;
          cursor: pointer;
          width: fit-content;
          transition: background 0.2s, transform 0.15s;
        }
        .hc-btn:hover { background: #1B66D1; transform: translateY(-1px); }
        .hc-btn:disabled { opacity: 0.5; cursor: default; }

        /* ── Nav ── */
        .hc-nav {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 16px;
          margin-top: 40px;
        }
        .hc-arrow {
          width: 44px; height: 44px;
          border-radius: 50%;
          border: 1.5px;
          background: #fff;
          color: #1F3A6D;
          display: flex; align-items: center; justify-content: center;
          cursor: pointer;
          font-size: 20px; line-height: 1;
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
          height: 8px; width: 8px; border-radius: 4px;
          background: #c7d4f0; border: none; padding: 0;
          cursor: pointer;
          transition: background 0.3s, width 0.3s;
        }
        .hc-dot.hc-dot-active { background: #1B66D1; width: 24px; }

        /* ══════════════════════════════════════════════════════════════
           RESPONSIVE — same design & ratios, everything scales together.
           Laptop (1025px–1440px) is the reference; all sizes below
           shrink cards, padding, type, and spacing in the same proportion.
           ══════════════════════════════════════════════════════════════ */

        /* ── Tablet landscape  (769px – 1024px) — ~75% of laptop ── */
        @media (max-width: 1024px) and (min-width: 769px) {
          /* section vertical rhythm */
          .hc-section    { padding: clamp(30px, 4vw, 54px) 0 clamp(30px, 4vw, 48px); }
          /* keep the same horizontal-padding ratio (6.3 vw) — clamp floors change */
          .hc-inner      { padding: 0 clamp(18px, 6.3vw, 90px); }
          .hc-stage-clip {
            margin:  0 calc(-1 * clamp(18px, 6.3vw, 90px));
            padding: 21px clamp(18px, 6.3vw, 90px);
          }

          /* heading */
          .hc-heading { font-size: clamp(15px, 2.2vw, 24px); }
          .hc-header  { margin-bottom: clamp(18px, 2.5vw, 30px); }

          /* slots — same 52 / 38 vw ratios, smaller min/max */
          .hc-slot.hc-center { width: clamp(300px, 52vw, 540px); }
          .hc-slot.hc-side   { width: clamp(240px, 38vw, 420px); opacity: 0.60; filter: blur(0.8px); }
          .hc-slot.hc-left   { transform: translateX(clamp(-390px, -42vw, -240px)) scale(0.88); }
          .hc-slot.hc-right  { transform: translateX(clamp(240px,  42vw,  390px))  scale(0.88); }
          .hc-stage { min-height: 375px; padding: 15px 18px; }

          /* card internals — 75 % of laptop values */
          .hc-card        { padding: 24px 24px 21px; min-height: 315px; gap: 10px; }
          .hc-title       { font-size: clamp(16px, 1.875vw, 26px); }
          .hc-desc        { font-size: clamp(10px, 0.9375vw, 14px); }
          .hc-meta        { gap: 30px; }
          .hc-meta-label,
          .hc-meta-value,
          .hc-partner-label { font-size: clamp(10px, 0.9375vw, 14px); }
          .hc-partner-logo  { height: 27px; max-width: 112px; }
          .hc-btn           { font-size: 13px; padding: 9px 20px; }
          .hc-nav           { margin-top: 30px; gap: 12px; }
          .hc-arrow         { width: 33px; height: 33px; font-size: 15px; }
          .hc-dot           { width: 6px; height: 6px; }
          .hc-dot.hc-dot-active { width: 18px; }
        }

        /* ── Tablet portrait / large mobile  (481px – 768px) — ~55% ── */
        @media (max-width: 768px) and (min-width: 481px) {
          .hc-section    { padding: clamp(22px, 4vw, 40px) 0 clamp(22px, 4vw, 35px); }
          .hc-inner      { padding: 0 clamp(14px, 6.3vw, 64px); }
          .hc-stage-clip {
            margin:  0 calc(-1 * clamp(14px, 6.3vw, 64px));
            padding: 15px clamp(14px, 6.3vw, 64px);
          }

          .hc-heading { font-size: clamp(13px, 2.2vw, 18px); }
          .hc-header  { margin-bottom: clamp(14px, 2.5vw, 22px); }

          .hc-slot.hc-center { width: clamp(220px, 52vw, 400px); }
          .hc-slot.hc-side   { width: clamp(175px, 38vw, 305px); opacity: 0.60; filter: blur(0.8px); }
          .hc-slot.hc-left   { transform: translateX(clamp(-285px, -42vw, -175px)) scale(0.88); }
          .hc-slot.hc-right  { transform: translateX(clamp(175px,  42vw,  285px))  scale(0.88); }
          .hc-stage { min-height: 275px; padding: 12px 14px; }

          .hc-card        { padding: 18px 18px 15px; min-height: 230px; gap: 8px; }
          .hc-title       { font-size: clamp(13px, 1.875vw, 19px); }
          .hc-desc        { font-size: clamp(10px, 0.9375vw, 13px); }
          .hc-meta        { gap: 22px; }
          .hc-meta-label,
          .hc-meta-value,
          .hc-partner-label { font-size: clamp(10px, 0.9375vw, 13px); }
          .hc-badge       { font-size: 10px; padding: 4px 10px; }
          .hc-partner-logo  { height: 20px; max-width: 82px; }
          .hc-btn           { font-size: 11px; padding: 7px 14px; }
          .hc-nav           { margin-top: 22px; gap: 10px; }
          .hc-arrow         { width: 30px; height: 30px; font-size: 14px; }
          .hc-dot           { width: 6px; height: 6px; }
          .hc-dot.hc-dot-active { width: 16px; }
        }

        /* ── Mobile  (≤ 480px) — single card, same card design ── */
        @media (max-width: 480px) {
          /* Side cards hidden — not enough room to peek */
          .hc-slot.hc-side { display: none; }

          .hc-section    { padding: clamp(20px, 5vw, 32px) 0 clamp(20px, 5vw, 28px); }
          .hc-inner      { padding: 0 clamp(12px, 5vw, 24px); }
          .hc-stage-clip {
            margin:  0 calc(-1 * clamp(12px, 5vw, 24px));
            padding: 12px clamp(12px, 5vw, 24px);
          }

          .hc-heading { font-size: clamp(14px, 4.5vw, 18px); }
          .hc-header  { margin-bottom: clamp(12px, 3vw, 18px); }

          .hc-slot.hc-center { position: relative; width: min(92vw, 380px); }
          .hc-stage { min-height: 240px; padding: 10px 8px; }

          .hc-card        { padding: 16px 16px 14px; min-height: 210px; gap: 8px; }
          .hc-title       { font-size: clamp(14px, 4vw, 18px); }
          .hc-desc        { font-size: 12px; line-height: 1.6; }
          .hc-meta        { gap: 16px; }
          .hc-meta-label,
          .hc-meta-value,
          .hc-partner-label { font-size: 12px; }
          .hc-badge       { font-size: 10px; padding: 4px 10px; }
          .hc-partner-logo  { height: 20px; max-width: 80px; }
          .hc-btn           { font-size: 12px; padding: 8px 16px; }
          .hc-nav           { margin-top: 18px; gap: 10px; }
          .hc-arrow         { width: 30px; height: 30px; font-size: 14px; }
          .hc-dot           { width: 6px; height: 6px; }
          .hc-dot.hc-dot-active { width: 16px; }
        }
      `}</style>

      <section
        id="hackathon-carousel"
        className="hc-section"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
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

      <hr className="hc-divider" />

      {item.Partner && (
        <div className="hc-partner">
          <span className="hc-partner-label">Partner</span>
          <img
            src={logoSrc}
            alt={item.Partner}
            className="hc-partner-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              e.currentTarget.nextSibling.style.display = "block";
            }}
          />
          <span className="hc-partner-name" style={{ display: "none" }}>
            {item.Partner}
          </span>
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
