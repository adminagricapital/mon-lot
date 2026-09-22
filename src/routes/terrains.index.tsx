import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";

import { LotCard } from "@/components/lot-card";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { listLots } from "@/lib/catalogue.functions";
import { STATUS_LABEL, type LotStatus } from "@/lib/lots";

const title = "Terrains disponibles — Mon Lot";
const description = "Consultez les terrains publiés par Mon Lot et filtrez les offres par ville, budget et disponibilité.";

export const Route = createFileRoute("/terrains/")({
  loader: () => listLots(),
  head: () => ({ meta: [
    { title }, { name: "description", content: description },
    { property: "og:title", content: title }, { property: "og:description", content: description },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Catalogue,
});

function Catalogue() {
  const lots = Route.useLoaderData();
  const [city, setCity] = useState("toutes");
  const [status, setStatus] = useState<LotStatus | "tous">("tous");
  const [search, setSearch] = useState("");
  const cities = useMemo(() => [...new Set(lots.map((lot) => lot.city))].sort(), [lots]);
  const results = useMemo(() => lots.filter((lot) => {
    if (city !== "toutes" && lot.city !== city) return false;
    if (status !== "tous" && lot.status !== status) return false;
    const query = search.trim().toLowerCase();
    return !query || `${lot.reference} ${lot.title} ${lot.area_name} ${lot.city}`.toLowerCase().includes(query);
  }), [lots, city, status, search]);
  const fieldClass = "h-11 w-full rounded-lg border border-input bg-card px-3 text-sm";

  return <div className="min-h-dvh"><SiteHeader /><main className="mx-auto w-full max-w-6xl px-4 py-12 sm:px-6">
    <p className="text-sm font-semibold uppercase text-primary">Nos opportunités</p>
    <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">Terrains disponibles</h1>
    <p className="mt-3 max-w-2xl text-muted-foreground">Retrouvez ici toutes les offres actuellement publiées par Mon Lot.</p>
    {lots.length ? <>
      <div className="mt-8 grid gap-4 border-y border-border py-5 sm:grid-cols-3">
        <label className="text-sm font-medium">Recherche<div className="relative mt-1.5"><Search className="absolute left-3 top-3 size-4 text-muted-foreground" /><input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Référence, ville, quartier" className={`${fieldClass} pl-9`} /></div></label>
        <label className="text-sm font-medium">Ville<select value={city} onChange={(e) => setCity(e.target.value)} className={`${fieldClass} mt-1.5`}><option value="toutes">Toutes les villes</option>{cities.map((value) => <option key={value}>{value}</option>)}</select></label>
        <label className="text-sm font-medium">Disponibilité<select value={status} onChange={(e) => setStatus(e.target.value as LotStatus | "tous")} className={`${fieldClass} mt-1.5`}><option value="tous">Tous les statuts</option>{(["disponible", "reserve", "vendu"] as LotStatus[]).map((value) => <option key={value} value={value}>{STATUS_LABEL[value]}</option>)}</select></label>
      </div>
      <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">{results.length} résultat{results.length === 1 ? "" : "s"}</p>
      {results.length ? <div className="mt-5 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{results.map((lot) => <LotCard key={lot.id} lot={lot} />)}</div> : <p className="mt-10 text-center text-muted-foreground">Aucun terrain ne correspond à votre recherche.</p>}
    </> : <div className="mt-12 border-y border-border py-14 text-center"><h2 className="text-2xl font-semibold">Aucun terrain publié pour le moment</h2><p className="mx-auto mt-3 max-w-xl text-muted-foreground">Notre catalogue est en cours de préparation. Contactez-nous pour nous présenter votre projet et recevoir les prochaines offres.</p><a href="/contact" className="mt-6 inline-flex h-11 items-center justify-center rounded-lg bg-primary px-5 font-semibold text-primary-foreground">Parler de mon projet</a></div>}
  </main><SiteFooter /></div>;
}