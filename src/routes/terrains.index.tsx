import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";

import { LotCard } from "@/components/lot-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { STATUS_LABEL, lots, villes, type LotStatus } from "@/data/lots";

const title = "Catalogue des terrains — Mon Lot";
const description =
  "Parcourez les terrains Mon Lot disponibles en Côte d'Ivoire : référence, superficie, prix cash et formules de paiement échelonné.";

export const Route = createFileRoute("/terrains/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Catalogue,
});

const statuts: (LotStatus | "tous")[] = ["tous", "disponible", "reserve", "vendu"];

function Catalogue() {
  const [ville, setVille] = useState("toutes");
  const [statut, setStatut] = useState<LotStatus | "tous">("tous");
  const [budget, setBudget] = useState("tous");
  const [recherche, setRecherche] = useState("");

  const resultats = useMemo(
    () =>
      lots.filter((lot) => {
        if (ville !== "toutes" && lot.ville !== ville) return false;
        if (statut !== "tous" && lot.statut !== statut) return false;
        if (budget === "-3m" && lot.prixCash >= 3000000) return false;
        if (budget === "3-6m" && (lot.prixCash < 3000000 || lot.prixCash > 6000000)) return false;
        if (budget === "+6m" && lot.prixCash <= 6000000) return false;
        const q = recherche.trim().toLowerCase();
        if (
          q &&
          !`${lot.reference} ${lot.titre} ${lot.zone} ${lot.ville}`.toLowerCase().includes(q)
        )
          return false;
        return true;
      }),
    [ville, statut, budget, recherche],
  );

  const selectClass =
    "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm text-foreground";

  return (
    <div className="min-h-dvh">
      <SiteHeader />
      <main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-semibold sm:text-4xl">Catalogue des terrains</h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {lots.length} lots commercialisés par Mon Lot. Chaque fiche affiche le prix cash officiel
          et les formules 3, 6, 9 et 12 mois.
        </p>

        <div className="surface-card mt-8 grid gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <label htmlFor="recherche" className="mb-1.5 block text-sm font-medium">
              Recherche
            </label>
            <input
              id="recherche"
              type="search"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Référence, zone…"
              className={selectClass}
            />
          </div>
          <div>
            <label htmlFor="ville" className="mb-1.5 block text-sm font-medium">
              Ville
            </label>
            <select
              id="ville"
              value={ville}
              onChange={(e) => setVille(e.target.value)}
              className={selectClass}
            >
              <option value="toutes">Toutes les villes</option>
              {villes.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="mb-1.5 block text-sm font-medium">
              Budget cash
            </label>
            <select
              id="budget"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className={selectClass}
            >
              <option value="tous">Tous les budgets</option>
              <option value="-3m">Moins de 3 000 000 F</option>
              <option value="3-6m">3 à 6 millions F</option>
              <option value="+6m">Plus de 6 000 000 F</option>
            </select>
          </div>
          <div>
            <label htmlFor="statut" className="mb-1.5 block text-sm font-medium">
              Statut
            </label>
            <select
              id="statut"
              value={statut}
              onChange={(e) => setStatut(e.target.value as LotStatus | "tous")}
              className={selectClass}
            >
              {statuts.map((s) => (
                <option key={s} value={s}>
                  {s === "tous" ? "Tous les statuts" : STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          {resultats.length} terrain{resultats.length > 1 ? "s" : ""} correspondant à votre
          recherche
        </p>

        {resultats.length === 0 ? (
          <div className="surface-card mt-6 p-10 text-center">
            <p className="font-semibold">Aucun terrain ne correspond à ces critères.</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Élargissez le budget ou changez de ville.
            </p>
          </div>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resultats.map((lot) => (
              <LotCard key={lot.reference} lot={lot} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
