import { useEffect, useRef, useState } from 'react';
import { Menu, Phone, X } from 'lucide-react';
import { NAV_LINKS, OFFICES, SITE, telHref } from '../../data/site';
import { useActiveSection } from '../../hooks/useActiveSection';
import { EnquireButton } from '../ui/EnquireButton';
import { BrandLogo } from './BrandLogo';

export function NavBar({ isStuck }: { isStuck: boolean }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();
  const navRef = useRef<HTMLElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!navRef.current?.contains(event.target as Node)) setMenuOpen(false);
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  const navItems = (onClick?: () => void) =>
    NAV_LINKS.map((link) => (
      <li key={link.id}>
        <a
          href={`#${link.id}`}
          className={active === link.id ? 'is-active' : undefined}
          aria-current={active === link.id ? 'location' : undefined}
          onClick={onClick}
        >
          {link.label}
        </a>
      </li>
    ));

  return (
    <nav className={`navbar${isStuck ? ' navbar--stuck' : ''}`} ref={navRef} aria-label="Main">
      <div className="container navbar__inner">
        <a className="navbar__brand" href="#home" aria-label={`${SITE.name} home`} onClick={closeMenu}>
          <span className="logo-badge">
            <BrandLogo loading="eager" />
          </span>
          <span className="navbar__brand-text">
            <strong>{SITE.name}</strong>
            <small>Jabalpur</small>
          </span>
        </a>

        <ul className="navbar__links">{navItems()}</ul>

        <EnquireButton className="navbar__cta" />

        <button
          ref={toggleRef}
          type="button"
          className="navbar__toggle"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X aria-hidden="true" size={26} /> : <Menu aria-hidden="true" size={26} />}
        </button>
      </div>

      <div id="mobile-menu" className="mobile-menu" hidden={!menuOpen}>
        <ul>{navItems(closeMenu)}</ul>
        <div className="mobile-menu__actions">
          <EnquireButton className="btn--block" onClick={closeMenu} />
          <a className="btn btn--ghost btn--block" href={telHref(OFFICES[0].phone)}>
            <Phone aria-hidden="true" size={18} />
            Call {OFFICES[0].phone}
          </a>
        </div>
      </div>
    </nav>
  );
}
