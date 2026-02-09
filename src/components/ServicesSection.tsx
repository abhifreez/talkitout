import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Microscope, Map, Users } from 'lucide-react';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Microscope,
    title: 'Deep Diagnostics',
    description: 'We look where others don\'t. From your ApoB levels to full-genome sequencing and VO2 Max testing.',
  },
  {
    icon: Map,
    title: 'The Roadmap',
    description: 'Data is useless without a plan. We design your tactical nutrition, exercise biochemistry, and pharmacotherapy protocols.',
  },
  {
    icon: Users,
    title: 'Persistent Counsel',
    description: 'Ongoing guidance for the high-level executive. We adjust your strategy as the science—and your life—evolves.',
  },
];

export const ServicesSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
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
      id="services"
      ref={sectionRef}
      className="section-padding"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-16 md:mb-24">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light mb-6">
            Your Personal Health Architect.
          </h2>
        </div>

        {/* Service Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-3 gap-6 md:gap-8"
        >
          {services.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="service-card glass-card p-8 md:p-10 lg:p-12 min-h-[400px] flex flex-col group cursor-default"
              onMouseMove={handleMouseMove}
              style={{
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`,
              } as React.CSSProperties}
            >
              <div className="w-14 h-14 rounded-full border border-accent/30 flex items-center justify-center mb-8 group-hover:border-accent group-hover:bg-accent/5 transition-all duration-500">
                <Icon className="w-7 h-7 text-accent" strokeWidth={1} />
              </div>
              
              <h3 className="font-heading text-2xl md:text-3xl font-light mb-4 group-hover:text-accent transition-colors duration-500">
                {title}
              </h3>
              
              <p className="font-body text-muted-foreground leading-relaxed mt-auto">
                {description}
              </p>
            </div>
          ))}
        </div>

        {/* Consultation CTA */}
        <div className="mt-16 md:mt-24 text-center">
          <p className="font-body text-lg md:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ready to build your personal health roadmap? Speak with our team.
          </p>
          <CalendlyButton url={CALENDLY_URL} variant="primary">
            Book a Consultation
          </CalendlyButton>
        </div>
      </div>
    </section>
  );
};
