'use client';

import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';

import { Hero, LoadingSpinner, ProductCard } from '@/components';
import { Camera } from '@/types';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Camera[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch('/api/products', {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        const data = await res.json();
        const productsList = Array.isArray(data) ? data : data.products || [];
        setProducts(productsList);
      } catch {
        console.error('Failed to load products');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };
    getProducts();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Hero />
      <Grid
        container
        maxWidth={1200}
        columns={12}
        spacing={2}
        display="flex"
        mx="auto"
        my="16px"
        justifyContent="center"
      >
        {products.map((product: Camera) => (
          <Grid key={product._id} sx={{ alignSelf: 'center' }}>
            <ProductCard product={product} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
