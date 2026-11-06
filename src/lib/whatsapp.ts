import { SITE } from '../data/site';

export interface EnquiryDetails {
  name: string;
  mobile: string;
  course: string;
  mode: string;
  message: string;
}

export function buildEnquiryMessage({ name, mobile, course, mode, message }: EnquiryDetails) {
  const lines = [
    'Hello Career Info-Tech!',
    '',
    'I would like to enquire about your computer training courses.',
    '',
    'Student Details:',
    `Name: ${name}`,
    `Mobile: ${mobile}`,
    `Interested Course: ${course}`,
    `Learning Mode: ${mode}`,
  ];

  if (message) {
    lines.push('', 'Message:', message);
  }

  lines.push('', 'Please share the course details, fees, duration and batch timings.', '', 'Thank you!');

  return lines.join('\n');
}

export const whatsappUrl = (text: string) =>
  `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;

/** Used by the general "chat with us" links, where no form has been filled in. */
export const QUICK_CHAT_URL = whatsappUrl(
  'Hello Career Info-Tech! I would like to know more about your computer training courses.',
);

/**
 * Opens WhatsApp in a new tab so the visitor keeps the site, and the reminder to
 * press Send. If a popup blocker refuses, the current tab goes to WhatsApp instead.
 */
export function openWhatsApp(url: string) {
  const opened = window.open(url, '_blank');

  if (opened) {
    opened.opener = null;
  } else {
    window.location.assign(url);
  }
}
