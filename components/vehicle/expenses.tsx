import { PlusSquare, Trash } from "@styled-icons/boxicons-solid";
import { format, parse } from "date-fns";
import { useState } from "react";
import { ExpenseItem } from "../../models/vehicle";

interface VehicleExpensesProps {
  vehicleUuid: string;
  expenses: ExpenseItem[];
  onError: () => void;
  onWarning: (message: string) => void;
}

export const VehicleExpenses = (props: VehicleExpensesProps) => {
  const [expenses, setExpenses] = useState(props.expenses.sort());
  const [name, setName] = useState<string>("");
  const [value, setValue] = useState<string>("");

  const save = async () => {
    const item: ExpenseItem = { name: name, value: value, vehicleUuid: props.vehicleUuid };
    const result = await fetch(`/api/vehicle/expense`, {
      method: "POST",
      body: JSON.stringify(item),
    });
    if (result.status !== 201) {
      props.onError();
      console.error(result);
    } else {
      const response: ExpenseItem = await result.json();
      setExpenses(expenses.concat(response).sort());
      setName("");
      setValue("");
    }
  };

  const remove = async (item: ExpenseItem) => {
    item.vehicleUuid = props.vehicleUuid;
    const result = await fetch(`/api/vehicle/expense`, {
      method: "DELETE",
      body: JSON.stringify(item),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setExpenses(expenses.filter((i) => i.uuid !== item.uuid));
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Ausgaben</h5>
        {expenses && expenses.length > 0 ? (
          expenses.map((item, index) => (
            <div className="flex flex-row" key={`flex-row-${index}`}>
              <div className="w-1/12" key={`icon-${index}`}>
                <button onClick={() => remove(item)}>
                  <Trash size={24} key={`trash-${index}`} />
                </button>
              </div>
              <div className="w-3/12 leading-loose" key={`timestamp-${index}`}>
                <span>{format(parse(item.timestamp, "yyyy-MM-dd", Date.now()), "dd.MM.yyyy")}</span>
              </div>
              <div className="w-4/12 leading-loose" key={`name-${index}`}>
                <span className="italic">{item.name}</span>
              </div>
              <div className="w-4/12 leading-loose" key={`value-${index}`}>
                <span>{item.value} €</span>
              </div>
            </div>
          ))
        ) : (
          <div>keine Einträge vorhanden</div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full">
            <input type={"text"} placeholder="Artikel" className="w-6/12 form-input h-8 rounded border-inherit" value={name} onChange={({ target }) => setName(target.value)} />
            <input type={"text"} placeholder="Preis" className="w-5/12 form-input h-8 rounded border-inherit" value={value} onChange={({ target }) => setValue(target.value)} />
          </div>
          <div className="w-1/12">
            <button onClick={save}>
              <PlusSquare size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
