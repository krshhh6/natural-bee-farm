import React, { useState, useEffect } from 'react';
import {
  MessageSquare,
  Send,
  X,
  Phone,
  ShieldCheck,
  Sparkles,
  ExternalLink,
  ChevronUp,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const WHATSAPP_NUMBER = '919939055989';
const FARM_PHONE = '099390 55989';

const PRESET_TOPICS = [
  {
    id: 'recommendation',
    icon: '🍯',
    label: 'Which honey is best for daily immunity?',
    message: 'Hi Natural Bee Farm! Could you please recommend which raw honey harvest is best for daily immunity and family wellness?',
  },
  {
    id: 'order_status',
    icon: '📦',
    label: 'Track an existing honey shipment',
    message: 'Hi Natural Bee Farm! I would like to check the tracking and dispatch status of my honey order.',
  },
  {
    id: 'purity_cert',
    icon: '🧪',
    label: 'NMR Purity & Lab Test Report',
    message: 'Hi! Can you please share the NMR purity and FSSAI lab testing report for your latest raw honey harvest?',
  },
  {
    id: 'bulk_gift',
    icon: '🎁',
    label: 'Bulk / Wedding / Corporate Gifting',
    message: 'Hi Natural Bee Farm! I am interested in bulk booking and customized artisanal jars for festive/wedding gifting.',
  },
];

export const WhatsAppWidget: React.FC = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [customMessage, setCustomMessage] = useState('');
  const [showNotificationBadge, setShowNotificationBadge] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Trigger subtle notification badge after 3 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!hasInteracted) {
        setShowNotificationBadge(true);
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [hasInteracted]);

  const handleOpenChat = (messageText: string) => {
    let finalMessage = messageText.trim();
    if (user && user.name) {
      finalMessage = `[User: ${user.name}${user.phone ? ` | +91 ${user.phone}` : ''}]\n${finalMessage}`;
    }
    const encoded = encodeURIComponent(finalMessage || 'Hi Natural Bee Farm! I am browsing your online store.');
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  const handleSendCustom = (e: React.FormEvent) => {
    e.preventDefault();
    if (customMessage.trim()) {
      handleOpenChat(customMessage);
      setCustomMessage('');
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-40 font-sans select-none">
      
      {/* EXPANDED CHAT POPUP DRAWER */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-3rem)] sm:w-96 max-w-[380px] bg-white dark:bg-[#1E1C18] rounded-3xl shadow-2xl border-2 border-[#E8D5B7] dark:border-[#3D372E] overflow-hidden animate-scale-up text-[#282823] dark:text-[#FEFDF5]">
          
          {/* Header */}
          <div className="bg-gradient-to-r from-[#2C1810] via-[#422417] to-[#2C1810] text-white p-4 sm:p-5 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(#E9BE5F_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
            
            <div className="relative z-10 flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 rounded-2xl bg-[#FEFDF5] p-1 shadow-md flex items-center justify-center overflow-hidden">
                    <img
                      src="/logo.png"
                      alt="Natural Bee Farm"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 border-2 border-[#2C1810] rounded-full" />
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h3 className="font-serif font-bold text-sm text-white">
                      Natural Honey Farm
                    </h3>
                    <span className="p-0.5 bg-[#E9BE5F] text-[#2C1810] rounded-full text-[9px]">
                      <Sparkles className="w-2.5 h-2.5 fill-current" />
                    </span>
                  </div>
                  <p className="text-[11px] text-amber-200/90 font-medium">
                    Patna Apiary • Mother-Owned
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-emerald-400 mt-0.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Replies within ~5 mins (9 AM – 7 PM)</span>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white transition-colors cursor-pointer"
                aria-label="Close Chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Quick Help Topics */}
          <div className="p-4 bg-paper-texture dark:bg-[#25221D] border-b border-[#E8D5B7] dark:border-[#3D372E] space-y-2 max-h-60 overflow-y-auto no-scrollbar">
            <p className="text-[11px] font-black uppercase tracking-wider text-[#8C7A65] dark:text-[#A69888]">
              Select a quick question:
            </p>

            <div className="space-y-1.5">
              {PRESET_TOPICS.map((topic) => (
                <button
                  key={topic.id}
                  onClick={() => {
                    handleOpenChat(topic.message);
                    setIsOpen(false);
                  }}
                  className="w-full text-left p-2.5 rounded-xl bg-white dark:bg-[#1E1C18] border border-[#E8D5B7] dark:border-[#423A30] hover:border-[#9C5B23] hover:bg-[#FAF5EB] dark:hover:bg-[#2E2A24] transition-all text-xs font-semibold text-[#2C1810] dark:text-[#FEFDF5] flex items-center justify-between group cursor-pointer shadow-2xs"
                >
                  <span className="flex items-center gap-2 truncate">
                    <span>{topic.icon}</span>
                    <span className="truncate">{topic.label}</span>
                  </span>
                  <ExternalLink className="w-3 h-3 text-[#8C7A65] group-hover:text-[#9C5B23] shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          {/* Custom Message Input Form */}
          <form onSubmit={handleSendCustom} className="p-3 bg-white dark:bg-[#1E1C18]">
            <div className="relative flex items-center">
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Type your message here..."
                className="w-full pl-3.5 pr-11 py-2.5 bg-[#FAF5EB] dark:bg-[#25221D] border border-[#E8D5B7] dark:border-[#423A30] rounded-xl text-xs font-medium text-[#2C1810] dark:text-white placeholder-[#8C7A65] focus:outline-none focus:border-[#9C5B23]"
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-[#25D366] hover:bg-[#20bd5a] text-white rounded-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                title="Send via WhatsApp"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Bottom Direct Call & Guarantee Bar */}
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#E8D5B7]/60 dark:border-[#3D372E] text-[10px] text-[#8C7A65] dark:text-[#A69888]">
              <div className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#9C5B23]" />
                <span>100% Purity Certified</span>
              </div>
              <a
                href={`tel:${WHATSAPP_NUMBER}`}
                className="flex items-center gap-1 font-bold text-[#9C5B23] dark:text-[#E9BE5F] hover:underline"
              >
                <Phone className="w-2.5 h-2.5" />
                <span>Call: {FARM_PHONE}</span>
              </a>
            </div>
          </form>

        </div>
      )}

      {/* FLOATING ACTION LAUNCH BUTTON */}
      <div className="relative">
        
        {/* First-visit tooltip prompt */}
        {!isOpen && showNotificationBadge && (
          <div
            onClick={() => {
              setIsOpen(true);
              setShowNotificationBadge(false);
              setHasInteracted(true);
            }}
            className="absolute bottom-16 left-0 bg-[#2C1810] text-[#FEFDF5] px-3.5 py-2 rounded-2xl shadow-xl border border-[#E9BE5F]/50 text-xs font-bold whitespace-nowrap flex items-center gap-2 cursor-pointer animate-bounce group"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Need help choosing pure honey? Chat with us!</span>
            <ChevronUp className="w-3 h-3 text-[#E9BE5F]" />
          </div>
        )}

        <button
          onClick={() => {
            setIsOpen((prev) => !prev);
            setShowNotificationBadge(false);
            setHasInteracted(true);
          }}
          className={`flex items-center gap-2.5 px-4 py-3 rounded-full shadow-2xl transition-all transform hover:scale-108 active:scale-95 cursor-pointer border-2 border-white dark:border-[#1E1C18] ${
            isOpen
              ? 'bg-[#2C1810] text-white shadow-[#2C1810]/40'
              : 'bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-emerald-500/40 animate-pulse-glow'
          }`}
          aria-label="WhatsApp Live Support"
        >
          <div className="relative flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-white fill-current" />
            {!isOpen && (
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-300 rounded-full border-2 border-[#25D366]" />
            )}
          </div>

          <span className="text-xs sm:text-sm font-extrabold tracking-wide font-sans">
            {isOpen ? 'Close Chat' : 'Chat on WhatsApp'}
          </span>
        </button>
      </div>

    </div>
  );
};
