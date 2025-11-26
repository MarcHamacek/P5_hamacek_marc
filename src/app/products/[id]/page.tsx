'use client';

import * as React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';

import { ProductOptions } from '@/components';
import { Camera } from '@/types';

async function getProduct(id: string) {
  const res = await fetch(`/api/products/${id}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch product');
  return res.json();
}

export default function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = React.use(params);

  const [product, setProduct] = React.useState<Camera | null>(null);

  React.useEffect(() => {
    let active = true;
    (async () => {
      const data = await getProduct(id);
      if (active) setProduct(data);
    })();
    return () => {
      active = false;
    };
  }, [id]);

  const addToCart = async (
    productId: string,
    option: string
  ): Promise<void> => {
    const res = await fetch(`/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId, option }),
    });
    if (!res.ok) throw new Error('Failed to add to cart');
  };

  if (!product) {
    return (
      <div>
        <Grid container spacing={2} justifyContent="center">
          <div className="grid md:grid-cols-2 gap-8">
            <div>Loading...</div>
          </div>
        </Grid>
      </div>
    );
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
              <Typography variant="h5">{product.price / 100}€</Typography>
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
