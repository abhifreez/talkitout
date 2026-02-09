---
globs:
alwaysApply: false
---

# Product Specifications - Forseen Health Care

## Document Information

**Version**: 1.0  
**Last Updated**: January 2026  
**Status**: Active Development  
**Product**: Forseen Health Care - Luxury Longevity Healthcare Advisory Platform

---

## 1. Product Overview

### 1.1 Vision Statement

Forseen Health Care is a luxury longevity healthcare advisory platform that transforms medicine from reactive repair to strategic optimization. We position healthcare as a strategic advantage for high-performing executives, moving beyond traditional medicine's focus on treating disease to a proactive approach that optimizes health for long-term thriving.

### 1.2 Value Proposition

**Primary Value Proposition:**
- **Medicine 3.0 Approach**: Shift from reactive disease treatment (Medicine 2.0) to proactive health optimization
- **Executive-Focused**: Tailored for high-level executives who view health as a strategic asset
- **Science-Backed**: Deep diagnostics, personalized protocols, and evidence-based interventions
- **Long-Term Vision**: Designed to keep clients thriving at 95, not just preventing immediate death
- **Private Membership Model**: Exclusive, limited cohort ensuring personalized attention and depth of guidance

### 1.3 Core Differentiators

1. **Strategic Health Optimization**: Health as competitive advantage, not just maintenance
2. **Deep Diagnostics**: Advanced testing including ApoB levels, full-genome sequencing, VO2 Max
3. **Personalized Roadmaps**: Custom nutrition, exercise biochemistry, and pharmacotherapy protocols
4. **Persistent Counsel**: Ongoing guidance that evolves with science and client's life circumstances
5. **Functional Longevity**: Focus on maintaining real-world capabilities (The Centenarian Decathlon)

---

## 2. Target Audience

### 2.1 Primary Persona

**Executive Longevity Seeker**
- **Demographics**: 
  - Age: 40-65
  - Income: High net worth ($500K+ annual income)
  - Occupation: C-suite executives, entrepreneurs, investors, high-performing professionals
  - Location: Urban/suburban, major metropolitan areas
- **Psychographics**:
  - Views health as strategic investment
  - Values data-driven decision making
  - Seeks optimization, not just maintenance
  - Willing to invest in premium services
  - Long-term thinking and planning orientation
- **Pain Points**:
  - Traditional medicine is reactive, not proactive
  - Lack of personalized, comprehensive health strategy
  - Need for executive-level health optimization
  - Desire to maintain peak performance into advanced age
  - Want science-backed, not fad-based approaches

### 2.2 Secondary Personas

1. **High-Performance Athletes** (40+)
   - Seeking longevity beyond peak performance years
   - Interested in recovery and sustained capability

2. **Wealthy Retirees** (65+)
   - Focus on maintaining independence and quality of life
   - Interested in preventing decline

3. **Health-Conscious Professionals** (35-50)
   - Early adopters of longevity science
   - Proactive about health optimization

---

## 3. Core Features & Sections

### 3.1 Navigation & Header

**Component**: `Header.tsx`

**Features**:
- Fixed position header with scroll-based blur effect
- Logo/brand name: "FORSEEN HEALTH CARE"
- Menu button (mobile and desktop)
- "Enquire" CTA button (desktop only)
- Full-screen menu overlay with smooth animations

**User Flow**:
1. User lands on page → Header is transparent
2. User scrolls down → Header applies blur and background opacity
3. User clicks "Menu" → Full-screen overlay animates in
4. User selects navigation item → Smooth scroll to section, menu closes
5. User clicks "Enquire" → Smooth scroll to contact section

**Technical Requirements**:
- Scroll detection with `useState` and `useEffect`
- Framer Motion for menu overlay animations
- Smooth scroll behavior using `scrollIntoView`
- Responsive design: mobile menu vs desktop menu
- Z-index management: header (z-50), menu overlay (z-100)

