import type { NextPage } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";

const CarResultsPage = dynamic(
  () => import("pages/CarResultPageSeva/CarResultsPage")
);

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Seva</title>
        <meta
          name="description"
          content="Situs layanan otomotif & jual beli mobil bekas maupun baru dengan harga terjangkau, booking service, STNK & BPKB juga berita artikel gaya hidup, travel di seva.id"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CarResultsPage />
    </div>
  );
};

export default Home;
