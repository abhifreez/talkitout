import { CONTACT_PHONE, HEAD_OFFICE, CALENDLY_URL } from '@/lib/constants';
import { CalendlyButton } from './CalendlyButton';

export const Footer = () => {
  const telHref = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`;

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <span className="font-heading text-lg tracking-[0.2em]">
              FORSEEN HEALTH CARE
            </span>
            <span className="hidden md:inline mx-4 text-muted-foreground">|</span>
            <span className="block md:inline font-body text-sm text-muted-foreground mt-1 md:mt-0">
              Private Longevity Advisory
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <CalendlyButton url={CALENDLY_URL} variant="primary" className="!text-sm">
              Book a Consultation
            </CalendlyButton>
            <span className="font-body text-sm text-muted-foreground hidden sm:inline">
              Science-Backed. Executive-Minded.
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 py-6 border-t border-border font-body text-sm text-muted-foreground">
          <a
            href={telHref}
            className="hover:text-foreground transition-colors"
          >
            {CONTACT_PHONE}
          </a>
          <span className="hidden sm:inline text-border">|</span>
          <span>{HEAD_OFFICE}</span>
          <span className="hidden sm:inline text-border">|</span>
          <CalendlyButton url={CALENDLY_URL} variant="secondary" className="!text-sm">
            Book a Consultation
          </CalendlyButton>
        </div>

        <div className="text-center border-t border-border pt-8">
          <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            © 2026 Forseen Health Care. All rights reserved. Forseen Health Care does not provide emergency 
            medical services. We are your strategic health partners, focused on prevention, 
            optimization, and longevity.
          </p>
        </div>
      </div>
    </footer>
  );
};
