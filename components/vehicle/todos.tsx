import { PlusSquare, Trash } from "@styled-icons/boxicons-solid";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    save();
  }, [todos]);

  const check = (name: string) => {
    if (todos) {
      const newTodos = todos.map((todo) => {
        if (todo.name === name) {
          const updates = {
            ...todo,
            isDone: !todo.isDone,
          };
          return updates;
        }
        return todo;
      });
      setTodos(newTodos);
    }
  };

  const remove = (remove: string) => {
    if (todos) {
      setTodos(todos.filter((todo) => todo.name !== remove));
    }
  };

  const add = () => {
    if (name.trim().length > 0) {
      if (todos) {
        if (!todos.find((i) => i.name.toUpperCase() === name.toUpperCase())) {
          setTodos(todos.concat({ name: name, isDone: false }));
          setName("");
        } else {
          props.onWarning("Aufgabe schon vorhanden.");
        }
      }
    }
  };

  const save = async () => {
    const result = await fetch(`/api/vehicle/${props.vehicleUuid}/todos`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ""`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todos),
    });
    if (result.status !== 200) {
      props.onError();
      console.error(result);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="p-6 rounded-lg shadow-lg bg-white w-full">
        <h5 className="text-gray-900 text-xl leading-tight font-medium mb-2">Offene Aufgaben</h5>
        {todos && todos.length > 0 ? (
          todos.map((todo, index) => (
            <div className="flex flex-row" key={`flex-row-${index}`}>
              <div className="w-8" key={`icon-${index}`}>
                <button onClick={() => remove(todo.name)}>
                  <Trash size={24} key={`trash-${index}`} />
                </button>
              </div>
              <div className="full-w leading-loose" key={`name-${index}`}>
                <button onClick={() => check(todo.name)}>
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
              className="w-full form-input h-8 rounded border-inherit"
              value={name}
              onChange={({ target }) => setName(target.value)}
              onKeyDown={({ key }) => (key === "Enter" ? add() : "")}
            />
          </div>
          <div className="w-16">
            <button onClick={add}>
              <PlusSquare size={40} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
