/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Hammer } from 'lucide-react';
import { WHATS_APP_NUMBER, getWhatsappLink } from '../data';

interface HeaderProps {
  activeSection: string;
  onNavigate: (section: string) => void;
}

export default function Header({ activeSection, onNavigate }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'inicio', label: 'Início' },
    { id: 'catalogo', label: 'Catálogo' },
    { id: 'especies', label: 'Por Espécie' },
    { id: 'personalizadas', label: 'Personalizados' },
    { id: 'galeria', label: 'Galeria' },
    { id: 'sobre', label: 'Sobre Nós' },
    { id: 'depoimentos', label: 'Depoimentos' },
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  const contactMessage = 'Olá! Gostaria de falar com o atendimento da Gaiolas Alves sobre modelos de gaiola disponíveis.';

  return (
    <header
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#F5E6D3]/95 backdrop-blur-md shadow-md border-b border-[#6B4226]/10 py-3'
          : 'bg-[#F5E6D3]/80 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleItemClick('inicio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#6B4226] p-2 rounded-lg text-[#F5E6D3] transition-transform duration-300 group-hover:scale-105">
              <Hammer id="logo-icon" className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-black text-[#6B4226] tracking-tight block">
                GAIOLAS ALVES
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-[#5a361e] -mt-1 block font-semibold">
                Arte em Madeira Nobre
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === item.id
                    ? 'bg-[#6B4226] text-white shadow-sm'
                    : 'text-[#6B4226]/80 hover:text-[#6B4226] hover:bg-[#6B4226]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={getWhatsappLink(contactMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#2F4F2F] hover:bg-[#203620] text-white px-4 py-2 rounded-full text-xs sm:text-sm font-semibold shadow-sm hover:shadow transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Contatar Vendedor</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#6B4226] hover:text-[#5a361e] p-2 rounded-lg hover:bg-[#6B4226]/5 transition-colors focus:outline-none"
              aria-label="Abrir Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#F5E6D3] border-b border-[#6B4226]/10 shadow-lg px-4 pt-2 pb-6 absolute w-full left-0 animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-base font-medium transition-all ${
                  activeSection === item.id
                    ? 'bg-[#6B4226] text-white shadow'
                    : 'text-[#6B4226] hover:bg-[#6B4226]/5'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-[#6B4226]/10 px-4">
            <a
              href={getWhatsappLink(contactMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#2F4F2F] hover:bg-[#203620] text-white w-full py-3 rounded-xl text-sm font-bold shadow transition-colors"
            >
              <Phone className="w-4 h-4 text-emerald-300" />
              <span>Conversar pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
