import { Mail, MapPin, Phone } from 'lucide-react';
import { useModals } from '../../context/ModalContext';
import { findCourse, type Course } from '../../data/courses';
import { NAV_LINKS, OFFICES, SITE, mailHref, telHref } from '../../data/site';
import { QUICK_CHAT_URL } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';
import { BrandLogo } from './BrandLogo';

const POPULAR_COURSES = ['dca', 'pgdca', 'tally', 'cpct', 'c-cpp', 'typing']
  .map(findCourse)
  .filter((course): course is Course => Boolean(course));

export function Footer() {
  const { openCourse } = useModals();

  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__about">
          <div className="footer__brand">
            <span className="logo-badge">
              <BrandLogo />
            </span>
            <div>
              <p className="footer__name">{SITE.name}</p>
              <p className="footer__tagline">{SITE.tagline}</p>
            </div>
          </div>
          <p>{SITE.descriptor} in Jabalpur, Madhya Pradesh.</p>
          <a className="footer__whatsapp" href={QUICK_CHAT_URL} target="_blank" rel="noopener">
            <WhatsAppIcon size={20} />
            Chat on WhatsApp
          </a>
        </div>

        <nav aria-label="Footer">
          <h2 className="footer__title">Quick Links</h2>
          <ul className="footer__list">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__title">Popular Courses</h2>
          <ul className="footer__list">
            {POPULAR_COURSES.map((course) => (
              <li key={course.id}>
                <button type="button" onClick={() => openCourse(course.id)}>
                  {course.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="footer__title">Contact</h2>
          <ul className="footer__contact">
            {OFFICES.map((office) => (
              <li key={office.id}>
                <MapPin aria-hidden="true" size={18} />
                <span>
                  <strong>{office.label}:</strong> {office.address}
                  <br />
                  <a href={telHref(office.phone)}>
                    <Phone aria-hidden="true" size={14} /> {office.phone}
                  </a>
                </span>
              </li>
            ))}
            <li>
              <Mail aria-hidden="true" size={18} />
              <a href={mailHref}>{SITE.email}</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container footer__legal">
        <p>
          Course duration, fees, batch timings, eligibility and assessment or certificate arrangements
          should be confirmed directly with Career Info-Tech. Any external examination, government
          service, certificate, job or internship is subject to the relevant organisation's rules and
          availability. Do not share passwords, OTPs or sensitive documents with unauthorised persons.
        </p>
        <p suppressHydrationWarning>
          © {new Date().getFullYear()} {SITE.name}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
