import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

const concerns = [
  'Anxiety or Stress',
  'Depression or Low Mood',
  'Relationship Issues',
  'Life Transitions',
  'Work-Life Balance',
  'Self-Esteem',
  'Grief or Loss',
  'General Mental Wellness',
  'Other',
];

const sources = [
  'Search Engine',
  'Social Media',
  'Friend or Family',
  'Healthcare Provider',
  'Online Community',
  'Other',
];

export const ContactSection = () => {
  const sectionRef = useRef<HTMLElement>(null);


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
            Take the First Step.
          </h2>
          <p className="font-body text-muted-foreground text-lg leading-relaxed">
            Connect with a professional psychologist who can help.
            All consultations are completely free and confidential.
            You don't have to face challenges alone.
          </p>
        </div>

        {/* Call to Action Button */}
        <div className="flex justify-center mt-12">
          <Link
            to="/book-appointment"
            className="btn-elegant w-full md:w-auto text-center px-12 py-4 text-lg hover:border-accent hover:text-accent transition-all duration-500"
          >
            Book Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
};

