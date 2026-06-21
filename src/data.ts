/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Product, SpeciesCategory, Testimonial, GalleryImage } from './types';
import heroCage from './assets/images/hero_cage_1782058675946.jpg';
import workshopCraft from './assets/images/workshop_craft_1782058691823.jpg';
import woodJoints from './assets/images/wood_joints_1782058706435.jpg';

// Let's use the actual paths for the generated images!
// For development convenience, we'll import them or use direct relative paths.
export const HERO_CAGE_PATH = heroCage;
export const WORKSHOP_PATH = workshopCraft;
export const CLOSE_UP_PATH = woodJoints;

// Backup stylish fallback images if anything goes wrong
const APP_COLORS = {
  marrom: '#6B4226',
  bege: '#F5E6D3',
  branco: '#FFFFFF',
  verde: '#2F4F2F',
};

export const speciesList: SpeciesCategory[] = [
  {
    id: 'canario',
    name: 'Canário',
    scientificName: 'Serinus canaria',
    emoji: '🐤',
    description: 'Pássaros que adoram espaço para voos horizontais curtos e cantos alegres. Requerem malha fina de segurança.',
    recommendedSize: 'Pequeno a Médio (Malha de 12mm)'
  },
  {
    id: 'coleiro',
    name: 'Coleiro',
    scientificName: 'Sporophila caerulescens',
    emoji: '🐦',
    description: 'Espécie veloz de canto metálico. Necessitam de gaiolas leves, malha estreita perfeita e poleiros frisados.',
    recommendedSize: 'Pequeno (Malha de 10mm)'
  },
  {
    id: 'trinca-ferro',
    name: 'Trinca-Ferro',
    scientificName: 'Saltator similis',
    emoji: '🦅',
    description: 'Pássaro forte de bico robusto. Exige gaiolas reforçadas com madeiras densas (como pau-ferro) e maior amplitude.',
    recommendedSize: 'Grande (Malha de 15mm-18mm)'
  },
  {
    id: 'curio',
    name: 'Curió',
    scientificName: 'Sporophila angolensis',
    emoji: '🎶',
    description: 'O rei do canto clássico. Muito valorizado em torneios. Gaiolas ideais têm acabamentos luxuosos e dimensões de exibição.',
    recommendedSize: 'Médio (Malha de 12mm)'
  },
  {
    id: 'calopsita',
    name: 'Calopsita',
    scientificName: 'Nymphicus hollandicus',
    emoji: '🦜',
    description: 'Psitacídeos curiosos que precisam de espaço para escalada, poleiros de diâmetros variados e abertura frontal ampla.',
    recommendedSize: 'Grande (Malha reforçada de 18mm)'
  }
];

