import { Cart, Edit, Trash } from "@styled-icons/boxicons-solid";
import { format, parse } from "date-fns";
import { useRouter } from "next/router";
import { useState } from "react";
import { Information } from "../../models/vehicle";

interface VehicleInformationProps {
  vehicleUuid: string;
  information: Information;
  onError: () => void;
}

export const VehicleInformation = (props: VehicleInformationProps) => {
  const [information, setInformation] = useState(props.information);
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const save = async () => {
    information.vehicleUuid = props.vehicleUuid;
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

  const remove = async () => {
    const result = await fetch(`/api/vehicle/${props.vehicleUuid}`, {
      method: "DELETE",
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setEdit(false);
      router.push("/vehicles");
    }
  };

  const setStatus = async (status: string) => {
    setInformation({ ...information, status: status });
    save();
  };

  return (
    <div className="p-6 rounded-lg shadow-lg bg-white w-full">
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <h5 className="text-black text-xl leading-tight font-medium mb-2">
            {information.status === "SOLD" ? "VERKAUFT - " : ""}
            Infos
          </h5>
        </div>

        <div>Bezeichnung</div>
        <div className="">
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
            information.name
          )}
        </div>

        <div className="">Fahrzeugtyp</div>
        <div className="flex w-full">
          {edit ? (
            <select defaultValue={information.type || "UNKNOWN"} className="form-input h-10 rounded border-inherit w-full">
              <option value="UNKNOWN">unbekannt</option>
              <option value="CAR">Auto</option>
              <option value="BIKE">Motorrad</option>
            </select>
          ) : (
            information.type
          )}
        </div>

        <div className="">Hersteller</div>
        <div className="">
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
            information.maker
          )}
        </div>

        <div className="">Modell</div>
        <div className="flex w-full">
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
            information.model
          )}
        </div>

        <div className="">Kennzeichen</div>
        <div className="">
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
            information.licence
          )}
        </div>

        <div className="">Farbe</div>
        <div className="">
          {edit ? (
            <input
              type="text"
              maxLength={50}
              minLength={1}
              required
              className="form-input h-8 rounded border-gray-light w-full"
              defaultValue={information.color}
              onChange={(e) => setInformation({ ...information, color: e.target.value || "" })}
            />
          ) : (
            information.color
          )}
        </div>

        <div className="">HSN</div>
        <div className="">
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
            information.hsn
          )}
        </div>

        <div className="">TSN</div>
        <div className="">
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
            information.tsn
          )}
        </div>

        <div className="">Baujahr</div>
        <div className="">
          {edit ? (
            <input
              type="date"
              className="form-input h-8 rounded border-inherit w-full"
              defaultValue={information.manufactured}
              onChange={(e) => setInformation({ ...information, manufactured: e.target.value || "" })}
            />
          ) : information.manufactured ? (
            format(parse(information.manufactured, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")
          ) : (
            ""
          )}
        </div>

        <div className="">Kaufpreis</div>
        <div className="">
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
            information.price
          )}
        </div>

        <div className="">TÜV bis</div>
        <div className="">
          {edit ? (
            <input
              type="date"
              required
              className="form-input h-8 rounded border-inherit w-full"
              value={information.tuv}
              onChange={(e) => setInformation({ ...information, tuv: e.target.value || "" })}
            />
          ) : information.tuv ? (
            format(parse(information.tuv, "yyyy-MM-dd", new Date()), "dd.MM.yyyy")
          ) : (
            "-"
          )}
        </div>

        <div className="">Inspektion</div>
        <div className="flex w-full">
          {edit ? (
            <input
              type="date"
              required
              className="form-input h-8 rounded border-inherit w-full"
              value={information.inspection}
              onChange={(e) => setInformation({ ...information, inspection: e.target.value || "" })}
            />
          ) : information.inspection ? (
            format(parse(information.inspection, "yyyy-MM-dd", new Date()), "dd.MM.yyyy")
          ) : (
            "-"
          )}
        </div>
      </div>
      <div>
        <div>
          {edit ? (
            <div className="space-x-4 mt-8">
              <button type="button" className="p-2 w-full bg-black text-white rounded shadow-md hover:bg-yellow hover:text-black" onClick={save}>
                Speichern
              </button>
              <button type="button" className="p-2 w-full bg-gray-dark text-white rounded shadow-md hover:bg-yellow hover:text-black" onClick={() => setEdit(false)}>
                Abbrechen
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              <button type="button" className="p-2 w-full bg-black text-white rounded shadow-md hover:bg-yellow hover:text-black" onClick={() => setEdit(true)}>
                <Edit size={16} className="mx-2" />
                Bearbeiten
              </button>
              {information.status !== "SOLD" ? (
                <button type="button" className="p-2 w-full bg-gray-dark text-black rounded shadow-md hover:bg-yellow hover:text-black" onClick={() => setStatus("SOLD")}>
                  <Cart size={16} className="mx-2" />
                  Verkauft
                </button>
              ) : (
                <button type="button" className="p-2 w-full bg-gray-dark text-black rounded shadow-md hover:bg-yellow hover:text-black" onClick={() => setStatus("")}>
                  Nicht verkauft
                </button>
              )}
              <button type="button" className="p-2 w-full bg-gray-dark text-black rounded shadow-md hover:bg-yellow hover:text-black" onClick={remove}>
                <Trash size={16} className="mx-2" /> Löschen
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
