import Head from "next/head";
import { useRouter } from "next/router";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { VehicleDetails } from "../../components/vehicle/details";

export default function Overview() {
  const router = useRouter();
  const { uuid } = router.query;

  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <VehicleDetails uuid={uuid as string} />
        </div>
        <Footer />
      </div>
    </div>
  );
}
