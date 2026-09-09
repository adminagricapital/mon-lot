import lot1 from "@/assets/lot-1.jpg";
import lot2 from "@/assets/lot-2.jpg";
import lot3 from "@/assets/lot-3.jpg";

export type LotStatus = "disponible" | "reserve" | "vendu";

export type Lot = {
  reference: string;
  titre: string;
  ville: string;
  zone: string;
  superficie: number;
  prixCash: number;
  statut: LotStatus;
  image: string;
  description: string;
  acces: string;
  documents: string[];
  coordonnees: { lat: number; lng: number };
};

export const STATUS_LABEL: Record<LotStatus, string> = {
  disponible: "Disponible",
  reserve: "Réservé",
  vendu: "Vendu",
};

export const lots: Lot[] = [
  {
    reference: "ML-0001",
    titre: "Lot à bâtir viabilisé",
    ville: "Abidjan",
    zone: "Bingerville — Anan",
    superficie: 500,
    prixCash: 5000000,
    statut: "disponible",
    image: lot1,
    description:
      "Lot plat et borné dans un lotissement sécurisé, à 10 minutes du centre de Bingerville. Terrain propre, prêt à bâtir.",
    acces: "Voie latéritique praticable toute l'année, à 300 m du goudron.",
    documents: ["Lettre d'attribution", "Plan de lotissement", "Certificat de bornage"],
    coordonnees: { lat: 5.3556, lng: -3.8869 },
  },
  {
    reference: "ML-0002",
    titre: "Parcelle résidentielle",
    ville: "Bassam",
    zone: "Modeste — Route de Bonoua",
    superficie: 400,
    prixCash: 3200000,
    statut: "disponible",
    image: lot2,
    description:
      "Parcelle idéale pour un premier investissement, dans une zone en pleine expansion avec eau et électricité à proximité.",
    acces: "Accès direct par piste aménagée depuis la route de Bonoua.",
    documents: ["Lettre d'attribution", "Plan de situation"],
    coordonnees: { lat: 5.2, lng: -3.72 },
  },
  {
    reference: "ML-0003",
    titre: "Grand lot d'angle",
    ville: "Abidjan",
    zone: "Songon — Kassemblé",
    superficie: 750,
    prixCash: 8500000,
    statut: "reserve",
    image: lot3,
    description:
      "Lot d'angle offrant deux façades, adapté à un projet résidentiel ou commercial dans un quartier déjà habité.",
    acces: "Bitume à 150 m, quartier électrifié.",
    documents: ["Lettre d'attribution", "Plan de lotissement"],
    coordonnees: { lat: 5.3239, lng: -4.2537 },
  },
  {
    reference: "ML-0004",
    titre: "Lot économique borné",
    ville: "Dabou",
    zone: "Toupah",
    superficie: 300,
    prixCash: 1800000,
    statut: "disponible",
    image: lot1,
    description:
      "Petite parcelle bornée, parfaite pour démarrer avec un budget maîtrisé et un paiement échelonné.",
    acces: "Piste carrossable, village à 5 minutes.",
    documents: ["Lettre d'attribution"],
    coordonnees: { lat: 5.32, lng: -4.38 },
  },
  {
    reference: "ML-0005",
    titre: "Parcelle vue dégagée",
    ville: "Yamoussoukro",
    zone: "Kokrenou",
    superficie: 600,
    prixCash: 4200000,
    statut: "disponible",
    image: lot3,
    description:
      "Terrain dans une zone calme et structurée, avec un environnement immédiat déjà bâti.",
    acces: "Voie principale bitumée à 400 m.",
    documents: ["Lettre d'attribution", "Certificat de bornage"],
    coordonnees: { lat: 6.8276, lng: -5.2893 },
  },
  {
    reference: "ML-0006",
    titre: "Lot commercial bord de voie",
    ville: "Bassam",
    zone: "Vitré 2",
    superficie: 900,
    prixCash: 12000000,
    statut: "vendu",
    image: lot2,
    description:
      "Emplacement stratégique en bord de voie principale, adapté à une activité commerciale.",
    acces: "Façade directe sur voie bitumée.",
    documents: ["Lettre d'attribution", "Plan de lotissement", "Certificat de bornage"],
    coordonnees: { lat: 5.19, lng: -3.68 },
  },
];

export function findLot(reference: string): Lot | undefined {
  return lots.find((l) => l.reference.toLowerCase() === reference.toLowerCase());
}

export const villes = Array.from(new Set(lots.map((l) => l.ville))).sort();
