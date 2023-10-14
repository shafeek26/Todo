import { useState } from "react";
import useTodoContext from "../Context/TodoContext";

function TodoItem({ todo }) {
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMessege, setTodoMessege] = useState(todo.text);
  const { updateTodo, deleteTodo, togleCompleted } = useTodoContext();

  const handleTogleCompleted = () => {
    togleCompleted(todo._id);
    setIsTodoEditable(false);
  };

  const editTodo = () => {
    updateTodo(todo._id, { ...todo, text: todoMessege });
    setIsTodoEditable(false);
  };
  return (
    <div
      className={`flex w-full border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        value={todo.completed}
        onChange={handleTogleCompleted}
      />
      <input
        type="text"
        value={todoMessege}
        onChange={(e) => {
          setTodoMessege(e.target.value);
        }}
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo._id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
