'use client';

import { useSearchParams } from 'next/navigation';

import { Alert, AlertTitle, Grid, Link, Typography } from '@mui/material';

export default function CartPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');

  return (
    <>
      <Grid
        container
        direction="column"
        alignItems="center"
        spacing={2}
        sx={{ py: 4, px: 2, mt: 2 }}
      >
        <Grid>
          <Typography variant="h5" align="center" gutterBottom sx={{ mt: 4 }}>
            Confirmation de commande
          </Typography>
        </Grid>
        <Grid sx={{ my: 2 }}>
          <Typography
            variant="body1"
            align="center"
            gutterBottom
            sx={{ mb: 1 }}
          >
            Votre commande N°
          </Typography>
          <Typography
            variant="h6"
            align="center"
            border={1}
            borderColor="primary.main"
            padding={1}
          >
            {orderId}
          </Typography>
          <Typography variant="body1" align="center" sx={{ mt: 1 }}>
            a bien été validée !
          </Typography>
        </Grid>
        <Grid
          container
          justifyContent="center"
          size={{ xs: 12, md: 8 }}
          sx={{ my: 3 }}
        >
          <Alert severity="info">
            <AlertTitle>Vos informations de livraison</AlertTitle>
            Livraison estimée entre 3 et 5 jours ouvrés à l&apos;adresse
            indiquée.
          </Alert>
        </Grid>
        <Grid sx={{ my: 2 }}>
          <Link href="/" underline="always">
            Retour à la page d&apos;accueil
          </Link>
        </Grid>
      </Grid>
    </>
  );
}
