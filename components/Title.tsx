import React from "react";
import {
  Card,
  CardContent,
  Grid,
  Hidden,
  Link,
  Typography,
} from "@material-ui/core";

const Title: React.FC = (): JSX.Element => {
  return (
    <Hidden xsDown>
      <Card>
        <CardContent>
          <Typography variant="h5">Vacunas aplicadas por provincia</Typography>
          <Typography variant="subtitle1">
            Pasá el mouse por cada provincia para ver los datos
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
        </CardContent>
      </Card>
    </Hidden>
  );
};

export default Title;
