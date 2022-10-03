import { BarChart, InfoCircle, ShapeTriangle, Show } from "@styled-icons/boxicons-regular";
import Head from "next/head";
import Image from "next/image";
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
        <div className="container mx-auto max-w-7xl px-2 px-6 md:px-8 mt-8">
          <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 md:mt-8">
            <div className="bg-yellow h-full p-4">
              <h2 className="text-2xl font-medium md:text-6xl">
                Verwalte Deinen Furpark - <br />
                einfach und von überall.
              </h2>
              <div className="sm:text-sm md:text-lg md:mt-8">
                Vorbei die Zeiten von Excel-Tabellen und unzähligen Notzien auf verschiedensten Geräten. Behalte die Übersicht über anstehende Aufgaben und die nächste
                Hauptuntersuchung.
                <br />
                Egal ob privat oder geschäftlich.
              </div>
              <div className="w-full mt-8">
                <button className="rounded bg-black text-white hover:text-yellow h-12 w-48">Einfach anmelden</button>
              </div>
            </div>
            <div className="hidden md:block">
              <Image src={"/stacked-cars.jpeg"} layout="responsive" height="100%" width="100%" alt="stacked-cars" />
            </div>
          </div>

          <div className="grid md:grid-cols-3 md:gap-8 bg-gray-light mt-8">
            <div className="p-4">
              <h3 className="text-2xl">
                <InfoCircle size={32} /> Informationen
              </h3>
              <div>
                Erfasse und verwalte alle Fahrzeug-relevanten Informationen wie <b>Kennzeichen</b>, <b>Baujahr</b> und <b>HNS / TSN</b>.
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-2xl">
                <BarChart size={32} />
                Status
              </h3>
              <div>
                Vergessene <b>Hauptuntersuchungen</b> oder <b>Inspektionen</b> gehören der Vergangenheit an. <br />
                Einfach alle relevanten Daten eintragen und nichts mehr verpassen.
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-2xl">
                <Show size={32} />
                Tracking
              </h3>
              <div>
                Behalte den überblick über zurückgelegte <b>Kilometer</b>, getätigte <b>Ausgaben</b> und noch offene <b>Todos</b> im Bezug auf das Fahrzeug.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 bg-blue mt-8">
            <div className="bg-gray-light h-64">image</div>
            <div className="p-4">
              <h4 className="text-2xl">Übersichtliche Ansicht aller Fahrzeuge</h4>
              <div className="pt-4">Behalte den Überblick über alle Fahrzeuge - egal ob Auto, Motorrad, Camper, oder ...</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 bg-yellow mt-8">
            <div className="p-4">
              <h4 className="text-2xl">Alle Informationen auf einen Blick</h4>
              <ul className="list-disc p-4">
                <li>Fahrzeugdaten</li>
                <li>nächste Inspektion</li>
                <li>nächste Hauptuntersuchung</li>
                <li>Kilometerstände</li>
                <li>Todos</li>
                <li>Ausgaben</li>
              </ul>
            </div>
            <div className="bg-gray-300 h-64">image</div>
          </div>

          <div className="grid md:grid-cols-2 bg-gray-light mt-8">
            <div className="bg-gray-300 h-64">image</div>
            <div className="p-4">
              <h4 className="text-2xl">Mobile First!</h4>
              <div className="pt-4">Auch von Unterwegs sind deine Fahrzeuge verwaltbar. Egal ob mit Laptop, Tablet oder Smartphone.</div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
