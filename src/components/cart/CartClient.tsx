'use client';

import { useEffect, useState } from 'react';

import Link from 'next/link';

type ServerCartItem = {
  productId: string;
  option?: string;
  quantity: number;
};

type EnrichedItem = {
  productId: string;
  option?: string;
  quantity: number;
  name?: string;
  imageUrl?: string;
  price?: number;
};

export default function CartClient() {
  const [items, setItems] = useState<EnrichedItem[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/cart');
        if (!res.ok) throw new Error(`Cart API error (${res.status})`);
        const data = await res.json();
        const serverItems: ServerCartItem[] = data.items || [];

        const enriched: EnrichedItem[] = await Promise.all(
          serverItems.map(async (it) => {
            try {
              const r = await fetch(`/api/products/${it.productId}`);
              if (!r.ok) return { ...it } as EnrichedItem;
              const p = await r.json();
              return {
                productId: it.productId,
                option: it.option,
                quantity: it.quantity,
                name: p.name,
                imageUrl: p.imageUrl,
                price: p.price,
              } as EnrichedItem;
            } catch (_e) {
              return { ...it } as EnrichedItem;
            }
          })
        );

        if (mounted) setItems(enriched);
      } catch (err: unknown) {
        console.error('Failed to load cart', err);
        if (mounted) setError(err instanceof Error ? err.message : 'Erreur');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <p>Chargement du panier…</p>;
  if (error) return <p className="text-danger">Erreur: {error}</p>;
  if (!items || items.length === 0) return <p>Votre panier est vide.</p>;

  const totalCents = items.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );

  return (
    <section className="container">
      <h1 className="mb-4">Votre panier</h1>

      <div className="list-group mb-4">
        {items.map((it, idx) => {
          const unit = (it.price || 0) / 100;
          const total = ((it.price || 0) * (it.quantity || 1)) / 100;
          const imagePath = it.imageUrl ? `/images/${it.imageUrl}` : undefined;
          return (
            <div
              key={it.productId + '-' + idx}
              className="list-group-item d-flex align-items-center"
            >
              {imagePath && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={imagePath}
                  alt={it.name}
                  style={{ width: 80, height: 80, objectFit: 'cover' }}
                  className="me-3"
                />
              )}
              <div className="flex-grow-1 text-start">
                <h5 className="mb-1">{it.name ?? it.productId}</h5>
                {it.option && (
                  <small className="text-muted">Option: {it.option}</small>
                )}
              </div>
              <div className="text-end" style={{ minWidth: 160 }}>
                <div>Prix unité: {unit.toFixed(2)}€</div>
                <div>Quantité: {it.quantity ?? 1}</div>
                <div className="fw-bold">Total: {total.toFixed(2)}€</div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="d-flex justify-content-end">
        <div className="card p-3">
          <h4>Total commande</h4>
          <div className="fs-5">{(totalCents / 100).toFixed(2)}€</div>
        </div>
      </div>
      <div className="mt-3">
        <Link href="/form" className="btn btn-primary">
          {loading ? 'Commande...' : 'Commander'}
        </Link>
      </div>
    </section>
  );
}
