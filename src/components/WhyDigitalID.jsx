import { useEffect, useRef } from "react";
import { BASE_PATH } from "@/lib/siteConfig";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

const CARDS = [
  {
    icon: `${BASE_PATH}/home/convenience.svg`,
    title: "Convenience",
    body: "Digital identities can be securely stored and verified online using smartphones or digital devices, reducing the need for multiple physical documents or in-person visits to access services.",
  },
  {
    icon: `${BASE_PATH}/home/privacy.svg`,
    title: "Privacy and security",
    body: "Technologies such as biometrics, encryption, and selective data sharing help protect identity information while preventing fraud.",
  },
  {
    icon: `${BASE_PATH}/home/efficiency.svg`,
    title: "Efficiency",
    body: "Electronic verification enables faster service delivery by reducing paperwork and manual verification processes.",
  },
  {
    icon: `${BASE_PATH}/home/realtime.svg`,
    title: "Real-time updates",
    body: "Integrating the national digital ID with service delivery enables instant notifications of changes or usage, enhancing transparency and control.",
  },
];

export default function WhyDigitalID() {
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll(".why-did__card");
    if (!cards?.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            // unobserve so animation only fires once
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.15, // card must be 15% visible before triggering
        rootMargin: "0px 0px -40px 0px", // trigger slightly before fully in view
      },
    );

    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        /* ── Scroll entrance ──────────────────────────────────────── */
        @keyframes cardEntrance {
          from {
            opacity: 0;
            transform: translateY(32px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .why-did__card {
          opacity: 0;
        }

        .why-did__card.is-visible {
          animation: cardEntrance 0.55s cubic-bezier(0.23, 1, 0.32, 1) forwards;
        }

        .why-did__card.is-visible:nth-child(1) { animation-delay: 0ms;   }
        .why-did__card.is-visible:nth-child(2) { animation-delay: 220ms; }
        .why-did__card.is-visible:nth-child(3) { animation-delay: 440ms; }
        .why-did__card.is-visible:nth-child(4) { animation-delay: 660ms; }

        @media (prefers-reduced-motion: reduce) {
          .why-did__card        { opacity: 1; }
          .why-did__card.is-visible { animation: none; }
        }

        /* ── Existing styles below — unchanged ───────────────────── */
        .why-did {
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          background: #ffffff;
          padding: clamp(32px, 4.17vw, 80px) clamp(20px, 5.78vw, 111px);
          box-sizing: border-box;
        }

        .why-did__title {
          margin: 0 0 clamp(24px, 3.80vw, 73px) 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(24px, 1.875vw, 36px);
          line-height: 1;
          letter-spacing: 0;
          color: #1b66d1;
          text-align: center;
        }

        .why-did__grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: clamp(12px, 1.51vw, 29px);
          width: 100%;
          max-width: 1652px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .why-did__card {
          background: #ffffff;
          border-radius: 12px;
          box-shadow: 3px 3px 6px 0px rgba(37, 52, 61, 0.20);
          padding: clamp(20px, 1.67vw, 32px) clamp(16px, 1.25vw, 24px);
          display: flex;
          flex-direction: column;
          gap: clamp(10px, 0.83vw, 16px);
          min-height: clamp(260px, 19.11vw, 367px);
          box-sizing: border-box;
          will-change: transform;
          transform-style: preserve-3d;
          transition:
            transform 350ms cubic-bezier(0.23, 1, 0.32, 1),
            box-shadow 350ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .why-did__card:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow:
            0px 20px 40px rgba(37, 52, 61, 0.14),
            0px 8px 16px rgba(37, 52, 61, 0.10);
        }

        .why-did__icon {
          width: clamp(auto, 4.64vw, auto);
          height: clamp(48px, 4.22vw, 81px);
          object-fit: contain;
          display: block;
          align-self: flex-start;
          flex-shrink: 0;
          transition: transform 350ms cubic-bezier(0.23, 1, 0.32, 1);
        }

        .why-did__card:hover .why-did__icon {
          transform: translateY(-1px) scale(1.08);
        }

        .why-did__card-title {
          margin: 0;
          font-family: ${FONT};
          font-weight: 700;
          font-size: clamp(14px, 0.9375vw, 18px);
          line-height: 1;
          letter-spacing: 0;
          color: #2f3a45;
        }

        .why-did__card-body {
          margin: 0;
          font-family: ${FONT};
          font-weight: 400;
          font-size: clamp(13px, 0.9375vw, 18px);
          line-height: 1.3;
          letter-spacing: 0;
          color: #2f3a45;
        }

        @media (hover: none) {
          .why-did__card:hover {
            transform: none;
            box-shadow: 3px 3px 6px 0px rgba(37, 52, 61, 0.20);
          }
          .why-did__card:hover .why-did__icon {
            transform: none;
          }
        }

        @media (max-width: 1024px) {
          .why-did__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(12px, 2vw, 24px);
          }
          .why-did__card { min-height: 0; }
          .why-did__card-title,
          .why-did__card-body { font-size: clamp(13px, 1.6vw, 17px); }
        }

        @media (max-width: 768px) {
          .why-did { padding: 8vw 6vw; }
          .why-did__title {
            font-size: clamp(22px, 3.5vw, 30px);
            margin-bottom: clamp(20px, 4vw, 40px);
          }
          .why-did__grid {
            grid-template-columns: repeat(2, 1fr);
            gap: clamp(12px, 3vw, 20px);
          }
          .why-did__icon { width: clamp(48px, 8vw, 72px); height: auto; }
          .why-did__card-title,
          .why-did__card-body { font-size: clamp(13px, 2vw, 16px); }
        }

        @media (max-width: 480px) {
          .why-did { padding: 10vw 5vw; }
          .why-did__title { font-size: clamp(20px, 6vw, 26px); }
          .why-did__grid {
            grid-template-columns: 1fr;
            gap: clamp(12px, 4vw, 20px);
          }
          .why-did__card { padding: 20px; }
          .why-did__icon { width: 56px; height: auto; }
          .why-did__card-title { font-size: 15px; }
          .why-did__card-body  { font-size: 14px; line-height: 1.5; }
        }
      `}</style>

      <section className="why-did" aria-labelledby="why-did-title">
        <h2 className="why-did__title" id="why-did-title">
          Why Digital ID
        </h2>

        <div className="why-did__grid" ref={gridRef}>
          {CARDS.map((card) => (
            <div className="why-did__card" key={card.title}>
              <img
                src={card.icon}
                alt=""
                aria-hidden="true"
                className="why-did__icon"
              />
              <h3 className="why-did__card-title">{card.title}</h3>
              <p className="why-did__card-body">{card.body}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
