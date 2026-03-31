"use client";
// src/components/ContactModal.jsx

import { useEffect, useRef } from "react";

export default function ContactModal({ isOpen, onClose }) {
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const lastActiveElRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      lastActiveElRef.current = document.activeElement;
      setTimeout(() => closeBtnRef.current?.focus?.(), 0);
    } else {
      setTimeout(() => lastActiveElRef.current?.focus?.(), 0);
    }
  }, [isOpen]);

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
          from { opacity: 0; transform: translateY(clamp(0.75rem, 1.25vw, 1.5rem)) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes cm-icon-pop {
          0%   { transform: scale(0.5) rotate(-15deg); opacity: 0; }
          70%  { transform: scale(1.1) rotate(4deg);   opacity: 1; }
          100% { transform: scale(1)   rotate(0deg);   opacity: 1; }
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
          padding: clamp(0.5rem, 2vw, 1rem);
          background: rgba(10, 18, 40, 0.55);
          backdrop-filter: blur(4px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          animation: cm-backdrop-in 220ms ease forwards;
        }

        /*
         * aspect-ratio: 4/5 locks height = 5/4 × width at every zoom level.
         * Width is purely vw-based so the card scales uniformly — no more
         * "wide rectangle" at higher screen scale / zoom.
         * max-height: 95vh is a safety net on very short screens.
         * Top accent band has been removed.
         */
        .cm-card {
          position: relative;
          width: min(clamp(17rem, 24vw, 26rem), 90vw);
          
          max-height: 95vh;
          background: #ffffff;
          border-radius: clamp(1rem, 1.67vw, 1.5rem);
          overflow: hidden;
          display: flex;
          flex-direction: column;
          justify-content: center;
          box-shadow:
            0 0 0 1px rgba(31, 58, 109, 0.08),
            0 clamp(0.25rem, 0.42vw, 0.5rem) clamp(1rem, 1.67vw, 2rem) rgba(31, 58, 109, 0.12),
            0 clamp(1rem, 2.08vw, 2rem) clamp(2.5rem, 4.17vw, 5rem) rgba(10, 18, 40, 0.2);
          animation: cm-card-in 320ms cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
          font-family: 'Albert Sans', sans-serif;
        }

        /* subtle mesh pattern */
        .cm-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0;
          width: clamp(8rem, 11.46vw, 13.75rem);
          height: clamp(8rem, 11.46vw, 13.75rem);
          border-radius: 50%;
          background: radial-gradient(circle, rgba(27,102,209,0.06) 0%, transparent 70%);
          transform: translate(40%, -40%);
          pointer-events: none;
        }

        /* body fills card height, centres content vertically */
        .cm-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1.25rem, 2.08vw, 2.25rem);
          text-align: center;
          position: relative;
          z-index: 1;
        }

        .cm-icon-wrap {
          position: relative;
          width: clamp(3rem, 3.33vw, 4rem);
          height: clamp(3rem, 3.33vw, 4rem);
          margin: 0 auto clamp(0.75rem, 1.04vw, 1.25rem);
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
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: linear-gradient(135deg, #1F3A6D 0%, #1B66D1 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 clamp(0.25rem, 0.42vw, 0.5rem) clamp(1rem, 1.46vw, 1.75rem) rgba(27, 102, 209, 0.38);
          animation: cm-icon-pop 420ms cubic-bezier(0.34, 1.56, 0.64, 1) 120ms both;
        }
        .cm-icon-circle svg {
          width: clamp(1.125rem, 1.35vw, 1.625rem);
          height: clamp(1.125rem, 1.35vw, 1.625rem);
        }

        .cm-title {
          margin: 0 0 clamp(0.25rem, 0.31vw, 0.375rem);
          font-size: clamp(1.0625rem, 1.25vw, 1.35rem);
          font-weight: 700;
          color: #0f1b2d;
          letter-spacing: -0.02em;
          line-height: 1.2;
        }

        .cm-divider {
          width: clamp(1.75rem, 2.08vw, 2.5rem);
          height: 2px;
          background: linear-gradient(90deg, #1F3A6D, #1B66D1);
          border-radius: 2px;
          margin: clamp(0.625rem, 0.73vw, 0.875rem) auto clamp(0.75rem, 1.04vw, 1.25rem);
        }

        .cm-desc {
          margin: 0 0 clamp(1rem, 1.46vw, 1.5rem);
          font-size: clamp(0.8125rem, 0.83vw, 0.92rem);
          color: #4b5563;
          line-height: 1.65;
        }

        .cm-email-link {
          display: inline-flex;
          align-items: center;
          gap: clamp(0.25rem, 0.31vw, 0.375rem);
          padding: clamp(0.5rem, 0.52vw, 0.625rem) clamp(0.875rem, 1.04vw, 1.25rem);
          color: #1F3A6D;
          font-size: clamp(0.75rem, 0.73vw, 0.88rem);
          font-weight: 600;
          text-decoration: none;
          font-family: 'Albert Sans', sans-serif;
        }
        .cm-email-link svg {
          width: 1em;
          height: 1em;
          flex-shrink: 0;
        }

        .cm-close-x {
          position: absolute;
          top: clamp(0.625rem, 0.83vw, 1rem);
          right: clamp(0.625rem, 0.83vw, 1rem);
          width: clamp(1.5rem, 1.67vw, 2rem);
          height: clamp(1.5rem, 1.67vw, 2rem);
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
          font-size: clamp(0.75rem, 0.83vw, 1rem);
          line-height: 1;
        }
        .cm-close-x:hover {
          background: rgba(27, 102, 209, 0.1);
          color: #1B66D1;
        }
      `}</style>

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
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="cm-close-x"
          >
            ✕
          </button>

          <div className="cm-body">
            <div className="cm-icon-wrap">
              <div className="cm-icon-ring" />
              <div className="cm-icon-circle">
                <svg
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
        </div>
      </div>
    </>
  );
}
