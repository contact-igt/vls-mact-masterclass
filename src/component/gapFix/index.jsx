import Button from '@/common/Button';
import { fixItems, gapItems } from '@/constants/Home';

export default function GapFix() {
  return (
    <section className="sec--dark" id="the-fix">
      <div className="wrap">
        <div className="reveal text-center">
          <h2 className="sec__title sec__title--light">You Studied the Law. <span className="red">But Then What?</span></h2>
          <p className="sec__body sec__body--light mt-8 section-center-copy">You know about negligence and tort liability. But when a grieving family walks in after an accident — do you know exactly what to do next?</p>
        </div>
        <div className="gf-grid">
          <div className="gf-box gf-box--gap reveal from-left" style={{ transitionDelay: '.1s' }}>
            <h3>The Gap</h3>
            <ul>
              {gapItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
          <div className="gf-box gf-box--fix reveal from-right" style={{ transitionDelay: '.1s' }}>
            <h3>The Fix in 3 Hours</h3>
            <ul>
              {fixItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        <div className="reveal text-center mt-40" style={{ transitionDelay: '.25s' }}>
          <Button className="btn--red btn--lg">Fix Now — Register ₹499</Button>
        </div>
      </div>
    </section>
  );
}