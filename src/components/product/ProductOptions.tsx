'use client';

import * as React from 'react';

import { AddShoppingCart } from '@mui/icons-material';
import {
  Box,
  Chip,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  Stack,
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

import { Camera } from '@/types/camera';

import ButtonCard from '../button/ButtonCard';

const ITEM_HEIGHT = 32;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight: personName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

export default function ProductOptions({
  product,
  addToCart,
}: {
  product: Camera;
  addToCart: (productId: string, option: string) => Promise<void>;
}) {
  const theme = useTheme();
  const options = product.lenses || [];

  const [optionSelected, setOptionSelected] = React.useState<string>('');

  const handleChange = (event: SelectChangeEvent<typeof optionSelected>) => {
    const {
      target: { value },
    } = event;
    setOptionSelected(typeof value === 'string' ? value : value);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, my: 2 }}>
      <FormControl sx={{ maxWidth: 300 }}>
        <InputLabel id="chip-label">Lentilles</InputLabel>
        <Select
          labelId="chip-label"
          id="chip"
          value={optionSelected}
          onChange={handleChange}
          input={<OutlinedInput id="select-chip" label="Lentilles" />}
          renderValue={(optionSelected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              <Chip key={optionSelected} label={optionSelected} />
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {options.map((option) => (
            <MenuItem
              key={option}
              value={option}
              style={getStyles(option, [optionSelected], theme)}
            >
              {option}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Stack
        sx={{
          alignItems: 'flex-start',
        }}
      >
        <ButtonCard
          icon={<AddShoppingCart />}
          disabled={!optionSelected}
          title="Ajouter au panier"
          link=""
          onClick={() => addToCart(product._id, optionSelected)}
        ></ButtonCard>
      </Stack>
    </Box>
  );
}
