/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { 
  Search, 
  Filter, 
  Award, 
  Truck, 
  ShieldCheck, 
  Instagram, 
  MapPin, 
  Phone, 
  Star, 
  ArrowRight, 
  X, 
  Maximize2,
  Check,
  Building
} from 'lucide-react';

import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CustomizerForm from './components/CustomizerForm';
import FloatingWhatsapp from './components/FloatingWhatsapp';
import FAQSection from './components/FAQSection';

import { 
  productsList, 
  speciesList, 
  galleryImagesList, 
  testimonialsList, 
  getWhatsappLink, 
  WHATS_APP_NUMBER,
  HERO_CAGE_PATH,
  WORKSHOP_PATH
} from './data';
import { Product, GalleryImage } from './types';

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  
  // Catalog search & species & size & price states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpeciesFilter, setSelectedSpeciesFilter] = useState('Todos');
  const [selectedSizeFilter, setSelectedSizeFilter] = useState('Todos');
  const [maxPriceFilter, setMaxPriceFilter] = useState(700);

  // "Gaiolas por Espécie" Special interactive category state
  const [speciesFocused, setSpeciesFocused] = useState('trinca-ferro');

  // Lightbox modal for Gallery
  const [activeGalleryImg, setActiveGalleryImg] = useState<GalleryImage | null>(null);

  // References for smooth scrolling
  const sectionRefs = {
    inicio: useRef<HTMLElement>(null),
    catalogo: useRef<HTMLElement>(null),
    especies: useRef<HTMLElement>(null),
    personalizadas: useRef<HTMLElement>(null),
    galeria: useRef<HTMLElement>(null),
    sobre: useRef<HTMLElement>(null),
    depoimentos: useRef<HTMLElement>(null),
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Filter logic for the catalog
  const filteredProducts = useMemo(() => {
    return productsList.filter((product) => {
      // 1. Search Query Match
      const matchesSearch = 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.material.toLowerCase().includes(searchQuery.toLowerCase());

      // 2. Species Filter Match
      const matchesSpecies = 
        selectedSpeciesFilter === 'Todos' || 
        product.species.some(s => s.toLowerCase().includes(selectedSpeciesFilter.toLowerCase()));

      // 3. Size Filter Match
      const matchesSize = 
        selectedSizeFilter === 'Todos' || 
        product.size === selectedSizeFilter;

      // 4. Price Match
      const matchesPrice = product.price <= maxPriceFilter;

      return matchesSearch && matchesSpecies && matchesSize && matchesPrice;
    });
  }, [searchQuery, selectedSpeciesFilter, selectedSizeFilter, maxPriceFilter]);

  // "Gaiolas por Espécie" recommendations logic
  const speciesRecommendedProducts = useMemo(() => {
    const focusObj = speciesList.find(s => s.id === speciesFocused);
    if (!focusObj) return [];
    
    return productsList.filter(prod => 
      prod.species.some(spec => spec.toLowerCase().includes(focusObj.name.toLowerCase()))
    );
  }, [speciesFocused]);

  const defaultWelcomeMessage = 'Olá! Visitei seu site e gostaria de saber as novidades em estoque das gaiolas artesanais.';

  return (
    <div className="min-h-screen bg-[#FAF9F5] text-[#2C1E15] selection:bg-[#15803D]/20 selection:text-[#132E1C] font-sans antialiased">
      {/* Sticky Top Header */}
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      {/* Hero Section (Página Inicial) - Stylized as Bento blocks */}
      <section 
        id="inicio" 
        ref={sectionRefs.inicio}
        className="pt-28 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
      >
        <div className="lg:col-span-7 bg-[#132E1C] text-[#F3EFE9] rounded-[2.5rem] p-8 sm:p-10 lg:p-12 relative overflow-hidden border border-[#132E1C]/15 shadow-xl flex flex-col justify-between gap-6">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-cover bg-center bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <div className="relative z-10 space-y-4">
            {/* Tagline */}
            <div className="inline-block bg-[#15803D] text-white px-3.5 py-1.5 rounded-xl text-xs font-bold uppercase tracking-widest font-mono shadow-sm">
              <span>🌱 Ateliê de Design de Luxo</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              Gaiolas de Madeira <br />
              <span className="text-[#A7F3D0]">Sob Medida e Alto Padrão</span>
            </h1>

            <p className="text-sm sm:text-base text-[#F3EFE9]/90 leading-relaxed max-w-xl">
              Qualidade artesanal extraordinária para colecionadores exigentes. Encaixes micrométricos, madeiras nobres tratadas sob manejo sustentável e acabamento impecável em piano-gloss. Entregamos em caixa protetora rígida em todo o Brasil.
            </p>

            {/* Quick Value Pillars */}
            <div className="grid grid-cols-3 gap-3 max-w-md pt-2 font-semibold">
              <div className="flex flex-col items-start text-[11px] font-mono text-[#E6F4EA]">
                <Award className="w-5 h-5 text-yellow-400 mb-1" />
                <span>Madeira Nobre Certificada</span>
              </div>
              <div className="flex flex-col items-start text-[11px] font-mono text-[#E6F4EA]">
                <Truck className="w-5 h-5 text-[#34D399] mb-1" />
                <span>Frete Seguro MDF</span>
              </div>
              <div className="flex flex-col items-start text-[11px] font-mono text-[#E6F4EA]">
                <ShieldCheck className="w-5 h-5 text-[#34D399] mb-1" />
                <span>Compra Garantida</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="relative z-10 flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => handleNavigate('catalogo')}
              className="bg-[#A7F3D0] hover:bg-white text-[#132E1C] font-black px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-200 text-xs sm:text-sm uppercase tracking-wider cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Explorar Modelos</span>
            </button>
            
            <a
              href={getWhatsappLink(defaultWelcomeMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 hover:bg-white/20 text-white font-bold px-6 py-3.5 rounded-xl transition-all duration-200 text-xs sm:text-sm flex items-center justify-center gap-2 group uppercase tracking-wider border border-white/20"
            >
              <Phone className="w-4 h-4 text-[#34D399]" />
              <span>Falar WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Hero Image Showcase Block */}
        <div className="lg:col-span-5 bg-white rounded-[2.5rem] p-5 border border-[#132E1C]/10 shadow-xl relative flex flex-col justify-between">
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-[4/5] bg-emerald-50/20">
            <img
              src={HERO_CAGE_PATH} 
              alt="Gaiola Artesanal Alves Luxo"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => {
                // Safe fallback image for birds/cages
                e.currentTarget.src = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=700';
              }}
            />
            {/* Soft decorative blur indicator ornament */}
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 text-white flex flex-col justify-end">
              <span className="text-xs uppercase font-mono tracking-widest text-[#34D399] font-bold">
                Destaque Especial
              </span>
              <h3 className="font-serif text-base sm:text-lg font-bold mt-1 text-white">
                Gaiola Imperial Trinca-Ferro
              </h3>
              <p className="text-[11px] text-white/80 mt-0.5">
                Marchetaria de luxo em Imbuia e verniz alto brilho.
              </p>
            </div>
          </div>
          
          {/* Artistic floating stats badge inside bento card */}
          <div className="mt-4 flex items-center gap-3 bg-[#E6F4EA] rounded-2xl p-3 border border-[#15803D]/10">
            <div className="w-8 h-8 rounded-full bg-[#15803D]/10 flex items-center justify-center text-[#15803D]">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
            </div>
            <div>
              <span className="block font-serif font-black text-sm text-[#132E1C]">4.9 / 5.0 Estrelas</span>
              <span className="block text-[9px] font-mono uppercase tracking-wider text-[#132E1C]/60 font-bold">
                Recomendado pelos Melhores Criadores do Brasil
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Decorative divider band - styled as a beautiful bento brick */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6">
        <div className="bg-[#132E1C] text-[#F3EFE9] p-8 sm:p-10 rounded-[2.5rem] border border-[#132E1C]/20 shadow-md divide-y sm:divide-y-0 sm:divide-x divide-white/10 grid grid-cols-1 sm:grid-cols-3 text-center sm:text-left gap-8">
          <div className="sm:pl-6 first:pl-0 space-y-1">
            <span className="text-3xl font-serif font-black block text-[#34D399]">100%</span>
            <span className="text-xs tracking-wider uppercase font-mono font-bold block text-emerald-100/70">Madeiras Nobres Originais</span>
            <p className="text-xs text-emerald-100/85 leading-relaxed">Não trabalhamos com compensado ou MDF na estrutura das gaiolas.</p>
          </div>
          <div className="sm:pl-6 space-y-1">
            <span className="text-3xl font-serif font-black block text-[#34D399]">Envio Ultra Seguro</span>
            <span className="text-xs tracking-wider uppercase font-mono font-bold block text-emerald-100/70">Proteção Blindada MDF</span>
            <p className="text-xs text-emerald-100/85 leading-relaxed">Embalagem especial de pranchas de MDF rígido para garantir o trajeto.</p>
          </div>
          <div className="sm:pl-6 space-y-1">
            <span className="text-3xl font-serif font-black block text-[#34D399]">Simulação 3D</span>
            <span className="text-xs tracking-wider uppercase font-mono font-bold block text-emerald-100/70">Configuração Imediata</span>
            <p className="text-xs text-emerald-100/85 leading-relaxed">Personalize dimensões, marchetarias, ganchos e verniz no simulador.</p>
          </div>
        </div>
      </section>

      {/* Catálogo de Produtos e Filtros */}
      <section id="catalogo" ref={sectionRefs.catalogo} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10">
        <div className="text-center mb-10">
          <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono bg-[#10B981]/10 px-3.5 py-1.5 rounded-full inline-block">
            ⚡ Ateliê On-demand • Catálogo
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#132E1C] mt-3 tracking-tight">
            Nossos Modelos Exclusivos
          </h2>
          <p className="text-[#2C1E15]/80 text-sm mt-3 max-w-xl mx-auto leading-relaxed">
            Consulte os preços de catálogo de pronta-entrega. Lembre-se, todos os nossos botões de compra abrem o WhatsApp já enviando o nome da gaiola automaticamente.
          </p>
        </div>

        {/* Filter Toolbar Box - themed as a solid clean white bento block */}
        <div className="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-neutral-200/50 shadow-lg mb-10 space-y-6">
          <div className="flex items-center gap-2 border-b border-neutral-100 pb-3">
            <Filter className="w-5 h-5 text-[#15803D]" />
            <h3 className="font-serif text-lg font-bold text-[#132E1C]">Filtros Rápidos</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Search Input */}
            <div className="relative">
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C1E15]/70 font-mono mb-1.5">
                Pesquisa Livre
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ex: Jacarandá, luxo..."
                  className="w-full bg-neutral-50 rounded-xl pl-9 pr-4 py-2.5 text-xs text-[#2C1E15] placeholder-neutral-400 border border-neutral-200 hover:border-neutral-300 focus:ring-2 focus:ring-[#15803D]/20 focus:outline-none transition-all"
                />
                <Search className="absolute left-3 top-3.5 w-4 h-4 text-neutral-400" />
              </div>
            </div>

            {/* Species Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C1E15]/70 font-mono mb-1.5">
                Filtrar por Espécie
              </label>
              <select
                value={selectedSpeciesFilter}
                onChange={(e) => setSelectedSpeciesFilter(e.target.value)}
                className="w-full bg-neutral-50 rounded-xl px-3 py-2.5 text-xs text-[#2C1E15] border border-neutral-200 hover:border-neutral-300 focus:ring-2 focus:ring-[#15803D]/20 focus:outline-none transition-all cursor-pointer"
              >
                <option value="Todos">Todas as Espécies</option>
                <option value="Canário">Canários</option>
                <option value="Coleiro">Coleiro</option>
                <option value="Trinca-Ferro">Trinca-Ferro</option>
                <option value="Curió">Curió</option>
                <option value="Calopsita">Calopsita</option>
              </select>
            </div>

            {/* Size Filter */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#2C1E15]/70 font-mono mb-1.5">
                Tamanho Indicado
              </label>
              <select
                value={selectedSizeFilter}
                onChange={(e) => setSelectedSizeFilter(e.target.value)}
                className="w-full bg-neutral-50 rounded-xl px-3 py-2.5 text-xs text-[#2C1E15] border border-neutral-200 hover:border-neutral-300 focus:ring-2 focus:ring-[#15803D]/20 focus:outline-none transition-all cursor-pointer"
              >
                <option value="Todos">Qualquer Tamanho</option>
                <option value="Pequeno">Pequeno (ex: Canários/Coleiros)</option>
                <option value="Médio">Médio (ex: Curiós)</option>
                <option value="Grande">Grande (ex: Trinca-Ferros/Calopsitas)</option>
              </select>
            </div>

            {/* Max Price Range Slider */}
            <div>
              <div className="flex justify-between text-xs text-[#2C1E15]/70 font-mono font-bold mb-1.5 uppercase">
                <span>Preço Máximo:</span>
                <span className="font-extrabold text-[#15803D]">R$ {maxPriceFilter}</span>
              </div>
              <input
                type="range"
                min="200"
                max="700"
                step="20"
                value={maxPriceFilter}
                onChange={(e) => setMaxPriceFilter(Number(e.target.value))}
                className="w-full accent-[#15803D] bg-neutral-100 h-1.5 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-semibold">
                <span>R$ 200,00</span>
                <span>R$ 700,00</span>
              </div>
            </div>
          </div>

          {/* Matches length indicator */}
          <div className="flex items-center justify-between text-xs pt-1 border-t border-neutral-100">
            <span className="text-neutral-500">
              Exibindo <strong>{filteredProducts.length}</strong> modelos correspondentes.
            </span>
            {(searchQuery || selectedSpeciesFilter !== 'Todos' || selectedSizeFilter !== 'Todos' || maxPriceFilter < 700) && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedSpeciesFilter('Todos');
                  setSelectedSizeFilter('Todos');
                  setMaxPriceFilter(700);
                }}
                className="text-xs font-bold text-amber-600 hover:text-amber-800 transition-colors flex items-center gap-1"
              >
                Limpar filtros ×
              </button>
            )}
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <div key={prod.id}>
                <ProductCard product={prod} />
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] border border-neutral-200/50 p-12 text-center max-w-xl mx-auto shadow-sm">
            <div className="text-4xl mb-3">🪵🔎</div>
            <h4 className="font-serif text-lg font-bold text-[#132E1C]">Nenhuma gaiola encontrada</h4>
            <p className="text-xs text-neutral-500 mt-1.5 leading-relaxed">
              Infelizmente nenhum produto do catálogo corresponde aos filtros aplicados. Tente ajustar a barra de preços ou limpe os termos de pesquisa. Se preferir, encomende uma gaiola personalizada no nosso simulador exclusivo!
            </p>
            <button
              onClick={() => handleNavigate('personalizadas')}
              className="mt-4 bg-[#15803D] text-white text-xs font-bold px-5 py-2.5 rounded-xl hover:bg-[#132E1C] transition-colors"
            >
              Simular Gaiola Personalizada
            </button>
          </div>
        )}
      </section>

      {/* Categoria Especial Section: "Gaiolas por Espécie" - Styled as a cohesive Bento Group */}
      <section 
        id="especies" 
        ref={sectionRefs.especies} 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10"
      >
        <div className="bg-white/60 p-6 sm:p-10 rounded-[2.5rem] border border-neutral-200/50 shadow-lg">
          <div className="text-center mb-10">
            <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono bg-[#10B981]/10 px-3.5 py-1.5 rounded-full inline-block">
              🐦 Sintonia Perfeita • Hábitat Ideal
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#132E1C] mt-3 tracking-tight">
              Gaiolas por Espécie de Pássaro
            </h2>
            <p className="text-[#2C1E15]/80 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Cada pássaro possui comportamento, necessidades de voo e força de bico específicos. Escolha a sua ave abaixo para ver as recomendações de alta performance do nosso ateliê.
            </p>
          </div>

          {/* Birds Tabs Selector list */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 max-w-4xl mx-auto mb-10">
            {speciesList.map((spec) => {
              const isSelected = speciesFocused === spec.id;
              return (
                <button
                  key={spec.id}
                  onClick={() => setSpeciesFocused(spec.id)}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#132E1C] text-white border-[#132E1C] shadow-lg scale-[1.03]'
                      : 'bg-white text-[#2C1E15] border-neutral-200 hover:border-[#15803D] hover:bg-neutral-50/50'
                  }`}
                >
                  <span className="text-3xl mb-1 select-none leading-none">{spec.emoji}</span>
                  <span className="font-serif font-black text-xs sm:text-sm tracking-tight">{spec.name}</span>
                  <span className={`text-[9px] font-mono mt-0.5 ${isSelected ? 'text-emerald-200/80' : 'text-neutral-400'}`}>
                    {spec.scientificName}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Focused Bird Display Detail card */}
          {speciesList.find(s => s.id === speciesFocused) && (
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] p-6 sm:p-8 border border-neutral-200/50 shadow-md mb-10 transition-all duration-300">
              {(() => {
                const spec = speciesList.find(s => s.id === speciesFocused)!;
                return (
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-8 space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{spec.emoji}</span>
                        <h3 className="font-serif text-xl sm:text-2xl font-black text-[#132E1C]">
                          Recomendações GAIOLAS ALVES para {spec.name}
                        </h3>
                      </div>
                      
                      <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                        {spec.description}
                      </p>

                      <div className="text-xs text-[#15803D] font-bold mt-2">
                        📏 Perfil recomendado pelo artesão: {spec.recommendedSize}
                      </div>
                    </div>

                    <div className="md:col-span-4 bg-emerald-50 rounded-2xl p-5 border border-emerald-100 text-center">
                      <span className="text-[10px] uppercase font-mono tracking-wider block font-bold text-emerald-800/65">
                        Modelos em Linha
                      </span>
                      <span className="text-4xl font-serif font-black text-[#132E1C] block my-1">
                        {speciesRecommendedProducts.length}
                      </span>
                      <span className="text-[11px] text-[#132E1C]/80 block font-semibold">
                        Gaiolas recomendadas
                      </span>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Render target recommendations */}
          <div className="max-w-5xl mx-auto">
            {speciesRecommendedProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 justify-center">
                {speciesRecommendedProducts.map((prod) => (
                  <div key={prod.id} className="max-w-md mx-auto w-full">
                     <ProductCard product={prod} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-[2rem] border border-neutral-200/50 p-10 text-center max-w-xl mx-auto shadow-md">
                <p className="text-xs text-neutral-600 leading-relaxed font-semibold">
                  Temos dezenas de outros modelos ou podemos fabricar exatamente do tamanho recomendado sob medida! Clique no botão de personalizados abaixo ou monte o simulador.
                </p>
                <button
                  onClick={() => handleNavigate('personalizadas')}
                  className="mt-4 bg-[#15803D] text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-[#132E1C] transition-colors"
                >
                  Fazer sob medida
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Gaiolas Personalizadas section (Form & 3D sketch Simulator) */}
      <section 
        id="personalizadas" 
        ref={sectionRefs.personalizadas} 
        className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10 animate-fade-in"
      >
        <div className="text-center mb-10">
          <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono bg-[#10B981]/10 px-4 py-1.5 rounded-full inline-block">
            ⚡ Simulador Inteligente 3D
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-[#132E1C] mt-3 tracking-tight">
            Projete Sua Gaiola Sob Encomenda
          </h2>
          <p className="text-neutral-500 text-sm sm:text-base mt-2 max-w-xl mx-auto text-center">
            Escolha as dimensões ideais, as marchetarias preferidas, acabamentos de verniz e obtenha uma simulação rascunhada e cotação aproximada integrada.
          </p>
        </div>

        {/* Customizer form + Layout preview */}
        <CustomizerForm />
      </section>

      {/* Galeria de Fotos */}
      <section 
        id="galeria" 
        ref={sectionRefs.galeria} 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10"
      >
        <div className="bg-white/60 p-6 sm:p-10 rounded-[2.5rem] border border-neutral-200/50 shadow-lg">
          <div className="text-center mb-10">
            <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono bg-[#10B981]/10 px-3.5 py-1.5 rounded-full inline-block">
              📸 Ateliê • Fotografia Real
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#132E1C] mt-3 tracking-tight">
              Galeria de Acabamento & Produção
            </h2>
            <p className="text-neutral-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Veja o andamento artesanal real do nosso ateliê, os encaixes de marchetaria fina e o acabamento espelhado de alto brilho.
            </p>
          </div>

          {/* Photo Gallery Grid - Bento structure of images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryImagesList.map((img) => (
              <div
                key={img.id}
                onClick={() => setActiveGalleryImg(img)}
                className="group relative bg-white rounded-[2rem] overflow-hidden aspect-[4/3] border border-neutral-100 hover:border-[#15803D] cursor-pointer shadow-md hover:shadow-xl transition-all duration-300"
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800';
                  }}
                />
                
                {/* Category tag display */}
                <span className="absolute top-3 left-3 bg-[#132E1C] text-emerald-100 text-[9px] font-mono tracking-widest uppercase px-2.5 py-0.5 rounded-full font-bold">
                  {img.category}
                </span>

                {/* Cover visual gradient hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#132E1C]/95 via-[#132E1C]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-white">
                  <h4 className="font-serif font-bold text-base leading-tight flex items-center justify-between text-emerald-50">
                    <span>{img.title}</span>
                    <Maximize2 className="w-4 h-4 text-emerald-300 ml-1 shrink-0" />
                  </h4>
                  <p className="text-xs text-white/80 mt-1 leading-normal font-medium">
                    {img.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Galeria Lightbox Modal */}
      {activeGalleryImg && (
        <div 
          onClick={() => setActiveGalleryImg(null)}
          className="fixed inset-0 bg-black/90 z-100 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 animate-fade-in cursor-zoom-out"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative cursor-default border border-neutral-100"
          >
            {/* Close trigger button */}
            <button
              onClick={() => setActiveGalleryImg(null)}
              className="absolute top-4 right-4 bg-black/60 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10 focus:outline-none cursor-pointer"
              aria-label="Fechar Foto"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Img frame */}
            <div className="aspect-[4/3] bg-black">
              <img
                src={activeGalleryImg.url}
                alt={activeGalleryImg.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800';
                }}
              />
            </div>

            {/* Image meta container */}
            <div className="p-6 space-y-2">
              <div className="flex items-center gap-2">
                <span className="bg-emerald-50 text-[#15803D] text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full">
                  Categoria: {activeGalleryImg.category}
                </span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#132E1C]">
                {activeGalleryImg.title}
              </h3>
              <p className="text-sm text-neutral-600 leading-relaxed font-medium">
                {activeGalleryImg.description}
              </p>

              <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-xs">
                <span className="font-mono text-neutral-400">Gaiolas Alves • Ateliê Autorizado</span>
                <a
                  href={getWhatsappLink(`Olá! Tenho interesse na gaiola estilo "${activeGalleryImg.title}" que vi na galeria.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 hover:text-emerald-900 font-bold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Pedir Modelo Parecido</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sobre a Empresa - Styled as elegant side-by-side Bento bricks */}
      <section 
        id="sobre" 
        ref={sectionRefs.sobre} 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Workshop custom photo representation */}
          <div className="lg:col-span-5 bg-white p-5 rounded-[2.5rem] border border-neutral-200/50 shadow-lg flex flex-col justify-between">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] sm:aspect-square lg:aspect-[4/5] bg-emerald-50/10 h-full">
              <img
                src={WORKSHOP_PATH}
                alt="Oficina Gaiolas Alves"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=700';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-5 text-white">
                <span className="font-mono text-xs text-[#34D399]">
                  📍 Oficina GAIOLAS ALVES - São Paulo, BR
                </span>
              </div>
            </div>
          </div>

          {/* History column */}
          <div className="lg:col-span-7 bg-[#132E1C] text-[#F3EFE9] p-8 sm:p-10 lg:p-12 rounded-[2.5rem] border border-[#132E1C]/20 shadow-xl flex flex-col justify-between gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <span className="text-white text-xs font-bold uppercase tracking-wider font-mono bg-[#15803D] px-3.5 py-1.5 rounded-lg inline-block">
                  🛠️ Nossa Jornada
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl font-black text-white tracking-tight">
                  A Arte do Acabamento Diferenciado
                </h2>
              </div>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                A **GAIOLAS ALVES** nasceu da paixão pela ornitofilia e pela marcenaria artística premium. Há anos nos dedicamos a transformar blocos selecionados de madeiras nobres, como a Imbuia, Cedro-Rosa, Marfim e Jacarandá, em verdadeiras peças de design exclusivo.
              </p>

              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Diferente das produções industriais, cada gaiola nossa passa por mais de **12 fases produtivas**. Realizamos cortes micrométricos para encaixes fêmea-macho perfeitos, lixamentos especiais e a aplicação de verniz marítimo ou PU automotivo triplo, garantindo o autêntico acabamento espelhado tipo piano.
              </p>

              {/* Core commitments checkboxes list */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-white/10">
                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-white">Madeiras Nobres Certificadas</h4>
                    <p className="text-[10px] text-emerald-200/70 mt-0.5">Sustentabilidade total em todas as peças.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-white">Malha Tensionada Milimétrica</h4>
                    <p className="text-[10px] text-emerald-200/70 mt-0.5">Segurança máxima para o voo dos pássaros.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-white">Acabamento Piano Gloss</h4>
                    <p className="text-[10px] text-emerald-200/70 mt-0.5">Verniz triplo impermeável ultra brilhante.</p>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Check className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-serif font-bold text-xs text-white">Embalagem Revestida MDF</h4>
                    <p className="text-[10px] text-emerald-200/70 mt-0.5">Caixa rígida sob medida contra impactos.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-3 border-t border-white/10">
              <a
                href={getWhatsappLink('Olá! Gostaria de falar com o responsável da Gaiolas Alves para encomendar um projeto.')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#2EB875] hover:bg-[#1E8A54] text-white text-center font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider shadow-md transition-all inline-flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                <Phone className="w-4 h-4 text-emerald-100" />
                <span>Falar com o Artesão</span>
              </a>
              
              <button
                type="button"
                onClick={() => handleNavigate('personalizadas')}
                className="bg-white/10 hover:bg-white/20 text-white text-center font-bold px-6 py-3.5 rounded-xl text-xs uppercase tracking-wider transition-all inline-flex items-center justify-center gap-1.5 border border-white/20 hover:scale-[1.02]"
              >
                <span>Montar no Simulador</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos de Clientes */}
      <section 
        id="depoimentos" 
        ref={sectionRefs.depoimentos} 
        className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-10"
      >
        <div className="bg-white/60 p-6 sm:p-10 rounded-[2.5rem] border border-neutral-200/50 shadow-lg">
          <div className="text-center mb-10">
            <span className="text-[#10B981] text-xs font-bold uppercase tracking-wider font-mono bg-[#10B981]/10 px-3.5 py-1.5 rounded-full inline-block">
              💬 Opinião de Quem Entende
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-black text-[#132E1C] mt-3 tracking-tight">
              Depoimentos dos Nossos Clientes
            </h2>
            <p className="text-neutral-500 text-sm mt-3 max-w-lg mx-auto leading-relaxed">
              Criadores amadores, campeões de torneio e apaixonados de todas as regiões revelam a satisfação de adquirir produtos Gaiolas Alves.
            </p>
          </div>

          {/* Testimonial masonry grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {testimonialsList.map((test) => (
              <div
                key={test.id}
                className="bg-white rounded-3xl p-5 border border-neutral-100 shadow-md hover:shadow-lg hover:border-[#15803D]/30 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Rating Stars */}
                  <div className="flex gap-1 text-amber-500 mb-3.5">
                    {Array.from({ length: test.rating }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#F59E0B] text-[#F59E0B]" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed italic mb-4 font-medium">
                    "{test.text}"
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
                  <div>
                    <span className="font-serif font-black text-xs sm:text-sm text-[#132E1C] block">
                      {test.name}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-400 block uppercase font-bold">
                      {test.location}
                    </span>
                  </div>

                  <span className="text-[10px] bg-emerald-50 text-[#15803D] font-bold px-2.5 py-0.5 rounded-full uppercase">
                    {test.bird}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* FAQ Accordion container section */}
          <FAQSection />
        </div>
      </section>

      {/* Floating CTA footer band before footer - themed as an immersive dark bento block */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto my-6 text-center">
        <div className="bg-[#132E1C] text-[#F3EFE9] p-10 sm:p-14 rounded-[2.5rem] border border-[#132E1C]/20 shadow-2xl relative overflow-hidden flex flex-col items-center gap-5">
          <div className="absolute top-0 right-0 w-full h-full opacity-5 bg-cover bg-center bg-[radial-gradient(circle,rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:16px_16px]"></div>
          
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight max-w-3xl relative z-10">
            Dê ao seu pássaro o hábitat que ele merece!
          </h3>
          
          <p className="text-sm sm:text-base text-emerald-100/90 max-w-2xl mx-auto leading-relaxed relative z-10 font-medium">
            Nossos modelos proporcionam conforto superior, valorizam o canto das aves e decoram o ambiente com o requinte do autêntico artesanato de luxo. Inicie uma conversa no WhatsApp para encomendar hoje mesmo.
          </p>

          <div className="relative z-10 pt-2">
            <a
              href={getWhatsappLink('Olá! Desejo ver quais modelos de gaiola estão de pronta-entrega agora.')}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-[#A7F3D0] text-[#132E1C] font-black px-8 py-4 rounded-xl shadow-xl hover:bg-white hover:scale-[1.03] transition-all font-serif text-xs uppercase tracking-wider select-none leading-none cursor-pointer"
            >
              <Phone className="w-5 h-5 text-[#132E1C]" />
              <span>Solicitar Orçamento no WhatsApp</span>
            </a>
          </div>

          <div className="text-[10px] text-emerald-300 font-mono tracking-widest uppercase font-bold relative z-10 pt-1">
            Atendimento rápido e personalizado • Envio segurado para todo o Brasil
          </div>
        </div>
      </section>

      {/* Rodapé / Footer */}
      <footer className="bg-[#0B1C11] text-[#E6F4EA]/70 py-12 px-4 sm:px-6 lg:px-8 border-t-8 border-[#15803D]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          
          {/* Col 1 Brand details */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-[#15803D] p-2 rounded-lg text-white">
                <Building className="w-5 h-5" />
              </div>
              <span className="font-serif text-xl sm:text-2xl font-black text-white tracking-tight">
                GAIOLAS ALVES
              </span>
            </div>
            
            <p className="text-xs text-[#E6F4EA]/80 leading-relaxed max-w-sm">
              Tradição, paixão e design contemporâneo na fabricação de gaiolas artesanais sob medida. Atividades devidamente regulamentadas e foco em sustentabilidade florestal.
            </p>

            <div className="flex items-center gap-3 text-white">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#34D399] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={getWhatsappLink('Olá, vim pelo Instagram.')}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-emerald-400 transition-colors"
                aria-label="WhatsApp Link"
              >
                <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Col 2 Quick Bird Links */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#34D399]">
              Modelos e Categorias
            </h4>
            
            <ul className="space-y-2 text-xs">
              {speciesList.map((bird) => (
                <li key={bird.id}>
                  <button
                    onClick={() => {
                      setSpeciesFocused(bird.id);
                      handleNavigate('especies');
                    }}
                    className="hover:text-white transition-colors hover:underline text-left cursor-pointer"
                  >
                    Gaiolas para {bird.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => handleNavigate('personalizadas')}
                  className="hover:text-white transition-colors hover:underline text-left font-bold cursor-pointer"
                >
                  Gaiolas Personalizadas Sob Encomenda
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3 Contact specifications */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider font-mono text-[#34D399]">
              Contato & Localização
            </h4>

            <ul className="space-y-2 text-xs">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                <span>Ateliê Alves, São Paulo - SP (Enviamos para todo o Brasil)</span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <a 
                  href={getWhatsappLink('Contato direto.')} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white hover:underline transition-colors block font-semibold"
                >
                  WhatsApp: +55 11 99999-8888
                </a>
              </li>
              <li className="flex items-start gap-2 leading-relaxed">
                <ShieldCheck className="w-4 h-4 text-[#34D399] shrink-0 mt-0.5" />
                <span>Fabricação artesanal sob licença e conservação florestal. Atividade regularizada.</span>
              </li>
            </ul>
          </div>

        </div>

        {/* copyright and legal disclaimer */}
        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/5 text-center text-[10px] text-emerald-100/30 font-mono space-y-2">
          <div>
            © {new Date().getFullYear()} GAIOLAS ALVES. Todos os direitos reservados.
          </div>
          <div>
            Desenvolvido exclusivamente para ornitófilos e criadores. Fotos de alta resolução meramente representativas do acabamento final.
          </div>
        </div>
      </footer>

      {/* Floating Sticky Pulse WhatsApp support controller */}
      <FloatingWhatsapp />
    </div>
  );
}
