import { describe, expect, it } from 'vitest';
import { netProfit, suggestedPrice } from './calculations';
describe('INAIVA financial calculations', () => {
  it('calculates a suggested price from cost and margin', () => expect(suggestedPrice(100, 25)).toBe(125));
  it('calculates net profit', () => expect(netProfit(5000, 1800)).toBe(3200));
  it('supports zero cost', () => expect(suggestedPrice(0, 30)).toBe(0));
  it('rejects negative cost', () => expect(() => suggestedPrice(-1, 10)).toThrow());
});