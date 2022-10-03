import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";
import { Information, Vehicle } from "../../models/vehicle";

export default function New() {
  const [vehicle, setVehicle] = useState<Vehicle>({});
  const [information, setInformation] = useState<Information>({});
  const router = useRouter();

  const save = async (event) => {
    event.preventDefault();
    vehicle.information = information;
    const result = await fetch(`/api/vehicle`, {
      method: "POST",
      body: JSON.stringify(vehicle),
    });
    if (result.status !== 201) {
      console.error(result);
    } else {
      router.push("/vehicles");
    }
  };

  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto px-2 px-6 md:px-8 mt-8">
          <div className="p-6 rounded-lg shadow-lg bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-4">
              <form onSubmit={save}>
                <div className="mb-4 md:col-span-2">
                  <label className="mb-2 text-lg" htmlFor="name">
                    Bezeichnung (optional)
                  </label>
                  <input
                    placeholder="Kombi"
                    className="form-control rounded border-gray-light w-full"
                    type="text"
                    name="name"
                    id="name"
                    onChange={(e) => setInformation({ ...information, name: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg font-bold" htmlFor="maker">
                    Hersteller
                  </label>
                  <input
                    placeholder="BMW"
                    className="form-control rounded border-gray-light block w-full"
                    required
                    type="text"
                    name="maker"
                    id="maker"
                    onChange={(e) => setInformation({ ...information, maker: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg font-bold" htmlFor="model">
                    Modell
                  </label>
                  <input
                    placeholder="316d"
                    className="form-control rounded border-gray-light block w-full"
                    required
                    type="text"
                    name="model"
                    id="model"
                    onChange={(e) => setInformation({ ...information, model: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="type">
                    Fahrzeugtyp
                  </label>
                  <select
                    className="select-control rounded border-gray-light w-full block"
                    name="type"
                    id="type"
                    onChange={(e) => setInformation({ ...information, type: e.target.value })}
                  >
                    <option value={"NONE"}>unbekannt</option>
                    <option value={"CAR"}>Auto</option>
                    <option value={"BIKE"}>Motorrad</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="licence">
                    Kennzeichen (optional)
                  </label>
                  <input
                    placeholder="AB-C1234"
                    className="form-control rounded border-gray-light block w-full"
                    type="text"
                    name="licence"
                    id="licence"
                    onChange={(e) => setInformation({ ...information, licence: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="color">
                    Farbe (optional)
                  </label>
                  <select
                    className="select-control rounded border-gray-light w-full block"
                    name="color"
                    id="color"
                    onChange={(e) => setInformation({ ...information, color: e.target.value })}
                  >
                    <option value={"NONE"}>keine</option>
                    <option value={"WHITE"}>weiß</option>
                    <option value={"SILVER"}>silber</option>
                    <option value={"BLACK"}>schwarz</option>
                    <option value={"GREY"}>grau</option>
                    <option value={"RED"}>rot</option>
                    <option value={"YELLOW"}>gelb</option>
                    <option value={"GREEN"}>grün</option>
                    <option value={"BLUE"}>blau</option>
                    <option value={"BEIGE"}>beige</option>
                  </select>
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="manufactured">
                    Baujahr (optional)
                  </label>
                  <input
                    className="form-control rounded border-gray-light block w-full"
                    type="date"
                    name="manufactured"
                    id="manufactured"
                    onChange={(e) => setInformation({ ...information, manufactured: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="inspection">
                    Nächste Inspektion (optional)
                  </label>
                  <input
                    className="form-control rounded border-gray-light block w-full"
                    type="date"
                    name="inspection"
                    id="inspection"
                    onChange={(e) => setInformation({ ...information, inspection: e.target.value })}
                  />
                </div>

                <div className="form-group mb-4">
                  <label className="mb-2 text-lg" htmlFor="tuv">
                    Nächste Hauptuntersuchung (optional)
                  </label>
                  <input
                    className="form-input rounded border-gray-light block w-full"
                    type="date"
                    name="tuv"
                    id="tuv"
                    onChange={(e) => setInformation({ ...information, tuv: e.target.value })}
                  />
                </div>

                <button className="col-span-2 p-2 bg-black text-white hover:bg-yellow hover:text-black rounded shadow-md w-32" type="submit">
                  Eintragen
                </button>
              </form>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired();
