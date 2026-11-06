import type { CSSProperties } from 'react';
import { CheckCircle2, FileText, Target, Wrench } from 'lucide-react';
import { categoryLabel, type Course } from '../../data/courses';
import { SITE } from '../../data/site';
import { Dialog } from '../ui/Dialog';

interface CourseDetailsDialogProps {
  course?: Course;
  onClose: () => void;
  onEnquire: (courseId: string) => void;
}

export function CourseDetailsDialog({ course, onClose, onEnquire }: CourseDetailsDialogProps) {
  return (
    <Dialog open={Boolean(course)} onClose={onClose} labelledBy="course-dialog-title" className="dialog__panel--wide">
      {course && <CourseDetails course={course} onEnquire={onEnquire} />}
    </Dialog>
  );
}

function CourseDetails({ course, onEnquire }: { course: Course; onEnquire: (courseId: string) => void }) {
  const Icon = course.icon;
  const accent = { '--c1': course.colors[0], '--c2': course.colors[1] } as CSSProperties;

  return (
    <>
      <header className="course-dialog__head" style={accent}>
        <span className="course-dialog__icon">
          <Icon aria-hidden="true" size={28} />
        </span>
        <div>
          <p className="course-dialog__category">{categoryLabel(course.category)}</p>
          <h2 id="course-dialog-title" tabIndex={-1} data-initial-focus>
            {course.title}
          </h2>
        </div>
      </header>

      {/* Focusable so keyboard users can scroll a long module list with the arrow keys. */}
      <div className="dialog__body course-dialog__body" tabIndex={0} role="region" aria-label="Course details">

        <p className="course-dialog__overview">{course.overview}</p>

        <section aria-labelledby="course-modules-title">
          <h3 id="course-modules-title" className="course-dialog__subtitle">
            Course modules
          </h3>
          <ul className="module-list">
            {course.modules.map((module) => (
              <li key={module}>
                <CheckCircle2 aria-hidden="true" size={18} />
                <span>{module}</span>
              </li>
            ))}
          </ul>
        </section>

        <div className="course-dialog__notes">
          <section className="note-card">
            <h3>
              <Wrench aria-hidden="true" size={18} />
              Practical exercises
            </h3>
            <p>{course.practical}</p>
          </section>
          <section className="note-card">
            <h3>
              <Target aria-hidden="true" size={18} />
              Learning outcome
            </h3>
            <p>{course.outcome}</p>
          </section>
        </div>
      </div>

      <footer className="dialog__footer course-dialog__footer">
        <button type="button" className="btn btn--red" onClick={() => onEnquire(course.id)}>
          Enquire About This Course
        </button>
        <a
          className="btn btn--outline"
          href={`${SITE.syllabusPdf}#page=${course.pdfPage}`}
          target="_blank"
          rel="noopener"
        >
          <FileText aria-hidden="true" size={18} />
          View Syllabus PDF (page {course.pdfPage})
        </a>
      </footer>
    </>
  );
}
