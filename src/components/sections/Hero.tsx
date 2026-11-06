import { ArrowDown, Check } from 'lucide-react';
import { EnquireButton } from '../ui/EnquireButton';

const BENEFITS = [
  'Practical Training',
  'Experienced Faculty',
  'Small Batch Size',
  'Certification Guidance',
  'Job & Internship Support',
];

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      {/* Referenced by CSS: the curved edges of the photo scale with its box. */}
      <svg className="hero__clip-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="hero-curve-desktop" clipPathUnits="objectBoundingBox">
            <path d="M0.2,0 C0.13,0.3 0.05,0.62 0,1 L1,1 L1,0 Z" />
          </clipPath>
          <clipPath id="hero-curve-mobile" clipPathUnits="objectBoundingBox">
            <path d="M0,0.14 C0.28,0.02 0.66,-0.02 1,0.1 L1,1 L0,1 Z" />
          </clipPath>
        </defs>
      </svg>

      <div className="hero__media">
        <div className="hero__arc" />
        <picture className="hero__photo">
          <source
            media="(max-width: 1023px)"
            type="image/webp"
            srcSet="images/hero-mobile-640.webp 640w, images/hero-mobile-960.webp 960w"
            sizes="100vw"
          />
          <source
            media="(min-width: 1024px)"
            type="image/webp"
            srcSet="images/hero-1000.webp 1000w, images/hero-1400.webp 1400w, images/hero-1800.webp 1800w"
            sizes="52vw"
          />
          <img
            src="images/hero-1000.webp"
            alt="Laptop on a desk showing colourful programming code on its screen"
            width={1800}
            height={1200}
            fetchPriority="high"
            decoding="async"
          />
        </picture>
      </div>

      <div className="container hero__inner">
        <div className="hero__copy">
          <p className="hero__eyebrow">Computer Training Institute in Jabalpur</p>
          <h1 id="hero-title">
            Build Your Computer Skills for a <em>Better Career</em>
          </h1>
          <p className="hero__lead">
            Learn practical, job-oriented computer courses with expert guidance and hands-on training.
          </p>

          <ul className="hero__benefits">
            {BENEFITS.map((benefit) => (
              <li key={benefit}>
                <span className="hero__check">
                  <Check aria-hidden="true" size={14} strokeWidth={3.5} />
                </span>
                {benefit}
              </li>
            ))}
          </ul>

          <div className="hero__actions">
            <a className="btn btn--yellow btn--lg" href="#courses">
              Explore Courses
              <ArrowDown aria-hidden="true" size={20} />
            </a>
            <EnquireButton className="btn--lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
