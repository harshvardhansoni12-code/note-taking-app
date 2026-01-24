"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const createTodo = () => {
  const [day, setDay] = useState("");
  const [date, setDate] = useState("");
  const [task, setTask] = useState("");
  const [status, setStatus] = useState(false);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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

  const create = async () => {
    const todo = await axios.post("/api/todo/create-todo", {
      day,
      date,
      task,
    });
    if (todo) {
      toast.success("TODO Created");
    }
  };
  return (
    <div>
      <input
        placeholder="date"
        type="text"
        onChange={(e) => {
          setDate(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="day"
        type="text"
        onChange={(e) => {
          setDay(e.target.value);
        }}
      />
      <br />
      <input
        placeholder="task"
        type="text"
        onChange={(e) => {
          setTask(e.target.value);
        }}
      />
      <br />
      <button
        onClick={() => {
          create();
        }}
      >
        create
      </button>
      <div>
        <h2>Your Todos</h2>
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
      </div>
    </div>
  );
};

export default createTodo;
