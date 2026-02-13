import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const wellnessGoals = [
  {
    task: 'Feel comfortable expressing your emotions openly.',
    science: 'Emotional expression is a cornerstone of mental health, reducing stress and fostering authentic connections.',
  },
  {
    task: 'Navigate difficult conversations with confidence.',
    science: 'Communication skills are fundamental to healthy relationships and self-advocacy.',
  },
  {
    task: 'Recognize and manage anxiety or stress effectively.',
    science: 'Coping strategies empower you to face challenges without feeling overwhelmed.',
  },
  {
    task: 'Build and maintain meaningful relationships.',
    science: 'Social connection is one of the strongest predictors of long-term happiness and wellbeing.',
  },
  {
    task: 'Practice self-compassion during setbacks.',
    science: 'Self-compassion promotes resilience and reduces negative self-talk that can lead to depression.',
  },
  {
    task: 'Feel hopeful and motivated about your future.',
    science: 'A sense of purpose and optimism are protective factors against mental health challenges.',
  },
];

export const DecathlonSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!containerRef.current || !scrollerRef.current) return;

      const scrollerWidth = scrollerRef.current.scrollWidth;
      const containerWidth = containerRef.current.offsetWidth;
      const scrollDistance = scrollerWidth - containerWidth;

      gsap.to(scrollerRef.current, {
        x: -scrollDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: () => `+=${scrollDistance}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="decathlon"
      ref={sectionRef}
      className="min-h-screen bg-secondary overflow-hidden"
    >
      <div
        ref={containerRef}
        className="h-screen flex flex-col justify-center overflow-hidden"
      >
        {/* Header */}
        <div className="px-6 md:px-12 lg:px-24 mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light">
            Your Mental Wellness<br />Journey
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-lg">
            Goals to work toward together
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollerRef}
          className="horizontal-scroll-container pl-6 md:pl-12 lg:pl-24"
        >
          {wellnessGoals.map((item, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] mr-6 md:mr-8"
            >
              <div className="glass-card p-8 md:p-10 lg:p-12 h-full min-h-[300px] flex flex-col">
                <span className="font-heading text-6xl md:text-7xl text-accent/30 mb-4">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <h3 className="font-heading text-xl md:text-2xl lg:text-3xl font-light mb-6 flex-1">
                  {item.task}
                </h3>

                <div className="border-t border-accent/20 pt-6">
                  <p className="font-body text-sm text-muted-foreground italic">
                    Why it matters: {item.science}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Consultation CTA card — end of scroll */}
          <div className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] mr-6 md:mr-8 flex items-center justify-center">
            <div className="glass-card p-8 md:p-10 lg:p-12 min-h-[300px] flex flex-col items-center justify-center text-center border-2 border-accent/40">
              <p className="font-heading text-xl md:text-2xl lg:text-3xl font-light mb-6">
                Start your journey today.
              </p>
              <p className="font-body text-muted-foreground mb-8 max-w-sm">
                Connect with a professional and take the first step toward better mental wellness.
              </p>
              <Link
                to="/book-appointment"
                className="btn-elegant bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Book Your Free Consultation
              </Link>
            </div>
          </div>

          {/* Spacer at end */}
          <div className="flex-shrink-0 w-24" />
        </div>
      </div>
    </section>
  );
};

