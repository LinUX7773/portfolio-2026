// Norwegian (bokmål) is the default language and lives at the site root;
// the other languages live under their own prefix (/en, /ko). Every page
// exists in every language with the same slug, so switching language
// keeps the reader on the same page.

export const languages = ['nb', 'en', 'ko'] as const;
export type Lang = (typeof languages)[number];
export const defaultLang: Lang = 'nb';

/** Each language's own name, shown in the language switch. */
export const languageNames: Record<Lang, string> = {
  nb: 'Norsk',
  en: 'English',
  ko: '한국어',
};

const prefixed = languages.filter((lang) => lang !== defaultLang);
const prefixPattern = new RegExp(`^/(${prefixed.join('|')})(?=/|$)`);

export function getLang(url: URL): Lang {
  const match = url.pathname.match(prefixPattern);
  return match ? (match[1] as Lang) : defaultLang;
}

/** The path without its language prefix: "/en/about" → "/about". */
export function stripLang(pathname: string): string {
  const path = pathname.replace(prefixPattern, '').replace(/\/$/, '');
  return path || '/';
}

/** A root-relative path in the given language: ("en", "/about") → "/en/about". */
export function localePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return path === '/' ? `/${lang}` : `/${lang}${path}`;
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
  ko: {
    role: '시니어 UX 디자이너 / 프로덕트 오너',
    siteDescription: '시니어 UX 디자이너이자 프로덕트 오너인 Lin Bele Jacobsen의 포트폴리오입니다.',
    skipLink: '본문으로 건너뛰기',
    home: '홈',
    menu: '메뉴',
    close: '닫기',
    primaryNav: '주 메뉴',
    footerNav: '하단 메뉴',
    language: '언어',
    contact: '연락처',
    footerNote: '시니어 UX 디자이너 / 프로덕트 오너. 노르웨이 거주.',
    nav: {
      projects: '프로젝트',
      brands: '고객사와 산업',
      about: '소개',
      mentoring: '멘토링',
      resume: '이력서',
    },
    readCaseStudy: '프로젝트 자세히 보기',
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
