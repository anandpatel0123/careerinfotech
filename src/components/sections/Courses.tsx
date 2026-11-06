import { useState, type CSSProperties, type MouseEvent } from 'react';
import { ArrowRight, FileText, ListChecks } from 'lucide-react';
import { useModals } from '../../context/ModalContext';
import { CATEGORIES, COURSES, type CategoryId, type Course } from '../../data/courses';
import { SITE } from '../../data/site';
import { SectionHeading } from '../ui/SectionHeading';

type Filter = CategoryId | 'all';

const FILTERS: { id: Filter; label: string }[] = [{ id: 'all', label: 'All Courses' }, ...CATEGORIES];

const coursesFor = (filter: Filter) =>
  filter === 'all' ? COURSES : COURSES.filter((course) => course.category === filter);

export function Courses() {
  const [filter, setFilter] = useState<Filter>('all');
  const [hasFiltered, setHasFiltered] = useState(false);

  const visibleCourses = coursesFor(filter);

  const selectFilter = (next: Filter, event: MouseEvent<HTMLButtonElement>) => {
    setHasFiltered(true);
    setFilter(next);
    // On phones the chips scroll sideways, so keep the chosen one in view.
    event.currentTarget.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  };

  return (
    <section id="courses" className="section courses" aria-labelledby="courses-title">
      <div className="container">
        <SectionHeading id="courses-title" title="Our Courses" eyebrow="DCA, PGDCA, CPCT, Tally & Programming Classes">
          Choose from a wide range of professional and job-oriented computer courses.
        </SectionHeading>

        <div className="filters" role="group" aria-label="Filter courses by category">
          {FILTERS.map(({ id, label }) => (
            <button
              key={id}
              type="button"
              className="filter-chip"
              aria-pressed={filter === id}
              onClick={(event) => selectFilter(id, event)}
            >
              {label}
              <span className="filter-chip__count" aria-hidden="true">
                {coursesFor(id).length}
              </span>
            </button>
          ))}
        </div>

        <p className="visually-hidden" role="status">
          Showing {visibleCourses.length} of {COURSES.length} courses
        </p>

        <ul key={filter} className={`course-grid${hasFiltered ? ' course-grid--animated' : ''}`}>
          {visibleCourses.map((course, index) => (
            <CourseCard key={course.id} course={course} index={index} />
          ))}
        </ul>
      </div>
    </section>
  );
}

function CourseCard({ course, index }: { course: Course; index: number }) {
  const { openCourse, openEnquiry } = useModals();
  const Icon = course.icon;
  const style = {
    '--c1': course.colors[0],
    '--c2': course.colors[1],
    '--stagger': `${index * 35}ms`,
  } as CSSProperties;

  return (
    <li className="course-card" style={style}>
      <div className="course-card__head">
        <span className="course-card__icon">
          <Icon aria-hidden="true" size={34} strokeWidth={1.75} />
        </span>
        <h3>{course.name}</h3>
      </div>

      <div className="course-card__body">
        <p>{course.summary}</p>

        <div className="course-card__actions">
          <button
            type="button"
            className="btn btn--course"
            aria-label={`View course details for ${course.name}`}
            onClick={() => openCourse(course.id)}
          >
            <ListChecks aria-hidden="true" size={17} />
            View Course Details
          </button>
          <a
            className="btn btn--outline btn--sm"
            href={`${SITE.syllabusPdf}#page=${course.pdfPage}`}
            target="_blank"
            rel="noopener"
            aria-label={`View syllabus PDF for ${course.name}, page ${course.pdfPage}`}
          >
            <FileText aria-hidden="true" size={16} />
            View Syllabus PDF
          </a>
          <button
            type="button"
            className="course-card__enquire"
            aria-label={`Enquire about ${course.name}`}
            onClick={() => openEnquiry(course.id)}
          >
            Enquire Now
            <ArrowRight aria-hidden="true" size={16} />
          </button>
        </div>
      </div>
    </li>
  );
}