**Design Specifications**:
- Header height: 72px (py-6)
- Blur effect: `backdrop-filter: blur(10px)`
- Background transition: `bg-transparent` → `bg-background/80`
- Menu animation: Fade in/out (0.5s duration)
- Menu items: Staggered animation (0.1s delay per item)

---

### 3.2 Hero Section

**Component**: `HeroSection.tsx`  
**Section ID**: `#hero`

**Features**:
- Full-screen hero with background image
- Letter-by-letter headline animation
- Subtext fade-in animation
- Scroll indicator at bottom
- Gradient overlay for text readability

**Content**:
- **Headline**: "The Future of Your Health, Foreseen."
- **Subtext**: "High-performance living, engineered for the long arc. We move beyond medicine as a repair shop and into medicine as a strategic advantage."

**User Flow**:
1. Page loads → Headline letters animate in sequentially (0.05s per letter, 0.04s stagger)
2. After headline completes → Subtext fades in from below (1s duration, 2s delay)
3. User sees scroll indicator → Encourages scrolling to next section

**Animation Specifications**:
- **Headline Animation**:
  - Initial state: Each letter `opacity-0`
  - Animation: `opacity: 0 → 1`
  - Duration: 0.05s per letter
  - Stagger: 0.04s between letters
  - Delay: 0.5s after page load
  - Easing: `power2.out`
- **Subtext Animation**:
  - Initial state: `opacity: 0, y: 30`
  - Animation: `opacity: 1, y: 0`
  - Duration: 1s
  - Delay: 2s
  - Easing: `power2.out`
- **Scroll Indicator**:
  - CSS animation: `animate-subtle-float` (continuous subtle movement)

**Technical Requirements**:
- GSAP for letter-by-letter animation
- Image optimization: `hero-mountains.jpg` (should be compressed)
- Responsive typography: `text-4xl md:text-6xl lg:text-7xl xl:text-8xl`
- Minimum height: `min-h-screen`
- Gradient overlay: `from-background/30 via-background/10 to-background/80`

**Design Specifications**:
- Background: Full-bleed image with gradient overlay
- Content: Centered, max-width 5xl
- Typography: Heading font (Cormorant Garamond), light weight
- Spacing: `mb-8` between headline and subtext
- Scroll indicator: Bottom center, 48px from bottom

---

### 3.3 Medicine 3.0 Section

**Component**: `MedicineSection.tsx`  
**Section ID**: `#medicine`

**Features**:
- Headline with scroll-triggered animation
- Medicine 2.0 vs Medicine 3.0 comparison
- "The Four Horsemen" interactive cards
- ScrollTrigger animations for all elements

**Content Structure**:

1. **Headline**: "From Reactive Repair to Strategic Optimization."
2. **Story Text**: "Medicine 2.0 is designed to keep you from dying today. Medicine 3.0 is designed to keep you thriving at 95."
3. **Comparison Grid**:
   - **Medicine 2.0** (Left):
     - Treats disease
     - Focuses on averages
     - Reactive
   - **Medicine 3.0** (Right):
     - Prevents decline
     - Focuses on you
     - Proactive
4. **The Four Horsemen**:
   - Cardiovascular (Heart icon)
   - Neurodegeneration (Brain icon)
   - Cancer (DNA icon)
   - Metabolic Dysfunction (Flame icon)

**User Flow**:
1. User scrolls to section → Headline animates in (fade + slide up)
2. Comparison items animate in with stagger (0.2s delay)
3. Four Horsemen cards animate in with scale effect (0.15s stagger)
4. Cards have hover effects: border color change, icon highlight

**Animation Specifications**:
- **Headline**:
  - Trigger: `top 80%`
  - Animation: `opacity: 0 → 1, y: 50 → 0`
  - Duration: 1s
  - Toggle: `play none none reverse`
