"use client";
// src/components/UseCaseCard.jsx

import { useState } from "react";
import ReactCountryFlag from "react-country-flag";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

/* ── country name → ISO 2-letter code ── */
const COUNTRY_CODES = {
  Afghanistan: "AF",
  Albania: "AL",
  Algeria: "DZ",
  Angola: "AO",
  Argentina: "AR",
  Australia: "AU",
  Austria: "AT",
  Bangladesh: "BD",
  Belgium: "BE",
  Benin: "BJ",
  Bolivia: "BO",
  Botswana: "BW",
  Brazil: "BR",
  "Burkina Faso": "BF",
  Burundi: "BI",
  Cambodia: "KH",
  Cameroon: "CM",
  Canada: "CA",
  Chad: "TD",
  Chile: "CL",
  China: "CN",
  Colombia: "CO",
  Congo: "CG",
  "Costa Rica": "CR",
  "Côte d'Ivoire": "CI",
  Croatia: "HR",
  Denmark: "DK",
  "DR Congo": "CD",
  Ecuador: "EC",
  Egypt: "EG",
  Ethiopia: "ET",
  Finland: "FI",
  France: "FR",
  Gabon: "GA",
  Gambia: "GM",
  Germany: "DE",
  Ghana: "GH",
  Guatemala: "GT",
  Guinea: "GN",
  Haiti: "HT",
  Honduras: "HN",
  Hungary: "HU",
  India: "IN",
  Indonesia: "ID",
  Iran: "IR",
  Iraq: "IQ",
  Ireland: "IE",
  Israel: "IL",
  Italy: "IT",
  Jamaica: "JM",
  Japan: "JP",
  Jordan: "JO",
  Kazakhstan: "KZ",
  Kenya: "KE",
  Laos: "LA",
  Lebanon: "LB",
  Lesotho: "LS",
  Liberia: "LR",
  Libya: "LY",
  Madagascar: "MG",
  Malawi: "MW",
  Malaysia: "MY",
  Mali: "ML",
  Mauritania: "MR",
  Mauritius: "MU",
  Mexico: "MX",
  Moldova: "MD",
  Mongolia: "MN",
  Morocco: "MA",
  Mozambique: "MZ",
  Myanmar: "MM",
  Namibia: "NA",
  Nepal: "NP",
  Netherlands: "NL",
  "New Zealand": "NZ",
  Nicaragua: "NI",
  Niger: "NE",
  Nigeria: "NG",
  Norway: "NO",
  Pakistan: "PK",
  Panama: "PA",
  "Papua New Guinea": "PG",
  Paraguay: "PY",
  Peru: "PE",
  Philippines: "PH",
  Poland: "PL",
  Portugal: "PT",
  Rwanda: "RW",
  "Saudi Arabia": "SA",
  Senegal: "SN",
  "Sierra Leone": "SL",
  Singapore: "SG",
  Somalia: "SO",
  "South Africa": "ZA",
  "South Korea": "KR",
  "South Sudan": "SS",
  Spain: "ES",
  "Sri Lanka": "LK",
  Sudan: "SD",
  Sweden: "SE",
  Switzerland: "CH",
  Syria: "SY",
  Tanzania: "TZ",
  Thailand: "TH",
  Togo: "TG",
  Tunisia: "TN",
  Turkey: "TR",
  Uganda: "UG",
  Ukraine: "UA",
  "United Kingdom": "GB",
  UK: "GB",
  "United States": "US",
  USA: "US",
  Uruguay: "UY",
  Uzbekistan: "UZ",
  Venezuela: "VE",
  Vietnam: "VN",
  Yemen: "YE",
  Zambia: "ZM",
  Zimbabwe: "ZW",
};

function CountryFlag({ country }) {
  const code = COUNTRY_CODES[country?.trim()];
  if (!code) return <span style={{ fontSize: 16 }}>🌐</span>;
  return (
    <ReactCountryFlag
      countryCode={code}
      svg
      style={{ width: 20, height: 14, borderRadius: 2, objectFit: "cover" }}
      title={country}
    />
  );
}

export default function UseCaseCard({ uc, onOpen }) {
  const [hovered, setHovered] = useState(false);

  const sector = uc.Sector || "—";
  const country = Array.isArray(uc.Country) ? uc.Country[0] : uc.Country || "—";
  const maturity = uc.MaturityLevel || "—";
  const description = uc.Description || uc.Remarks || uc.Summary || "";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => onOpen?.(uc)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen?.(uc);
        }
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`Open details for ${uc.Title || "use case"}`}
      style={{
        borderRadius: 16,
        border: "1px solid #E8ECF4",
        background: "#F7F7F7",
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
        cursor: "pointer",
        outline: "none",
        fontFamily: FONT,
        boxShadow: hovered
          ? "0 8px 28px rgba(0,0,0,0.10)"
          : "0 1px 4px rgba(0,0,0,0.04)",
        transition: "box-shadow 200ms ease, background 200ms ease",
        minHeight: 220,
      }}
    >
      {/* ── Top row: country + maturity badge ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          flexWrap: "wrap",
        }}
      >
        {/* Country pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            padding: "5px 10px",
            borderRadius: 999,
            border: "1px solid #E5E9F3",
            background: "#FFFFFF",
            fontSize: 13,
            fontWeight: 500,
            color: "#374151",
            fontFamily: FONT,
            whiteSpace: "nowrap",
          }}
        >
          <CountryFlag country={country} />
          {country}
        </span>

        {/* Maturity pill */}
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "5px 12px",
            borderRadius: 999,
            border: "1px solid #E5E9F3",
            background: "#FFFFFF",
            fontSize: 13,
            fontWeight: 400,
            color: "#374151",
            fontFamily: FONT,
            whiteSpace: "nowrap",
          }}
        >
          {maturity}
        </span>
      </div>

      {/* ── Title ── */}
      <div
        style={{
          fontSize: 16,
          fontWeight: 600,
          color: "#0F1B2D",
          lineHeight: 1.35,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          fontFamily: FONT,
        }}
      >
        {uc.Title || "Untitled use case"}
      </div>

      {/* ── Description ── */}
      <div
        style={{
          fontSize: 14,
          fontWeight: 400,
          color: "#334155",
          lineHeight: 1.55,
          display: "-webkit-box",
          WebkitLineClamp: 3,
          WebkitBoxOrient: "vertical",
          overflow: "hidden",
          flex: 1,
          fontFamily: FONT,
        }}
      >
        {description}
      </div>

      {/* ── Divider ── */}
      <div style={{ borderBottom: "1px dashed #DDE5F5", marginTop: "auto" }} />

      {/* ── Footer: arrow only, right-aligned ── */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: 32,
            height: 32,
            color: "#1F3A6D",
            transition: "transform 200ms ease",
            transform: hovered ? "translateX(3px)" : "translateX(0)",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M4 10h12M11 5l5 5-5 5"
              stroke="#345096"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </div>
  );
}
