import { ChevronRight } from "@styled-icons/boxicons-solid";
import Link from "next/link";
import { useRouter } from "next/router";
import { Vehicle } from "../../models/vehicle";

interface OverviewProps {
  vehicles: Vehicle[];
}

export const Overview = (props: OverviewProps) => {
  const router = useRouter();
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
          <div className="overflow-hidden">
            <table className="table-auto w-full">
              <thead className="border-b border-black">
                <tr>
                  <th scope="col" className="text-md font-medium text-black px-6 py-4 text-left">
                    Typ
                  </th>
                  <th scope="col" className="text-md font-medium text-black px-6 py-4 text-left">
                    Bezeichnung
                  </th>
                  <th scope="c4ol" className="text-md font-medium text-black px-6 py-4 text-left">
                    Hersteller
                  </th>
                  <th scope="col" className="text-md font-medium text-black px-6 py-4 text-left">
                    Modell
                  </th>
                  <th scope="col" className="text-md font-medium text-black px-6 py-4 text-right" />
                </tr>
              </thead>
              <tbody>
                {props.vehicles.map((v, index) => (
                  <tr className="border-b border-gray-dark hover:bg-yellow" key={`row-${index}`} onClick={() => router.push(`/vehicles/${v.uuid}`)}>
                    <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap" key={`cell-type-${index}`}>
                      {v.information.type || "NONE"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900" key={`cell-name-${index}`}>
                      {v.information.name}
                    </td>
                    <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap" key={`cell-maker-${index}`}>
                      {v.information.maker}
                    </td>
                    <td className="text-sm text-black font-light px-6 py-4 whitespace-nowrap" key={`cell-model-${index}`}>
                      {v.information.model}
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
