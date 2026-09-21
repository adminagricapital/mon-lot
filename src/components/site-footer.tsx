import { Link } from "@tanstack/react-router";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";

import { SITE } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-20 bg-primary-dark text-primary-foreground">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-semibold">{SITE.name}</p>
          <p className="mt-2 text-sm opacity-80">{SITE.tagline}</p>
          <p className="mt-4 max-w-xs text-sm opacity-70">
            Vente de terrains en Côte d'Ivoire, au comptant ou avec un paiement étalé sur 3, 6, 9 ou
            12 mois.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold uppercase tracking-wider opacity-70">Navigation</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <Link to="/terrains" className="opacity-85 hover:opacity-100">
                Terrains à vendre
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
            <li>
              <a href={SITE.phoneHref} className="flex items-center gap-2 opacity-85 hover:opacity-100">
                <Phone className="size-4" aria-hidden="true" /> {SITE.phoneDisplay}
              </a>
            </li>
            <li>
              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 opacity-85 hover:opacity-100"
              >
                <MessageCircle className="size-4" aria-hidden="true" /> WhatsApp
              </a>
            </li>
            <li>
              <a href={SITE.emailHref} className="flex items-center gap-2 opacity-85 hover:opacity-100">
                <Mail className="size-4" aria-hidden="true" /> {SITE.email}
              </a>
            </li>
            <li className="flex items-center gap-2 opacity-85">
              <MapPin className="size-4" aria-hidden="true" /> {SITE.address}
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15 py-5 text-center text-xs opacity-70">
        © {new Date().getFullYear()} {SITE.name} — Tous droits réservés.
      </div>
    </footer>
  );
}