- **Comparison Items**:
  - Trigger: `top 70%`
  - Animation: `opacity: 0 → 1, y: 30 → 0`
  - Duration: 0.8s
  - Stagger: 0.2s
- **Four Horsemen**:
  - Trigger: `top 70%`
  - Animation: `opacity: 0 → 1, scale: 0.8 → 1`
  - Duration: 0.6s
  - Stagger: 0.15s

**Technical Requirements**:
- GSAP ScrollTrigger for all animations
- Responsive grid: `grid-cols-2 md:grid-cols-4` for horsemen
- Glass card components with hover effects
- Icon library: Lucide React (Heart, Brain, Dna, Flame)
- Border styling: Left border on Medicine 3.0 column (desktop only)

**Design Specifications**:
- Background: `bg-secondary` (warm ivory)
- Section padding: `.section-padding` (responsive)
- Max width: `max-w-6xl`
- Card styling: Glassmorphism with border hover effects
- Typography: Heading font for titles, body font for descriptions

---

### 3.4 Services Section

**Component**: `ServicesSection.tsx`  
**Section ID**: `#services`

**Features**:
- Three service cards with glassmorphism design
- Mouse-tracking radial gradient hover effects
- ScrollTrigger animations
- Icon-based visual hierarchy

**Services**:

1. **Deep Diagnostics**
   - Icon: Microscope
   - Description: "We look where others don't. From your ApoB levels to full-genome sequencing and VO2 Max testing."

2. **The Roadmap**
   - Icon: Map
   - Description: "Data is useless without a plan. We design your tactical nutrition, exercise biochemistry, and pharmacotherapy protocols."

3. **Persistent Counsel**
   - Icon: Users
   - Description: "Ongoing guidance for the high-level executive. We adjust your strategy as the science—and your life—evolves."

**User Flow**:
1. User scrolls to section → Cards animate in with stagger (fade + slide up)
2. User hovers over card → Radial gradient follows mouse position
3. Icon border and background color change on hover
4. Title color transitions to accent color on hover

**Animation Specifications**:
- **Cards**:
  - Trigger: `top 75%`
  - Animation: `opacity: 0 → 1, y: 60 → 0`
  - Duration: 0.8s
  - Stagger: 0.2s
- **Hover Effects**:
  - Radial gradient: Follows mouse position using CSS custom properties
  - Border: `border-accent/30` → `border-accent`
  - Background: Icon container gets `bg-accent/5` on hover
  - Title: `text-foreground` → `text-accent`
  - Transition duration: 500ms

**Technical Requirements**:
- Mouse position tracking: `onMouseMove` handler calculates percentage
- CSS custom properties: `--mouse-x` and `--mouse-y` for gradient position
- Radial gradient: 600px circle, positioned at mouse coordinates
- Responsive grid: `md:grid-cols-3`
- Minimum card height: `min-h-[400px]`

**Design Specifications**:
- Card padding: `p-8 md:p-10 lg:p-12`
- Icon container: 56px × 56px (w-14 h-14), rounded-full
- Typography: Heading font for titles (text-2xl md:text-3xl)
- Spacing: `mb-16 md:mb-24` for headline section

---

### 3.5 Decathlon Section

**Component**: `DecathlonSection.tsx`  
**Section ID**: `#decathlon`

**Features**:
- Horizontal scroll section with GSAP ScrollTrigger pinning
- Six functional tasks with science notes
- Numbered cards (01-06)
- Full-screen pinned experience

**Content - The Centenarian Decathlon**:

1. **Task**: "Lifting a 20kg suitcase into an overhead bin."
   - **Science**: "Requires a 10-year strength reserve of 40%. We begin building that reserve today."

2. **Task**: "Getting up off the floor using only one limb for support."
   - **Science**: "Tests lower body strength and balance—key predictors of fall risk after 70."

3. **Task**: "A 30-minute brisk walk uphill without breathlessness."
   - **Science**: "Indicates cardiovascular health equivalent to someone 15 years younger."

