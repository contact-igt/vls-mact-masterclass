import Button from '@/common/Button';

export default function WhyCourse() {
  return (
    <section className="sec--white" id="why">
      <div className="wrap">
        <div className="two-col">
          <div className="reveal from-left">
            <span className="sec__eyebrow">Why This Masterclass?</span>
            <h2 className="sec__title">MACT Cases Are Everywhere.<br /><span className="red">Are You Ready?</span></h2>
            <p className="sec__body">Motor Accident Claims are among the most filed civil cases in India — yet most fresh advocates have never drafted a single MACT petition. Law school taught you IPC 304A and tort theory. We teach you how to actually win compensation for your client — step by step, from the police station to the Tribunal award.</p>
            <p className="sec__body mt-16">Whether you're filing for a fatal accident victim's family or seeking disability compensation for an injured motorcyclist — this masterclass gives you the exact procedure, drafting templates, calculation formulas and cross-examination scripts to walk in prepared.</p>
            <Button className="btn--red mt-32">Learn More</Button>
          </div>
          <div className="sec-img sec-img--h440 reveal from-right" style={{ transitionDelay: '.15s' }}>
            <img src="/assets/images/whythismasterclass.jpeg" alt="Why this MACT masterclass classroom training" />
          </div>
        </div>
      </div>
    </section>
  );
}