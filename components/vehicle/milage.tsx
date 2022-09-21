import { Trash, PlusSquare } from "@styled-icons/boxicons-solid";
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

  const save = async (item: MilageItem) => {
    const result = await fetch(`/api/vehicle/${props.vehicleUuid}/milage`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ""`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(item),
    });
    if (result.status === 201) {
      setValue("");
    } else {
      props.onError();
      console.error(result);
    }
  };

  const check = async () => {
    if (value.trim().length > 0) {
      const newItem: MilageItem = { value: value, timestamp: format(Date.now(), "yyyy-MM-dd") };
      if (milage && milage.length > 0) {
        if (!milage.find((i) => i.value === newItem.value)) {
          if (Number(milage[milage.length - 1].value) < Number(newItem.value)) {
            await save(newItem);
            setMilage(milage.concat(newItem).sort());
          } else {
            props.onWarning("Neuer Kilometerstand ist niedriger als der vorherige.");
          }
        } else {
          props.onWarning("Kilometerstand schon vorhanden.");
        }
      } else {
        setMilage([newItem]);
      }
    }
  };

  const remove = async (value: string) => {
    if (milage) {
      setMilage(milage.filter((i) => i.value !== value));
      const result = await fetch(`/api/vehicle/${props.vehicleUuid}/milage/${value}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ""`,
          "Content-Type": "application/json",
        },
      });
      if (result.status !== 200) {
        props.onError();
        console.error(result);
      }
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Kilometerstände</h5>
        {milage && milage.length > 0 ? (
          milage.map((item, index) => (
            <div className="flex flex-row" key={`flex-row-${index}`}>
              <div className="w-16" key={`icon-${index}`}>
                <button onClick={() => remove(item.value)}>
                  <Trash size={24} key={`trash-${index}`} />
                </button>
              </div>
              <div className="w-32 leading-loose" key={`value-${index}`}>
                <span>{format(parse(item.timestamp, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")}</span>
              </div>
              <div className="w-full leading-loose" key={`timestamp-${index}`}>
                <span>{item.value} km</span>
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
              placeholder="Kilometerstand"
              className="w-full form-input h-8 rounded border-inherit"
              value={value}
              onChange={({ target }) => setValue(target.value)}
              onKeyDown={({ key }) => (key === "Enter" ? check() : "")}
            />
          </div>
          <div className="w-16">
            <button onClick={check}>
              <PlusSquare size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
