"use client";
// src/components/UseCaseLibrary.jsx
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import FilterBar from "./FilterBar";
import SectorSidebar from "./SectorSidebar";
import UseCaseCard from "./UseCaseCard";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function getColumns(width) {
  if (width >= 1200) return 4;
  if (width >= 860) return 3;
  if (width >= 540) return 2;
  return 1;
}
function getPreviewLimit(cols) {
  return cols * 2;
}
function getPageSize(cols) {
  return cols * 4;
}

function splitValues(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter((v) => v.length > 0);
}
function normalizeLabelForMatch(label) {
  if (!label) return "";
  return String(label)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
function getModeValues(uc) {
  const raw = uc.ModeofAccess;
  if (!raw) return [];
  if (Array.isArray(raw))
    return raw.map((v) => String(v).trim()).filter(Boolean);
  return splitValues(raw);
}

/* ══════════════════════════════════════════════════
   Pagination
══════════════════════════════════════════════════ */
function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;
  const pages = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) pages.push(i);
  } else {
    const left = Math.max(2, currentPage - 1);
    const right = Math.min(totalPages - 1, currentPage + 1);
    pages.push(1);
    if (left > 2) pages.push("ellipsis-left");
    for (let i = left; i <= right; i++) pages.push(i);
    if (right < totalPages - 1) pages.push("ellipsis-right");
    pages.push(totalPages);
  }
  return (
    <>
      <style>{`
        .pg-wrap{display:flex;align-items:center;justify-content:center;gap:6px;padding:20px 0 8px;font-family:${FONT};flex-shrink:0;}
        .pg-btn{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;padding:0 10px;border-radius:8px;border:1px solid #DDE5F5;background:#fff;color:#334155;font-size:14px;font-weight:500;font-family:${FONT};cursor:pointer;transition:background 150ms ease,border-color 150ms ease,color 150ms ease;user-select:none;}
        .pg-btn:hover{background:#EEF2FC;border-color:#1B66D1;color:#1B66D1;}
        .pg-btn.active{background:#1F3A6D;border-color:#1F3A6D;color:#fff;font-weight:600;}
        .pg-ellipsis{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:36px;font-size:14px;color:#9CA3AF;font-family:${FONT};user-select:none;}
        .pg-arrow{display:inline-flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;border:1px solid #DDE5F5;background:#fff;color:#334155;cursor:pointer;transition:background 150ms ease,border-color 150ms ease,color 150ms ease;}
        .pg-arrow:hover:not([disabled]){background:#EEF2FC;border-color:#1B66D1;color:#1B66D1;}
        .pg-arrow[disabled]{opacity:0.38;cursor:not-allowed;pointer-events:none;}
      `}</style>
      <div className="pg-wrap" role="navigation" aria-label="Pagination">
        <button
          className="pg-arrow"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        {pages.map((p) =>
          typeof p === "string" ? (
            <span key={p} className="pg-ellipsis">
              …
            </span>
          ) : (
            <button
              key={p}
              className={`pg-btn${p === currentPage ? " active" : ""}`}
              onClick={() => onPageChange(p)}
              aria-label={`Page ${p}`}
              aria-current={p === currentPage ? "page" : undefined}
            >
              {p}
            </button>
          ),
        )}
        <button
          className="pg-arrow"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </>
  );
}

