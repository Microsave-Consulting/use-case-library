"use client";
// src/components/ExploreSectors.jsx

import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/siteConfig";
import filterOptions from "../../public/data/filter_options.json";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/*
  Icon filename derivation — mirrors the actual filenames in
  public/assets/sector_icons/ exactly:

  1. Lowercase the label
  2. Replace every run of spaces with "_"
  3. Replace "/" (used in "Legal/ e-Sign") with "-"  →  "legal_e-sign"
  4. Append ".svg"

  Examples:
    "Financial services"   → financial_services.svg
    "Energy and climate"   → energy_and_climate.svg
    "Legal/ e-Sign"        → legal_e-sign.svg
    "Labor and employment" → labor_and_employment.svg
    "Housing and land"     → housing_and_land.svg
    "Social protection"    → social_protection.svg
    "Public services"      → public_services.svg
*/
function labelToIcon(label) {
  return (
    label
      .toLowerCase()
      .replace(/\s*\/\s*/g, "_")
      .replace(/\s+/g, "_") + // spaces → underscores
    ".svg"
  );
}

// Build sector list directly from the JSON — no hardcoded array needed.
const SECTORS = (filterOptions.Sector || []).map((label) => ({
  label,
  icon: labelToIcon(label),
}));

export default function ExploreSectors() {
  const router = useRouter();

  return (
    <>
      <style>{`
        /* ═══════════════════════════════════════════════════════════════
           EXPLORE THE SECTORS
           ─────────────────────────────────────────────────────────────
           Figma @ 1920px:
             Section bg  : #FFFFFF
             Left pad    : 121px → 6.30vw
             Title       : Albert Sans 700, 36px, #1B66D1, lh 100%
             Grid group  : 1529.45 × 592.07px, left 118.76px
             Card        : 281.33 × 170.29px
                           bg #FFFFFF, border 1px #BAC6D1
                           shadow x3 y3 blur6 spread0 #25343D 20%
                           center alignment
             Icon        : 74 × 72.55px
             Label       : Albert Sans 700, 18px, #000000,
                           center, lh 100%, ls 0%
        ═══════════════════════════════════════════════════════════════ */

        .exp-sectors {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          padding: clamp(32px, 4.17vw, 80px) clamp(24px, 6.30vw, 121px);
          box-sizing: border-box;
        }

        /* ── Title ── */
        .exp-sectors__title {
          margin: 0 0 clamp(32px, 3.64vw, 70px) 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
        }

        /* ── Grid: 5 cols ── */
        .exp-sectors__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(10px, 1.61vw, 31px);
          width: 100%;
          max-width: 1529px;
        }

        /* ── Card ── */
        .exp-sectors__card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 0.73vw, 14px);
          background: #ffffff;
          border-radius: 10px;
          border: 1px solid #bac6d1;
          padding: clamp(16px, 1.46vw, 28px) clamp(10px, 1.04vw, 20px);
          min-height: clamp(110px, 8.85vw, 170px);
          box-sizing: border-box;
          cursor: pointer;
          text-align: center;
          transition:
            transform 320ms cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 320ms cubic-bezier(0.23, 1, 0.32, 1),
            border-color 320ms ease;
          will-change: transform;
        }

        .exp-sectors__card:nth-child(odd):hover {
          transform: translateY(-8px);
          border-color: #1b66d1;
          box-shadow: 6px 6px 9px 0px rgba(27, 102, 209, 0.20);
        }
        .exp-sectors__card:nth-child(even):hover {
          transform: translateY(-8px);
          border-color: #8a6cff;
          box-shadow: 9px 9px 12px 0px rgba(138, 108, 255, 0.20);
        }

        /* ── Icon ── */
        .exp-sectors__icon {
          width: clamp(44px, 3.85vw, 74px);
          height: clamp(42px, 3.78vw, 73px);
          object-fit: contain;
          display: block;
          flex-shrink: 0;
          transition: transform 320ms cubic-bezier(0.23, 1, 0.32, 1);
        }
        .exp-sectors__card:hover .exp-sectors__icon {
          transform: translateY(-3px) scale(1.06);
        }

        /* ── Label ── */
        .exp-sectors__label {
          margin: 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(12px, 0.9375vw, 18px);
          line-height: 1;
          letter-spacing: 0;
          color: #000000;
          text-align: center;
        }

        /* disable hover on touch */
        @media (hover: none) {
          .exp-sectors__card:nth-child(odd):hover,
          .exp-sectors__card:nth-child(even):hover {
            transform: none;
            border-color: #bac6d1;
            box-shadow: 3px 3px 6px 0px rgba(37, 52, 61, 0.20);
          }
          .exp-sectors__card:hover .exp-sectors__icon {
            transform: none;
          }
        }

        /* ════════════════════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════════════════════ */

        @media (max-width: 1280px) {
          .exp-sectors__grid { grid-template-columns: repeat(5, 1fr); }
        }

        @media (max-width: 1024px) {
          .exp-sectors__grid {
            grid-template-columns: repeat(4, 1fr);
            gap: clamp(10px, 1.8vw, 24px);
          }
          .exp-sectors__card { min-height: clamp(100px, 14vw, 150px); }
        }

        @media (max-width: 768px) {
          .exp-sectors { padding: 8vw 6vw; }
          .exp-sectors__title {
            font-size: clamp(20px, 3.5vw, 28px);
            margin-bottom: clamp(16px, 3vw, 28px);
          }
          .exp-sectors__grid {
            grid-template-columns: repeat(3, 1fr);
            gap: clamp(8px, 2vw, 16px);
          }
          .exp-sectors__card {
            min-height: clamp(90px, 18vw, 140px);
            padding: clamp(12px, 2.5vw, 20px) clamp(8px, 1.5vw, 14px);
          }
          .exp-sectors__icon {
            width: clamp(36px, 7vw, 56px);
            height: clamp(34px, 6.8vw, 54px);
          }
          .exp-sectors__label { font-size: clamp(11px, 1.8vw, 15px); }
        }

        @media (max-width: 480px) {
          .exp-sectors { padding: 10vw 5vw; }
          .exp-sectors__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(8px, 3vw, 14px);
          }
          .exp-sectors__card {
            min-height: clamp(90px, 26vw, 130px);
            padding: 14px 10px;
          }
          .exp-sectors__icon { width: clamp(36px, 10vw, 52px); height: auto; }
          .exp-sectors__label { font-size: clamp(11px, 3vw, 14px); }
          .exp-sectors__title { font-size: clamp(20px, 6vw, 26px); }
        }
      `}</style>

      <section className="exp-sectors" aria-labelledby="exp-sectors-title">
        <h2 className="exp-sectors__title" id="exp-sectors-title">
          Explore the sectors
        </h2>

        <div className="exp-sectors__grid">
          {SECTORS.map((s) => (
            <button
              key={s.label}
              type="button"
              className="exp-sectors__card"
              onClick={() =>
                router.push(`/library?sector=${encodeURIComponent(s.label)}`)
              }
              aria-label={`Explore ${s.label} sector`}
            >
              <img
                src={`${BASE_PATH}/assets/sector_icons/${s.icon}`}
                alt=""
                aria-hidden="true"
                className="exp-sectors__icon"
              />
              <span className="exp-sectors__label">{s.label}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
}
