import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import heroImage from '@/assets/hero-mountains.jpg';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

export const HeroSection = () => {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate headline letter by letter
      if (headlineRef.current) {
        const text = headlineRef.current.innerText;
        headlineRef.current.innerHTML = text
          .split('')
          .map((char) => `<span class="inline-block opacity-0">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');

        gsap.to(headlineRef.current.querySelectorAll('span'), {
          opacity: 1,
          duration: 0.05,
          stagger: 0.04,
          delay: 0.5,
          ease: 'power2.out',
        });
      }

      // Fade in subtext
      gsap.fromTo(
        subtextRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, delay: 2, ease: 'power2.out' }
      );

      // Fade in CTA button
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 2.5, ease: 'power2.out' }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Mountain range at golden hour"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/40 to-background/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-12 lg:px-24 max-w-5xl mx-auto">
        {/* Text backdrop for better readability */}
        <div className="absolute inset-0 -mx-6 md:-mx-12 bg-background/20 backdrop-blur-sm rounded-2xl" />
        
        <div className="relative">
          <h1
            ref={headlineRef}
            className="font-heading text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-light tracking-wide mb-8 leading-tight drop-shadow-lg"
            style={{ textShadow: '0 2px 20px rgba(0, 0, 0, 0.3), 0 0 40px rgba(0, 0, 0, 0.2)', paddingTop: '40px' }}
          >
            The Future of Your Health, Foreseen.
          </h1>
          <p
            ref={subtextRef}
            className="font-body text-lg md:text-xl lg:text-2xl font-light text-foreground/90 max-w-3xl mx-auto leading-relaxed opacity-0 drop-shadow-md"
            style={{ textShadow: '0 2px 15px rgba(0, 0, 0, 0.4), 0 0 30px rgba(0, 0, 0, 0.3)' }}
          >
            High-performance living, engineered for the long arc. We move beyond medicine 
            as a repair shop and into medicine as a strategic advantage.
          </p>
          <div ref={ctaRef} className="opacity-0" style={{ padding: '40px' }}>
            <CalendlyButton 
              url={CALENDLY_URL}
              variant="primary"
            >
              Schedule Your Consultation
            </CalendlyButton>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-subtle-float">
        <span className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground">
          Scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-foreground/40 to-transparent" />
      </div>
    </section>
  );
};
