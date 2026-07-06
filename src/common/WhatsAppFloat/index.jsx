import { phoneNumbers } from '@/constants/navlink';

export default function WhatsAppFloat() {
  return (
    <a href={phoneNumbers.whatsappHref} className="wa-float" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
      <img src="/images/whatsapp.png" alt="whatsapp-logo" />
    </a>
  );
}