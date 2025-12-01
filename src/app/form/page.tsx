'use client';

import { useEffect, useState } from 'react';

import { LocalShipping } from '@mui/icons-material';
import {
  Grid,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';

import { ButtonCard, LoadingSpinner } from '@/components';

export default function CartPage() {
  const theme = useTheme();
  const isMobileQuery = useMediaQuery(theme.breakpoints.down(576));
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isMobile = isMobileQuery && mounted;

  const handleSubmit = async () => {
    const contact = {
      firstName: (document.getElementById('firstName') as HTMLInputElement)
        .value,
      lastName: (document.getElementById('lastName') as HTMLInputElement).value,
      address: (document.getElementById('address') as HTMLInputElement).value,
      city: (document.getElementById('city') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
    };

    if (
      !contact.firstName ||
      !contact.lastName ||
      !contact.address ||
      !contact.city ||
      !contact.email
    ) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    setLoading(true);
    try {
      const cartRes = await fetch('/api/cart');
      if (!cartRes.ok) throw new Error('Impossible de récupérer le panier');
      const cartData = await cartRes.json();
      const products = (cartData.items || []).map(
        (it: { productId: string }) => it.productId
      );

      const orderRes = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact, products }),
      });

      if (!orderRes.ok) {
        const err = await orderRes.json();
        throw new Error(err?.error || 'Erreur lors de la commande');
      }

      const body = await orderRes.json();
      const { orderId } = body;

      window.location.href = '/confirmation?orderId=' + orderId;
    } catch (err) {
      console.error('Order submit failed', err);
      alert('Une erreur est survenue lors de la commande.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (isMobile) {
    return (
      <Grid
        container
        direction="column"
        spacing={2}
        sx={{ py: 4, px: 2, mt: 2 }}
      >
        <Grid>
          <Typography
            variant="h6"
            gutterBottom
            color={theme.palette.primary.main}
          >
            Veuillez renseigner vos informations:
          </Typography>
        </Grid>
        <Grid>
          <TextField
            fullWidth
            id="firstName"
            label="Prénom"
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField fullWidth id="lastName" label="Nom" variant="outlined" />
        </Grid>
        <Grid>
          <TextField fullWidth id="email" label="Email" variant="outlined" />
        </Grid>
        <Grid>
          <TextField
            fullWidth
            id="address"
            label="Adresse"
            variant="outlined"
          />
        </Grid>
        <Grid>
          <TextField fullWidth id="city" label="Ville" variant="outlined" />
        </Grid>
        <Grid container justifyContent="flex-end" sx={{ mt: 2 }}>
          <ButtonCard
            title={loading ? 'Validation...' : 'Valider'}
            icon={<LocalShipping />}
            onClick={() => handleSubmit()}
            disabled={loading}
          />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid
      container
      columns={12}
      spacing={2}
      sx={{ py: 4, px: 2, mt: 4, maxWidth: 'sm', mx: 'auto' }}
    >
      <Grid size={12} sx={{ mb: 2 }}>
        <Typography
          variant="h5"
          gutterBottom
          color={theme.palette.primary.main}
        >
          Veuillez renseigner vos informations:
        </Typography>
      </Grid>
      <Grid size={6}>
        <TextField fullWidth id="firstName" label="Prénom" variant="outlined" />
      </Grid>
      <Grid size={6}>
        <TextField fullWidth id="lastName" label="Nom" variant="outlined" />
      </Grid>
      <Grid size={12}>
        <TextField fullWidth id="email" label="Email" variant="outlined" />
      </Grid>
      <Grid size={12}>
        <TextField fullWidth id="address" label="Adresse" variant="outlined" />
      </Grid>
      <Grid size={12}>
        <TextField fullWidth id="city" label="Ville" variant="outlined" />
      </Grid>
      <Grid size={12}>
        <Stack sx={{ alignItems: 'flex-end' }}>
          <ButtonCard
            title={loading ? 'Validation...' : 'Valider'}
            icon={<LocalShipping />}
            onClick={() => handleSubmit()}
            disabled={loading}
          />
        </Stack>
      </Grid>
    </Grid>
  );
}
