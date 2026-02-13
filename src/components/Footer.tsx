import { CONTACT_PHONE, HEAD_OFFICE } from '@/lib/constants';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const telHref = `tel:${CONTACT_PHONE.replace(/\s/g, '')}`;

  return (
    <footer className="py-12 px-6 md:px-12 lg:px-24 border-t border-border">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
          <div className="text-center md:text-left">
            <span className="font-heading text-lg tracking-[0.2em]">
              TalkItOut
            </span>
            <span className="hidden md:inline mx-4 text-muted-foreground">|</span>
            <span className="block md:inline font-body text-sm text-muted-foreground mt-1 md:mt-0">
              Free Psychology Consultations
            </span>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <Link
              to="/book-appointment"
              className="bg-primary text-primary-foreground text-sm px-6 py-2.5 rounded-sm hover:opacity-90 transition-all uppercase tracking-widest font-light"
            >
              Book Free Consultation
            </Link>
            <span className="font-body text-sm text-muted-foreground hidden sm:inline">
              Professional. Confidential. Free.
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
          <Link
            to="/book-appointment"
            className="hover:text-foreground transition-colors"
          >
            Book Free Consultation
          </Link>
        </div>

        <div className="text-center border-t border-border pt-8">
          <p className="font-body text-xs text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            © 2026 TalkItOut. All rights reserved. TalkItOut provides professional psychology consultations
            for informational and support purposes. For mental health emergencies, please contact your local
            emergency services or crisis hotline immediately.
          </p>
        </div>
      </div>
    </footer>
  );
};