4. **Task**: "Carrying two bags of groceries up a flight of stairs."
   - **Science**: "Functional strength that maintains independence and quality of life."

5. **Task**: "Playing actively with grandchildren for an hour."
   - **Science**: "Requires sustained energy, mobility, and joint health we protect now."

6. **Task**: "Hiking 5 miles on varied terrain."
   - **Science**: "Tests endurance, proprioception, and musculoskeletal integrity."

**User Flow**:
1. User scrolls to section → Section pins to viewport
2. User continues scrolling → Cards scroll horizontally (right to left)
3. Scroll progress directly controls horizontal position
4. User reaches end → Section unpins, normal scroll resumes

**Animation Specifications**:
- **ScrollTrigger Configuration**:
  - Trigger: Section element
  - Start: `top top`
  - End: Calculated based on scroll distance (`scrollWidth - containerWidth`)
  - Pin: `true` (pins section during scroll)
  - Scrub: `1` (smooth scrubbing, 1 second lag)
  - Anticipate pin: `1` (smooth pinning)
- **Horizontal Scroll**:
  - Animation: `x: 0 → -scrollDistance`
  - Easing: `none` (linear, tied to scroll)
  - Duration: Controlled by scroll distance

**Technical Requirements**:
- GSAP ScrollTrigger with pinning
- Horizontal scroll container: `flex` layout, `width: max-content`
- Card width: `w-[80vw] md:w-[50vw] lg:w-[40vw]`
- Scroll distance calculation: `scrollWidth - containerWidth`
- Spacer element at end for proper scroll completion

**Design Specifications**:
- Background: `bg-secondary`
- Section height: `min-h-screen`
- Card styling: Glass cards with numbered labels
- Number display: Large, muted accent color (`text-6xl md:text-7xl text-accent/30`)
- Science note: Italic, smaller text, border-top separator

---

### 3.6 Contact Section

**Component**: `ContactSection.tsx`  
**Section ID**: `#contact`

**Features**:
- Inquiry form with validation
- ScrollTrigger animation
- Minimal, elegant form design
- Dropdown selects for concerns and sources

**Form Fields**:

1. **Name** (Required)
   - Type: Text input
   - Placeholder: "Full name"
   - Validation: Required field

2. **Email** (Required)
   - Type: Email input
   - Placeholder: "your@email.com"
   - Validation: Required, email format

3. **Primary Longevity Concern** (Required)
   - Type: Select dropdown
   - Options:
     - Cardiovascular Health
     - Cognitive Longevity
     - Cancer Prevention
     - Metabolic Optimization
     - Performance Enhancement
     - General Longevity Strategy

4. **How did you hear about us?** (Required)
   - Type: Select dropdown
   - Options:
     - Professional Network
     - Publication or Media
     - Physician Referral
     - Industry Event
     - Other

5. **Submit Button**
   - Text: "Request a Private Briefing"
   - Style: `.btn-elegant` class

**User Flow**:
1. User scrolls to section → Form animates in (fade + slide up)
2. User fills out form → Real-time validation
3. User submits → Form data logged (currently alerts, future: API call)
4. Success message displayed

**Animation Specifications**:
- **Form Animation**:
  - Trigger: `top 80%`
  - Animation: `opacity: 0 → 1, y: 40 → 0`
  - Duration: 1s
  - Toggle: `play none none reverse`

**Technical Requirements**:
- Form state management: `useState` for form data
- Form submission: `handleSubmit` with `preventDefault`
- Input styling: Border-bottom style (luxury aesthetic)
- Select styling: Custom appearance, border-bottom style
- Validation: HTML5 required attributes (future: Zod + React Hook Form)

**Design Specifications**:
- Max width: `max-w-2xl` (centered)
- Input style: Transparent background, border-bottom, focus accent color
- Label style: Uppercase, tracking-wide, muted color
- Button: Full width on mobile, auto width on desktop
- Section background: `bg-background`

