"use client";
// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactModal from "@/components/ContactModal";
import { BASE_PATH } from "@/lib/siteConfig";
import hackathons from "../../public/data/hackathons_2.json";

const FONT = "'Albert Sans', sans-serif";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href) => pathname === href;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        /* ══════════════════════════════════════════════════════════════
           HEADER — fluid scaling via clamp()
           Horizontal padding matches site-wide token:
             clamp(24px, 6.30vw, 121px)
           Nav height scales from 64px (mobile) → 91px (desktop).
        ══════════════════════════════════════════════════════════════ */

        /* ── Inner wrapper ── */
        .hdr-inner {
          padding: 0 clamp(24px, 6.30vw, 121px);
          box-sizing: border-box;
          width: 100%;
        }

        /*
          ── Single height token ──────────────────────────────────────
          --hdr-h drives the bar, logo, links, and CTA together.
          clamp(56px, 5.2vw, 72px) means:
            • never shorter than 56px (small mobile)
            • 5.2vw at mid viewports → at 1440px = 74.8px ≈ 72px (capped)
            • at 150% zoom (≈960px viewport) → 5.2×9.6 = 49.9 → floored at 56px
          So the bar is always 56–72px — compact at every zoom level.
          ─────────────────────────────────────────────────────────── */
        :root {
          --hdr-h:      clamp(64px, 5.8vw, 84px);
          --hdr-logo-h: clamp(36px, 3.6vw, 54px);
          --hdr-fs:     clamp(13px, 0.9375vw, 17px);
          --hdr-cta-h:  clamp(36px, 2.8vw, 44px);
        }

        /* ── Nav bar ── */
        .hdr-nav {
          height: var(--hdr-h);
        }

        /* ── Logo ── */
        .hdr-logo-img {
          height: var(--hdr-logo-h);
          width: auto;
          object-fit: contain;
          display: block;
        }

        /* ── Desktop nav links ── */
        .hdr-nav-links {
          display: flex;
          align-items: center;
          height: clamp(22px, 2.2vw, 30px);
          gap: clamp(6px, 1.04vw, 20px);
        }

        .hdr-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: var(--hdr-fs);
          font-weight: 400;
          color: #334155;
          text-decoration: none;
          padding: 0 4px;
          height: 100%;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 250ms ease, font-weight 250ms ease;
        }
        .hdr-link:hover { color: #1B66D1; font-weight: 600; text-decoration: none; }
        .hdr-link.active { font-weight: 600; color: #1B66D1; text-decoration: none; }

        .hdr-drop-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: var(--hdr-fs);
          font-weight: 400;
          color: #334155;
          background: none;
          border: none;
          padding: 0 4px;
          height: 100%;
          cursor: pointer;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 250ms ease, font-weight 250ms ease;
        }
        .hdr-drop-btn:hover { color: #1B66D1; font-weight: 600; }

        /* ── Dropdown ── */
        .hdr-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          min-width: clamp(200px, 20vw, 290px);
          background: #fff;
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.06);
          border: 1px solid rgba(0,0,0,0.07);
          padding: 6px;
          opacity: 0;
          visibility: hidden;
          transition: opacity 200ms ease, transform 200ms ease, visibility 200ms;
          z-index: 60;
        }
        .hdr-drop-group:hover .hdr-dropdown,
        .hdr-drop-group:focus-within .hdr-dropdown {
          opacity: 1;
          visibility: visible;
          transform: translateX(-50%) translateY(0);
        }
        .hdr-dropdown::before {
          content: '';
          position: absolute;
          top: -5px;
          left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px;
          height: 10px;
          background: #fff;
          border-left: 1px solid rgba(0,0,0,0.07);
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .hdr-dropdown a {
          display: block;
          padding: clamp(8px, 0.52vw, 10px) clamp(12px, 0.83vw, 16px);
          font-size: clamp(12px, 0.73vw, 14px);
          font-weight: 400;
          color: #374151;
          text-decoration: none;
          border-radius: 9px;
          font-family: 'Albert Sans', sans-serif;
          transition: background 250ms ease, color 250ms ease, font-weight 250ms ease;
          line-height: 1.4;
        }
        .hdr-dropdown a:hover { background: #EEF2FC; color: #1B66D1; font-weight: 600; }

        /* ── CTA button — tracks --hdr-cta-h ── */
        .hdr-cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          height: var(--hdr-cta-h);
          padding: 0 clamp(14px, 1.56vw, 22px);
          background: #1F3A6D;
          color: #ffffff;
          font-family: 'Albert Sans', sans-serif;
          font-size: var(--hdr-fs);
          font-weight: 600;
          border-radius: 999px;
          border: none;
          cursor: pointer;
          white-space: nowrap;
          letter-spacing: 0.01em;
          transition: background 200ms ease, transform 150ms ease;
        }
        .hdr-cta:hover { background: #1B66D1; }
        .hdr-cta:active { transform: translateY(1px); }

        /* ── Hamburger button — tracks --hdr-cta-h ── */
        .hdr-ham {
          display: none;
          align-items: center;
          justify-content: center;
          width: var(--hdr-cta-h);
          height: var(--hdr-cta-h);
          border-radius: 10px;
          background: #ffffff;
          border: 1.5px solid #DDE5F5;
          cursor: pointer;
          transition: background 200ms ease, border-color 200ms ease;
          flex-shrink: 0;
        }
        .hdr-ham:hover { background: #EEF2FC; border-color: #1B66D1; }
        .hdr-ham .bar {
          display: block;
          width: 17px;
          height: 1.5px;
          background: #1F3A6D;
          border-radius: 2px;
          transition: transform 260ms ease, opacity 200ms ease, width 200ms ease;
          transform-origin: center;
        }
        .hdr-ham .bars { display: flex; flex-direction: column; gap: 4px; }
        .hdr-ham.open .bar:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hdr-ham.open .bar:nth-child(2) { opacity: 0; width: 0; }
        .hdr-ham.open .bar:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        /* ── Responsive breakpoints ── */
        /* Hide desktop nav + show hamburger below 860px */
        @media (max-width: 860px) {
          .hdr-nav-links { display: none !important; }
          .hdr-ham       { display: inline-flex !important; }
          .hdr-cta       { display: none; }
        }

        /* ── Mobile dropdown panel ── */
        .mob-drop {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: clamp(200px, 60vw, 232px);
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(31,58,109,0.14), 0 2px 8px rgba(0,0,0,0.07);
          border: 1px solid #DDE5F5;
          padding: 8px;
          z-index: 200;
          transform-origin: top right;
          animation: mobDropIn 180ms cubic-bezier(0.34, 1.3, 0.64, 1) forwards;
        }
        @keyframes mobDropIn {
          from { opacity: 0; transform: scale(0.93) translateY(-8px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }

        .mob-drop-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #9CA3AF;
          padding: 6px 12px 4px;
          margin: 0;
          font-family: 'Albert Sans', sans-serif;
        }
        .mob-drop-item {
          display: flex;
          align-items: center;
          gap: 10px;
          width: 100%;
          padding: 10px 12px;
          font-size: 14px;
          font-weight: 500;
          color: #334155;
          text-decoration: none;
          border-radius: 9px;
          font-family: 'Albert Sans', sans-serif;
          background: transparent;
          border: none;
          cursor: pointer;
          text-align: left;
          box-sizing: border-box;
          transition: background 150ms ease, color 150ms ease;
        }
        .mob-drop-item:hover  { background: #EEF2FC; color: #1B66D1; }
        .mob-drop-item.mob-active { background: #EEF2FC; color: #1B66D1; font-weight: 600; }

        .mob-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #DDE5F5;
          flex-shrink: 0;
          transition: background 150ms ease;
        }
        .mob-drop-item:hover .mob-dot      { background: #1B66D1; }
        .mob-drop-item.mob-active .mob-dot { background: #1B66D1; }

        .mob-drop-divider {
          height: 1px;
          background: #EEF2FC;
          margin: 6px 4px;
        }
      `}</style>

      <header
        className="fixed top-0 left-0 right-0 z-[100] w-full border-b border-[rgba(140,140,140,0.11)]"
        style={{
          fontFamily: FONT,
          background: "rgba(255, 255, 255, 0.72)",
          backdropFilter: "blur(2px)",
          WebkitBackdropFilter: "blur(16px)",
        }}
      >
        <div className="hdr-inner">
          <nav
            className="hdr-nav flex items-center justify-between"
            aria-label="Primary"
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="MSC Home"
              className="hdr-logo shrink-0 flex items-center no-underline"
            >
              <img
                src={`${BASE_PATH}/assets/msc-logo.svg`}
                alt="MSC"
                className="hdr-logo-img"
              />
            </Link>

            {/* Desktop nav links */}
            <div className="hdr-nav-links">
              <Link
                href="/"
                className={`hdr-link${isActive("/") ? " active" : ""}`}
              >
                Home
              </Link>

              <div className="hdr-drop-group relative">
  <button
    type="button"
    aria-haspopup="true"
    className="hdr-drop-btn"
  >
    Hackathons
    <svg
      width="0.75em"     
      height="0.463em"   
      viewBox="0 0 12 7.41"
      fill="none"
      style={{ color: "#334155", flexShrink: 0 }}
    >
      <path
        d="M1 1l5 5.41L11 1"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  </button>
  <div className="hdr-dropdown">
    {hackathons.map((h) => (
      <a
        key={h.ID}
        href={h.URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        {h.Title}
      </a>
    ))}
  </div>
</div>
              <Link
                href="/library"
                className={`hdr-link${isActive("/library") ? " active" : ""}`}
              >
                Use Case Library
              </Link>
            </div>

            {/* Right side: hamburger (mobile) + Contact Us (desktop) */}
            <div className="flex items-center shrink-0 gap-3" ref={dropRef}>
              {/* Hamburger wrapper */}
              <div style={{ position: "relative" }}>
                <button
                  type="button"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  aria-expanded={mobileOpen}
                  onClick={() => setMobileOpen((s) => !s)}
                  className={`hdr-ham${mobileOpen ? " open" : ""}`}
                >
                  <span className="bars" aria-hidden="true">
                    <span className="bar" />
                    <span className="bar" />
                    <span className="bar" />
                  </span>
                </button>

                {mobileOpen && (
                  <div className="mob-drop" role="menu">
                    <p className="mob-drop-label">Navigation</p>

                    <Link
                      href="/"
                      role="menuitem"
                      className={`mob-drop-item${isActive("/") ? " mob-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mob-dot" />
                      Home
                    </Link>

                    <Link
                      href="/library"
                      role="menuitem"
                      className={`mob-drop-item${isActive("/library") ? " mob-active" : ""}`}
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mob-dot" />
                      Use Case Library
                    </Link>

                    <div className="mob-drop-divider" />
                    <p className="mob-drop-label">Hackathons</p>

                    {hackathons.map((h) => (
                      <a
                        key={h.ID}
                        href={h.URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        role="menuitem"
                        className="mob-drop-item"
                        onClick={() => setMobileOpen(false)}
                      >
                        <span className="mob-dot" />
                        {h.Title}
                      </a>
                    ))}

                    <div className="mob-drop-divider" />
                    <button
                      type="button"
                      role="menuitem"
                      className="mob-drop-item"
                      style={{
                        background: "#1F3A6D",
                        color: "#ffffff",
                        fontWeight: 600,
                      }}
                      onClick={() => {
                        setMobileOpen(false);
                        setContactOpen(true);
                      }}
                    >
                      <span
                        className="mob-dot"
                        style={{ background: "#ffffff" }}
                      />
                      Contact Us
                    </button>
                  </div>
                )}
              </div>

              {/* Contact Us — desktop only */}
              <button
                type="button"
                onClick={() => {
                  setMobileOpen(false);
                  setContactOpen(true);
                }}
                className="hdr-cta"
              >
                Contact Us
              </button>
            </div>
          </nav>
        </div>
      </header>

      <ContactModal
        isOpen={contactOpen}
        onClose={() => setContactOpen(false)}
      />
    </>
  );
}
