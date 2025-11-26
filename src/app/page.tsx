import { Grid } from '@mui/material';

import { Hero, ProductCard } from '@/components';
import { Camera } from '@/types';

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`, {
    cache: 'no-store',
  });
  return res.json();
}

export default async function Home() {
  const products = await getProducts();

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
