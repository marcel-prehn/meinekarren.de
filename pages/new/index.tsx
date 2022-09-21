import Head from "next/head";
import { Footer } from "../../components/footer";
import { Navbar } from "../../components/navbar";

export default function New() {
  return (
    <div>
      <Head>
        <title>MeineKarren.de</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="w-full">
        <Navbar />
        <div className="container mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center w-full">
            <div className="w-1/2 bg-white rounded shadow p-8 m-4">
              <form>
                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="name">
                    Bezeichnung
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="name" id="name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="type">
                    Fahrzeugtyp
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="type" id="type" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Hersteller
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Modell
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Kennzeichen (optional)
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Farbe (optional)
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Baujahr (optional)
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Nächste Inspektion (optional)
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="mb-2 text-lg" htmlFor="first_name">
                    Nächste Hauptuntersuchung (optional)
                  </label>
                  <input className="form-input rounded border-inherit w-full" type="text" name="first_name" id="first_name" />
                </div>

                <button className="block bg-teal-400 hover:bg-teal-600 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">
                  Create Account
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
