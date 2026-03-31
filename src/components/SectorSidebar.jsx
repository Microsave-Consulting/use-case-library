"use client";
// src/components/SectorSidebar.jsx

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export default function SectorSidebar({
  sectorList = [],
  totalCount = 0,
  activeSector = "All",
  onSelect,
}) {
  const allActive = activeSector === "All";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        /* ── Wrapper ── */
        .ssb-wrap {
          width: clamp(200px, 15.2vw, 292px);
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid #DDE5F5;
          padding: clamp(10px, 0.83vw, 16px);
          box-sizing: border-box;
          font-family: ${FONT};
          align-self: flex-start;
          position: sticky;
          gap: clamp(10px, 0.83vw, 16px);
          top: 100px;
        }

        /* ── "Sector" heading ── */
        .ssb-heading {
          font-size: clamp(14px, 0.9375vw, 18px);
          font-weight: 600;
          color: #0F1B2D;
          font-family: ${FONT};
          line-height: 100%;
          letter-spacing: 0;
          margin-bottom: clamp(10px, 0.83vw, 16px);
        }

        /* ── Shared row base ── */
        .ssb-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          border: none;
          cursor: pointer;
          font-family: ${FONT};
          text-align: left;
          box-sizing: border-box;
          background: transparent;
        }

        /* ── All Sectors row ── */
        .ssb-all {
          padding: clamp(8px, 0.625vw, 12px) clamp(10px, 0.83vw, 16px);
          border-radius: clamp(10px, 0.73vw, 14px);
          background: #F8F8F8;
          border-bottom: 1px solid #EEF2FC;
          gap: clamp(10px, 0.83vw, 16px);
          min-height: clamp(36px, 2.55vw, 49px);
          margin-bottom: clamp(10px, 0.83vw, 16px);
          transition: background 150ms ease;
        }
        .ssb-all:hover { background: #EEF2FC; }
        .ssb-all.active { background: #EEF2FC; }

        /* ── All Sectors label ── */
        .ssb-all-label {
          font-size: clamp(12px, 0.73vw, 14px);
          font-weight: 500;
          line-height: 100%;
          letter-spacing: 0;
          color: #334155;
          font-family: ${FONT};
          flex: 1;
          min-width: 0;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          transition: color 150ms ease;
        }
        .ssb-all-label.active { color: #1B66D1; font-weight: 600; }

        /* ── All Sectors badge ── */
        .ssb-all-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(28px, 1.93vw, 37px);
          height: clamp(20px, 1.3vw, 25px);
          flex-shrink: 0;
          padding: clamp(3px, 0.21vw, 4px) clamp(7px, 0.52vw, 10px);
          border-radius: 28px;
          border: 1px solid #DDE5F5;
          background: #EEEEEE;
          font-size: clamp(11px, 0.73vw, 14px);
          font-weight: 500;
          line-height: 100%;
          letter-spacing: 0;
          color: #334155;
          font-family: ${FONT};
          box-sizing: border-box;
          transition: background 150ms ease, border-color 150ms ease, color 150ms ease;
        }
        .ssb-all.active .ssb-all-badge {
          background: #1F3A6D;
          border-color: #1F3A6D;
          color: #fff;
        }

        /* ── Regular sector row ── */
        .ssb-item {
          padding: clamp(6px, 0.42vw, 8px) clamp(10px, 0.83vw, 16px);
          border-radius: clamp(10px, 0.73vw, 14px);
          margin-bottom: clamp(8px, 0.63vw, 16px);
          gap: clamp(10px, 0.83vw, 16px);
          min-height: clamp(32px, 2.14vw, 41px);
          transition: background 150ms ease;
        }
        .ssb-item:last-of-type { border-bottom: none; }
        .ssb-item:hover { background: #F7FAFF; }
        .ssb-item.active { background: #EEF2FC; }

        /* ── Sector label ── */
        .ssb-label {
          font-size: clamp(12px, 0.73vw, 14px);
          font-weight: 500;
          line-height: 100%;
          letter-spacing: 0;
          color: #334155;
          font-family: ${FONT};
          flex: 1;
          min-width: 0;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          transition: color 150ms ease;
        }
        .ssb-label.active { color: #1B66D1; font-weight: 600; }

        /* ── Count badge (regular rows) ── */
        .ssb-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: clamp(28px, 1.93vw, 37px);
          height: clamp(20px, 1.3vw, 25px);
          flex-shrink: 0;
          padding: clamp(3px, 0.21vw, 4px) clamp(7px, 0.52vw, 10px);
          border-radius: 28px;
          border: 1px solid #DDE5F5;
          background: #F7FAFF;
          font-size: clamp(11px, 0.73vw, 14px);
          font-weight: 500;
          line-height: 100%;
          letter-spacing: 0;
          color: #334155;
          font-family: ${FONT};
          box-sizing: border-box;
        }

        /* ── Responsive ── */
        @media (max-width: 1100px) {
          .ssb-wrap {
            width: clamp(180px, 18vw, 240px);
          }
        }

        @media (max-width: 860px) {
          .ssb-wrap {
            width: 100%;
            position: static;
            border-radius: 12px;
          }
          .ssb-heading { font-size: 15px; }
          .ssb-all-label,
          .ssb-label { font-size: 13px; }
          .ssb-all-badge,
          .ssb-badge { font-size: 12px; }
        }

        @media (max-width: 480px) {
          .ssb-wrap { padding: 12px; }
          .ssb-heading { font-size: 14px; margin-bottom: 10px; }
          .ssb-all { min-height: 40px; margin-bottom: 10px; }
          .ssb-item { min-height: 36px; margin-bottom: 6px; }
        }
      `}</style>

      <aside className="ssb-wrap" aria-label="Filter by sector">
        {/* ── Heading ── */}
        <div className="ssb-heading">Sector</div>

        {/* ── All Sectors ── */}
        <button
          type="button"
          className={`ssb-row ssb-all${allActive ? " active" : ""}`}
          onClick={() => onSelect?.("All")}
          aria-pressed={allActive}
        >
          <span className={`ssb-all-label${allActive ? " active" : ""}`}>
            All Sectors
          </span>
          <span className="ssb-all-badge">{totalCount}</span>
        </button>

        {/* ── Individual sectors ── */}
        {sectorList.map(([sector, count]) => {
          const isActive = activeSector === sector;
          return (
            <button
              key={sector}
              type="button"
              className={`ssb-row ssb-item${isActive ? " active" : ""}`}
              onClick={() => onSelect?.(sector)}
              aria-pressed={isActive}
            >
              <span className={`ssb-label${isActive ? " active" : ""}`}>
                {sector}
              </span>
              <span className="ssb-badge">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </aside>
    </>
  );
}
