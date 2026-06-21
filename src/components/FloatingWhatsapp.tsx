/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { MessageSquare, X } from 'lucide-react';
import { getWhatsappLink } from '../data';

export default function FloatingWhatsapp() {
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    // Show the helper message bubble after 3 seconds of load to catch attention
    const timer = setTimeout(() => {
      setShowTooltip(true);
    }, 4000);

    // Auto dismiss after 10 seconds of visibility to avoid cluttering human view
    const dismissTimer = setTimeout(() => {
      setShowTooltip(false);
    }, 14000);

    return () => {
      clearTimeout(timer);
      clearTimeout(dismissTimer);
    };
  }, []);

  const defaultMessage = 'Olá! Estou navegando no site da GAIOLAS ALVES e gostaria de consultar modelos e opções de frete.';

  return (
    <div id="floating-whatsapp-widget" className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
      
      {/* Dynamic Pop-up Tooltip */}
      {showTooltip && (
        <div className="bg-white text-[#6B4226] p-3 rounded-2xl shadow-xl border border-[#2F4F2F]/20 text-xs sm:text-sm mb-3 max-w-[250px] pointer-events-auto animate-fade-in relative">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-1 right-1 text-[#6B4226]/50 hover:text-[#6B4226] p-1"
            aria-label="Fechar Ajuda"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex gap-2 items-start mt-1">
            <span className="text-xl">🪵</span>
            <div>
              <p className="font-semibold text-emerald-800 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block" />
                Atendimento Alves
              </p>
              <p className="text-[11px] text-[#6B4226]/80 mt-0.5 leading-relaxed">
                Olá! Quer tirar dúvidas sobre tamanhos ou encomendar sob medida? Fale comigo agora!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Pulsing Floating Button */}
      <a
        href={getWhatsappLink(defaultMessage)}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => setShowTooltip(false)}
        className="pointer-events-auto relative bg-[#2F4F2F] hover:bg-[#203620] text-white p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 group focus:outline-none focus:ring-4 focus:ring-emerald-500/30 flex items-center justify-center"
        title="Fale Conosco pelo WhatsApp"
      >
        {/* Double background pulses for attention */}
        <span className="absolute inset-0 rounded-full bg-[#2F4F2F]/40 animate-ping -z-10 group-hover:block" />
        <span className="absolute -inset-1 rounded-full border-2 border-emerald-400/30 animate-pulse -z-10" />

        <MessageSquare className="w-6 h-6 text-emerald-300 group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
}
