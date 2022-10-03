import { Trash, PlusCircle } from "@styled-icons/boxicons-regular";
import { format, parse } from "date-fns";
import { useState } from "react";
import { MilageItem } from "../../models/vehicle";

interface VehicleMilageProps {
  milage: MilageItem[];
  vehicleUuid: string;
  onError: () => void;
  onWarning: (message: string) => void;
}

export const VehicleMilage = (props: VehicleMilageProps) => {
  const [milage, setMilage] = useState(props.milage);
  const [value, setValue] = useState("");

  const save = async () => {
    if (value.trim().length > 0) {
      const item: MilageItem = { value: value, vehicleUuid: props.vehicleUuid };
      const result = await fetch(`/api/vehicle/milage`, {
        method: "POST",
        body: JSON.stringify(item),
      });
      if (result.status !== 201) {
        props.onError();
        console.error(result);
      } else {
        const response: MilageItem = await result.json();
        setMilage(milage.concat(response).sort());
        setValue("");
      }
    }
  };

  const remove = async (item: MilageItem) => {
    item.vehicleUuid = props.vehicleUuid;
    const result = await fetch(`/api/vehicle/milage`, {
      method: "DELETE",
      body: JSON.stringify(item),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setMilage(milage.filter((i) => i.uuid !== item.uuid));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-black text-xl leading-tight font-medium mb-4">Kilometerstände</h5>
        {milage && milage.length > 0 ? (
          <table className="table-auto w-full">
            {milage.map((item, index) => (
              <tr key={`row-${index}`} className="border-b border-gray-dark">
                <td key={`cell-action-${index}`} className="w-1/5">
                  <button onClick={() => remove(item)}>
                    <Trash size={24} key={`trash-${index}`} />
                  </button>
                </td>
                <td key={`cell-timestamp-${index}`} className="w-2/5 hidden md:block">
                  <span>{format(parse(item.timestamp, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")}</span>
                </td>
                <td key={`cell-value-${index}`} className="w-2/5">
                  <span>{item.value} km</span>
                </td>
              </tr>
            ))}
          </table>
        ) : (
          <div>keine Einträge vorhanden</div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full">
            <input
              type={"text"}
              placeholder="Kilometerstand"
              className="w-full form-input h-8 rounded border-gray-light"
              value={value}
              onChange={({ target }) => setValue(target.value)}
              onKeyDown={({ key }) => (key === "Enter" ? save() : "")}
            />
          </div>
          <div className="w-16">
            <button onClick={save}>
              <PlusCircle className="text-black mx-4" size={28} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
