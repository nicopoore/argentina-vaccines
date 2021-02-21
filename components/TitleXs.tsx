import React, { useState } from "react";
import {
  AppBar,
  Card,
  CardContent,
  Grid,
  Hidden,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

const TitleXs: React.FC = (): JSX.Element => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const handleOpen = (e) => {
    setMenu(e.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  return (
    <Hidden smUp>
      <AppBar>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleOpen}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu"
            anchorEl={menu}
            keepMounted
            open={Boolean(menu)}
            onClose={handleClose}
          >
            <MenuItem
              component={Link}
              href="https://github.com/nicopoore/argentina-vaccines"
              target="_blank"
              rel="noreferrer"
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
