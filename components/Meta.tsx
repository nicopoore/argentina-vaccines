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
        content="https://www.argentina.gob.ar/sites/default/files/29-12-20-vac-covid-19.jpeg"
        property="twitter:image"
      />
    </Head>
  );
};

export default Meta;