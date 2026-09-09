import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary-dark text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">Mon Lot</p>
          <p className="mt-2 text-sm opacity-80">Votre terrain, plus accessible.</p>
          <p className="mt-4 max-w-xs text-sm opacity-70">
            Commercialisation de terrains bornés en Côte d'Ivoire, au comptant ou en paiement
            échelonné sur 3, 6, 9 ou 12 mois.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/terrains" className="opacity-85 hover:opacity-100">
                Catalogue des terrains
              </Link>
            </li>
            <li>
              <Link to="/paiement" className="opacity-85 hover:opacity-100">
                Formules de paiement
              </Link>
            </li>
            <li>
              <Link to="/contact" className="opacity-85 hover:opacity-100">
                Nous contacter
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Contact</p>
          <ul className="mt-4 space-y-3 text-sm">
            <li className="flex items-center gap-2 opacity-85">
              <Phone className="size-4" aria-hidden="true" /> +225 00 00 00 00
            </li>
            <li className="flex items-center gap-2 opacity-85">
              <Mail className="size-4" aria-hidden="true" /> contact@monlot.ci
            </li>
            <li className="flex items-center gap-2 opacity-85">
              <MapPin className="size-4" aria-hidden="true" /> Abidjan, Côte d'Ivoire
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} Mon Lot — Tous droits réservés. Coordonnées à confirmer.
      </div>
    </footer>
  );
}
