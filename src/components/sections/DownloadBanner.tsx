import { Download, FileText } from 'lucide-react';
import { SITE } from '../../data/site';

export function DownloadBanner() {
  return (
    <section id="course-contents" className="section section--tight" aria-labelledby="download-title">
      <div className="container">
        <div className="download reveal">
          <span className="download__icon">
            <FileText aria-hidden="true" size={38} strokeWidth={1.75} />
          </span>
          <div className="download__copy">
            <h2 id="download-title">Download Full Course Contents</h2>
            <p>Get detailed syllabus, topics and modules of all our computer training courses in one PDF.</p>
          </div>
          <a className="btn btn--red btn--lg download__button" href={SITE.syllabusPdf} download={SITE.syllabusFileName}>
            <Download aria-hidden="true" size={20} />
            Download All Course Contents (PDF)
          </a>
        </div>
      </div>
    </section>
  );
}
