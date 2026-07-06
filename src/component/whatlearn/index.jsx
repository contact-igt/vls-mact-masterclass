import { learnItems } from '@/constants/Home';

export default function WhatLearn() {
  return (
    <section className="sec--light">
      <div className="wrap">
        <div className="two-col what-learn-grid">
          <div>
            <div className="reveal">
              <span className="sec__eyebrow">Curriculum</span>
              <h2 className="sec__title">What You'll <span className="red">Learn?</span></h2>
              <p className="sec__body learn-copy">8 critical MACT practice skills you'll carry into every accident case from Day 1.</p>
            </div>
            <div className="learn-list">
              {learnItems.map((item, index) => (
                <div className="learn-item reveal" key={item} style={{ transitionDelay: `${0.06 + index * 0.06}s` }}>
                  <span className="learn-num">{String(index + 1).padStart(2, '0')}</span>
                  {item}
                </div>
              ))}
            </div>
          </div>
          <div className="sec-img sec-img--h520 what-learn-image reveal from-right" style={{ transitionDelay: '.2s' }}>
            <img src="/assets/images/whatlearn.jpeg" alt="What you will learn in MACT training" />
          </div>
        </div>
      </div>
    </section>
  );
}