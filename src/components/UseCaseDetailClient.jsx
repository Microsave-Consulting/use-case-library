"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function splitValues(value) {
  if (!value) return [];
  return String(value).split(",").map((v) => v.trim()).filter(Boolean);
}

function splitMainAndTip(value) {
  const raw = String(value ?? "").trim();
  if (!raw) return { main: "—", tip: null };
  const idx = raw.indexOf(" - ");
  if (idx === -1) return { main: raw, tip: null };
  return {
    main: raw.slice(0, idx).trim() || "—",
    tip: raw.slice(idx + 3).trim() || null,
  };
}

function InfoTooltip({ tip }) {
  const [visible, setVisible] = useState(false);
  return (
    <span
      style={{ position: "relative", display: "inline-flex", alignItems: "center" }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      <span
        role="img"
        aria-label="More info"
        tabIndex={0}
        onFocus={() => setVisible(true)}
        onBlur={() => setVisible(false)}
        style={{
          display: "inline-flex", alignItems: "center", justifyContent: "center",
          width: 16, height: 16, cursor: "help", userSelect: "none", flexShrink: 0,
        }}
      >
        <img src={`${BASE_PATH}/assets/info.svg`} alt="" width={13} height={13} style={{ display: "block" }} />
      </span>
      {visible && (
        <span
          role="tooltip"
          style={{
            position: "absolute", left: 0, top: "calc(100% + 8px)",
            minWidth: 220, maxWidth: 300, padding: "10px 12px",
            borderRadius: 10, background: "#fff", color: "#111",
            fontSize: 12, lineHeight: 1.5,
            boxShadow: "0 8px 30px rgba(0,0,0,0.18)", zIndex: 50,
            fontFamily: FONT, border: "1px solid rgba(0,0,0,0.07)", whiteSpace: "normal",
          }}
        >
          {tip}
        </span>
      )}
    </span>
  );
}

function MetaItem({ label, value, showTooltip = false }) {
  const { main, tip } = showTooltip
    ? splitMainAndTip(value)
    : { main: value || "—", tip: null };

  return (
    <div style={{ minWidth: 0, fontFamily: FONT }}>
      <div style={{
        fontSize: 13, lineHeight: 1.3, color: "#334155",
        fontWeight: 500, marginBottom: 4,
      }}>
        {label}
      </div>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        fontSize: 14, color: "#000000", fontWeight: 500, minWidth: 0,
      }}>
        <span style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
          {main || "—"}
        </span>
        {showTooltip && tip && <InfoTooltip tip={tip} />}
      </div>
    </div>
  );
}

function SourceRow({ url }) {
  const [hovered, setHovered] = useState(false);
  const normalized = /^https?:\/\//i.test(url)
    ? url
    : /^www\./i.test(url) ? `https://${url}` : url;

  return (
  <a
    href={normalized}
    target="_blank"
    rel="noopener noreferrer"
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    style={{
      display: "flex", alignItems: "center", gap: 10,
      minHeight: 38, textDecoration: "none", fontFamily: FONT,
      borderBottom: "1px solid #F1F1F1",
    }}
  >
    <span style={{
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      width: 20, height: 20, flexShrink: 0, color: "#0F1B2D",
    }}>
      <img src={`${BASE_PATH}/assets/link.svg`} alt="" width={20} height={10} style={{ display: "block" }} />
    </span>
    <span style={{
      fontSize: 14, fontWeight: 500,
      color: hovered ? "#1F3A6D" : "#0F1B2D",
      textDecoration: "underline", textDecorationStyle: "solid",
      textUnderlineOffset: "2px", transition: "color 150ms ease",
      overflowWrap: "anywhere", wordBreak: "break-all",
      lineHeight: 1.4, padding: "10px 0",
    }}>
      {url}
    </span>
  </a>
);
}

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
        display: "inline-flex", alignItems: "center", gap: 10,
        height: 44, padding: "10px 16px",
        borderRadius: 8, border: "none",
        background:  "#1F3A6D",
        color: "#fff", fontFamily: FONT, fontSize: 14, fontWeight: 500,
        cursor: "pointer",
        transition: "background 250ms ease, box-shadow 250ms ease, transform 250ms ease",
        flexShrink: 0, boxSizing: "border-box",
      
        whiteSpace: "nowrap",
      }}
    >
      <img src={`${BASE_PATH}/assets/back.svg`} alt="" width={18} height={12} style={{ display: "block" }} />
      <span>Back</span>
    </button>
  );
}

