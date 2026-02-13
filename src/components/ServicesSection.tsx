import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, Shield } from 'lucide-react';
import { Button } from './ui/button';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: MessageCircle,
    title: 'Free Consultations',
    description: 'Connect with licensed psychology professionals at no cost. We believe mental health support should be accessible to everyone.',
  },
  {
    icon: Heart,
    title: 'Compassionate Care',
    description: 'Our experienced psychologists provide a safe, non-judgmental space where you can openly discuss your concerns and feelings.',
  },
  {
    icon: Shield,
    title: 'Confidential & Secure',
    description: 'Your privacy is our priority. All consultations are completely confidential and conducted in a secure environment.',
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
            Professional Support, Freely Available.
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
            Ready to take the first step toward better mental wellness? Connect with a professional today.
          </p>
          <Link to="/book-appointment">
            <Button size="lg" className="text-lg px-8 py-6">
              Schedule Your Free Consultation
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
