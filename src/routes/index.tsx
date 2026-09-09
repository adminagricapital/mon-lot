import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, CalendarClock, FileCheck2, MapPin, ShieldCheck, Wallet } from "lucide-react";

import heroImage from "@/assets/hero-terrain.jpg";
import { LotCard } from "@/components/lot-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { lots } from "@/data/lots";
import { allPlans, formatFcfa } from "@/lib/pricing";

const title = "Mon Lot — Achetez votre terrain en Côte d'Ivoire, cash ou échelonné";
const description =
  "Terrains bornés et géolocalisés en Côte d'Ivoire. Prix cash affiché, paiement échelonné sur 3, 6, 9 ou 12 mois avec 30 % de réservation.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Accueil,
});

const avantages = [
  {
    icon: Wallet,
    titre: "Prix cash officiel",
    texte:
      "Un seul prix de référence affiché sur chaque fiche. Toutes les formules en découlent automatiquement.",
  },
  {
    icon: CalendarClock,
    titre: "Paiement échelonné",
    texte:
      "3, 6, 9 ou 12 mois : 30 % à la réservation, le solde en échéances mensuelles claires.",
  },
  {
    icon: MapPin,
    titre: "Terrains géolocalisés",
    texte: "Chaque lot est relevé sur le terrain : bornes, accès et environnement documentés.",
  },
  {
    icon: ShieldCheck,
    titre: "Stock maîtrisé",
    texte: "Nous vendons notre propre stock. Un lot réservé est verrouillé : pas de double vente.",
  },
];

const etapes = [
  { n: "01", t: "Choisissez votre lot", d: "Filtrez par ville, superficie et budget dans le catalogue." },
  { n: "02", t: "Comparez les formules", d: "Cash ou échelonné : le prix total et les échéances s'affichent." },
  { n: "03", t: "Réservez en ligne", d: "Payez 30 % de réservation et recevez votre reçu automatiquement." },
  { n: "04", t: "Suivez vos échéances", d: "Votre espace client garde vos paiements et documents à jour." },
];

function Accueil() {
  const exemple = allPlans(500000);
  const vitrine = lots.filter((l) => l.statut !== "vendu").slice(0, 3);

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main>
        {/* Hero */}
        <section className="relative isolate overflow-hidden">
          <img
            src={heroImage}
            alt="Vue aérienne d'un lotissement de terrains bornés en Côte d'Ivoire"
            width={1600}
            height={1104}
            className="absolute inset-0 -z-10 size-full object-cover"
          />
          <div className="hero-overlay absolute inset-0 -z-10" />
          <div className="mx-auto w-full max-w-6xl px-4 py-24 sm:px-6 sm:py-32">
            <p className="inline-flex items-center rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-primary-foreground ring-1 ring-primary-foreground/25">
              Côte d'Ivoire · Stock Mon Lot
            </p>
            <h1 className="mt-6 max-w-2xl font-display text-4xl font-semibold leading-tight text-primary-foreground sm:text-6xl">
              Votre terrain, plus accessible.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-primary-foreground/90 sm:text-lg">
              Découvrez des lots bornés, géolocalisés et prêts à bâtir. Payez au comptant ou étalez
              votre achat sur 3 à 12 mois, avec des échéances connues d'avance.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/terrains"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-sand px-6 font-semibold text-sand-foreground transition-transform hover:-translate-y-0.5"
              >
                Voir les terrains disponibles
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
              <Link
                to="/paiement"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-primary-foreground/40 px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-foreground/10"
              >
                Comprendre le paiement échelonné
              </Link>
            </div>
          </div>
        </section>

        {/* Avantages */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">Une façon plus simple d'acheter</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Chaque lot est présenté comme un produit : référence unique, prix officiel,
            disponibilité en temps réel et localisation vérifiée.
          </p>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {avantages.map(({ icon: Icon, titre, texte }) => (
              <div key={titre} className="surface-card p-6">
                <span className="inline-flex size-11 items-center justify-center rounded-lg bg-accent text-accent-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-semibold">{titre}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{texte}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Terrains en vedette */}
        <section className="bg-secondary/50 py-16 sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h2 className="text-3xl font-semibold sm:text-4xl">Terrains à la une</h2>
                <p className="mt-2 text-muted-foreground">
                  Une sélection de lots actuellement commercialisés.
                </p>
              </div>
              <Link
                to="/terrains"
                className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Tout le catalogue <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {vitrine.map((lot) => (
                <LotCard key={lot.reference} lot={lot} />
              ))}
            </div>
          </div>
        </section>

        {/* Exemple tarifaire */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <h2 className="text-3xl font-semibold sm:text-4xl">Un calcul transparent</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Exemple pour un terrain à {formatFcfa(500000)} au comptant. La réservation correspond
            toujours à 30 % du prix de la formule choisie.
          </p>
          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="bg-primary text-primary-foreground">
                  <th className="rounded-l-lg px-4 py-3 text-left font-semibold">Formule</th>
                  <th className="px-4 py-3 text-right font-semibold">Prix total</th>
                  <th className="px-4 py-3 text-right font-semibold">Réservation 30 %</th>
                  <th className="px-4 py-3 text-right font-semibold">Solde</th>
                  <th className="rounded-r-lg px-4 py-3 text-right font-semibold">Échéance</th>
                </tr>
              </thead>
              <tbody>
                {exemple.map((p) => (
                  <tr key={p.label} className="border-b border-border">
                    <td className="px-4 py-3 font-semibold">{p.label}</td>
                    <td className="px-4 py-3 text-right">{formatFcfa(p.total)}</td>
                    <td className="px-4 py-3 text-right">
                      {p.duration === 0 ? "—" : formatFcfa(p.reservation)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.duration === 0 ? "—" : formatFcfa(p.balance)}
                    </td>
                    <td className="px-4 py-3 text-right">
                      {p.duration === 0
                        ? "Paiement unique"
                        : `${formatFcfa(p.monthly)} × ${p.duration}`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Étapes */}
        <section className="bg-primary-dark py-16 text-primary-foreground sm:py-20">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <h2 className="text-3xl font-semibold sm:text-4xl">Comment ça marche</h2>
            <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {etapes.map((e) => (
                <li key={e.n} className="border-t border-primary-foreground/25 pt-5">
                  <span className="font-display text-3xl font-semibold text-sand">{e.n}</span>
                  <h3 className="mt-3 text-lg font-semibold">{e.t}</h3>
                  <p className="mt-2 text-sm opacity-80">{e.d}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
          <div className="surface-card flex flex-col items-start gap-6 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10">
            <div>
              <h2 className="text-2xl font-semibold sm:text-3xl">
                Prêt à sécuriser votre terrain ?
              </h2>
              <p className="mt-2 flex items-center gap-2 text-muted-foreground">
                <FileCheck2 className="size-4" aria-hidden="true" />
                Reçus, échéanciers et documents générés automatiquement.
              </p>
            </div>
            <Link
              to="/contact"
              className="inline-flex h-12 shrink-0 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground transition-colors hover:bg-primary-dark"
            >
              Parler à un conseiller
            </Link>
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
