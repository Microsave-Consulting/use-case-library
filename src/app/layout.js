// src/app/layout.js
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SITE_URL } from "@/lib/siteConfig";

export const metadata = {
  title: {
    default: "Digital ID Use Cases & Innovation Platform",
    template: "%s | Digital ID Use Cases & Innovation Platform",
  },
  verification: {
    google: "google2649d990eb64b54b.html",
  },
  description:
    "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
  keywords: [
    // Home
    "Digital ID use cases",
    "Digital identity systems",
    "Digital identity innovation",
    "Digital ID applications",
    "Digital identity platform",
    "Digital public infrastructure digital identity",
    "Identity systems across countries",
    "Digital identity solutions",
    "Real-world digital identity use cases",
    "Examples of digital ID in different countries",
    "How digital identity systems are used globally",
    "Digital ID applications in banking, healthcare, and government",
    "Use cases of Aadhaar-like systems",
    "Digital identity for public service delivery",
    "Digital ID in developing countries",
    "Digital ID in the global south",
    "Digital identity implementation case studies",
    // Use Case Library
    "Digital identity in banking",
    "eKYC digital identity",
    "Identity verification fintech",
    "Digital ID in agriculture",
    "Digital ID in climate",
    "Digital ID in healthcare systems",
    "Patient identity management digital",
    "Digital identity for government services",
    "E-governance identity systems",
    "Digital ID for welfare schemes",
    "Identity in social protection programs",
    "Digital identity in education systems",
    "Digital identity case study platform",
    "Digital ID knowledge repository",
    "Identity innovation library",
    "Digital identity research platform",
    // Hackathon
    "Digital identity hackathon",
    "Digital ID Hackathon",
    "Africa Digital ID Hackathon",
    "Digital ID innovation challenge",
    "Identity Technology Hackathon",
    "Build digital ID applications",
    "Student Hackathon Digital Identity",
    "Digital public infrastructure hackathon",
    "Innovation in digital identity systems",
  ],
  authors: [{ name: "MicroSave Consulting" }],
  creator: "MicroSave Consulting",
  publisher: "MicroSave Consulting",
  metadataBase: new URL(SITE_URL),   // ✅ dynamic, no more yoursite.com
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,                   // ✅ dynamic
    siteName: "Digital ID Use Cases & Innovation Platform",
    title: "Digital ID Use Cases & Innovation Platform",
    description:
      "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Digital ID Use Cases & Innovation Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Digital ID Use Cases & Innovation Platform",
    description:
      "Explore real-world digital identity use cases across countries and sectors. Discover how digital ID powers public services, finance, healthcare, and innovation through regional, continental and national hackathons.",
    images: ["/images/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="preconnect"
          href="https://fonts.googleapis.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdn.jsdelivr.net"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Albert+Sans:wght@400;500;600;700;800&family=DM+Sans:wght@400;500;600;700&family=DM+Serif+Display&display=swap"
          rel="stylesheet"
        />
        {/* ✅ canonical removed from here — Next.js handles it per-page via metadata */}
      </head>
      <body
        style={{
          minHeight: "100vh",
          background: "#fff",
          color: "#111827",
          fontFamily: '"Albert Sans", system-ui, sans-serif',
          margin: 0,
          padding: 0,
          overflow: "auto",
        }}
      >
        <Header />
        <div style={{ paddingTop: "var(--hdr-h)" }}>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

