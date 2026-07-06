import Button from '@/common/Button';
import { navLinks, phoneNumbers } from '@/constants/navlink';
import useScrolledHeader from '@/hooks/useScrolledHeader';

export default function Header() {
  const isScrolled = useScrolledHeader();

  return (
    <nav className={`nav${isScrolled ? ' scrolled' : ''}`}>
      <div className="wrap nav__inner">
        <a href="#home" className="nav__logo" aria-label="VLS Law Academy">
          <img src="/images/vls_logo.png" alt="VLS Law Academy" />
        </a>
        <div className="nav__links">
          {navLinks.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="nav__right">
          <a href={phoneNumbers.primaryHref} className="nav__phone">
            {phoneNumbers.primary}
          </a>
          <Button className="btn--red btn--nav">Register ₹499</Button>
        </div>
      </div>
    </nav>
  );
}