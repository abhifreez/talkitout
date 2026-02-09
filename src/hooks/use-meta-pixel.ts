import { useEffect } from 'react';
import { META_PIXEL_ID } from '@/lib/constants';

const FB_EVENTS_URL = 'https://connect.facebook.net/en_US/fbevents.js';

declare global {
  interface Window {
    fbq?: MetaPixelFbq;
    _fbq?: MetaPixelFbq;
  }
}

type MetaPixelFbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue?: unknown[];
  push?: MetaPixelFbq;
  loaded?: boolean;
  version?: string;
};

export const useMetaPixel = () => {
  useEffect(() => {
    if (typeof window === 'undefined' || window.fbq) return;

    const f = window;
    const b = document;
    const e = 'script';
    const v = FB_EVENTS_URL;

    const n: MetaPixelFbq = function (...args: unknown[]) {
      if (n.callMethod) {
        n.callMethod.apply(n, args);
      } else {
        (n.queue ??= []).push(args);
      }
    } as MetaPixelFbq;

    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    f.fbq = n;

    const t = b.createElement(e);
    t.async = true;
    t.src = v;
    const scripts = b.getElementsByTagName(e);
    const s = scripts[0];
    if (s?.parentNode) {
      s.parentNode.insertBefore(t, s);
    } else {
      b.head.appendChild(t);
    }

    n('init', META_PIXEL_ID);
    n('track', 'PageView');
  }, []);
};
