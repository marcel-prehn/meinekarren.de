import { Trash, PlusSquare } from "@styled-icons/boxicons-solid";
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
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Verbrauch</h5>
        {consumption && consumption.length > 0 ? (
          consumption.map((item, index) => (
            <div className="flex flex-row" key={`flex-row-${index}`}>
              <div className="w-1/12" key={`icon-${index}`}>
                <button onClick={() => remove(item)}>
                  <Trash size={24} key={`trash-${index}`} />
                </button>
              </div>
              <div className="w-3/12 leading-loose" key={`value-${index}`}>
                <span>{format(parse(item.timestamp, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")}</span>
              </div>
              <div className="w-2/12 leading-loose" key={`kilometers-${index}`}>
                <span>{item.kilometers} km</span>
              </div>
              <div className="w-2/12 leading-loose" key={`liters-${index}`}>
                <span>{item.liters} l</span>
              </div>
              <div className="w-4/12 leading-loose" key={`consumption-${index}`}>
                <span>{(Number(item.liters) / (Number(item.kilometers) / 100)).toFixed(2)} l/100km</span>
              </div>
            </div>
          ))
        ) : (
          <div>keine Einträge vorhanden</div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full">
            <input
              type={"text"}
              placeholder="Kilometer gefahren"
              className="grow form-input h-8 rounded border-inherit"
              value={kilometers}
              onChange={({ target }) => setKilometers(target.value)}
            />
            <input
              type={"text"}
              placeholder="Liter getankt"
              className="flex-none form-input h-8 rounded border-inherit"
              value={liters}
              onChange={({ target }) => setLiters(target.value)}
            />
          </div>
          <div className="w-16">
            <button onClick={save}>
              <PlusSquare size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
