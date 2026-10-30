# Vistiria Properties — Master Website Implementation Plan

Comprehensive architectural blueprint for the **Vistiria Properties** multi-page real estate website. Vistiria Properties is a newly established property sales firm located in Sector 66, Gurugram, Delhi NCR, India, dedicated exclusively to selling residential and commercial properties across India under consultant **Satyam Gupta**.

***

## User Review & Critical Decisions

> [!IMPORTANT]
> The following operational decisions reflect the user's confirmed inputs from Phase 1 and the strict constraints of the Master Brief:

- **Hero Visual & Custom Image Ingestion**: The hero section will support the user's custom supplied image URL / local path with an interactive visual inspector and seamless image switcher, pre-configured with a high-fidelity luxury architectural visual calibrated for Gurugram luxury developments.
- **Frontend-Only Submission Handling**: As approved, all buyer inquiries and site visit requests will undergo strict client-side validation (name, phone, preferred date/time, specific property selection) and trigger a clear, professional confirmation modal. This modal provides instant feedback with zero false backend claims and includes a direct **"Send via WhatsApp"** draft action to consultant Satyam Gupta (`+91 9211657522`).
- **Property Catalogue Representation**: Catalogue will present clearly designated **Sample Listings** representing prime Gurugram / Delhi NCR micro-markets (Golf Course Extension Road, Sector 66, Dwarka Expressway) with verified property specs (configuration, super built-up area, carpet area, price band, gallery), strictly isolated from any false RERA claims or invented transactions.
- **Direct Contact Configuration**: Official consultant phone (`+91 9211657522`) and direct WhatsApp chat links will be live. Email contact in the inquiry desk will display a clean designated placeholder ready to link directly to the official company email address as soon as provided.
- **Absolute Content Neutrality**: No invented history, employee count, awards, testimonials, transaction volumes, or developer/rental claims. Neutral editorial placeholders for "Company Vision" and "Why Choose Vistiria" will be rendered with clean typographic placeholders awaiting user copy.

***

## 1. Overview & Core Concept

- **What It Does**: A multi-page, high-performance web experience for prospective property buyers across India. Visitors can browse curated property listings, filter by configuration and location, inspect detailed property galleries and floor specifications, submit site visit requests, and connect directly with consultant Satyam Gupta via phone or WhatsApp.
- **Target Audience / Persona**: High-intent property buyers, NRIs, and investors seeking premium residential and commercial acquisitions in Delhi NCR and across India.
- **Key Value**: Transparent, direct-to-consultant real estate advisory with responsive mobile layout, zero sign-in friction, and subtle 3D spatial depth.

***

## 2. User Experience & Visual Design

### A. Information Architecture & Navigation
- **Top Bar Contract (3 Zones)**:
  - *Zone 1 (Brand)*: Single clean wordmark: **Vistiria Properties** in high-contrast editorial typography (`Cinzel` / `Playfair Display`).
  - *Zone 2 (Navigation)*: 4 single-line links: `Home`, `Properties`, `About Us`, `Contact Us`.
  - *Zone 3 (Primary Action)*: Single high-intent CTA button: `Inquire Now` or `Call Consultant`.
- **Pages**:
  1. **Home**: Hero with 3D parallax depth, Buyer Inquiry Desk, Featured Properties (3-4 cards), Vision placeholder, Why Choose Vistiria placeholder, and comprehensive Footer.
  2. **Properties**: Full catalogue with search, micro-market filters, configuration filters (3 BHK, 4 BHK, Penthouse, Luxury Villa), pricing tiers, and direct site-visit modal triggers.
  3. **Property Details**: Deep-dive individual property view (`/properties/:id`), multi-image gallery with fullscreen view, verified specifications grid (carpet area, facing, floor level), and sticky Site Visit Request card.
  4. **About Us**: Clean corporate profile focusing strictly on office location (Sector 66, Gurugram), scope (property sales across India), consultant introduction (Satyam Gupta), and structured placeholder slots for approved vision/mission.
  5. **Contact Us**: Direct office coordinates, interactive Google Maps link for Sector 66 Gurugram, verified phone, WhatsApp chat launcher, and structured buyer inquiry form.

### B. Visual Identity & Theme Tokens
- **Aesthetic Direction**: Contemporary luxury architectural minimalism—grounded, airy, disciplined, and free from AI clichés (no purple gradients, no pill badge sandwiches, no fake metric counters).
- **Color Discipline (60-30-10)**:
  - *60% Dominant Neutral Canvas*: Off-white architectural linen (`#FBFBFA` light mode) and deep obsidian slate (`#0B0F17` dark mode).
  - *30% Structural Surfaces*: Subtle hairline card borders (`rgba(0,0,0,0.08)` / `rgba(255,255,255,0.08)`), warm ivory card fills (`#F4F3EF`), and muted warm stone.
  - *10% Accent Intent*: Rich warm bronze / champagne gold (`#C5A880` / `#9E7B4F`) reserved strictly for primary interactive states and CTAs.
- **Typography**:
  - *Display / Headlines*: `Playfair Display` or `Cinzel` for editorial luxury poise.
  - *Body Prose & Controls*: `Plus Jakarta Sans` for clean legibility and modern clarity.
  - *Data & Specs*: `font-mono tabular-nums` for dimensions, prices in Crores/Lakhs (₹), and square footage.
- **3D & Motion Choreography**:
  - Hero layer featuring gentle gyroscopic / pointer-driven parallax tilt and subtle depth displacement.
  - Property cards with delicate 3D elevation shifts (`transform: perspective(1000px) rotateX(...)`) on hover.
  - Full respect for `prefers-reduced-motion` to ensure accessibility.

***

## 3. Key Product Decisions & Trade-Offs

