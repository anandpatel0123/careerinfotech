import type { ReactNode } from 'react';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  id?: string;
  children?: ReactNode;
}

export function SectionHeading({ eyebrow, title, id, children }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      {eyebrow && <p className="eyebrow">{eyebrow}</p>}
      <h2 id={id} className="section-heading__title">
        {title}
      </h2>
      {children && <p className="section-heading__text">{children}</p>}
    </div>
  );
}
