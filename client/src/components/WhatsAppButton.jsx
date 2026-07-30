import React from 'react';
import '../styles/whatsapp.css';

// TODO: replace with the real business WhatsApp number (country code, no + or spaces)
const WHATSAPP_NUMBER = '910000000000';
const WHATSAPP_MESSAGE = "Hi! I'd like to know more about Big Daddy Tattoos.";

const WhatsAppButton = () => {
  const link = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noreferrer"
      className="whatsapp-fab"
      aria-label="Chat with us on WhatsApp"
      title="Chat with us on WhatsApp"
    >
      <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" aria-hidden="true">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.2h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.51 2 12.04 2Zm5.8 14.07c-.24.68-1.4 1.32-1.93 1.4-.5.08-1.12.11-1.8-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.16-4.94-4.35-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.26-.28.57-.35.76-.35.19 0 .38 0 .55.01.18.01.42-.07.65.5.24.58.82 2 .89 2.14.07.14.12.31.02.5-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2 1.11.99 2.05 1.3 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.91-1.13.19-.29.38-.24.63-.14.26.1 1.66.78 1.94.92.29.14.48.21.55.33.07.12.07.68-.17 1.36Z"/>
      </svg>
    </a>
  );
};

export default WhatsAppButton;
