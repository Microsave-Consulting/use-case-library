# Digital ID Use Cases & Innovation Platform

A comprehensive, interactive platform showcasing real-world digital identity implementations across countries and sectors. Explore 173+ verified use cases, visualize global adoption patterns, and discover innovation through regional hackathons.

##  Overview

This platform serves as a global research and discovery hub for digital identity systems, focusing on:

- **Real-world implementations** across banking, healthcare, government, agriculture, and education
- **Interactive visualizations** including world maps, heatmaps, and sector analytics
- **Innovation showcase** featuring regional, continental, and national hackathons
- **Comprehensive filtering** by region, country, maturity level, and sector
- **Responsive design** optimized for all devices and screen sizes

##  Features

### Interactive Use Case Library

- Browse 173+ digital identity use cases from around the world
- Advanced filtering by region, country, sector, maturity level, and authentication assurance
- Responsive card-based layout that adapts from 1-4 columns
- Detailed individual use case pages with rich metadata

### Global Visualizations

- **World Map**: Interactive dot map showing use case distribution by country

### Hackathon Showcase

- Featured innovation events and competitions
- Carousel display with event details and external links
- Timeline, status, and partner information

### Educational Content

- What is Digital ID?
- Why Digital ID matters for development
- Platform introduction and value proposition
- Target audience information

##  Tech Stack

- **Framework**: Next.js 16.1.7 (App Router)
- **Frontend**: React 18.3.1
- **Styling**: Tailwind CSS 4.2.1
- **Visualization**: D3.js, react-simple-maps, Recharts
- **Utilities**: i18n-iso-countries, react-country-flag
- **Build**: Static export for deployment anywhere

##  Data Coverage

- **Regions**: Asia, Africa, Americas, Europe, MENA, Global South
- **Sectors**: Government, Finance, Healthcare, Agriculture, Education, Welfare, Climate
- **Maturity Levels**: Conceptual, Pilot, Operational
- **Authentication Levels**: AAL 1-3 (Authentication Assurance Levels)

##  Project Structure

```
src/
├── app/
│   ├── layout.js          # App shell with global styles
│   ├── page.js            # Home page with map and sections
│   ├── library/page.js    # Use case library with filtering
│   └── use-cases/[id]/page.jsx  # Individual use case pages
├── components/
│   ├── MapPageClient.jsx  # Home page orchestrator
│   ├── UseCaseLibrary.jsx # Library with filters and cards
│   ├── UseCaseDotMap.jsx  # Interactive world map
│   ├── FilterBar.jsx      # Multi-select filters
│   ├── UseCaseCard.jsx    # Use case display cards
│   └── [other components] # Heatmaps, carousels, etc.
└── lib/
    └── siteConfig.js      # Site configuration

public/
├── data/
│   ├── use_cases.json     # 173+ use case records
│   ├── hackathons_2.json  # Innovation events
│   ├── filter_config.json # Filter definitions
│   └── filter_options.json # Pre-computed options
└── assets/                # Images and icons
```

##  Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone <repository-url>
cd use-cases-next
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

This generates a static export in the `out/` directory, ready for deployment to any static hosting service.

##  Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production (static export)
- `npm start` - Start production server (if needed)
- `npm run lint` - Run ESLint

##  Deployment

This project is designed for static deployment. The build output in `out/` can be deployed to:

- **GitHub Pages**
- **Netlify**
- **Vercel**
- **AWS CloudFront + S3**
- **Any static web server**

### Example: GitHub Pages Deployment

1. Build the project:

```bash
npm run build
```

2. Deploy the `out/` directory to GitHub Pages.

## Key Metrics

- **173+ Use Cases** documented and categorized
- **Global Coverage** across 6 continents
- **8 Sectors** represented
- **3 Maturity Levels** tracked
- **Responsive Design** for all devices
- **SEO Optimized** with rich metadata

##  Contributing

This platform welcomes contributions to expand the use case database, improve visualizations, or enhance the user experience.



##  Acknowledgments

This platform was built to support digital identity innovation globally, with special focus on implementations in developing countries and the Global South.

---

**Live Site**: [https://www.digitalidinnovations.com](https://www.digitalidinnovations.com)
