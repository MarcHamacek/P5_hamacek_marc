import { CircularProgress, Grid } from '@mui/material';

export default function LoadingSpinner() {
  return (
    <Grid
      container
      direction="column"
      spacing={3}
      justifyContent="center"
      alignItems="center"
      sx={{ py: 8 }}
    >
      <CircularProgress color="primary" />
    </Grid>
  );
}
