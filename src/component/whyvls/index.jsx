import Button from '@/common/Button';
import { whyVlsItems } from '@/constants/Home';

export default function WhyVls() {
  return (
    <section className="sec--light">
      <div className="wrap">
        <div className="two-col">
          <div>
            <div className="reveal">
              <span className="sec__eyebrow">Why Choose Us?</span>
              <h2 className="sec__title">Why <span className="red">VLS Academy?</span></h2>
              <p className="sec__body vls-copy">Trusted by hundreds of young lawyers and law students across Tamil Nadu.</p>
            </div>
            <div className="vls-list">
              {whyVlsItems.map((item, index) => (
                <div className="vls-item reveal" key={item} style={{ transitionDelay: `${0.08 + index * 0.08}s` }}>
                  {item}
                </div>
              ))}
            </div>
            <div className="reveal mt-32" style={{ transitionDelay: '.5s' }}>
              <Button className="btn--red">Register Now</Button>
            </div>
          </div>
          <div className="sec-img sec-img--h440 reveal from-right" style={{ transitionDelay: '.15s' }}>
            <img src="/assets/images/whyvls.jpg" alt="Why VLS Law Academy" />
          </div>
        </div>
      </div>
    </section>
  );
}