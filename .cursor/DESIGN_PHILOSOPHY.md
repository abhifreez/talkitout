---
globs:
alwaysApply: false
---

# Design Philosophy - Forseen Health Care

## Brand Identity & Positioning

**Forseen Health Care** is a luxury longevity healthcare advisory platform that positions itself at the intersection of cutting-edge science and executive-level service. The brand embodies sophistication, precision, and forward-thinking—qualities that resonate with high-performing individuals who view health as a strategic advantage rather than a maintenance task.

### Core Brand Values
- **Precision**: Data-driven, science-backed approach
- **Exclusivity**: Private membership model with limited cohorts
- **Sophistication**: Executive-minded, luxury aesthetic
- **Forward-thinking**: Medicine 3.0 philosophy—proactive optimization
- **Elegance**: Subtle, purposeful design that doesn't distract from content

### Target Audience
- High-level executives and decision-makers
- Individuals who view health as strategic investment
- Those seeking personalized, data-driven longevity strategies
- Clients who value exclusivity and depth of service

---

## Leadership & Vision

The vision and expertise behind Forseen Health Care are embodied by its cofounders, Azra Shamshad and Reshu Jindal, who bring together deep medical knowledge, strategic thinking, and a shared commitment to transforming healthcare from reactive treatment to proactive optimization. Their combined expertise forms the foundation of our Medicine 3.0 philosophy—where cutting-edge science meets strategic health optimization for executives who view longevity as a competitive advantage.

### Azra Shamshad

Azra Shamshad brings extensive medical expertise and a forward-thinking approach to longevity medicine, combining clinical excellence with a deep understanding of preventive health optimization. Her medical background and specialization in evidence-based longevity strategies inform Forseen Health Care's commitment to science-backed protocols that move beyond traditional disease management. Azra's vision centers on empowering high-performing individuals to view their health as a strategic asset—one that requires the same precision, data-driven analysis, and long-term planning that defines executive decision-making. Her philosophy aligns with Medicine 3.0's core principle: proactive optimization designed to keep clients thriving at 95, not just preventing immediate decline. Through her expertise in addressing the Four Horsemen of aging—cardiovascular disease, neurodegeneration, cancer, and metabolic dysfunction—Azra ensures that every protocol is grounded in the latest longevity science while tailored to each executive's unique genetic profile and life circumstances.

### Reshu Jindal

Reshu Jindal brings strategic vision and operational excellence to Forseen Health Care, translating the science of longevity into actionable, personalized protocols for executive clients. Her expertise in bridging medical science with strategic implementation ensures that every client receives a roadmap tailored to their unique biochemistry, lifestyle, and long-term goals. Jindal's approach emphasizes the intersection of cutting-edge diagnostics—from ApoB levels to full-genome sequencing and VO2 Max testing—with personalized intervention strategies and persistent counsel that evolves with both advancing science and changing life circumstances. Her vision for Forseen Health Care reflects a commitment to exclusivity and depth—ensuring that each member of our limited cohort receives the executive-level attention their health investment demands. Through her strategic oversight of The Roadmap and Persistent Counsel services, Jindal ensures that data transforms into actionable protocols that maintain functional longevity, enabling clients to achieve The Centenarian Decathlon's real-world capabilities.

### Visual Presentation Guidelines

When presenting the cofounders in the application, maintain the sophisticated, executive-focused aesthetic that defines the brand:

#### Photography & Imagery
- **Portrait Style**: Professional, executive-focused portraits that convey authority, approachability, and medical expertise
- **Composition**: Clean backgrounds with subtle depth, maintaining focus on the individual
- **Lighting**: Soft, professional lighting that conveys warmth and sophistication
- **Format**: High-resolution images optimized for web (WebP with fallbacks)
- **Aspect Ratio**: Consistent portrait format (e.g., 3:4 or 4:5) for visual harmony

#### Layout & Structure
- **Desktop**: Side-by-side presentation in a two-column grid with generous spacing
- **Tablet**: Maintain side-by-side layout with adjusted spacing
- **Mobile**: Stacked vertically with equal visual weight
- **Container**: Max-width container (`max-w-6xl` or `max-w-7xl`) with centered alignment
- **Section Padding**: Use `.section-padding` for consistent vertical rhythm

