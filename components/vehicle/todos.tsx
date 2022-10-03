import { Plus, PlusCircle, Trash } from "@styled-icons/boxicons-regular";
import { useState } from "react";
import { TodoItem } from "../../models/vehicle";

interface VehicleTodoProps {
  todos: TodoItem[];
  vehicleUuid: string;
  onError: () => void;
  onWarning: (message: string) => void;
}

export const VehicleTodos = (props: VehicleTodoProps) => {
  const [todos, setTodos] = useState(props.todos);
  const [name, setName] = useState("");

  const check = async (todo: TodoItem) => {
    todo.vehicleUuid = props.vehicleUuid;
    todo.isDone = !todo.isDone;
    const result = await fetch(`/api/vehicle/todo`, {
      method: "PUT",
      body: JSON.stringify(todo),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      const newTodos = todos.map((t) => {
        if (todo.uuid === t.uuid) {
          const updates = {
            ...todo,
            isDone: todo.isDone,
          };
          return updates;
        }
        return t;
      });
      setTodos(newTodos);
    }
  };

  const remove = async (todo: TodoItem) => {
    todo.vehicleUuid = props.vehicleUuid;
    const result = await fetch(`/api/vehicle/todo`, {
      method: "DELETE",
      body: JSON.stringify(todo),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    } else {
      setTodos(todos.filter((t) => todo.uuid !== t.uuid));
    }
  };

  const save = async () => {
    const todo: TodoItem = { name: name, vehicleUuid: props.vehicleUuid, isDone: false };
    const result = await fetch(`/api/vehicle/todo`, {
      method: "POST",
      body: JSON.stringify(todo),
    });
    if (result.status !== 201) {
      props.onError();
      console.error(result);
    } else {
      const response: TodoItem = await result.json();
      setTodos(todos.concat(response));
      setName("");
    }
  };

  return (
    <div className="flex">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-xl font-medium mb-4">Offene Aufgaben</h5>
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <div className="flex flex-row border-b border-gray-dark" key={`flex-row-${index}`}>
              <div className="w-8" key={`icon-${index}`}>
                <button onClick={() => remove(todo)}>
                  <Trash size={24} key={`trash-${index}`} />
                </button>
              </div>
              <div className="full-w leading-loose" key={`name-${index}`}>
                <button onClick={() => check(todo)}>
                  <span className={todo.isDone ? "line-through" : ""}>{todo.name}</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div>keine offenen Aufgaben</div>
        )}
        <div className="flex flex-row items-center mt-8">
          <div className="w-full">
            <input
              type={"text"}
              placeholder="Neue Aufgabe"
              className="w-full form-input h-8 rounded border-gray-light"
              value={name}
              onChange={({ target }) => setName(target.value)}
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