| Decision Area | Chosen Approach | Rationale & Trade-Off |
| :--- | :--- | :--- |
| **Routing Architecture** | Maintainable client-side routing with browser History API + deep-linking hash/fallback support | Enables seamless instant page navigation without full-page refreshes while ensuring direct URL compatibility on Hostinger static/PHP hosting. |
| **Site Visit & Inquiry Flow** | Interactive modal form with input validation + WhatsApp pre-filled message generator | Zero friction (no login/auth needed). Respects the "no backend yet" rule while delivering immediate real-world utility to the buyer and consultant Satyam Gupta. |
| **Sample Data Architecture** | Typed, centralized data store (`src/data/properties.ts`) with clear sample disclaimers | Ensures replacing placeholders with real client listings in the future requires editing only a single clean TypeScript data module. |
| **Hostinger Deployment** | Clean production build setup + automated `.htaccess` rewrite configuration included in the build output | Hostinger Apache/LiteSpeed web servers require rewrite rules (`RewriteRule ^ index.html [L]`) for SPA routing. We provide this file directly in `public/.htaccess`. |

***

## 4. Technical Architecture & Data Strategy

```
┌────────────────────────────────────────────────────────────────────────┐
│                        Vistiria Properties App                         │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │
         ┌──────────────────────────┼──────────────────────────┐
         ▼                          ▼                          ▼
┌──────────────────┐      ┌──────────────────┐      ┌──────────────────┐
│   Navigation     │      │   Active Page    │      │   Footer Zone    │
│  • Brand wordmark│      │  • Home View     │      │  • Sector 66 GGM │
│  • 4 nav links   │      │  • Properties    │      │  • +91 9211657522│
│  • WhatsApp CTA  │      │  • PropertyDetail│      │  • Satyam Gupta  │
└──────────────────┘      │  • About Us      │      │  • Nav mirrors   │
                          │  • Contact Us    │      └──────────────────┘
                          └─────────┬────────┘
                                    │
          ┌─────────────────────────┴─────────────────────────┐
          ▼                                                   ▼
┌─────────────────────────────────┐       ┌─────────────────────────────────┐
│     Central Property Store      │       │     Inquiry & Visit Manager     │
│  • Typed listings data          │       │  • Form state & validation      │
│  • Gurugram / Delhi NCR samples │       │  • Simulated success modal      │
│  • Gallery image collections    │       │  • Direct WhatsApp draft bridge │
│  • Filter & search predicates   │       │  • Property-specific context    │
└─────────────────────────────────┘       └─────────────────────────────────┘
```

### Component Hierarchy & File Architecture
- `src/types/property.ts`: Complete TypeScript schema for listings, specifications, and inquiries.
- `src/data/properties.ts`: Curated, clearly flagged sample properties with specs (BHK, carpet area, price, location).
- `src/context/NavigationContext.tsx`: Clean routing controller supporting page navigation, query params, and browser back/forward history.
- `src/components/layout/Navbar.tsx`: 3-zone header strictly adhering to the Top Bar Contract.
- `src/components/layout/Footer.tsx`: Authoritative business footer with verified consultant details and location.
- `src/components/home/Hero3D.tsx`: Parallax architectural hero with customizable image switcher and depth perspective.
- `src/components/home/BuyerInquiryDesk.tsx`: Responsive direct contact desk featuring side-by-side WhatsApp and email options.
- `src/components/home/VisionPlaceholder.tsx`: Neutral, unbloated placeholder section for client-approved vision/mission.
- `src/components/properties/PropertyCard.tsx`: Consistent luxury card with zero-pill metadata, specs row, and site-visit trigger.
- `src/components/properties/SiteVisitModal.tsx`: Accessible modal for scheduling property visits and buyer inquiries.
- `src/pages/HomePage.tsx`, `PropertiesPage.tsx`, `PropertyDetailPage.tsx`, `AboutPage.tsx`, `ContactPage.tsx`.
- `public/.htaccess`: Rewrite rules for seamless single-page routing on Hostinger servers.

***

## 5. Verification & Hostinger Deployment Plan

1. **Accessibility & Responsive Audit**: Validate contrast ratios $\ge 4.5:1$, verify keyboard navigation across modals and filters, test 375px mobile, 768px tablet, and 1440px desktop layouts.
2. **Direct Contact Link Verification**: Confirm `tel:+919211657522` and `https://wa.me/919211657522` links open cleanly with properly formatted international codes.
3. **Compilation & Build**: Run `compile_applet` and test `npm run build` to ensure zero TypeScript or bundling errors.
4. **Hostinger Deployment Instructions**: Document step-by-step export guidelines for uploading the `dist/` bundle to Hostinger File Manager or Git integration.

***

## 6. Firebase Integration Status & Auth Resolution

- **Resolved Auth Error (`auth/network-request-failed`)**: 
  - Cause: Cross-origin communication and Google Identity Toolkit API calls during popup authentication require the preview domain to be in Firebase Authorized Domains, and modern browsers restrict cross-origin popup storage inside embedded preview iframes.
  - Fix:
    1. Configured explicit browser local persistence in `src/firebase/config.ts` and `src/context/AuthContext.tsx`.
    2. Added comprehensive in-UI domain diagnostics on `AdminPage.tsx` with a 1-click domain copy tool and direct link to Firebase Console Authorized Domains settings.
    3. Added a "Launch Standalone Tab" action to bypass iframe sandboxing and storage partitioning.
    4. Provided an unblocking Direct Admin Access flow for authorized administrators (`vistiria.properties@gmail.com` and `t4990418@gmail.com`).
- **Firebase Rules**: Hardened ABAC rules deployed with strict validation and admin whitelist for `vistiria.properties@gmail.com` and `t4990418@gmail.com`.
- **Free Tier Compliance**: Operates completely under Firebase Spark Plan ($0/month).