#### Styling & Components
- **Card Design**: Glass cards with subtle hover effects, maintaining the luxury aesthetic
- **Card Padding**: `p-8 md:p-10 lg:p-12` for generous breathing room
- **Border**: Subtle border using `border-border` color, transitioning to accent on hover
- **Background**: Glass effect with backdrop blur for depth
- **Hover Effects**: Radial gradient glow that follows mouse position (matching service cards)

#### Typography
- **Names**: Heading font (Cormorant Garamond), `text-3xl md:text-4xl lg:text-5xl`, `font-light`, `tracking-wide`
- **Credentials**: Body font (Inter), `text-sm md:text-base`, `uppercase`, `tracking-[0.15em]`, muted color
- **Descriptions**: Body font (Inter), `text-base md:text-lg`, `font-light`, `leading-relaxed`
- **Key Phrases**: Accent color used sparingly for emphasis (e.g., "Medicine 3.0", "strategic asset")

#### Spacing & Hierarchy
- **Between Photos and Text**: `mb-6 md:mb-8` for clear separation
- **Between Cofounders**: `gap-12 md:gap-16 lg:gap-20` for generous spacing
- **Section Margin**: `mb-16 md:mb-24` above and below the section
- **Visual Weight**: Equal prominence for both cofounders

#### Animation & Interaction
- **Scroll Trigger**: Subtle scroll-triggered reveal animations matching overall design philosophy
- **Trigger Point**: `'top 80%'` for consistent entry timing
- **Animation**: Fade in with slight upward motion (`opacity: 0 → 1, y: 50 → 0`)
- **Stagger**: 0.2s delay between cofounder cards for sequential reveal
- **Duration**: 0.8s-1s for smooth, elegant motion
- **Hover States**: Smooth transitions on glass cards (0.5s duration)

#### Responsive Considerations
- **Mobile**: Single column, full-width cards, reduced padding
- **Tablet**: Two columns with adjusted spacing, maintained card proportions
- **Desktop**: Optimal spacing and typography scale, enhanced hover effects
- **Image Loading**: Lazy loading for below-the-fold content, progressive enhancement

---

## Color Palette

The color system is built on a foundation of **Ivory, Charcoal, and Subtle Gold**—creating a sophisticated, timeless palette that conveys luxury and trust.

### Light Mode Palette

#### Primary Colors
- **Background (Ivory)**: `hsl(40 33% 97%)`
  - Primary surface color, warm and inviting
  - Creates a sense of space and clarity
  
- **Foreground (Charcoal)**: `hsl(220 15% 15%)`
  - Primary text color, deep and authoritative
  - Used for headings and primary content

#### Secondary Colors
- **Secondary (Warm Ivory)**: `hsl(40 25% 94%)`
  - Section backgrounds, subtle differentiation
  - Provides visual hierarchy without harsh contrast

- **Muted**: `hsl(40 15% 92%)`
  - Subtle backgrounds for cards and containers
  - Creates depth without distraction

#### Accent Color
- **Accent (Subtle Gold)**: `hsl(38 45% 52%)`
  - Strategic highlight color
  - Used sparingly for emphasis, hover states, and key interactions
  - Conveys premium quality and warmth

#### Supporting Colors
- **Muted Foreground**: `hsl(220 10% 45%)`
  - Secondary text, descriptions, and supporting content
  - Maintains readability while reducing visual weight

- **Border**: `hsl(40 20% 88%)`
  - Subtle dividers and container boundaries
  - Creates structure without harsh lines

- **Input**: `hsl(40 20% 88%)`
  - Form field borders
  - Consistent with border color system

- **Ring (Focus)**: `hsl(38 45% 52%)`
  - Focus indicators for accessibility
  - Matches accent color for consistency

#### Glassmorphism Tokens
- **Glass**: `hsl(40 20% 98% / 0.7)`
  - Semi-transparent background for glass cards
  - Creates depth and layering

- **Glass Border**: `hsl(40 20% 100% / 0.3)`
  - Subtle border for glass elements
  - Enhances the glassmorphism effect

- **Glow Gold**: `hsl(38 60% 60% / 0.15)`
  - Radial gradient glow on hover
  - Interactive feedback for glass cards

- **Shadow Elegant**: `hsl(220 15% 15% / 0.08)`
  - Soft shadows for elevation
  - Creates subtle depth without harshness

### Dark Mode Palette

The dark mode maintains the same color relationships while inverting the light/dark balance:

- **Background**: `hsl(220 20% 8%)` - Deep charcoal base
- **Foreground**: `hsl(40 20% 95%)` - Warm ivory text
- **Secondary**: `hsl(220 15% 18%)` - Subtle section backgrounds
- **Accent**: `hsl(38 50% 55%)` - Slightly brighter gold for contrast
- **Glass**: `hsl(220 18% 12% / 0.8)` - Darker glass effect
- **Glow Gold**: `hsl(38 60% 50% / 0.2)` - Enhanced glow for visibility

### Color Usage Principles

1. **Restraint**: Use accent color sparingly—only for key interactions and emphasis
2. **Hierarchy**: Use color to establish visual hierarchy, not decoration
3. **Accessibility**: Maintain sufficient contrast ratios (WCAG AA minimum)
4. **Consistency**: Use semantic color tokens (e.g., `bg-background`, `text-foreground`) rather than direct color values
5. **Purpose**: Every color choice should serve a functional purpose

---

## Typography System

The typography system combines **Cormorant Garamond** (headings) and **Inter** (body) to create a sophisticated, readable hierarchy that balances elegance with clarity.

### Typefaces

#### Heading Font: Cormorant Garamond
- **Usage**: All headings (h1, h2, h3, h4, h5, h6)
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold)
- **Characteristics**: 
  - Elegant serif with classical proportions
  - Wide letter spacing for luxury aesthetic
  - Light weight (300) for sophisticated, airy feel
- **Purpose**: Conveys premium quality and timeless elegance

#### Body Font: Inter
- **Usage**: Body text, UI elements, buttons, forms
- **Weights**: 300 (Light), 400 (Regular), 500 (Medium)
- **Characteristics**:
  - Modern, geometric sans-serif
  - Excellent readability at all sizes
  - Clean, professional appearance
- **Purpose**: Ensures clarity and readability for content consumption

### Typography Scale

#### Hero Headings
- **Mobile**: `text-4xl` (2.25rem / 36px)
- **Tablet**: `text-6xl` (3.75rem / 60px)
- **Desktop**: `text-7xl` (4.5rem / 72px)
- **Large Desktop**: `text-8xl` (6rem / 96px)
- **Weight**: `font-light` (300)
- **Letter Spacing**: `tracking-wide` (0.025em)
- **Line Height**: `leading-tight` (1.25)

#### Section Headings
- **Mobile**: `text-3xl` (1.875rem / 30px)
- **Tablet**: `text-5xl` (3rem / 48px)
- **Desktop**: `text-6xl` (3.75rem / 60px)
- **Weight**: `font-light` (300)
- **Letter Spacing**: `tracking-wide` (0.025em)
- **Usage**: Main section titles, major content divisions

#### Card Titles
- **Mobile**: `text-2xl` (1.5rem / 24px)
- **Tablet**: `text-3xl` (1.875rem / 30px)
- **Weight**: `font-light` (300)
- **Usage**: Service cards, feature titles

#### Body Text
- **Mobile**: `text-lg` (1.125rem / 18px)
- **Tablet**: `text-xl` (1.25rem / 20px)
- **Desktop**: `text-2xl` (1.5rem / 24px) for hero subtext
- **Weight**: `font-light` (300)
- **Line Height**: `leading-relaxed` (1.75) or `leading-relaxed` (1.8)
- **Usage**: Paragraphs, descriptions, content

#### Small Text
- **Size**: `text-sm` (0.875rem / 14px)
- **Weight**: `font-light` (300)
- **Usage**: Labels, captions, metadata

#### UI Text
- **Buttons**: `text-sm` with `tracking-[0.2em]` (uppercase)
- **Labels**: `text-sm` with `tracking-wide` (uppercase)
- **Navigation**: `text-xl` to `text-2xl` with `tracking-[0.3em]`

### Typography Principles

1. **Hierarchy**: Clear visual hierarchy through size, weight, and spacing
2. **Readability**: Generous line height (1.8) for comfortable reading
3. **Letter Spacing**: Wide tracking for headings creates luxury aesthetic
4. **Weight**: Light weights (300) maintain elegance without heaviness
5. **Responsive**: Typography scales smoothly across breakpoints
6. **Consistency**: Use semantic classes (`font-heading`, `font-body`) rather than direct font-family declarations

### Typography Utilities

- `.font-heading`: Applies Cormorant Garamond
- `.font-body`: Applies Inter
- `.letter-spacing-wide`: `0.15em` letter spacing
- `.letter-spacing-wider`: `0.25em` letter spacing
- `.text-gradient`: Gradient text effect using foreground → accent → foreground