**Content**:
- **Headline**: "Invest in Your Future Self."
- **Description**: "Forseen Healthcare operates on a private membership model. We accept a limited cohort of clients to ensure the depth of guidance your life demands."

---

### 3.7 Footer

**Component**: `Footer.tsx`

**Features**:
- Brand name and tagline
- Copyright information
- Responsive layout

**Content**:
- **Brand**: "FORSEEN HEALTH CARE"
- **Tagline**: "Private Longevity Advisory"
- **Motto**: "Science-Backed. Executive-Minded."
- **Copyright**: "© 2026 Forseen Health Care. All rights reserved. Forseen Health Care does not provide emergency medical services. We are your strategic health partners, focused on prevention, optimization, and longevity."

**Design Specifications**:
- Border top: `border-t border-border`
- Padding: `py-12 px-6 md:px-12 lg:px-24`
- Layout: Flex column (mobile) → Flex row (desktop)
- Text alignment: Center (mobile) → Left/Right (desktop)
- Typography: Heading font for brand, body font for text

---

## 4. Technical Requirements

### 4.1 Technology Stack

**Core Framework**:
- React 18.3+
- TypeScript 5.8+
- Vite 5.4+

**Styling**:
- Tailwind CSS 3.4+
- Custom CSS design system (index.css)
- CSS custom properties for theming

**Animation Libraries**:
- GSAP 3.14+ with ScrollTrigger plugin
- Framer Motion 12.29+ for component animations

**UI Components**:
- shadcn/ui (Radix UI primitives)
- Lucide React for icons

**Form Management** (Future):
- React Hook Form 7.61+
- Zod 3.25+ for validation
- @hookform/resolvers

**State Management** (Future):
- TanStack Query (React Query) 5.83+

**Routing**:
- React Router DOM 6.30+

**Fonts**:
- Google Fonts: Cormorant Garamond (headings), Inter (body)

### 4.2 Browser Compatibility

**Supported Browsers**:
- Chrome/Edge: Latest 2 versions
- Firefox: Latest 2 versions
- Safari: Latest 2 versions (macOS and iOS)
- Mobile browsers: iOS Safari, Chrome Mobile

**Required Features**:
- CSS Grid and Flexbox
- CSS Custom Properties (CSS Variables)
- ES6+ JavaScript features
- Intersection Observer API (for scroll detection)
- CSS `backdrop-filter` (for glassmorphism effects)

**Progressive Enhancement**:
- Graceful degradation for older browsers
- Feature detection for advanced CSS features
- Fallback styles for unsupported properties

### 4.3 Performance Requirements

**Core Web Vitals Targets**:
- **LCP (Largest Contentful Paint)**: < 2.5s
- **FID (First Input Delay)**: < 100ms
- **CLS (Cumulative Layout Shift)**: < 0.1

**Load Performance**:
- Initial bundle size: < 500KB (gzipped)
- Time to Interactive: < 3.5s
- First Contentful Paint: < 1.8s

**Animation Performance**:
- 60fps for all animations
- GPU-accelerated properties (transform, opacity)
- Debounced scroll handlers
- Lazy loading for below-the-fold content

**Image Optimization**:
- Compressed hero image (< 200KB)
- WebP format with fallbacks
- Lazy loading for images
- Responsive image sizes

**Code Splitting**:
- Route-based code splitting (future)
- Component lazy loading for heavy components
- Dynamic imports for animation libraries

### 4.4 Accessibility Requirements

**WCAG 2.1 Compliance**:
- Level AA compliance target
- Keyboard navigation support
- Screen reader compatibility
- Focus management

**Implementation**:
- Semantic HTML elements (`<nav>`, `<main>`, `<section>`, `<article>`)
- ARIA labels for interactive elements
- Alt text for all images
- Proper heading hierarchy (h1 → h2 → h3)
- Form labels associated with inputs
- Focus visible states for all interactive elements
- Skip links for main content (future)

