/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Ruler, TreePine, Sparkles, Send, CheckCircle2, History, RotateCcw, AlertTriangle } from 'lucide-react';
import { getWhatsappLink } from '../data';

interface SavedOrder {
  id: string;
  name: string;
  bird: string;
  wood: string;
  dimensions: string;
  date: string;
}

export default function CustomizerForm() {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [bird, setBird] = useState('Trinca-Ferro');
  const [width, setWidth] = useState(50);
  const [height, setHeight] = useState(35);
  const [depth, setDepth] = useState(30);
  const [wood, setWood] = useState('Cedro Rosa');
  const [wire, setWire] = useState('Aço Inox Polido');
  const [extraInfo, setExtraInfo] = useState('');
  const [recentOrders, setRecentOrders] = useState<SavedOrder[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Load recent custom builds from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem('gaiolas_alves_custom_requests');
      if (stored) {
        setRecentOrders(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Falha ao ler cache de solicitações', e);
    }
  }, []);

  // Compute estimated price dynamically just to add a high-end feel!
  const getEstimatedPrice = () => {
    let base = 250;
    // factor size
    const volume = width * height * depth;
    base += (volume - 40 * 30 * 25) * 0.004;

    // wood additions
    if (wood === 'Jacarandá da Bahia') base += 180;
    if (wood === 'Ipê Imperial (Escuro)') base += 120;
    if (wood === 'Imbuia Nobre') base += 90;
    if (wood === 'Marfim Imperial') base += 60;

    // wire mesh additions
    if (wire === 'Latão Polido Amarelo') base += 50;
    if (wire === 'Inox Flexível Redondo') base += 30;

    return Math.max(220, Math.round(base));
  };

  const handleReset = () => {
    setName('');
    setWhatsapp('');
    setBird('Trinca-Ferro');
    setWidth(50);
    setHeight(35);
    setDepth(30);
    setWood('Cedro Rosa');
    setWire('Aço Inox Polido');
    setExtraInfo('');
    setSubmitted(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !whatsapp) {
      alert('Por favor, preencha seu Nome e WhatsApp para podermos responder.');
      return;
    }

    const compiledDimensions = `${width}cm (Comprimento) x ${height}cm (Altura) x ${depth}cm (Profundidade)`;

    // Format WhatsApp message perfectly
    const message = `*SOLICITAÇÃO DE ORÇAMENTO - GAIOLAS ALVES* 🛠️🪵
-------------------------------------------
*Cliente:* ${name}
*WhatsApp:* ${whatsapp}
*Espécie do Pássaro:* ${bird}

*Especificações Sob Medida:*
- *Madeira Escolhida:* ${wood}
- *Malha/Arame:* ${wire}
- *Dimensões:* ${compiledDimensions}
- *Estimativa Inicial Base:* ~R$ ${getEstimatedPrice().toFixed(2)}

*Observações Adicionais:*
"${extraInfo || 'Sem observações adicionais.'}"
-------------------------------------------
_Enviado via simulador do site oficial. Entre em contato comigo!_`;

    // Save to local storage for user review history
    const newOrder: SavedOrder = {
      id: Math.random().toString(36).substring(2, 9),
      name: name,
      bird: bird,
      wood: wood,
      dimensions: `${width}x${height}x${depth} cm`,
      date: new Date().toLocaleDateString('pt-BR'),
    };

    const updated = [newOrder, ...recentOrders].slice(0, 5);
    setRecentOrders(updated);
    try {
      localStorage.setItem('gaiolas_alves_custom_requests', JSON.stringify(updated));
    } catch (e) {
      console.error(e);
    }

    setSubmitted(true);

    // Redirect to WhatsApp
    setTimeout(() => {
      window.open(getWhatsappLink(message), '_blank');
    }, 1200);
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-neutral-200/50 shadow-lg">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Form inputs */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Seu Nome *
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ex: João da Silva"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#132E1C] placeholder-[#132E1C]/40 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Seu WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ex: (11) 99999-9999"
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#132E1C] placeholder-[#132E1C]/40 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Espécie de Pássaro *
                </label>
                <select
                  value={bird}
                  onChange={(e) => setBird(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#132E1C] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] cursor-pointer"
                >
                  <option value="Trinca-Ferro">Trinca-Ferro / Pixarro</option>
                  <option value="Curió">Curió</option>
                  <option value="Canário">Canário (Belga/Terra)</option>
                  <option value="Coleiro">Coleiro</option>
                  <option value="Calopsita">Calopsita</option>
                  <option value="Sabiá">Sabiá</option>
                  <option value="Bicudo">Bicudo</option>
                  <option value="Agapornis">Agapornis / Periquito</option>
                  <option value="Outro">Outro Pássaro</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Madeira Principal *
                </label>
                <select
                  value={wood}
                  onChange={(e) => setWood(e.target.value)}
                  className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#132E1C] focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D] cursor-pointer"
                >
                  <option value="Cedro Rosa">Cedro Rosa (Tradicional, Leve)</option>
                  <option value="Imbuia Nobre">Imbuia Nobre (Escura, Alta Densidade)</option>
                  <option value="Marfim Imperial">Marfim Imperial (Claro, Elegante)</option>
                  <option value="Ipê Imperial (Escuro)">Ipê Imperial (Firme, Resistente)</option>
                  <option value="Jacarandá da Bahia">Jacarandá da Bahia (Luxo, Raro)</option>
                  <option value="Mistura Imbuia & Marfim">Mesclada (Imbuia & Marfim)</option>
                </select>
              </div>
            </div>

            {/* Custom Sliders for Dimensions */}
            <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-100 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono block">
                Dimensões Desejadas em Centímetros (cm)
              </span>

              <div className="space-y-3">
                {/* Comprimento */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1 font-medium">
                    <span>Comprimento (Largura Frontal):</span>
                    <span className="font-bold text-[#132E1C]">{width} cm</span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="100"
                    value={width}
                    onChange={(e) => setWidth(Number(e.target.value))}
                    className="w-full accent-[#15803D] bg-neutral-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Altura */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1 font-medium">
                    <span>Altura Total:</span>
                    <span className="font-bold text-[#132E1C]">{height} cm</span>
                  </div>
                  <input
                    type="range"
                    min="25"
                    max="80"
                    value={height}
                    onChange={(e) => setHeight(Number(e.target.value))}
                    className="w-full accent-[#15803D] bg-neutral-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                {/* Profundidade */}
                <div>
                  <div className="flex justify-between text-xs text-neutral-600 mb-1 font-medium">
                    <span>Profundidade (Lateral):</span>
                    <span className="font-bold text-[#132E1C]">{depth} cm</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="60"
                    value={depth}
                    onChange={(e) => setDepth(Number(e.target.value))}
                    className="w-full accent-[#15803D] bg-neutral-200 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </div>
            </div>

            {/* Arame and details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Malha / Tipo de Grade
                </label>
                <div className="flex gap-2">
                  {['Aço Inox Polido', 'Latão Polido Amarelo'].map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setWire(item)}
                      className={`flex-1 py-2 px-3 text-xs rounded-xl font-bold border transition-all cursor-pointer ${
                        wire === item
                          ? 'bg-[#132E1C] text-white border-[#132E1C] shadow-sm'
                          : 'bg-white text-[#132E1C] border-neutral-200 hover:bg-neutral-50'
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                  Acabamento do Verniz
                </label>
                <div className="flex gap-2">
                  <span className="text-xs text-neutral-500 leading-relaxed block py-1 font-medium">
                    *Todos recebem proteção marítima anti-mofo e anti-UV padrão para conservar a madeira por décadas*.
                  </span>
                </div>
              </div>
            </div>

            {/* Observations */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#132E1C] font-mono mb-1.5">
                Observações Especiais ou Detalhes Solicitados
              </label>
              <textarea
                value={extraInfo}
                onChange={(e) => setExtraInfo(e.target.value)}
                placeholder="Ex sugerido: Gostaria que tivesse 2 passadores do lado direito, acabamento em verniz fosco e poleiros anatômicos com buraquinho de cortiça."
                rows={3}
                className="w-full bg-white border border-neutral-200 rounded-xl px-4 py-2.5 text-sm text-[#132E1C] placeholder-[#132E1C]/40 focus:outline-none focus:ring-2 focus:ring-[#15803D]/20 focus:border-[#15803D]"
              />
            </div>

            {/* Buttons row */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="submit"
                className="flex-1 bg-[#2EB875] hover:bg-[#1E8A54] text-white font-bold py-3.5 px-6 rounded-xl text-xs sm:text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-[1.01]"
              >
                <Send className="w-4 h-4 text-emerald-100" />
                <span>Solicitar Orçamento no WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="py-3.5 px-5 border border-neutral-200 text-[#132E1C] hover:bg-neutral-50 font-bold rounded-xl text-xs sm:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <RotateCcw className="w-4 h-4 text-emerald-700" />
                <span>Limpar</span>
              </button>
            </div>

            {submitted && (
              <div className="bg-emerald-50 text-emerald-800 p-3 rounded-xl border border-emerald-200 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>
                  Simulação concluída com sucesso! Redirecionando você para o WhatsApp oficial para finalizar a cotação...
                </span>
              </div>
            )}
          </form>
        </div>

        {/* Right Column: Visual State Preview card & history logs */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl border border-neutral-200/50 p-5 shadow-md space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-serif text-base font-bold text-[#132E1C] flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-600 animate-pulse" />
                <span>Esboço 3D Iterativo</span>
              </h4>
              <span className="text-[9px] font-mono tracking-widest text-[#132E1C]/60 font-bold uppercase">
                Gaiolas Alves
              </span>
            </div>

            {/* Interactive cage wireframe simulator render */}
            <div className="relative aspect-video rounded-xl overflow-hidden border border-neutral-100 flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50/10 to-neutral-50">
              
              {/* Outer wooden border simulated by selected wood color */}
              <div 
                className={`w-[60%] h-[75%] rounded-t-3xl border-8 relative transition-colors duration-300 ${
                  wood.includes('Marfim') ? 'border-[#EAE2C6] bg-[#FCF8EC]/60' :
                  wood.includes('Jacarandá') ? 'border-[#3D2517] bg-[#533928]/40' :
                  wood.includes('Imbuia') ? 'border-[#4A2F1B] bg-[#5B3E29]/40' :
                  wood.includes('Ipê') ? 'border-[#382B1B] bg-[#4C3B29]/40' :
                  'border-[#B47C56] bg-[#CF9C78]/40' // Cedro
                }`}
              >
                {/* Horizontal lines simulated by copper/brass/inox wires */}
                <div className="absolute inset-0 flex justify-between px-2 py-4">
                  {Array.from({ length: Math.min(12, Math.floor(width / 4)) }).map((_, i) => (
                    <div 
                      key={i} 
                      className={`w-[1px] h-full transition-colors duration-300 ${
                        wire.includes('Latão') ? 'bg-amber-400' : 'bg-slate-300'
                      }`} 
                    />
                  ))}
                </div>

                {/* Simulated center poleiro */}
                <div className="absolute right-[20%] left-[20%] top-[60%] h-2.5 bg-amber-900/60 rounded border border-amber-950/20" />
                
                {/* Small indicator display label */}
                <span className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#132E1C] text-white font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider whitespace-nowrap">
                  {width} x {height} x {depth} cm
                </span>
              </div>
            </div>

            {/* Configured values summary */}
            <div className="space-y-2 text-xs border-t border-neutral-100 pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium font-mono uppercase text-[9px]">Espécie:</span>
                <span className="font-bold text-[#132E1C]">{bird}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium font-mono uppercase text-[9px]">Tipo Madeira:</span>
                <span className="font-bold text-[#132E1C]">{wood}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium font-mono uppercase text-[9px]">Gradeamento:</span>
                <span className="font-bold text-[#132E1C]">{wire}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-400 font-medium font-mono uppercase text-[9px]">Capacidade aprox:</span>
                <span className="font-mono font-bold text-[#132E1C]">
                  {Math.round((width * height * depth) / 1000)} Litros
                </span>
              </div>

              {/* Estimate Price badge */}
              <div className="bg-emerald-50 border border-[#15803D]/15 rounded-xl p-3 mt-4 flex items-center justify-between">
                <div>
                  <span className="text-[9px] uppercase font-mono tracking-wider font-extrabold text-[#15803D] block">
                    Orçamento Estimado (Sugerido)
                  </span>
                  <span className="text-lg font-serif font-black text-[#132E1C]">
                    R$ {getEstimatedPrice().toFixed(2)}
                  </span>
                </div>
                <span className="text-[8px] bg-[#15803D] text-white px-2 py-1 rounded font-bold uppercase font-mono tracking-widest">
                  Sujeito a Ajuste
                </span>
              </div>
            </div>
          </div>

          {/* User Order History logs */}
          {recentOrders.length > 0 && (
            <div className="bg-white rounded-2xl border border-neutral-200/50 p-4 shadow-sm">
              <div className="flex items-center gap-1.5 mb-3 border-b border-neutral-100 pb-2 text-[#132E1C]">
                <History className="w-4 h-4 text-[#15803D]" />
                <span className="font-serif text-xs font-bold uppercase tracking-wider">
                  Simulações Recentessalvas
                </span>
              </div>
              
              <div className="space-y-2.5 max-h-[160px] overflow-y-auto pr-1">
                {recentOrders.map((ord) => (
                  <div key={ord.id} className="text-[11px] bg-neutral-50 rounded-lg p-2.5 flex items-center justify-between border border-neutral-100">
                    <div>
                      <div className="font-bold text-[#132E1C]">{ord.bird} ({ord.wood})</div>
                      <div className="text-neutral-400 font-mono mt-0.5">{ord.dimensions} • Cliente: {ord.name}</div>
                    </div>
                    <span className="text-[9px] font-mono bg-[#2EB875] text-white font-black px-1.5 py-0.5 rounded uppercase">
                      Salvo
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Environmental Disclaimer */}
          <div className="flex gap-2 p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-[11px] font-medium leading-relaxed">
            <AlertTriangle className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
            <span>
              <strong>Garantia Sustentável:</strong> Nossas madeiras provêm apenas de produtores licenciados que praticam o manejo correto. Não compactuamos com comércio ilegal florestal.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
}