---

## Visual Hierarchy

Visual hierarchy guides users through content in order of importance, using size, color, spacing, and animation to create a clear information architecture.

### Hierarchy Principles

1. **Size**: Larger elements draw attention first
2. **Color**: Accent color creates focal points
3. **Spacing**: White space creates breathing room and separation
4. **Position**: Top-to-bottom, left-to-right reading flow
5. **Animation**: Motion draws attention to key elements
6. **Contrast**: High contrast for primary content, lower for secondary

### Hierarchy Levels

#### Level 1: Hero Content
- Largest typography
- Full-screen presentation
- Prominent positioning
- Animated entrance

#### Level 2: Section Headings
- Large, centered headings
- Generous spacing above and below
- Clear section boundaries

#### Level 3: Card Titles
- Medium-sized headings
- Grouped with related content
- Interactive hover states

#### Level 4: Body Content
- Readable body text
- Supporting descriptions
- Muted colors for secondary information

#### Level 5: Metadata
- Small text
- Lowest visual weight
- Supporting information only

---

## Spacing & Layout System

The spacing system creates rhythm, breathing room, and visual organization through consistent, responsive spacing values.

### Section Padding

The `.section-padding` utility provides consistent vertical and horizontal spacing:

- **Vertical (Mobile)**: `py-24` (6rem / 96px)
- **Vertical (Tablet)**: `py-32` (8rem / 128px)
- **Vertical (Desktop)**: `py-40` (10rem / 160px)
- **Horizontal (Mobile)**: `px-6` (1.5rem / 24px)
- **Horizontal (Tablet)**: `px-12` (3rem / 48px)
- **Horizontal (Desktop)**: `px-24` (6rem / 96px)

### Container System

- **Max Width**: `max-w-6xl` (72rem / 1152px) or `max-w-7xl` (80rem / 1280px)
- **Centering**: `mx-auto` for horizontal centering
- **Responsive Padding**: Applied via `.section-padding` class

### Spacing Scale

The system uses Tailwind's default spacing scale with emphasis on:

- **Tight**: `gap-4` (1rem) - Close relationships
- **Normal**: `gap-6` (1.5rem) - Standard spacing
- **Loose**: `gap-8` (2rem) - Generous spacing
- **Very Loose**: `gap-12` (3rem) - Major separations

### Grid System

- **Mobile**: Single column layouts
- **Tablet**: 2-3 column grids (`md:grid-cols-2`, `md:grid-cols-3`)
- **Desktop**: 3-4 column grids (`lg:grid-cols-3`, `lg:grid-cols-4`)
- **Gap**: `gap-6 md:gap-8` for responsive grid spacing

### Layout Principles

1. **Consistency**: Use `.section-padding` for all major sections
2. **Responsive**: Spacing increases with screen size
3. **Breathing Room**: Generous spacing creates luxury feel
4. **Alignment**: Center content containers, left-align text within
5. **Max Width**: Constrain content width for optimal readability

---

## Animation Philosophy

Animations in Forseen Health Care are **subtle, elegant, and purposeful**. Every animation serves a functional purpose—enhancing understanding, providing feedback, or guiding attention—without distracting from the content.

### Animation Principles

1. **Purposeful**: Every animation should serve a function
2. **Subtle**: Animations enhance, not dominate
3. **Elegant**: Smooth, refined motion that feels premium
4. **Performance**: GPU-accelerated properties (transform, opacity)
5. **Accessibility**: Respect `prefers-reduced-motion`
6. **Timing**: 0.5s-1s for most transitions, longer for complex sequences

### Animation Libraries

#### GSAP (GreenSock Animation Platform)
- **Primary Use**: Scroll-triggered animations, complex sequences
- **Plugins**: ScrollTrigger for scroll-based animations
- **Pattern**: Use `gsap.context()` for proper cleanup
- **Best For**: 
  - Letter-by-letter text animations
  - Scroll-triggered reveals
  - Horizontal scroll sections
  - Staggered card animations

#### Framer Motion
- **Primary Use**: Component-level animations, menu transitions
- **Best For**:
  - Modal/overlay animations
  - Interactive hover states
  - Exit animations with AnimatePresence
  - Simple state-based animations

### Animation Patterns

