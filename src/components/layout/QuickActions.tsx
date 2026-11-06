import { Phone, Send } from 'lucide-react';
import { useModals } from '../../context/ModalContext';
import { OFFICES, telHref } from '../../data/site';
import { QUICK_CHAT_URL } from '../../lib/whatsapp';
import { WhatsAppIcon } from '../ui/WhatsAppIcon';

/** Bottom action bar on phones, floating WhatsApp button on larger screens. */
export function QuickActions() {
  const { openEnquiry } = useModals();

  return (
    <aside aria-label="Quick contact">
      <div className="action-bar">
        <a className="action-bar__item" href={telHref(OFFICES[0].phone)}>
          <Phone aria-hidden="true" size={20} />
          Call
        </a>
        <a className="action-bar__item action-bar__item--whatsapp" href={QUICK_CHAT_URL} target="_blank" rel="noopener">
          <WhatsAppIcon size={20} />
          WhatsApp
        </a>
        <button type="button" className="action-bar__item action-bar__item--enquire" onClick={() => openEnquiry()}>
          <Send aria-hidden="true" size={18} />
          Enquire Now
        </button>
      </div>

      <a
        className="whatsapp-fab"
        href={QUICK_CHAT_URL}
        target="_blank"
        rel="noopener"
        aria-label="Chat with Career Info-Tech on WhatsApp"
      >
        <WhatsAppIcon size={30} />
      </a>
    </aside>
  );
}
