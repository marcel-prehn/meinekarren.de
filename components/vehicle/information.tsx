import { format, parse } from "date-fns";
import { useState } from "react";
import { Vehicle } from "../../models/vehicle";

interface VehicleInformationProps {
  vehicle: Vehicle;
  onError: () => void;
}

export const VehicleInformation = (props: VehicleInformationProps) => {
  const [vehicle, setVehicle] = useState(props.vehicle);
  const [edit, setEdit] = useState(false);

  const save = async () => {
    const result = await fetch(`/api/vehicle/${vehicle.uuid}`, {
      method: "PUT",
      body: JSON.stringify(vehicle),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setEdit(false);
    }
  };

  const setStatus = async (status: string) => {
    setVehicle({ ...vehicle, status: status });
    save();
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full space-y-2">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {vehicle.status === "SOLD" ? "VERKAUFT - " : ""}
          Fahrzeuginformationen
        </h5>
        <div className="flex">
          <div className="flex-initial w-64">Bezeichnung</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.name}
              onChange={(e) => setVehicle({ ...vehicle, name: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.name}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Fahrzeugtyp</div>
          {edit ? (
            <select defaultValue={vehicle.type || "UNKNOWN"} className="form-input h-10 rounded border-inherit w-full">
              <option value="UNKNOWN">unbekannt</option>
              <option value="CAR">Auto</option>
              <option value="BIKE">Motorrad</option>
            </select>
          ) : (
            <div className="flex w-full">{vehicle.type}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Hersteller</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.maker}
              onChange={(e) => setVehicle({ ...vehicle, name: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.maker}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Modell</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.model}
              onChange={(e) => setVehicle({ ...vehicle, model: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.model}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Kennzeichen</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.licence}
              onChange={(e) => setVehicle({ ...vehicle, licence: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.licence}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Farbe</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.color}
              onChange={(e) => setVehicle({ ...vehicle, color: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.color}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">HSN</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.hsn}
              onChange={(e) => setVehicle({ ...vehicle, hsn: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.hsn}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">TSN</div>
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.tsn}
              onChange={(e) => setVehicle({ ...vehicle, tsn: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.tsn}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Baujahr</div>
          {edit ? (
            <input
              type="date"
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={vehicle.manufactured}
              onChange={(e) => setVehicle({ ...vehicle, manufactured: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.manufactured ? format(parse(vehicle.manufactured, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy") : ""}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Kaufpreis</div>
          {edit ? (
            <input
              type="number"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-inherit w-full"
              value={vehicle.price}
              onChange={(e) => setVehicle({ ...vehicle, price: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{vehicle.price}</div>
          )}
        </div>
        <div>
          {edit ? (
            <div className="space-x-4 mt-8">
              <button type="button" className="p-2 bg-slate-200 rounded shadow-md hover:bg-slate-300 w-32" onClick={save}>
                Speichern
              </button>
              <button type="button" className="p-2 bg-slate-100 rounded shadow-md hover:bg-slate-200 w-32" onClick={() => setEdit(false)}>
                Abbrechen
              </button>
            </div>
          ) : (
            <div className="space-x-4 mt-8">
              <button type="button" className="p-2 bg-yellow-100 rounded shadow-md hover:bg-slate-300 w-32" onClick={() => setEdit(true)}>
                Bearbeiten
              </button>
              {vehicle.status !== "SOLD" ? (
                <button type="button" className="p-2 bg-red-100 rounded shadow-md hover:bg-slate-300 w-32" onClick={() => setStatus("SOLD")}>
                  Verkauft
                </button>
              ) : (
                <button type="button" className="p-2 bg-red-100 rounded shadow-md hover:bg-slate-300 w-32" onClick={() => setStatus("")}>
                  Nicht verkauft
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
