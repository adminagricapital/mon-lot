export type PlanDuration = 0 | 3 | 6 | 9 | 12;

export const MAJORATIONS: Record<Exclude<PlanDuration, 0>, number> = {
  3: 0.2,
  6: 0.5,
  9: 0.8,
  12: 1.0,
};

export const RESERVATION_RATE = 0.3;

export type PlanBreakdown = {
  duration: PlanDuration;
  label: string;
  total: number;
  reservation: number;
  balance: number;
  monthly: number;
  lastInstallment: number;
};

export function computePlan(cashPrice: number, duration: PlanDuration): PlanBreakdown {
  if (duration === 0) {
    return {
      duration,
      label: "Cash",
      total: cashPrice,
      reservation: cashPrice,
      balance: 0,
      monthly: 0,
      lastInstallment: 0,
    };
  }

  const total = Math.round(cashPrice * (1 + MAJORATIONS[duration]));
  const reservation = Math.round(total * RESERVATION_RATE);
  const balance = total - reservation;
  const monthly = Math.floor(balance / duration);
  const lastInstallment = balance - monthly * (duration - 1);

  return {
    duration,
    label: `${duration} mois`,
    total,
    reservation,
    balance,
    monthly,
    lastInstallment,
  };
}

export const ALL_DURATIONS: PlanDuration[] = [0, 3, 6, 9, 12];

export function allPlans(cashPrice: number): PlanBreakdown[] {
  return ALL_DURATIONS.map((d) => computePlan(cashPrice, d));
}

export function formatFcfa(amount: number): string {
  return `${new Intl.NumberFormat("fr-FR").format(Math.round(amount))} FCFA`;
}
