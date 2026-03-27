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
          left: clamp(50%, 58vw, 65vw);
          right: 0;
          top: 18%;
          bottom: -30%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
        }

        .what-is-did__gif {
          height: 115%;
          width: auto;
          display: block;
          object-fit: contain;
          object-position: bottom center;
        }

        /* ── 1280px ── */
        @media (max-width: 1280px) {
          .what-is-did__gif-wrap { left: 52vw; }
          .what-is-did__text { width: clamp(260px, 42vw, 620px); }
        }

        /* ── 1024px ── */
        @media (max-width: 1024px) {
          .what-is-did__gif-wrap { left: 48vw; }
          .what-is-did__text { width: clamp(240px, 44vw, 500px); }
        }

        /* ── Tablet ≤768px: stack — text top, GIF below ── */
        @media (max-width: 768px) {
          .what-is-did {
            height: auto;
            overflow: visible;
            display: flex;
            flex-direction: column;
            padding: 8vw 6vw;
            gap: 6vw;
          }

          /* reset absolute positioning — back to normal flow */
          .what-is-did__text {
            position: static;
            transform: none;
            width: 100%;
            max-width: 100%;
          }

          .what-is-did__gif-wrap {
            position: static;
            width: 100%;
            height: auto;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .what-is-did__gif {
            height: auto;
            width: clamp(260px, 80vw, 460px);
          }

          .what-is-did__title { font-size: clamp(22px, 4vw, 30px); }
          .what-is-did__para  { font-size: clamp(13px, 2.2vw, 17px); }
        }

        /* ── Mobile ≤480px ── */
        @media (max-width: 480px) {
          .what-is-did {
            padding: 10vw 5vw;
            gap: 8vw;
          }
          .what-is-did__title { font-size: clamp(20px, 6vw, 26px); }
          .what-is-did__para  { font-size: 14px; line-height: 1.5; }
          .what-is-did__gif   { width: 100%; }
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
          />
        </div>
      </section>
    </>
  );
}