export const productsList: Product[] = [
  {
    id: 'gaiola-luxo-trinca-ferro',
    name: 'Gaiola Luxo Imperial para Trinca-Ferro',
    species: ['Trinca-Ferro', 'Pixarro'],
    measurements: '62cm x 38cm x 41cm',
    material: 'Cerne de Imbuia & Marfim Imperial com Marchetaria Fina',
    price: 480.00,
    image: HERO_CAGE_PATH,
    description: 'Modelo de altíssimo padrão, ideal para criadores exigentes e torneios. Estrutura maciça com polimento triplo e encaixes sob pressão sem pregos visíveis.',
    size: 'Grande',
    isFeatured: true,
    details: [
      'Vaporizada com Verniz PU marítimo de alto brilho (tripla proteção)',
      'Fundo de alumínio blindado removível revestido de vinil',
      'Poleiros de cortiça premium resinada anti-stress',
      'Passadores duplos laterais em fibra de vidro preta',
      'Alça dourada de luxo com amortecedor emborrachado'
    ]
  },
  {
    id: 'gaiola-torneio-curio',
    name: 'Gaiola Torneio Oficial para Curió',
    species: ['Curió', 'Canário'],
    measurements: '48cm x 28cm x 34cm',
    material: 'Jacarandá da Bahia, Marfim e Verniz Náutico Especial',
    price: 390.00,
    image: CLOSE_UP_PATH, // Zoom/Detail shot fits perfectly as high precision craftsmanship
    description: 'Desenvolvida especialmente para apresentações e torneios. Leveza equilibrada com a robustez do Jacarandá, proporcionando isolamento acústico ideal.',
    size: 'Médio',
    isFeatured: true,
    details: [
      'Malha fina de 11mm em latão polido brilhante livre de oxidação',
      'Marchetaria artística corrida nas quatro colunas da estrutura',
      '6 poleiros frisados anatômicos para perfeito posicionamento',
      'Porta guilhotina com mola ultra-silenciosa de segurança',
      'Bandeja de detritos deslizante em alumínio com trava'
    ]
  },
  {
    id: 'gaiola-classica-canario',
    name: 'Gaiola Clássica Colonial para Canário',
    species: ['Canário', 'Canário da Terra'],
    measurements: '42cm x 26cm x 32cm',
    material: 'Cedro Rosa Selecionado e Detalhes de Pau-Marfim',
    price: 260.00,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&q=80&w=600', // Beautiful wooden environment product style placeholder
    description: 'Excelente custo-benefício com a assinatura de qualidade Alves. Leve, de fácil higienização e com visual colonial charmoso para ambientes residenciais.',
    size: 'Pequeno',
    isFeatured: false,
    details: [
      'Envernizamento ecológico à base d\'água sem odores',
      'Arame de aço inox escovado resistente a maresia e umidade',
      'Bebedouro integrado de encaixe rápido com suporte de cedro',
      'Fundo lateral prático para limpeza rápida diária',
      'Ganchos de sustentação reforçados na parte superior'
    ]
  },
  {
    id: 'gaiola-mansao-calopsita',
    name: 'Gaiola Mansão Clã para Calopsita',
    species: ['Calopsita', 'Agapornis'],
    measurements: '75cm x 50cm x 60cm',
    material: 'Eucalipto Autoclavado, Cedro e Malha Grossa de Inox',
    price: 650.00,
    image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=600', // Nature craft wood setup
    description: 'Um verdadeiro palácio para sua calopsita ou agapornis. Ampla altura interna com malha reforçada que permite escalar e fixar escadas ou brinquedos.',
    size: 'Grande',
    isFeatured: true,
    details: [
      'Espaçamento seguro de 18mm com fios de inox de 2.2mm super resistentes',
      'Porta frontal conversível em rampa de pouso estofada com cortiça',
      '3 poleiros grossos de galhos naturais para exercitar as articulações',
      'Janela lateral deslizante de alimentação sem necessidade de abrir a gaiola',
      'Acabamento em verniz atóxico hipoalergênico premium'
    ]
  },
  {
    id: 'gaiola-marchetaria-coleiro',
    name: 'Gaiola Marchetada Master para Coleiro',
    species: ['Coleiro'],
    measurements: '46cm x 27cm x 33cm',
    material: 'Pau-Ferro e Filetes de Roxinho com Marchetaria Geométrica',
    price: 340.00,
    image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=600', // Sophisticated wooden art placeholder
    description: 'Estética marcante que combina tonalidades escuras de Pau-Ferro com contraste roxo vibrante. Perfeita para destacar os tons do Coleiro do Brejo ou Laranjeira.',
    size: 'Pequeno',
    isFeatured: false,
    details: [
      'Malha super fina de 10mm indicada para espécies menores',
      'Passadores de fibra italiana verde-escura de alta flexibilidade',
      'Coxinhos de comida de luxo com suporte integrado em madeira marchetada',
      'Fundo de alumínio naval escovado à laser',
      'Cantos sextavados reforçados nas quinas'
    ]
  },
  {
    id: 'gaiola-hexagonal-decor',
    name: 'Gaiola Hexagonal Decorativa & Pet',
    species: ['Canário', 'Curió', 'Outros'],
    measurements: '55cm x 55cm x 70cm',
    material: 'Angelim Pedra, Marfim e Jacarandá',
    price: 590.00,
    image: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&q=80&w=600', // Rich forest wood background representational
    description: 'Design tridimensional inovador com seis faces simétricas. Projetada tanto para acomodar aves de estimação menores com muito espaço quanto para ornamentação de salas.',
    size: 'Grande',
    isFeatured: false,
    details: [
      'Arame de aço inox polido com distanciamento equilibrado',
      'Gaveta higiênica circular giratória patenteada GAIOLAS ALVES',
      'Dobradiças invisíveis em latão dourado importado',
      'Acompanha gancho de parede colonial trabalhado em ferro forjado',
      'Proteção contra gotejamento de ração e respingos de banho'
    ]
  }
];

