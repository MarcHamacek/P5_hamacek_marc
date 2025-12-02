'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { NextResponse } from 'next/server';

import { ArrowBack, Checklist, LocalShipping } from '@mui/icons-material';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { AlertMessage, ButtonCard, LoadingSpinner } from '@/components';

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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down(576));

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
            } catch {
              NextResponse.json(
                { error: 'Failed to load product' },
                { status: 500 }
              );

              return { ...it } as EnrichedItem;
            }
          })
        );

        if (mounted) setItems(enriched);
      } catch {
        NextResponse.json({ error: 'Failed to load cart' }, { status: 500 });
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <Grid
        container
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ py: 8 }}
      >
        <Grid size={8}>
          <AlertMessage
            content="La commande n’a pu être réalisée."
            severity="error"
          />
        </Grid>
        <Grid>
          <ButtonCard
            icon={<ArrowBack />}
            title="Retourner au panier"
            link="/cart"
          />
        </Grid>
      </Grid>
    );

  if (!items || items.length === 0)
    return (
      <Grid
        container
        direction="column"
        spacing={3}
        justifyContent="center"
        alignItems="center"
        sx={{ py: 8 }}
      >
        <Grid size={{ xs: 10, md: 8 }}>
          <AlertMessage content="Votre panier est vide." severity="info" />
        </Grid>
        <Grid>
          <ButtonCard icon={<Checklist />} title="Voir les produits" link="/" />
        </Grid>
      </Grid>
    );

  const totalCents = items.reduce(
    (sum, it) => sum + (it.price || 0) * (it.quantity || 1),
    0
  );

  if (isMobile) {
    return (
      <Grid container direction="column" spacing={2} sx={{ p: 2 }}>
        {items.map((product) => (
          <Grid key={product.productId}>
            <Card variant="outlined">
              <CardContent>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <Image
                    src={`/images/${product.imageUrl}`}
                    alt={product.name ?? 'Product'}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                    width={80}
                    height={80}
                  />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Option: {product.option}
                    </Typography>
                  </Box>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography variant="body2">
                    Quantité: {product.quantity}
                  </Typography>
                  <Typography variant="body2">
                    Prix: {(product.price || 0) / 100} €
                  </Typography>
                  <Typography variant="body1" fontWeight="bold">
                    {(
                      ((product.price || 0) * (product.quantity || 1)) /
                      100
                    ).toFixed(2)}
                    €
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Grid>
          <Card variant="outlined" sx={{ backgroundColor: 'secondary.light' }}>
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="h6" fontWeight="bold">
                  Total
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {(totalCents / 100).toFixed(2)} €
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid container justifyContent="center" sx={{ mt: 2 }}>
          <ButtonCard title="Commander" icon={<LocalShipping />} link="/form" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container justifyContent="center" sx={{ py: 4 }}>
      <Grid size={{ xs: 12, md: 10, lg: 8 }}>
        <Table>
          <TableHead sx={{ backgroundColor: 'secondary.light' }}>
            <TableRow>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Produit
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Nom
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Option
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Prix
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Quantité
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                Prix Total
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((product) => (
              <TableRow key={product.productId}>
                <TableCell align="center">
                  <Image
                    src={`/images/${product.imageUrl}`}
                    alt={product.name ?? 'Product'}
                    style={{
                      objectFit: 'cover',
                      borderRadius: 4,
                    }}
                    width={50}
                    height={50}
                  />
                </TableCell>
                <TableCell align="center">{product.name}</TableCell>
                <TableCell align="center">{product.option}</TableCell>
                <TableCell align="center">
                  {(product.price || 0) / 100} €
                </TableCell>
                <TableCell align="center">{product.quantity}</TableCell>
                <TableCell align="center">
                  {(
                    ((product.price || 0) * (product.quantity || 1)) /
                    100
                  ).toFixed(2)}
                  €
                </TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell colSpan={5} align="right" sx={{ fontWeight: 'bold' }}>
                Total
              </TableCell>
              <TableCell align="center" sx={{ fontWeight: 'bold' }}>
                {(totalCents / 100).toFixed(2)} €
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Grid container justifyContent="center" sx={{ mt: 3 }}>
          <ButtonCard title="Commander" icon={<LocalShipping />} link="/form" />
        </Grid>
      </Grid>
    </Grid>
  );
}
