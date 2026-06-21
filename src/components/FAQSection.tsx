/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FAQItem[] = [
    {
      question: 'Como as gaiolas são enviadas? Elas chegam inteiras?',
      answer: 'Sim, garantimos 100% de integridade! Todas as nossas gaiolas são enviadas via transportadoras privadas premium em caixas de proteção reforçada feitas de placas de madeira MDF e preenchidas com manta de plástico bolha de alta gramatura. Se houver qualquer incidente no percurso, nós realizamos a troca ou reembolso imediatamente.'
    },
    {
      question: 'Qual é o prazo de fabricação de uma gaiola personalizada?',
      answer: 'O tempo médio para o preparo de modelos padrão em estoque é de até 2 dias úteis. Para modelos sob medida customizados no simulador, o prazo comum de fabricação artesanal varia entre 10 e 15 dias úteis, devido às fases necessárias de corte de precisão, colagem técnica, lixamentos minuciosos e cura das demãos de verniz marítimo.'
    },
    {
      question: 'Quais tipos de madeiras nobres vocês utilizam?',
      answer: 'Trabalhamos exclusivamente com madeiras secas naturalmente à sombra e certificadas de manejo correto ou reflorestamento sustentável. As principais são Imbuia Nobre (caráter escuro e robusto), Cedro Rosa (leve e aromático), Marfim Imperial (claro com veios sofisticados), Ipê Amarelo (altíssima densidade e proteção) e Jacarandá da Bahia (textura rara e luxuosa).'
    },
    {
      question: 'Como devo fazer a manutenção e limpeza da madeira?',
      answer: 'Por conta da tripla camada de verniz PU automotivo e náutico, a limpeza é extremamente simples: basta passar uma flanela macia levemente umedecida com água. Nunca use produtos químicos ásperos, álcool ou solventes. Uma vez a cada seis meses, você pode passar uma quantidade mínima de silicone líquido com lustra-móveis para recuperar o brilho original de fábrica de forma perfeita.'
    },
    {
      question: 'Quais as formas de pagamento disponíveis?',
      answer: 'Oferecemos descontos exclusivos de 10% para pagamentos integrais em Pix ou Transferência Bancária. Também dividimos suas compras em até 12x sem juros no cartão de crédito via Mercado Pago de forma 100% segura. Os dados são enviados de forma direta pelo WhatsApp do nosso vendedor.'
    }
  ];

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div id="faq-accordion-container" className="max-w-4xl mx-auto mt-16 bg-neutral-50 rounded-3xl p-6 sm:p-10 border border-neutral-200/50 shadow-md">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 bg-[#10B981]/10 px-3.5 py-1 rounded-full text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono mb-2">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Suporte & Dúvidas</span>
        </div>
        
        <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#132E1C] tracking-tight">
          Perguntas Frequentes
        </h3>
        
        <p className="text-neutral-500 text-sm mt-2 max-w-lg mx-auto leading-relaxed">
          Tudo o que você precisa saber sobre o processo de encomendar, receber e manter suas gaiolas artesanais.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => {
          const isOpen = openIndex === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-150 hover:border-[#15803D]/45 overflow-hidden transition-all duration-300 shadow-sm"
            >
              <button
                type="button"
                onClick={() => handleToggle(idx)}
                className="w-full text-left px-5 sm:px-6 py-4 flex items-center justify-between text-[#132E1C] hover:bg-neutral-55 focus:outline-none transition-colors select-none cursor-pointer"
              >
                <span className="font-serif font-bold text-sm sm:text-base pr-4 leading-snug">
                  {faq.question}
                </span>
                <span className="bg-emerald-50 text-[#15803D] p-1.5 rounded-lg shrink-0">
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {/* Collapsible Answer Pane */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 font-medium animate-fade-in">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