#### Scroll-Triggered Reveals
```typescript
gsap.fromTo(
  element,
  { opacity: 0, y: 50 },
  {
    opacity: 1,
    y: 0,
    duration: 1,
    scrollTrigger: {
      trigger: element,
      start: 'top 80%',
      toggleActions: 'play none none reverse',
    },
  }
);
```

**Characteristics**:
- Trigger point: `'top 80%'` or `'top 70%'` for consistent entry
- Toggle actions: `'play none none reverse'` for smooth scroll behavior
- Duration: 0.8s-1s for smooth, noticeable motion
- Easing: `'power2.out'` for natural deceleration

#### Staggered Animations
```typescript
gsap.fromTo(
  elements,
  { opacity: 0, y: 60 },
  {
    opacity: 1,
    y: 0,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: { /* ... */ },
  }
);
```

**Characteristics**:
- Stagger delay: 0.15s-0.2s between elements
- Creates sequential reveal effect
- Used for card grids, lists, icon groups

#### Letter-by-Letter Text Animation
```typescript
gsap.to(letterSpans, {
  opacity: 1,
  duration: 0.05,
  stagger: 0.04,
  delay: 0.5,
  ease: 'power2.out',
});
```

**Characteristics**:
- Very short duration per letter (0.05s)
- Small stagger (0.04s) for smooth flow
- Creates premium, attention-grabbing effect
- Used for hero headlines

#### Horizontal Scroll
```typescript
gsap.to(scroller, {
  x: -scrollDistance,
  ease: 'none',
  scrollTrigger: {
    trigger: section,
    start: 'top top',
    end: () => `+=${scrollDistance}`,
    pin: true,
    scrub: 1,
  },
});
```

**Characteristics**:
- Linear easing (`'none'`) for scroll-linked motion
- Pin container during scroll
- Scrub value: 1 for smooth, responsive feel
- Used for Decathlon section horizontal scroll

#### Hover Interactions
- **Glass Card Glow**: Radial gradient follows mouse position
- **Button Underline**: Animated underline on hover
- **Icon Border**: Border color transitions to accent
- **Text Color**: Subtle color shift to accent

**Timing**: 0.5s transitions for smooth, elegant feel

### Animation Timing

- **Fast**: 0.2s-0.3s - Quick feedback (button clicks, hovers)
- **Medium**: 0.5s-0.8s - Standard transitions (card hovers, fades)
- **Slow**: 1s-1.5s - Major reveals (section entrances, complex sequences)
- **Very Slow**: 6s - Continuous animations (subtle float, ambient motion)

### Easing Functions

- **Power2.out**: Natural deceleration (most common)
- **Ease-out**: Smooth finish (standard transitions)
- **Ease-in-out**: Balanced acceleration/deceleration
- **None**: Linear (scroll-linked animations)

### Performance Considerations

1. **GPU Acceleration**: Use `transform` and `opacity` properties
2. **Will-Change**: Use sparingly, only for elements that will animate
3. **Cleanup**: Always clean up GSAP contexts and event listeners
4. **Debouncing**: Debounce scroll handlers when needed
5. **Reduced Motion**: Respect `prefers-reduced-motion` media query

---

## Component Design Patterns

### Glass Cards

Glass cards are a signature design element that creates depth and sophistication through glassmorphism.

#### Implementation
```css
.glass-card {
  background: hsl(var(--glass));
  backdrop-filter: blur(20px);
  border: 1px solid hsl(var(--glass-border));
  box-shadow: 
    0 8px 32px hsl(var(--shadow-elegant)),
    inset 0 1px 0 hsl(var(--glass-border));
}
```

#### Interactive Hover Effect
- Radial gradient glow follows mouse position
- Uses CSS custom properties (`--mouse-x`, `--mouse-y`)
- Smooth opacity transition (0.5s)
- Creates engaging, premium interaction

#### Usage
- Service cards
- Feature highlights
- Content containers
- Decathlon task cards

### Elegant Buttons

Buttons use minimal styling with subtle hover effects that convey sophistication.

#### Implementation
```css
.btn-elegant {
  border: 1px solid foreground/20;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  transition: all 0.5s ease-out;
}

.btn-elegant:hover {
  border-color: accent;
  color: accent;
}
```

#### Characteristics
- Uppercase text with wide letter spacing
- Border-only style (no background fill)
- Hover: Border and text shift to accent color
- Subtle background scale animation on hover
- Focus states for accessibility

### Form Elements

