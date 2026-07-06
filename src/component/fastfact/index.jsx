import { fastFacts } from '@/constants/Home';

export default function FastFact() {
  return (
    <section className="sec--light">
      <div className="wrap">
        <div className="two-col">
          <div className="sec-img sec-img--h360 reveal from-left">
            <img src="/assets/images/fatsfact.jpeg" alt="MACT fast facts classroom session" />
          </div>
          <div>
            <div className="reveal" style={{ transitionDelay: '.1s' }}>
              <span className="sec__eyebrow">Masterclass Details</span>
              <h2 className="sec__title">Fast <span className="red">Facts</span></h2>
            </div>
            <div className="facts-list">
              {fastFacts.map((fact, index) => (
                <div className="fact-row reveal" key={fact.title} style={{ transitionDelay: `${0.12 + index * 0.06}s` }}>
                  <span className="fact-icon">{fact.icon}</span>
                  <div>
                    <strong>{fact.title}</strong>
                    <p>{fact.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}