**Keyboard Navigation**:
- Tab order: Logical and intuitive
- Enter/Space: Activate buttons and links
- Escape: Close menu overlay
- Arrow keys: Navigate dropdowns (future)

**Screen Reader Support**:
- Descriptive text for icons
- Form error messages announced
- Live regions for dynamic content (future)
- Page landmarks (nav, main, footer)

### 4.5 SEO Requirements

**Meta Tags** (Future Implementation):
- Title tag: "Forseen Health Care | Luxury Longevity Healthcare Advisory"
- Meta description: Compelling description (155-160 characters)
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URL

**Structured Data** (Future):
- Organization schema
- MedicalBusiness schema
- LocalBusiness schema (if applicable)

**Content Optimization**:
- Semantic HTML structure
- Proper heading hierarchy
- Descriptive alt text
- Internal linking structure

**Technical SEO**:
- Sitemap.xml (future)
- Robots.txt (exists in public folder)
- Fast page load times
- Mobile-friendly design
- HTTPS (production)

---

## 5. User Flows

### 5.1 Primary User Journey

**Goal**: Learn about Forseen Health Care and submit inquiry

**Steps**:
1. **Landing** → User arrives at homepage
   - Hero section loads with letter-by-letter animation
   - User sees value proposition immediately
   - Scroll indicator encourages exploration

2. **Exploration** → User scrolls through sections
   - Medicine 3.0 section: Understands philosophy shift
   - Services section: Learns about three core offerings
   - Decathlon section: Engages with horizontal scroll, sees functional goals
   - All sections animate in on scroll

3. **Engagement** → User interacts with content
   - Hovers over service cards (sees mouse-tracking effects)
   - Scrolls through decathlon tasks
   - Reads about Four Horsemen

4. **Conversion** → User submits inquiry
   - Scrolls to contact section (or clicks "Enquire" button)
   - Fills out form with concerns and source
   - Submits inquiry
   - Receives confirmation

### 5.2 Navigation Flow

**Desktop Navigation**:
1. User clicks "Menu" → Full-screen overlay appears
2. User selects section → Smooth scroll to section, menu closes
3. User clicks "Enquire" → Direct scroll to contact section

**Mobile Navigation**:
1. User taps menu icon → Full-screen menu appears
2. User selects section → Smooth scroll, menu closes
3. User can access contact form via menu or scroll

### 5.3 Form Submission Flow

1. User arrives at contact section
2. Form animates in on scroll
3. User fills required fields:
   - Name
   - Email
   - Primary concern (dropdown)
   - Source (dropdown)
4. User clicks "Request a Private Briefing"
5. Form validates (client-side)
6. Form submits (currently: console log + alert)
7. Future: API call to backend
8. Success message displayed
9. Future: Email confirmation sent

---

## 6. Content Requirements

### 6.1 Copywriting Guidelines

**Tone**:
- Executive-focused, sophisticated
- Science-backed, authoritative
- Forward-thinking, strategic
- Luxury, premium positioning

**Voice**:
- First person plural ("We")
- Direct, confident statements
- Technical but accessible
- Action-oriented

**Messaging Pillars**:
1. **Strategic Advantage**: Health as competitive edge
2. **Science-Backed**: Evidence-based approach
3. **Personalization**: Individual-focused protocols
4. **Long-Term Vision**: Thriving at 95, not just surviving
5. **Exclusivity**: Private membership, limited cohort

### 6.2 Content Updates

**Static Content** (Current):
- All section content is hardcoded in components
- No CMS integration

**Future Content Management**:
- CMS integration for easy updates
- Content versioning
- A/B testing capabilities
- Multi-language support (future)

---

## 7. Future Enhancements

### 7.1 Phase 2 Features

**Backend Integration**:
- Form submission API endpoint
- Email notification system
- CRM integration for lead management
- Admin dashboard for inquiry management

