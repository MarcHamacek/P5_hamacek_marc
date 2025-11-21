'use client';

import { useState } from 'react';

type Product = {
  _id: string;
  lenses?: string[];
};

export default function ProductOptions({
  product,
  addToCart,
}: {
  product: Product;
  addToCart: (productId: string, option: string) => Promise<void>;
}) {
  const options = product.lenses || [];

  const optionLabel = product.lenses ? 'Lentille' : '';

  const [selected, setSelected] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  if (!options || options.length === 0) return null;

  const handleAdd = async () => {
    if (!selected) return;
    setLoading(true);
    setMessage('');
    try {
      await addToCart(product._id, selected);
      setMessage('Produit ajouté au panier');
    } catch (err) {
      console.error('addToCart error', err);
      setMessage("Erreur lors de l'ajout au panier");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-4">
      <label htmlFor="product-option" className="form-label">
        Choisissez {optionLabel}:
      </label>
      <select
        id="product-option"
        className="form-select"
        value={selected}
        onChange={(e) => setSelected(e.target.value)}
      >
        <option value="">-- Sélectionnez --</option>
        {options.map((opt: string) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      {selected && (
        <p className="mt-2 small text-muted">Sélectionné: {selected}</p>
      )}

      <div className="mt-3">
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAdd}
          disabled={!selected || loading}
        >
          {loading ? 'Ajout...' : 'Ajouter au panier'}
        </button>
      </div>

      {message && <p className="mt-2 text-sm text-muted">{message}</p>}
    </div>
  );
}
