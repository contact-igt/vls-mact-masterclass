import { Play } from 'lucide-react';
import styles from './styles.module.css';

export default function TestimonialCard({ imageSrc, openModal, name = 'Student testimonial' }) {
  return (
    <article className={styles.testimonialCard}>
      <img src={imageSrc} alt={name} className={styles.image} />
      <button className={styles.playButton} onClick={openModal} type="button" aria-label={`Play ${name} video`}>
        <Play fill="#b20a0a" color="#b20a0a" size={32} />
      </button>
    </article>
  );
}