**Enhanced Form**:
- React Hook Form integration
- Zod validation schema
- Real-time validation feedback
- Success/error state management
- Loading states during submission

**Analytics**:
- Google Analytics integration
- Event tracking for user interactions
- Conversion funnel analysis
- Scroll depth tracking
- Form abandonment tracking

### 7.2 Phase 3 Features

**Content Management**:
- Headless CMS integration (Contentful, Strapi, etc.)
- Dynamic content updates
- Blog/news section
- Resource library

**Personalization**:
- User preference tracking
- Dynamic content based on referral source
- A/B testing for messaging
- Personalized recommendations

**Enhanced Interactivity**:
- Interactive health assessment quiz
- ROI calculator for health investment
- Case studies/testimonials section
- Video content integration

### 7.3 Phase 4 Features

**Member Portal** (Future):
- Client login system
- Health dashboard
- Appointment scheduling
- Document sharing
- Progress tracking

**Advanced Features**:
- Multi-language support
- Dark mode toggle
- Print-friendly styles
- PDF generation for health reports
- Integration with wearable devices

---

## 8. Success Metrics

### 8.1 Business Metrics

**Primary KPIs**:
- Form submission rate (target: > 5%)
- Time on site (target: > 3 minutes)
- Scroll depth (target: > 80% reach contact section)
- Bounce rate (target: < 40%)

**Conversion Metrics**:
- Inquiry-to-consultation rate
- Source attribution tracking
- Concern category distribution
- Geographic distribution

### 8.2 Technical Metrics

**Performance**:
- Page load time < 3s
- Time to Interactive < 3.5s
- Core Web Vitals: All "Good" ratings
- Animation frame rate: 60fps

**User Experience**:
- Mobile usability score: 95+
- Accessibility score: 90+ (Lighthouse)
- SEO score: 90+ (Lighthouse)

---

## 9. Maintenance & Support

### 9.1 Regular Updates

**Content Updates**:
- Quarterly content review
- Seasonal messaging adjustments
- Service offering updates
- Testimonial additions

**Technical Updates**:
- Dependency updates (monthly)
- Security patches (as needed)
- Browser compatibility testing (quarterly)
- Performance optimization (quarterly)

### 9.2 Monitoring

**Error Tracking**:
- Error boundary implementation
- Console error monitoring
- Form submission error tracking

**Performance Monitoring**:
- Real User Monitoring (RUM)
- Synthetic monitoring
- Core Web Vitals tracking
- Bundle size monitoring

---

## 10. Appendix

### 10.1 Component File Structure

```
src/
├── components/
│   ├── Header.tsx
│   ├── HeroSection.tsx
│   ├── MedicineSection.tsx
│   ├── ServicesSection.tsx
│   ├── DecathlonSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   └── ui/ (shadcn/ui components)
├── pages/
│   └── Index.tsx
├── assets/
│   └── hero-mountains.jpg
├── hooks/
├── lib/
│   └── utils.ts
└── index.css
```

### 10.2 Key Dependencies

**Production**:
- react, react-dom
- gsap, @gsap/react
- framer-motion
- react-router-dom
- lucide-react
- tailwindcss

**Development**:
- vite
- typescript
- eslint
- vitest

### 10.3 Design Tokens Reference

**Colors** (HSL values):
- Background: `40 33% 97%` (Ivory)
- Foreground: `220 15% 15%` (Charcoal)
- Accent: `38 45% 52%` (Gold)
- Muted: `220 10% 45%` (Gray)

**Typography**:
- Heading: Cormorant Garamond (300, 400, 500, 600)
- Body: Inter (300, 400, 500)

**Spacing**:
- Section padding: `py-24 md:py-32 lg:py-40`
- Container padding: `px-6 md:px-12 lg:px-24`

**Breakpoints**:
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px
- Large: > 1280px

---

**Document End**

*This specification document should be updated as the product evolves and new features are added.*
