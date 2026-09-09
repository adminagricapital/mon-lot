import { Link } from "@tanstack/react-router";
import { Maximize, MapPin } from "lucide-react";

import { STATUS_LABEL, type Lot } from "@/data/lots";
import { computePlan, formatFcfa } from "@/lib/pricing";

export function StatusBadge({ statut }: { statut: Lot["statut"] }) {
  const tone =
    statut === "disponible"
      ? "bg-primary text-primary-foreground"
      : statut === "reserve"
        ? "bg-sand text-sand-foreground"
        : "bg-muted text-muted-foreground";

  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${tone}`}
    >
      {STATUS_LABEL[statut]}
    </span>
  );
}

export function LotCard({ lot }: { lot: Lot }) {
  const plan6 = computePlan(lot.prixCash, 6);

  return (
    <article className="surface-card group flex flex-col overflow-hidden transition-shadow hover:shadow-[var(--shadow-lift)]">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={lot.image}
          alt={`${lot.titre} à ${lot.zone}`}
          loading="lazy"
          width={1200}
          height={800}
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <div className="absolute left-3 top-3 flex gap-2">
          <StatusBadge statut={lot.statut} />
        </div>
        <span className="absolute right-3 top-3 rounded-full bg-background/90 px-2.5 py-1 text-xs font-semibold">
          {lot.reference}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div>
          <h3 className="text-lg font-semibold">{lot.titre}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
            <MapPin className="size-4" aria-hidden="true" />
            {lot.zone}, {lot.ville}
          </p>
        </div>

        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <Maximize className="size-4" aria-hidden="true" />
          {lot.superficie} m² — superficie officielle
        </p>

        <div className="mt-auto space-y-1 border-t border-border pt-4">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">Prix cash</p>
          <p className="font-display text-2xl font-semibold text-primary">
            {formatFcfa(lot.prixCash)}
          </p>
          <p className="text-sm text-muted-foreground">
            ou {formatFcfa(plan6.monthly)}/mois sur 6 mois
          </p>
        </div>

        <Link
          to="/terrains/$reference"
          params={{ reference: lot.reference }}
          className="mt-2 inline-flex h-11 items-center justify-center rounded-lg bg-secondary px-4 text-sm font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          Voir la fiche du terrain
        </Link>
      </div>
    </article>
  );
}