export const testimonialsList: Testimonial[] = [
  {
    id: '1',
    name: 'Marcos Souza',
    location: 'Curitiba - PR',
    rating: 5,
    text: 'Excelente acabamento e ótimo atendimento! Minha gaiola de Trinca-Ferro superou todas as expectativas. O brilho do verniz PU é de outro mundo, parece um espelho. Parabéns à equipe Gaiolas Alves pelo capricho no envio.',
    bird: 'Trinca-Ferro'
  },
  {
    id: '2',
    name: 'Roberto Oliveira',
    location: 'Belo Horizonte - MG',
    rating: 5,
    text: 'As gaiolas Alves são sinônimo de elite. A marchetaria nas colunas é perfeita, extremamente uniforme e sem rebarbas. Meu Curió se adaptou imediatamente e já deu show no último torneio da região.',
    bird: 'Curió'
  },
  {
    id: '3',
    name: 'Amanda Alves',
    location: 'São Paulo - SP',
    rating: 5,
    text: 'Comprei uma gaiola clássica para o canário belga que ganhei de herança do meu avô. A embalagem de entrega é sensacional, veio protegida por placas de madeira MDF. Entrega muito rápida e caprichada!',
    bird: 'Canário Belga'
  },
  {
    id: '4',
    name: 'Sandra Ferreira',
    location: 'Rio de Janeiro - RJ',
    rating: 5,
    text: 'Fiz a encomenda de uma gaiola sob medida personalizada para a minha Calopsita de estimação. Eu mudei as medidas das grades e pedi verniz fosco natural, eles me atenderam super bem pelo WhatsApp e o preço foi justíssimo!',
    bird: 'Calopsita'
  }
];

export const galleryImagesList: GalleryImage[] = [
  {
    id: 'gal-1',
    url: HERO_CAGE_PATH,
    title: 'Gaiola Imperial de Trinca-Ferro finalizada',
    category: 'Produto',
    description: 'Apresentação final do modelo luxo envernizado em alta exposição.'
  },
  {
    id: 'gal-2',
    url: WORKSHOP_PATH,
    title: 'Bancada de Lixamento e Polimento',
    category: 'Produção',
    description: 'Onde as madeiras selecionadas de reflorestamento ganham forma e precisão artesanal.'
  },
  {
    id: 'gal-3',
    url: CLOSE_UP_PATH,
    title: 'Detalhe dos Encaixes e Marchetaria',
    category: 'Detalhe',
    description: 'Close-up de alta precisão mostrando a junção perfeita de Imbuia e Marfim sem pregos ou parafusos.'
  },
  {
    id: 'gal-4',
    url: 'https://images.unsplash.com/photo-1463171359979-300c4642e05f?auto=format&fit=crop&q=80&w=800',
    title: 'Madeiras Nobres Selecionadas',
    category: 'Produção',
    description: 'Estoque de Cedro-Rosa, Imbuia e Ipê secados naturalmente à sombra para não empenar.'
  },
  {
    id: 'gal-5',
    url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&q=80&w=800',
    title: 'Modelo Sob Medida para Colecionador',
    category: 'Personalizada',
    description: 'Gaiola rústica com teto curvo duplo envernizado sob encomenda especial.'
  },
  {
    id: 'gal-6',
    url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&q=80&w=800',
    title: 'Fabricação do Aro Superior',
    category: 'Produção',
    description: 'Moldagem em vapor da cúpula de madeira nobre para garantir flexibilidade e alta resistência.'
  }
];

export const WHATS_APP_NUMBER = '5511999998888'; // Custom premium fictional whatsapp number

export const getWhatsappLink = (message: string): string => {
  return `https://wa.me/${WHATS_APP_NUMBER}?text=${encodeURIComponent(message)}`;
};
