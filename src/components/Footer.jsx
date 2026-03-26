"use client";
// src/components/Footer.jsx
import Link from "next/link";
import { useState } from "react";
import { BASE_PATH } from "@/lib/siteConfig";
import ContactModal from "@/components/ContactModal";

const SOCIAL_ICON_PATH = `${BASE_PATH}/social media icons`;

function SocialIcon({ label, base, href }) {
  const [hovered, setHovered] = useState(false);
  const hoverName = base === "linkedin" ? "linked_hover" : `${base}_hover`;
  return (
    <a
      href={href || "#"}
      aria-label={label}
      target={href ? "_blank" : undefined}
      rel={href ? "noopener noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: "inline-flex", width: 26, height: 26, flexShrink: 0 }}
    >
      <img
        src={`${SOCIAL_ICON_PATH}/${hovered ? hoverName : base}.svg`}
        alt={label}
        style={{
          width: 24,
          height: 24,
          display: "block",
          transition: "opacity 200ms ease",
        }}
      />
    </a>
  );
}

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <style>{`
        /* FIX 1: Removed @import url('https://fonts.googleapis.com/...') from here.
           It was duplicating the font load from layout.js AND causing the 0.34 CLS
           because the font swap was triggering a footer layout shift on every page load.
           Albert Sans is already loaded globally in layout.js — no need to load it again. */

        .ftr-root {
          font-family: 'Albert Sans', sans-serif;
          background: #FFFFFF;
          border-top: 1px solid #F1F1F1;
          box-shadow: 0 -1px 0 0 #F1F1F1, 0 4px 4px 0 rgba(0,0,0,0.11);
        }

        .ftr-grid {
          max-width: 1440px;
          padding: 48px 100px;
          display: grid;
          grid-template-columns: 1fr 0.2fr auto;
          gap: 100px;
          align-items: start;
        }

        @media (max-width: 1300px) {
          .ftr-grid { gap: 56px; padding: 48px 60px; }
        }
        @media (max-width: 1100px) {
          .ftr-grid { gap: 40px; padding: 40px 48px; }
        }
        @media (max-width: 860px) {
          .ftr-grid { grid-template-columns: 1fr 1fr; gap: 36px 48px; padding: 36px 32px; }
          .ftr-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 540px) {
          .ftr-grid { grid-template-columns: 1fr 1fr; gap: 28px 24px; padding: 32px 20px; }
          .ftr-brand { grid-column: 1 / -1; }
        }
        @media (max-width: 360px) {
          .ftr-grid { grid-template-columns: 1fr; gap: 28px; padding: 28px 16px; }
          .ftr-brand { grid-column: 1; }
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
          <div className="ftr-brand" style={{ maxWidth: 500 }}>
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

            {/* ── Social icons: fb → linkedin → x → youtube ── */}
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <SocialIcon
                label="Facebook"
                base="fb"
                href="https://www.facebook.com/MicroSaveConsulting/"
              />
              <SocialIcon
                label="LinkedIn"
                base="linkedin"
                href="https://www.linkedin.com/company/microsave/"
              />
              <SocialIcon label="X" base="x" href="https://x.com/MicroSave" />
              <SocialIcon
                label="YouTube"
                base="youtube"
                href="https://www.youtube.com/user/MicroSaveWorldwide/videos"
              />
            </div>
          </div>

          {/* ── Partner With Us ── */}
          <div>
            <h4
              style={{
                margin: "0 0 12px 0",
                fontSize: 16,
                fontWeight: 600,
                color: "#334155",
                whiteSpace: "nowrap",
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              Partner with us
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
                  onClick={() => setContactOpen(true)}
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
                whiteSpace: "nowrap",
                lineHeight: "100%",
                letterSpacing: 0,
              }}
            >
              Legal
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
          <p>© 2026 MicroSave Consulting. All rights reserved.</p>
        </div>
      </footer>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
