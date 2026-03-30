"use client";
// src/components/UseCaseDotMap.jsx
import { useMemo, useRef, useState } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { geoCentroid } from "d3-geo";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";

countries.registerLocale(enLocale);

const geoUrl = "https://unpkg.com/world-atlas@2.0.2/countries-110m.json";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* ─── helpers ───────────────────────────────────────────────── */
function splitValues(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}
function getCountriesFromItem(it) {
  const raw =
    it?.countries ??
    it?.Countries ??
    it?.country ??
    it?.Country ??
    it?.country_covered ??
    it?.countryCovered ??
    it?.country_name;
  if (Array.isArray(raw))
    return raw.map((c) => String(c).trim()).filter(Boolean);
  return splitValues(raw);
}
function flagUrlFromIso2(iso2) {
  if (!iso2) return null;
  return `https://flagcdn.com/w40/${iso2.toLowerCase()}.png`;
}
function safeUpperLabel(label) {
  const t = String(label || "").toUpperCase();
  return t.length > 22 ? `${t.slice(0, 22)}…` : t;
}

/* ═══════════════════════════════════════════════════════════════
   COMPONENT
═══════════════════════════════════════════════════════════════ */
export default function UseCaseDotMap({ items }) {
  const [hover, setHover] = useState(null);

  const hideTimerRef = useRef(null);
  const scheduleHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = setTimeout(() => setHover(null), 150);
  };
  const cancelHide = () => {
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    hideTimerRef.current = null;
  };

  // CHANGE 2: Increased MAP_W, MAP_H and scale; adjusted center Y to re-center without Antarctica
  const MAP_W = 1300;
  const MAP_H = 520;
  const PROJ_CFG = { scale: 175, center: [0, 10] };
  const TIP_W = 220;
  const TIP_H = 74;
  const TIP_HALF = TIP_W / 2;

  /* ── build country counts ── */
  const { countsByIso2, labelByIso2 } = useMemo(() => {
    const counts = {};
    const labels = {};
    (items || []).forEach((row) => {
      getCountriesFromItem(row).forEach((name) => {
        const iso2 = countries.getAlpha2Code(name, "en");
        if (!iso2) return;
        const code = iso2.toUpperCase();
        counts[code] = (counts[code] || 0) + 1;
        if (!labels[code]) labels[code] = name;
      });
    });
    return { countsByIso2: counts, labelByIso2: labels };
  }, [items]);

  /* ── Navigate to library with country filter applied ── */
  function goToLibraryForCountry(countryLabel) {
    if (!countryLabel) return;
    const params = new URLSearchParams();
    params.set("f_Country", countryLabel);
    window.location.href = `/library?${params.toString()}`;
  }

  return (
    <>
      <style>{`
        /* ── Section wrapper ── */
        .ucdm-section {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          padding: clamp(48px, 5vw, 40px) clamp(20px, 5vw, 80px);
          box-sizing: border-box;
          position: relative;
          overflow: hidden;
        }

        .ucdm-inner {
          position: relative;
          z-index: 1;
          
          margin: 0 auto;
        }

        /* ── Header ── */
        .ucdm-header {
          text-align: center;
          /* CHANGE 3: Reduced margin-bottom from clamp(18px, 2vw, 36px) to clamp(4px, 0.5vw, 8px) */
          margin-bottom: clamp(4px, 0.5vw, 8px);
        }
        .ucdm-heading {
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(20px, 2.2vw, 36px);
          line-height: 1.22;
          color: #1B66D1;
          margin: 0 0 0px 0;
          letter-spacing: -0.015em;
        }

        /* ── Map card ── */
        .ucdm-card {
          background: #ffffff;
          overflow: hidden;
          position: relative;
        }

        .ucdm-map-inner {
          padding: 4px 0 0;
          background: #ffffff;
        }
        .ucdm-map-inner svg {
          display: block;
          width: 100%;
          height: auto;
        }

        /* ── Strip all focus/active outlines from SVG elements ── */
        .ucdm-map-inner svg *:focus,
        .ucdm-map-inner svg *:focus-visible,
        .ucdm-map-inner svg *:active,
        .ucdm-map-inner g:focus,
        .ucdm-map-inner path:focus,
        .ucdm-map-inner circle:focus {
          outline: none !important;
          box-shadow: none !important;
        }

        /* ── Pulse animation for hovered country dot ── */
        @keyframes ucdm-pulse {
          0%   { r: 5;  opacity: 0.9; }
          70%  { r: 15; opacity: 0;   }
          100% { r: 15; opacity: 0;   }
        }
        .ucdm-pulse { animation: ucdm-pulse 2s ease-out infinite; }

        /* ── Mobile bottom-sheet tooltip ── */
        .ucdm-mobile-tooltip {
          display: none;
          position: fixed;
          bottom: 24px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 9999;
          width: calc(100vw - 40px);
          max-width: 320px;
          background: #ffffff;
          border-radius: 16px;
          box-shadow:
            0 8px 32px rgba(31, 58, 109, 0.18),
            0 0 0 1px rgba(31, 58, 109, 0.08);
          overflow: hidden;
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }
        .ucdm-mobile-tooltip-inner {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 16px;
          position: relative;
        }
        .ucdm-mobile-tooltip-accent {
          position: absolute;
          left: 0; top: 0; bottom: 0;
          width: 5px;
          background: #1B66D1;
          border-radius: 16px 0 0 16px;
        }
        .ucdm-mobile-tooltip-flag {
          width: 36px;
          height: 24px;
          object-fit: cover;
          border-radius: 3px;
          flex-shrink: 0;
          margin-left: 5px;
        }
        .ucdm-mobile-tooltip-body {
          flex: 1;
          min-width: 0;
        }
        .ucdm-mobile-tooltip-name {
          font-family: ${FONT};
          font-size: 13px;
          font-weight: 800;
          color: #1F3A6D;
          letter-spacing: 0.04em;
          text-transform: uppercase;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .ucdm-mobile-tooltip-count {
          font-family: ${FONT};
          font-size: 12px;
          color: #64748b;
          margin-top: 2px;
        }
        .ucdm-mobile-tooltip-count strong {
          color: #1B66D1;
          font-weight: 800;
          font-size: 14px;
        }
        .ucdm-mobile-tooltip-arrow {
          font-family: ${FONT};
          font-size: 11px;
          color: #94a3b8;
          font-style: italic;
          flex-shrink: 0;
          white-space: nowrap;
        }

        /* ── Responsive ── */
        @media (max-width: 768px) {
          .ucdm-section {
            padding: 32px 16px;
          }
          .ucdm-heading {
            font-size: clamp(18px, 5vw, 26px);
            margin: 0 0 24px 0;
          }
          .ucdm-inner {
            max-width: 100%;
          }
          .ucdm-mobile-tooltip {
            display: block;
          }
        }

        @media (max-width: 480px) {
          .ucdm-section {
            padding: 24px 12px;
          }
          .ucdm-heading {
            font-size: clamp(16px, 5.5vw, 22px);
            margin: 0 0 18px 0;
          }
          .ucdm-mobile-tooltip-arrow {
            display: none;
          }
        }
      `}</style>

      <section className="ucdm-section">
        <div className="ucdm-inner">
          {/* ── Header ── */}
          <div className="ucdm-header">
            <h2 className="ucdm-heading">
              Navigate Digital ID use cases across the globe
            </h2>
          </div>

          {/* ── Map card ── */}
          <div className="ucdm-card">
            <div className="ucdm-map-inner">
              <ComposableMap
                projection="geoEquirectangular"
                projectionConfig={PROJ_CFG}
                width={MAP_W}
                height={MAP_H}
                style={{ background: "transparent" }}
              >
                <defs>
                  {/* Inactive countries */}
                  <pattern
                    id="ucdm-dots"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.5" cy="1.5" r="1.2" fill="#284181" />
                  </pattern>

                  {/* Active — has data */}
                  <pattern
                    id="ucdm-dots-active"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.5" cy="1.5" r="1.3" fill="#1F4A9C" />
                  </pattern>

                  {/* Hovered — brand blue */}
                  <pattern
                    id="ucdm-dots-hover"
                    x="0"
                    y="0"
                    width="4"
                    height="4"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="1.5" cy="1.5" r="1.3" fill="#1B66D1" />
                  </pattern>

                  {/* Tooltip drop-shadow */}
                  <filter
                    id="ucdm-tip-shadow"
                    x="-25%"
                    y="-25%"
                    width="150%"
                    height="160%"
                  >
                    <feDropShadow
                      dx="0"
                      dy="6"
                      stdDeviation="14"
                      floodColor="#1F3A6D"
                      floodOpacity="0.20"
                    />
                  </filter>
                </defs>

                <Geographies geography={geoUrl}>
                  {({ geographies }) => {
                    const wanted = new Set(Object.keys(countsByIso2));
                    const centroidsByIso2 = {};

                    geographies.forEach((geo) => {
                      const p = geo.properties || {};
                      const geoName = p.name || p.NAME || p.ADMIN || "";
                      // CHANGE 1: Skip Antarctica in centroid loop
                      if (geoName === "Antarctica") return;
                      let iso2 = (
                        p.ISO_A2 ||
                        p.iso_a2 ||
                        p.ISO2 ||
                        ""
                      ).toUpperCase();
                      if (!iso2 && geoName) {
                        const r = countries.getAlpha2Code(geoName, "en");
                        if (r) iso2 = r.toUpperCase();
                      }
                      if (!iso2 || !wanted.has(iso2)) return;
                      const c = geoCentroid(geo);
                      if (
                        Array.isArray(c) &&
                        !Number.isNaN(c[0]) &&
                        !Number.isNaN(c[1])
                      ) {
                        centroidsByIso2[iso2] = c;
                      }
                    });

                    return (
                      <>
                        {/* ── Geography shapes ── */}
                        {geographies.map((geo) => {
                          const p = geo.properties || {};
                          const geoName = p.name || p.NAME || p.ADMIN || "";
                          // CHANGE 1: Skip Antarctica in render loop
                          if (geoName === "Antarctica") return null;
                          let iso2 = (
                            p.ISO_A2 ||
                            p.iso_a2 ||
                            p.ISO2 ||
                            ""
                          ).toUpperCase();
                          if (!iso2 && geoName) {
                            const r = countries.getAlpha2Code(geoName, "en");
                            if (r) iso2 = r.toUpperCase();
                          }
                          const value = iso2 ? countsByIso2[iso2] || 0 : 0;
                          const hasData = Boolean(iso2 && value > 0);
                          const isHov = Boolean(
                            hover?.iso2 && iso2 && hover.iso2 === iso2,
                          );

                          return (
                            <Geography
                              key={geo.rsmKey}
                              geography={geo}
                              fill={
                                isHov
                                  ? "url(#ucdm-dots-hover)"
                                  : hasData
                                    ? "url(#ucdm-dots-active)"
                                    : "url(#ucdm-dots)"
                              }
                              stroke="#ffffff"
                              strokeWidth={0.8}
                              tabIndex={-1}
                              aria-hidden="true"
                              onMouseEnter={() => {
                                if (!hasData) return;
                                cancelHide();
                                const label = labelByIso2[iso2] || geoName;
                                const coords =
                                  centroidsByIso2[iso2] || geoCentroid(geo);
                                if (!coords) return;
                                setHover({ iso2, label, value, coords });
                              }}
                              onMouseLeave={() => {
                                if (hasData) scheduleHide();
                              }}
                              onClick={() => {
                                if (hasData)
                                  goToLibraryForCountry(
                                    labelByIso2[iso2] || geoName,
                                  );
                              }}
                              onTouchEnd={(e) => {
                                if (!hasData) return;
                                e.preventDefault();
                                const label = labelByIso2[iso2] || geoName;
                                const coords =
                                  centroidsByIso2[iso2] || geoCentroid(geo);
                                setHover({ iso2, label, value, coords });
                              }}
                              style={{
                                default: {
                                  outline: "none",
                                  cursor: hasData ? "pointer" : "default",
                                },
                                hover: { outline: "none" },
                                pressed: { outline: "none" },
                              }}
                            />
                          );
                        })}

                        {/* ── Active-country dot markers ── */}
                        {Object.keys(countsByIso2).map((iso2) => {
                          const coords = centroidsByIso2[iso2];
                          if (!coords) return null;
                          const value = countsByIso2[iso2] || 0;
                          const label = labelByIso2[iso2] || iso2;
                          const isHov = hover?.iso2 === iso2;

                          return (
                            <Marker
                              key={iso2}
                              coordinates={coords}
                              onMouseEnter={() => {
                                cancelHide();
                                setHover({ iso2, label, value, coords });
                              }}
                              onMouseLeave={scheduleHide}
                              onClick={() => goToLibraryForCountry(label)}
                              onTouchEnd={(e) => {
                                e.preventDefault();
                                setHover({ iso2, label, value, coords });
                              }}
                            >
                              <g
                                style={{ cursor: "pointer", outline: "none" }}
                                aria-hidden="true"
                                tabIndex={-1}
                              >
                                {isHov && (
                                  <circle
                                    r={5}
                                    fill="none"
                                    stroke="#1B66D1"
                                    strokeWidth={1.5}
                                    className="ucdm-pulse"
                                  />
                                )}
                                <circle r={5} fill="#ffffff" />
                                <circle
                                  r={3}
                                  fill={isHov ? "#1B66D1" : "#1F3A6D"}
                                />
                              </g>
                            </Marker>
                          );
                        })}

                        {/* ── Hover tooltip (desktop) ── */}
                        {hover?.coords && (
                          <Marker coordinates={hover.coords}>
                            <g
                              onMouseEnter={cancelHide}
                              onMouseLeave={scheduleHide}
                              onClick={() => goToLibraryForCountry(hover.label)}
                              role="button"
                              tabIndex={-1}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ")
                                  goToLibraryForCountry(hover.label);
                              }}
                              aria-label={`View use cases for ${hover.label}`}
                              style={{
                                cursor: "pointer",
                                outline: "none",
                                WebkitTapHighlightColor: "transparent",
                              }}
                            >
                              <g
                                aria-hidden="true"
                                style={{ pointerEvents: "none" }}
                              >
                                <circle r={5} fill="#ffffff" />
                                <circle r={3} fill="#1B66D1" />
                              </g>

                              <g
                                transform={`translate(${-TIP_HALF}, ${-(TIP_H + 24)})`}
                              >
                                {/* Card background */}
                                <rect
                                  x="0"
                                  y="0"
                                  rx="14"
                                  ry="14"
                                  width={TIP_W}
                                  height={TIP_H}
                                  filter="url(#ucdm-tip-shadow)"
                                  style={{ fill: "#ffffff" }}
                                />

                                {/* Blue left accent */}
                                <rect
                                  x="0"
                                  y="0"
                                  rx="14"
                                  ry="14"
                                  width={5}
                                  height={TIP_H}
                                  style={{ fill: "#1B66D1" }}
                                />
                                <rect
                                  x="0"
                                  y={TIP_H / 2}
                                  width={5}
                                  height={TIP_H / 2}
                                  style={{ fill: "#1B66D1" }}
                                />

                                {/* Flag */}
                                <image
                                  href={flagUrlFromIso2(hover.iso2)}
                                  x="16"
                                  y="13"
                                  width="26"
                                  height="18"
                                  preserveAspectRatio="xMidYMid slice"
                                />

                                {/* Country name */}
                                <text
                                  x="50"
                                  y="27"
                                  style={{
                                    fontFamily: FONT,
                                    fontWeight: 800,
                                    fontSize: 12.5,
                                    fill: "#1F3A6D",
                                    letterSpacing: "0.05em",
                                  }}
                                >
                                  {safeUpperLabel(hover.label)}
                                </text>

                                {/* Divider */}
                                <line
                                  x1="16"
                                  y1="39"
                                  x2={TIP_W - 16}
                                  y2="39"
                                  stroke="#EEF2FB"
                                  strokeWidth="1"
                                />

                                {/* Use cases count */}
                                <text
                                  x="16"
                                  y="57"
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: 12.5,
                                    fill: "#64748b",
                                  }}
                                >
                                  <tspan style={{ fontWeight: 500 }}>
                                    Use Cases:{" "}
                                  </tspan>
                                  <tspan
                                    style={{
                                      fontWeight: 800,
                                      fill: "#1B66D1",
                                      fontSize: 15,
                                    }}
                                  >
                                    {hover.value}
                                  </tspan>
                                </text>

                                {/* Click hint */}
                                <text
                                  x={TIP_W - 14}
                                  y="57"
                                  textAnchor="end"
                                  style={{
                                    fontFamily: FONT,
                                    fontSize: 10,
                                    fill: "#94a3b8",
                                    fontStyle: "italic",
                                  }}
                                >
                                  click to explore →
                                </text>

                                {/* Pointer triangle */}
                                <path
                                  d={`M ${TIP_HALF - 10} ${TIP_H} L ${TIP_HALF} ${TIP_H + 13} L ${TIP_HALF + 10} ${TIP_H} Z`}
                                  style={{ fill: "#ffffff" }}
                                />
                              </g>
                            </g>
                          </Marker>
                        )}
                      </>
                    );
                  }}
                </Geographies>
              </ComposableMap>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mobile bottom-sheet tooltip (shown on tap) ── */}
      {hover && (
        <div
          className="ucdm-mobile-tooltip"
          role="button"
          tabIndex={0}
          aria-label={`View use cases for ${hover.label}`}
          onClick={() => goToLibraryForCountry(hover.label)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ")
              goToLibraryForCountry(hover.label);
          }}
        >
          <div className="ucdm-mobile-tooltip-inner">
            <div className="ucdm-mobile-tooltip-accent" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={flagUrlFromIso2(hover.iso2)}
              alt={hover.label}
              className="ucdm-mobile-tooltip-flag"
            />
            <div className="ucdm-mobile-tooltip-body">
              <div className="ucdm-mobile-tooltip-name">
                {safeUpperLabel(hover.label)}
              </div>
              <div className="ucdm-mobile-tooltip-count">
                Use Cases: <strong>{hover.value}</strong>
              </div>
            </div>
            <div className="ucdm-mobile-tooltip-arrow">tap to explore →</div>
          </div>
        </div>
      )}
    </>
  );
}
