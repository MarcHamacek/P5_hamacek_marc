// import Image from 'next/image';
// import Link from 'next/link';
'use client';

import * as React from 'react';

import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import MenuIcon from '@mui/icons-material/Menu';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { createTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const pages = [
  { id: 1, name: 'Accueil', link: '/', icon: HomeIcon },
  { id: 2, name: 'Mon panier', link: '/cart', icon: ShoppingCartIcon },
  {
    id: 3,
    name: 'Contact',
    link: 'mailto:contact@orinoco.com',
    icon: EmailIcon,
  },
];

const theme = createTheme({
  palette: {
    primary: {
      main: '#f3e9f1',
      dark: '#2E183B',
    },
  },
});

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar
      position="static"
      sx={{ backgroundColor: theme.palette.primary.main }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <ShoppingBagIcon
            sx={{
              display: { xs: 'none', md: 'flex' },
              mr: 1,
              color: theme.palette.primary.dark,
            }}
          />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: theme.palette.primary.dark,
              textDecoration: 'none',
            }}
          >
            Orinoco
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'flex', md: 'none' },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => {
                const Icon = page.icon;
                return (
                  <MenuItem
                    key={page.id}
                    onClick={handleCloseNavMenu}
                    component="a"
                    href={page.link}
                  >
                    <Icon sx={{ mr: 1 }} />
                    <Typography sx={{ textAlign: 'center' }}>
                      {page.name}
                    </Typography>
                  </MenuItem>
                );
              })}
            </Menu>
          </Box>

          <ShoppingBagIcon
            sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }}
          />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Orinoco
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => {
              const Icon = page.icon;
              return (
                <Button
                  key={page.id}
                  onClick={handleCloseNavMenu}
                  href={page.link}
                  startIcon={<Icon />}
                  sx={{ my: 2, mx: 2, color: theme.palette.primary.dark }}
                >
                  {page.name}
                </Button>
              );
            })}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default ResponsiveAppBar;
