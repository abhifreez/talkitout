import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CalendlyButton } from './CalendlyButton';
import { CALENDLY_URL } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

const concerns = [
  'Cardiovascular Health',
  'Cognitive Longevity',
  'Cancer Prevention',
  'Metabolic Optimization',
  'Performance Enhancement',
  'General Longevity Strategy',
];

const sources = [
  'Professional Network',
  'Publication or Media',
  'Physician Referral',
  'Industry Event',
  'Other',
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    concern: '',
    source: '',
    name: '',
    email: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Thank you for your inquiry. We will be in touch shortly.');
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="section-padding bg-background"
    >
      <div className="max-w-2xl mx-auto">
        {/* Headline */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-light mb-6">
            Invest in Your Future Self.
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            Goreseen Healthcare operates on a private membership model. 
            We accept a limited cohort of clients to ensure the depth of 
            guidance your life demands.
          </p>
        </div>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Name */}
          <div>
            <label className="block font-body text-sm tracking-wide uppercase mb-3 text-muted-foreground">
              Your Name
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="Full name"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block font-body text-sm tracking-wide uppercase mb-3 text-muted-foreground">
              Email Address
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-lg focus:outline-none focus:border-accent transition-colors"
              placeholder="your@email.com"
            />
          </div>

          {/* Concern Dropdown */}
          <div>
            <label className="block font-body text-sm tracking-wide uppercase mb-3 text-muted-foreground">
              What is your primary longevity concern?
            </label>
            <select
              required
              value={formData.concern}
              onChange={(e) => setFormData({ ...formData, concern: e.target.value })}
              className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-lg focus:outline-none focus:border-accent transition-colors cursor-pointer appearance-none"
            >
              <option value="" disabled className="text-muted-foreground">
                Select a concern
              </option>
              {concerns.map((concern) => (
                <option key={concern} value={concern} className="bg-background text-foreground">
                  {concern}
                </option>
              ))}
            </select>
          </div>

          {/* Source Dropdown */}
          <div>
            <label className="block font-body text-sm tracking-wide uppercase mb-3 text-muted-foreground">
              How did you hear about us?
            </label>
            <select
              required
              value={formData.source}
              onChange={(e) => setFormData({ ...formData, source: e.target.value })}
              className="w-full bg-transparent border-b border-foreground/20 py-3 font-body text-lg focus:outline-none focus:border-accent transition-colors cursor-pointer appearance-none"
            >
              <option value="" disabled className="text-muted-foreground">
                Select a source
              </option>
              {sources.map((source) => (
                <option key={source} value={source} className="bg-background text-foreground">
                  {source}
                </option>
              ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="pt-8 flex flex-col md:flex-row gap-4">
            <button
              type="submit"
              className="btn-elegant w-full md:w-auto"
            >
              Request a Private Briefing
            </button>
            <CalendlyButton 
              url={CALENDLY_URL}
              variant="secondary"
              className="w-full md:w-auto"
            >
              Book a Consultation
            </CalendlyButton>
          </div>
        </form>
      </div>
    </section>
  );
};
