// Norwegian (bokmål) is the default language and lives at the site root;
// English lives under /en. Every page exists in both languages with the
// same slug, so switching language keeps the reader on the same page.

export const languages = ['nb', 'en'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'nb';

export function getLang(url: URL): Lang {
  return url.pathname === '/en' || url.pathname.startsWith('/en/') ? 'en' : 'nb';
}

/** The path without its language prefix: "/en/about" → "/about". */
export function stripLang(pathname: string): string {
  const path = pathname.replace(/^\/en(?=\/|$)/, '').replace(/\/$/, '');
  return path || '/';
}

/** A root-relative path in the given language: ("en", "/about") → "/en/about". */
export function localePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return path === '/' ? '/en' : `/en${path}`;
}

export const ui = {
  nb: {
    role: 'Senior UX-designer / Product Owner',
    siteDescription: 'Portefølje for Lin Bele Jacobsen, senior UX-designer og Product Owner.',
    skipLink: 'Hopp til innholdet',
    home: 'forsiden',
    menu: 'Meny',
    close: 'Lukk',
    primaryNav: 'Hovedmeny',
    footerNav: 'Bunnmeny',
    language: 'Språk',
    contact: 'Kontakt',
    footerNote: 'Senior UX-designer / Product Owner. Bor i Norge.',
    nav: {
      projects: 'Prosjekter',
      brands: 'Kunder og bransjer',
      about: 'Om meg',
      mentoring: 'Mentoring',
      resume: 'CV',
    },
    readCaseStudy: 'Les om prosjektet',
  },
  en: {
    role: 'Senior UX Designer / Product Owner',
    siteDescription: 'Portfolio of Lin Bele Jacobsen, senior UX designer and product owner.',
    skipLink: 'Skip to content',
    home: 'home',
    menu: 'Menu',
    close: 'Close',
    primaryNav: 'Primary',
    footerNav: 'Footer',
    language: 'Language',
    contact: 'Contact',
    footerNote: 'Senior UX Designer / Product Owner. Based in Norway.',
    nav: {
      projects: 'Projects',
      brands: 'Brands & Industries',
      about: 'About',
      mentoring: 'Mentoring',
      resume: 'Resume',
    },
    readCaseStudy: 'Read case study',
  },
} as const;

export function t(lang: Lang) {
  return ui[lang];
}

export function navItems(lang: Lang) {
  const labels = ui[lang].nav;
  return [
    { href: localePath(lang, '/projects'), label: labels.projects },
    { href: localePath(lang, '/brands'), label: labels.brands },
    { href: localePath(lang, '/about'), label: labels.about },
    { href: localePath(lang, '/mentoring'), label: labels.mentoring },
    { href: localePath(lang, '/resume'), label: labels.resume },
  ];
}
