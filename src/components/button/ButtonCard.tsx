import { Button } from '@mui/material';

interface ButtonCardProps {
  title: string;
  icon: React.ReactNode;
  link?: string;
  disabled?: boolean;
  onClick?: () => void;
}

export default function ButtonCard({
  title,
  icon,
  link,
  disabled,
  onClick,
}: ButtonCardProps) {
  return (
    <Button
      href={link}
      variant="contained"
      size="medium"
      endIcon={icon}
      disabled={disabled}
      onClick={onClick}
      sx={{
        '&:hover': {
          transform: 'scale(1.05)',
          boxShadow: 3,
          backgroundColor: 'primary.main',
        },
        transition: 'all 0.2s ease-in-out',
      }}
    >
      {title}
    </Button>
  );
}
