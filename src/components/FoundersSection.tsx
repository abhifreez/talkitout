import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import ceoImage from '@/assets/ceo-profile.jpeg';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const founders = [
  {
    name: 'Aman Agrawal',
    credentials: 'CEO & Co-founder',
    description: 'Aman Agrawal is the visionary CEO and Co-founder of TalkItOut, dedicated to revolutionizing mental health accessibility. With a strong background in technology and healthcare innovation, Aman leads the mission to break down barriers to mental wellness support. His commitment to creating affordable, professional psychological services stems from a deep belief that mental health care is a fundamental right, not a privilege. Under his leadership, TalkItOut combines cutting-edge technology with compassionate care to ensure everyone has access to the support they need.',
    image: ceoImage,
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
            Meet Our Founder
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            A visionary dedicated to making professional mental health support accessible to everyone.
          </p>
        </div>

        {/* Founder Card */}
        <div
          ref={cardsRef}
          className="flex justify-center"
        >
          {founders.map((founder, index) => (
            <div
              key={founder.name}
              className="founder-card glass-card p-8 md:p-10 lg:p-12 grid md:grid-cols-2 gap-8 md:gap-12 items-center group cursor-default max-w-5xl mx-auto"
              onMouseMove={handleMouseMove}
              style={{
                '--mouse-x': `${mousePos.x}%`,
                '--mouse-y': `${mousePos.y}%`,
              } as React.CSSProperties}
            >
              {/* Portrait Image */}
              <div className="w-full">
                <div className="relative w-full aspect-[3/4] max-w-[320px] mx-auto md:mx-0 overflow-hidden rounded-sm">
                  <img
                    src={founder.image}
                    alt={founder.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
              </div>

              {/* Text Content */}
              <div className="text-center md:text-left">
                {/* Name */}
                <h3 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light tracking-wide mb-3">
                  {founder.name}
                </h3>

                {/* Credentials */}
                <p className="font-body text-sm md:text-base uppercase tracking-[0.15em] text-muted-foreground mb-6">
                  {founder.credentials}
                </p>

                {/* Description */}
                <p className="font-body text-base md:text-lg font-light leading-relaxed text-muted-foreground">
                  {founder.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
