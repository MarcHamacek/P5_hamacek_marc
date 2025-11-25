'use client';

import ReadMoreIcon from '@mui/icons-material/ReadMore';
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Typography,
} from '@mui/material';

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
        <Button
          href={`/products/${product._id}`}
          variant="contained"
          size="medium"
          endIcon={<ReadMoreIcon />}
          sx={{
            '&:hover': {
              transform: 'scale(1.05)',
              boxShadow: 3,
              backgroundColor: 'primary.main',
            },
            transition: 'all 0.2s ease-in-out',
          }}
        >
          Détails
        </Button>
      </Stack>
    </Card>
  );
}
