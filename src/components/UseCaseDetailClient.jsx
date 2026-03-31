"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BASE_PATH } from "@/lib/siteConfig";
import hackathon from "../../public/data/hackathon_urls.json";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

function splitValues(value) {
  if (!value) return [];
  return String(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
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
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
      }}
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
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1rem",
          height: "1rem",
          cursor: "help",
          userSelect: "none",
          flexShrink: 0,
        }}
      >
        <img
          src={`${BASE_PATH}/assets/info.svg`}
          alt=""
          width={13}
          height={13}
          style={{ display: "block" }}
        />
      </span>
      {visible && (
        <span
          role="tooltip"
          style={{
            position: "absolute",
            left: 0,
            top: "calc(100% + 0.5rem)",
            minWidth: "13.75rem",
            maxWidth: "18.75rem",
            padding: "0.625rem 0.75rem",
            borderRadius: "0.625rem",
            background: "#fff",
            color: "#111",
            fontSize: "0.75rem",
            lineHeight: 1.5,
            boxShadow: "0 0.5rem 1.875rem rgba(0,0,0,0.18)",
            zIndex: 50,
            fontFamily: FONT,
            border: "1px solid rgba(0,0,0,0.07)",
            whiteSpace: "normal",
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
      <div
        style={{
          fontSize: "0.8125rem",
          lineHeight: 1.3,
          color: "#334155",
          fontWeight: 500,
          marginBottom: "0.25rem",
        }}
      >
        {label}
      </div>
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.25rem",
          fontSize: "0.875rem",
          color: "#000000",
          fontWeight: 500,
          minWidth: 0,
        }}
      >
        <span style={{ overflowWrap: "anywhere", wordBreak: "break-word" }}>
          {main || "—"}
        </span>
        {showTooltip && tip && <InfoTooltip tip={tip} />}
      </div>
    </div>
  );
}

