'use client';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';

import ButtonCard from '../button/ButtonCard';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    imageUrl: string;
  };
}

export default function MediaCard({ product }: ProductCardProps) {
  return (
    <Card sx={{ maxWidth: 345, padding: '8px' }}>
      <CardMedia
        sx={{ height: 140 }}
        image={`/images/${product.imageUrl}`}
        title={product.name}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {product.description}
        </Typography>
      </CardContent>
      <Stack sx={{ alignItems: 'flex-end', marginRight: '16px' }}>
        <ButtonCard
          title="Détails"
          icon={<ReadMoreIcon />}
          link={`/products/${product._id}`}
        />
      </Stack>
    </Card>
  );
}
