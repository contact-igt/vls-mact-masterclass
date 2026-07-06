import styles from './styles.module.css';

export default function Title({ title1, spantitle }) {
  return (
    <h2 className={styles.title}>
      {title1} <span>{spantitle}</span>
    </h2>
  );
}