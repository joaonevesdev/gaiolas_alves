/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Ruler, TreePine, CheckCircle, ChevronDown, ChevronUp, MessageCircle, Info } from 'lucide-react';
import { Product } from '../types';
import { getWhatsappLink } from '../data';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showSpecs, setShowSpecs] = useState(false);

  // Prefilled WhatsApp text message as requested by user
  const whatsappText = `Olá! Tenho interesse na ${product.name} anunciada no site com preço de R$ ${product.price.toFixed(2)}. Medidas: ${product.measurements}. Poderia me passar mais detalhes do envio?`;
  
  const whatsappUrl = getWhatsappLink(whatsappText);

  return (
    <div
      id={`product-${product.id}`}
      className="bg-white rounded-[2rem] overflow-hidden border border-neutral-250/30 shadow-md hover:shadow-xl hover:border-[#15803D] transition-all duration-300 flex flex-col group h-full"
    >
      {/* Product Image Stage */}
      <div className="relative aspect-[4/3] bg-emerald-50/10 overflow-hidden border-b border-neutral-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          loading="lazy"
          referrerPolicy="no-referrer"
          onError={(e) => {
            // Safe fallback image for birds/cages
            e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600';
          }}
        />
        {/* Featured Tag */}
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-[#132E1C] text-emerald-100 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full font-bold shadow-md">
            ★ Destaque Real
          </span>
        )}
        
        {/* Size Badge */}
        <span className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#132E1C] text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow border border-neutral-100">
          {product.size}
        </span>
      </div>

      {/* Product Information Body */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Species Badge List */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {product.species.map((spec, idx) => (
              <span
                key={idx}
                className="bg-emerald-50 text-[#15803D] text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#132E1C] tracking-tight group-hover:text-[#15803D] transition-colors leading-snug">
            {product.name}
          </h3>

          <p className="text-neutral-500 text-xs sm:text-sm mt-2 leading-relaxed">
            {product.description}
          </p>

          {/* Quick Specifications list */}
          <div className="mt-4 pt-3 border-t border-neutral-100 space-y-2">
            <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
              <Ruler className="w-4 h-4 text-[#15803D]/60 shrink-0" />
              <span><strong>Medidas:</strong> {product.measurements}</span>
            </div>
            
            <div className="flex items-center gap-2 text-xs text-neutral-600 font-medium">
              <TreePine className="w-4 h-4 text-[#15803D]/60 shrink-0" />
              <span><strong>Material:</strong> {product.material}</span>
            </div>
          </div>
        </div>

        {/* Dynamic spec expansion button and prices */}
        <div className="mt-5">
          <button
            onClick={() => setShowSpecs(!showSpecs)}
            className="text-xs font-semibold text-neutral-600 hover:text-[#15803D] flex items-center gap-1 mb-4 select-none cursor-pointer"
          >
            <Info className="w-3.5 h-3.5 text-[#15803D]" />
            <span>{showSpecs ? 'Ocultar detalhes' : 'Ver detalhes de acabamento'}</span>
            {showSpecs ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          </button>

          {/* Staggered specs display */}
          <AnimatePresence initial={false}>
            {showSpecs && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-4 bg-neutral-50 rounded-xl border border-neutral-100 p-3"
              >
                <div className="text-xs text-neutral-600 space-y-1.5 font-medium">
                  <div className="uppercase font-bold tracking-wider text-[9px] text-neutral-400 mb-1 font-mono">
                    Especificações Técnicas:
                  </div>
                  {product.details.map((detail, index) => (
                    <div key={index} className="flex gap-1.5 items-start">
                      <CheckCircle className="w-3.5 h-3.5 text-[#2EB875] shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Footer Action area */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 gap-3">
            <div>
              <span className="text-[9px] uppercase tracking-wider font-extrabold text-neutral-400 block font-mono">
                Preço Consumidor
              </span>
              <span className="text-xl sm:text-2xl font-serif font-black text-[#132E1C]">
                R$ {product.price.toFixed(2)}
              </span>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#2EB875] hover:bg-[#1E8A54] text-white px-4 py-2.5 rounded-xl text-xs uppercase tracking-wider font-bold shadow-md hover:shadow-lg transition-all duration-200"
            >
              <MessageCircle className="w-4 h-4 text-emerald-100" />
              <span>Encomendar</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
