import {
  Cpu,
  FileText,
  Globe,
  ImageIcon,
  Landmark,
  Laptop,
  Presentation,
  TableProperties,
  type LucideIcon,
} from 'lucide-react';
import { useModals } from '../../context/ModalContext';
import { SectionHeading } from '../ui/SectionHeading';

interface Skill {
  title: string;
  detail: string;
  icon: LucideIcon;
  color: string;
  /** The course whose details open when this tile is chosen. */
  courseId: string;
}

const SKILLS: Skill[] = [
  { title: 'MS Word, Excel & PowerPoint', detail: 'Letters, spreadsheets and presentations', icon: Presentation, color: '#C2410C', courseId: 'ms-office' },
  { title: 'Internet & Email', detail: 'Browsing, email and online safety', icon: Globe, color: '#1C5FD4', courseId: 'internet-email' },
  { title: 'Digital Skills', detail: 'Everyday online tasks, done carefully', icon: Laptop, color: '#0E2A66', courseId: 'online-work' },
  { title: 'Online Government Services', detail: 'Forms, uploads and official portals', icon: Landmark, color: '#0F766E', courseId: 'online-work' },
  { title: 'Data Entry', detail: 'Accurate records and spreadsheets', icon: TableProperties, color: '#3F51C8', courseId: 'data-entry' },
  { title: 'PDF & Document Handling', detail: 'Create, combine and convert PDFs', icon: FileText, color: '#D81B2C', courseId: 'pdf-image' },
  { title: 'Image Editing', detail: 'Resize, crop and compress for uploads', icon: ImageIcon, color: '#A21CAF', courseId: 'pdf-image' },
  { title: 'Computer Fundamentals', detail: 'Hardware, software and Windows basics', icon: Cpu, color: '#15803D', courseId: 'dca' },
];

export function AdditionalSkills() {
  const { openCourse } = useModals();

  return (
    <section className="section section--tight" aria-labelledby="skills-title">
      <div className="container">
        <div className="skills-panel">
          <SectionHeading id="skills-title" title="Other Skill Modules We Also Cover" eyebrow="Additional Skills" />
          <ul className="skills-grid">
            {SKILLS.map(({ title, detail, icon: Icon, color, courseId }) => (
              <li key={title}>
                <button type="button" className="skill-tile" onClick={() => openCourse(courseId)}>
                  <span className="skill-tile__icon" style={{ color }}>
                    <Icon aria-hidden="true" size={28} strokeWidth={1.75} />
                  </span>
                  <span className="skill-tile__title">{title}</span>
                  <span className="skill-tile__detail">{detail}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
