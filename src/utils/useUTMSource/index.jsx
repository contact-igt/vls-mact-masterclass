import { useEffect } from 'react';

const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'];
const fallbackUtm = {
  utm_source: 'direct',
  utm_medium: 'none',
  utm_campaign: 'none',
  utm_term: 'none',
  utm_content: 'none',
};

export default function useUTMSource() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const utmValues = { ...fallbackUtm };
    const referrer = document.referrer;
    const hasReferrer = referrer && !referrer.includes('localhost') && !referrer.includes('127.0.0.1');

    if (hasReferrer) {
      utmValues.utm_source = referrer;
      utmValues.utm_medium = 'referral';
    }

    utmKeys.forEach((key) => {
      const value = params.get(key);

      if (value) {
        utmValues[key] = value;
      }
    });

    utmKeys.forEach((key) => {
      window.localStorage.setItem(key, utmValues[key]);
    });
  }, []);
}