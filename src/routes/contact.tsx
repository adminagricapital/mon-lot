import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const title = "Contacter Mon Lot — conseils et réservation de terrain";
const description =
  "Écrivez à l'équipe Mon Lot pour visiter un terrain, réserver un lot ou choisir votre formule de paiement en Côte d'Ivoire.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Contact;
});

function Contact() {
  const [envoye, setEnvoye] = useState(false);
  const inputClass = "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm";

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Parlons de votre projet</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Un conseiller vous accompagne du choix du lot jusqu'à la signature.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <form
            className="surface-card space-y-5 p-6 sm:p-8"
            onSubmit={(e) => {
              e.preventDefault();
              setEnvoye(true);
            }}
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="nom" className="mb-1.5 block text-sm font-medium">
                  Nom complet
                </label>
                <input id="nom" name="nom" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="tel" className="mb-1.5 block text-sm font-medium">
                  Téléphone
                </label>
                <input id="tel" name="tel" type="tel" required className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="mb-1.5 block text-sm font-medium">
                Email
              </label>
              <input id="email" name="email" type="email" className={inputClass} />
            </div>
            <div>
              <label htmlFor="message" className="mb-1.5 block text-sm font-medium">
                Votre message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full rounded-lg border border-input bg-card p-3 text-sm"
                placeholder="Référence du terrain, ville souhaitée, budget…"
              />
            </div>
            <button
              type="submit"
              className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-dark"
            >
              Envoyer la demande
            </button>
            {envoye && (
              <p className="text-sm font-medium text-primary" role="status">
                Merci, votre demande est enregistrée. L'envoi réel sera activé avec l'espace
                administrateur.
              </p>
            )}
          </form>

          <aside className="surface-card h-fit p-6 sm:p-8">
            <h2 className="text-lg font-semibold">Nous joindre</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-primary" aria-hidden="true" /> +225 00 00 00 00
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-primary" aria-hidden="true" /> contact@monlot.ci
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-primary" aria-hidden="true" /> Abidjan, Côte d'Ivoire
              </li>
            </ul>
            <p className="mt-6 text-xs text-muted-foreground">
              Ces coordonnées sont provisoires : donnez-nous les vraies et nous les mettons à jour.
            </p>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
