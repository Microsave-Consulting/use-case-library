"use client";
// src/components/Footer.jsx
import Link from "next/link";
import { useRef, useState } from "react";
import { BASE_PATH } from "@/lib/siteConfig";

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);
  const contactDialogRef = useRef(null);
  const contactCloseBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  const openContact = () => {
    lastActiveElRef.current = document.activeElement;
    setContactOpen(true);
    setTimeout(() => contactCloseBtnRef.current?.focus?.(), 0);
  };

  const closeContact = () => {
    setContactOpen(false);
    setTimeout(() => lastActiveElRef.current?.focus?.(), 0);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        @keyframes ftrFadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes ftrSlideUp { from { opacity:0; transform:translateY(16px) scale(.97) } to { opacity:1; transform:translateY(0) scale(1) } }

        .ftr-root {
          font-family: 'Albert Sans', sans-serif;
          background: #FFFFFF;
          box-shadow: 0 -1px 0 0 #F1F1F1, 0 4px 4px 0 rgba(0,0,0,0.11);
        }

        .ftr-grid {
          max-width: 1440px;
          padding: 48px 100px;
          display: grid;
          grid-template-columns: 1fr auto auto auto;
          gap: 80px;
          align-items: start;
        }

        /* Large desktop: tighten gap slightly */
        @media (max-width: 1300px) {
          .ftr-grid {
            gap: 56px;
            padding: 48px 60px;
          }
        }

        /* Tablet landscape */
        @media (max-width: 1100px) {
          .ftr-grid {
            gap: 40px;
            padding: 40px 48px;
          }
        }

        /* Tablet portrait: 2-col */
        @media (max-width: 860px) {
          .ftr-grid {
            grid-template-columns: 1fr 1fr;
            gap: 36px 48px;
            padding: 36px 32px;
          }
          .ftr-brand {
            grid-column: 1 / -1;
          }
        }

        /* Mobile */
        @media (max-width: 540px) {
          .ftr-grid {
            grid-template-columns: 1fr 1fr;
            gap: 28px 24px;
            padding: 32px 20px;
          }
          .ftr-brand {
            grid-column: 1 / -1;
          }
        }

        /* Very small mobile: single column */
        @media (max-width: 360px) {
          .ftr-grid {
            grid-template-columns: 1fr;
            gap: 28px;
            padding: 28px 16px;
          }
          .ftr-brand {
            grid-column: 1;
          }
        }

        .ftr-link {
          color: #334155;
          text-decoration: none;
          font-size: 14px;
          font-weight: 400;
          line-height: 100%;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 150ms ease;
        }
        .ftr-link:hover { color: #1F3A6D; }

        .ftr-bottom {
          background: #FBFBFB;
          border-top: 1px solid #F1F1F1;
          padding: 18px 20px;
        }
        .ftr-bottom p {
          margin: 0;
          text-align: center;
          font-family: 'Albert Sans', sans-serif;
          font-size: 15px;
          font-weight: 400;
          color: #334155;
          line-height: 100%;
        }

        @media (max-width: 480px) {
          .ftr-bottom p { font-size: 13px; }
        }
      `}</style>

      <footer className="ftr-root">
        <div className="ftr-grid">
          {/* ── Brand ── */}
          <div className="ftr-brand" style={{ maxWidth: 417 }}>
            <img
              src={`${BASE_PATH}/assets/msc-logo.svg`}
              alt="MSC MicroSave Consulting"
              style={{
                height: 59,
                width: 100,
                display: "block",
                marginBottom: 12,
              }}
            />
            <p
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "#334155",
                lineHeight: 1.6,
                letterSpacing: 0,
                marginBottom: 16,
              }}
            >
              MSC (MicroSave Consulting) is a global consulting firm that
              enables social, financial, and economic inclusion for everyone in
              the digital age.
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <a
                href="#"
                aria-label="LinkedIn"
                style={{ display: "inline-flex", width: 24, height: 24 }}
              >
                <img
                  src={`${BASE_PATH}/assets/linkedin.svg`}
                  alt="LinkedIn"
                  style={{ width: 24, height: 24 }}
                />
              </a>
              <a
                href="#"
                aria-label="X (Twitter)"
                style={{ display: "inline-flex", width: 24, height: 24 }}
              >
                <img
                  src={`${BASE_PATH}/assets/twitter.svg`}
                  alt="X"
                  style={{ width: 24, height: 24 }}
                />
              </a>
            </div>
          </div>

          {/* ── Platform ── */}
          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                fontSize: 16,
                fontWeight: 600,
                color: "#334155",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              PLATFORM
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <Link href="/library" className="ftr-link">
                  Library
                </Link>
              </li>
              <li>
                <a href="#" className="ftr-link">
                  Hackathons
                </a>
              </li>
            </ul>
          </div>

          {/* ── Partner With Us ── */}
          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                fontSize: 16,
                fontWeight: 600,
                color: "#334155",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              PARTNER WITH US
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <button
                  type="button"
                  onClick={openContact}
                  className="ftr-link"
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    margin: 0,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  Send your Query
                </button>
              </li>
            </ul>
          </div>

          {/* ── Legal ── */}
          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                fontSize: 16,
                fontWeight: 600,
                color: "#334155",
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              LEGAL
            </h4>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: 8,
              }}
            >
              <li>
                <a href="#" className="ftr-link">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="ftr-link">
                  Terms of Use
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* ── Bottom bar ── */}
        <div className="ftr-bottom">
          <p>© 2026 MicroSave Consulting &nbsp; All rights reserved.</p>
        </div>
      </footer>

      {/* ── Contact Modal ── */}
      {contactOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(17,24,39,0.5)",
            backdropFilter: "blur(6px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
            animation: "ftrFadeIn 200ms ease",
          }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeContact();
          }}
        >
          <div
            ref={contactDialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ftr-contact-title"
            tabIndex={-1}
            onMouseDown={(e) => e.stopPropagation()}
            style={{
              fontFamily: "'Albert Sans', sans-serif",
              animation: "ftrSlideUp 220ms cubic-bezier(.34,1.56,.64,1)",
              background: "#fff",
              borderRadius: 20,
              padding: "2.25rem",
              width: "min(440px, calc(100% - 2rem))",
              boxShadow: "0 32px 80px rgba(0,0,0,0.18)",
              border: "1px solid rgba(0,0,0,0.06)",
              textAlign: "center",
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#1F3A6D,#3a5bb8)",
                boxShadow: "0 8px 24px rgba(31,58,109,0.22)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>

            <h2
              id="ftr-contact-title"
              style={{
                margin: "0 0 8px",
                fontSize: "1.3rem",
                fontWeight: 700,
                color: "#111827",
              }}
            >
              Get in Touch
            </h2>
            <p
              style={{
                margin: "0 0 24px",
                fontSize: "0.9rem",
                color: "#6B7280",
                lineHeight: 1.6,
              }}
            >
              For any queries please reach out to us at{" "}
              <a
                href="mailto:placeholder@microsave.net"
                style={{
                  color: "#1F3A6D",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.textDecoration = "underline")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.textDecoration = "none")
                }
              >
                placeholder@microsave.net
              </a>
            </p>

            <button
              ref={contactCloseBtnRef}
              type="button"
              onClick={closeContact}
              style={{
                width: "100%",
                background: "#1F3A6D",
                color: "#fff",
                padding: "11px 0",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: 600,
                fontFamily: "'Albert Sans', sans-serif",
                transition: "opacity 150ms ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}
