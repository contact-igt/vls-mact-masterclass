import Button from '@/common/Button';
import ContactForm from '@/component/contactform';
import { courseDetails, heroBullets } from '@/constants/Home';

export default function Banner({ ipAddress = '' }) {
  return (
    <section className="hero" id="home">
      <div className="hero__bg" />
      <div className="hero__vignette" />
      <div className="wrap hero__inner">
        <div className="reveal from-left">
          <div className="hero__eyebrow">{courseDetails.module}</div>
          <h1 className="hero__title">
            Motor Accident
            <br />
            <span className="accent">Claims Practice</span>
            <br />
            <span className="sub-line">— 3 Hours Masterclass</span>
          </h1>
          <p className="hero__desc">
            From filing the MACT petition to winning compensation — master claim procedure, negligence proof, Sarla Verma formulas & insurance tactics in 180 minutes.
          </p>
          <div className="hero__date">
            📅&nbsp; {courseDetails.date} &nbsp;|&nbsp; {courseDetails.time}
          </div>
          <ul className="hero__bullets">
            {heroBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <Button className="btn--red btn--lg">Register Now — ₹499</Button>
        </div>

        <div className="form-card reveal from-right" id="register" style={{ transitionDelay: '.18s' }}>
          <ContactForm ipAddress={ipAddress} />
        </div>
      </div>
    </section>
  );
}