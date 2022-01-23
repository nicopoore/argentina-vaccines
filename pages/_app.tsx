import { ChakraProvider } from '@chakra-ui/react';
import '../styles/globals.css';
import theme from '../styles/theme';
import Head from 'next/head';
import { AppProps } from 'next/dist/shared/lib/router/router';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <title>Argentina Vacunada</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
};

export default MyApp;
