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

        /* ── Wrapper ──
           Figma: 292px fixed, 1px border #DDE5F5, radius 14px, padding 16px, bg #FFFFFF */
        .ssb-wrap {
          width: auto;
          flex-shrink: 0;
          background: #FFFFFF;
          border: 1px solid #DDE5F5;
          
          padding: 16px;
          box-sizing: border-box;
          font-family: ${FONT};
          align-self: flex-start;
          position: sticky;
          gap: 16px;
          top: 100px;
        }

        /* ── "Sector" heading ──
           Figma: 55×22 hug, Albert Sans 600 SemiBold 18px, #0F1B2D */
        .ssb-heading {
          font-size: 18px;
          font-weight: 600;
          color: #0F1B2D;
          font-family: ${FONT};
          line-height: 100%;
          letter-spacing: 0;
          margin-bottom: 16px;
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

        /* ── All Sectors row ──
           Figma: 260px fill, 49px hug, radius 14px,
           padding T12 R16 B12 L16, gap 16px, bg #F8F8F8,
           border-bottom 1px, mb 4px */
        .ssb-all {
          padding: 12px 16px;
          border-radius: 14px;
          background: #F8F8F8;
          border-bottom: 1px solid #EEF2FC;
          gap: 16px;
          min-height: 49px;
          margin-bottom: 16px;
          transition: background 150ms ease;
        }
        .ssb-all:hover { background: #EEF2FC; }
        .ssb-all.active { background: #EEF2FC; }

        /* ── All Sectors label ──
           Figma: 70×17 hug, Albert Sans 500 Medium 14px
           inactive: #334155 / active: #1B66D1 */
        .ssb-all-label {
          font-size: 14px;
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

        /* ── All Sectors badge ──
           Figma: 37×25 fixed, radius 28px, border 1px #DDE5F5,
           padding T4 R10 B4 L10, gap 10px
           inactive bg: #EEEEEE, color: #334155
           active bg: #1F3A6D, border: #1F3A6D, color: #fff */
        .ssb-all-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 37px;
          height: 25px;
          flex-shrink: 0;
          padding: 4px 10px;
          border-radius: 28px;
          border: 1px solid #DDE5F5;
          background: #EEEEEE;
          font-size: 14px;
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

        /* ── Regular sector row ──
           Figma: 260px fill, 41px hug, border-bottom 1px #F3F6FF,
           padding T8 R16 B8 L16, gap 16px */
        .ssb-item {
          padding: 8px 16px;
          border-radius: 14px;
          margin-bottom: 16px;
          gap: 16px;
          min-height: 41px;
          transition: background 150ms ease;
        }
        .ssb-item:last-of-type { border-bottom: none; }
        .ssb-item:hover { background: #F7FAFF; }
        .ssb-item.active { background: #EEF2FC; }

        /* ── Sector label ──
           Figma: Albert Sans 500 Medium 14px, #334155 / active #1B66D1 */
        .ssb-label {
          font-size: 14px;
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

        /* ── Count badge (regular rows) ──
           Figma: 37×25 fixed, radius 28px, border 1px #DDE5F5,
           padding T4 R10 B4 L10, gap 10px, bg #F7FAFF, color #334155 */
        .ssb-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-width: 37px;
          height: 25px;
          flex-shrink: 0;
          padding: 4px 10px;
          border-radius: 28px;
          border: 1px solid #DDE5F5;
          background: #F7FAFF;
          font-size: 14px;
          font-weight: 500;
          line-height: 100%;
          letter-spacing: 0;
          color: #334155;
          font-family: ${FONT};
          box-sizing: border-box;
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
