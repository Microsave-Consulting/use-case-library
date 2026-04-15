"use client";
// src/components/MapPageClient.jsx
import { useRouter } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import PlatformIntro from "./PlatformIntro";
import WhatIsDigitalID from "./WhatIsDigitalID";
import WhyDigitalID from "./WhyDigitalID";
import ExploreLibraryBanner from "./ExploreLibraryBanner";
import ExploreSectors from "./ExploreSectors";
import UseCaseDotMap from "./UseCaseDotMap";
import HackathonCarousel from "@/components/HackathonCarousel";
import hackathons from "../../public/data/hackathons_2.json";
import WhoIsThisPlatformFor from "./WhoIsThisPlatformFor";

const FONT =
  '"Albert Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';

export default function MapPageClient({
  initialUseCases = [],
  initialHackathons = [],
}) {
  // Main homepage component that orchestrates all landing page sections
  // Renders hero banner, platform intro, educational content, library preview, and visualizations
  return (
    <div style={{ width: "100%", fontFamily: FONT }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: 0 }}>
        <HeroBanner />
        <PlatformIntro />
        <WhatIsDigitalID />
        <WhyDigitalID />
        <ExploreLibraryBanner initialData={initialUseCases} />
        <ExploreSectors />
        <UseCaseDotMap items={initialUseCases} />
        <HackathonCarousel items={hackathons} />
        <WhoIsThisPlatformFor />
      </div>
    </div>
  );
}
