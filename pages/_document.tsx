import { ColorModeScript } from '@chakra-ui/react';
import NextDocument, { Html, Main, NextScript } from 'next/document';
import React from 'react';
import { Meta } from '../components';
import theme from '../styles/theme';

class Document extends NextDocument {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Meta />
        <body>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
