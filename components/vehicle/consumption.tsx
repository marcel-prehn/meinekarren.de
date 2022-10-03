import { PlusCircle, Trash } from "@styled-icons/boxicons-regular";
import { format, parse } from "date-fns";
import { useState } from "react";
import { ConsumptionItem } from "../../models/vehicle";

interface VehicleConsumptionProps {
  consumption: ConsumptionItem[];
  vehicleUuid: string;
  onError: () => void;
  onWarning: (message: string) => void;
}

export const VehicleConsumption = (props: VehicleConsumptionProps) => {
  const [consumption, setConsumption] = useState(props.consumption);
  const [kilometers, setKilometers] = useState<string>("");
  const [liters, setLiters] = useState<string>("");

  const save = async () => {
    const item: ConsumptionItem = { kilometers: kilometers, liters: liters, vehicleUuid: props.vehicleUuid };
    const result = await fetch(`/api/vehicle/consumption`, {
      method: "POST",
      body: JSON.stringify(item),
    });
    if (result.status !== 201) {
      props.onError();
      console.error(result);
    } else {
      const response: ConsumptionItem = await result.json();
      setConsumption(consumption.concat(response).sort());
      setKilometers("");
      setLiters("");
    }
  };

  const remove = async (item: ConsumptionItem) => {
    const result = await fetch(`/api/vehicle/consumption`, {
      method: "DELETE",
      body: JSON.stringify(item),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setConsumption(consumption.filter((i) => i.uuid! !== item.uuid));
    }
  };

  return (
    <div className="flex">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-4">Verbrauch</h5>
        {consumption && consumption.length > 0 ? (
          <table className="table-auto w-full">
            {consumption.map((item, index) => (
              <tr key={`row-${index}`} className="border-b border-gray-dark">
                <td key={`cell-action-${index}`} className="w-1/12">
                  <button onClick={() => remove(item)}>
                    <Trash size={24} key={`trash-${index}`} />
                  </button>
                </td>
                <td key={`cell-timestamp-${index}`} className="w-3/12 hidden md:block">
                  <span>{format(parse(item.timestamp, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")}</span>
                </td>
                <td key={`cell-kilometers-${index}`} className="w-2/12">
                  <span>{item.kilometers} km</span>
                </td>
                <td key={`cell-liters-${index}`} className="w-2/12">
                  <span>{item.liters} l</span>
                </td>
                <td key={`cell-consumption-${index}`} className="w-4/12">
                  <span>{(Number(item.liters) / (Number(item.kilometers) / 100)).toFixed(2)} l/100km</span>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <div>keine Einträge vorhanden</div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full flex space-x-2">
            <input
              type={"text"}
              placeholder="Kilometer"
              className="form-input w-2/5 h-8 rounded border-gray-light"
              value={kilometers}
              onChange={({ target }) => setKilometers(target.value)}
            />
            <input type={"text"} placeholder="Liter" className="form-input w-2/5 h-8 rounded border-gray-light" value={liters} onChange={({ target }) => setLiters(target.value)} />
          </div>
          <div className="w-1/5">
            <button onClick={save}>
              <PlusCircle className="text-black mx-4" size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
