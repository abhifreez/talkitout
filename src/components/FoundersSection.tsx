import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import azraImage from '@/assets/azra.jpeg';
import reshuImage from '@/assets/reshu.jpeg';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Azra Shamshad',
    credentials: 'Medical Director',
    description: 'Azra Shamshad brings extensive medical expertise and a forward-thinking approach to longevity medicine, combining clinical excellence with a deep understanding of preventive health optimization. Her medical background and specialization in evidence-based longevity strategies inform Forseen Health Care\'s commitment to science-backed protocols that move beyond traditional disease management. Azra\'s vision centers on empowering high-performing individuals to view their health as a strategic asset—one that requires the same precision, data-driven analysis, and long-term planning that defines executive decision-making.',
    image: azraImage,
  },
  {
    name: 'Reshu Jindal',
    credentials: 'Strategic Director',
    description: 'Reshu Jindal brings strategic vision and operational excellence to Forseen Health Care, translating the science of longevity into actionable, personalized protocols for executive clients. Her expertise in bridging medical science with strategic implementation ensures that every client receives a roadmap tailored to their unique biochemistry, lifestyle, and long-term goals. Jindal\'s approach emphasizes the intersection of cutting-edge diagnostics—from ApoB levels to full-genome sequencing and VO2 Max testing—with personalized intervention strategies and persistent counsel that evolves with both advancing science and changing life circumstances.',
    image: reshuImage,
  },
];

export const FoundersSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: headlineRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.founder-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x, y });
  };

  return (
    <section
      id="founders"
      ref={sectionRef}
      className="section-padding bg-secondary"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16 md:mb-24">
          <h2
            ref={headlineRef}
            className="font-heading text-3xl md:text-5xl lg:text-6xl font-light mb-6"
          >
            The Vision Behind Forseen
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            The expertise and leadership that drive our Medicine 3.0 philosophy
          </p>
        </div>

        {/* Founder Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 gap-12 md:gap-16 lg:gap-20"
        >
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="founder-card glass-card p-8 md:p-10 lg:p-12 flex flex-col group cursor-default"
              onMouseMove={handleMouseMove}
              style={{
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`,
              } as React.CSSProperties}
            >
              {/* Portrait Image */}
              <div className="mb-6 md:mb-8">
                <div className="relative w-full aspect-[3/4] max-w-[280px] mx-auto overflow-hidden rounded-sm">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Name */}
              <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-3 text-center">
                {founder.name}
              </h3>

              {/* Credentials */}
              <p className="font-body text-sm md:text-base uppercase tracking-[0.15em] text-muted-foreground text-center mb-6">
                {founder.credentials}
              </p>

              {/* Description */}
              <p className="font-body text-base md:text-lg font-light leading-relaxed text-muted-foreground text-center">
                {founder.description}
              </p>
            </div>
          ))}
        </div>

        {/* Consultation CTA */}
        <div className="mt-20 md:mt-28 text-center">
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-6">
            Meet the team behind your roadmap. Book a consultation to get started.
          </p>
          <CalendlyButton url={CALENDLY_URL} variant="primary">
            Book a Consultation
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
};
