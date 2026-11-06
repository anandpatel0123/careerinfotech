import { Award, BriefcaseBusiness, Layers, Target, TrendingUp, UsersRound, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';

const FEATURES: { title: string; text: string; icon: LucideIcon; color: string }[] = [
  {
    title: 'Job-Oriented Courses',
    text: 'Learn the programming, accounting, office and typing skills that workplaces use every day.',
    icon: Target,
    color: '#D81B2C',
  },
  {
    title: 'Expert Faculty',
    text: 'Trainers demonstrate each concept live, then guide you as you practise it yourself.',
    icon: UsersRound,
    color: '#1C5FD4',
  },
  {
    title: 'Practical Training',
    text: 'Assignments and mini-projects follow every major module, so you learn by doing.',
    icon: Layers,
    color: '#C98A00',
  },
  {
    title: 'Certificate Guidance',
    text: 'Get clear guidance on the assessment and certificate arrangements for your course.',
    icon: Award,
    color: '#15803D',
  },
  {
    title: 'Internship Support',
    text: 'Get help preparing for internships. Openings depend on each organisation and its rules.',
    icon: BriefcaseBusiness,
    color: '#C2410C',
  },
  {
    title: 'Better Career Growth',
    text: 'Build skills step by step, from computer basics to advanced applications and projects.',
    icon: TrendingUp,
    color: '#0F766E',
  },
];

export function WhyChooseUs() {
  return (
    <section className="section" aria-labelledby="why-title">
      <div className="container">
        <SectionHeading id="why-title" title="Why Choose Us?" eyebrow="Learn With Confidence" />
        <ul className="feature-grid">
          {FEATURES.map(({ title, text, icon: Icon, color }) => (
            <li key={title} className="feature-card reveal">
              <span className="feature-card__icon" style={{ color }}>
                <Icon aria-hidden="true" size={28} strokeWidth={1.9} />
              </span>
              <h3>{title}</h3>
              <p>{text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