function ModeAccessItem({ value }) {
  const values = Array.isArray(value)
    ? value.map((v) => String(v).trim()).filter(Boolean)
    : String(value ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

  const display = values.length ? values : ["—"];

  return (
    <div style={{ minWidth: 0, fontFamily: FONT }}>
      <div
        style={{
          fontSize: "0.8125rem",
          lineHeight: 1.3,
          color: "#334155",
          fontWeight: 500,
          marginBottom: "0.25rem",
        }}
      >
        Mode of Access
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}
      >
        {display.map((v, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: 500,
              lineHeight: 1.4,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontFamily: FONT,
            }}
          >
            {v}
            {i < display.length - 1 && (
              <span style={{ color: "#000000", fontWeight: 400 }}>,</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function CountryItem({ value }) {
  const values = Array.isArray(value)
    ? value.map((v) => String(v).trim()).filter(Boolean)
    : String(value ?? "")
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);

  const display = values.length ? values : ["—"];

  return (
    <div style={{ minWidth: 0, fontFamily: FONT }}>
      <div
        style={{
          fontSize: "0.8125rem",
          lineHeight: 1.3,
          color: "#334155",
          fontWeight: 500,
          marginBottom: "0.25rem",
        }}
      >
        Country
      </div>
      <div
        style={{ display: "flex", flexDirection: "column", gap: "0.125rem" }}
      >
        {display.map((v, i) => (
          <div
            key={i}
            style={{
              fontSize: "0.875rem",
              color: "#000000",
              fontWeight: 500,
              lineHeight: 1.4,
              overflowWrap: "anywhere",
              wordBreak: "break-word",
              fontFamily: FONT,
            }}
          >
            {v}
            {i < display.length - 1 && (
              <span style={{ color: "#000000", fontWeight: 400 }}>,</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function SourceRow({ url, label }) {
  const [hovered, setHovered] = useState(false);
  const normalized = /^https?:\/\//i.test(url)
    ? url
    : /^www\./i.test(url)
      ? `https://${url}`
      : url;

  return (
    <a
      href={normalized}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.625rem",
        minHeight: "2.375rem",
        textDecoration: "none",
        fontFamily: FONT,
        borderBottom: "1px solid #F1F1F1",
      }}
    >
      <span
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "1.25rem",
          height: "1.25rem",
          flexShrink: 0,
          color: "#0F1B2D",
        }}
      >
        <img
          src={`${BASE_PATH}/assets/link.svg`}
          alt=""
          width={20}
          height={10}
          style={{ display: "block" }}
        />
      </span>
      <span
        style={{
          fontSize: "0.875rem",
          fontWeight: 500,
          color: hovered ? "#1F3A6D" : "#0F1B2D",
          textDecoration: "underline",
          textDecorationStyle: "solid",
          textUnderlineOffset: "2px",
          transition: "color 150ms ease",
          overflowWrap: "anywhere",
          wordBreak: "break-all",
          lineHeight: 1.4,
          padding: "0.625rem 0",
        }}
      >
        {label || url}
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
        display: "inline-flex",
        alignItems: "center",
        gap: "0.625rem",
        height: "2.75rem",
        padding: "0.625rem 1rem",
        borderRadius: "0.5rem",
        border: "none",
        background: "#1F3A6D",
        color: "#fff",
        fontFamily: FONT,
        fontSize: "0.875rem",
        fontWeight: 500,
        cursor: "pointer",
        transition:
          "background 250ms ease, box-shadow 250ms ease, transform 250ms ease",
        flexShrink: 0,
        boxSizing: "border-box",
        whiteSpace: "nowrap",
      }}
    >
      <img
        src={`${BASE_PATH}/assets/back.svg`}
        alt=""
        width={18}
        height={12}
        style={{ display: "block" }}
      />
      <span>Back</span>
    </button>
  );
}

function Breadcrumb({ sector, title }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.375rem",
        fontFamily: FONT,
        fontSize: "0.875rem",
        color: "#6B7280",
        flexWrap: "wrap",
        minWidth: 0,
        flex: 1,
      }}
    >
      <Link
        href="/library"
        style={{
          color: "#334155",
          fontWeight: 400,
          textDecoration: "none",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.color = "#1F3A6D")}
        onMouseLeave={(e) => (e.currentTarget.style.color = "#334155")}
      >
        {sector || "Library"}
      </Link>
      <span
        aria-hidden="true"
        style={{ color: "#334155", fontWeight: 400, fontSize: "1.25rem" }}
      >
        ›
      </span>
      <span
        style={{
          color: "#1F3A6D",
          fontWeight: 400,
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: "55vw",
        }}
      >
        {title}
      </span>
    </nav>
  );
}

export default function UseCaseDetailClient({ useCase }) {
  const router = useRouter();

  if (!useCase) {
    return (
      <div
        style={{
          maxWidth: "90rem",
          margin: "0 auto",
          padding: "2rem 1.5rem",
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.75rem",
          fontFamily: FONT,
        }}
      >
        <h2
          style={{
            margin: 0,
            fontSize: "1.25rem",
            fontWeight: 800,
            color: "#111",
          }}
        >
          Use case not found
        </h2>
        <p style={{ margin: 0, color: "#6B7280" }}>
          The link may be broken, or the item was removed.
        </p>
        <Link
          href="/library"
          style={{
            display: "inline-block",
            padding: "0.6rem 1.2rem",
            borderRadius: "0.625rem",
            textDecoration: "none",
            background: "#1F3A6D",
            color: "#fff",
            fontWeight: 700,
            fontFamily: FONT,
          }}
        >
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
    const raw = String(useCase.Source || "").trim();
    if (raw) {
      const matched = hackathon.find(
        (h) => h.Title?.trim().toLowerCase() === raw.toLowerCase(),
      );
      if (matched?.URL) return [{ url: matched.URL, label: matched.Title }];
    }

    const fallback = String(useCase.Links || useCase.Source || "").trim();
    if (!fallback) return [];
    return fallback
      .split(/\n|,/)
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => ({ url: s, label: s }));
  }, [useCase.Source, useCase.Links]);

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1)
      router.back();
    else router.push("/library");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        /* ── Meta strip ── */
        .ucd-meta-strip {
          display: grid;
          grid-template-columns: repeat(6, minmax(0, 1fr));
          gap: 1.25rem 1rem;
        }
        @media (max-width: 56.25rem) {          /* 900px */
          .ucd-meta-strip {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }
        }
        @media (max-width: 35rem) {             /* 560px */
          .ucd-meta-strip {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 1rem 0.75rem;
          }
        }
        @media (max-width: 22.5rem) {           /* 360px */
          .ucd-meta-strip {
            grid-template-columns: 1fr;
          }
        }

        /* ── Page wrapper ── */
        .ucd-page-wrap {
          max-width: 90rem;
          margin: 0 auto;
          /* laptop baseline: 40px 100px — converted to rem */
          padding: 2.5rem 6.25rem 3.75rem;
          box-sizing: border-box;
        }
        @media (max-width: 68.75rem) {          /* 1100px */
          .ucd-page-wrap { padding: 2rem 3rem 3.75rem; }
        }
        @media (max-width: 53.75rem) {          /* 860px */
          .ucd-page-wrap { padding: 1.75rem 3rem 3rem; }
        }
        @media (max-width: 35rem) {             /* 560px */
          .ucd-page-wrap { padding: 1.25rem 1rem 2.5rem; }
        }

        /* ── Back + breadcrumb row ── */
        .ucd-nav-row {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1.75rem;
          flex-wrap: nowrap;
          min-width: 0;
        }
        @media (max-width: 35rem) {
          .ucd-nav-row { gap: 0.625rem; margin-bottom: 1.25rem; }
        }

        /* ── Title ── */
        .ucd-title {
          margin: 0 0 1rem;
          /* clamp: min 1.0625rem (17px) → preferred → max 1.5rem (24px) */
          font-size: clamp(1.0625rem, 2vw, 1.5rem);
          font-weight: 700;
          line-height: 1.2;
          color: #0F1B2D;
          font-family: ${FONT};
          overflow-wrap: anywhere;
          word-break: break-word;
        }
        @media (max-width: 35rem) {
          .ucd-title { margin-bottom: 0.75rem; }
        }

        /* ── Description ── */
        .ucd-desc {
          font-size: clamp(0.875rem, 1.2vw, 0.9375rem);
          font-weight: 400;
          line-height: 1.6;
          color: #334155;
          font-family: ${FONT};
          overflow-wrap: anywhere;
          margin: 0;
        }

        /* ── Section headings ── */
        .ucd-section-heading {
          margin: 0 0 1rem;
          font-size: clamp(0.9375rem, 1.2vw, 1rem);
          font-weight: 600;
          color: #0F1B2D;
          font-family: ${FONT};
          line-height: 100%;
        }

        /* ── Key terms ── */
        .ucd-terms-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
        }
        .ucd-term {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.625rem 0.875rem;
          border-radius: 0.75rem;
          background: #EEF4FF;
          font-size: clamp(0.8125rem, 1vw, 0.875rem);
          font-weight: 400;
          color: #334155;
          font-family: ${FONT};
          white-space: nowrap;
          height: 2.375rem;
          box-sizing: border-box;
        }
        @media (max-width: 35rem) {
          .ucd-term { padding: 0.5rem 0.75rem; height: 2.125rem; }
        }

        /* ── Meta strip container ── */
        .ucd-meta-container {
          background: #EEF4FF;
          border-radius: 0.5rem;
          border: 1px solid #F7FAFF;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-sizing: border-box;
        }
        @media (max-width: 35rem) {
          .ucd-meta-container { padding: 1rem; margin-bottom: 1.5rem; }
        }

        /* ── Section spacing ── */
        .ucd-section {
          margin-bottom: 2rem;
        }
        @media (max-width: 35rem) {
          .ucd-section { margin-bottom: 1.5rem; }
        }
      `}</style>

      <div
        className="ucd-page-wrap"
        style={{
          fontFamily: FONT,
          background: "#fff",
          position: "relative",
          zIndex: 0,
        }}
      >
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
            String(description)
              .split(/\n\s*\n/)
              .map((para, idx) => (
                <p
                  key={idx}
                  className="ucd-desc"
                  style={{ marginTop: idx === 0 ? 0 : "0.75rem" }}
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
          <div
            className="ucd-meta-strip"
            role="group"
            aria-label="Use case metadata"
          >
            <ModeAccessItem value={useCase.ModeofAccess} />
            <MetaItem label="Maturity level" value={maturity} />
            <MetaItem label="Region" value={region} />
            <CountryItem value={useCase.Country} />
            <MetaItem label="Sector" value={sector} />
            <MetaItem
              label="Authentication Assurance Level"
              value={aalRaw}
              showTooltip
            />
          </div>
        </div>

        {/* ── Row 5: Key terms ── */}
        <section className="ucd-section">
          <h2 className="ucd-section-heading">Key terms</h2>
          {keyTerms.length ? (
            <div className="ucd-terms-wrap">
              {keyTerms.map((term) => (
                <span key={term} className="ucd-term">
                  {term}
                </span>
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
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.25rem",
              }}
            >
              {sources.map((src, idx) => (
                <SourceRow
                  key={`${src.url}-${idx}`}
                  url={src.url}
                  label={src.label}
                />
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
