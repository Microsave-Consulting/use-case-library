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
   Multi-select FilterDropdown (existing filters)
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
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 51,
          padding: "12px 16px",
          borderRadius: 34,
          border: `1px solid ${hasSelection ? "#ABB5D0" : "#DDE5F5"}`,
          background: hasSelection ? "#EEF2FC" : "#F7FAFF",
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "100%",
          letterSpacing: 0,
          color: hasSelection ? "#1F3A6D" : "#334155",
          transition: "border-color 150ms ease, background 150ms ease",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            flex: 1,
            textAlign: "left",
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {pillLabel}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
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
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 9999,
            minWidth: 220,
            maxHeight: 280,
            overflowY: "auto",
            background: "#fff",
            borderRadius: 14,
            border: "1px solid #DDE5F5",
            boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
            padding: 6,
            fontFamily: FONT,
          }}
        >
          {options.length === 0 && (
            <div
              style={{ padding: "8px 12px", fontSize: 13, color: "#9CA3AF" }}
            >
              No options
            </div>
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: "9px 12px",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 400,
                  color: active ? "#1F3A6D" : "#334155",
                  background: active ? "#EEF2FC" : "transparent",
                  transition: "background 120ms ease",
                  fontFamily: FONT,
                  outline: "none",
                }}
                onMouseEnter={(e) => {
                  if (!active) e.currentTarget.style.background = "#F7FAFF";
                }}
                onMouseLeave={(e) => {
                  if (!active) e.currentTarget.style.background = "transparent";
                }}
              >
                <span
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 4,
                    border: `1.5px solid ${active ? "#1F3A6D" : "#ABB5D0"}`,
                    background: active ? "#1F3A6D" : "#fff",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition:
                      "background 120ms ease, border-color 120ms ease",
                  }}
                >
                  {active && (
                    <svg
                      width="10"
                      height="8"
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
   Single-select SectorDropdown (mobile/tablet only)
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
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          height: 51,
          padding: "12px 16px",
          borderRadius: 34,
          border: `1px solid ${hasSelection ? "#ABB5D0" : "#DDE5F5"}`,
          background: hasSelection ? "#EEF2FC" : "#F7FAFF",
          cursor: "pointer",
          whiteSpace: "nowrap",
          fontFamily: FONT,
          fontSize: 14,
          fontWeight: 500,
          lineHeight: "100%",
          letterSpacing: 0,
          color: hasSelection ? "#1F3A6D" : "#334155",
          transition: "border-color 150ms ease, background 150ms ease",
          boxSizing: "border-box",
          flexShrink: 0,
        }}
      >
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {pillLabel}
        </span>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          aria-hidden="true"
          style={{
            transition: "transform 200ms ease",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
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
          style={{
            position: "fixed",
            top: dropdownPos.top,
            left: dropdownPos.left,
            zIndex: 9999,
            minWidth: 220,
            maxHeight: 320,
            overflowY: "auto",
            background: "#fff",
            borderRadius: 14,
            border: "1px solid #DDE5F5",
            boxShadow: "0 12px 32px rgba(0,0,0,0.16)",
            padding: 6,
            fontFamily: FONT,
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
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "9px 12px",
                  borderRadius: 9,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? "#1F3A6D" : "#334155",
                  background: isActive ? "#EEF2FC" : "transparent",
                  transition: "background 120ms ease",
                  fontFamily: FONT,
                  outline: "none",
                  gap: 8,
                }}
                onMouseEnter={(e) => {
                  if (!isActive) e.currentTarget.style.background = "#F7FAFF";
                }}
                onMouseLeave={(e) => {
                  if (!isActive)
                    e.currentTarget.style.background = isActive
                      ? "#EEF2FC"
                      : "transparent";
                }}
              >
                <span>{sector === "All" ? "All Sectors" : sector}</span>
                {count !== null && (
                  <span
                    style={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: isActive ? "#1F3A6D" : "#9CA3AF",
                      background: isActive ? "#D6E4FF" : "#F3F4F6",
                      padding: "2px 8px",
                      borderRadius: 999,
                      flexShrink: 0,
                    }}
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

        .fbar-wrap {
          width: 100%;
          background: #F8F8F8;
          border-bottom: 1px solid rgba(0,0,0,0.05);
          position: sticky;
          top: 91px;
          z-index: 50;
        }

        /* ── Desktop layout: single row ── */
        .fbar-inner {
          padding: 16px 100px;
          display: flex;
          align-items: center;
          gap: 16px;
          min-height: 83px;
          box-sizing: border-box;
          flex-wrap: nowrap;
        }

        .fbar-search {
          display: flex;
          align-items: center;
          gap: 8px;
          width: 377px;
          height: 51px;
          flex-shrink: 0;
          padding: 8px;
          border-radius: 33px;
          border: 1px solid #EEEEFA;
          background: #FFFFFF;
          box-sizing: border-box;
        }

        .fbar-search-input {
          flex: 1;
          border: none;
          background: transparent;
          outline: none;
          font-family: ${FONT};
          font-size: 14px;
          font-weight: 400;
          color: #334155;
          padding: 0 4px;
          min-width: 0;
        }
        .fbar-search-input::placeholder { color: #9CA3AF; }

        .fbar-search-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 87px;
          height: 35px;
          flex-shrink: 0;
          padding: 8px 18px;
          border-radius: 25px;
          border: 1px solid #EEF2FC;
          background: #EBEFF9;
          font-family: ${FONT};
          font-size: 16px;
          font-weight: 600;
          color: #1F3A6D;
          cursor: pointer;
          transition: background 150ms ease;
          white-space: nowrap;
          box-sizing: border-box;
        }
        .fbar-search-btn:hover { background: #DDE5F5; }

        /* filter pills row — horizontal scroll, no wrap on desktop */
        .fbar-filters {
          display: flex;
          align-items: center;
          gap: 12px;
          flex: 1;
          height: 51px;
          overflow-x: auto;
          scrollbar-width: none;
          flex-wrap: nowrap;
        }
        .fbar-filters::-webkit-scrollbar { display: none; }

        /* ── Large tablet (≤1100px): reduce side padding ── */
        @media (max-width: 1100px) {
          .fbar-inner {
            padding: 16px 48px;
          }
        }

        /* ── Tablet (≤960px): 2 rows, sidebar hides at same breakpoint ── */
        @media (max-width: 960px) {
          .fbar-inner {
            padding: 12px 48px;
            flex-wrap: wrap;
            gap: 10px;
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
            padding-bottom: 4px;
          }
        }

        /* ── Mobile (≤560px) ── */
        @media (max-width: 560px) {
          .fbar-inner { padding: 10px 16px; }
          .fbar-search { width: 100%; }
        }
      `}</style>

      <div className="fbar-wrap">
        <div className="fbar-inner">
          {/* ── Search bar ── */}
          <div className="fbar-search">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
              style={{ flexShrink: 0, marginLeft: 4 }}
            >
              <circle cx="11" cy="11" r="7" stroke="#9CA3AF" strokeWidth="2" />
              <path
                d="M20 20L16.65 16.65"
                stroke="#9CA3AF"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
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
