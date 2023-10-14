import { useState, useEffect } from "react";
import "./App.css";
import TodoForm from "./Components/TodoForm";
import TodoItem from "./Components/TodoItem";
import { TodoProvider } from "./Context/TodoContext";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [
      ...prev,
      { _id: Date.now(), text: todo, completed: false },
    ]);
  };

  const updateTodo = (todo, id) => {
    setTodos((prevTodo) =>
      prevTodo.map((item) => (item._id === id ? todo : item))
    );
  };

  const deleteTodo = (id) => {
    setTodos((prevTodo) => prevTodo.filter((todo) => todo._id !== id));
  };

  const togleCompleted = (id) => {
    setTodos((prevTodo) =>
      prevTodo.map((todo) =>
        todo._id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    const todoItems = JSON.parse(localStorage.getItem("todos"));
    if (todoItems && todoItems.length > 0) {
      setTodos(todoItems);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoProvider value={{ addTodo, updateTodo, deleteTodo, togleCompleted }}>
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {todos.map((todo) => (
              <TodoItem key={todo._id} todo={todo} className="w-full" />
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;
