import { navLinks, phoneNumbers } from '@/constants/navlink';
import { socialLinks } from '@/constants/Home';

export default function Footer() {
  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-about">
            <img src="/assets/images/vls_logo.png" alt="VLS Law Academy" />
            <p>
              VLS Law Academy is a coaching institute for law graduates, assisting them to scale up in Judicial Services exams, Law optional subject (IAS/Civil Services exam), and UGC examinations (Junior Research Fellowship / Lectureship for Law).
            </p>
            <div className="footer-socials mt-24">
              {socialLinks.map((link) => (
                <a href={link.href} aria-label={link.label} key={link.href} target="_blank" rel="noopener noreferrer">
                  {link.text}
                </a>
              ))}
            </div>
          </div>
          <div className="footer-col">
            <h5>Explore</h5>
            <ul>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div className="footer-col">
            <h5>Contact Us</h5>
            <p>No. 1910, 2nd Floor, H Block 5th Street, 12th Main Road, Anna Nagar West, Chennai</p>
            <a href={phoneNumbers.primaryHref}>{phoneNumbers.primary}</a>
            <a href={phoneNumbers.secondaryHref}>{phoneNumbers.secondary}</a>
            <a href="https://www.vlslawacademy.com">www.vlslawacademy.com</a>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2026 VLS Law Academy. All rights reserved.</p>
          <div className="footer-bottom-links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}