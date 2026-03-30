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
        .ftr-root {
          font-family: 'Albert Sans', sans-serif;
          background: #FFFFFF;
          border-top: 1px solid #F1F1F1;
          box-shadow: 0 -1px 0 0 #F1F1F1, 0 4px 4px 0 rgba(0,0,0,0.11);
        }

        /* align-items: center so icons stay vertically centred on all sizes */
        .ftr-grid {
          max-width: 1440px;
          padding: 48px 100px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 60px;
          box-sizing: border-box;
        }

        @media (max-width: 1300px) {
          .ftr-grid { gap: 40px; padding: 48px 60px; }
        }
        @media (max-width: 1100px) {
          .ftr-grid { gap: 32px; padding: 40px 48px; }
        }
        @media (max-width: 860px) {
          .ftr-grid { flex-wrap: wrap; gap: 32px; padding: 36px 32px; }
        }

        /* Mobile: stack icons below brand, left-aligned */
        @media (max-width: 540px) {
          .ftr-grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
            padding: 28px 20px;
          }
        }
        @media (max-width: 360px) {
          .ftr-grid { padding: 24px 16px; gap: 12px; }
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
          {/* Brand */}
          <div style={{ maxWidth: 400, flex: "1 1 3" }}>
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
                margin: 0,
              }}
            >
              MSC (MicroSave Consulting) is a global consulting firm that
              enables social, financial, and economic inclusion for everyone in
              the digital age.
            </p>
          </div>

          {/* Social icons */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              flexShrink: 0,
            }}
          >
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

        {/* Bottom bar */}
        <div className="ftr-bottom">
          <p>
            © {new Date().getFullYear()} Microsave Consulting All rights
            reserved.
          </p>
        </div>
      </footer>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
