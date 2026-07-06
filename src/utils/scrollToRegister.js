export default function scrollToRegister(event) {
  if (event) {
    event.preventDefault();
  }

  document.getElementById('register')?.scrollIntoView({
    behavior: 'smooth',
    block: 'center',
  });
}