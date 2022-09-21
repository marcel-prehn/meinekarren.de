import { ChevronRight } from "@styled-icons/boxicons-solid";
import Link from "next/link";
import { Vehicle } from "../../models/vehicle";

interface OverviewProps {
  vehicles: Vehicle[];
}

export const Overview = (props: OverviewProps) => {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead className="border-b">
                <tr>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Typ
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Bezeichnung
                  </th>
                  <th scope="c4ol" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Hersteller
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                    Modell
                  </th>
                  <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-right" />
                </tr>
              </thead>
              <tbody>
                {props.vehicles.map((v, index) => (
                  <tr className="border-b" key={`row-${index}`}>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" key={`cell-type-${index}`}>
                      {v.type || "NONE"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={`cell-name-${index}`}>
                      {v.name}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" key={`cell-maker-${index}`}>
                      {v.maker}
                    </td>
                    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" key={`cell-model-${index}`}>
                      {v.model}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right" key={`cell-open-${index}`}>
                      <Link href={`/vehicles/${v.uuid}`} className="" key={`link-${index}`}>
                        <a>
                          <ChevronRight size={"1em"} key={`icon-${index}`} />
                        </a>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
