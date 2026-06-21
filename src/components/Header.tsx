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
          ? 'bg-white/80 backdrop-blur-md shadow-md border-b border-neutral-200/55 py-3'
          : 'bg-white/50 backdrop-blur-sm py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Brand */}
          <div 
            onClick={() => handleItemClick('inicio')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <div className="bg-[#15803D] p-2 rounded-xl text-white transition-transform duration-300 group-hover:scale-105 shadow-sm">
              <Hammer id="logo-icon" className="w-5 h-5" />
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-black text-[#132E1C] tracking-tight block">
                GAIOLAS ALVES
              </span>
              <span className="text-[10px] font-mono tracking-widest uppercase text-emerald-750 -mt-1 block font-bold">
                Arte & Design de Luxo
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wider font-bold transition-all duration-200 cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#132E1C] text-white shadow-md'
                    : 'text-neutral-600 hover:text-[#132E1C] hover:bg-neutral-100/50'
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
              className="flex items-center gap-2 bg-[#2EB875] hover:bg-[#1E8A54] text-white px-5 py-2.5 rounded-xl text-xs uppercase tracking-widest font-black shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200"
            >
              <Phone className="w-4 h-4 text-emerald-100" />
              <span>Falar Vendedor</span>
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-[#132E1C] hover:text-[#2EB875] p-2 rounded-xl hover:bg-neutral-150 transition-colors focus:outline-none cursor-pointer"
              aria-label="Abrir Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-md border-b border-neutral-100 shadow-xl px-4 pt-2 pb-6 absolute w-full left-0 animate-fade-in">
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`w-full text-left px-4 py-3 rounded-xl text-sm font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-[#132E1C] text-white shadow-md'
                    : 'text-[#132E1C] hover:bg-neutral-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-neutral-100 px-4">
            <a
              href={getWhatsappLink(contactMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#2EB875] hover:bg-[#1E8A54] text-white w-full py-3.5 rounded-xl text-xs font-black uppercase tracking-wider shadow hover:shadow-lg transition-all"
            >
              <Phone className="w-4 h-4 text-emerald-100" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
