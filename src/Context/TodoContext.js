import { useContext } from "react";
import { createContext } from "react";

const TodoContext = createContext({
  todos: [
    {
      _id: Date.now(),
      text: "Learning Programming",
      completed: false,
    },
  ],

  addTodo: (todo) => {},
  updateTodo: (id, todo) => {},
  deleteTodo: (id) => {},
  togleCompleted: (id) => {},
});

export const TodoProvider = TodoContext.Provider;

const useTodoContext = () => {
  return useContext(TodoContext);
};

export default useTodoContext;