Forms use minimal, border-bottom style for a clean, luxury aesthetic.

#### Input Style
- Transparent background
- Bottom border only (`border-b`)
- Border color: `foreground/20` (subtle)
- Focus: Border shifts to accent color
- Placeholder: Muted color, descriptive text

#### Label Style
- Uppercase, wide letter spacing
- Small size (`text-sm`)
- Muted color
- Positioned above input

### Section Headers

Consistent pattern for section introductions:

- Large, centered heading
- Optional subtitle/description
- Generous spacing (mb-16 md:mb-24)
- Responsive typography scale

### Navigation

#### Header
- Fixed position with blur effect on scroll
- Minimal logo (text-based)
- Menu button with elegant underline
- "Enquire" CTA button

#### Full-Screen Menu
- Overlay with backdrop blur
- Large, centered navigation items
- Staggered entrance animation
- Smooth exit animation
- Footer tagline

---

## Glassmorphism Implementation

Glassmorphism is a key visual element that creates depth, sophistication, and a modern aesthetic.

### Core Properties

1. **Semi-transparent Background**: `hsl(var(--glass))`
   - Light mode: `hsl(40 20% 98% / 0.7)`
   - Dark mode: `hsl(220 18% 12% / 0.8)`

2. **Backdrop Blur**: `backdrop-filter: blur(20px)`
   - Creates frosted glass effect
   - Blurs content behind the element

3. **Subtle Border**: `1px solid hsl(var(--glass-border))`
   - Light mode: `hsl(40 20% 100% / 0.3)`
   - Dark mode: `hsl(220 15% 30% / 0.3)`

4. **Layered Shadows**:
   - Outer shadow: `0 8px 32px hsl(var(--shadow-elegant))`
   - Inset highlight: `inset 0 1px 0 hsl(var(--glass-border))`

### Interactive Hover Effect

The glass card hover effect uses a radial gradient that follows the mouse:

```css
.glass-card::before {
  background: radial-gradient(
    600px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
    hsl(var(--glow-gold)),
    transparent 40%
  );
  opacity: 0;
  transition: opacity 0.5s;
}

.glass-card:hover::before {
  opacity: 1;
}
```

**Implementation in React**:
- Track mouse position with `onMouseMove`
- Update CSS custom properties (`--mouse-x`, `--mouse-y`)
- Smooth opacity transition on hover

### Usage Guidelines

1. **Purpose**: Use for cards, containers, and elevated content
2. **Spacing**: Ensure sufficient padding for readability
3. **Contrast**: Maintain text contrast over glass backgrounds
4. **Performance**: Backdrop blur can impact performance—use judiciously
5. **Accessibility**: Ensure sufficient contrast ratios

---

## Responsive Design Approach

The design system is built mobile-first, with progressive enhancement for larger screens.

### Breakpoints

- **Mobile**: Default (< 768px)
  - Single column layouts
  - Compact spacing
  - Smaller typography

- **Tablet**: `md:` (≥ 768px)
  - 2-3 column grids
  - Increased spacing
  - Medium typography

- **Desktop**: `lg:` (≥ 1024px)
  - 3-4 column grids
  - Generous spacing
  - Large typography

- **Large Desktop**: `xl:` (≥ 1280px)
  - Maximum typography scale
  - Optimal content width

### Responsive Patterns

#### Typography
```tsx
className="text-3xl md:text-5xl lg:text-6xl"
```

#### Spacing
```tsx
className="py-24 md:py-32 lg:py-40"
className="px-6 md:px-12 lg:px-24"
```

#### Grids
```tsx
className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
```

#### Container Width
```tsx
className="max-w-6xl mx-auto"
```

### Mobile-First Principles

1. **Start Small**: Design for mobile first, enhance for larger screens
2. **Progressive Enhancement**: Add features and complexity as screen size increases
3. **Touch Targets**: Ensure interactive elements are at least 44×44px
4. **Readability**: Maintain comfortable line lengths (50-75 characters)
5. **Performance**: Optimize for mobile network conditions

---

## Accessibility Considerations

Accessibility is fundamental to the design system, ensuring the platform is usable by everyone.

### Color Contrast

- **Text on Background**: Minimum WCAG AA (4.5:1 for normal text)
- **Large Text**: Minimum WCAG AA (3:1 for text 18px+)
- **Interactive Elements**: Clear focus states with visible indicators
- **Accent Usage**: Ensure accent color has sufficient contrast when used for text

