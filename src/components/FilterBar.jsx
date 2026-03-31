"use client";
// src/components/FilterBar.jsx

import { useState, useRef, useEffect } from "react";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function resolveOptions(f, staticOptions, filterOptions) {
  if (!staticOptions || typeof staticOptions !== "object") {
    return filterOptions?.[f.id] || [];
  }
  const keys = Object.keys(staticOptions);
  if (staticOptions[f.id]?.length) return staticOptions[f.id];
  if (f.field && staticOptions[f.field]?.length) return staticOptions[f.field];
  const idLower = f.id?.toLowerCase();
  const matchById = keys.find((k) => k.toLowerCase() === idLower);
  if (matchById && staticOptions[matchById]?.length)
    return staticOptions[matchById];
  if (f.field) {
    const fieldLower = f.field.toLowerCase();
    const matchByField = keys.find((k) => k.toLowerCase() === fieldLower);
    if (matchByField && staticOptions[matchByField]?.length)
      return staticOptions[matchByField];
  }
  return filterOptions?.[f.id] || [];
}

/* ══════════════════════════════════════════════════
   Multi-select FilterDropdown
══════════════════════════════════════════════════ */
function FilterDropdown({ id, label, options = [], selected = [], onChange }) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const dropRef = useRef(null);

  const openDropdown = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 8, left: rect.left });
      }
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        dropRef.current &&
        !dropRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const toggle = (val) => {
    onChange(
      selected.includes(val)
        ? selected.filter((v) => v !== val)
        : [...selected, val],
    );
  };

  const hasSelection = selected.length > 0;
  const pillLabel = hasSelection
    ? selected.length === 1
      ? selected[0]
      : `${selected[0]} +${selected.length - 1}`
    : label;

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="fbar-pill"
        data-active={hasSelection ? "true" : undefined}
      >
        <span className="fbar-pill-label">{pillLabel}</span>
        {/* SVG chevron: width/height in em so it scales with pill font-size */}
        <svg
          width="0.75em" /* was: 12px */
          height="0.75em" /* was: 12px */
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="fbar-pill-chevron"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={dropRef}
          role="listbox"
          aria-multiselectable="true"
          className="fbar-dropdown"
          style={{ top: dropdownPos.top, left: dropdownPos.left }}
        >
          {options.length === 0 && (
            <div className="fbar-drop-empty">No options</div>
          )}
          {options.map((opt) => {
            const active = selected.includes(opt);
            return (
              <div
                key={opt}
                role="option"
                aria-selected={active}
                onClick={() => toggle(opt)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(opt);
                  }
                }}
                tabIndex={0}
                className={`fbar-drop-item${active ? " fbar-drop-item--active" : ""}`}
              >
                <span
                  className={`fbar-checkbox${active ? " fbar-checkbox--active" : ""}`}
                >
                  {active && (
                    /* checkmark SVG: em units — scales with dropdown font-size */
                    <svg
                      width="0.625em" /* was: 10px */
                      height="0.5em" /* was: 8px  */
                      viewBox="0 0 10 8"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 4L3.5 6.5L9 1"
                        stroke="#fff"
                        strokeWidth="1.6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
                <span style={{ flex: 1 }}>{opt}</span>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════
   Single-select SectorDropdown
══════════════════════════════════════════════════ */
function SectorDropdown({ sectorList = [], activeSector = "All", onSelect }) {
  const [open, setOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0 });
  const btnRef = useRef(null);
  const dropRef = useRef(null);

  const openDropdown = () => {
    if (btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      setDropdownPos({ top: rect.bottom + 8, left: rect.left });
    }
    setOpen(true);
  };

  useEffect(() => {
    if (!open) return;
    const update = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        setDropdownPos({ top: rect.bottom + 8, left: rect.left });
      }
    };
    window.addEventListener("scroll", update, true);
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update, true);
      window.removeEventListener("resize", update);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (
        btnRef.current &&
        !btnRef.current.contains(e.target) &&
        dropRef.current &&
        !dropRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const hasSelection = activeSector !== "All";
  const pillLabel = hasSelection ? activeSector : "Sector";

  const handleSelect = (sector) => {
    onSelect(sector);
    setOpen(false);
  };

  return (
    <>
      <button
        ref={btnRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openDropdown())}
        className="fbar-pill"
        data-active={hasSelection ? "true" : undefined}
      >
        <span className="fbar-pill-label">{pillLabel}</span>
        {/* SVG chevron: em units */}
        <svg
          width="0.75em" /* was: 12px */
          height="0.75em" /* was: 12px */
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          className="fbar-pill-chevron"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        >
          <path
            d="M2 4L6 8L10 4"
            stroke="#334155"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {open && (
        <div
          ref={dropRef}
          role="listbox"
          className="fbar-dropdown"
          style={{
            top: dropdownPos.top,
            left: dropdownPos.left,
            maxHeight: "20rem" /* was: 320px */,
          }}
        >
          {[["All", null], ...sectorList].map(([sector, count]) => {
            const isActive = activeSector === sector;
            return (
              <div
                key={sector}
                role="option"
                aria-selected={isActive}
                onClick={() => handleSelect(sector)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleSelect(sector);
                  }
                }}
                tabIndex={0}
                className={`fbar-drop-item fbar-drop-item--spaced${isActive ? " fbar-drop-item--active" : ""}`}
              >
                <span>{sector === "All" ? "All Sectors" : sector}</span>
                {count !== null && (
                  <span
                    className={`fbar-count${isActive ? " fbar-count--active" : ""}`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

/* ══════════════════════════════════════════════════
   FilterBar
══════════════════════════════════════════════════ */
export default function FilterBar({
  filterConfig = [],
  filterOptions = {},
  staticOptions = {},
  filters = {},
  onFilterChange,
  search = "",
  onSearchChange,
  onSearch,
  sectorList = [],
  activeSector = "All",
  onSelectSector,
  showSectorDropdown = false,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") onSearch?.();
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600&display=swap');

        /* ══════════════════════════════════════════════════════════════
           FILTER BAR
           All sizes use clamp(min, Nvw, max) — same pattern as
           WhyDigitalID so the bar scales smoothly at every zoom level.
        ══════════════════════════════════════════════════════════════ */

        .fbar-wrap {
          width: 100%;
          background: #F8F8F8;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: var(--hdr-h);
          z-index: 50;
          box-sizing: border-box;
        }

        /* ── Main row ── */
        .fbar-inner {
          padding:
            clamp(0.625rem, 1.04vw, 1rem)        /* top    — was 10px→16px */
            clamp(1.5rem,   6.30vw, 7.5625rem)   /* right  — was 24px→121px, site-wide token */
            clamp(0.625rem, 1.04vw, 1rem)        /* bottom */
            clamp(1.5rem,   6.30vw, 7.5625rem);  /* left */
          display: flex;
          align-items: center;
          gap: clamp(0.625rem, 1.04vw, 1rem);    /* was: 10px→16px */
          min-height: clamp(3.75rem, 5.73vw, 5.1875rem); /* was: 60px→83px */
          box-sizing: border-box;
          flex-wrap: nowrap;
        }

        /* ── Search bar ── */
        .fbar-search {
          display: flex;
          align-items: center;
          gap: clamp(0.375rem, 0.52vw, 0.5rem);  /* was: 8px */
          width: clamp(15rem, 26.2vw, 23.5625rem); /* was: 240px→377px */
          height: clamp(2.375rem, 3.54vw, 3.1875rem); /* was: 38px→51px */
          flex-shrink: 0;
          padding: clamp(0.375rem, 0.52vw, 0.5rem); /* was: 6px→8px */
          border-radius: 2.0625rem;                /* was: 33px */
          border: 1px solid #EEEEFA;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        /* search icon wrapper — keeps icon centred at all scales */
        .fbar-search-icon {
          flex-shrink: 0;
          margin-left: clamp(0.125rem, 0.26vw, 0.25rem); /* was: 4px */
          width: clamp(0.875rem, 1.25vw, 1.125rem);       /* was: 18px */
          height: clamp(0.875rem, 1.25vw, 1.125rem);      /* was: 18px */
          display: flex;
          align-items: center;
          justify-content: center;
        }
        /* SVG inside uses 100% so it fills the wrapper */
        .fbar-search-icon svg {
          width: 100%;
          height: 100%;
        }

        .fbar-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-family: ${FONT};
          font-size: clamp(0.75rem, 0.73vw, 0.875rem); /* was: 12px→14px */
          font-weight: 400;
          color: #334155;
          padding: 0 clamp(0.125rem, 0.26vw, 0.25rem); /* was: 0 4px */
          min-width: 0;
        }
        .fbar-search-input::placeholder { color: #9CA3AF; }

        .fbar-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: clamp(1.625rem, 2.29vw, 2.1875rem); /* was: 26px→35px */
          padding:
            clamp(0.375rem, 0.42vw, 0.5rem)           /* top/bottom — was 6px→8px */
            clamp(0.75rem,  1.25vw, 1.125rem);         /* left/right — was 12px→18px */
          border-radius: 1.5625rem;                    /* was: 25px */
          border: 1px solid #EEF2FC;
          background: #EBEFF9;
          font-family: ${FONT};
          font-size: clamp(0.75rem, 0.83vw, 1rem);     /* was: 13px→16px */
          font-weight: 600;
          color: #1F3A6D;
          cursor: pointer;
          transition: background 150ms ease;
          white-space: nowrap;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .fbar-search-btn:hover { background: #DDE5F5; }

        /* ── Filter pills row ── */
        .fbar-filters {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 0.83vw, 0.75rem);          /* was: 8px→12px */
          flex: 1;
          height: clamp(2.375rem, 3.54vw, 3.1875rem);   /* was: 38px→51px */
          overflow-x: auto;
          scrollbar-width: none;
          flex-wrap: nowrap;
        }
        .fbar-filters::-webkit-scrollbar { display: none; }

        /* ── Pill button ── */
        .fbar-pill {
          display: inline-flex;
          align-items: center;
          gap: clamp(0.375rem, 0.52vw, 0.5rem);          /* was: 8px */
          height: clamp(2.125rem, 3.54vw, 3.1875rem);    /* was: 34px→51px */
          padding:
            clamp(0.5rem,  0.63vw, 0.75rem)              /* top/bottom — was 8px→12px */
            clamp(0.75rem, 1.04vw, 1rem);                /* left/right — was 12px→16px */
          border-radius: 2.125rem;                        /* was: 34px */
          border: 1px solid #DDE5F5;
          background: #F7FAFF;
          cursor: pointer;
          white-space: nowrap;
          font-family: ${FONT};
          font-size: clamp(0.75rem, 0.73vw, 0.875rem);   /* was: 12px→14px */
          font-weight: 500;
          line-height: 1;
          color: #334155;
          transition: border-color 150ms ease, background 150ms ease;
          box-sizing: border-box;
          flex-shrink: 0;
        }
        .fbar-pill[data-active] {
          border-color: #ABB5D0;
          background: #EEF2FC;
          color: #1F3A6D;
        }

        .fbar-pill-label {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .fbar-pill-chevron {
          flex-shrink: 0;
          transition: transform 200ms ease;
        }

        /* ── Shared dropdown panel ── */
        .fbar-dropdown {
          position: fixed;
          z-index: 9999;
          min-width: clamp(11.25rem, 15vw, 13.75rem);   /* was: 180px→220px */
          max-height: clamp(12rem, 20vw, 17.5rem);       /* was: 280px */
          overflow-y: auto;
          background: #fff;
          border-radius: clamp(0.625rem, 0.83vw, 0.875rem); /* was: 14px */
          border: 1px solid #DDE5F5;
          box-shadow: 0 clamp(0.5rem, 0.83vw, 0.75rem) clamp(1.25rem, 2.08vw, 2rem) rgba(0,0,0,0.16);
          padding: clamp(0.25rem, 0.31vw, 0.375rem);    /* was: 6px */
          font-family: ${FONT};
        }

        .fbar-drop-empty {
          padding: clamp(0.375rem, 0.42vw, 0.5rem) clamp(0.625rem, 0.63vw, 0.75rem); /* was: 8px 12px */
          font-size: clamp(0.75rem, 0.68vw, 0.8125rem); /* was: 13px */
          color: #9CA3AF;
        }

        .fbar-drop-item {
          display: flex;
          align-items: center;
          gap: clamp(0.5rem, 0.52vw, 0.625rem);          /* was: 10px */
          padding:
            clamp(0.4375rem, 0.47vw, 0.5625rem)          /* top/bottom — was 7px→9px */
            clamp(0.625rem,  0.63vw, 0.75rem);           /* left/right — was 12px */
          border-radius: clamp(0.5rem, 0.47vw, 0.5625rem); /* was: 9px */
          cursor: pointer;
          font-size: clamp(0.6875rem, 0.68vw, 0.8125rem); /* was: 12px→13px */
          font-weight: 400;
          color: #334155;
          background: transparent;
          transition: background 120ms ease;
          font-family: ${FONT};
          outline: none;
        }
        .fbar-drop-item:hover { background: #F7FAFF; }
        .fbar-drop-item--active {
          color: #1F3A6D;
          background: #EEF2FC;
          font-weight: 600;
        }
        .fbar-drop-item--active:hover { background: #EEF2FC; }

        .fbar-drop-item--spaced {
          justify-content: space-between;
        }

        /* ── Checkbox ── */
        .fbar-checkbox {
          width: clamp(0.875rem, 0.83vw, 1rem);          /* was: 16px */
          height: clamp(0.875rem, 0.83vw, 1rem);         /* was: 16px */
          border-radius: clamp(0.1875rem, 0.21vw, 0.25rem); /* was: 4px */
          border: 1.5px solid #ABB5D0;
          background: #fff;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: background 120ms ease, border-color 120ms ease;
        }
        .fbar-checkbox--active {
          border-color: #1F3A6D;
          background: #1F3A6D;
        }

        /* ── Count badge ── */
        .fbar-count {
          font-size: clamp(0.6875rem, 0.63vw, 0.75rem);  /* was: 12px */
          font-weight: 500;
          color: #9CA3AF;
          background: #F3F4F6;
          padding: clamp(0.0625rem, 0.1vw, 0.125rem) clamp(0.375rem, 0.42vw, 0.5rem); /* was: 2px 8px */
          border-radius: 999px;
          flex-shrink: 0;
        }
        .fbar-count--active {
          color: #1F3A6D;
          background: #D6E4FF;
        }

        /* ════════════════════════════════════════════════════════════
           RESPONSIVE
        ════════════════════════════════════════════════════════════ */

        @media (max-width: 960px) {
          .fbar-inner {
            flex-wrap: wrap;
            gap: clamp(0.5rem, 1.5vw, 0.75rem);
            min-height: auto;
          }
          .fbar-search {
            width: 100%;
            flex: 0 0 100%;
          }
          .fbar-filters {
            width: 100%;
            flex: 0 0 100%;
            height: auto;
            padding-bottom: clamp(0.125rem, 0.42vw, 0.25rem); /* was: 4px */
          }
        }

        @media (max-width: 560px) {
          .fbar-inner {
            padding:
              clamp(0.5rem, 2.5vw, 0.75rem)
              clamp(1rem, 5vw, 1.5rem)
              clamp(0.5rem, 2.5vw, 0.75rem)
              clamp(1rem, 5vw, 1.5rem);
          }
          .fbar-pill {
            font-size: clamp(0.6875rem, 3vw, 0.8125rem); /* was: 11px→13px */
            height: clamp(2rem, 8.5vw, 2.5rem);           /* was: 32px→40px */
            padding: 0.5rem 0.75rem;
          }
          .fbar-search {
            height: clamp(2.25rem, 9.5vw, 2.75rem);       /* was: 36px→44px */
          }
          .fbar-search-input { font-size: 0.8125rem; }     /* was: 13px */
          .fbar-search-btn   {
            font-size: 0.8125rem;                          /* was: 13px */
            height: 1.625rem;                              /* was: 26px */
            padding: 0.3125rem 0.75rem;                    /* was: 5px 12px */
          }
        }
      `}</style>

      <div className="fbar-wrap">
        <div className="fbar-inner">
          {/* ── Search bar ── */}
          <div className="fbar-search">
            {/* wrapper div controls icon size via CSS; SVG fills it with 100% */}
            <div className="fbar-search-icon" aria-hidden="true">
              <svg
                viewBox="0 0 24 24" /* no fixed width/height — fills .fbar-search-icon */
                fill="none"
              >
                <circle
                  cx="11"
                  cy="11"
                  r="7"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                />
                <path
                  d="M20 20L16.65 16.65"
                  stroke="#9CA3AF"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <input
              type="text"
              className="fbar-search-input"
              placeholder="Search Use Cases"
              value={search}
              onChange={(e) => onSearchChange?.(e.target.value)}
              onKeyDown={handleKeyDown}
              aria-label="Search use cases"
            />
            <button
              type="button"
              className="fbar-search-btn"
              onClick={() => onSearch?.()}
            >
              Search
            </button>
          </div>

          {/* ── Filter pills ── */}
          <div className="fbar-filters" role="group" aria-label="Filters">
            {showSectorDropdown && (
              <SectorDropdown
                sectorList={sectorList}
                activeSector={activeSector}
                onSelect={onSelectSector}
              />
            )}
            {filterConfig.map((f) => (
              <FilterDropdown
                key={f.id}
                id={f.id}
                label={f.label}
                options={resolveOptions(f, staticOptions, filterOptions)}
                selected={filters[f.id] || []}
                onChange={(vals) => onFilterChange?.(f.id, vals)}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
