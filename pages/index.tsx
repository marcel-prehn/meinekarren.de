import Head from "next/head";
import { Footer } from "../components/footer";
import { Navbar } from "../components/navbar";

export default function Index() {
  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Navbar />
        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">Marcel</div>
        <Footer />
      </div>
    </div>
  );
}
