'use client';

import { useEffect, useState } from 'react';
import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { LoadingSpinner, ProductOptions } from '@/components';
import { Camera } from '@/types';

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<Camera | null>(null);
  const [cartLoading, setCartLoading] = useState(false);

  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setProduct(data);
      } catch {
        console.log('Failed to load product');
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };
    getProduct();
  }, [id]);

  const addToCart = async (
    productId: string,
    option: string
  ): Promise<void> => {
    setCartLoading(true);
    try {
      const res = await fetch(`/api/cart`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ productId, option }),
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
    } catch {
      console.error('Failed to add product to cart');
    } finally {
      setCartLoading(false);
    }
  };

  if (loading || cartLoading) {
    return <LoadingSpinner />;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Grid
        container
        spacing={2}
        maxWidth={900}
        columns={12}
        justifyContent="center"
        mx="auto"
        my={3}
      >
        <Card sx={{ maxWidth: 900, padding: '8px' }}>
          <CardMedia
            sx={{ height: 300 }}
            image={`/images/${product.imageUrl}`}
            title={product.name}
          />
          <CardHeader
            title={product.name}
            action={
              <Typography variant="h5">{product.price / 100} €</Typography>
            }
          />
          <CardContent>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {product.description}
            </Typography>
            <ProductOptions product={product} addToCart={addToCart} />
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
}
