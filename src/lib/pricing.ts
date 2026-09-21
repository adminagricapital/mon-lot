export type PlanDuration = 0 | 3 | 6 | 9 | 12;

/** Coefficient appliqué au prix comptant pour chaque formule. */
export const PLAN_RATES: Record<PlanDuration, number> = {
  0: 1,
  3: 1.1,
  6: 1.2,
  9: 1.35,
  12: 1.5,
};

export const RESERVATION_RATE = 0.3;

export const ALL_DURATIONS: PlanDuration[] = [0, 3, 6, 9, 12];

export type PlanBreakdown = {
  duration: PlanDuration;
  label: string;
  total: number;
  reservation: number;
  balance: number;
  monthly: number;
  lastInstallment: number;
  /** Économie entière (%) par rapport à la formule 12 mois. */
  savingsVs12: number;
};

export function planLabel(duration: PlanDuration): string {
  return duration === 0 ? "Comptant" : `${duration} mois`;
}

export function savingsVs12(duration: PlanDuration): number {
  return Math.round((1 - PLAN_RATES[duration] / PLAN_RATES[12]) * 100);
}

export function computePlan(cashPrice: number, duration: PlanDuration): PlanBreakdown {
  const base = Number.isFinite(cashPrice) && cashPrice > 0 ? cashPrice : 0;
  const total = Math.round(base * PLAN_RATES[duration]);

  if (duration === 0) {
    return {
      duration,
      label: planLabel(0),
      total,
      reservation: total,
      balance: 0,
      monthly: 0,
      lastInstallment: 0,
      savingsVs12: savingsVs12(0),
    };
  }

  const reservation = Math.round(total * RESERVATION_RATE);
  const balance = total - reservation;
  const monthly = Math.floor(balance / duration);
  const lastInstallment = balance - monthly * (duration - 1);

  return {
    duration,
    label: planLabel(duration),
    total,
    reservation,
    balance,
    monthly,
    lastInstallment,
    savingsVs12: savingsVs12(duration),
  };
}

export function allPlans(cashPrice: number): PlanBreakdown[] {
  return ALL_DURATIONS.map((d) => computePlan(cashPrice, d));
}

export function isPlanDuration(value: unknown): value is PlanDuration {
  return ALL_DURATIONS.includes(Number(value) as PlanDuration);
}

export function formatFcfa(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(amount))} FCFA`;
}
