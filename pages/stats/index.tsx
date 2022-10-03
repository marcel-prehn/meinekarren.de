import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

export default function Stats() {
  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 bg-slate-200">Statistik</div>
        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
