"use client";
// src/components/WhatIsDigitalID.jsx

import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export default function WhatIsDigitalID() {
  return (
    <>
      <style>{`
        .what-is-did {
          position: relative;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #f2f6fc;
          height: clamp(320px, 23.23vw, 446px);
          box-sizing: border-box;
          overflow: hidden;
        }

        .what-is-did__text {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: clamp(24px, 6.30vw, 121px);
          width: clamp(260px, 38vw, 730px);
          display: flex;
          flex-direction: column;
          gap: 0;
        }

        .what-is-did__title {
          margin: 0 0 clamp(10px, 1.04vw, 20px) 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(22px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
        }

        .what-is-did__body {
          display: flex;
          flex-direction: column;
          gap: clamp(8px, 0.83vw, 16px);
        }

        .what-is-did__para {
          margin: 0;
          font-family: ${FONT};
          font-weight: 400;
          font-size: clamp(13px, 1.04vw, 20px);
          line-height: 1.4;
          letter-spacing: 0;
          color: #2f3a45;
        }

        .what-is-did__gif-wrap {
          position: absolute;
          left: clamp(52%, 63.2vw, 68vw);
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }

        .what-is-did__gif {
          width: clamp(260px, 26.67vw, 512px);
          height: auto;
          aspect-ratio: 512 / 342;
          display: block;
          object-fit: contain;
        }

        /* ── 1280px ── */
        @media (max-width: 1280px) {
          .what-is-did__gif-wrap { left: 56vw; }
          .what-is-did__text { width: clamp(260px, 42vw, 620px); }
          .what-is-did__gif { width: clamp(240px, 30vw, 460px); }
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .what-is-did {
            height: clamp(260px, 28vw, 380px);
          }
          .what-is-did__gif-wrap { left: 58vw; }
          .what-is-did__text {
            width: clamp(220px, 46vw, 460px);
            left: clamp(20px, 5vw, 80px);
          }
          .what-is-did__gif { width: clamp(200px, 34vw, 360px); }
          .what-is-did__title { font-size: clamp(18px, 1.875vw, 26px); }
          .what-is-did__para  { font-size: clamp(12px, 1.04vw, 16px); }
        }

        /* ── Tablet 768px: keep side-by-side but tighter, gif scales down ── */
        @media (max-width: 768px) {
          .what-is-did {
            height: clamp(220px, 36vw, 320px);
          }
          .what-is-did__text {
            left: clamp(16px, 4.5vw, 48px);
            width: clamp(200px, 46vw, 380px);
          }
          .what-is-did__gif-wrap { left: 58vw; }
          .what-is-did__gif { width: clamp(180px, 36vw, 320px); }
          .what-is-did__title { font-size: clamp(16px, 2.5vw, 22px); }
          .what-is-did__para  { font-size: clamp(11px, 1.6vw, 14px); }
        }

        /* ── Tablet portrait 640px: stack vertically ── */
        @media (max-width: 640px) {
          .what-is-did {
            height: auto;
            overflow: visible;
            display: flex;
            flex-direction: column;
            padding: clamp(24px, 6vw, 48px) clamp(16px, 5vw, 40px);
            gap: clamp(16px, 4vw, 32px);
          }

          .what-is-did__text {
            position: static;
            transform: none;
            width: 100%;
            max-width: 100%;
            left: auto;
          }

          .what-is-did__gif-wrap {
            position: static;
            transform: none;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .what-is-did__gif {
            width: clamp(200px, 65vw, 420px);
            height: auto;
          }

          .what-is-did__title { font-size: clamp(18px, 4vw, 26px); }
          .what-is-did__para  { font-size: clamp(13px, 2.2vw, 16px); }
        }

        /* ── Mobile 480px ── */
        @media (max-width: 480px) {
          .what-is-did {
            padding: clamp(20px, 6vw, 36px) clamp(14px, 5vw, 28px);
            gap: clamp(14px, 4vw, 24px);
          }
          .what-is-did__title { font-size: clamp(18px, 5.5vw, 22px); }
          .what-is-did__para  { font-size: 13px; line-height: 1.5; }
          .what-is-did__gif   { width: min(90vw, 340px); }
        }
      `}</style>

      <section className="what-is-did" aria-labelledby="what-is-did-title">
        <div className="what-is-did__text">
          <h2 className="what-is-did__title" id="what-is-did-title">
            What is Digital ID
          </h2>
          <div className="what-is-did__body">
            <p className="what-is-did__para">
              A digital ID system uses digital technologies to manage a person's
              identity throughout its lifecycle from enrolment and credential
              issuance to authentication and service delivery. (ID4D World Bank)
            </p>
            <p className="what-is-did__para">
              Digital IDs allow individuals to securely prove who they are
              online or offline, enabling easier access to various public and
              private services.
            </p>
          </div>
        </div>

        <div className="what-is-did__gif-wrap">
          <img
            src={`${BASE_PATH}/home/digital-id.gif`}
            alt="Digital ID lifecycle diagram showing enrolment, authentication and service delivery"
            className="what-is-did__gif"
            width={512}
            height={342}
          />
        </div>
      </section>
    </>
  );
}
