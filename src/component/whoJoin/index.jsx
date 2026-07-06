import Button from '@/common/Button';
import { whoJoinItems } from '@/constants/Home';

export default function WhoJoin() {
  return (
    <section className="sec--white">
      <div className="wrap">
        <div className="two-col">
          <div className="sec-img sec-img--h480 reveal from-left">
            <img src="/assets/images/whoshouldattend.jpeg" alt="Who should attend MACT masterclass" />
          </div>
          <div>
            <div className="reveal" style={{ transitionDelay: '.1s' }}>
              <span className="sec__eyebrow">Is This For Me?</span>
              <h2 className="sec__title">Who Should <span className="red">Attend?</span></h2>
              <p className="sec__body attend-copy">Built for anyone ready to take MACT cases seriously — from first claim to confident courtroom presence.</p>
            </div>
            <div className="attend-list">
              {whoJoinItems.map((item, index) => (
                <div className="attend-item reveal" key={item.label} style={{ transitionDelay: `${0.12 + index * 0.06}s` }}>
                  <div className="attend-icon">{item.icon}</div>
                  {item.label}
                </div>
              ))}
            </div>
            <div className="reveal mt-32" style={{ transitionDelay: '.5s' }}>
              <Button className="btn--red">Attend Now</Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}