import scrollToRegister from '@/utils/scrollToRegister';

export default function Button({ children, className = '', href = '#register', onClick, type }) {
  const handleClick = (event) => {
    if (onClick) {
      onClick(event);
      return;
    }

    if (href === '#register') {
      scrollToRegister(event);
    }
  };

  if (type === 'button') {
    return (
      <button className={`btn ${className}`} onClick={handleClick} type="button">
        {children}
      </button>
    );
  }

  return (
    <a className={`btn ${className}`} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}