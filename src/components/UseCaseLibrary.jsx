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
import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const SIDEBAR_WIDTH = 316;

function getColumns(w, sidebarVisible) {
  if (w <= 480) return 1;
  const contentWidth = sidebarVisible ? w - SIDEBAR_WIDTH : w;
  if (contentWidth >= 900) return 4;
  if (contentWidth >= 640) return 3;
  if (contentWidth >= 400) return 2;
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
function getModeValues(uc) {
  const raw = uc.ModeofAccess;
  if (!raw) return [];
  if (Array.isArray(raw))
    return raw.map((v) => String(v).trim()).filter(Boolean);
  return splitValues(raw);
}

/* ══════════════════════════════════════════════════
   Back Button
══════════════════════════════════════════════════ */
function BackButton({ onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        height: 36,
        padding: "0 14px",
        borderRadius: 8,
        border: "none",
        background: "#1F3A6D",
        color: "#fff",
        fontFamily: FONT,
        fontSize: 13,
        fontWeight: 500,
        cursor: "pointer",
        flexShrink: 0,
        boxSizing: "border-box",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={`${BASE_PATH}/assets/back.svg`}
        alt=""
        width={16}
        height={11}
        style={{ display: "block" }}
      />
      <span>Back</span>
    </button>
  );
}

/* ══════════════════════════════════════════════════
   Search Results Header
══════════════════════════════════════════════════ */
function SearchResultsHeader({ query, count }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 6,
        padding: "20px 0 18px",
        borderBottom: "1px solid #E5E9F3",
        marginBottom: 4,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "#EEF4FF",
            flexShrink: 0,
          }}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" stroke="#1F3A6D" strokeWidth="2" />
            <path
              d="M20 20L16.65 16.65"
              stroke="#1F3A6D"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </span>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            minWidth: 0,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 600,
                color: "#0F1B2D",
                fontFamily: FONT,
              }}
            >
              Results for
            </span>
            <span
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1F3A6D",
                fontFamily: FONT,
                background: "#EEF4FF",
                padding: "2px 10px",
                borderRadius: 6,
                wordBreak: "break-word",
              }}
            >
              "{query}"
            </span>
          </div>
          <span
            style={{
              fontSize: 13,
              color: "#6B7280",
              fontFamily: FONT,
            }}
          >
            {count === 0
              ? "No use cases found"
              : `${count} use case${count === 1 ? "" : "s"} found`}
          </span>
        </div>
      </div>
    </div>
  );
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
              src={`${BASE_PATH}/assets/sector_icons/${sector
                .toLowerCase()
                .replace(/\s*\/\s*/g, "_")
                .replace(/\s+/g, "_")}.svg`}
              alt=""
              width={28}
              height={28}
              style={{ display: "block" }}
            />
          </span>
          <span
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: "#0F1B2D",
              fontFamily: FONT,
            }}
          >
            {sector}
          </span>
          <span style={{ fontSize: 13, color: "#9CA3AF", fontFamily: FONT }}>
            ({items.length})
          </span>
        </div>
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

  const [search, setSearch] = useState(() => searchParams.get("q") || "");
  const [searchInput, setSearchInput] = useState(
    () => searchParams.get("q") || "",
  );
  const [activeSector, setActiveSector] = useState(
    () => searchParams.get("sector") || "All",
  );
  const [currentPage, setCurrentPage] = useState(
    () => Number(searchParams.get("page")) || 1,
  );
  const [openSector, setOpenSector] = useState(
    () => searchParams.get("open") || null,
  );

  // FIX 3 & 4: Use SSR-safe defaults first, then immediately correct on mount
  // in the same useEffect that sets up the resize listener. This avoids the
  // hydration mismatch (server has no window) while still preventing the
  // post-mount reflow — the correction happens before the browser paints.
  const [cols, setCols] = useState(3);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [wrapperWidth, setWrapperWidth] = useState(1200);

  // Snapshot for Back button
  const previousStateRef = useRef(null);

  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      const visible = w >= 960;
      setSidebarVisible(visible);
      setWrapperWidth(w);
      setCols(getColumns(w, visible));
    };
    update(); // Correct immediately on mount before first paint
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const [filters, setFilters] = useState(() => {
    const init = {};
    filterConfig.forEach((f) => {
      if (f?.id) init[f.id] = [];
    });
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      filterConfig.forEach((f) => {
        if (!f?.id) return;
        const val = params.get(`f_${f.id}`);
        if (val) init[f.id] = val.split("|").filter(Boolean);
      });
    }
    return init;
  });

  const useCases = useMemo(() => initialData || [], [initialData]);

  /* ── Sync state → URL ── */
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
      return;
    }
    const params = new URLSearchParams();
    if (activeSector && activeSector !== "All")
      params.set("sector", activeSector);
    if (currentPage > 1) params.set("page", String(currentPage));
    if (search) params.set("q", search);
    if (openSector) params.set("open", openSector);
    Object.entries(filters).forEach(([key, vals]) => {
      if (vals && vals.length > 0) params.set(`f_${key}`, vals.join("|"));
    });
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname,
    );
  }, [activeSector, currentPage, search, openSector, filters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeSector, search, filters]);

  /* ── Filter + search ── */
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
      if (!openSector) setOpenSector(grouped[0][0]);
    }
  }, [grouped]);

  const pageSize = getPageSize(cols);

  /* ── Sector-drilled view ── */
  const sectorItems = useMemo(() => {
    if (activeSector === "All") return [];
    return filtered.filter(
      (uc) =>
        (splitValues(uc.Sector || "Other")[0] || "Other") === activeSector,
    );
  }, [filtered, activeSector]);

  /* ── Search results view (paginated flat list) ── */
  const searchPageSize = pageSize;
  const [searchPage, setSearchPage] = useState(1);
  useEffect(() => {
    setSearchPage(1);
  }, [search]);

  const searchTotalPages = Math.ceil(filtered.length / searchPageSize);
  const searchPagedItems = filtered.slice(
    (searchPage - 1) * searchPageSize,
    searchPage * searchPageSize,
  );

  const totalPages = Math.ceil(sectorItems.length / pageSize);
  const pagedItems = sectorItems.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );

  const scrollToTop = useCallback(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [],
  );

  /* ── Snapshot helpers ── */
  const saveSnapshot = () => {
    if (previousStateRef.current === null) {
      previousStateRef.current = {
        activeSector,
        search,
        searchInput,
        filters: JSON.parse(JSON.stringify(filters)),
        currentPage,
        openSector,
      };
    }
  };

  const handleFilterChange = (id, vals) => {
    saveSnapshot();
    setFilters((prev) => ({ ...prev, [id]: vals }));
  };

  const handleSearch = () => {
    if (searchInput.trim()) saveSnapshot();
    setSearch(searchInput);
  };

  const clearAll = () => {
    const cleared = {};
    filterConfig.forEach((f) => {
      if (f?.id) cleared[f.id] = [];
    });
    previousStateRef.current = null;
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
    saveSnapshot();
    setActiveSector(sector);
    setCurrentPage(1);
  };
  const handleToggle = (sector) =>
    setOpenSector((prev) => (prev === sector ? null : sector));
  const openUseCase = (uc) => {
    const id = uc?.ID ?? uc?.Id;
    if (id) router.push(`/use-cases/${id}`);
  };

  /* ── Back button ── */
  const hasActiveFilters =
    search.trim().length > 0 ||
    Object.values(filters).some((vals) => vals && vals.length > 0);
  const showBackButton = activeSector !== "All" || hasActiveFilters;

  const handleBack = () => {
    const prev = previousStateRef.current;
    if (prev) {
      setActiveSector(prev.activeSector);
      setSearch(prev.search);
      setSearchInput(prev.searchInput);
      setFilters(prev.filters);
      setCurrentPage(prev.currentPage);
      setOpenSector(prev.openSector);
      previousStateRef.current = null;
    } else {
      clearAll();
    }
    scrollToTop();
  };

  /* ── View mode ── */
  const isSearchMode = search.trim().length > 0;
  const isAllSectors = activeSector === "All";

  const pagePadding = sidebarVisible
    ? wrapperWidth >= 1100
      ? "0 100px"
      : "0 48px"
    : wrapperWidth <= 560
      ? "0 16px"
      : "0 48px";

  return (
    <>
      <style>{`
        /* FIX 2: Removed @import url('https://fonts.googleapis.com/...') from here.
           Third duplicate across the codebase — same font already loaded in layout.js.
           Each duplicate @import caused an independent font swap → layout shift. */
        .ucl-layout { display:flex; gap:24px; align-items:flex-start; }
        .ucl-content { flex:1; min-width:0; padding-top:8px; overflow:visible; height:auto; margin-bottom:15px; }
        .ucl-content-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 0 12px;
          gap: 12px;
        }
        .ucl-total-count {
          font-size: 13px;
          color: #6B7280;
          font-family: ${FONT};
          flex-shrink: 0;
        }
        .ucl-search-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 64px 24px;
          text-align: center;
        }
      `}</style>

      <FilterBar
        filterConfig={filterConfig}
        filterOptions={{}}
        staticOptions={staticOptions}
        filters={filters}
        onFilterChange={handleFilterChange}
        search={searchInput}
        onSearchChange={setSearchInput}
        onSearch={handleSearch}
        sectorList={sectorList}
        activeSector={activeSector}
        onSelectSector={handleSelectSector}
        showSectorDropdown={!sidebarVisible}
      />

      <div
        style={{
          padding: pagePadding,
          boxSizing: "border-box",
          fontFamily: FONT,
          height: "auto",
          minHeight: 0,
          overflow: "visible",
          marginBottom: 100,
        }}
      >
        {/* ── Header row: total count left · Back button right ── */}
        <div className="ucl-content-header">
          <span className="ucl-total-count">
            Total {useCases.length} use cases
          </span>
          {showBackButton && <BackButton onClick={handleBack} />}
        </div>

        {/* ════════════════════════════════════════
            SEARCH RESULTS MODE
        ════════════════════════════════════════ */}
        {isSearchMode && (
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
              <SearchResultsHeader
                query={search.trim()}
                count={filtered.length}
              />

              {filtered.length === 0 ? (
                <div className="ucl-search-empty">
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: "#F3F6FF",
                    }}
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      aria-hidden="true"
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
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#334155",
                      fontFamily: FONT,
                    }}
                  >
                    No results for "{search.trim()}"
                  </p>
                  <p
                    style={{
                      margin: 0,
                      fontSize: 13,
                      color: "#9CA3AF",
                      fontFamily: FONT,
                    }}
                  >
                    Try a different keyword or clear filters.
                  </p>
                  <button
                    onClick={clearAll}
                    style={{
                      marginTop: 4,
                      padding: "9px 20px",
                      borderRadius: 999,
                      border: "none",
                      background: "#1F3A6D",
                      color: "#fff",
                      fontSize: 13,
                      fontWeight: 500,
                      cursor: "pointer",
                      fontFamily: FONT,
                    }}
                  >
                    Clear search
                  </button>
                </div>
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
                    {searchPagedItems.map((uc, idx) => (
                      <UseCaseCard
                        key={`search-${uc.ID ?? uc.Id ?? ""}-${idx}`}
                        uc={uc}
                        onOpen={openUseCase}
                      />
                    ))}
                  </div>
                  <Pagination
                    currentPage={searchPage}
                    totalPages={searchTotalPages}
                    onPageChange={(p) => {
                      setSearchPage(p);
                      scrollToTop();
                    }}
                  />
                </>
              )}
            </div>
          </div>
        )}

        {/* ════════════════════════════════════════
            NORMAL MODE (grouped / sector drilled)
        ════════════════════════════════════════ */}
        {!isSearchMode && (
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
              {/* All-sectors grouped view */}
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

              {/* Single-sector drilled view */}
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
                        src={`${BASE_PATH}/assets/sector_icons/${activeSector
                          .toLowerCase()
                          .replace(/\s*\/\s*/g, "_")
                          .replace(/\s+/g, "_")}.svg`}
                        alt=""
                        width={28}
                        height={28}
                        style={{ display: "block" }}
                      />
                    </span>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#0F1B2D",
                        fontFamily: FONT,
                      }}
                    >
                      {activeSector}
                    </span>
                    <span
                      style={{
                        fontSize: 13,
                        color: "#9CA3AF",
                        fontFamily: FONT,
                      }}
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
        )}
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
