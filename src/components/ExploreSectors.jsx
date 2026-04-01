"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/siteConfig";
import filterOptions from "../../public/data/filter_options.json";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function labelToIcon(label) {
  return (
    label
      .toLowerCase()
      .replace(/\s*\/\s*/g, "_")
      .replace(/\s+/g, "_") + ".svg"
  );
}

const SECTORS = (filterOptions.Sector || []).map((label) => ({
  label,
  icon: labelToIcon(label),
}));

export default function ExploreSectors() {
  const router = useRouter();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".exp-sectors__card");
    if (!cards?.length) return;

    // Determine columns count from computed style
    const getColCount = () => {
      const style = window.getComputedStyle(gridRef.current);
      return style.gridTemplateColumns.split(" ").length;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const cols = getColCount();
          const allCards = Array.from(cards);

          allCards.forEach((card, i) => {
            const col = i % cols; // column index
            const row = Math.floor(i / cols); // row index
            // wave by column first, then row within column
            const delay = col * 120 + row * 60;

            setTimeout(() => {
              card.classList.add("is-visible");
            }, delay);
          });

          observer.disconnect(); // fire once only
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -30px 0px",
      },
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Entrance animation ───────────────────────────────────── */
        @keyframes cardRise {
          from {
            opacity: 0;
            transform: translateY(28px) scale(0.96);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .exp-sectors__card {
          opacity: 0;
        }

        .exp-sectors__card.is-visible {
          animation: cardRise 0.75s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }

        @media (prefers-reduced-motion: reduce) {
          .exp-sectors__card        { opacity: 1; }
          .exp-sectors__card.is-visible { animation: none; }
        }

        /* ── Existing styles — unchanged ─────────────────────────── */
        .exp-sectors {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          padding: clamp(32px, 4.17vw, 80px) clamp(24px, 6.30vw, 121px);
          box-sizing: border-box;
        }

        .exp-sectors__title {
          margin: 0 0 clamp(32px, 3.64vw, 70px) 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
        }

        .exp-sectors__grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: clamp(10px, 1.61vw, 31px);
          width: 100%;
          max-width: 1529px;
        }

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

        <div className="exp-sectors__grid" ref={gridRef}>
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
