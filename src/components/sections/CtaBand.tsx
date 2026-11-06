import { EnquireButton } from '../ui/EnquireButton';

export function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <div className="container cta-band__inner">
        <h2 id="cta-title">
          Ready to Start Your <em>Learning Journey?</em>
        </h2>
        <div className="cta-band__copy">
          <p className="cta-band__lead">Join Career Info-Tech Today!</p>
          <p>Upgrade your computer skills and move towards a better career.</p>
        </div>
        <EnquireButton variant="yellow" className="btn--lg" />
      </div>
    </section>
  );
}
