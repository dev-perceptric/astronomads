/** The paid reports. Prices in US cents. Shared by the pages and the server. */
export type ProductKey = 'portrait' | 'synastry';

export type Product = { key: ProductKey; name: string; tagline: string; amount: number; currency: 'usd'; people: 1 | 2 };

export const PRODUCTS: Record<ProductKey, Product> = {
  portrait: { key: 'portrait', name: 'Birth Chart Portrait', tagline: 'Every planet, point and aspect in your chart, explained in depth.', amount: 3900, currency: 'usd', people: 1 },
  synastry: { key: 'synastry', name: 'Compatibility Report', tagline: 'Every contact between two charts, with what to work on together.', amount: 2900, currency: 'usd', people: 2 },
};

export const price = (p: Product) => `$${(p.amount / 100).toFixed(0)}`;
export const isProduct = (k: unknown): k is ProductKey => k === 'portrait' || k === 'synastry';
