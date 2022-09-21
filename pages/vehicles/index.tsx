import Head from "next/head";
import { useEffect, useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Overview } from "../../components/vehicle/overview";

import { Vehicle } from "../../models/vehicle";

export default function Vehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>();

  const get = async () => {
    const result = await fetch("/api/vehicle");
    if (result.status === 200) {
      const vehicles = await result.json();
      setVehicles(vehicles);
    } else {
    }
  };

  useEffect(() => {
    get();
  }, []);

  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <Navbar />
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">{vehicles ? <Overview vehicles={vehicles} /> : <div>Loading</div>}</div>
        <Footer />
      </div>
    </div>
  );
}
