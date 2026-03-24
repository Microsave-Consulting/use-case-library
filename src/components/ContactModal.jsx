"use client";
// src/components/ContactModal.jsx

import { useEffect, useRef } from "react";

export default function ContactModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  /* ── open: store last focused element, focus close btn ── */
  useEffect(() => {
    if (isOpen) {
      lastActiveElRef.current = document.activeElement;
      setTimeout(() => closeBtnRef.current?.focus?.(), 0);
    } else {
      setTimeout(() => lastActiveElRef.current?.focus?.(), 0);
    }
  }, [isOpen]);

  /* ── focus trap + Escape ── */
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const root = dialogRef.current;
      if (!root) return;
      const focusable = root.querySelectorAll(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (e.shiftKey && active === first) {
        e.preventDefault();
        last.focus();
        return;
      }
      if (!e.shiftKey && active === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown, true);
    return () => document.removeEventListener("keydown", onKeyDown, true);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700&display=swap');

        @keyframes cm-backdrop-in {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes cm-card-in {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes cm-icon-pop {
          0%   { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          70%  { transform: scale(1.1) rotate(4deg);  opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);  opacity: 1; }
        }
        @keyframes cm-ring-pulse {
          0%   { transform: scale(1);   opacity: 0.35; }
          100% { transform: scale(1.9); opacity: 0; }
        }

        .cm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 1000;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
          /* layered backdrop: dark tint + strong blur */
          background: rgba(10, 18, 40, 0.55);
          backdrop-filter: blur(4px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          animation: cm-backdrop-in 220ms ease forwards;
        }

        .cm-card {
          position: relative;
          width: min(460px, 100%);
          background: #ffffff;
          border-radius: 24px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(31, 58, 109, 0.08),
            0 8px 32px rgba(31, 58, 109, 0.12),
            0 32px 80px rgba(10, 18, 40, 0.2);
          animation: cm-card-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          font-family: 'Albert Sans', sans-serif;
        }

        /* ── decorative top band ── */
        .cm-top-band {
          height: 6px;
          background: linear-gradient(90deg, #1F3A6D 0%, #1B66D1 55%, #5b9ef4 100%);
        }

        /* ── subtle mesh pattern in card background ── */
        .cm-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: 220px; height: 220px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(27,102,209,0.06) 0%, transparent 70%);
          transform: translate(40%, -40%);
          pointer-events: none;
        }

        .cm-body {
          padding: 2.25rem 2.25rem 2rem;
          text-align: center;
          position: relative;
          z-index: 1;
        }

        /* ── icon wrapper with pulsing ring ── */
        .cm-icon-wrap {
          position: relative;
          width: 64px;
          height: 64px;
          margin: 0 auto 20px;
        }
        .cm-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          background: rgba(27, 102, 209, 0.18);
          animation: cm-ring-pulse 1.8s ease-out infinite;
        }
        .cm-icon-circle {
          position: relative;
          width: 64px;
          height: 64px;
          border-radius: 50%;
          background: linear-gradient(135deg, #1F3A6D 0%, #1B66D1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 28px rgba(27, 102, 209, 0.38);
          animation: cm-icon-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms both;
        }

        .cm-title {
          margin: 0 0 6px;
          font-size: 1.35rem;
          font-weight: 700;
          color: #0f1b2d;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .cm-subtitle {
          margin: 0 0 6px;
          font-size: 0.82rem;
          font-weight: 500;
          color: #1B66D1;
          letter-spacing: 0.08em;
          text-transform: uppercase;
        }

        .cm-divider {
          width: 40px;
          height: 2px;
          background: linear-gradient(90deg, #1F3A6D, #1B66D1);
          border-radius: 2px;
          margin: 14px auto 20px;
        }

        .cm-desc {
          margin: 0 0 28px;
          font-size: 0.92rem;
          color: #4b5563;
          line-height: 1.65;
        }

        .cm-email-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-top: 10px;
          padding: 10px 20px;
         
       
          
          color: #1F3A6D;
          font-size: 0.88rem;
          font-weight: 600;
          text-decoration: none;
          
          font-family: 'Albert Sans', sans-serif;
        }
       

        /* ── footer area ── */
        .cm-footer {
          padding: 0 2.25rem 2rem;
          position: relative;
          z-index: 1;
        }

        .cm-close-btn {
          width: 100%;
          height: 48px;
          background: linear-gradient(135deg, #1F3A6D 0%, #1B66D1 100%);
          color: #fff;
          border: none;
          border-radius: 14px;
          cursor: pointer;
          font-size: 0.95rem;
          font-weight: 600;
          font-family: 'Albert Sans', sans-serif;
          letter-spacing: 0.01em;
          transition: opacity 200ms ease, transform 200ms ease, box-shadow 200ms ease;
          box-shadow: 0 4px 16px rgba(27, 102, 209, 0.3);
        }
        .cm-close-btn:hover {
          opacity: 0.92;
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(27, 102, 209, 0.4);
        }
        .cm-close-btn:active {
          transform: translateY(0);
          opacity: 1;
        }

        .cm-close-x {
          position: absolute;
          top: 16px;
          right: 16px;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: none;
          background: rgba(15, 27, 45, 0.06);
          color: #6b7280;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 200ms ease, color 200ms ease;
          z-index: 10;
          font-size: 16px;
          line-height: 1;
        }
        .cm-close-x:hover {
          background: rgba(27, 102, 209, 0.1);
          color: #1B66D1;
        }
      `}</style>

      {/* Backdrop */}
      <div
        className="cm-backdrop"
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <div
          ref={dialogRef}
          className="cm-card"
          role="dialog"
          aria-modal="true"
          aria-labelledby="contact-modal-title"
          tabIndex={-1}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {/* X close button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cm-close-x"
          >
            ✕
          </button>

          {/* Body */}
          <div className="cm-body">
            {/* Icon with pulsing ring */}
            <div className="cm-icon-wrap">
              <div className="cm-icon-ring" />
              <div className="cm-icon-circle">
                <svg
                  width="26"
                  height="26"
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
            </div>

            <h2 id="contact-modal-title" className="cm-title">
              Get in Touch
            </h2>
            <div className="cm-divider" />

            <p className="cm-desc">
              Have questions about Digital ID use cases or want to collaborate?
              Reach out to our team directly.
            </p>

            <a
              href="mailto:arnav.nigam@microsave.net"
              className="cm-email-link"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              arnav.nigam@microsave.net
            </a>
          </div>

          {/* Footer */}
        </div>
      </div>
    </>
  );
}
