export function suggestedPrice(cost: number, marginPercent: number): number {
  if (!Number.isFinite(cost) || !Number.isFinite(marginPercent) || cost < 0 || marginPercent < 0) {
    throw new Error('Cost and margin must be non-negative finite numbers.');
  }
  return cost * (1 + marginPercent / 100);
}
export function netProfit(income: number, expenses: number): number {
  if (![income, expenses].every(Number.isFinite) || income < 0 || expenses < 0) {
    throw new Error('Income and expenses must be non-negative finite numbers.');
  }
  return income - expenses;
}