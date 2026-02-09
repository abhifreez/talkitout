import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const decathlonTasks = [
  {
    task: 'Lifting a 20kg suitcase into an overhead bin.',
    science: 'Requires a 10-year strength reserve of 40%. We begin building that reserve today.',
  },
  {
    task: 'Getting up off the floor using only one limb for support.',
    science: 'Tests lower body strength and balance—key predictors of fall risk after 70.',
  },
  {
    task: 'A 30-minute brisk walk uphill without breathlessness.',
    science: 'Indicates cardiovascular health equivalent to someone 15 years younger.',
  },
  {
    task: 'Carrying two bags of groceries up a flight of stairs.',
    science: 'Functional strength that maintains independence and quality of life.',
  },
  {
    task: 'Playing actively with grandchildren for an hour.',
    science: 'Requires sustained energy, mobility, and joint health we protect now.',
  },
  {
    task: 'Hiking 5 miles on varied terrain.',
    science: 'Tests endurance, proprioception, and musculoskeletal integrity.',
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
            What do you want to be<br />able to do at 95?
          </h2>
          <p className="font-body text-muted-foreground mt-4 text-lg">
            The Centenarian Decathlon
          </p>
        </div>

        {/* Horizontal Scroll Container */}
        <div
          ref={scrollerRef}
          className="horizontal-scroll-container pl-6 md:pl-12 lg:pl-24"
        >
          {decathlonTasks.map((item, index) => (
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
                    Science Note: {item.science}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* Consultation CTA card — end of scroll */}
          <div className="flex-shrink-0 w-[80vw] md:w-[50vw] lg:w-[40vw] mr-6 md:mr-8 flex items-center justify-center">
            <div className="glass-card p-8 md:p-10 lg:p-12 min-h-[300px] flex flex-col items-center justify-center text-center border-2 border-accent/40">
              <p className="font-heading text-xl md:text-2xl lg:text-3xl font-light mb-6">
                Start preparing today.
              </p>
              <p className="font-body text-muted-foreground mb-8 max-w-sm">
                Book a consultation and build your Centenarian Decathlon plan.
              </p>
              <CalendlyButton url={CALENDLY_URL} variant="primary">
                Book a Consultation
              </CalendlyButton>
            </div>
          </div>
          
          {/* Spacer at end */}
          <div className="flex-shrink-0 w-24" />
        </div>
      </div>
    </section>
  );
};
