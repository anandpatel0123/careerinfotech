import type { Ref } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { OFFICES, SITE, mailHref, telHref } from '../../data/site';
import { BrandLogo } from './BrandLogo';

/** Desktop-only brand strip. It scrolls away, leaving the sticky navigation bar. */
export function TopBar({ ref }: { ref: Ref<HTMLElement> }) {
  const [headOffice] = OFFICES;

  return (
    <header className="topbar" ref={ref}>
      <div className="container topbar__inner">
        <a className="topbar__brand" href="#home" aria-label={`${SITE.name} home`}>
          <BrandLogo loading="eager" />
          <span>
            <span className="topbar__name">
              Career <span>Info-Tech</span>
            </span>
            <span className="topbar__descriptor">{SITE.descriptor}</span>
          </span>
        </a>

        <ul className="topbar__contact">
          <li>
            <MapPin aria-hidden="true" size={18} />
            Patel Nagar, Suhagi, Jabalpur
          </li>
          <li>
            <Phone aria-hidden="true" size={18} />
            <a className="topbar__phone" href={telHref(headOffice.phone)}>
              {headOffice.phone}
            </a>
          </li>
          <li>
            <Mail aria-hidden="true" size={18} />
            <a href={mailHref}>{SITE.email}</a>
          </li>
        </ul>
      </div>
    </header>
  );
}
