import styles from './styles.module.css';

export default function Popup({ open, onClose, children, variant = 'default' }) {
  if (!open) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose} role="presentation">
      <div className={`${styles.popup} ${styles[variant] || ''}`} onClick={(event) => event.stopPropagation()} role="dialog" aria-modal="true">
        {children}
      </div>
    </div>
  );
}