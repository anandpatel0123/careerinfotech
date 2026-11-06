import { ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import { OFFICES, SITE, mailHref, telHref } from '../../data/site';
import { QUICK_CHAT_URL } from '../../lib/whatsapp';
import { EnquireButton } from '../ui/EnquireButton';
import { SectionHeading } from '../ui/SectionHeading';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

export function Contact() {
  return (
    <section id="contact" className="section contact" aria-labelledby="contact-title">
      <div className="container">
        <SectionHeading id="contact-title" title="Contact Us" eyebrow="Visit or Message Us">
          Ask about course details, fees, duration and batch timings at either of our Jabalpur centres.
        </SectionHeading>

        <div className="contact__grid">
          {OFFICES.map((office) => (
            <article key={office.id} className="office-card reveal">
              <h3>{office.label}</h3>
              <p className="office-card__line">
                <MapPin aria-hidden="true" size={20} />
                <span>{office.address}</span>
              </p>
              <p className="office-card__line">
                <Phone aria-hidden="true" size={20} />
                <a href={telHref(office.phone)}>{office.phone}</a>
              </p>
              <a className="btn btn--outline" href={office.mapsUrl} target="_blank" rel="noopener">
                <ExternalLink aria-hidden="true" size={17} />
                Open in Google Maps
              </a>
            </article>
          ))}

          <article className="contact-panel reveal">
            <h3>Enquire directly</h3>
            <p>The quickest way to reach us is on WhatsApp.</p>
            <a className="btn btn--whatsapp btn--block" href={QUICK_CHAT_URL} target="_blank" rel="noopener">
              <WhatsAppIcon size={20} />
              WhatsApp {SITE.whatsappDisplay}
            </a>
            <EnquireButton variant="yellow" className="btn--block" />
            <a className="contact-panel__email" href={mailHref}>
              <Mail aria-hidden="true" size={18} />
              {SITE.email}
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
