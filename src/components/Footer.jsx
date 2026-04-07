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
      className="ftr-social-link"
    >
      <img
        src={`${SOCIAL_ICON_PATH}/${hovered ? hoverName : base}.svg`}
        alt={label}
        className="ftr-social-img"
      />
    </a>
  );
}

export default function Footer() {
  const [contactOpen, setContactOpen] = useState(false);

  return (
    <>
      <style>{`
        /* ══════════════════════════════════════════════════════════════
           FOOTER — fluid scaling via clamp(), matching the site's
           standard horizontal padding: clamp(24px, 6.30vw, 121px)
           (same token used in ExploreSectors & HackathonCarousel)
        ══════════════════════════════════════════════════════════════ */

        .ftr-root {
          font-family: 'Albert Sans', sans-serif;
          background: #FFFFFF;
          border-top: 1px solid #F1F1F1;
          box-shadow: 0 -1px 0 0 #F1F1F1, 0 4px 4px 0 rgba(0,0,0,0.11);
          width: 100%;
          box-sizing: border-box;
        }

        /* ── Main grid row ── */
        .ftr-grid {
          width: 100%;
          /* Same horizontal padding token as every other section */
          padding:
            clamp(28px, 3.33vw, 64px)   /* top */
            clamp(24px, 6.30vw, 121px)  /* right */
            clamp(28px, 3.33vw, 64px)   /* bottom */
            clamp(24px, 6.30vw, 121px); /* left */
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: clamp(24px, 3.13vw, 60px);
          box-sizing: border-box;
        }

        /* ── Brand block ── */
        .ftr-brand {
          flex: 1 1 auto;
          max-width: clamp(220px, 28vw, 420px);
        }

        .ftr-logo {
          height: clamp(36px, 4.1vw, 64px);
          width: auto;
          display: block;
          margin-bottom: clamp(8px, 0.83vw, 16px);
        }

        .ftr-tagline {
          font-size: clamp(12px, 0.83vw, 16px);
          font-weight: 400;
          color: #334155;
          line-height: 1.6;
          letter-spacing: 0;
          margin: 0;
        }

        /* ── Social icons row ── */
        .ftr-socials {
          display: flex;
          align-items: center;
          gap: clamp(8px, 0.83vw, 16px);
          flex-shrink: 0;
        }

        .ftr-social-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: clamp(20px, 1.56vw, 30px);
          height: clamp(20px, 1.56vw, 30px);
          flex-shrink: 0;
        }

        .ftr-social-img {
          width: clamp(18px, 1.46vw, 28px);
          height: clamp(18px, 1.46vw, 28px);
          display: block;
          transition: opacity 200ms ease;
        }

        /* ── Bottom bar ── */
        .ftr-bottom {
          background: #FBFBFB;
          border-top: 1px solid #F1F1F1;
          padding: clamp(12px, 1.25vw, 24px) clamp(24px, 6.30vw, 121px);
        }

        .ftr-bottom p {
          margin: 0;
          text-align: center;
          font-family: 'Albert Sans', sans-serif;
          font-size: clamp(12px, 0.78vw, 15px);
          font-weight: 400;
          color: #334155;
          line-height: 1;
        }

        /* ── Link style (kept for any future nav links) ── */
        .ftr-link {
          color: #334155;
          text-decoration: none;
          font-size: clamp(12px, 0.73vw, 14px);
          font-weight: 400;
          line-height: 1;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 150ms ease;
        }
        .ftr-link:hover { color: #1F3A6D; }

        /* ── Mobile (≤ 480px) — stack brand + icons vertically ── */
        @media (max-width: 480px) {
          .ftr-grid {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding:
              clamp(20px, 5vw, 28px)
              clamp(16px, 5vw, 24px)
              clamp(20px, 5vw, 28px)
              clamp(16px, 5vw, 24px);
          }

          .ftr-brand {
            max-width: 100%;
          }

          .ftr-logo {
            height: clamp(32px, 9vw, 44px);
            margin-bottom: 10px;
          }

          .ftr-tagline {
            font-size: clamp(12px, 3.2vw, 14px);
          }

          .ftr-socials {
            gap: clamp(8px, 2.5vw, 14px);
          }

          .ftr-social-link {
            width: clamp(20px, 5.5vw, 28px);
            height: clamp(20px, 5.5vw, 28px);
          }

          .ftr-social-img {
            width: clamp(18px, 5vw, 26px);
            height: clamp(18px, 5vw, 26px);
          }

          .ftr-bottom {
            padding: clamp(10px, 3vw, 16px) clamp(16px, 5vw, 24px);
          }

          .ftr-bottom p {
            font-size: clamp(11px, 3vw, 13px);
          }
        }
      `}</style>

      <footer className="ftr-root">
        <div className="ftr-grid">
          {/* Brand */}
          <div className="ftr-brand">
            <img
              src={`${BASE_PATH}/assets/msc-logo.svg`}
              alt="MSC MicroSave Consulting"
              className="ftr-logo"
            />
            <p className="ftr-tagline">
              MSC (MicroSave Consulting) is a global consulting firm that
              enables social, financial, and economic inclusion for everyone in
              the digital age.
            </p>
          </div>

          {/* Social icons */}
          <div className="ftr-socials">
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
            © {new Date().getFullYear()} MicroSave Consulting All rights
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
