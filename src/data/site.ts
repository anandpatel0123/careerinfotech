export interface Office {
  id: 'head' | 'branch';
  label: string;
  address: string;
  phone: string;
  mapsUrl: string;
}

const mapsSearch = (query: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

export const SITE = {
  name: 'Career Info-Tech',
  tagline: 'Learn Today, Build Your Tomorrow',
  descriptor: 'Computer Training & Professional Courses',
  email: 'careerinfotech80@gmail.com',
  whatsappDisplay: '7089189169',
  whatsappNumber: '917089189169',
  /** Relative on purpose, so the link survives deployment to any domain or sub-folder. */
  syllabusPdf: 'syllabus/Career_Info_Tech_Complete_Course_Syllabus.pdf',
  syllabusFileName: 'Career_Info_Tech_Complete_Course_Syllabus.pdf',
} as const;

export const OFFICES: Office[] = [
  {
    id: 'head',
    label: 'Head Office',
    address: 'Patel Nagar, Suhagi, Jabalpur, Madhya Pradesh',
    phone: '7089189169',
    mapsUrl: mapsSearch('Patel Nagar, Suhagi, Jabalpur, Madhya Pradesh'),
  },
  {
    id: 'branch',
    label: 'Branch Office',
    address: 'Ram Nagar, Adhartal, Near Surahi Building, Jabalpur',
    phone: '7777883728',
    mapsUrl: mapsSearch('Surahi Building, Ram Nagar, Adhartal, Jabalpur, Madhya Pradesh'),
  },
];

export const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'courses', label: 'Courses' },
  { id: 'course-contents', label: 'Course Contents' },
  { id: 'about', label: 'About Us' },
  { id: 'contact', label: 'Contact Us' },
] as const;

export type NavSectionId = (typeof NAV_LINKS)[number]['id'];

export const telHref = (phone: string) => `tel:+91${phone}`;
export const mailHref = `mailto:${SITE.email}`;
