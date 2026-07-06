import CountUp from 'react-countup';
import { speakerStats } from '@/constants/Home';

export default function Speaker() {
  return (
    <section className="sec--dark speaker-section">
      <div className="wrap">
        <div className="speaker-grid">
          <div className="speaker-photo reveal from-left">
            <div className="speaker-photo__card">
              <img src="/assets/images/mr-shiva-kumar.svg" alt="Dr. Sivakumar" />
            </div>
            <div className="speaker-badge">VLS Law Academy<br />Chief Trainer</div>
          </div>
          <div className="reveal from-right" style={{ transitionDelay: '.15s' }}>
            <span className="speaker-tag">Our Speaker</span>
            <h2 className="speaker-name">Dr. Sivakumar</h2>
            <p className="speaker-qual">B.Sc., M.L., Ph.D (Law)</p>
            <p className="speaker-role">Lawyer, Chennai High Court</p>
            <p className="speaker-bio">Dr. Sivakumar has successfully trained over 250 aspirants for Tamil Nadu Judicial Services and over 1,200 candidates for Tamil Nadu Civil Services. He has guided IAS, IPS, and IFS candidates, with many achieving top ranks. He has mentored candidates in law, economy, and public administration for UPSC and TNPSC since 2003. His contributions extend to founding multiple IAS academies across Tamil Nadu.</p>
            <div className="speaker-stats">
              {speakerStats.map((stat) => (
                <div className="stat-item" key={stat.label}>
                  <div className="stat-num">
                    <CountUp
                      end={stat.value}
                      duration={2.2}
                      separator=","
                      suffix={stat.suffix}
                      enableScrollSpy
                      scrollSpyOnce
                    />
                  </div>
                  <div className="stat-lbl">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}