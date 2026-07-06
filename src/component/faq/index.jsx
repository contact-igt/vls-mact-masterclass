import { useState } from 'react';
import { faqItems } from '@/constants/Home';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex((currentIndex) => (currentIndex === index ? null : index));
  };

  return (
    <section className="sec--white" id="faq">
      <div className="wrap">
        <div className="reveal text-center faq-heading">
          <h2 className="sec__title">Frequently Asked <span className="red">Questions?</span></h2>
        </div>
        <div className="faq-wrap">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div className="faq-item reveal" key={item.question} style={{ transitionDelay: `${0.05 + index * 0.05}s` }}>
                <button className={`faq-btn${isOpen ? ' open' : ''}`} onClick={() => toggleFaq(index)} type="button">
                  {item.question}
                  <span className="faq-chevron">▼</span>
                </button>
                <div className={`faq-panel${isOpen ? ' open' : ''}`}>
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}