### Keyboard Navigation

- **Focus States**: All interactive elements have visible focus indicators
- **Tab Order**: Logical tab order throughout the interface
- **Skip Links**: Consider adding skip links for main content
- **Keyboard Shortcuts**: Support standard browser shortcuts

### Screen Readers

- **Semantic HTML**: Use proper HTML elements (`<nav>`, `<main>`, `<section>`, etc.)
- **ARIA Labels**: Add ARIA labels for icon-only buttons and interactive elements
- **Alt Text**: Descriptive alt text for all images
- **Heading Hierarchy**: Proper heading hierarchy (h1 → h2 → h3)
- **Form Labels**: Always associate labels with form inputs

### Motion & Animation

- **Reduced Motion**: Respect `prefers-reduced-motion` media query
- **Animation Duration**: Keep animations under 5 seconds
- **No Flashing**: Avoid content that flashes more than 3 times per second
- **Pause Controls**: Provide controls for auto-playing animations

### Form Accessibility

- **Labels**: All inputs have associated labels
- **Error Messages**: Clear, descriptive error messages
- **Required Fields**: Indicate required fields clearly
- **Fieldset**: Group related form fields with `<fieldset>`
- **Validation**: Provide real-time validation feedback

### Focus Management

- **Visible Focus**: All focusable elements have visible focus indicators
- **Focus Ring**: Use accent color for focus rings
- **Focus Trap**: Trap focus in modals and overlays
- **Focus Restoration**: Restore focus when closing modals

---

## Dark Mode Support

The design system includes comprehensive dark mode support that maintains the same sophisticated aesthetic.

### Color Inversion Strategy

Dark mode inverts the light/dark relationship while maintaining color harmony:

- **Background**: Deep charcoal (`hsl(220 20% 8%)`) replaces ivory
- **Foreground**: Warm ivory (`hsl(40 20% 95%)`) replaces charcoal
- **Accent**: Slightly brighter gold (`hsl(38 50% 55%)`) for better contrast
- **Glass**: Darker glass effect with higher opacity

### Implementation

- Uses CSS custom properties for theme switching
- `.dark` class on root element triggers dark mode
- All color tokens have dark mode variants
- Smooth transitions between themes

### Dark Mode Considerations

1. **Contrast**: Ensure sufficient contrast in dark mode
2. **Glow Effects**: Slightly brighter glow for visibility
3. **Glass Effect**: Higher opacity for better readability
4. **Images**: Consider image adjustments for dark mode
5. **User Preference**: Respect system preference or user choice

---

## Design Tokens Reference

### CSS Custom Properties

All design tokens are defined as CSS custom properties in `index.css`:

```css
:root {
  /* Colors */
  --background: 40 33% 97%;
  --foreground: 220 15% 15%;
  --accent: 38 45% 52%;
  
  /* Glassmorphism */
  --glass: 40 20% 98% / 0.7;
  --glass-border: 40 20% 100% / 0.3;
  --glow-gold: 38 60% 60% / 0.15;
  
  /* Typography */
  --font-heading: 'Cormorant Garamond', serif;
  --font-body: 'Inter', sans-serif;
  
  /* Spacing */
  --section-padding: 8rem;
}
```

### Usage in Components

Always use semantic tokens rather than direct color values:

```tsx
// ✅ Good
className="bg-background text-foreground border-accent"

// ❌ Bad
className="bg-[#faf8f5] text-[#1f2937]"
```

---

## Best Practices Summary

1. **Consistency**: Use design system tokens and utilities consistently
2. **Hierarchy**: Establish clear visual hierarchy through size, color, and spacing
3. **Restraint**: Use accent color and animations sparingly
4. **Accessibility**: Ensure all interactions are accessible
5. **Performance**: Optimize animations and use GPU-accelerated properties
6. **Responsive**: Design mobile-first with progressive enhancement
7. **Purpose**: Every design decision should serve a functional purpose
8. **Elegance**: Maintain sophisticated, luxury aesthetic throughout

---

## Resources

- **Tailwind CSS**: https://tailwindcss.com/docs
- **GSAP**: https://greensock.com/docs/
- **Framer Motion**: https://www.framer.com/motion/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Color Contrast Checker**: https://webaim.org/resources/contrastchecker/

---

*This design philosophy document serves as the foundation for all design decisions in the Forseen Health Care platform. It should be referenced when making design choices and updated as the system evolves.*
