import React, { useState } from "react";
import {
  AppBar,
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

const Title: React.FC = (): JSX.Element => {
  const [menu, setMenu] = useState<null | HTMLElement>(null);

  const handleOpen = (e) => {
    setMenu(e.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };
  return (
    <Grid item>
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
            <Typography variant="h6">Vacunas Sputnik-V aplicadas</Typography>
          </Toolbar>
        </AppBar>
      </Hidden>
      <Hidden xsDown>
        <Typography variant="h5">
          Vacunas Sputnik-V aplicadas por provincia
        </Typography>
        <Typography variant="subtitle1">
          Tocá o pasá el mouse por cada provincia para ver los datos
        </Typography>
        <Typography>
          <Link
            href="https://github.com/nicopoore/argentina-vaccines"
            target="_blank"
            rel="noreferrer"
          >
            Creado por Nicolás Poore
          </Link>
        </Typography>
        <Typography>
          <Link href="/datos">Fuentes</Link>
        </Typography>
      </Hidden>
    </Grid>
  );
};

export default Title;
