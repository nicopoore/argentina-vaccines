import Head from 'next/head';
import React from 'react';

const Meta: React.FC = (): JSX.Element => {
  const metaTitle = 'Argentina Vacunada';
  const metaDesc = 'Seguí el avance de las vacunaciones en Argentina en vivo';
  const metaUrl = 'https://argentina-vacunada.vercel.app/';
  return (
    <Head>
      <title>{metaTitle}</title>
      <link href="/favicon.ico" rel="icon" />
      <meta content={metaTitle} name="title" />
      <meta content={metaDesc} name="description" />

      <meta content="website" property="og:type" />
      <meta content={metaUrl} property="og:url" />
      <meta content={metaTitle} property="og:title" />
      <meta content={metaDesc} property="og:description" />
      <meta content="/ogImage.jpg" property="og:image" />

      <meta content="summary_large_image" property="twitter:card" />
      <meta content={metaUrl} property="twitter:url" />
      <meta content={metaTitle} property="twitter:title" />
      <meta content={metaDesc} property="twitter:description" />
      <meta
        content="https://images.unsplash.com/photo-1612862403503-b45fa3c22301?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1950&q=80"
        property="twitter:image"
      />
    </Head>
  );
};

export default Meta;
