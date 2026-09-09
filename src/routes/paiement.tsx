import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { allPlans, formatFcfa } from "@/lib/pricing";

const title = "Paiement cash ou échelonné sur 3 à 12 mois — Mon Lot";
const description =
  "Comprenez la grille tarifaire Mon Lot : majoration selon la durée, 30 % de réservation, solde réparti en échéances mensuelles. Simulateur inclus.";

export const Route = createFileRoute("/paiement")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Paiement,
});

const regles = [
  "L'administration saisit uniquement le prix cash officiel du terrain.",
  "Le prix de chaque formule est calculé automatiquement : +20 % (3 mois), +50 % (6 mois), +80 % (9 mois), +100 % (12 mois).",
  "La réservation représente 30 % du prix de la formule choisie.",
  "Le solde (70 %) est réparti en échéances mensuelles ; la dernière est ajustée à l'arrondi.",
  "Un lot réservé est verrouillé et n'est plus proposé à l'achat.",
];

function Paiement() {
  const [prix, setPrix] = useState(500000);
  const plans = allPlans(Number.isFinite(prix) && prix > 0 ? prix : 0);

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Cash ou paiement échelonné</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Un seul prix de référence, quatre durées possibles. Tout est calculé à partir du prix
          cash officiel du terrain.
        </p>

        <section className="surface-card mt-10 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Simulateur</h2>
          <div className="mt-4 max-w-sm">
            <label htmlFor="prix" className="mb-1.5 block text-sm font-medium">
              Prix cash du terrain (FCFA)
            </label>
            <input
              id="prix"
              type="number"
              min={0}
              step={50000}
              value={prix}
              onChange={(e) => setPrix(e.target.valueAsNumber)}
              className="h-11 w-full rounded-lg border border-input bg-card px-3 text-sm"
            />
          </div>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {plans.map((p) => (
              <div key={p.label} className="rounded-xl border border-border bg-muted/40 p-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold">{p.label}</h3>
                  <span className="rounded-full bg-accent px-2.5 py-1 text-xs font-semibold text-accent-foreground">
                    {p.duration === 0 ? "Prix de base" : `+${(p.total / (prix || 1) - 1) * 100}%`}
                  </span>
                </div>
                <p className="mt-3 font-display text-2xl font-semibold text-primary">
                  {formatFcfa(p.total)}
                </p>
                {p.duration === 0 ? (
                  <p className="mt-2 text-sm text-muted-foreground">
                    Paiement unique, aucun frais supplémentaire.
                  </p>
                ) : (
                  <dl className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Réservation (30 %)</dt>
                      <dd className="font-medium">{formatFcfa(p.reservation)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Solde</dt>
                      <dd className="font-medium">{formatFcfa(p.balance)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Échéance mensuelle</dt>
                      <dd className="font-medium">{formatFcfa(p.monthly)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Dernière échéance</dt>
                      <dd className="font-medium">{formatFcfa(p.lastInstallment)}</dd>
                    </div>
                  </dl>
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">Les règles appliquées</h2>
          <ul className="mt-5 space-y-3">
            {regles.map((r) => (
              <li key={r} className="surface-card p-4 text-sm leading-relaxed">
                {r}
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-12">
          <Link
            to="/terrains"
            className="inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-dark"
          >
            Choisir un terrain
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