/* ══════════════════════════════════════════════════
   SectorGroup
══════════════════════════════════════════════════ */
function SectorGroup({
  sector,
  items,
  onOpen,
  onViewAll,
  expanded,
  onToggle,
  cols,
}) {
  const previewLimit = getPreviewLimit(cols);
  const preview = items.slice(0, previewLimit);
  const hasMore = items.length > previewLimit;

  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "14px 0",
          background: "none",
          border: "none",
          borderBottom: "1px solid #E5E9F3",
          cursor: "pointer",
          fontFamily: FONT,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
         
          {/* ── Sector icon from /public/assets/sector_icons/ ── */}
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 8,
            
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <img
              src={`/assets/sector_icons/${sector
                .toLowerCase()
                .replace(/\s*\/\s*/g, "_")
                .replace(/\s+/g, "_")}.svg`}
              alt=""
              width={16}
              height={16}
              style={{ display: "block" }}
            />
          </span>

          {/* ── Sector name in #1B66D1 ── */}
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0FIB2D",
              fontFamily: FONT,
            }}
          >
            {sector}
          </span>
          <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: FONT }}>
            ({items.length})
          </span>
        </div>

        {/* ── Chevron in #1B66D1 ── */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          aria-hidden="true"
          style={{
            transition: "transform 200ms ease",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            flexShrink: 0,
          }}
        >
          <path
            d="M5 7.5L10 12.5L15 7.5"
            stroke="#0F1B2D"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* ── rest unchanged ── */}
      {expanded && (
        <>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: `repeat(${cols}, 1fr)`,
              gap: 16,
              padding: "16px 0 12px",
            }}
          >
            {preview.map((uc, idx) => (
              <UseCaseCard
                key={`${sector}-${uc.ID ?? uc.Id ?? ""}-${idx}`}
                uc={uc}
                onOpen={onOpen}
              />
            ))}
          </div>
          {hasMore && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                paddingBottom: 16,
              }}
            >
              <button
                type="button"
                onClick={() => onViewAll(sector)}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  padding: "11px 22px",
                  borderRadius: 26,
                  border: "none",
                  background: "#1F3A6D",
                  color: "#fff",
                  fontSize: 14,
                  fontWeight: 600,
                  fontFamily: FONT,
                  cursor: "pointer",
                  transition: "background 200ms ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#1B66D1";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "#1F3A6D";
                }}
              >
                View all use cases
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M3 7h8M7 3l4 4-4 4"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
/* ══════════════════════════════════════════════════
   Main component
══════════════════════════════════════════════════ */
export default function UseCaseLibrary({
  initialData = [],
  filterConfig = [],
  staticOptions = {},
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [activeSector, setActiveSector] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [openSector, setOpenSector] = useState(null);
  const [cols, setCols] = useState(3);
  const [sidebarVisible, setSidebarVisible] = useState(true);

  const wrapperRef = useRef(null);

  /* ── measure wrapper for cols + sidebar visibility ── */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const update = (w) => {
      setCols(getColumns(w));
      setSidebarVisible(w >= 860);
    };
    const ro = new ResizeObserver(([e]) => update(e.contentRect.width));
    ro.observe(el);
    update(el.getBoundingClientRect().width);
    return () => ro.disconnect();
  }, []);

  const [filters, setFilters] = useState(() => {
    const init = {};
    filterConfig.forEach((f) => {
      if (f?.id) init[f.id] = [];
    });
    return init;
  });

  const useCases = useMemo(() => initialData || [], [initialData]);

  /* ── URL param sync ── */
  useEffect(() => {
    if (!filterConfig.length) return;
    const cp = searchParams.get("country");
    if (cp) {
      const match = (staticOptions["Country"] || []).find(
        (o) => normalizeLabelForMatch(o) === normalizeLabelForMatch(cp),
      );
      if (match) setFilters((prev) => ({ ...prev, Country: [match] }));
    }
    const sp = searchParams.get("sector");
    if (sp) setActiveSector(sp);
    const mp = searchParams.get("maturity");
    if (mp) {
      const match = (staticOptions["CurrentStatus"] || []).find(
        (o) => normalizeLabelForMatch(o) === normalizeLabelForMatch(mp),
      );
      if (match) setFilters((prev) => ({ ...prev, CurrentStatus: [match] }));
    }
  }, [filterConfig, staticOptions, searchParams]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSector, search, filters]);

  /* ── filter + search ── */
  const filtered = useMemo(() => {
    return useCases.filter((uc) => {
      if (search.trim()) {
        const hay = [
          uc.Title,
          uc.Country,
          uc.Sector,
          uc.KeyTerms,
          uc.Description,
          uc.Remarks,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!hay.includes(search.toLowerCase())) return false;
      }
      const selRegion = filters["Region"] || [];
      if (selRegion.length > 0 && !selRegion.includes(uc.Region || ""))
        return false;
      const selCountry = filters["Country"] || [];
      if (selCountry.length > 0) {
        const ucc = Array.isArray(uc.Country)
          ? uc.Country
          : splitValues(uc.Country);
        if (!selCountry.some((c) => ucc.includes(c))) return false;
      }
      const selStatus = filters["CurrentStatus"] || [];
      if (selStatus.length > 0 && !selStatus.includes(uc.MaturityLevel || ""))
        return false;
      const selMode = filters["ModeofAccess"] || [];
      if (
        selMode.length > 0 &&
        !selMode.some((m) => getModeValues(uc).includes(m))
      )
        return false;
      const selAAL = filters["AuthenticationAssuranceLevel"] || [];
      if (selAAL.length > 0) {
        const raw = uc.AuthenticationAssuranceLevel || "";
        const match = raw.match(/^(AAL\s*\d+|Not available)/i);
        if (!selAAL.includes(match ? match[1] : raw)) return false;
      }
      return true;
    });
  }, [useCases, search, filters]);

  const sectorList = useMemo(() => {
    const counts = {};
    useCases.forEach((uc) =>
      splitValues(uc.Sector || "Other").forEach((s) => {
        counts[s] = (counts[s] || 0) + 1;
      }),
    );
    return Object.entries(counts).sort((a, b) => a[0].localeCompare(b[0]));
  }, [useCases]);

  const grouped = useMemo(() => {
    const map = {};
    filtered.forEach((uc) => {
      const p = splitValues(uc.Sector || "Other")[0] || "Other";
      if (!map[p]) map[p] = [];
      map[p].push(uc);
    });
    return Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]));
  }, [filtered]);

  const didInitRef = useRef(false);
  useEffect(() => {
    if (!didInitRef.current && grouped.length > 0) {
      didInitRef.current = true;
      setOpenSector(grouped[0][0]);
    }
  }, [grouped]);

  const pageSize = getPageSize(cols);
  const sectorItems = useMemo(() => {
    if (activeSector === "All") return [];
    return filtered.filter(
      (uc) =>
        (splitValues(uc.Sector || "Other")[0] || "Other") === activeSector,
    );
  }, [filtered, activeSector]);

  const totalPages = Math.ceil(sectorItems.length / pageSize);
  const pagedItems = sectorItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const handleFilterChange = (id, vals) =>
    setFilters((prev) => ({ ...prev, [id]: vals }));
  const clearAll = () => {
    const cleared = {};
    filterConfig.forEach((f) => {
      if (f?.id) cleared[f.id] = [];
    });
    setFilters(cleared);
    setSearch("");
    setSearchInput("");
    setActiveSector("All");
    setOpenSector(null);
  };
  const handleSelectSector = (sector) => {
    setActiveSector(sector);
    setCurrentPage(1);
  };
  const handleViewAll = (sector) => {
    setActiveSector(sector);
    setCurrentPage(1);
  };
  const handleToggle = (sector) =>
    setOpenSector((prev) => (prev === sector ? null : sector));
  const openUseCase = (uc) => {
    const id = uc?.ID ?? uc?.Id;
    if (id) router.push(`/use-cases/${id}`);
  };
  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [],
  );
  const isAllSectors = activeSector === "All";

  /* ── responsive page padding ── */
  const pagePadding = !sidebarVisible
    ? cols === 1
      ? "0 16px"
      : "0 48px"
    : "0 100px";

  return (
    <>
      <style>{`
  @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');
  .ucl-layout { display:flex; gap:24px; align-items:flex-start; }
  .ucl-content { flex:1; min-width:0; padding-top:8px; overflow: visible, height: auto,margin-bottom:15px; }
`}</style>

      <FilterBar
        filterConfig={filterConfig}
        filterOptions={{}}
        staticOptions={staticOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
        search={searchInput}
        onSearchChange={setSearchInput}
        onSearch={() => setSearch(searchInput)}
        sectorList={sectorList}
        activeSector={activeSector}
        onSelectSector={handleSelectSector}
        showSectorDropdown={!sidebarVisible}
      />

      <div
        ref={wrapperRef}
        style={{
          padding: pagePadding,
          boxSizing: "border-box",
          fontFamily: FONT,
          transition: "padding 200ms ease",
          height: "auto",
          minHeight: 0,
          overflow: "visible",
          marginBottom: 100,
        }}
      >
        <div
          style={{
            padding: "16px 0 12px",
            fontSize: 13,
            color: "#6B7280",
            fontFamily: FONT,
          }}
        >
          Total {filtered.length} use cases
        </div>

        <div className="ucl-layout">
          {sidebarVisible && (
            <SectorSidebar
              sectorList={sectorList}
              totalCount={useCases.length}
              activeSector={activeSector}
              onSelect={handleSelectSector}
            />
          )}

          <div className="ucl-content">
            {isAllSectors &&
              (grouped.length === 0 ? (
                <EmptyState onClear={clearAll} />
              ) : (
                grouped.map(([sector, items]) => (
                  <SectorGroup
                    key={sector}
                    sector={sector}
                    items={items}
                    onOpen={openUseCase}
                    onViewAll={handleViewAll}
                    expanded={openSector === sector}
                    onToggle={() => handleToggle(sector)}
                    cols={cols}
                  />
                ))
              ))}

            {!isAllSectors && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    padding: "14px 0",
                    borderBottom: "1px solid #E5E9F3",
                    marginBottom: 4,
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                     
                     
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={`/assets/sector_icons/${activeSector
                        .toLowerCase()
                        .replace(/\s*\/\s*/g, "_")
                        .replace(/\s+/g, "_")}.svg`}
                      alt=""
                      width={16}
                      height={16}
                      style={{ display: "block" }}
                    />
                  </span>
                  <span
                    style={{
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#0FIB2D",
                      fontFamily: FONT,
                    }}
                  >
                    {activeSector}
                  </span>
                  <span
                    style={{ fontSize: 13, color: "#9CA3AF", fontFamily: FONT }}
                  >
                    ({sectorItems.length})
                  </span>
                </div>
                {pagedItems.length === 0 ? (
                  <EmptyState onClear={clearAll} />
                ) : (
                  <>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: `repeat(${cols}, 1fr)`,
                        gap: 16,
                        padding: "16px 0",
                      }}
                    >
                      {pagedItems.map((uc, idx) => (
                        <UseCaseCard
                          key={`${activeSector}-${uc.ID ?? uc.Id ?? ""}-${idx}`}
                          uc={uc}
                          onOpen={openUseCase}
                        />
                      ))}
                    </div>
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(p) => {
                        setCurrentPage(p);
                        scrollToTop();
                      }}
                    />
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function EmptyState({ onClear }) {
  return (
    <div
      style={{
        marginTop: 48,
        textAlign: "center",
        fontSize: 14,
        color: "#6B7280",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
        fontFamily: FONT,
      }}
    >
      <p style={{ margin: 0 }}>No use cases match your search and filters.</p>
      <button
        onClick={onClear}
        style={{
          padding: "8px 20px",
          borderRadius: 999,
          border: "none",
          background: "#1F3A6D",
          color: "#fff",
          fontSize: 13,
          cursor: "pointer",
          fontFamily: FONT,
        }}
      >
        Clear filters
      </button>
    </div>
  );
}
