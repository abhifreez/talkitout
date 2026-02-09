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
    name: 'Dr. Azra Shamshad',
    credentials: 'Clinical Psychologist, PhD',
    description: 'Dr. Azra Shamshad brings extensive expertise in clinical psychology with a focus on accessible mental health care. Her approach combines evidence-based therapeutic techniques with compassionate, client-centered care. With years of experience in helping individuals navigate anxiety, depression, and life transitions, Dr. Shamshad believes that quality mental health support should be available to everyone, regardless of their financial circumstances. Her warm, non-judgmental approach creates a safe space where clients feel heard and supported on their journey to wellness.',
    image: azraImage,
  },
  {
    name: 'Dr. Reshu Jindal',
    credentials: 'Licensed Psychologist, PsyD',
    description: 'Dr. Reshu Jindal specializes in cognitive-behavioral therapy and mindfulness-based approaches to mental wellness. Her expertise spans stress management, relationship counseling, and personal development. Dr. Jindal is passionate about breaking down barriers to mental health care and making professional psychological support accessible to all. She believes that everyone deserves a safe space to explore their thoughts and feelings, and her mission with TalkItOut is to provide compassionate, professional guidance to anyone who needs someone to talk to.',
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
            Meet Our Team
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Licensed professionals dedicated to making mental health support accessible
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
            Ready to start your mental wellness journey? Connect with our team today.
          </p>
          <CalendlyButton url={CALENDLY_URL} variant="primary">
            Book Your Free Consultation
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
};
