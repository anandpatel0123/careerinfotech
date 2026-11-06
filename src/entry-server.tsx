import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { App } from './App';
import { COURSES } from './data/courses';
import { OFFICES, SITE } from './data/site';

export const render = () =>
  renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  );

/** schema.org data for search engines, built from the same details shown on the page. */
export function structuredData(siteUrl?: string) {
  const [headOffice, branchOffice] = OFFICES;

  return {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: SITE.name,
    slogan: SITE.tagline,
    description: `${SITE.descriptor} in Jabalpur, Madhya Pradesh.`,
    email: SITE.email,
    telephone: `+91${headOffice.phone}`,
    ...(siteUrl ? { url: `${siteUrl}/`, logo: `${siteUrl}/images/logo.png` } : {}),
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Patel Nagar, Suhagi',
      addressLocality: 'Jabalpur',
      addressRegion: 'Madhya Pradesh',
      addressCountry: 'IN',
    },
    department: {
      '@type': 'EducationalOrganization',
      name: `${SITE.name} ${branchOffice.label}`,
      telephone: `+91${branchOffice.phone}`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Ram Nagar, Adhartal, Near Surahi Building',
        addressLocality: 'Jabalpur',
        addressRegion: 'Madhya Pradesh',
        addressCountry: 'IN',
      },
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Computer training courses',
      itemListElement: COURSES.map((course) => ({
        '@type': 'Course',
        name: course.title,
        description: course.overview,
        provider: { '@type': 'EducationalOrganization', name: SITE.name },
      })),
    },
  };
}
