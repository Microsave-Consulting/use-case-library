"use client";
// src/components/HeroBanner.jsx

import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export default function HeroBanner() {
  const router = useRouter();

  return (
    <>
      <style>{`
        .hero-section {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          height: clamp(420px, 36.13vw, 694px);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── Background img (replaces Next/Image fill) ─────────────────
           position:absolute + inset:0 + object-fit:cover
           guarantees zero gaps — no wrapper span, no inline baseline gap
        ──────────────────────────────────────────────────────────────── */
        .hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 101%;        /* slightly overdraw to kill subpixel gap */
  top: -0.5%;          /* centre the overdraw so it bleeds equally top & bottom */
  object-fit: cover;
  object-position: center center;
  display: block;
  z-index: 0;
  pointer-events: none;
  user-select: none;
}

        .hero-content {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          width: 100%;
          max-width: clamp(300px, 32.81vw, 630px);
          padding: 0;
          gap: clamp(6px, 0.73vw, 14px);
        }

        .hero-h1 {
          margin: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .hero-title-line1 {
          font-family: ${FONT};
          font-weight: 800;
          font-size: clamp(22px, 2.08vw, 40px);
          line-height: 1.1;
          color: #334155;
          letter-spacing: 0;
        }

        .hero-title-line2 {
          font-family: ${FONT};
          font-weight: 800;
          font-size: clamp(22px, 2.08vw, 40px);
          line-height: 1.1;
          color: #1b66d1;
          letter-spacing: 0;
        }

        .hero-subtitle-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: clamp(10px, 1.04vw, 20px);
          max-width: clamp(240px, 22.76vw, 437px);
          width: 100%;
        }

        .hero-subtitle {
          margin: 0;
          font-family: ${FONT};
          font-weight: 500;
          font-size: clamp(12px, 0.83vw, 16px);
          line-height: 1.45;
          color: #2f3a45;
          text-align: center;
        }

        .hero-initiative {
          margin: 0;
          font-family: ${FONT};
          font-weight: 500;
          font-size: clamp(11px, 0.73vw, 14px);
          line-height: 1;
          color: #5a6266;
          text-align: center;
        }

        .hero-btns {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 0.87vw, 17px);
          flex-wrap: nowrap;
          width: 100%;
          max-width: clamp(280px, 21.73vw, 418px);
          margin-top: clamp(12px, 1.30vw, 25px);
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: clamp(34px, 2.28vw, 44px);
          border-radius: 999px;
          border: 0.5px solid #1f3a6d;
          font-family: ${FONT};
          font-weight: 500;
          font-size: clamp(11px, 0.73vw, 14px);
          line-height: 1;
          cursor: pointer;
          white-space: nowrap;
          flex-shrink: 0;
          transition: opacity 150ms ease, transform 120ms ease;
          padding: 0;
        }

        .hero-btn:hover  { transform: translateY(-1px); }
        .hero-btn:active { transform: translateY(0); }

        .hero-btn-primary {
          background: #1f3a6d;
          color: #ffffff;
          width: clamp(140px, 10.04vw, 193px);
        }

        .hero-btn-secondary {
          background: #ffffff;
          color: #1f3a6d;
          width: clamp(150px, 10.82vw, 208px);
        }

        @media (max-width: 1024px) {
          .hero-content {
            max-width: clamp(320px, 55vw, 560px);
          }
          .hero-subtitle-wrap {
            max-width: clamp(260px, 48vw, 460px);
          }
          .hero-btns {
            max-width: clamp(300px, 42vw, 430px);
          }
          .hero-btn-primary   { width: clamp(140px, 18vw, 200px); }
          .hero-btn-secondary { width: clamp(155px, 19vw, 215px); }
        }

        @media (max-width: 768px) {
          .hero-content {
            max-width: 72%;
            gap: clamp(8px, 1.5vw, 14px);
          }
          .hero-title-line1,
          .hero-title-line2 {
            font-size: clamp(20px, 3.5vw, 34px);
          }
          .hero-subtitle-wrap {
            max-width: 90%;
            gap: clamp(8px, 1.5vw, 16px);
          }
          .hero-subtitle   { font-size: clamp(12px, 1.8vw, 15px); }
          .hero-initiative { font-size: clamp(11px, 1.6vw, 13px); }
          .hero-btns {
            max-width: 90%;
            gap: clamp(8px, 1.5vw, 14px);
            margin-top: clamp(10px, 2vw, 20px);
          }
          .hero-btn-primary   { width: clamp(130px, 22vw, 180px); }
          .hero-btn-secondary { width: clamp(140px, 24vw, 195px); }
          .hero-btn {
            height: clamp(32px, 4.5vw, 40px);
            font-size: clamp(10px, 1.6vw, 13px);
          }
        }

        @media (max-width: 480px) {
          .hero-content {
            max-width: 100%;
            padding: 0 20px;
            gap: 10px;
          }
          .hero-title-line1,
          .hero-title-line2 {
            font-size: clamp(22px, 6.5vw, 30px);
          }
          .hero-subtitle-wrap {
            max-width: 100%;
            gap: 10px;
          }
          .hero-subtitle   { font-size: 14px; line-height: 1.5; }
          .hero-initiative { font-size: 12px; }
          .hero-btns {
            flex-direction: column;
            align-items: center;
            max-width: 280px;
            gap: 10px;
            margin-top: 16px;
          }
          .hero-btn-primary,
          .hero-btn-secondary {
            width: 100%;
            height: 42px;
            font-size: 13px;
          }
        }
      `}</style>

      <section className="hero-section" aria-label="Hero banner">
        {/* Plain <img> instead of Next/Image fill — no wrapper span, no inline gap */}
        <img
          src={`${BASE_PATH}/home/hero-banner.svg`}
          alt=""
          aria-hidden="true"
          className="hero-bg"
        />

        <div className="hero-content">
          <h1 className="hero-h1">
            <span className="hero-title-line1">Digital ID</span>
            <span className="hero-title-line2">Innovation Platform</span>
          </h1>

          <div className="hero-subtitle-wrap">
            <p className="hero-subtitle">
              Curating and building digital ID use cases across countries,
              regions and sectors
            </p>
            <p className="hero-initiative">
              An initiative by MSC (MicroSave Consulting)
            </p>
          </div>

          <div className="hero-btns">
            <button
              type="button"
              className="hero-btn hero-btn-primary"
              onClick={() => router.push("/library")}
              aria-label="Explore Use Case Library"
            >
              Explore Use Case Library
            </button>
            <button
              type="button"
              className="hero-btn hero-btn-secondary"
              onClick={() => {
                const el = document.getElementById("hackathon-carousel");
                if (el) {
                  const navbarHeight = 80; // adjust this to match your actual navbar height
                  const top =
                    el.getBoundingClientRect().top +
                    window.scrollY -
                    navbarHeight;
                  window.scrollTo({ top, behavior: "smooth" });
                }
              }}
              aria-label="View Digital ID Hackathons"
            >
              View Digital ID Hackathons
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
