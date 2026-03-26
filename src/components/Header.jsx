"use client";
// src/components/Header.jsx
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ContactModal from "@/components/ContactModal";
import { BASE_PATH } from "@/lib/siteConfig";

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

        /* ── Inner padding — native media queries, no Tailwind ── */
        .hdr-inner { padding: 0 100px; }
        @media (max-width: 1100px) { .hdr-inner { padding: 0 48px; } }
        @media (max-width: 860px) { .hdr-inner { padding: 0 20px; } }

        /* ── Desktop nav links ── */
        .hdr-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          font-size: 18px;
          font-weight: 400;
          color: #334155;
          text-decoration: none;
          padding: 0 4px;
          height: 30px;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 250ms ease, font-weight 250ms ease;
        }
        .hdr-link:hover { color: #1B66D1; font-weight: 600; text-decoration: none; }
        .hdr-link.active { font-size: 18px; font-weight: 600; color: #1B66D1; text-decoration: none; }

        .hdr-drop-btn {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 18px;
          font-weight: 400;
          color: #334155;
          background: none;
          border: none;
          padding: 0 4px;
          height: 30px;
          cursor: pointer;
          white-space: nowrap;
          font-family: 'Albert Sans', sans-serif;
          transition: color 250ms ease, font-weight 250ms ease;
        }
        .hdr-drop-btn:hover { color: #1B66D1; font-weight: 600; }

        /* ── Desktop hackathons dropdown ── */
        .hdr-dropdown {
          position: absolute;
          top: calc(100% + 12px);
          left: 50%;
          transform: translateX(-50%) translateY(-6px);
          min-width: 290px;
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
          opacity: 1; visibility: visible; transform: translateX(-50%) translateY(0);
        }
        .hdr-dropdown::before {
          content: '';
          position: absolute;
          top: -5px; left: 50%;
          transform: translateX(-50%) rotate(45deg);
          width: 10px; height: 10px;
          background: #fff;
          border-left: 1px solid rgba(0,0,0,0.07);
          border-top: 1px solid rgba(0,0,0,0.07);
        }
        .hdr-dropdown a {
          display: block;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 400;
          color: #374151;
          text-decoration: none;
          border-radius: 9px;
          font-family: 'Albert Sans', sans-serif;
          transition: background 250ms ease, color 250ms ease, font-weight 250ms ease;
          line-height: 1.4;
        }
        .hdr-dropdown a:hover { background: #EEF2FC; color: #1B66D1; font-weight: 600; }

        /* ── CTA ── */
        /* ── CTA ── */
.hdr-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 24px;
  background: #1F3A6D;
  color: #ffffff;
  font-family: 'Albert Sans', sans-serif;
  font-size: 15px;
  font-weight: 600;
  border-radius: 22px;
  border: none;
  cursor: pointer;
  white-space: nowrap;
  letter-spacing: 0.01em;

}
.hdr-cta:hover {
  background: #1B66D1;

}
.hdr-cta:active {
  transform: translateY(0);
  box-shadow: 0 2px 8px rgba(27, 102, 209, 0.2);
}

@media (max-width: 860px) {
  .hdr-cta {
    height: 40px;
    padding: 0 18px;
    font-size: 14px;
    border-radius: 20px;
  }
}

@media (max-width: 400px) {
  .hdr-cta {
    height: 38px;
    padding: 0 14px;
    font-size: 13px;
  }
}
        /* ── Hamburger — hidden on desktop ── */
        .hdr-ham {
          display: none;
          align-items: center;
          justify-content: center;
          width: 40px; height: 40px;
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
          width: 17px; height: 1.5px;
          background: #1F3A6D;
          border-radius: 2px;
          transition: transform 260ms ease, opacity 200ms ease, width 200ms ease;
          transform-origin: center;
        }
        .hdr-ham .bars { display: flex; flex-direction: column; gap: 4px; }
        .hdr-ham.open .bar:nth-child(1) { transform: translateY(5.5px) rotate(45deg); }
        .hdr-ham.open .bar:nth-child(2) { opacity: 0; width: 0; }
        .hdr-ham.open .bar:nth-child(3) { transform: translateY(-5.5px) rotate(-45deg); }

        /* ── Breakpoint ── */
        @media (max-width: 860px) {
          .hdr-nav-links { display: none !important; }
          .hdr-ham { display: inline-flex !important; }
          /* On mobile: logo flush left, right group flush right */
          .hdr-nav { justify-content: space-between !important; }
          .hdr-logo { margin-right: 0 !important; }
        }

        /* ── Mobile dropdown — white theme ── */
        .mob-drop {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          width: 232px;
          background: #ffffff;
          border-radius: 14px;
          box-shadow: 0 16px 48px rgba(31,58,109,0.14), 0 2px 8px rgba(0,0,0,0.07);
          border: 1px solid #DDE5F5;
          padding: 8px;
          z-index: 200;
          transform-origin: top right;
          animation: mobDropIn 180ms cubic-bezier(0.34,1.3,0.64,1) forwards;
        }
        @keyframes mobDropIn {
          from { opacity: 0; transform: scale(0.93) translateY(-8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
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
        .mob-drop-item:hover { background: #EEF2FC; color: #1B66D1; }
        .mob-drop-item.mob-active { background: #EEF2FC; color: #1B66D1; font-weight: 600; }
        .mob-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: #DDE5F5;
          flex-shrink: 0;
          transition: background 150ms ease;
        }
        .mob-drop-item:hover .mob-dot { background: #1B66D1; }
        .mob-drop-item.mob-active .mob-dot { background: #1B66D1; }
        .mob-drop-divider {
          height: 1px;
          background: #EEF2FC;
          margin: 6px 4px;
        }
      `}</style>

      <header
        style={{ fontFamily: FONT }}
        className="fixed top-0 left-0 right-0 z-[100] w-full bg-white border-b border-[rgba(140,140,140,0.11)]"
      >
        <div className="hdr-inner">
          <nav
            className="hdr-nav flex items-center justify-between h-[91px]"
            aria-label="Primary"
          >
            {/* Logo — original styling, untouched */}
            <Link
              href="/"
              aria-label="MSC Home"
              className="hdr-logo shrink-0 flex items-center no-underline"
            >
              <img
                src={`${BASE_PATH}/assets/msc-logo.svg`}
                alt="MSC"
                className="h-[59px] w-[100px] object-contain block"
              />
            </Link>

            {/* Desktop nav links */}
            <div
              className="hdr-nav-links flex items-center h-[32px]"
              style={{ gap: 16 }}
            >
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
                    width="12"
                    height="7.41"
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
                  <a
                    href="https://www.africa.engineering.cmu.edu/research/upanzi/id-hackathon.html"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Digital ID Hackathon Africa
                  </a>
                  <a
                    href="https://digitalidinnovations.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    PNG National Digital ID Hackathon
                  </a>
                </div>
              </div>

              <Link
                href="/library"
                className={`hdr-link${isActive("/library") ? " active" : ""}`}
              >
                Use Case Library
              </Link>
            </div>

            {/* Right side: hamburger (mobile only) + Contact Us */}
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

                    <a
                      href="https://www.africa.engineering.cmu.edu/research/upanzi/id-hackathon.html"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="mob-drop-item"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mob-dot" />
                      Digital ID Hackathon Africa
                    </a>

                    <a
                      href="https://digitalidinnovations.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      role="menuitem"
                      className="mob-drop-item"
                      onClick={() => setMobileOpen(false)}
                    >
                      <span className="mob-dot" />
                      PNG National Digital ID Hackathon
                    </a>
                  </div>
                )}
              </div>

              {/* Contact Us */}
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
