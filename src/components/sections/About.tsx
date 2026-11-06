import { COURSES, CATEGORIES } from '../../data/courses';
import { OFFICES } from '../../data/site';

const TRAINING_STEPS = [
  { title: 'Concepts', text: 'Start from your current skill level' },
  { title: 'Live demonstrations', text: 'See each topic worked through' },
  { title: 'Guided practice', text: 'Try it yourself with support' },
  { title: 'Assignments', text: 'Short tasks after every major module' },
  { title: 'Mini-projects', text: 'Apply what you have learned' },
  { title: 'Revision', text: 'Review mistakes and revisit topics' },
];

const FACTS = [
  { value: COURSES.length, label: 'Courses & skill modules' },
  { value: CATEGORIES.length, label: 'Learning categories' },
  { value: OFFICES.length, label: 'Centres in Jabalpur' },
];

export function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="container about__grid">
        <div className="about__copy reveal">
          <p className="eyebrow">About Us</p>
          <h2 id="about-title">Practical computer education in Jabalpur</h2>
          <p>
            Career Info-Tech is a computer training and professional skills institute in Jabalpur, Madhya
            Pradesh. We teach the skills people use at school, at college and at work, with a focus on
            practice over theory.
          </p>
          <p>
            Our computer classes in Jabalpur cover programming in C, C++ and Java, SQL databases, web
            design, DCA and PGDCA, accounting with Tally Prime and ERP, English and Hindi typing, CPCT
            preparation, and everyday digital services.
          </p>

          <dl className="about__facts">
            {FACTS.map(({ value, label }) => (
              <div key={label}>
                <dd>{value}</dd>
                <dt>{label}</dt>
              </div>
            ))}
          </dl>
        </div>

        <div className="about__approach reveal">
          <h3>How we teach</h3>
          <ol>
            {TRAINING_STEPS.map(({ title, text }) => (
              <li key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
