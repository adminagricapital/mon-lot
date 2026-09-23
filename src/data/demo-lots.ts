import lot1 from "@/assets/lot-1.jpg";
import lot2 from "@/assets/lot-2.jpg";
import lot3 from "@/assets/lot-3.jpg";
import type { PublicLot } from "@/lib/lots";

export const DEMO_LOTS: PublicLot[] = [
  {
    id: "demo-1",
    reference: "DECOUVERTE-01",
    title: "Terrain résidentiel",
    city: "Abidjan",
    area_name: "Bingerville",
    region: "District autonome d’Abidjan",
    area_sqm: 500,
    cash_price: 5_000_000,
    status: "disponible",
    cover_image_url: lot1,
    gallery_urls: [],
    description: "Un exemple de terrain résidentiel présenté pour vous permettre de découvrir l’expérience Mon Lot.",
    access_details: "Les informations d’accès seront confirmées pour chaque offre publiée.",
    documents: [],
    latitude: null,
    longitude: null,
    is_featured: true,
    featured_priority: 1,
  },
  {
    id: "demo-2",
    reference: "DECOUVERTE-02",
    title: "Parcelle pour votre premier projet",
    city: "Grand-Bassam",
    area_name: "Zone résidentielle",
    region: "Sud-Comoé",
    area_sqm: 400,
    cash_price: 3_200_000,
    status: "disponible",
    cover_image_url: lot2,
    gallery_urls: [],
    description: "Une présentation indicative du type d’opportunité que notre équipe peut rechercher avec vous.",
    access_details: "Les conditions d’accès seront détaillées sur chaque offre publiée.",
    documents: [],
    latitude: null,
    longitude: null,
    is_featured: true,
    featured_priority: 2,
  },
  {
    id: "demo-3",
    reference: "DECOUVERTE-03",
    title: "Grand terrain pour projet familial",
    city: "Daloa",
    area_name: "Haut-Sassandra",
    region: "Haut-Sassandra",
    area_sqm: 600,
    cash_price: 4_200_000,
    status: "disponible",
    cover_image_url: lot3,
    gallery_urls: [],
    description: "Un aperçu du format de nos futures fiches, pensé pour comparer facilement votre budget et votre projet.",
    access_details: "Les informations vérifiées seront affichées dès la publication d’une offre.",
    documents: [],
    latitude: null,
    longitude: null,
    is_featured: true,
    featured_priority: 3,
  },
];

export function isDemoLot(lot: PublicLot): boolean {
  return lot.id.startsWith("demo-");
}

export function getDemoLot(reference: string): PublicLot | null {
  return DEMO_LOTS.find((lot) => lot.reference.toLowerCase() === reference.toLowerCase()) ?? null;
}