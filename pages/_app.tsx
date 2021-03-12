import { ChakraProvider } from '@chakra-ui/react';
import { AppProps } from 'next/dist/next-server/lib/router/router';
import '../styles/globals.css';
import theme from '../styles/theme';
import Head from 'next/head';

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