function Breadcrumb({ sector, title }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex", alignItems: "center", gap: 6,
        fontFamily: FONT, fontSize: 14, color: "#6B7280",
        flexWrap: "wrap", minWidth: 0, flex: 1,
      }}
    >
      <Link
        href="/library"
        style={{ color: "#334155", fontWeight: 400, textDecoration: "none", whiteSpace: "nowrap" }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#1F3A6D")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
      >
        {sector || "Library"}
      </Link>
      <span aria-hidden="true" style={{ color: "#334155", fontWeight: 400, fontSize: 20 }}>›</span>
      <span style={{
        color: "#1F3A6D", fontWeight: 400,
        overflow: "hidden", textOverflow: "ellipsis",
        whiteSpace: "nowrap", maxWidth: "55vw",
      }}>
        {title}
      </span>
    </nav>
  );
}

export default function UseCaseDetailClient({ useCase }) {
  const router = useRouter();

  if (!useCase) {
    return (
      <div style={{
        maxWidth: 1440, margin: "0 auto", padding: "2rem 1.5rem",
        minHeight: "60vh", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "0.75rem", fontFamily: FONT,
      }}>
        <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 800, color: "#111" }}>
          Use case not found
        </h2>
        <p style={{ margin: 0, color: "#6B7280" }}>
          The link may be broken, or the item was removed.
        </p>
        <Link href="/library" style={{
          display: "inline-block", padding: "0.6rem 1.2rem",
          borderRadius: 10, textDecoration: "none",
          background: "#1F3A6D", color: "#fff", fontWeight: 700, fontFamily: FONT,
        }}>
          Back to Use Case Library
        </Link>
      </div>
    );
  }

  const title = useCase.Title || "—";
  const description = useCase.Description || useCase.Remarks || "";
  const region = useCase.Region || "—";
  const country = useCase.Country || "—";
  const sector = useCase.Sector || "";
  const maturity = useCase.MaturityLevel || "—";
  const modeAccess = useCase.ModeofAccess || "—";
  const aalRaw = useCase.AuthenticationAssuranceLevel || "—";
  const keyTerms = splitValues(useCase.KeyTerms);

  const sources = useMemo(() => {
    const raw = String(useCase.Source || useCase.Links || "").trim();
    if (!raw) return [];
    return raw.split(/\n|,/).map((s) => s.trim()).filter(Boolean);
  }, [useCase.Source, useCase.Links]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) router.back();
    else router.push("/library");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        /* ── Meta strip: matches library breakpoints ── */
        .ucd-meta-strip {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 20px 16px;
        }
        @media (max-width: 900px) {
          .ucd-meta-strip {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 560px) {
          .ucd-meta-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 16px 12px;
          }
        }
        @media (max-width: 360px) {
          .ucd-meta-strip {
            grid-template-columns: 1fr;
          }
        }

        /* ── Page wrapper padding: mirrors library pagePadding logic ── */
        .ucd-page-wrap {
          max-width: 1440px;
          margin: 0 auto;
          padding: 40px 100px 60px;
          box-sizing: border-box;
        }
        @media (max-width: 1400px) {
          .ucd-page-wrap { padding: 32px 48px 60px; }
        }
        @media (max-width: 860px) {
          .ucd-page-wrap { padding: 28px 48px 48px; }
        }
        @media (max-width: 560px) {
          .ucd-page-wrap { padding: 20px 16px 40px; }
        }

        /* ── Back + breadcrumb row ── */
        .ucd-nav-row {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 28px;
          flex-wrap: nowrap;
          min-width: 0;
        }
        @media (max-width: 560px) {
          .ucd-nav-row { gap: 10px; margin-bottom: 20px; }
        }

        /* ── Title ── */
        .ucd-title {
          margin: 0 0 16px;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.2;
          color: #0F1B2D;
          font-family: ${FONT};
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        @media (max-width: 860px) {
          .ucd-title { font-size: 22px; }
        }
        @media (max-width: 560px) {
          .ucd-title { font-size: 19px; margin-bottom: 12px; }
        }
        @media (max-width: 360px) {
          .ucd-title { font-size: 17px; }
        }

        /* ── Description ── */
        .ucd-desc {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.6;
          color: #334155;
          font-family: ${FONT};
          overflow-wrap: anywhere;
          margin: 0;
        }
        @media (max-width: 560px) {
          .ucd-desc { font-size: 15px; }
        }

        /* ── Section headings ── */
        .ucd-section-heading {
          margin: 0 0 16px;
          font-size: 16px;
          font-weight: 600;
          color: #0F1B2D;
          font-family: ${FONT};
          line-height: 100%;
        }

        /* ── Key terms ── */
        .ucd-terms-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .ucd-term {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 10px 14px;
          border-radius: 12px;
          background: #EEF4FF;
          font-size: 14px;
          font-weight: 400;
          color: #334155;
          font-family: ${FONT};
          white-space: nowrap;
          height: 38px;
          box-sizing: border-box;
        }
        @media (max-width: 560px) {
          .ucd-term { font-size: 13px; padding: 8px 12px; height: 34px; }
        }

        /* ── Meta strip container ── */
        .ucd-meta-container {
          background: #EEF4FF;
          border-radius: 8px;
          border: 1px solid #F7FAFF;
          padding: 24px;
          margin-bottom: 32px;
          box-sizing: border-box;
        }
        @media (max-width: 560px) {
          .ucd-meta-container { padding: 16px; margin-bottom: 24px; }
        }

        /* ── Sections spacing ── */
        .ucd-section {
          margin-bottom: 32px;
        }
        @media (max-width: 560px) {
          .ucd-section { margin-bottom: 24px; }
        }
      `}</style>

      <div className="ucd-page-wrap" style={{ fontFamily: FONT, background: "#fff", position: "relative", zIndex: 0 }}>

        {/* ── Row 1: Back + Breadcrumb ── */}
        <div className="ucd-nav-row">
          <BackButton onClick={handleBack} />
          <Breadcrumb sector={sector} title={title} />
        </div>

        {/* ── Row 2: Title ── */}
        <h1 className="ucd-title">{title}</h1>

        {/* ── Row 3: Description ── */}
        <div className="ucd-section">
          {description ? (
            String(description).split(/\n\s*\n/).map((para, idx) => (
              <p
                key={idx}
                className="ucd-desc"
                style={{ marginTop: idx === 0 ? 0 : 12 }}
              >
                {para.trim()}
              </p>
            ))
          ) : (
            <p style={{ margin: 0, color: "#9CA3AF", fontFamily: FONT }}>
              No description available.
            </p>
          )}
        </div>

        {/* ── Row 4: Meta strip ── */}
        <div className="ucd-meta-container">
          <div className="ucd-meta-strip" role="group" aria-label="Use case metadata">
            <MetaItem label="Mode of Access" value={modeAccess} />
            <MetaItem label="Maturity level" value={maturity} />
            <MetaItem label="Region" value={region} />
            <MetaItem label="Country" value={country} />
            <MetaItem label="Sector" value={sector} />
            <MetaItem label="Authentication Assurance Level" value={aalRaw} showTooltip />
          </div>
        </div>

        {/* ── Row 5: Key terms ── */}
        <section className="ucd-section">
          <h2 className="ucd-section-heading">Key terms</h2>
          {keyTerms.length ? (
            <div className="ucd-terms-wrap">
              {keyTerms.map((term) => (
                <span key={term} className="ucd-term">{term}</span>
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "#9CA3AF", fontFamily: FONT }}>
              No key terms listed.
            </p>
          )}
        </section>

        {/* ── Row 6: Sources ── */}
        <section className="ucd-section">
          <h2 className="ucd-section-heading">Sources</h2>
          {sources.length ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {sources.map((url, idx) => (
                <SourceRow key={`${url}-${idx}`} url={url} />
              ))}
            </div>
          ) : (
            <p style={{ margin: 0, color: "#9CA3AF", fontFamily: FONT }}>
              No sources available.
            </p>
          )}
        </section>

      </div>
    </>
  );
}