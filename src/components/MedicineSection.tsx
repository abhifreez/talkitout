import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Lightbulb, Shield, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const benefits = [
  { icon: Users, label: 'Community Support', description: 'You\'re Not Alone' },
  { icon: Lightbulb, label: 'Professional Guidance', description: 'Expert Care' },
  { icon: Shield, label: 'Safe Space', description: 'Confidential' },
  { icon: Heart, label: 'Compassionate', description: 'Non-Judgmental' },
];

export const MedicineSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const comparisonRef = useRef<HTMLDivElement>(null);
  const horsemenRef = useRef<HTMLDivElement>(null);

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

      // Comparison animation
      const comparisonItems = comparisonRef.current?.querySelectorAll('.comparison-item');
      if (comparisonItems) {
        gsap.fromTo(
          comparisonItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            scrollTrigger: {
              trigger: comparisonRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // Horsemen animation
      const horsemenItems = horsemenRef.current?.querySelectorAll('.horseman-item');
      if (horsemenItems) {
        gsap.fromTo(
          horsemenItems,
          { opacity: 0, scale: 0.8 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.6,
            stagger: 0.15,
            scrollTrigger: {
              trigger: horsemenRef.current,
              start: 'top 70%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-padding bg-secondary"
    >
      <div className="max-w-6xl mx-auto">
        {/* Headline */}
        <h2
          ref={headlineRef}
          className="font-heading text-3xl md:text-5xl lg:text-6xl font-light text-center mb-16 md:mb-24"
        >
          Mental Health Support<br />Should Be Accessible.
        </h2>

        {/* Story */}
        <p className="font-body text-lg md:text-xl text-center text-muted-foreground max-w-3xl mx-auto mb-16">
          We believe that everyone deserves access to professional psychological support, 
          regardless of financial circumstances. Mental wellness is a fundamental right, not a luxury.
        </p>

        {/* Interactive Comparison */}
        <div
          ref={comparisonRef}
          className="grid md:grid-cols-2 gap-8 md:gap-16 mb-24 md:mb-32"
        >
          {/* Traditional Barriers */}
          <div className="comparison-item text-center md:text-right p-8 md:p-12">
            <h3 className="font-heading text-2xl md:text-3xl mb-6 medicine-old">
              Traditional Barriers
            </h3>
            <ul className="space-y-4 font-body text-lg medicine-old">
              <li>High costs</li>
              <li>Limited availability</li>
              <li>Social stigma</li>
            </ul>
          </div>

          {/* TalkItOut Approach */}
          <div className="comparison-item text-center md:text-left p-8 md:p-12 border-l-0 md:border-l border-accent/30">
            <h3 className="font-heading text-2xl md:text-3xl mb-6 text-accent">
              TalkItOut Approach
            </h3>
            <ul className="space-y-4 font-body text-lg">
              <li>Completely free</li>
              <li>Easy to book</li>
              <li>Safe and confidential</li>
            </ul>
          </div>
        </div>

        {/* Core Values */}
        <div className="text-center mb-12">
          <h3 className="font-heading text-2xl md:text-3xl font-light mb-4">
            Why Choose TalkItOut
          </h3>
          <p className="font-body text-muted-foreground">
            Professional support designed with you in mind
          </p>
        </div>

        <div
          ref={horsemenRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
        >
          {benefits.map(({ icon: Icon, label, description }) => (
            <div
              key={label}
              className="horseman-item flex flex-col items-center text-center p-6 md:p-8 glass-card group"
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border border-accent/30 flex items-center justify-center mb-4 group-hover:border-accent transition-colors duration-500">
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-accent" strokeWidth={1} />
              </div>
              <h4 className="font-heading text-lg md:text-xl mb-1">{label}</h4>
              <p className="font-body text-sm text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
