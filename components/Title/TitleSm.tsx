import React from 'react';

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
              rel="noreferrer"
              target="_blank"
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
