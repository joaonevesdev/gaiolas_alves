/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
  id: string;
  name: string;
  species: string[]; // List of species recommended for (e.g. ['Trinca-Ferro'])
  measurements: string; // e.g., '60cm x 35cm x 40cm'
  material: string; // e.g., 'Madeira de Imbuia e Marfim com verniz marítimo'
  price: number;
  image: string;
  description: string;
  size: 'Pequeno' | 'Médio' | 'Grande';
  isFeatured: boolean;
  details: string[]; // List of specific finishings, e.g., ['Fundo em alumínio', 'Grade removível']
}

export interface SpeciesCategory {
  id: string;
  name: string;
  scientificName: string;
  emoji: string;
  description: string;
  recommendedSize: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  text: string;
  bird: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  category: 'Produto' | 'Produção' | 'Detalhe' | 'Personalizada';
  description: string;
}

export interface CustomOrder {
  id: string;
  customerName: string;
  customerWhatsapp: string;
  birdSpecies: string;
  dimensionsWidth: number;
  dimensionsHeight: number;
  dimensionsDepth: number;
  woodType: string;
  wireType: 'Inox' | 'Latão' | 'Fibra Escura';
  finishType: string;
  observations: string;
  createdAt: string;
  status: 'Pendente' | 'Discutindo' | 'Orçado';
}
