import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, Compass, FileText, Maximize, Navigation, Share2 } from "lucide-react";
import { useState } from "react";

import { StatusBadge } from "@/components/lot-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { findLot } from "@/data/lots";
import { ALL_DURATIONS, computePlan, formatFcfa, type PlanDuration } from "@/lib/pricing";

export const Route = createFileRoute("/terrains/$reference")({
  loader: ({ params }) => {
    const lot = findLot(params.reference);
    if (!lot) throw notFound();
    return { lot };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Terrain introuvable — Mon Lot" }, { name: "robots", content: "noindex" }],
      };
    }
    const { lot } = loaderData;
    const title = `${lot.titre} ${lot.reference} — ${lot.zone}, ${lot.ville} | Mon Lot`;
    const description = `${lot.superficie} m² à ${lot.zone} (${lot.ville}). Prix cash ${formatFcfa(
      lot.prixCash,
    )} ou paiement échelonné sur 3 à 12 mois.`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  notFoundComponent: TerrainIntrouvable,
  component: FicheTerrain,
});

function TerrainIntrouvable() {
  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl px-4 py-24 text-center sm:px-6">
        <h1 className="text-3xl font-semibold">Ce terrain n'est plus référencé</h1>
        <p className="mt-3 text-muted-foreground">
          La référence demandée n'existe pas ou a été retirée du catalogue.
        </p>
        <Link
          to="/terrains"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-dark"
        >
          Retour au catalogue
        </Link>
      </main>
      <SiteFooter />
    </div>
  );
}

function FicheTerrain() {
  const { lot } = Route.useLoaderData();
  const [duree, setDuree] = useState<PlanDuration>(0);
  const plan = computePlan(lot.prixCash, duree);
  const achetable = lot.statut === "disponible";

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12">
        <Link
          to="/terrains"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" aria-hidden="true" /> Catalogue
        </Link>

        <div className="mt-6 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="overflow-hidden rounded-xl border border-border">
              <img
                src={lot.image}
                alt={`${lot.titre} — ${lot.zone}, ${lot.ville}`}
                width={1200}
                height={800}
                className="aspect-[3/2] w-full object-cover"
              />
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <StatusBadge statut={lot.statut} />
              <span className="rounded-full bg-muted px-3 py-1 text-xs font-semibold text-muted-foreground">
                Réf. {lot.reference}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold sm:text-4xl">{lot.titre}</h1>
            <p className="mt-2 flex items-center gap-2 text-muted-foreground">
              <Compass className="size-4" aria-hidden="true" />
              {lot.zone}, {lot.ville}
            </p>

            <dl className="mt-8 grid gap-4 sm:grid-cols-3">
              <div className="surface-card p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Superficie officielle
                </dt>
                <dd className="mt-1 flex items-center gap-2 text-lg font-semibold">
                  <Maximize className="size-4 text-primary" aria-hidden="true" />
                  {lot.superficie} m²
                </dd>
              </div>
              <div className="surface-card p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">Ville</dt>
                <dd className="mt-1 text-lg font-semibold">{lot.ville}</dd>
              </div>
              <div className="surface-card p-4">
                <dt className="text-xs uppercase tracking-wide text-muted-foreground">
                  Coordonnées GPS
                </dt>
                <dd className="mt-1 text-sm font-semibold">
                  {lot.coordonnees.lat.toFixed(4)}, {lot.coordonnees.lng.toFixed(4)}
                </dd>
              </div>
            </dl>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Description</h2>
              <p className="mt-3 leading-relaxed text-muted-foreground">{lot.description}</p>
              <h3 className="mt-6 text-lg font-semibold">Accès</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{lot.acces}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Documents disponibles</h2>
              <ul className="mt-4 space-y-2">
                {lot.documents.map((d) => (
                  <li key={d} className="flex items-center gap-2 text-sm">
                    <FileText className="size-4 text-primary" aria-hidden="true" />
                    {d}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-semibold">Localisation</h2>
              <div className="surface-card mt-4 flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-muted-foreground">
                  La carte interactive et le contour des bornes seront affichés ici après le relevé
                  terrain.
                </p>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${lot.coordonnees.lat},${lot.coordonnees.lng}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-secondary px-4 text-sm font-semibold text-secondary-foreground hover:bg-primary hover:text-primary-foreground"
                >
                  <Navigation className="size-4" aria-hidden="true" /> Ouvrir la navigation
                </a>
              </div>
            </section>
          </div>

          {/* Panneau prix */}
          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="surface-card p-6">
              <p className="text-xs uppercase tracking-wide text-muted-foreground">
                Prix cash officiel
              </p>
              <p className="mt-1 font-display text-3xl font-semibold text-primary">
                {formatFcfa(lot.prixCash)}
              </p>

              <p className="mt-6 text-sm font-semibold">Choisissez votre formule</p>
              <div className="mt-3 grid grid-cols-5 gap-2">
                {ALL_DURATIONS.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDuree(d)}
                    aria-pressed={duree === d}
                    className={`h-11 rounded-lg border text-sm font-semibold transition-colors ${
                      duree === d
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-card text-foreground hover:bg-secondary"
                    }`}
                  >
                    {d === 0 ? "Cash" : `${d}m`}
                  </button>
                ))}
              </div>

              <dl className="mt-6 space-y-3 border-t border-border pt-5 text-sm">
                <div className="flex justify-between gap-2">
                  <dt className="text-muted-foreground">Prix total de la formule</dt>
                  <dd className="font-semibold">{formatFcfa(plan.total)}</dd>
                </div>
                {duree !== 0 && (
                  <>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Réservation (30 %)</dt>
                      <dd className="font-semibold">{formatFcfa(plan.reservation)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Solde à payer</dt>
                      <dd className="font-semibold">{formatFcfa(plan.balance)}</dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Échéance mensuelle</dt>
                      <dd className="font-semibold">
                        {formatFcfa(plan.monthly)} × {plan.duration}
                      </dd>
                    </div>
                    <div className="flex justify-between gap-2">
                      <dt className="text-muted-foreground">Dernière échéance ajustée</dt>
                      <dd className="font-semibold">{formatFcfa(plan.lastInstallment)}</dd>
                    </div>
                  </>
                )}
              </dl>

              {achetable ? (
                <Link
                  to="/contact"
                  className="mt-6 inline-flex h-12 w-full items-center justify-center rounded-lg bg-primary px-6 font-semibold text-primary-foreground hover:bg-primary-dark"
                >
                  {duree === 0 ? "Acheter au comptant" : "Réserver ce terrain"}
                </Link>
              ) : (
                <p className="mt-6 rounded-lg bg-muted p-4 text-center text-sm font-medium text-muted-foreground">
                  Ce terrain n'est plus disponible à l'achat.
                </p>
              )}

              <button
                type="button"
                onClick={() => {
                  if (typeof navigator !== "undefined" && navigator.share) {
                    void navigator.share({
                      title: `${lot.titre} — ${lot.reference}`,
                      url: window.location.href,
                    });
                  }
                }}
                className="mt-3 inline-flex h-11 w-full items-center justify-center gap-2 rounded-lg border border-border text-sm font-semibold hover:bg-secondary"
              >
                <Share2 className="size-4" aria-hidden="true" /> Partager la fiche
              </button>
            </div>
          </aside>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
