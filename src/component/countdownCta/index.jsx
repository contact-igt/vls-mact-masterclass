import Button from '@/common/Button';
import { courseDetails } from '@/constants/Home';
import useCountdown from '@/hooks/useCountdown';

export default function CountdownCta() {
  const countdown = useCountdown(15 * 60);

  return (
    <section className="sec--dark countdown-section">
      <div className="wrap">
        <div className="cd-wrap reveal">
          <h2 className="cd-title">Motor Accident Claims Masterclass<br />On {courseDetails.date}</h2>
          <p className="cd-date">{courseDetails.time} &nbsp;|&nbsp; {courseDetails.format}</p>
          <p className="cd-label">⚠️ Offer Will Expire in</p>
          <div className="cd-grid">
            <div className="cd-box"><span className="cd-num">{countdown.hours}</span><span className="cd-lbl">Hours</span></div>
            <div className="cd-box"><span className="cd-num">{countdown.minutes}</span><span className="cd-lbl">Mins</span></div>
            <div className="cd-box"><span className="cd-num">{countdown.seconds}</span><span className="cd-lbl">Secs</span></div>
          </div>
          <div className="cd-price">
            <div className="orig">INR {courseDetails.originalPrice}</div>
            <div className="now">INR <span>{courseDetails.offerPrice}</span></div>
            <div className="note">( Offer ends when timer hits zero )</div>
          </div>
          <Button className="btn--red btn--lg">Register Here</Button>
        </div>
      </div>
    </section>
  );
}