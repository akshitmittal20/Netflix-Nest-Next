import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Netflix - Watch TV Shows Online, Watch Movies Online</title>
        <meta name="description" content="Netflix Clone - Stream your favorite TV shows and movies" />
        <link rel="icon" href="/4375011_logo_netflix_icon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
