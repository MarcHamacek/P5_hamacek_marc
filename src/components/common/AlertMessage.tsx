import { Alert, Grid } from '@mui/material';

interface AlertMessageProps {
  content: string;
  severity: 'error' | 'warning' | 'info' | 'success';
}

export default function AlertMessage({ content, severity }: AlertMessageProps) {
  return (
    <Grid
      container
      spacing={2}
      maxWidth={900}
      sx={{ width: '100%' }}
      columns={12}
      justifyContent="center"
      mx="auto"
      my={3}
    >
      <Alert sx={{ width: { xs: '80%', md: '50%' } }} severity={severity}>
        {content}
      </Alert>
    </Grid>
  );
}
