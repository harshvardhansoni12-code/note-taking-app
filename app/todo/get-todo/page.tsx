"use client";

import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("/api/todo/get-todo");
        if (response.ok) {
          const data = await response.json();
          setTodos(data);
        } else {
          toast.error("Failed to fetch todos");
        }
      } catch (error) {
        toast.error("Error fetching todos");
      } finally {
        setLoading(false);
      }
    };
    fetchTodos();
  }, []);

  return (
    <>
      <>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {todos.map((todo: any) => (
              <li key={todo.id}>
                {todo.task} - {todo.date} - {todo.day} - Status:{" "}
                {todo.status ? "Done" : "Pending"}
              </li>
            ))}
          </ul>
        )}
      </>
    </>
  );
};
//this he can see the todos created by authenticated user
export default TodoPage;
