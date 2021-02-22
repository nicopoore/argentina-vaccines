import React, { useState } from 'react';
import {
  AppBar,
  Hidden,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const TitleXs: React.FC = (): JSX.Element => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const handleOpen = (e: { currentTarget: React.SetStateAction<HTMLElement> }): void => {
    setMenu(e.currentTarget);
  };

  const handleClose = (): void => {
    setMenu(null);
  };

  return (
    <Hidden smUp>
      <AppBar>
        <Toolbar>
          <IconButton aria-label="open drawer" color="inherit" edge="start" onClick={handleOpen}>
            <MenuIcon />
          </IconButton>
          <Menu keepMounted anchorEl={menu} id="menu" open={Boolean(menu)} onClose={handleClose}>
            <MenuItem
              component={Link}
              href="https://github.com/nicopoore/argentina-vaccines"
              rel="noreferrer"
              target="_blank"
            >
              Creado por Nicolás Poore
            </MenuItem>
            <MenuItem component={Link} href="/datos">
              Fuentes
            </MenuItem>
          </Menu>
          <Typography variant="h6">Argentina Vacunada</Typography>
        </Toolbar>
      </AppBar>
    </Hidden>
  );
};

export default TitleXs;
