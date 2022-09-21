import { format, parse } from "date-fns";
import { useState } from "react";
import { Information } from "../../models/vehicle";

interface VehicleInformationProps {
  information: Information;
  onError: () => void;
}

export const VehicleInformation = (props: VehicleInformationProps) => {
  const [information, setInformation] = useState(props.information);
  const [edit, setEdit] = useState(false);

  const save = async () => {
    const result = await fetch(`/api/vehicle/information`, {
      method: "PUT",
      body: JSON.stringify(information),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setEdit(false);
    }
  };

  const setStatus = async (status: string) => {
    setInformation({ ...information, status: status });
    save();
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full space-y-2">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">
          {information.status === "SOLD" ? "VERKAUFT - " : ""}
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
              defaultValue={information.name}
              onChange={(e) => setInformation({ ...information, name: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.name}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Fahrzeugtyp</div>
          {edit ? (
            <select defaultValue={information.type || "UNKNOWN"} className="form-input h-10 rounded border-inherit w-full">
              <option value="UNKNOWN">unbekannt</option>
              <option value="CAR">Auto</option>
              <option value="BIKE">Motorrad</option>
            </select>
          ) : (
            <div className="flex w-full">{information.type}</div>
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
              defaultValue={information.maker}
              onChange={(e) => setInformation({ ...information, name: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.maker}</div>
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
              defaultValue={information.model}
              onChange={(e) => setInformation({ ...information, model: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.model}</div>
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
              defaultValue={information.licence}
              onChange={(e) => setInformation({ ...information, licence: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.licence}</div>
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
              defaultValue={information.color}
              onChange={(e) => setInformation({ ...information, color: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.color}</div>
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
              defaultValue={information.hsn}
              onChange={(e) => setInformation({ ...information, hsn: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.hsn}</div>
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
              defaultValue={information.tsn}
              onChange={(e) => setInformation({ ...information, tsn: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.tsn}</div>
          )}
        </div>
        <div className="flex">
          <div className="flex-initial w-64">Baujahr</div>
          {edit ? (
            <input
              type="date"
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={information.manufactured}
              onChange={(e) => setInformation({ ...information, manufactured: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.manufactured ? format(parse(information.manufactured, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy") : ""}</div>
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
              value={information.price}
              onChange={(e) => setInformation({ ...information, price: e.target.value || "" })}
            />
          ) : (
            <div className="flex w-full">{information.price}</div>
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
              {information.status !== "SOLD" ? (
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
