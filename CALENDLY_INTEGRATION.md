# Calendly Integration Documentation

## Overview
Successfully integrated Calendly booking functionality into the Foreseen Healthcare website. The implementation follows all project architecture principles: modular design, TypeScript type safety, and reusable components.

## Files Created

### 1. `/src/hooks/use-calendly.ts`
Custom React hook that manages Calendly SDK lifecycle:
- **Purpose**: Encapsulates Calendly widget loading and initialization logic
- **Features**:
  - Automatically loads Calendly CSS and JS scripts
  - Provides `openCalendly()` function to trigger the booking widget
  - Proper cleanup on unmount
  - TypeScript types for Window.Calendly object

### 2. `/src/components/CalendlyButton.tsx`
Reusable button component for triggering Calendly popup:
- **Purpose**: Single-responsibility component for booking interactions
- **Props**:
  - `url`: Calendly booking URL
  - `children`: Button text content
  - `className`: Optional additional CSS classes
  - `variant`: 'primary' or 'secondary' styling
- **Features**:
  - Integrates with project's existing button styles (`btn-elegant`, `elegant-underline`)
  - Type-safe with TypeScript interfaces
  - Follows component composition patterns

### 3. `/src/lib/constants.ts`
Centralized application constants:
- **Purpose**: Single source of truth for configuration values
- **Exports**:
  - `CALENDLY_URL`: The configured Calendly booking link
- **Benefits**: Easy to update, no magic values, DRY principle

## Files Modified

### 1. `/src/components/Header.tsx`
- Added "Book Consultation" button in the header (desktop only)
- Replaces the previous "Enquire" button with direct booking CTA
- Imports CalendlyButton component and CALENDLY_URL constant

### 2. `/src/components/HeroSection.tsx`
- Added "Schedule Your Consultation" button in hero section
- Animated entrance with GSAP (appears after headline and subtext)
- Provides immediate call-to-action for visitors

### 3. `/src/components/ContactSection.tsx`
- Added "Book a Consultation" button alongside form submission
- Uses secondary variant for visual hierarchy
- Gives users choice between form submission or direct booking

## Architecture Compliance

✅ **Modular Design**
- One component per file
- Functional components only
- Small, focused components (SRP)
- Reusable custom hook for shared logic

✅ **Type Safety**
- Full TypeScript implementation
- Proper interfaces for all props
- Type-safe Window object extension

✅ **Clean Code**
- No magic values (constants file)
- Proper component composition
- Co-located concerns (hook with component)
- Follows existing project patterns

✅ **Best Practices**
- Cleanup in useEffect
- Proper event handling
- Accessible button semantics
- Follows existing design system

## User Experience

The booking button appears in three strategic locations:

1. **Header** (Desktop): Always accessible for quick booking
2. **Hero Section**: Immediate first-impression CTA
3. **Contact Section**: Alternative to form submission

All buttons open the same Calendly popup widget with pre-configured settings:
- Event type details hidden
- GDPR banner hidden
- 30-minute consultation format

## Testing

To test the integration:
1. Run the development server: `npm run dev`
2. Navigate to the homepage
3. Click any "Book Consultation" or "Schedule" button
4. Calendly popup should appear with the booking interface

## Configuration

To change the Calendly URL or settings:
1. Update `CALENDLY_URL` in `/src/lib/constants.ts`
2. All instances will automatically use the new URL

## Future Enhancements

Possible improvements:
- Add loading state while Calendly scripts load
- Pre-fill form data if available
- Track booking conversions with analytics
- Add multiple booking types (different URLs)
- Customize Calendly widget theme to match site design
